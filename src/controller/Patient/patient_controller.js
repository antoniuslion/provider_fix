const Patient = require('../../model/Patient/Patient');

async function create_patient_hospital (params,params2,params3,params4,params5,params6,params7){
    const patient = await Patient.find({ patient_id: params });
    if (patient.length != 1){
        const patient = new Patient({
            patient_id: params,
            email_address: params2,
            birthdate: params3,
            full_name: params4,
            phone_number: params5,
            home_address: params6,
            home_city: params7
        });
        await patient.save();
    }
}
module.exports.create_patient_hospital = create_patient_hospital;

module.exports.update_patient = async (req, res) => {
    const patient = await Patient.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, useFindAndModify: false, runValidators: true
    });
    res.status(200).json(patient);
};

module.exports.delete_patient = async (req, res) => {
    const patient = await Patient.findOneAndUpdate({ _id: req.params.id },{
        $set: {
            modified_by: res.locals.provider,
            status: "INACTIVE"
        }
    },{ new: true, useFindAndModify: false, runValidators: true});
    res.status(200).json(patient);
};

module.exports.get_all_patient = async (req, res) => {
    const patients = await Patient.find();
    res.status(200).json(patients);
};

module.exports.get_patient_by_id = async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json(patient);
};