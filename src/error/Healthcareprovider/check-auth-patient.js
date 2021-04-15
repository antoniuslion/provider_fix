const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).send({ error: 'TokenMissing' });
        }
        else{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'accesstokensecret');
            req.userData = decoded;
            res.locals.patient_id = req.userData.user.patient_id
            res.locals.email_address = req.userData.user.email_address
            res.locals.birthdate = req.userData.user.birthdate
            res.locals.full_name = req.userData.user.full_name
            res.locals.phone_number = req.userData.user.phone_number
            res.locals.home_address = req.userData.user.home_address
            res.locals.home_city = req.userData.user.home_city
            next();
        }
    }catch (error) {
        return res.status(401).json({
            message: "Auth Failed"
        });
    }
};