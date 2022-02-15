const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/**
 * Checks if a given token is valid or not.
 * Returns { valid, username }
 */
router.post('/validateCookie', async (req, res) => {
  const response = await fetch(
    `https://login.soulsbros.ch/api/checkCookie.php?username=${req.body.username}&token=${req.body.token}`,
  );
  const body = await response.text();

  if (body === 'true') {
    // TODO return JSON from API duh
    res.status(200).send({ valid: true, username: req.body.username });
  } else {
    res.status(401).send({ valid: false, username: null });
  }
});

module.exports = router;
