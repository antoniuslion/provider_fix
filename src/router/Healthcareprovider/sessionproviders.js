const express = require('express');
const catchErrors = require('express-catch-errors');
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");
const router = express.Router();

const {
    login,
    logout,
    generatenewtoken,
    checkToken
} = require('../../controller/Healthcareprovider/authprovider_controller.js');

router
  .route('/login')
  .post(catchErrors(login))

router
  .route('/logout')
  .post(catchErrors(logout))

router
  .route('/generate')
  .post(catchErrors(generatenewtoken))

router
  .route('/checkToken')
  .get(catchErrors(Check_Auth),catchErrors(checkToken))

module.exports = router;