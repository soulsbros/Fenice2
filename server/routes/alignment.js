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

    res.status(200).send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
});

module.exports = router;
