const Healthcareserviceprovider = require('../../model/Healthcareserviceprovider/Healthcareserviceprovider');
const Healthcareprovider = require('../../model/Healthcareprovider/Healthcareprovider');
const Practitioner = require('../../controller/Practitioner/practitioner_controller');
const axios = require('axios');
const config = require('../../database/config');

module.exports.create_healthcareserviceprovider= async (req, res) => {
    const healthcareserviceprovider = new Healthcareserviceprovider({
        service_id: req.body.service_id,
        provider_id: res.locals.provider,
        status: "ACTIVE"
    });

    const healthcareprovider = await Healthcareprovider.findById(res.locals.provider)
    const healthcareservices = await axios({
      method: 'get', 
      url: `${config.HEALTHCARESERVICES}/${healthcareserviceprovider.service_id}`,
      headers: {
          Authorization: req.headers.authorization
      }
    }).then(async healthcareservice => {
      if((healthcareservice.data.status == "ACTIVE") && (healthcareprovider.status == "ACTIVE"))
      {
        await healthcareserviceprovider.save();
        res.status(200).json(healthcareserviceprovider);
      }
      else
      {
        res.status(400).json({
            message: "cannot create healthcare service provider because healthcareprovider or healthcareservices not active"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: "cannot create healthcare service provider, healthcareprovider or healthcareservices not exist"
      });
    });
};

module.exports.update_healthcareserviceprovider = async (req, res) => {
    const healthcareprovider = await Healthcareprovider.findById(res.locals.provider)
    const healthcareservices = await axios({
      method: 'get', 
      url: `${config.HEALTHCARESERVICES}/${req.body.service_id}`,
      headers: {
          Authorization: req.headers.authorization
      }
    }).then(async healthcareservice => {
      if((healthcareservice.data.status == "ACTIVE") && (healthcareprovider.status == "ACTIVE"))
      {
        const healthcareserviceprovider = await Healthcareserviceprovider.findOneAndUpdate({ _id: req.params.id}, req.body, {
            new: true, useFindAndModify: false, runValidators: true
          });
        res.status(200).json(healthcareserviceprovider);
      }
      else
      {
        res.status(400).json({
            message: "cannot update healthcare service provider because healthcareprovider or healthcareservices not active"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: "cannot update healthcare service provider, healthcareprovider or healthcareservices not exist"
      });
    });
};

module.exports.delete_healthcareserviceprovider = async (req, res) => {
    const healthcareserviceprovider = await Healthcareserviceprovider.findOneAndUpdate({_id: req.params.id },
     { 
          $set: {
                  status: "INACTIVE"
          }
      }, {  new: true,useFindAndModify: false }
    );
    Practitioner.delete_many_practitioners({ service_provider_id: req.params.id})
    res.status(200).json(healthcareserviceprovider)
};

module.exports.get_all_healthcareserviceprovider = async (req, res) => {
    const provider_id = req.query.provider_id;
    const service_id = req.query.service_id;
    let query = {};
    if (provider_id != null) query.provider_id = provider_id
    if (service_id != null) query.service_id = service_id

    const healthcareserviceproviders = await Healthcareserviceprovider.find(query);
    res.status(200).json(healthcareserviceproviders);
};

module.exports.get_healthcareserviceprovider_by_id = async (req, res) => {
    const healthcareserviceprovider = await Healthcareserviceprovider.findById(req.params.id);
    res.status(200).json(healthcareserviceprovider);
};

async function delete_many_healthcareserviceprovider (params){
    const healthcareserviceprovider_temp = await Healthcareserviceprovider.find(params)
    const arr_provider_service = []
    var count = 0;
    while (count in healthcareserviceprovider_temp){
        arr_provider_service.push(healthcareserviceprovider_temp[count]._id)
        count++;
    }
    const healthcareserviceprovider = await Healthcareserviceprovider.updateMany(params,
        { 
             $set: {
                     status: "INACTIVE"
             }
         }, {  new: true,useFindAndModify: false }
       );
    Practitioner.delete_many_practitioners({ service_provider_id: arr_provider_service})
}
module.exports.delete_many_healthcareserviceprovider = delete_many_healthcareserviceprovider;