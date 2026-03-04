const FacultyAQAR = require('../../models/aqar-models/facultyAqarModel')

function facultyAqarRoutes(app) {

    app.post('/service/faculty/report/aqar/saveData', async (req, res) => {
        const { userId, academicYear } = req.body;

        const aqarData = { aqarYear: academicYear }

        FacultyAQAR.findOne({ userId: userId }, (err, aqar) => {
            if (err) {
                console.log(err);
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (aqar) {

                    aqar.aqarData.forEach((item, index) => {
                        if (JSON.parse(item).aqarYear === academicYear) {
                            aqar.aqarData.splice(index, 1);
                        }
                    })

                    aqar.aqarData.push(JSON.stringify(aqarData));
                    aqar.save((err, newAqar) => {
                        if (err) {
                            console.log(err);
                            res.send({ status: "error", message: "Error saving data" })
                        }
                        else {
                            res.send({ status: 'success', data: newAqar });
                        }
                    }
                    )
                }
                else {
                    const newAqar = new FacultyAQAR({
                        userId: userId,
                        aqarData: [JSON.stringify(aqarData)]
                    });
                    newAqar.save((err, aqarNew) => {
                        if (err) {
                            console.log(err);
                            res.send({ status: "error", message: "Error saving data" })
                        }
                        else {
                            res.send({ status: 'success', data: aqarNew });

                        }
                    }
                    )
                }
            }
        })


    })

    app.post('/service/faculty/report/aqar/getData', (req, res) => {

        const { filter } = req.body

        FacultyAQAR.findOne(filter).then((aqar, err) => {
            if (err) {
                console.log(err)
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (aqar) {
                    res.send({ status: 'success', data: aqar });
                }
                else {
                    res.send({ status: 'error', message: "No data found" });
                }
            }
        }
        )
    })

    app.post('/service/faculty/report/aqar/getTotalData', (req, res) => {


        FacultyAQAR.find({}).lean().populate("userId").exec().then((aqar, err) => {
            if (err) {
                console.log(err)
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (aqar) {
                    res.send({ status: 'success', data: aqar });
                }
                else {
                    res.send({ status: 'error', message: "No data found" });
                }
            }
        }
        )
    })



}


module.exports = facultyAqarRoutes