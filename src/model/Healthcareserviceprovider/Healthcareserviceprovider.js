const mongoose = require ("mongoose");

const HealthcareproviderSchema = mongoose.Schema({
   
    service_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a service id"]
    },
 
    provider_id: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: [true, "Please enter a provider id"]
    },
 
    status: {
        type: String,
        required: [true, "Please enter a status"]
    }
   
});

module.exports = mongoose.model('Healthcareserviceprovider', HealthcareproviderSchema);