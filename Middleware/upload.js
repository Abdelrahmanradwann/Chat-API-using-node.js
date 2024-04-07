const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = '';
        const fileType = file.mimetype.split('/')[0];
        console.log(fileType)
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
       const fileName = `FILE-${Date.now()}.${ext}`;
       console.log(fileName)
    cb(null, fileName); // Set the filename
    },
});


const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
    console.log("In file filter"+" "+fileType)
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