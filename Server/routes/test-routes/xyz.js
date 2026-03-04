const express = require('express');
const router = express.Router();
const Xyz = require('../../models/test-models/xyzSchema')

const models = { Xyz }

router.post('/abc/getData', async (req, res) => {
  const { model, id, filter } = req.body
  try {
    const fetch = await models[model].find(filter);
    res.status(200).send(fetch);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
})

router.post('/abc/addEditRecord/:model', async (req, res) => {
  const model = req.params.model
  const data = JSON.parse(JSON.stringify(req.body));

  try {
    const { _id } = req.body;

    console.log('Model:', data);

    if (!_id) {
      const obj = new models[model](data);
      await obj.save();
      return res.status(201).send("Entry added Succesfully")
    }
    else {
      await models[model].findOneAndUpdate({ _id }, data)
      res.status(200).send("Entry updated Succesfully")
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



module.exports = router;