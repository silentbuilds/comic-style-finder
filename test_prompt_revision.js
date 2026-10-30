const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function load(saved,options={}){
 const elements=new Map(),events={};
 let stored=saved===undefined?null:JSON.stringify(saved);
 const get=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',hidden:false,open:false,addEventListener(){},focus(){},scrollIntoView(){}});return elements.get(id);};
 const ctx={setTimeout:()=>0,clearTimeout(){},requestAnimationFrame:f=>f(),console,document:{getElementById:get,addEventListener:(k,f)=>events[k]=f,querySelectorAll:()=>[],body:{classList:{add(){},remove(){}}}},window:{scrollY:0,scrollTo(){},matchMedia:()=>({matches:true})},localStorage:{getItem:()=>stored,setItem:(key,value)=>{stored=value;}}};
 const code=fs.readFileSync(__dirname+'/app.js','utf8').replace('const ENABLE_RECIPE_DOWNLOAD=false','const ENABLE_RECIPE_DOWNLOAD='+!!options.enableDownload).replace('  renderStage();\n})();','  globalThis.api={state,STYLES,selectedRecipe,stylePrompt,styleOnlyPrompt,panelPrompt,scoreStyle,topStyles,renderStage,renderFormat,card,recipeMarkup,buildRecipeExport};\n  renderStage();\n})();');
 vm.createContext(ctx);vm.runInContext(code,ctx);return {...ctx.api,elements,events,get stored(){return stored;}};
}
if(require.main===module){
const app=load(),{state,STYLES,selectedRecipe,stylePrompt}=app;
for(const format of ['any','social','vertical','page','strip'])for(const approach of ['any','wordless','explainer']){
 state.selected=18;state.format=format;state.approach=approach;state.recipeEdits={};
 const full=stylePrompt(STYLES[17]),styleOnly=app.styleOnlyPrompt(STYLES[17]),sections=full.split('\n\n');
 assert.ok(sections[0].startsWith('Story: ['));assert.equal(sections[1],styleOnly,'Full prompt embeds the exact reusable block');
 assert.ok(styleOnly.startsWith('Style: Mecha Anime.'));assert.doesNotMatch(styleOnly,/Story:|Format:|Consistency:|3:4|16:9|9:16/);
 for(const field of ['Palette:','Linework:','Texture:','Pacing:'])assert.ok(styleOnly.includes(field));
 if(format==='any'){assert.equal(sections.length,2);assert.ok(!full.includes('Format:'));}
 else{assert.equal(sections.length,3);assert.ok(sections[2].startsWith('Format:'));assert.ok(sections[2].includes('Keep recurring characters recognizable'));}
 if(approach==='wordless')assert.ok(styleOnly.includes('minimal or no text'));
 if(approach==='explainer')assert.ok(styleOnly.includes('labels, arrows and simple diagrams'));
 for(const [field,value] of Object.entries({palette:'Custom ochre and indigo',linework:'Custom tapered strokes',texture:'Custom fibrous grain',pacing:'Custom pause then reveal'})){
  state.recipeEdits[field]=value;
  assert.ok(app.styleOnlyPrompt(STYLES[17]).includes(value));assert.ok(stylePrompt(STYLES[17]).includes(value));
 }
}
state.selected=18;state.format='page';state.recipeEdits={consistency:'Keep the same hat in each panel.'};
assert.ok(stylePrompt(STYLES[17]).split('\n\n')[2].includes('Keep the same hat'));
assert.ok(!app.styleOnlyPrompt(STYLES[17]).includes('Keep the same hat'));
const newMarkup=app.recipeMarkup();assert.ok(newMarkup.includes('data-action="copy-style-only">Copy style only</button>'));
assert.ok(!newMarkup.includes('Copy Full Creative Direction'));
console.log('Reusable style block: labeled sections, optional Format, isolated style-only output and shared visual edits passed.');
state.recipeEdits={};state.format='any';state.approach='any';

const storyPlaceholder='Story: [Who is it about, where are they, and what happens? 1–3 sentences]';
const copyGuidance='Replace the bracketed line with your story before you paste.';
const legacyStory='A Singaporean guy spent SGD 700 on a first date, then adopted a cat.';
const legacy=load({step:4,genre:'slice',mood:'playful',format:'social',selected:13,idea:legacyStory,optionalStoryIdea:legacyStory,recipeEdits:{palette:'Sepia'}});
assert.ok(!Object.hasOwn(legacy.state,'idea'),'Story text removed from state');
assert.ok(!legacy.stored.includes(legacyStory),'Legacy story text removed from storage on load');
assert.equal(legacy.state.recipeEdits.palette,'Sepia','Style edits survive discarded story text');
const neutral=load({step:4,genre:'slice',mood:'playful',format:'social'});
assert.equal(JSON.stringify(legacy.topStyles().map(x=>x.s.id)),JSON.stringify(neutral.topStyles().map(x=>x.s.id)),'Legacy text cannot influence ranking');
assert.ok(!Object.hasOwn(legacy.buildRecipeExport().guidedChoices,'optionalStoryIdea'),'No story text in exports');
const firstHTML=app.elements.get('stageView').innerHTML;
assert.doesNotMatch(firstHTML,/Have a story idea|textarea|cue-chip|cue-note|data-example|storyDetails|ideaInput/);
for(const s of STYLES){state.selected=s.id;
 for(const p of [stylePrompt(s),app.panelPrompt(s)]){assert.equal(p.split('\n')[0],storyPlaceholder);assert.equal((p.match(/Story:/g)||[]).length,1);assert.ok(p.split('\n\n')[1].startsWith('Style: '));}
}
assert.ok(legacy.recipeMarkup().includes('data-action="copy-style">Copy Style Prompt</button>\n        <p class="prompt-guidance">'+copyGuidance+'</p>'),'Exact guidance immediately below Copy');
const appSource=fs.readFileSync(__dirname+'/app.js','utf8');
assert.doesNotMatch(appSource,/CUE_RULES|EXAMPLES(?:_V2)?|function cues\(|state\.idea|ideaInput|storyDetails|data-example|optionalStoryIdea/,'No story-text or keyword-detection paths remain');
legacy.events.input({target:{id:'ideaInput',value:legacyStory,dataset:{}}});
assert.ok(!Object.hasOwn(legacy.state,'idea'),'Obsolete input events cannot restore story state');
assert.ok(!legacy.stored.includes(legacyStory));
console.log('Story removal: state/storage/export cleanup, text-independent ranking, exact first lines and copy guidance passed.');

const manifest=JSON.parse(fs.readFileSync(__dirname+'/art_manifest.json'));
const canonical=JSON.parse(fs.readFileSync(__dirname+'/fixtures/canonical-style-names.json','utf8'));
const archivePath=__dirname+'/../../archive/web-app/src/lib/styles.ts';
if(fs.existsSync(archivePath)){
 const archive=fs.readFileSync(archivePath,'utf8');
 const archivedNames=JSON.parse('['+archive.match(/const names = \[(.*?)\];/s)[1].replace(/,\s*$/,'')+']');
 assert.deepEqual(canonical,archivedNames,'The portable canonical fixture must match the studio archive');
}
assert.equal(canonical.length,96);
assert.equal(JSON.stringify(STYLES.map(s=>s.name)),JSON.stringify(canonical));
assert.equal(JSON.stringify(STYLES.map(s=>s.name)),JSON.stringify(manifest.images.map(s=>s.name)));
const recipes=new Map();
for(const s of STYLES){
 assert.equal(s.signatureConfidence,'high',s.name+' has source-prompt evidence');
 assert.equal(s.signatureSource,'art_manifest.json#'+s.id);
 assert.ok(s.signature.split(';').length>=3&&s.signature.split(';').length<=5,s.name+' has 3–5 traits');
 assert.ok(!/Nori|luminous seed|teal scarf|orange jacket|sprout pot/i.test(s.signature),'Sample subject excluded: '+s.name);
 state.selected=s.id;state.recipeEdits={};const r=selectedRecipe();
 const key=JSON.stringify([r.palette,r.linework,r.texture,r.pacing]);
 assert.ok(!recipes.has(key),`Descriptor collision: ${recipes.get(key)} / ${s.name}`);recipes.set(key,s.name);
 const p=stylePrompt(s);assert.ok(p.indexOf(s.signature)<p.indexOf('Palette:'),'Signature leads recipe');
 for(const field of ['Palette:','Linework:','Texture:','Pacing:'])assert.ok(p.includes(field));
}
state.selected=18;assert.match(selectedRecipe().texture,/rubble|grit/i);assert.match(selectedRecipe().palette,/orange.*teal/i);assert.match(STYLES[17].signature,/robot|mech/i);
console.log('P1: all 96 canonical names, source-backed subject-free signatures, unique recipes and signature-first prompts passed.');
for(const mood of ['playful','warm','mysterious','dreamy','dynamic','intimate','cerebral','any']){
 for(const format of ['any','social','vertical','page','strip']){
  state.mood=mood;state.format=format;state.selected=13;state.recipeEdits={};
  for(const p of [stylePrompt(STYLES[12]),app.panelPrompt(STYLES[12])]){
   assert.doesNotMatch(p,/\ba\s+[aeiou]/i,`${mood}/${format}: article grammar`);
   assert.ok(!p.includes('&'),`${mood}/${format}: conjunction`);
   assert.equal((p.match(/Keep recurring characters recognizable/g)||[]).length,format==='any'?0:1,'Continuity belongs only to the Format section');
  }
  assert.equal(stylePrompt(STYLES[12]).split('\n')[0],storyPlaceholder);
 }
}
assert.equal(app.panelPrompt(STYLES[12]).split('\n')[0],storyPlaceholder);
assert.ok(!app.recipeMarkup().includes('Add your story'));
state.mood='dynamic';assert.match(stylePrompt(STYLES[12]),/an excited and energized feeling/i);
for(const s of STYLES){state.selected=s.id;assert.ok(!app.selectedRecipe().consistency.includes('not a request to copy a specific artist'));}
console.log('P2: every feeling × legacy/current format grammar, fixed story placeholder and single continuity instruction passed.');
const formats={social:['3:4 portrait','6–8 slides','one image per slide','centered 4:5 area'],vertical:['one image per panel','3:4 portrait','9:16 for a tall dramatic panel'],page:['one 3:4 portrait image','4–6 panels in a grid','clear white gutters'],strip:['one 16:9 widescreen image','3–4 equal panels','setup, reaction, payoff'],any:[]};
for(const [format,specs] of Object.entries(formats)){
 state.format=format;state.approach='any';state.selected=13;
 const p=stylePrompt(STYLES[12]);for(const spec of specs)assert.ok(p.includes(spec),format+' '+spec);
 if(format==='any')assert.ok(!p.includes('Format:'));
 for(const approach of ['wordless','explainer']){
  state.approach=approach;const full=app.panelPrompt(STYLES[12]);
  const instruction=approach==='wordless'?'minimal or no text':'labels, arrows and simple diagrams';
  assert.ok(stylePrompt(STYLES[12]).includes(instruction));assert.ok(full.includes(instruction));
 }
}
for(const legacy of ['wordless','explainer']){const migrated=load({format:legacy,step:3,genre:'comedy'});assert.equal(migrated.state.format,'any');assert.equal(migrated.state.approach,legacy);}
assert.equal(load({approach:['wordless']}).state.approach,'any');
state.step=3;app.renderStage();const formatHTML=app.elements.get('stageView').innerHTML;
assert.ok(formatHTML.includes('Visual explainer'));assert.equal((formatHTML.match(/data-format=/g)||[]).length,5);assert.equal((formatHTML.match(/data-approach=/g)||[]).length,2);
const rank=()=>JSON.stringify(app.topStyles().map(x=>x.s.id));state.genre='comedy';state.mood='any';state.finish='any';state.color='any';state.audience='everyone';state.format='any';state.approach='any';const baseline=rank();
for(const format of ['social','vertical','page','strip']){state.format=format;assert.notEqual(rank(),baseline,'Format changes a recommendation ranking: '+format);}
for(const approach of ['wordless','explainer']){
 let changed=false;
 for(const genre of ['comedy','mystery','scifi','educational','romance']){state.genre=genre;state.format='any';state.approach='any';const plain=rank();state.approach=approach;if(rank()!==plain)changed=true;}
 assert.ok(changed,'Approach can change ranking: '+approach);
}
console.log('P3: exact format/approach specs, five choices, legacy migration and actual ranking changes passed.');

state.format='any';state.approach='any';const noFormatScore=app.scoreStyle(STYLES[12]).score;state.format='strip';assert.equal(app.scoreStyle(STYLES[12]).score-noFormatScore,9);
state.format='any';const noApproachScore=app.scoreStyle(STYLES[10]).score;state.approach='explainer';assert.equal(app.scoreStyle(STYLES[10]).score-noApproachScore,8);
const memoir=load({genre:'memoir',step:3,idea:'A remembered summer',selected:51,recipeEdits:{palette:'Sepia'}});
assert.equal(memoir.state.genre,'slice');assert.ok(!Object.hasOwn(memoir.state,'idea'));assert.equal(memoir.state.recipeEdits.palette,'Sepia');
const kids=load({genre:'kids',step:3,audience:'everyone'});assert.equal(kids.state.genre,null);assert.equal(kids.state.audience,'kids');assert.equal(kids.state.step,1);
assert.equal(load({genre:'kids',step:4,selected:24}).state.selected,24);
state.step=1;state.genre=null;app.renderStage();const genresHTML=app.elements.get('stageView').innerHTML;
assert.equal((genresHTML.match(/data-genre=/g)||[]).length,9);assert.ok(genresHTML.includes('Everyday &amp; personal')||genresHTML.includes('Everyday & personal'));
assert.ok(!genresHTML.includes('For kids'));assert.ok(!genresHTML.includes('Personal stories'));
console.log('P4: nine story categories, merged personal history, kids audience migration and saved edit preservation passed.');
const bests=new Set(),avoids=new Set();
for(const s of STYLES){
 assert.equal(typeof s.bestFor,'string',s.name+' bestFor');assert.equal(typeof s.avoidIf,'string',s.name+' avoidIf');
 assert.ok(s.bestFor.length<=125&&s.avoidIf.length<=125);bests.add(s.bestFor);avoids.add(s.avoidIf);
 const html=app.card(s,app.scoreStyle(s),1);
 assert.ok(html.includes(s.bestFor.replace(/&/g,'&amp;').replace(/'/g,'&#39;')));assert.ok(!html.includes('Story type match:'));assert.ok(!html.includes('Reader feeling match:'));
 assert.ok(!html.includes('STRONG START'));assert.doesNotMatch(html,/(?<!&)#\d+/);
 state.selected=s.id;assert.ok(app.recipeMarkup().includes(s.avoidIf.replace(/&/g,'&amp;').replace(/'/g,'&#39;')));
}
assert.equal(bests.size,96,'Specific best-for reasons');assert.equal(avoids.size,96,'Specific avoid-if trade-offs');
console.log('P5: all 96 distinct best-for and avoid-if lines, differentiated cards, no unexplained badge or visible IDs passed.');
const cleanState=load({step:4,genre:'comedy',shortlist:[4,7]});assert.ok(!Object.hasOwn(cleanState.state,'shortlist'));
const html=cleanState.elements.get('stageView').innerHTML;assert.ok(!html.includes('Shortlist'));assert.ok(!html.includes('data-action="compare"'));
cleanState.events.click({target:{closest:()=>({dataset:{action:'detail',id:'18'},hasAttribute:()=>false})}});
assert.equal(cleanState.state.selected,18,'A card opens the details view directly');
const detail=cleanState.elements.get('stageView').innerHTML;
assert.ok(detail.indexOf('class="selected-sample"')<detail.indexOf('READY-TO-USE STYLE PROMPT'),'Sample comes first');
assert.equal((detail.match(/data-action="copy-style"/g)||[]).length,1);
assert.ok(detail.indexOf('copy-style')<detail.indexOf('id="advancedRecipe"'));
assert.ok(detail.includes('<details class="advanced-recipe" id="advancedRecipe">'),'Advanced starts collapsed');
assert.ok(!detail.includes('data-action="export"'),'JSON export hidden by default');
assert.ok(!detail.includes('Download Style Recipe'),'No disabled-export copy');
assert.ok(detail.includes('data-action="copy-style-only"'));
assert.deepEqual(Array.from(cleanState.buildRecipeExport().comparisonShortlist),[],'Retain compatible export key without shortlist state');
const source=fs.readFileSync(__dirname+'/app.js','utf8');assert.match(source,/const ENABLE_RECIPE_DOWNLOAD\s*=\s*false/);assert.ok(source.includes('function downloadRecipe()'));
console.log('P6: direct details, sample-first order, collapsed Advanced, removed shortlist, preserved hidden export passed.');

// Final review regressions: sample subjects, edited intent and navigation.
for(const s of STYLES){state.selected=s.id;state.recipeEdits={};state.format='any';state.approach='any';
 assert.doesNotMatch(stylePrompt(s),/Planting setup|sneeze reversal|Water absorption|root growth|shoot growth|kitchen|rooftop-scale|crystal ridges|alien moons|soil cutaway/i,s.name+' must not import the sample scene');}
state.selected=45;state.recipeEdits={linework:'Detailed crosshatched figures'};
for(const p of [stylePrompt(STYLES[44]),app.panelPrompt(STYLES[44])])assert.ok(p.includes('Edited visual fields take precedence over the signature.'));
for(const [id,approach] of [[71,'explainer'],[84,'wordless']]){state.selected=id;state.recipeEdits={};state.approach=approach;
 for(const p of [stylePrompt(STYLES[id-1]),app.panelPrompt(STYLES[id-1])])assert.ok(p.includes('Approach instructions override sample text and labeling conventions.'));}
const nav=load({step:4,selected:18,genre:'scifi',recipeEdits:{palette:'Amber and indigo'}});
const click=dataset=>nav.events.click({target:{closest:()=>({dataset,hasAttribute:k=>k==='data-step'&&Object.hasOwn(dataset,'step')})}});
click({step:'1'});click({step:'4'});assert.equal(nav.state.selected,18);assert.equal(nav.state.recipeEdits.palette,'Amber and indigo');
assert.ok(!nav.elements.get('stageView').innerHTML.includes('id="advancedRecipe"'),'Discover shows results without losing selection');
click({action:'detail',id:'18'});assert.equal(nav.state.recipeEdits.palette,'Amber and indigo');
click({action:'clear-selection'});click({action:'detail',id:'18'});assert.equal(nav.state.recipeEdits.palette,'Amber and indigo');
click({action:'browse'});click({action:'detail',id:'18'});assert.equal(nav.state.recipeEdits.palette,'Amber and indigo');
click({action:'detail',id:'7'});assert.equal(Object.keys(nav.state.recipeEdits).length,0,'Changing style resets recipe edits');
console.log('Review regressions: subject-free reusable instructions, explicit override precedence and navigation preserves edits passed.');

const enabled=load({step:4,genre:'scifi',selected:18},{enableDownload:true});
assert.ok(enabled.elements.get('stageView').innerHTML.includes('data-action="export"'),'Code-level flag can restore JSON download');
for(const mood of ['any','playful','warm','mysterious','dreamy','dynamic','intimate','cerebral'])for(const format of Object.keys(formats))for(const approach of ['any','wordless','explainer']){
 state.mood=mood;state.format=format;state.approach=approach;state.selected=13;state.recipeEdits={};
 for(const p of [stylePrompt(STYLES[12]),app.panelPrompt(STYLES[12])]){assert.doesNotMatch(p,/\ba\s+[aeiou]/i);assert.ok(!p.includes('&'));assert.equal(p.split('\n')[0],storyPlaceholder);}
}
console.log('Full 120-choice grammar matrix and optional JSON flag restoration passed.');

state.selected=18;state.recipeEdits={};state.approach='wordless';state.mood='warm';
const reusable=app.styleOnlyPrompt(STYLES[17]);
for(const format of ['any','social','vertical','page','strip'])for(const channel of ['instagram','linkedin','rednote']){
 state.format=format;state.carouselChannel=channel;assert.equal(app.styleOnlyPrompt(STYLES[17]),reusable,'Style block is independent of format/channel');
 const exported=app.buildRecipeExport();assert.equal(exported.styleOnlyPrompt,reusable);assert.equal(exported.creativeDirectionPrompt,exported.stylePrompt);
}
console.log('Style-only reuse across formats/channels and export compatibility passed.');

state.selected=18;state.format='page';
for(const consistency of ['', '   ', '...', '!!!']){
 state.recipeEdits={consistency};assert.ok(stylePrompt(STYLES[17]).includes('Consistency: Keep recurring characters recognizable from panel to panel.'),'Blank consistency keeps the default rule');
}

}
module.exports={load};
