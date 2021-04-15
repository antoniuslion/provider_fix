const Healthcareserviceprovider = require('../../model/Healthcareserviceprovider/Healthcareserviceprovider');

module.exports =  async (req,res,next) => {
    try {
         const service_id = req.body.service_id;
         const provider_id = res.locals.provider;
         const healthcareserviceprovider = await Healthcareserviceprovider.find({ service_id: service_id, provider_id: provider_id});

        if (healthcareserviceprovider.length < 1){
           next()
        }
        else{
            res.status(400).json({
                message: "Healthcare Service Exist on This Provider"
            });
        }
        
    } catch (err) {
        res.status(400).json({
            message: "Healthcare Service Exist on This Provider, or Service and Provider Not Exist"
        });
    }
  };