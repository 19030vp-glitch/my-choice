//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 11
function OTPGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
}

function cipherGenerator() {

    return {
        encrypt: async (dataToProcess) => {
            await bcrypt.hash(dataToProcess, saltRounds)
        },

        decrypt: (hashOTP, otp) => {
            bcrypt.compare(otp, hashOTP, function (err, result) {
                return result
            });
        }
    }


}

module.exports = { OTPGenerator, cipherGenerator }