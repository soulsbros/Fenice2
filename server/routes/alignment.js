const express = require('express');
const router = express.Router();
const { ourMongo } = require('../middleware/mongoConn');
const ObjectID = require('mongodb').ObjectID;

router.get('/getAllCharacters', async (req, res) => {
  try {
    let db = await ourMongo('characters');
    let cursor = db.find();
    let chars = [];
    await cursor.forEach((el) => chars.push(el));

    res.status(200).send(chars.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.get('/getCharactersByCampaign/:id', async (req, res) => {
  try {
    let db = await ourMongo('campaigns');
    let campaignId = new ObjectID(req.params.id);
    let campaign = await db.findOne({ _id: campaignId });

    db = await ourMongo('characters');
    let chars = [];
    await Promise.all(
      campaign.characters.map(async (charId) => {
        let char = await db.findOne({ _id: new ObjectID(charId) });
        chars.push(char);
      }),
    );

    res.status(200).send(chars.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.get('/getCharactersByCampaignName/:name', async (req, res) => {
  try {
    let db = await ourMongo('campaigns');
    let campaignName = req.params.name;
    let campaign = await db.findOne({ name: campaignName });

    db = await ourMongo('characters');
    let chars = [];
    await Promise.all(
      campaign.characters.map(async (charId) => {
        let char = await db.findOne({ _id: new ObjectID(charId) });
        chars.push(char);
      }),
    );

    // For each character, get data from the old DB (SQL)
    let result = [];
    for (const character of chars) {
      if (character.externalId !== null) {
        const response = await fetch(
          `https://lafenice.soulsbros.ch/actions/getCharacterData.php?id=${character.externalId}`,
        );
        try {
          const body2 = await response.json();
          result.push({ ...body2, ...character });
        } catch (err) {
          console.error(character.externalId, err);
          result.push(character);
        }
      } else {
        result.push(character);
      }
    }

    res.status(200).send(result.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.get('/getCampaigns', async (req, res) => {
  try {
    let db = await ourMongo('campaigns');
    let cursor = db.find();
    let campaigns = [];
    await cursor.forEach((el) => campaigns.push(el));

    res.status(200).send(campaigns.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.get('/getCampaignById/:id', async (req, res) => {
  try {
    let db = await ourMongo('campaigns');
    let campaignId = new ObjectID(req.params.id);
    let campaign = await db.findOne({ _id: campaignId });

    res.status(200).send(campaign);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.post('/insertCharacter', async (req, res) => {
  try {
    let chars = req.body;
    let db = await ourMongo('characters');
    let result = await db.insertMany(chars);

    if (result.insertedCount > 0) {
      res.status(201).send({
        msg: result.insertedCount + ' character(s) inserted successfully',
      });
    } else {
      console.error('Error inserting docs ', result);
      res.status(500).send({ error: 'Error inserting docs ' + result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.post('/addAction', async (req, res) => {
  try {
    const charId = new ObjectID(req.body.charId);
    let charAction = req.body.action;
    let db = await ourMongo('characters');

    let result = await db.updateOne(
      { _id: charId },
      {
        $push: {
          actionsHistory: charAction,
        },
      },
    );

    if (result && result.modifiedCount === 1) {
      let value = await db.findOne({ _id: charId });
      if (charAction.type === 'Good' || charAction.type === 'Evil') {
        let newValue = value.goodEvilValue + charAction.value;
        if (newValue < -100) {
          newValue = -100;
        } else if (newValue > 100) {
          newValue = 100;
        }
        result = db.updateOne({ _id: charId }, { $set: { goodEvilValue: newValue } });
      } else {
        let newValue = value.lawfulChaoticValue + charAction.value;
        if (newValue < -100) {
          newValue = -100;
        } else if (newValue > 100) {
          newValue = 100;
        }
        result = db.updateOne({ _id: charId }, { $set: { lawfulChaoticValue: newValue } });
      }

      res.status(201).send({ msg: ' Updated successfully', result });
    } else {
      console.error('Error updating action ', result);
      res.status(500).send({ error: 'Error updating action', result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

router.post('/addCampaigns', async (req, res) => {
  try {
    let campaigns = req.body;
    let db = await ourMongo('campaigns');
    let result = await db.insertMany(campaigns);

    if (result.insertedCount > 0) {
      res.status(201).send({
        msg: result.insertedCount + ' campaign(s) inserted successfully',
      });
    } else {
      console.error('Error inserting docs ', result);
      res.status(500).send({ error: 'Error inserting docs ' + result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
});

module.exports = router;
