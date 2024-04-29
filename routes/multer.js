const multer=require('multer');
const{v4:uuidV4}=require('uuid')
const path=require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uplods')
    },
    filename: function (req, file, cb) {
    const uniqueFilename=uuidV4();
        cb(null,uniqueFilename+path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports=upload;