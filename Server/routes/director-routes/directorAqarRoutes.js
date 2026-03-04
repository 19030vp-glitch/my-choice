const DirectorAQAR = require('../../models/aqar-models/directorAqarModel')

function directorAqarRoutes(app) {

    app.post('/service/director/report/aqar/saveData', async (req, res) => {
        const { extendedProfile, schoolName, academicYear } = req.body;

        const aqarData = { aqarYear: academicYear, extendedProfile, }

        DirectorAQAR.findOne({ schoolName: schoolName }, (err, aqar) => {
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
                    const newAqar = new DirectorAQAR({
                        schoolName: schoolName,
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

    app.post('/service/director/report/aqar/getData', (req, res) => {

        const { filter } = req.body

        DirectorAQAR.findOne(filter).then((aqar, err) => {
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

    app.post('/service/director/report/aqar/getTotalData', (req, res) => {


        DirectorAQAR.find({}).lean().then((aqar, err) => {
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


module.exports = directorAqarRoutes