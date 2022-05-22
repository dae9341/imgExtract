const {chromium,devices} = require('playwright');
const iPhone = devices['iPhone 6'];

(async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext()
    const page = await browser.newPage();
    await page.goto('https://www.gongyoungshop.kr/event/selectEventDetail.do?eventNo=1160');  
    await page.on('domcontentloaded', async()=>{
        // await page.screenshot({path:'event.png',fullPage:true});
    })();

    await browser.close();
})();