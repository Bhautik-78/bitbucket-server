const axios = require("axios");
const mongoose = require("mongoose");
const querystring = require('querystring');
const Setting = mongoose.model("setting");

exports.updateAccessToken = async () => {
    try{
        const response = await axios.post('https://bitbucket.org/site/oauth2/access_token', querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: 'gwxWvmDGVY3Z7GQdwE'
        }), {
            auth: {
                username: "gVE2EUGnrJp3DsF4PL",
                password: "aM8fqLb5LpunSq44xTt3XkMvZGyhEaeq"
            }
        })
        if(response && response.data){
            const updateToken = await Setting.updateOne({ refreshToken : response.data.refresh_token }, {accessToken : response.data.access_token})
            console.log("updateToken",updateToken)
            if(updateToken && updateToken.acknowledged){
                console.log("successFully Updated")
            }else {
                console.log("something went wrong")
            }
        }else {
            console.log("does not exist")
        }
    }catch (e) {
        console.log("error",e)
    }
};
