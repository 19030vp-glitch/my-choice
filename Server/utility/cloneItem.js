const { models } = require("../routes/faculty-routes/routes");

function cloneItem(app) {

    app.post('/service/faculty/cloneItem', (req, res) => {
        const { id, model } = req.body;
        // Assuming you have the original document ID
        const originalDocumentId = id;

        // Find the original document by its ID
        models[model].findById(originalDocumentId, (err, originalDocument) => {
            if (err) {
                console.error(err);
                res.send({ status: 'error', message: 'Could not find the original document' });
            }

            if (!originalDocument) {
                res.send({ status: 'error', message: 'Could not find the original document' });
            }

            // Create a new instance of the model with the values from the original document
            const clonedDocument = new models[model]({ ...originalDocument.toObject(), _id: undefined, proof: undefined });

            // Save the cloned document to the database
            clonedDocument.save((saveErr) => {
                if (saveErr) {
                    console.error(saveErr);
                    // Handle the error
                    res.send({ status: 'error', message: 'Could not generate the clone document' });
                    return;
                }
                res.send({ status: 'success' });
            });
        });

    })
}

module.exports = cloneItem;