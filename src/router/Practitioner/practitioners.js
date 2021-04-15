const express = require('express');
const catchErrors = require('express-catch-errors');
const multer = require('multer');
const image = multer({dest: './selfie_imageurl/'}); 
const Check_Practitioner = require("../../error/Practitioner/check-practitioner");
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");
const Check_Auth_Public = require("../../error/Healthcareprovider/check-auth-public");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './selfie_imageurl/');
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
}).single('selfie_imageurl');


const {
    create_practitioner,
    get_all_practitioners,
    get_practitioner_by_id,
    update_practitioner,
    delete_practitioner
} = require('../../controller/Practitioner/practitioner_controller.js');

router
.route('/')
.get(catchErrors(Check_Auth_Public),catchErrors(get_all_practitioners))

router
.route('/detail/:id')
.get(catchErrors(Check_Auth_Public), catchErrors(get_practitioner_by_id))

router
.route('/createpractitioner')
.post(catchErrors(Check_Auth),image_upload,Check_Practitioner,catchErrors(create_practitioner));

router
.route('/updatepractitioner/:id')
.patch(catchErrors(Check_Auth),image_upload,Check_Practitioner, catchErrors(update_practitioner))

router
.route('/deletepractitioner/:id')
.patch(catchErrors(Check_Auth), catchErrors(delete_practitioner))

module.exports = router;