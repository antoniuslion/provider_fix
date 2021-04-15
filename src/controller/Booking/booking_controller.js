const Booking = require('../../model/Booking/Booking');
const Patient = require('../../controller/Patient/patient_controller');

module.exports.create_booking = async (req, res) => {
    const booking = new Booking({
        patient_id: res.locals.patient_id,
        payment_id: req.body.payment_id,
        schedule_id: req.body.schedule_id,
        appointment_datetime: req.body.appointment_datetime.replace( /\s\s+/g, ' ' ),
        discount_amount: req.body.discount_amount,
        reschedule_count: 0,
        utc_offset: req.body.utc_offset,
        status: "PENDING",
        modified_by: res.locals.patient_id,
        modified_reason: req.body.modified_reason,
        modified_date: Date.now(),
        created_by: res.locals.patient_id,
        created_date: Date.now()
    });
    await booking.save();
    await Patient.create_patient_hospital(res.locals.patient_id, res.locals.email_address, res.locals.birthdate, res.locals.full_name, res.locals.phone_number, res.locals.home_address, res.locals.home_city)
    res.status(200).json(booking);
};

module.exports.update_booking = async (req, res) => {
    let query = {};
    query.patient_id = res.locals.patient_id;
    query._id = req.params.id;
    

    const booking_check = await Booking.findById(req.params.id)
    const appointment_date= (booking_check.appointment_datetime).substring(0,10)
    const appointment_date_now= new Date().toISOString().split('T')[0]

    if(appointment_date_now < appointment_date && booking_check.status != "REJECTED" && booking_check.status != "CANCEL"){
        const booking = await Booking.findOneAndUpdate(query, {
            $set: {
                modified_date: Date.now(),
                appointment_datetime: req.body.appointment_datetime,
                modified_reason: req.body.modified_reason
            }
        }, { new: true, useFindAndModify: false, runValidators: true });
        res.status(200).json(booking);
    }
    else{
        res.status(400).json({
            message: "cannot update booking because it was rejected, canceled, or passed"
        });
    }
};

module.exports.delete_booking = async (req, res) => {
    let query = {};
    query.patient_id = res.locals.patient_id;
    query._id = req.params.id;

    const booking_check = await Booking.findById(req.params.id)
    const appointment_date= (booking_check.appointment_datetime).substring(0,10)
    const appointment_date_now= new Date().toISOString().split('T')[0]

    if(appointment_date_now < appointment_date && booking_check.status != "REJECTED"){
        const booking = await Booking.findOneAndUpdate(query, 
            {
                $set: {
                    modified_by: res.locals.patient_id,
                    status: "CANCEL"
                }
            }, { new: true, useFindAndModify: false, runValidators: true });
            res.status(200).json(booking);
    }
    else{
        res.status(400).json({
            message: "cannot cancel booking because it was rejected or passed"
        });
    }
};

async function delete_many_booking (params){
    const booking_check = await Booking.find(params)
    var count = 0
    while(count in booking_check){
        const appointment_date= (booking_check[count].appointment_datetime).substring(0,10)
        const appointment_date_now= new Date().toISOString().split('T')[0]
    
        if(appointment_date_now < appointment_date && booking_check[count].status == "PENDING"){
            const booking = await Booking.findOneAndUpdate({ _id: booking_check[count]._id },
                { 
                    $set: {
                            status: "REJECTED"
                    }
                }, {  new: true,useFindAndModify: false }
            );
        }
        count++;
    }
}
module.exports.delete_many_booking = delete_many_booking;

module.exports.get_all_booking = async (req, res) => {
    const patient_id = req.query.patient_id;
    let query = {};
    if (patient_id != null) query.patient_id = patient_id;

    const bookings = await Booking.find(query);
    res.status(200).json(bookings)
};

module.exports.get_booking_by_id = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
};

module.exports.reject_booking_by_provider = async (req, res) => {
    const booking_check = await Booking.findById(req.params.id)
    const appointment_date= (booking_check.appointment_datetime).substring(0,10)
    const appointment_date_now= new Date().toISOString().split('T')[0]

    if(appointment_date_now < appointment_date && booking_check.status == "PENDING"){
        const booking = await Booking.findOneAndUpdate( {_id: req.params.id}, 
            {
                $set: {
                    status: "REJECTED"
                }
            }, { new: true, useFindAndModify: false, runValidators: true });
            res.status(200).json(booking);
    }
    else{
        res.status(400).json({
            message: "cannot reject booking because it was canceled, approved, rejected or passed"
        });
    }
};

module.exports.update_booking_by_provider = async (req, res) => {
    const booking_check = await Booking.findById(req.params.id)
    const appointment_date= (booking_check.appointment_datetime).substring(0,10)
    const appointment_date_now= new Date().toISOString().split('T')[0]

    if(appointment_date_now < appointment_date && booking_check.status == "PENDING"){
        const booking = await Booking.findOneAndUpdate( {_id: req.params.id}, 
            {
                $set: {
                    status: "APPROVED",
                    modified_reason: req.body.modified_reason,
                    queue_number: req.body.queue_number
                }
            }, { new: true, useFindAndModify: false, runValidators: true });
            res.status(200).json(booking);
    }
    else{
        res.status(400).json({
            message: "cannot update booking because it was canceled, approved, rejected or passed"
        });
    }
};



