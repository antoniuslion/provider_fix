const Schedule = require('../../model/Schedules/Schedule');

module.exports =  async (req,res,next) => {
    try {
         const practitioner_id = req.body.practitioner_id;
         const schedule_time = req.body.schedule_time.replace( /\s\s+/g, ' ' ).trim();
         if(req.body.day_of_week.length == 1){
             req.body.day_of_week = [req.body.day_of_week]
         }
         const day_of_week = req.body.day_of_week.map(i=>Number(i));
         const schedules = await Schedule.find({practitioner_id : practitioner_id, schedule_time : schedule_time, day_of_week : { "$in" : day_of_week}});
         const schedules_temp = await Schedule.findById(req.params.id);
         const arr_day = []
         var count = 0;
         if(schedules.length >= 1 && req.params.id != null ){
            while(count < schedules_temp.day_of_week.length){
                arr_day[count] = schedules_temp.day_of_week[count]
                count++
            }
        }

        if (schedules.length < 1){
           next()
        }

        else if ((schedules_temp.practitioner_id == practitioner_id) && (schedules_temp.schedule_time == schedule_time) && (arr_day.sort().join(',') == day_of_week.map(i=>Number(i)).sort().join(','))){
            next()
        }
        
        else{
            res.status(400).json({
                message: "Schedule Exist"
            });
        }
        
    } catch (err) {
        res.status(400).json({
            message: "Schedule Exist or practitioner not valid"
        });
    }
  };