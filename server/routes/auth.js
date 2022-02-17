const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/**
 * Checks if a given token is valid or not.
 * Returns { valid, username, dm, admin }
 */
router.post('/validateCookie', async (req, res) => {
  try {
    const response = await fetch(
      `https://login.soulsbros.ch/api/checkCookie.php?username=${req.body.username}&token=${req.body.token}`,
    );
    const body = await response.json();

    if (body.valid) {
      res.status(200).send(body);
    } else {
      res.status(401).send(body);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
});

module.exports = router;
