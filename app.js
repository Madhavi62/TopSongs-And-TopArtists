
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const PostData = require('./models/clodinary');
const cors = require('cors');
const multer = require('multer')
const fileupload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });
mongoose.connect('mongodb+srv://madhavisurigala123:madhavi123@cluster0.trfexks.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

const artistsRoutes = require('./routes/artists');
const songsRoutes = require('./routes/songs');

app.use('/artists', artistsRoutes);
app.use('/songs', songsRoutes);
app.use(express.urlencoded());

app.use(fileupload({ useTempFiles: true }));



app.get("/getposts", async (req, res) => {
  try {
      const data = await PostData.find();
      res.json(data);
  } catch (e) {
      res.status(500).json({ message: e.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
      const file = req.files.artwork;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
          public_id: `${Date.now()}`,
          resource_type: "auto",
          folder: "images",
      });
      const t=new Date.now()
      const url = result.secure_url;
      console.log(url)
      const { name, description, location } = req.body;
      const Posts = await PostData.create({
          name: name,
          location: location,
          description: description,
          artwork: url
      })
      res.json({ status: "ok", Posts })
  } catch (e) {
      res.status(400).json({
          status: "Failed to post",
          message: JSON.stringify(e),
      });
  }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

