const mongoose = require ("mongoose");

const PractitionerSchema = mongoose.Schema({

    service_provider_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a service provider id"]
    },
   
    full_name_with_title: {
        type: String,
        trim: true,
        required: [true, "Please enter a practitioner name"]
    },
 
    sub_specialities: {
        type: String,
        trim: true
    },
 
    short_medical_bio: {
        type: String,
        trim: true,
        required: [true, "Please enter a short_medical_bio"]
    },
 
    educational_background: {
        type: String,
        trim: true,
        required: [true, "Please enter a educational_background"]
    },
 
    foreign_languages: [{
         type: String,
         trim: true,
         required: [true, "Please enter a foreign_languages"]
    }],
    
    selfie_imageurl: {
        type: String
    },

    gender: {
        type: String,
        trim: true,
        required: [true, "Please enter a gender"]
    },

    specialities: {
        type: String,
        trim: true,
        required: [true, "Please enter a specialities"]
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
    },

    status: {
        type: String,
        required: [true, "Please enter a status"]
    }
   
});

module.exports = mongoose.model('Practitioner', PractitionerSchema);