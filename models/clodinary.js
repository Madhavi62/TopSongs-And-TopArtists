const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'dml28rdbk',
    api_key: '277655856792483',
    api_secret: 'ibCHOSao0Mqfojmro8--TpN8EyY'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: " SongsList",
    },
});

module.exports = { cloudinary, storage };