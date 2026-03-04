const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const unlink = require("../main-routes/main-routes").unlink;

const SoftAndEquipment = require("../../models/pm-usha-models/softAndEquipmentSchema");

const dirstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const data = JSON.parse(JSON.stringify(req.body));
      const { folder } = data;
      const link = path.join(__dirname, `../../uploads/${folder}-uploads/`);
      cb(null, link);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const upload = multer({ storage: dirstorage });

const models = { SoftAndEquipment };

//get
router.post("/pm-usha/getData", async (req, res) => {
  const { model, filter } = req.body;
  try {
    const fetch = await models[model].find(filter);
    res.status(200).send(fetch);
  } catch (err) {
    console.log("pm-usha-route-getData-catch ", err);
    res.status(500).send();
  }
});

//set
router.post(
  "/pm-usha/newRecord/:model",
  upload.fields([
    { name: "Proof", maxCount: 1 },
    { name: "Proof2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const model = req.params.model;

      const data = JSON.parse(JSON.stringify(req.body));

      const { getproof: proof, getproof2: proof2 } = data;
      const isfile1 = req.files?.["Proof"]?.[0];
      const isfile2 = req.files?.["Proof2"]?.[0];
      if (isfile1) {
        var up1 = isfile1.filename;
      }
      if (isfile2) {
        var up2 = isfile2.filename;
      }

      let SendData = data;
      if (up1 || up2) {
        if (up1) {
            SendData = Object.assign(SendData, { [proof]: up1 });
        }
        if (up2) {
            SendData = Object.assign(SendData, { [proof2]: up2 });
        }
      }

      const obj = new models[model](SendData);
      await obj.save();
      res.status(201).send("Entry Succeed");
    } catch (err) {
      console.log("pm-usha-route-newRecord-catch", err);
      res.status(500).send();
    }
  }
);

//reset
router.post(
  "/pm-usha/editRecord/:model",
  upload.fields([
    { name: "Proof", maxCount: 1 },
    { name: "Proof2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const model = req.params.model;
      const data = JSON.parse(JSON.stringify(req.body));
      const { folder, getproof: proof, getproof2: proof2 } = data;
      const { id } = data;
      const isfile = req.files?.['Proof']?.[0];
      const isfile2 = req.files?.['Proof2']?.[0];
      if (isfile) {
        var up1 = isfile.filename;
      }
      if (isfile2) {
        var up2 = isfile2.filename;
      }
      let SendData = data;

        if (up1 || up2) {
            const previousData = await models[model].findOne({ _id: id });

            if (up1) {
                SendData = Object.assign(SendData, { [proof]: up1 });
                const previousProof1 = await previousData?.[proof];
                unlink(folder, previousProof1);
            }
        
            if (up2) {
                SendData = Object.assign(SendData, { [proof2]: up2 });
                const previousProof2 = await previousData?.[proof2];
                unlink(folder, previousProof2);
            }
        }

      await models[model].findOneAndUpdate({ _id: id }, SendData);
      res.status(200).send("Edited Successfully");
    } catch (e) {
      console.log("pm-usha-route-editRecord-catch", e.message);
      res.status(500).send({ massage: e.massage });
    }
  }
);

module.exports = { router };
