const mongoose = require ("mongoose");
var Float = require('mongoose-float').loadType(mongoose);

const BookingSchema = mongoose.Schema({

    patient_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a patient id"]
    },
   
    payment_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a payment id"]
    },

    schedule_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a schedule id"]
    },

 
    appointment_datetime: {
        type: String,
        trim: true,
        required: [true, "Please enter a appointment datetime"]
    },
 
    discount_amount: {
        type: Float,
        trim: true,
        default: 0
    },
 
    queue_number: {
         type: Number,
         trim: true,
         default: 0,
         required: [true, "Please enter a queue number"]
    },

    reschedule_count: {
        type: Number,
        trim: true,
        required: [true, "Please enter a reschedule count"]
    },

    utc_offset: {
        type: Number,
        trim: true,
        required: [true, "Please enter a utc offset"]
    },

    status: {
        type: String,
        required: [true, "Please enter a status"]
    },

    modified_by: {
        type: String,
        required: [true, "Please enter a modified_by"]
    },

    modified_reason: {
        type: String,
        trim: true,
        required: [true, "Please enter a modified_reason"]
    },

    modified_date: {
        type: Date,
        required: [true, "Please enter a modified_date"]
    },

    created_by: {
        type: String,
        required: [true, "Please enter a created_by"]
    },

    created_date: {
        type: Date,
        required: [true, "Please enter a created_date"]
    }
   
});

module.exports = mongoose.model('Booking', BookingSchema);