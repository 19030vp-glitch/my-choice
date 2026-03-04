const express = require('express')
const router = express.Router();

// models to be used
const User = require('../models/faculty-models/userModel')
const Student = require('../models/student-models/studentUserSchema')
const Alumni = require('../models/alumni-models/alumniUserSchema')
const Director = require('../models/director-models/directorUser');
const { sendMail } = require('../routes/faculty-routes/services');
const emailTemplate = require('../email/emailTemplate');
const bcrypt = require('bcrypt');
const { OTPGenerator } = require('./generators');

const models = { User, Student, Alumni, Director }


// sending otp on email address
router.post('/sendOTPOnEMailForPasswordReset', async (req, res) => {

    const { email, model } = req.body
    console.log(email, model)

    const user = await models[model].findOne({ email })
    if (!user) {
        res.send({ status: 'error', message: 'No user is found with this email address' })
        return
    } else {
        let generatedOTP = OTPGenerator()
        let subjectForEmail = `${generatedOTP} is your OTP for Email Verification at SRTMUN-UIMS.`
        let encryptedOTP = await bcrypt.hash(generatedOTP.toString(), 11)
        let message = { status: 'success', message: 'Email sent successfully, Please check your Email Account', otp: encryptedOTP }

        // message to send on res

        let htmlMatter = `<div>
                            <h2>OTP based Email Verification</h2>
                            <p style="font-size: 14px; line-height: 140%;">
                            <strong>${generatedOTP}</strong> is your OTP for
                            resetting your password at <strong>SRTMUN-UMIS</strong>. Please enter to verify
                            email now.
                            </p>
                        </div>`


        // send mail
        sendMail(req, res, req.body.email, subjectForEmail, 'html', emailTemplate(htmlMatter), message)
    }







})

router.post('/service/forgotPassword', async (req, res) => {

    const { email, model, newPassword } = req.body
    const hashPass = await bcrypt.hash(newPassword, 10)

    models[model].findOneAndUpdate({ email }, { password: hashPass }).then((user) => {
        if (user) {
            console.log('User with updated password :', user)
            res.send({ status: 'success', message: 'Password Updated Successfully' })
        } else {
            res.send({ status: 'error', message: 'Error occured while updating password' })
        }
    }).catch((err) => {
        console.log('Error :', err)
        res.send({ status: 'error', message: 'Internal Server Error' })
    })
})






module.exports = router;
