const puppeteer = require("puppeteer");

function teacherRoute(app) {
  // generateReport for user
  app.post("/report/generateFacultyReport", async (req, res) => {
    const { userId, otherOptions, years } = req.body;

    const fileName = `FacultyReport-${new Date().getTime()}.pdf`;
    console.log("File name generated :", fileName);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const link = `${
      process.env.Report_Main_URL
    }/report/facultyReport/${userId}/${JSON.stringify(years)}/${JSON.stringify(
      otherOptions
    )}`;

    console.log("Link : ", link);
    await page.goto(link, { waitUntil: "networkidle0", timeout: 200000 });
    await page.pdf({
      path: `pdfs/${fileName}`,
      printBackground: true,
      scale: 0.6,
      format: "A4",
      margin: { top: "50px", right: "10px", bottom: "50px", left: "10px" },
      displayHeaderFooter: true,
      headerTemplate: "<div style='font-size:7px;'></div>",
      footerTemplate: `<div style='font-size:7px; padding-left: 300px;'><span class='pageNumber'></span> of <span class='totalPages'></span></div>`,
    });
    await browser.close();
    res.send({ status: "generated", fileName });
  });
}

module.exports = teacherRoute;
