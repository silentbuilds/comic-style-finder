// Run with playwright-cli run-code --filename=tests/test_typography.js at the local source URL.
// Uses only the disposable browser session's storage.
async page => {
  const measurements=[];
  const assert=(ok,message)=>{if(!ok)throw Error(message);};
  const frame=()=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  // Routing disables the preview's HTTP cache, so rapid CSS edits are measured freshly.
  await page.route('**/*',route=>route.continue());
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const viewport of [{width:1280,height:800},{width:390,height:844},{width:320,height:800},{width:640,height:400}]){
    await page.setViewportSize(viewport);
    await page.evaluate(()=>localStorage.removeItem('comic_style_finder_v2'));
    await page.reload();
    for(let step=1;step<=3;step++){
      if(step>1)await page.locator(`[data-step="${step}"]`).click();
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await frame();
      const info=await page.evaluate(()=>{
        const card=document.querySelector('.choice-card');
        const rect=card.getBoundingClientRect();
        return {heading:parseFloat(getComputedStyle(document.querySelector('#wizardTitle')).fontSize),
          descriptions:[...document.querySelectorAll('.choice-desc')].map(el=>parseFloat(getComputedStyle(el).fontSize)),
          firstCard:{top:Math.round(rect.top),bottom:Math.round(rect.bottom)},overflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert(info.descriptions.every(size=>size>=16),`${viewport.width}px step ${step}: descriptions must be at least 16px`);
      assert(!info.overflow,`${viewport.width}px step ${step}: no horizontal overflow`);
      if(viewport.height>=800)assert(info.firstCard.top>=0&&info.firstCard.bottom<=viewport.height,`${viewport.width}px step ${step}: first answer row visible without scrolling`);
      measurements.push({viewport,step,...info});
      if(viewport.width===1280||viewport.width===390)await page.screenshot({path:`/tmp/comic-type-step-${step}-${viewport.width}.png`});
      if(step===1)await page.locator('[data-genre=slice]').click();
    }
    await page.locator('[data-format=social]').click();
    await page.locator('[data-step="4"]').click();await frame();
    const resultSizes=await page.locator('.recommend-grid .style-desc,.recommend-grid .reason-block').evaluateAll(els=>els.map(el=>parseFloat(getComputedStyle(el).fontSize)));
    assert(resultSizes.every(size=>size>=16),`${viewport.width}px results: descriptions at least 16px`);
    await page.locator('[data-action=browse]').click();
    const catalogSizes=await page.locator('.catalog-grid .style-desc').evaluateAll(els=>els.map(el=>parseFloat(getComputedStyle(el).fontSize)));
    assert(catalogSizes.length>0&&catalogSizes.every(size=>size>=16),`${viewport.width}px catalog: descriptions at least 16px`);
    const catalogWidth=await page.locator('.catalog-grid .style-card').first().evaluate(el=>({outer:el.clientWidth,button:el.firstElementChild.clientWidth}));
    assert(catalogWidth.button>=catalogWidth.outer-2,`${viewport.width}px catalog: card content uses the available width`);
    if(viewport.width===390)await page.locator('.catalog-grid .style-card').first().screenshot({path:'/tmp/comic-type-catalog-after.png'});
    await page.locator('.catalog-grid [data-action=detail]').first().click();
    const promptSize=await page.locator('#stylePromptText').evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    assert(promptSize>=16,`${viewport.width}px details: prompt at least 16px`);
    await page.locator('#advancedRecipe summary').click();
    const helpers=await page.locator('.advanced-recipe summary small,.prompt-guidance,.recipe-form label').evaluateAll(els=>els.map(el=>parseFloat(getComputedStyle(el).fontSize)));
    assert(helpers.every(size=>size>=14),`${viewport.width}px details: helpers at least 14px`);
    const contrast=await page.locator('.advanced-recipe summary small').evaluate(el=>{
      const luminance=value=>{
        const rgb=value.match(/[\d.]+/g).slice(0,3).map(Number).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
        return rgb.reduce((total,n,i)=>total+n*[.2126,.7152,.0722][i],0);
      };
      const foreground=luminance(getComputedStyle(el).color);
      const background=luminance(getComputedStyle(el.closest('.stage-surface')).backgroundColor);
      return (Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05);
    });
    assert(contrast>=4.5,`${viewport.width}px details: helper contrast at least 4.5:1`);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${viewport.width}px details: no horizontal overflow`);
    if(viewport.width===1280||viewport.width===390){
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await frame();
      await page.screenshot({path:`/tmp/comic-type-details-${viewport.width}.png`,fullPage:true});
    }
  }
  return {status:'PASS',measurements};
}
