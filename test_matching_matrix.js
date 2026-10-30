const assert=require('node:assert/strict');
const fs=require('node:fs');
const {load}=require('./test_prompt_revision');
const {state,topStyles}=load();
const genres=['comedy','romance','mystery','slice','fantasy','scifi','horror','adventure','educational'];
const moods=['any','playful','warm','mysterious','dreamy','dynamic','intimate','cerebral'];
const formats=['any','social','vertical','page','strip'],approaches=['any','wordless','explainer'];
const rank=(format,approach)=>{state.format=format;state.approach=approach;return JSON.stringify(topStyles().map(x=>x.s.id));};
const rows=[],formatChanges=Object.fromEntries(formats.slice(1).map(k=>[k,0])),approachChanges={wordless:0,explainer:0};
let count=0,unchanged=0,unchangedFormats=0,unchangedApproaches=0;
for(const genre of genres)for(const mood of moods){
 state.genre=genre;state.mood=mood;const neutral=rank('any','any');
 const same=[],sameFormats=[],sameApproaches=[];
 for(const format of formats)for(const approach of approaches){
  const current=rank(format,approach);count++;
  assert.equal(new Set(JSON.parse(current)).size,6);
  if((format!=='any'||approach!=='any')&&current===neutral){same.push(`${format}/${approach}`);unchanged++;}
  if(format!=='any'){
   if(current===rank('any',approach)){sameFormats.push(`${format}/${approach}`);unchangedFormats++;}else formatChanges[format]++;
  }
  if(approach!=='any'){
   if(current===rank(format,'any')){sameApproaches.push(`${format}/${approach}`);unchangedApproaches++;}else approachChanges[approach]++;
  }
 }
 rows.push({genre,mood,same,sameFormats,sameApproaches});
}
assert.equal(count,1080);
for(const [choice,n] of Object.entries({...formatChanges,...approachChanges}))assert.ok(n>0,choice+' changes at least one recommendation ranking');
const header=`# Ranking sensitivity audit — 29 October 2026\n\nExamined ${count} combinations: 9 story types × 8 feelings × 5 formats × 3 approaches. No story-text input; refinements at their defaults. A ranking means the ordered six IDs, including the existing maximum of two per family. “Unchanged” means a score bonus did not change those six IDs or their order; it is not a guarantee that changing another input stays inert.\n\n- ${unchanged} of 1008 non-neutral format/approach pairs retain the neutral (any/any) ranking.\n- ${unchangedFormats} of 864 explicit-format comparisons retain the ranking for “any format” with the same approach.\n- ${unchangedApproaches} of 720 explicit-approach comparisons retain the ranking for “no approach” with the same format.\n- Actual changed rankings by format: ${JSON.stringify(formatChanges)}.\n- Actual changed rankings by approach: ${JSON.stringify(approachChanges)}.\n\nBoth scores remain independently testable (+9 format, +8 approach). Family diversity and existing strong matches can preserve the same ranking. The finder does not fabricate a ranking difference.\n\nEach cell below exhaustively lists the unchanged format/approach pairs for that story type and feeling; “—” means none. Keys: any = unspecified, social = carousel, vertical = webcomic, page = classic page, strip = short strip.\n\n| Story type | Feeling | Same as neutral | Format makes no ranking change | Approach makes no ranking change |\n| --- | --- | --- | --- | --- |\n`;
const report=header+rows.map(r=>`| ${r.genre} | ${r.mood} | ${r.same.join(', ')||'—'} | ${r.sameFormats.join(', ')||'—'} | ${r.sameApproaches.join(', ')||'—'} |`).join('\n')+'\n';
if(process.argv.includes('--write'))fs.writeFileSync(__dirname+'/docs/MATCHING-AUDIT.md',report);
else assert.equal(fs.readFileSync(__dirname+'/docs/MATCHING-AUDIT.md','utf8'),report,'Ranking audit must match current scoring');
console.log(JSON.stringify({combinations:count,unchangedFromNeutral:unchanged,unchangedFormats,unchangedApproaches,formatChanges,approachChanges}));
