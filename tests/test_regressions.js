// Regression cases from the consolidated baseline reviews.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
function load(saved){
  const elems=new Map();
  const get=id=>{if(!elems.has(id))elems.set(id,{id,innerHTML:'',hidden:false,addEventListener(){}});return elems.get(id);};
  const context={setTimeout:()=>0,clearTimeout(){},document:{getElementById:get,addEventListener(){}},window:{},localStorage:{getItem:()=>saved===undefined?null:JSON.stringify(saved),setItem(){}}};
  vm.createContext(context);
  const source=fs.readFileSync(__dirname+'/../app.js','utf8').replace('  renderStage();\n})();','  globalThis.review={state,selectedRecipe,stylePrompt,buildRecipeExport,catalogMarkup,STYLES};\n  renderStage();\n})();');
  vm.runInContext(source,context);
  return {...context.review,elems};
}
const cases=[
  {step:4,genre:'comedy',mood:['any']},
  {step:4,genre:'comedy',selected:4,recipeEdits:{palette:{toString:null}}},
  {step:4,genre:'comedy',format:['any'],finish:['any'],color:['any'],audience:['everyone']}
];
for(const saved of cases){
  const app=load(saved);
  assert.ok(app.elems.get('stageView').innerHTML.includes('stage-surface'),'malformed saved fields must not prevent rendering');
  for(const key of ['mood','format','finish','color','audience'])assert.equal(typeof app.state[key],'string');
}
const saved=load({step:4,genre:'comedy',selected:4,shortlist:[4,4,200,7,12,13,20],recipeEdits:{palette:'Teal',linework:'x'.repeat(400),consistency:'y'.repeat(900),pacing:null,unknown:'discard'}});
assert.equal(saved.state.recipeEdits.palette,'Teal','valid edits survive validation');
assert.equal(saved.state.recipeEdits.linework.length,300);
assert.equal(saved.state.recipeEdits.consistency.length,800);
assert.equal(Object.hasOwn(saved.state.recipeEdits,'pacing'),false);
assert.equal(Object.hasOwn(saved.state.recipeEdits,'unknown'),false);
assert.equal(Object.hasOwn(saved.state,'shortlist'),false,'obsolete shortlist is discarded');
assert.equal(saved.buildRecipeExport().styleRecipe.palette,'Teal');
for(const raw of [null,[],42,'not a state'])assert.equal(load(raw).state.step,1);
console.log('Saved-state recovery, bounded edits, obsolete shortlist removal, and export passed.');
const catalog=load();catalog.state.tab='all';
for(let id=1;id<=96;id++){
  for(const query of ['#'+String(id).padStart(2,'0'),'#'+id,String(id)]){
    catalog.state.query=query;const html=catalog.catalogMarkup();
    assert.equal((html.match(/class="style-card"/g)||[]).length,1,`ID query ${query} must select one reference`);
    assert.ok(html.includes(`data-id="${id}"`));
  }
}
catalog.state.family='Experimental';catalog.state.query='#01';assert.ok(catalog.catalogMarkup().includes('No styles found.'));
catalog.state.family='all';catalog.state.query='Watercolor';assert.ok(catalog.catalogMarkup().includes('Watercolor'));
catalog.state.query='#999';assert.ok(catalog.catalogMarkup().includes('No styles found.'));
console.log('All 96 padded/unpadded ID searches, family intersection, and text search passed.');

for(const legacy of ['memoir','kids']){const migrated=load({step:3,genre:legacy});assert.equal(migrated.state.genre,legacy==='memoir'?'slice':null);if(legacy==='kids')assert.equal(migrated.state.audience,'kids');}
console.log('Legacy personal-story and kids-category migrations passed.');
