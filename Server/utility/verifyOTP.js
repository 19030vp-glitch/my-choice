const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/services/verifyOTP', async function (req, res) {

    const { otp } = req.body

    // otp authentication
    let isMatch = await bcrypt.compare(otp.clientOTP, otp.serverOTP)
    if (isMatch) {
        res.send({ status: 'matched', message: 'OTP Verified successfully.' })
    } else {
        res.send({ status: 'error', message: 'Wrong OTP entered, please try again' })
    }
})


module.exports = router;
