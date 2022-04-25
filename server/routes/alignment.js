const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/**
 * Get all campaigns (proxy for now)
 */
router.get('/getCampaigns', async (req, res) => {
  try {
    const response = await fetch(`https://alignment.lafenice.soulsbros.ch/api/getCampaigns`);
    const body = await response.json();

    res.status(200).send(body.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
});

router.get('/getCharactersByCampaignName/:name', async (req, res) => {
  try {
    const response = await fetch(
      `https://alignment.lafenice.soulsbros.ch/api/getCharactersByCampaignName/${req.params.name}`,
    );
    const body = await response.json();

    res.status(200).send(body.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
});

router.get('/getCharactersByCampaign/:name', async (req, res) => {
  try {
    const response = await fetch(
      `https://alignment.lafenice.soulsbros.ch/api/getCharactersByCampaign/${req.params.name}`,
    );
    const body = await response.json();

    res.status(200).send(body.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
});

router.post('/addAction', async (req, res) => {
  try {
    await fetch(`https://alignment.lafenice.soulsbros.ch/api/addAction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
});

module.exports = router;
