const Session = require('../../model/Healthcareprovider/Sessionprovider');
const Provider = require('../../model/Healthcareprovider/Healthcareprovider');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//set time expired for access token
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
  
// add date
Date.prototype.addDays= function(h){
    this.setDate(this.getDate()+h);
    return this;
}

module.exports.login = async (req, res) => {
    const provider = await Provider.findOne({provider_name: req.body.provider_name, status:"ACTIVE"}).select('password');
    if (provider){
          const match = await bcrypt.compare(req.body.password, provider.password);
          if(match){
              const refreshToken = await jwt.sign({
                   provider_name: provider.provider_name,
                   provider_id: provider._id
              }, 
              process.env.REFRESH_TOKEN_SECRET, 
              {
                  expiresIn: "7d"
              });
              const session = new Session({
                  access_token: "null",
                  refresh_token: refreshToken,
                  expired_date: "",
                  refresh_token_expired: new Date().addDays(7),
                  created_on: Date.now()
              });

              await session.save()
              return res.status(200).json({ refresh_token: refreshToken });
          }
          else{
              return res.status(401).json({
                  message: "Auth Failed"
              });
          }
    }
    else{
          res.status(400).json({
              message: "Provider not Exist or Inactive"
          });
    }
};

module.exports.logout = async (req, res) => {
    const  refresh_token  = req.body.refresh_token;
    const session_token = await Session.findOneAndDelete({ refresh_token: refresh_token });
    if(session_token)
    {
        return res.status(200).json({ success: "User Provider logged out!" });
    }
    else
    {
        return res.status(400).json({ success: "token not valid!" });
    }
};


module.exports.generatenewtoken = async (req, res) => {
    const refresh_token  = req.body.refresh_token;
    if (!refresh_token) {
      return res.status(403).json({ error: "refresh token undefined" });
    } 
    else {
      const tokenDoc = await Session.findOne({ refresh_token: refresh_token });
      const token_id = tokenDoc.id;
        const payload = await jwt.verify(tokenDoc.refresh_token,  process.env.REFRESH_TOKEN_SECRET, async (err,response) =>{
            if(err){
                const updated_accesstoken = await Session.updateOne({_id: token_id},
                    { 
                         $set: {
                                status: "INACTIVE"
                        } 
                    }
                );
                return res.status(401).json({ error: "Token expired!" });
            }
            else{
                const expired_refresh_token_date = new Date(response.exp * 1000).getTime() - 5*60000
                var refresh = ""
                //console.log(new Date(temp));
                 const accessToken = await jwt.sign({ user: response },  process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "1h",
                  });

                  if( new Date() >= new Date(expired_refresh_token_date))
                  {
                    const refreshToken = await jwt.sign({ provider_id: response.provider_id }, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: "7d"
                    });

                    const updated_accesstoken = await Session.updateOne({_id: token_id},
                        { 
                             $set: {
                                    access_token: accessToken,
                                    refresh_token: refreshToken,
                                    refresh_token_expired: new Date().addDays(7),
                                    expired_date: new Date().addHours(1)
                            } 
                        },
                    );
                   refresh = refreshToken
                  }

                  else{
                    const updated_accesstoken = await Session.updateOne({_id: token_id},
                        { 
                             $set: {
                                    access_token: accessToken,
                                    expired_date: new Date().addHours(1)
                            } 
                        },
                    );
                    refresh = tokenDoc.refresh_token
                  }
                  return res.status(200).json({ access_token:accessToken, refresh_token:refresh });
            }
        });
      
    }
  };

  module.exports.checkToken = async (req, res) => {
    const access_token = await Session.find({ access_token:req.headers.authorization.split(" ")[1] })
    if(access_token.length == 1){
        res.status(200).json(
            {
                data: req.userData.user ,
                message: "Auth Success, Token not expired"
            }
        );
    }
    else{
        return res.status(400).json({ message: "token not valid!" });
    }
  };
  