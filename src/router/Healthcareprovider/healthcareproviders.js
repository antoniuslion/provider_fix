const express = require('express');
const catchErrors = require('express-catch-errors');
const multer = require('multer');
const logo = multer({dest: './logo/'});  //create folder logo
const gallery = multer({dest: './gallery/'});   //create folder gallery
const router = express.Router();
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");
const Check_Auth_Public = require("../../error/Healthcareprovider/check-auth-public");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      if(file.fieldname==="logo")
      {
        cb(null, './logo/');
      }
      else if(file.fieldname==="gallery")
      {
        cb(null, './gallery/');
      }
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname );
      //.replace khusus di os window karena window tidak menerima tanda ':'
    }
});
  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
  
const image_upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).fields(
    [
        {
          name:'logo',
          maxCount:1
        },
        {
         name:'gallery',
         maxCount:5
        }
    ]
);

const {
    create_healthcareprovider,
    update_healthcareprovider,
    delete_healthcareprovider,
    show_provider_profile,
    get_profile_provider_by_id
} = require('../../controller/Healthcareprovider/healthcareprovider_controller');

router
.route('/createprovider')
.post(image_upload, catchErrors(create_healthcareprovider));

router
.route('/updateprovider')
.patch(catchErrors(Check_Auth), image_upload, catchErrors(update_healthcareprovider))

router
.route('/deleteprovider')
.patch(catchErrors(Check_Auth),catchErrors(delete_healthcareprovider))

router
.route('/profileprovider')
.get(catchErrors(Check_Auth), catchErrors(show_provider_profile))

router
.route('/provider/:id')
.get(catchErrors(Check_Auth_Public), catchErrors(get_profile_provider_by_id))

module.exports = router;