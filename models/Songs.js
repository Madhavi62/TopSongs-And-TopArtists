

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  artwork: {
    type: String,
  },
  artists: {
    type: [String],
    required: true,
  },
  rating:{
    type:Number
  }

});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;

