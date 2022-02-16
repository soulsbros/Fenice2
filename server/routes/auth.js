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
  const body = await response.json();

  if (body.valid) {
    res.status(200).send(body);
  } else {
    res.status(401).send(body);
  }
});

module.exports = router;
