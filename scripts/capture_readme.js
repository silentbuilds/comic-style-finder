// Run at the local app URL with playwright-cli run-code --filename=scripts/capture_readme.js.
// Use a disposable browser: this clears only that session's finder storage.
async page => {
  await page.setViewportSize({width:1280,height:800});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>localStorage.removeItem('comic_style_finder_v2'));
  await page.reload();
  const shot=async name=>{
    await page.evaluate(async()=>{
      await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
      document.activeElement?.blur();
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    });
    await page.screenshot({path:`build/readme-frames/${name}.png`});
  };
  await page.locator('[data-genre=fantasy]').click();
  await page.evaluate(()=>scrollTo(0,0));await shot('01-story');
  await page.locator('[data-action=next]').click();
  await page.locator('[data-mood=dreamy]').click();
  await page.evaluate(()=>scrollTo(0,0));await shot('02-feeling');
  await page.locator('[data-action=next]').click();
  await page.locator('[data-format=page]').click();
  await page.evaluate(()=>scrollTo(0,0));await shot('03-format');
  await page.locator('[data-action=next]').click();
  await page.locator('.style-card').first().waitFor();
  await page.locator('.style-card').first().scrollIntoViewIfNeeded();
  await shot('04-results');
  const water=page.locator('[data-action=detail][data-id="7"]');
  if(await water.count())await water.click();
  else await page.locator('[data-action=detail]').first().click();
  await page.locator('[data-action=copy-style]').waitFor();
  await page.locator('#toast').waitFor({state:'hidden'});
  await page.evaluate(()=>scrollTo(0,document.querySelector('#selectedTitle').getBoundingClientRect().top+scrollY-110));
  await shot('05-detail');
  return {viewport:page.viewportSize(),frames:5,detail:await page.locator('#stageView').innerText()};
}
