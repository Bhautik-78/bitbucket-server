const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    userName : String,
    clientKey : String,
    secretKey : String,
    accessToken : String,
    emailId : String,
    refreshToken : String
});

module.exports = mongoose.model( "setting", settingSchema );
