const Healthcareprovider = require('../../model/Healthcareprovider/Healthcareprovider');
const Healthcareserviceprovider = require('../../controller/Healthcareserviceprovider/healthcareserviceprovider_controller');
const bcrypt = require("bcryptjs");

module.exports.show_provider_profile = async (req, res) => {
    const provider = await Healthcareprovider.findById(res.locals.provider);
    res.status(200).json(provider);
};

module.exports.get_profile_provider_by_id = async (req, res) => {
    const provider = await Healthcareprovider.findById(req.params.id);
    res.status(200).json(provider);
};

module.exports.create_healthcareprovider = async (req, res) => {
    var logo = "";
    var gallery = [];

    if(req.files.logo){
        logo = req.files.logo[0].path
    }

    if(req.files.gallery){
        for (i = 0; i < req.files.gallery.length ;i++) {
            gallery[i] = req.files.gallery[i].path 
        }
    }

    const healthcareprovider = new Healthcareprovider({
        provider_name: req.body.provider_name.replace( /\s\s+/g, ' ' ),
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        country: req.body.country,
        phone_number: req.body.phone_number,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        status: "ACTIVE",
        province: req.body.province,
        service_charge: req.body.service_charge,
        logo: logo,
        provider_group_name: req.body.provider_group_name,
        short_profile : req.body.short_profile,
        bpjs_support: req.body.bpjs_support,
        web : req.body.web,
        gallery : gallery,
        modified_by: "",
        modified_reason : req.body.modified_reason,
        modified_date : Date.now(),
        created_by: "",
        created_date: Date.now()
    });

    const password = healthcareprovider.password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    healthcareprovider.password = hashedPassword

    await healthcareprovider.save();
    res.status(200).json(healthcareprovider);
};

module.exports.update_healthcareprovider = async (req, res) => {
    const healthcareprovider_search = await Healthcareprovider.findById(res.locals.provider);
    var logo = healthcareprovider_search.logo;
    var gallery = healthcareprovider_search.gallery;

    if(req.files.logo){
        logo = req.files.logo[0].path
    }

    if(req.files.gallery){
    for (i = 0; i < req.files.gallery.length ;i++) {
         gallery[i] = req.files.gallery[i].path 
        }
    }
  
    req.body.provider_name = req.body.provider_name.replace( /\s\s+/g, ' ' )
    req.body.logo = logo
    req.body.gallery = gallery
    req.body.modified_date=Date.now()
    req.body.modified_by=res.locals.provider
    req.body.created_by=res.locals.provider

    const healthcareprovider = await Healthcareprovider.findOneAndUpdate({ _id: res.locals.provider }, req.body, {
      new: true, useFindAndModify: false, runValidators: true
    });
    res.status(200).json(healthcareprovider);
};

module.exports.delete_healthcareprovider = async (req, res) => {
    const healthcareprovider = await Healthcareprovider.findOneAndUpdate({_id: res.locals.provider},
    { 
            $set: {
                    created_by: res.locals.provider,
                    modified_by: res.locals.provider,
                    status: "INACTIVE"
            }
        }, { new: true,useFindAndModify: false }
    )
    Healthcareserviceprovider.delete_many_healthcareserviceprovider({provider_id: res.locals.provider})
    res.status(200).json(healthcareprovider);
};

