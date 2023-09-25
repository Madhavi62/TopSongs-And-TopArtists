const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({status:"success",artist});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/top-artists', async (req, res) => {
  try {
    const artist = await Artist.find({}).limit(10);
    res.status(201).json({status:"success",artist});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
