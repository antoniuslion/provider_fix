const express = require('express');
const catchErrors = require('express-catch-errors');
const Check_Booking = require("../../error/Booking/check-booking");
const Check_Auth_Public = require("../../error/Healthcareprovider/check-auth-public");
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");
const Check_Auth_Patient = require("../../error/Healthcareprovider/check-auth-patient");

const router = express.Router();
const {
  create_booking,
  update_booking,
  delete_booking,
  get_all_booking,
  get_booking_by_id,
  reject_booking_by_provider,
  update_booking_by_provider
} = require('../../controller/Booking/booking_controller.js');

router
.route('/')
.get(catchErrors(Check_Auth_Public),catchErrors(get_all_booking))
.post(catchErrors(Check_Auth_Patient),Check_Booking,catchErrors(create_booking))

router
.route('/delete/:id')
.patch(catchErrors(Check_Auth_Patient),catchErrors(delete_booking))

router
.route('/update/:id')
.patch(catchErrors(Check_Auth_Patient),Check_Booking,catchErrors(update_booking))

router
.route('/detail/:id')
.get(catchErrors(Check_Auth_Public),catchErrors(get_booking_by_id))

router
.route('/provider/reject/:id')
.patch(catchErrors(Check_Auth),catchErrors(reject_booking_by_provider))

router
.route('/provider/update/:id')
.patch(catchErrors(Check_Auth),catchErrors(update_booking_by_provider))

module.exports = router;