const Schedule = require('../../model/Schedules/Schedule');
const Practitioner = require('../../model/Practitioner/Practitioner');
const Booking = require('../../controller/Booking/booking_controller');

module.exports.create_schedule = async (req, res) => {
    var day_of_week = [];
    day_of_week = req.body.day_of_week

    const schedule = new Schedule({
        practitioner_id: req.body.practitioner_id,
        schedule_time: req.body.schedule_time,
        day_of_week: day_of_week,
        registration_fee: req.body.registration_fee,
        consultation_fee: req.body.consultation_fee,
        teleconference: req.body.teleconference,
        slot_capacity: req.body.slot_capacity,
        slot_duration: req.body.slot_duration,
        status: "ACTIVE",
        service_charge: req.body.service_charge,
        replacement_name: req.body.replacement_name,
        modified_by: res.locals.provider,
        modified_reason: req.body.modified_reason,
        modified_date: Date.now(),
        created_by: res.locals.provider,
        created_date: Date.now()
    });
    const practitioner = await Practitioner.find({ _id: schedule.practitioner_id });
    if(practitioner[0].status == "ACTIVE")
    {
        await schedule.save();
        res.status(200).json(schedule);
    }
    else
    {
        res.status(400).json({
            message: "cannot create schedule, because practitioner not active or practitioner not exist on this hospital"
        });
    }
};

module.exports.update_schedule = async (req, res) => {
    const schedule_search = await Schedule.findById(req.params.id);
    var day_of_week = schedule_search.day_of_week;

    if(req.body.day_of_week){
        day_of_week = [];
        day_of_week = req.body.day_of_week
    }

    req.body.day_of_week = day_of_week
    req.body.modified_date=Date.now()
    req.body.modified_by = res.locals.provider

    const practitioner = await Practitioner.find({ _id: req.body.practitioner_id });
    if(practitioner[0].status == "ACTIVE")
    {
        const schedule = await Schedule.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true, useFindAndModify: false, runValidators: true
        });
        res.status(200).json(schedule);
    }
    else
    {
        res.status(400).json({
            message: "cannot update schedule, because practitioner not active or practitioner not exist on this hospital"
        });
    }
};

module.exports.delete_schedule = async (req, res) => {
    const schedule = await Schedule.findOneAndUpdate({_id: req.params.id},
        { 
            $set: {
                modified_by: res.locals.provider,
                status: "INACTIVE"
        }
    }, {  new: true,useFindAndModify: false });
    Booking.delete_many_booking({ schedule_id: req.params.id})
    res.status(200).json(schedule)
};

module.exports.get_all_schedules = async (req, res) => {
    const practitioner_id = req.query.practitioner_id;

    let query = {};
    if (practitioner_id != null) query.practitioner_id = practitioner_id;

    const schedules = await Schedule.find(query);
    res.status(200).json(schedules);
};


module.exports.get_schedule_by_id = async (req, res) => {
    const schedule = await Schedule.findById(req.params.id);
    res.status(200).json(schedule);
};

async function delete_many_schedules (params){
    const schedule_temp = await Schedule.find(params)
    const arr_schedule = []
    var count = 0;
    while (count in schedule_temp){
        arr_schedule.push(schedule_temp[count]._id)
        count++;
    }
    const schedule = await Schedule.updateMany(params,
        { 
             $set: {
                     status: "INACTIVE"
             }
         }, {  new: true,useFindAndModify: false }
    );
    Booking.delete_many_booking({ schedule_id: arr_schedule })
}
module.exports.delete_many_schedules = delete_many_schedules;