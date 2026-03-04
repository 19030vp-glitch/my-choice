const CASModel = require("../../models/faculty-models/pbasModel")
require('dotenv').config();
const puppeteer = require('puppeteer')
const path = require('path');

function casRoutes(app) {

    // multer configuration
    const multer = require('multer')
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const link = path.join(__dirname, `../../uploads/faculty-uploads/PBAS-uploads/`)
            cb(null, link)
        },
        filename: (req, file, cb) => {
            cb(null, `PBAS-TeachingActivity-${new Date().getTime()}-${file.originalname}`)
        },

    })
    const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })

    async function pupetteerSetting(fileName, userData, selectedYear, forPrintOut) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const link = `${process.env.Report_Main_URL}/report/PBASReport/${userData._id}/${JSON.stringify(selectedYear)}/${forPrintOut}`

        console.log("PBAS Report:", link)

        await page.goto(link,
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

    // for generating cas report
    app.post("/generatePBASReport", async (req, res) => {

        const { userData, selectedYear, forPrintOut } = req.body;

        const name = `${userData?.salutation} ${userData?.name}`;
        const fileName = `${name}-PBASReport-${new Date().getTime()}.pdf`;

        try {
            await pupetteerSetting(fileName, userData, selectedYear, forPrintOut,)
            res.send({ status: "generated", fileName: fileName });

        } catch (error) {
            console.log(error)
            res.send({ status: "error", message: 'Could not generate report, please try again later...' });
        }


    });


    // for saving cas data
    app.post("/savePBASDetails", (req, res) => {

        const { casData, userId } = req.body;

        // check if cas data for this user already exists
        CASModel.findOne({ userId: userId }, (err, cas) => {
            if (err) {
                console.log(err);
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (cas) {
                    // if cas data exist only push into that array
                    // remove cas array item with same year as in casData

                    cas.casData.forEach((item, index) => {
                        if (JSON.parse(item).casYear === casData.casYear) {
                            cas.casData.splice(index, 1);
                        }
                    })

                    cas.casData.push(JSON.stringify(casData));
                    cas.save((err, cas) => {
                        if (err) {
                            console.log(err);
                            res.send({ status: "error", message: "Error saving data" })
                        }
                        else {
                            res.send({ status: 'success', data: cas });
                        }
                    }
                    )
                }
                else {
                    // if cas data does not exist create new one
                    const newCAS = new CASModel({
                        userId: userId,
                        casData: [JSON.stringify(casData)]
                    });
                    newCAS.save((err, cas) => {
                        if (err) {
                            console.log('error', err);
                            res.send({ status: "error", message: "Error saving data" })
                        }
                        else {
                            console.log('success')
                            res.send({ status: 'success', data: cas });

                        }
                    }
                    )
                }
            }
        })
    });


    // for fetching cas data
    app.post("/getPBASData", (req, res) => {
        const { userId } = req.body;
        CASModel.findOne({ userId: userId }).populate("userId").exec().then((cas, err) => {
            if (err) {
                console.log(err)
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (cas) {
                    res.send({ status: 'success', data: cas });
                }
                else {
                    res.send({ status: 'error', message: "No data found" });
                }
            }
        }
        )
    })

    // for fetching cas data
    app.post("/getTotalPBASData", (req, res) => {
        CASModel.find({}).lean().populate("userId").exec().then((cas, err) => {
            if (err) {
                console.log(err)
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (cas) {
                    res.send({ status: 'success', data: cas });
                }
                else {
                    res.send({ status: 'error', message: "No data found" });
                }
            }
        }
        )
    })




    // for uploading teaching related activity files
    const arrayOfFields = [{ name: 'file-A', maxCount: 1 }, { name: 'file-B', maxCount: 1 },
    { name: 'file-C', maxCount: 1 }, { name: 'file-D', maxCount: 1 }, { name: 'file-E', maxCount: 1 },
    { name: 'file-F', maxCount: 1 }, { name: 'file-G', maxCount: 1 }, { name: 'attendance', maxCount: 1 },
    { name: 'refereed', maxCount: 1 }, { name: 'impactFactor', maxCount: 1 }, { name: 'stage1FDP', maxCount: 1 },
    { name: 'stage1MultiProof', maxCount: 1 }, { name: 'phdDegree', maxCount: 1 },
    { name: 'stage2File1', maxCount: 1 }, { name: 'stage2File2', maxCount: 1 },
    { name: 'guideProof1', maxCount: 1 }, { name: 'guideProof2', maxCount: 1 },
    { name: 'guideProof', maxCount: 1 }, { name: 'phdProof1', maxCount: 1 },
    { name: 'phdProof2', maxCount: 1 }, { name: 'stage2File1', maxCount: 1 },
    ]

    app.post("/api/faculty/PBAS-Report/saveTeachingActivityDocs", upload.fields(arrayOfFields), (req, res) => {
        try {
            res.send({ status: 'success', data: req.files })
        } catch (error) {
            console.log('Error')
        }
    })

    app.post("/api/faculty/PBAS-Report/saveTeachingActivityDocsSingle", upload.single('activity-file'), (req, res) => {
        try {
            res.send({ status: 'success', data: req.file })
        } catch (error) {
            console.log('Error')
        }
    })


    // showing file to file viewer
    app.get('/viewer/PBASFiles/showFile/:filename', (req, res) => {
        const link = path.join(__dirname, `../../uploads/faculty-uploads/PBAS-uploads/${req.params.filename}`)
        res.sendFile(link);
    })

}

module.exports = casRoutes;