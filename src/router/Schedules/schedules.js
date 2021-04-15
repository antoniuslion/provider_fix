const express = require('express');
const catchErrors = require('express-catch-errors');
const Check_Schedule = require("../../error/Schedules/check-schedule");
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");
const Check_Auth_Public = require("../../error/Healthcareprovider/check-auth-public");

const router = express.Router();
const {
  get_all_schedules,
  get_schedule_by_id,
  create_schedule,
  update_schedule,
  delete_schedule
} = require('../../controller/Schedules/schedule_controller.js');

router
.route('/')
.get(catchErrors(Check_Auth_Public),catchErrors(get_all_schedules))

router
.route('/detail/:id')
.get(catchErrors(Check_Auth_Public), catchErrors(get_schedule_by_id))

router
.route('/createschedule')
.post(catchErrors(Check_Auth),Check_Schedule,catchErrors(create_schedule));

router
.route('/updateschedule/:id')
.patch(catchErrors(Check_Auth), Check_Schedule, catchErrors(update_schedule))

router
.route('/deleteschedule/:id')
.patch(catchErrors(Check_Auth), catchErrors(delete_schedule))

module.exports = router;