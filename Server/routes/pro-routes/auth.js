const PROUser = require('../../models/pro-models/proUser')

function auth(app, jwt) {
    app.post('/api/auth/pro-login', (req, res) => {

        const { username } = req.body

        PROUser.findOne({ username: username })
            .then((user) => {
                if (user) {
                    if (req.body.password === user.password) {
                        console.log('Password matched')
                        const token = jwt.sign({ username: user.username, id: user._id, }, "SRTMUN");
                        res.send({ status: "ok", user, token });
                    } else {
                        res.send({
                            status: "notok",
                            message: "Please Enter correct username or password",
                        });
                    }
                } else {
                    res.send({
                        status: "notok",
                        message: "User does not exist, please register.",
                    });
                }
            })
            .catch(function (err) {
                res.send({ status: "notok", message: "Internal Server Error" });
            });
    })
}

module.exports = auth