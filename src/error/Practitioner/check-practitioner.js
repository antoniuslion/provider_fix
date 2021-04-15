const Practitioner = require('../../model/Practitioner/Practitioner');

module.exports =  async (req,res,next) => {
    try {
         const full_name_with_title = req.body.full_name_with_title.replace( /\s\s+/g, ' ' ).trim();
         const service_provider_id = req.body.service_provider_id;
         const practitioners = await Practitioner.find({ full_name_with_title:new RegExp(["^", full_name_with_title , "$"].join(""), "i"), service_provider_id:service_provider_id });
         const practitioners_temp = await Practitioner.findById(req.params.id);

        if (practitioners.length < 1){
           next()
        }
        
        else if ((practitioners_temp.full_name_with_title.toLowerCase() == full_name_with_title.toLowerCase()) && (practitioners_temp.service_provider_id == service_provider_id)){
            next()
        }
        
        else{
            res.status(400).json({
                message: "Practitioner Exist"
            });
        }
        
    } catch (err) {
        res.status(400).json({
            message: "Practitioner Exist"
        });
    }
  };