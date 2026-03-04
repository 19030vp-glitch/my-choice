const UniqueVisitor = require('../models/visitors/visitorSchema')

function visits(app) {

    app.post('/api/unique-visitors', async (req, res) => {
        const id = req.body.id || req.cookies.id;
        if (!id) {
            return res.status(400).json({ error: 'ID not provided.' });
        }

        const existingVisitor = await UniqueVisitor.findOne({ id });

        if (!existingVisitor) {
            const newVisitor = new UniqueVisitor({ id });

            try {
                await newVisitor.save();
                res.cookie('id', newVisitor.id);
            } catch (err) {
                console.error(err);
            }
        }

        try {
            const count = await UniqueVisitor.countDocuments();
            res.json({ uniqueVisitors: count });
        } catch (err) {
            console.error(err);
        }
    });

}

module.exports = visits


