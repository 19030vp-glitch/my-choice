const { pupetteerSetting } = require("./pupetteerSetting")

function downloadTablePDF(app) {
    app.post('/download/pdf/table', async (req, res) => {

        const { params, serviceName, title: slashTitle, getproof, getproof2 } = req.body

        console.log('Getproof:', getproof, getproof2)

        function convertSlashToDash(inputString) {
            return inputString.replace(/\//g, '-');
        }
        const title = convertSlashToDash(slashTitle)
        const link = `${process.env.Report_Main_URL}/tablepdf/${title}/${serviceName}/${getproof}/${getproof2}/${JSON.stringify(params)}`
        console.log(link);
        const fileName = `${title}-` + new Date().getTime() + ".pdf"

        try {
            await pupetteerSetting({ linkToNavigate: link, fileName })
            res.send({ fileName })
        } catch (error) {
            res.send({ error })
        }

    })
}


module.exports = downloadTablePDF 