const multer = require('multer')
const path = require('path')

// Note : Please provide path based on the function's location. Location of this function is /Server/utilty.
// Practice path here and paste as it is in as an argument you're willing to call


const multerConfig = (uploadPath, customFileName = false) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const link = path.join(__dirname, uploadPath)
            cb(null, link)
        },
        filename: (req, file, cb) => {
            cb(null, `${customFileName ? `${customFileName}-` : ''}${new Date().getTime()}-${file.originalname}`)
        },
    })
    return multer({ storage: storage })
}

module.exports = { multerConfig }

