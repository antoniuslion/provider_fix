const mongoose = require ("mongoose");

const SessionproviderSchema = mongoose.Schema({
    access_token: {
        type: String
    },
 
    refresh_token: {
        type: String,
        required: [true]
    },
 
    expired_date: {
        type: Date
    },

    refresh_token_expired: {
        type: Date,
        required: [true]
    },

    created_on: {
        type: Date,
        required: [true]
    },

    status: {
        type: String,
        default: "ACTIVE"
    }
    
 });

 module.exports = mongoose.model('Sessionprovider', SessionproviderSchema);