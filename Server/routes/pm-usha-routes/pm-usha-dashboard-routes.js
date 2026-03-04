const { constructionAndRenovationDetails } = require("./pm-usha-constants")
const ConstructionRenovationStatus = require('../../models/pm-usha-models/constructionRenovationStatusSchema');
const SoftAndEquipment = require('../../models/pm-usha-models/softAndEquipmentSchema');
const { generateOverallCONRENChartData, generateEQUIPChartData, generateSOFTChartData } = require("./pm-usha-utility");


function pmUshaDashboard(app) {

    app.post('/api/pm-usha/dashboard', async (req, res) => {
        const conConstants = constructionAndRenovationDetails["A"];
        const renConstants = constructionAndRenovationDetails["B"];
        const conRenDocuments = await ConstructionRenovationStatus.find({}).lean();

        // 1. GENERATE CONSTRUCTION RENOVATION CHART DATA
        const { conChartData, renChartData, conRenChartData } = generateOverallCONRENChartData(conRenDocuments, conConstants, renConstants);


        // 2. GENERATE EQUIPMENTS CHART DATA
        const equipmentDocuments = await SoftAndEquipment.find({ type: "Equipment" }).lean();
        const equipmentChartData = generateEQUIPChartData(equipmentDocuments);

        // 3. GENERATE SOFT COMPONENT CHART DATA
        const softDocuments = await SoftAndEquipment.find({ type: "Soft" }).lean();
        const softChartData = generateSOFTChartData(softDocuments)


        res.json({ conChartData, renChartData, conRenChartData, equipmentChartData, softChartData });
    });










}


module.exports = pmUshaDashboard