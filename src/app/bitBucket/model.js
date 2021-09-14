const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const bitBucketSchema = new Schema({
    pagelen: Number,
    values: [],
    page: Number,
    size: Number,
    ownerId : String,
    displayName : String,
    accountId : String
});

module.exports = mongoose.model( "bitBucket", bitBucketSchema );
