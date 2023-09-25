const express = require('express');
const router = express.Router();
const Song = require('../models/Songs');
router.post('/', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({status:"success",song});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getAllSongs',async(req,res)=>{
  try{
    const songs = await Song.find({})
    res.status(201).json({status:"success",songs})
  }
  catch(error){
    res.status(500).json({ error: 'Internal server error' })
  }
});

module.exports = router;
