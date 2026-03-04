async function checkValidDataForModel(title, modelName, Model, ModelTableHead, filter) {

    try {

        const documents = await Model.find(filter);

        if (modelName === "PublicationCitation") {
            if (documents.length === filter.year["$in"].length) {
                return { isValid: true }
            } else {
                for (const year of filter.year["$in"]) {
                    if (!documents.find(doc => doc.year === year)) {
                        return { isValid: false, academicYear: year };
                    }
                }
            }
        }



        delete ModelTableHead?.index;
        delete ModelTableHead?.["userId.name"]
        delete ModelTableHead?.["userId.department"]
        if (!['Lectures', 'Qualification', 'AppointmentsHeldPrior', 'ForeignVisit'].includes(modelName)) {
            delete ModelTableHead?.Proof
            ModelTableHead['proof'] = "Proof"
        }

        if (modelName === "ConferencesSemiWorkshopOrganized") {
            ModelTableHead['Upload_Proof'] = "Proof"
            delete ModelTableHead?.["proof"]
        }



        const invalidDocuments = [];
        const tableCells = Object.keys(ModelTableHead)

        const incompleteFields = new Set()

        for (const doc of documents) {
            let isValid = true;

            for (const field of tableCells) {

                if (field === "Proof2" && modelName === "ResearchPaper") {
                    continue;
                } else {
                    if (!doc[field]) {
                        incompleteFields.add(ModelTableHead[field]);
                        isValid = false;
                        break;
                    }
                }
            }

            if (!isValid) {
                invalidDocuments.push(doc._id);
            }
        }
        const isValid = invalidDocuments.length === 0
        const invalidDataFilter = { _id: { $in: invalidDocuments } }
        return { isValid, invalidDataFilter, count: invalidDataFilter.length, incompleteFields: Array.from(incompleteFields) }
    } catch (error) {
        throw new Error('Failed checking validity, try again later ')
    }
}


module.exports = { checkValidDataForModel }