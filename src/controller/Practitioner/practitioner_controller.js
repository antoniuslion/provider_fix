const Practitioner = require('../../model/Practitioner/Practitioner');
const Healthcareserviceprovider = require('../../model/Healthcareserviceprovider/Healthcareserviceprovider');
const Schedule = require('../../controller/Schedules/schedule_controller');

module.exports.create_practitioner = async (req, res) => {
    var image = "";
    var languages = [];
    languages = req.body.foreign_languages
  
    if(req.file){
      image = req.file.path
    }
  
    const practitioner = new Practitioner({
        service_provider_id: req.body.service_provider_id,
        full_name_with_title: req.body.full_name_with_title.replace( /\s\s+/g, ' ' ),
        sub_specialities: req.body.sub_specialities,
        short_medical_bio: req.body.short_medical_bio,
        educational_background: req.body.educational_background,
        foreign_languages: languages,
        selfie_imageurl: image,
        gender: req.body.gender,  
        specialities: req.body.specialities,
        modified_by: res.locals.provider,
        modified_reason: req.body.modified_reason,
        modified_date: Date.now(),
        created_by: res.locals.provider,
        created_date: Date.now(),
        status: "ACTIVE"
    });
  
    const healthcareserviceprovider = await Healthcareserviceprovider.find({ _id: practitioner.service_provider_id });
    if(healthcareserviceprovider[0].status == "ACTIVE")
    {
        await practitioner.save();
        res.status(200).json(practitioner);
    }
    else
    {
        res.status(400).json({
            message: "cannot create practitioner because service provider not active or service provider id not exist"
        });
    }
};

module.exports.update_practitioner = async (req, res) => {
    const practitioner_search = await Practitioner.findById(req.params.id);
    var image = practitioner_search.selfie_imageurl;
    var languages = practitioner_search.foreign_languages;
    
    if(req.file){
        image = req.file.path
    }

    if(req.body.foreign_languages){
        languages = [];
        languages = req.body.foreign_languages
    }

    req.body.full_name_with_title = req.body.full_name_with_title.replace( /\s\s+/g, ' ' )
    req.body.selfie_imageurl = image
    req.body.foreign_languages = languages
    req.body.modified_by = res.locals.provider
    req.body.modified_date=Date.now()

    const healthcareserviceprovider = await Healthcareserviceprovider.find({ _id: req.body.service_provider_id });
    if(healthcareserviceprovider[0].status == "ACTIVE")
    {
        const practitioner = await Practitioner.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true, useFindAndModify: false, runValidators: true
        });
        res.status(200).json(practitioner);
    }
    else
    {
        res.status(400).json({
            message: "cannot update practitioner because service provider not active or service provider id not exist"
        });
    }
};

module.exports.delete_practitioner = async (req, res) => {
    const practitioner = await Practitioner.findOneAndUpdate({_id: req.params.id},
        { 
            $set: {
                modified_by: res.locals.provider,
                status: "INACTIVE"
            }
        }, {  new: true,useFindAndModify: false }
    );
    Schedule.delete_many_schedules({ practitioner_id: req.params.id})
    res.status(200).json(practitioner)
};

module.exports.get_all_practitioners = async (req, res) => {
    const full_name_with_title = req.query.full_name_with_title;
    const provider_id = req.query.provider_id;
    const service_id = req.query.service_id;
    const practitioner_list = []
    let query2 = {};
    if (service_id != null) query2.service_id = service_id;
    if (provider_id != null) query2.provider_id = provider_id;
    const healthcareserviceprovider = await Healthcareserviceprovider.find( query2 );
    var count = 0;
    while (count in healthcareserviceprovider)
    {   
        practitioner_list.push(healthcareserviceprovider[count]._id);
        count++;
    }
    let query = {};
    if (full_name_with_title != null) query.full_name_with_title = {$regex:full_name_with_title, $options: '$i'};
    if (service_id != null || provider_id != null) query.service_provider_id = practitioner_list
    const practitioners = await Practitioner.find(query);
    res.status(200).json(practitioners);
};

module.exports.get_practitioner_by_id = async (req, res) => {
    const practitioner = await Practitioner.findById(req.params.id);
    res.status(200).json(practitioner);
};

async function delete_many_practitioners (params){
    const practitioner_temp = await Practitioner.find(params)
    const arr_practitioner = []
    var count = 0;
    while (count in practitioner_temp){
        arr_practitioner.push(practitioner_temp[count]._id)
        count++;
    }
    const practitioner = await Practitioner.updateMany(params,
        { 
             $set: {
                     status: "INACTIVE"
             }
         }, {  new: true,useFindAndModify: false }
    );
    Schedule.delete_many_schedules({ practitioner_id: arr_practitioner})
}
module.exports.delete_many_practitioners = delete_many_practitioners;