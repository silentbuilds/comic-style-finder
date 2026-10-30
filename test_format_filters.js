const assert=require('node:assert/strict');
const {load}=require('./test_prompt_revision');
const placeholder='Story: [Who is it about, where are they, and what happens? 1–3 sentences]';
const specs={
 any:[],
 social:['one image per slide','6–8 slides','3:4 portrait','centered 4:5 area'],
 vertical:['one image per panel','3:4 portrait','9:16','tall dramatic panel'],
 page:['one 3:4 portrait image','4–6 panels in a grid','clear white gutters'],
 strip:['one 16:9 widescreen image','3–4 equal panels','left to right','setup, reaction, payoff']
};
const sizes={social:'Portrait 3:4',vertical:'Portrait 3:4 or Story 9:16',page:'Portrait 3:4',strip:'Widescreen 16:9'};
const after={
 social:'Generate one image per slide with the same character description each time, then post as is.',
 linkedin:'Generate one image per slide with the same character description each time. Crop each slide to 4:5 (1080×1350), then combine the slides into one PDF.',
 vertical:'Generate one image per panel, then stack them top to bottom with white gaps (any image editor or Canva works).',
 page:'One image holds all the panels. If the panels look inconsistent, generate each panel separately and arrange them.',
 strip:'One image holds all the panels. If the panels look inconsistent, generate each panel separately and arrange them.'
};
const app=load(),{state,STYLES}=app;
assert.equal(state.carouselChannel,'instagram','Default carousel channel');
for(const value of [null,[],{},'invalid'])assert.equal(load({carouselChannel:value}).state.carouselChannel,'instagram');
assert.equal(load({carouselChannel:'linkedin'}).state.carouselChannel,'linkedin');
let cases=0;
for(const format of Object.keys(specs))for(const channel of ['instagram','linkedin','rednote'])for(const approach of ['any','wordless','explainer']){
 state.selected=18;state.format=format;state.carouselChannel=channel;state.approach=approach;state.recipeEdits={};
 for(const prompt of [app.stylePrompt(STYLES[17]),app.panelPrompt(STYLES[17])]){
  assert.equal(prompt.split('\n')[0],placeholder);
  for(const spec of specs[format])assert.ok(prompt.includes(spec),`${format}/${channel}/${approach}: ${spec}`);
  if(format==='any')assert.doesNotMatch(prompt,/Format:|3:4|9:16|16:9|6–8 slides/);
  if(format==='social')assert.doesNotMatch(prompt,/4:5 portrait|1080×1350|one PDF/,'Cropping is post-generation guidance');
  if(approach==='wordless')assert.ok(prompt.includes('minimal or no text'));
  if(approach==='explainer')assert.ok(prompt.includes('labels, arrows and simple diagrams'));
 }
 const styleOnly=app.styleOnlyPrompt(STYLES[17]);assert.ok(styleOnly.startsWith('Style: '));assert.doesNotMatch(styleOnly,/Story:|Format:|Consistency:/);assert.equal(app.stylePrompt(STYLES[17]).split('\n\n')[1],styleOnly);
 const html=app.recipeMarkup().replace(/&#39;/g,"'");
 if(format==='any')assert.ok(!html.includes('Before generating')&&!html.includes('After generating'));
 else{
  const size=`Before generating, set your tool's image size to ${sizes[format]}. In ChatGPT, use the image size option; 'Auto' usually makes squares.`;
  assert.ok(html.includes(size),format+' size guidance');
  assert.ok(html.indexOf(size)<html.indexOf('data-action="copy-style"'));
  const next=after[format==='social'&&channel==='linkedin'?'linkedin':format];
  assert.ok(html.includes(next),format+'/'+channel+' after guidance');
  assert.ok(html.indexOf(next)>html.indexOf('data-action="copy-style"'));
 }
 state.step=3;app.renderStage();const step=app.elements.get('stageView').innerHTML;
 assert.equal((step.match(/name="carouselChannel"/g)||[]).length,format==='social'?3:0);
 if(format==='social'){
  assert.equal((step.match(/name="carouselChannel"[^>]* checked/g)||[]).length,1);
  app.events.change({target:{name:'carouselChannel',value:channel,id:'',dataset:{}}});assert.equal(state.carouselChannel,channel);
 }
 cases++;
}
state.step=3;state.format='social';app.renderStage();const formatHTML=app.elements.get('stageView').innerHTML;
assert.equal((formatHTML.match(/Works best with simple scenes/g)||[]).length,2);
assert.match(formatHTML,/format-social[^]*?<svg/,'Carousel has a distinct stacked-card SVG');
state.selected=18;assert.equal(app.buildRecipeExport().guidedChoices.carouselChannel,state.carouselChannel);
console.log(`B: ${cases} format × channel × approach combinations, exact prompt specs, generation guidance, channel state and format cards passed.`);
// C: the approach is optional and exclusive; an active choice can be switched off.
const approachApp=load({step:3,genre:'scifi'});
const clickApproach=approach=>approachApp.events.click({target:{closest:()=>({dataset:{approach},hasAttribute:()=>false})}});
clickApproach('wordless');assert.equal(approachApp.state.approach,'wordless');
clickApproach('explainer');assert.equal(approachApp.state.approach,'explainer');
assert.match(approachApp.elements.get('stageView').innerHTML,/data-approach="wordless" aria-pressed="false"/);
assert.match(approachApp.elements.get('stageView').innerHTML,/data-approach="explainer" aria-pressed="true"/);
clickApproach('explainer');assert.equal(approachApp.state.approach,'any');
const diagramIds=[11,32,43,45,60,76,84,95,96];
const beforeScores=new Map(approachApp.STYLES.map(s=>[s.id,approachApp.scoreStyle(s).score]));
const beforeRanking=JSON.stringify(approachApp.topStyles().map(x=>x.s.id));
clickApproach('explainer');
for(const id of diagramIds)assert.equal(approachApp.scoreStyle(approachApp.STYLES[id-1]).score-beforeScores.get(id),8,'Diagram affinity '+id);
assert.equal(approachApp.scoreStyle(approachApp.STYLES[0]).score,beforeScores.get(1),'No unrelated diagram boost');
assert.notEqual(JSON.stringify(approachApp.topStyles().map(x=>x.s.id)),beforeRanking,'Visual explainer changes a sci-fi recommendation ranking');
console.log('C: exclusive/off approach transitions and +8 diagram-friendly ranking boost passed.');
// D: neutral results filters update visible recommendations immediately.
const results=load({step:4});
const getGridIds=()=>Array.from(results.elements.get('stageView').innerHTML.matchAll(/data-action="detail" data-id="(\d+)"/g),m=>Number(m[1]));
const changeFilter=(id,value)=>results.events.change({target:{id,value,name:'',dataset:{}}});
const initialIds=getGridIds();assert.equal(initialIds.length,6);
let resultsHTML=results.elements.get('stageView').innerHTML;
assert.ok(resultsHTML.includes('class="results-filters"'));
assert.ok(resultsHTML.indexOf('id="finishSelect"')<resultsHTML.indexOf('class="recommend-grid"'));
assert.equal(results.state.finish,'any');assert.equal(results.state.color,'any');assert.equal(results.state.audience,'everyone');
changeFilter('finishSelect','painterly');assert.notDeepEqual(getGridIds(),initialIds);
assert.ok(results.topStyles().every(row=>row.s.finishes.includes('painterly')),'Art treatment filters eligible styles');
changeFilter('finishSelect','any');changeFilter('colorSelect','mono');
assert.notDeepEqual(getGridIds(),initialIds);assert.ok(getGridIds().includes(2));assert.ok(!getGridIds().includes(4));
changeFilter('colorSelect','any');changeFilter('audienceSelect','adult');
assert.notDeepEqual(getGridIds(),initialIds);assert.ok(results.topStyles().every(row=>row.s.audience.includes('adult')));
changeFilter('finishSelect','minimal');changeFilter('colorSelect','bright');
assert.equal(getGridIds().length,0);assert.ok(results.elements.get('stageView').innerHTML.includes('No styles match these filters'));
results.events.click({target:{closest:()=>({dataset:{action:'clear-filters'},hasAttribute:()=>false})}});
assert.deepEqual(getGridIds(),initialIds,'Clear filters restores neutral suggestions');
results.state.tab='all';changeFilter('audienceSelect','kids');
assert.ok(results.elements.get('stageView').innerHTML.includes('14 of 96 styles'),'Catalog also respects results filters');
results.state.step=3;results.renderStage();const step3=results.elements.get('stageView').innerHTML;
assert.doesNotMatch(step3,/finishSelect|colorSelect|audienceSelect|class="refinements"|Optional →/);
console.log('D: neutral defaults, immediate grid changes for all three filters, eligible styles, empty/reset handling and catalog filtering passed.');

results.state.step=4;results.state.family='Experimental';results.state.query='nonexistent';results.renderStage();assert.ok(results.elements.get('stageView').innerHTML.includes('style filters'),'Catalog empty guidance accounts for global filters');
