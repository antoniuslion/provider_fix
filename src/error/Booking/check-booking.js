const Booking = require('../../model/Booking/Booking');

module.exports =  async (req,res,next) => {
    try {
        const patient_id = res.locals.patient_id;
        const schedule_id = req.body.schedule_id;
        const appointment_datetime = req.body.appointment_datetime.replace( /\s\s+/g, ' ' ).trim();
        const booking = await Booking.find({ schedule_id: schedule_id, appointment_datetime: new RegExp(["^", appointment_datetime, "$"].join(""), "i")});
        const booking_temp = await Booking.findById(req.params.id);

        if (booking.length < 1){
           next()
        }

        else if ((booking_temp.schedule_id == schedule_id) && (booking_temp.patient_id == patient_id) && (booking_temp.appointment_datetime == appointment_datetime)){
            next()
        }

        else{
            res.status(400).json({
                message: "Booking Exist"
            });
        }
        
    } catch (err) {
        res.status(400).json({
            message: "Booking Exist, or Schedule not Exist"
        });
    }
  };