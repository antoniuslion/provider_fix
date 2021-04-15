const jwt = require("jsonwebtoken");
const Session = require('../../model/Healthcareprovider/Sessionprovider');

module.exports = async (req,res,next) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).send({ error: 'TokenMissing' });
        }
        else{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'accesstokensecret');
            const access_token = await Session.find({ access_token:req.headers.authorization.split(" ")[1] })
            if(access_token.length == 1){
                req.userData = decoded;
                res.locals.provider = req.userData.user.provider_id
                next();
            }else{
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
        }
    }catch (error) {
        return res.status(401).json({
            message: "Auth Failed"
        });
    }
};