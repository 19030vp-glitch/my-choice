const puppeteer = require('puppeteer')


async function pupetteerSetting({ linkToNavigate, fileName }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(linkToNavigate,
        { waitUntil: 'networkidle0', timeout: 200000 });
    await page.pdf({
        path: `pdfs/${fileName}`,
        printBackground: true,
        scale: 0.6,
        format: "A4",
        margin: { top: '50px', right: '10px', bottom: '50px', left: '10px' },
        displayHeaderFooter: true,
        headerTemplate: "<div style='font-size:7px;'></div>",
        footerTemplate: `<div style='font-size:7px; padding-left: 300px;'><span class='pageNumber'></span> of <span class='totalPages'></span></div>`
    });
    await browser.close()
}

module.exports = { pupetteerSetting }