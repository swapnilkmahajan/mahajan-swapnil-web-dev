/**
 * Created by Swapnil on 6/11/2016.
 */


module.exports = function(){

    var mongoose  = require("mongoose");

    var UserSchema = mongoose.Schema({
        username : {type:String, required:true, unique:true},
        password : {type:String, required:true},
        firstName : String,
        lastName : String,
        email : String,
        phone: String,
        websites:  [{type: mongoose.Schema.ObjectId, ref: "Website"}],
        dateCreated: {type: Date, default: Date.now}
    },
        {collection:"assignment.user"});
    return UserSchema;
};