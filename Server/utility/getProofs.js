const path = require("path")
const { mergePDFs } = require("./actualFileMerge")
const { models } = require("../routes/admin-routes/admin-routes")

function getProofs(app) {

    app.post('/service/downloadProofs', async (req, res) => {

        const { model, filter, getproof, serviceName } = req.body
        console.log(model, filter, getproof)
        const docs = await models[model].find(filter)

        try {
            if (docs.length > 0) {

                let proofs = [...new Set(docs.map((item) => path.join(__dirname, `../uploads/${serviceName}-uploads/${item?.[getproof]}`)))].filter((item) => !item.includes('undefined'))

                const fileName = `${model}-ProofsPDF-${new Date().getTime()}.pdf`;
                const outputPath = `pdfs/${fileName}`;

                await mergePDFs(proofs, outputPath);

                res.send({ status: 'success', fileName })
            } else {
                res.send({ status: 'error', message: "No proofs found related to this table" })
            }
        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: "Internal Server Error" })

        }

    })


}


module.exports = getProofs