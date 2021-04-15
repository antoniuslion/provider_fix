const mongoose = require ("mongoose");
var Float = require('mongoose-float').loadType(mongoose);

const HealthcareproviderSchema = mongoose.Schema({
   
    provider_name: {
        type: String,
        trim: true,
        required: [true, "Please enter a provider name"]
    },
 
    password: {
        type: String,
        trim: true,
        select: false,
        minLength: [5, "minimum password length is 5"],
        required: [true, "Please enter a password"]
    },
 
    address: {
        type: String,
        trim: true,
        required: [true, "Please enter an address"]
    },
 
    city: {
        type: String,
        trim: true,
        required: [true, "Please enter a city"]
    },

    province: {
        type: String,
        trim: true,
        required: [true, "Please enter a province"]
    },
 
    zipcode: {
        type: String,
        trim: true,
        required: [true, "Please enter a zipcode"]
    },

    country: {
        type: String,
        trim: true,
        required: [true, "Please enter a country"]
    },

    phone_number: {
        type: String,
        trim: true,
        required: [true, "Please enter a phone_number"]
    },

    longitude: {
        type: String,
        trim: true,
        required: [true, "Please enter a longitude"]
    },

    latitude: {
        type: String,
        trim: true,
        required: [true, "Please enter a latitude"]
    },

    status: {
        type: String,
        required: [true, "Please enter a status"]
    },

    service_charge: {
        type: Float,
        trim: true,
        required: [true, "Please enter a service_charge"]
    },
 
    logo: {
        type: String
    },

    provider_group_name: {
        type: String,
        trim: true,
        required: [true, "Please enter a provider_group_name"]
    },

    short_profile : {
        type: String,
        trim: true,
        required: [true, "Please enter a short_profile"]
    },


    bpjs_support : {
        type: String,
        trim: true,
        required: [true, "Please enter a bpjs_support"]
    },

    web : {
        type: String,
        trim: true
    },

    gallery: [{
        type: String
    }],


    modified_by: {
        type: String
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
        type: String
    },

    created_date: {
        type: Date,
        required: [true, "Please enter a created_date"]
    }
   
});

module.exports = mongoose.model('Healthcareprovider', HealthcareproviderSchema);