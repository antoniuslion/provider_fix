const mongoose = require ("mongoose");
var Float = require('mongoose-float').loadType(mongoose);

const ScheduleSchema = mongoose.Schema({
   
    practitioner_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a practitioner id"]
    },
 
    schedule_time: {
        type: String,
        trim: true,
        required: [true, "Please enter a schedule time"]
    },
 
    day_of_week: [{
        type: Number,
        trim: true,
        max: 6,
        min: 0,
        required: [true, "Please enter a day of schedule"]
    }],
 
    registration_fee: {
         type: Float,
         trim: true,
         required: [true, "Please enter a registration fee"]
    },
    
    consultation_fee: {
        type: Float,
        trim: true,
        required: [true, "Please enter a consultation fee"]
   },

    teleconference: {
        type: String,
        trim: true,
        required: [true, "Please enter a teleconference status"]
    },

    slot_capacity : {
        type: Number,
        trim: true,
        required: [true, "Please enter a slot capacity"]
    },

    slot_duration: {
        type: Number,
        trim: true,
        required: [true, "Please enter a slot duration"]
    },

    status: {
        type: String,
        trim: true,
        required: [true, "Please enter a status"]
    },

    service_charge: {
        type: Float,
        trim: true,
        required: [true, "Please enter a service charge"]
    },

    replacement_name: {
        type: String,
        trim: true
    },

    booking_start: {
        type: Date,
        trim: true,
        required: [true, "Please enter a booking start"],
        default: Date.now()
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

module.exports = mongoose.model('Schedule', ScheduleSchema);