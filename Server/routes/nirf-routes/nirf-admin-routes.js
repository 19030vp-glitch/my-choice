const express = require("express");
const router = express.Router();
const { SchoolsProgram } = require('../../utility/allschool')


const StudentIntake = require('../../models/nirf-models/nirfStudentIntakeModel');
const StudentStrength = require('../../models/nirf-models/totalAnnualStudentStrengthSchema');
const Progression = require('../../models/nirf-models/placemntAndHEForPriv3YearSchema');

const programsByNIRF = {
    UG3: { id: "UG3", abbv: "UG 3 Yr.", name: "UG [3 Years Program(s)]", year: 3 },
    UG4: { id: "UG4", abbv: "UG 4 Yr.", name: "UG [4 Years Program(s)]", year: 4 },
    PG1: { id: "PG1", abbv: "PG 1 Yr.", name: "PG [1 Year Program(s)]", year: 1 },
    PG2: { id: "PG2", abbv: "PG 2 Yr.", name: "PG [2 Year Program(s)]", year: 2 },
    PG3: { id: "PG3", abbv: "PG 3 Yr.", name: "PG [3 Year Program(s)]", year: 3 },
};

const programs = Object.keys(programsByNIRF)



router.post('/nirf/admin/student-intake/:academicYear', async (req, res) => {
    const academicYear = req.params.academicYear

    const intakeData = await StudentIntake.find({}).lean()

    if (intakeData.length > 0) {
        let intakeDataObj = {}
        intakeData.forEach((intake) => {
            intakeDataObj[intake.schoolName] = intake
        })

        res.send({ status: 'success', intakeData: intakeDataObj, })

    } else {
        res.send({ status: 'error', intakeData: {} })
    }

})

router.post('/nirf/admin/student-strength/:academicYear', async (req, res) => {

    const academicYear = req.params.academicYear
    const strength = await StudentStrength.find({ academicYear }).lean();

    let strengthData = {};
    let totalData = {}

    if (strength.length > 0) {
        strength.forEach((student) => {
            programs.forEach((item) => {
                strengthData[item] = {
                    ...strengthData[item],
                    [student.school]: student[item],
                }

                totalData[item] = {
                    ...totalData[item],
                    "Total": {
                        males: ((totalData[item]?.["Total"]?.["males"] || 0) + (parseInt(student?.[item]?.["males"]) || 0)),
                        females: ((totalData[item]?.["Total"]?.["females"] || 0) + (parseInt(student?.[item]?.["females"]) || 0)),
                        total: ((totalData[item]?.["Total"]?.["total"] || 0) + (parseInt(student?.[item]?.["total"]) || 0)),
                        outSideState: ((totalData[item]?.["Total"]?.["outSideState"] || 0) + (parseInt(student?.[item]?.["outSideState"]) || 0)),
                        outSideCountry: ((totalData[item]?.["Total"]?.["outSideCountry"] || 0) + (parseInt(student?.[item]?.["outSideCountry"]) || 0)),
                        economicallyBackward: ((totalData[item]?.["Total"]?.["economicallyBackward"] || 0) + (parseInt(student?.[item]?.["economicallyBackward"]) || 0)),
                        sociallyChallenged: ((totalData[item]?.["Total"]?.["sociallyChallenged"] || 0) + (parseInt(student?.[item]?.["sociallyChallenged"]) || 0)),
                        fullFeeGovernment: ((totalData[item]?.["Total"]?.["fullFeeGovernment"] || 0) + (parseInt(student?.[item]?.["fullFeeGovernment"]) || 0)),
                        fullFeeInstitution: ((totalData[item]?.["Total"]?.["fullFeeInstitution"] || 0) + (parseInt(student?.[item]?.["fullFeeInstitution"]) || 0)),
                        fullFeePrivateBodies: ((totalData[item]?.["Total"]?.["fullFeePrivateBodies"] || 0) + (parseInt(student?.[item]?.["fullFeePrivateBodies"]) || 0)),
                        notReceivingfullFee: ((totalData[item]?.["Total"]?.["notReceivingfullFee"] || 0) + (parseInt(student?.[item]?.["notReceivingfullFee"]) || 0))
                    }
                };
            });
        });

        res.send({ strengthData, totalData })
    } else {
        res.send(null)
    }

})



module.exports = { router }


const academicYearGeneratorBackwards = (numberOfYearsToDisplay, showCurrentYear = true, customCurrentYear = null) => {
    const now = new Date().getUTCFullYear();
    const startingYear = customCurrentYear ? +customCurrentYear.slice(0, 4) : showCurrentYear ? now : now - 1

    const arrayOfYears = Array(numberOfYearsToDisplay).fill('').map((v, idx) => {
        const startYear = startingYear - idx;
        return `${startYear}-${(startYear + 1).toString().slice(2, 4)}`;
    });

    return arrayOfYears;
}

