const multer = require('multer');

// storage configuration  
const storage = multer.diskStorage({
  // Destination function to set where the files will be stored
  destination: (req, file, cb) => { 
    cb(null, 'uploads/');
  },
  
  // Filename function to customize how the file is named when saved
  filename: function (req, file, cb) {
    // Generate a unique suffix based on the current timestamp for uniqueness
    const uniqueSuffix = Date.now() + '-' + 'profile';

    // Set the final file name (fieldname + unique suffix)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});
 
const upload = multer({ storage: storage });
 
module.exports = upload;
