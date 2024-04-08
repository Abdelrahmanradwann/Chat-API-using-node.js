const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = '';
    const fileType = file.mimetype.split('/')[0];
    if (fileType === 'image') {
      destinationFolder = 'UploadProfilePic';
    } else if (fileType === 'audio') {
      destinationFolder = 'UploadVoiceMsg';
    } else {
      return cb(new Error('Unsupported file type'), null);
    }
    cb(null, destinationFolder);
    },
    

   filename: (req, file, cb) => {
     const ext = file.mimetype.split('/')[1];
     let filename = file.mimetype.split('/')[0];
     if (filename == "image") {
       filename = `${req.current.id}.${ext}`;
     }
     else {
       const curData = new Date().getTime();
       filename = `${curData}.${ext}`; 
     }
    cb(null, filename); // Set the filename
    },
});


const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
  if (fileType === "image" || fileType === "audio") {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
    storage:storage,
    fileFilter
})

module.exports = {
  upload
}