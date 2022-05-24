const {chromium,devices} = require('playwright');
const iPhone = devices['iPhone 6'];
const fs = require('fs');

// TODO: 중복제거, 이미지url포맷변경, 안보이는 이미지 해결책 
(async()=>{
    const browser = await chromium.launch({
        headless:true
    });
    const context = await browser.newContext({
        ...iPhone
    });
    const page = await context.newPage();
    await page.goto('https://sm.gongyoungshop.kr/event/selectEventDetail.do?eventNo=1206');
    var srcs = await page.evaluate(function(){
        let srcList = [];
        $('.eventContentWrap img').each(function(){
            let $this = $(this);
            srcList.push($this.attr('src').split('img.publichs.com')[1]);
        });
        return srcList;
    })


    var bgs = await page.evaluate(function(){
        let bgList = [];

        function getChildrenEl(wrapperId){
            let $wrapperId = $(wrapperId);
            if($(wrapperId).children().length){
                $(wrapperId).children().each(function(){
                    if($(this).css("background-image")=='none') return;
                    let imgUrl = $(this).css("background-image").replace('url("','').replace('")','');
                    bgList.push(imgUrl.split('img.publichs.com')[1]);
                    getChildrenEl($(this));
                })
            }
        }

        getChildrenEl($('.eventContentWrap'));

        return bgList;
    })

    srcs = srcs.concat(bgs);

    await fs.writeFile('imgList.json',JSON.stringify(srcs),function(err){
        if(err) throw err;
        console.log('[fs] write json');
    });
    


    await browser.close()
    
})();
