const { PDFDocument } = require('pdf-lib');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const { fetchDataForCAS, fetchBasicDataForCAS, fetchEligibilityProofs } = require('../routes/data-fetcher/forCAS');
const CASModel = require('../models/faculty-models/casModel');
const PBASModel = require('../models/faculty-models/pbasModel');
const { pathCasFilesGenerator } = require('./actualFileMerge');

async function mergePDFs(files, outputPath) {
    async function convertJpgToPng(jpgBuffer) {
        const pngBuffer = await sharp(jpgBuffer).toFormat('png').toBuffer();
        return pngBuffer;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        try {
            const response = await axios.get(file, { responseType: 'arraybuffer' });

            if (response.status === 200) {
                const fileData = response.data;

                if (file.includes('.pdf')) {
                    const pdfDoc = await PDFDocument.load(fileData);
                    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                } else if (file.includes('.jpg') || file.includes('.jpeg') || file.includes('.png')) {
                    if (file.includes('.jpeg') || file.includes('.jpg')) {
                        const pngBytes = await convertJpgToPng(fileData);
                        const pngImage = await mergedPdf.embedPng(pngBytes);
                        const page = mergedPdf.addPage();
                        page.drawImage(pngImage, {
                            x: 0,
                            y: 0,
                            width: page.getWidth(),
                            height: page.getHeight(),
                        });
                    } else if (file.includes('.png')) {
                        const pngImage = await mergedPdf.embedPng(fileData);
                        const page = mergedPdf.addPage();
                        page.drawImage(pngImage, {
                            x: 0,
                            y: 0,
                            width: page.getWidth(),
                            height: page.getHeight(),
                        });
                    }
                } else {
                    console.log(`Unsupported file type: ${file}`);
                }
            } else {
                console.log(`Failed to fetch file: ${file}`);
            }
        } catch (error) {
            console.log(`Error processing file: ${file}`);
        }
    }

    const mergedPdfBytes = await mergedPdf.save();

    fs.writeFileSync(outputPath, mergedPdfBytes);
    return outputPath; // Return the outputPath after saving the merged PDF
}



async function casFilesGenerator(selectedYear, userId, reportType) {

    let casDataSpecifier = [
        {
            model: 'ResearchPaper',
            casName: 'researchPaper'
        },
        {
            model: 'BookAndChapter',
            casName: 'publicationData'
        },
        {
            model: 'PhdAwarded',
            casName: 'researchGuide',
        },
        {
            model: 'ResearchProject',
            casName: 'researchProjects',
        },
        {
            model: 'ConsultancyServices',
            casName: 'consultancy',
        },
        {
            model: 'Patent',
            casName: 'patents',
        },
        {
            model: 'AwardRecognition',
            casName: 'awards',
        },
        {
            model: 'Fellowship',
            casName: 'fellow',
        },
        {
            model: 'InvitedTalk',
            casName: 'invitedTalks',
        },
        {
            model: 'BookAndChapter',
            casName: 'conference',
        },
    ]

    let fetchYears;
    let casArray;

    let eligData;
    let level;

    let casData;

    if (reportType === 'CAS') {
        casData = await CASModel.findOne({ userId: userId })
    } else if (reportType === 'PBAS') {
        casData = await PBASModel.findOne({ userId: userId })
    }


    if (casData) {
        if (casData) {
            let oldCasArray = [];
            casData.casData.forEach(cas => {
                oldCasArray.push(JSON.parse(cas))
            });

            // keep those element in array whose casYear is equal to selectedYear array
            let newCasArray = []
            let years = []
            selectedYear.forEach(year => {
                oldCasArray.forEach(item => {
                    if (item.casYear === year) {
                        newCasArray.push(item)

                        if (reportType === 'CAS') {
                            years.push(...item.fetchYears)

                        }

                    }
                }
                )
            })

            if (reportType === 'CAS') {
                fetchYears = [...new Set(years)]
            } else {
                fetchYears = selectedYear
            }

            // sort the array based on casYear field in ascending order
            newCasArray.sort((a, b) => {
                return parseInt(a.casYear.slice(0, 4)) - parseInt(b.casYear.slice(0, 4));
            })

            casArray = newCasArray


            if (reportType === 'CAS') {
                // creating eligibility details
                if (casData?.['stage5']) {
                    eligData = JSON.parse(casData['stage1'])
                    level = 'stage1'
                } else if (casData?.['stage4']) {
                    eligData = JSON.parse(casData['stage4'])
                    level = 'stage4'
                } else if (casData?.['stage3']) {
                    eligData = JSON.parse(casData['stage3'])
                    level = 'stage3'
                } else if (casData?.['stage2']) {
                    eligData = JSON.parse(casData['stage2'])
                    level = 'stage2'
                } else if (casData?.['stage1']) {
                    eligData = JSON.parse(casData['stage1'])
                    level = 'stage1'
                }
            }



        }


    }



    try {

        // academic data for CAS
        let response = await fetchDataForCAS(fetchYears, userId)
        let basicData = await fetchBasicDataForCAS(fetchYears, userId)
        let { eligProofs, impactProof, activityProof, directorProof } = fetchEligibilityProofs(reportType, level, eligData, casArray, response.ResearchPaper)
        let mainDataMap = {}

        casDataSpecifier.forEach((casSpecifier) => {
            casArray.forEach((casItem) => {
                const dataMap = casItem.academicData[casSpecifier.casName]?.dataMap || [];

                mainDataMap = {
                    ...mainDataMap,
                    [casItem.casYear]: {
                        ...mainDataMap[casItem.casYear],
                        [casSpecifier.casName === 'conference'
                            ? 'ConferenceBookAndChapter'
                            : casSpecifier.casName === 'publicationData'
                                ? 'MainBookAndChapter'
                                : casSpecifier.model]: [
                                ...dataMap
                            ]
                    }
                };

            });
        });


        let filterData = {}
        casDataSpecifier.forEach((casSpecifier) => {
            selectedYear.forEach((year) => {

                let filteredItems = response[casSpecifier.model].filter((item) => {
                    return mainDataMap[year][casSpecifier.casName === 'conference'
                        ? 'ConferenceBookAndChapter'
                        : casSpecifier.casName === 'publicationData'
                            ? 'MainBookAndChapter'
                            : casSpecifier.model].includes(item._id.toHexString());
                })

                filterData[year] = {
                    ...filterData[year], [casSpecifier.casName === 'conference'
                        ? 'ConferenceBookAndChapter'
                        : casSpecifier.casName === 'publicationData'
                            ? 'MainBookAndChapter'
                            : casSpecifier.model]: [...filteredItems]
                }
            })
        })

        let combineAllObjects = []

        selectedYear.forEach((year) => {
            if (filterData[year]) {
                Object.keys(filterData[year]).forEach((key) => {
                    combineAllObjects.push(...filterData[year][key]);
                });
            }
        });

        combineAllObjects = [...basicData || [], ...combineAllObjects || []]

        let files = [...eligProofs || [], ...new Set(combineAllObjects.map((item) => `${process.env.REACT_APP_MAIN_URL}/showFile/${item.proof}/faculty`)), ...impactProof || [], ...directorProof || [], ...activityProof || []].filter((item) => item !== undefined)

        console.log('Link files :', files.length)


        const fileName = `LinkMergedPDF-${new Date().getTime()}.pdf`;
        const outputPath = `pdfs/${fileName}`;

        await mergePDFs(files, outputPath);

        return { fileName, status: 'success' }; // Return the outputPath and success status
    } catch (error) {
        return { status: 'failure', error }; // Return the failure status and error
    }
}





module.exports = { casFilesGenerator, mergePDFs };
















