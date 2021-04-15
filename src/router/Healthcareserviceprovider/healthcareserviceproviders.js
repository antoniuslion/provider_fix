const express = require('express');
const catchErrors = require('express-catch-errors');
const Check_HealthcareServiceProvider = require("../../error/Healthcareserviceprovider/check-healthcareserviceprovider");
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");
const Check_Auth_Public = require("../../error/Healthcareprovider/check-auth-public");

const router = express.Router();
const {
  create_healthcareserviceprovider,
  update_healthcareserviceprovider,
  delete_healthcareserviceprovider,
  get_all_healthcareserviceprovider,
  get_healthcareserviceprovider_by_id
} = require('../../controller/Healthcareserviceprovider/healthcareserviceprovider_controller.js');

router
.route('/')
.get(catchErrors(Check_Auth_Public),catchErrors(get_all_healthcareserviceprovider))

router
.route('/createserviceprovider')
.post(catchErrors(Check_Auth),Check_HealthcareServiceProvider,catchErrors(create_healthcareserviceprovider))

router
.route('/updateserviceprovider/:id')
.patch(catchErrors(Check_Auth),Check_HealthcareServiceProvider, catchErrors(update_healthcareserviceprovider))

router
.route('/deleteserviceprovider/:id')
.patch(catchErrors(Check_Auth),catchErrors(delete_healthcareserviceprovider))

router
.route('/detail/:id')
.get(catchErrors(Check_Auth_Public), catchErrors(get_healthcareserviceprovider_by_id))

module.exports = router;