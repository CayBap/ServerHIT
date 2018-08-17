const multer = require('multer');
const path = require('path');
function uploadCode(){
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/codes')
        },
        filename: function (req, file, cb) {
          cb(null,  path.extname(file.originalname));
        }
      });
      
      return upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.cpp') {
                
                return callback(new Error("Lỗi không đúng định dạng" +''), null)
            }
            callback(null, true)
        }
    })
}

module.exports = {
    uploadCode : uploadCode,
}