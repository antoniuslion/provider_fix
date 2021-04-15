const mongoose = require ("mongoose");

const PatientSchema = mongoose.Schema({

    patient_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a patient id"]
    },
   
    email_address: {
        type: String,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: [true, "Please enter an email"]
    },
 
    phone_number: {
        type: String,
        trim: true
    },

    home_address: {
        type: String,
        trim: true,
        required: [true, "Please enter a home address"]
    },

    home_city: {
        type: String,
        trim: true,
        required: [true, "Please enter a home city"]
    },

    full_name: {
        type: String,
        trim: true,
        required: [true, "Please enter a full name"]
    },

    birthdate: {
        type: String,
        trim: true,
        required: [true, "Please enter a birthdate"]
    },

    status: {
        type: String,
        trim: true,
        default: "ACTIVE",
        required: [true, "Please enter a status"]
    },

    created_date: {
        type: Date,
        default: Date.now(),
        required: [true, "Please enter a created_date"]
    }
});

module.exports = mongoose.model('Patient', PatientSchema);