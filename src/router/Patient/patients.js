const express = require('express');
const catchErrors = require('express-catch-errors');
const Check_Auth = require("../../error/Healthcareprovider/check-auth-provider");

const router = express.Router();
const {
    update_patient,
    delete_patient,
    get_all_patient,
    get_patient_by_id
} = require('../../controller/Patient/patient_controller.js');

router
.route('/')
.get(catchErrors(Check_Auth),catchErrors(get_all_patient))

router
.route('/detail/:id')
.get(catchErrors(Check_Auth), catchErrors(get_patient_by_id))

router
.route('/updatepatient/:id')
.patch(catchErrors(Check_Auth),catchErrors(update_patient));

router
.route('/deletepatient/:id')
.patch(catchErrors(Check_Auth), catchErrors(delete_patient))

module.exports = router;