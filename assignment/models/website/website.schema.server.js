/**
 * Created by Swapnil on 6/11/2016.
 */


module.exports = function () {
    var mongoose  = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: {type : String, required:true},
        description: String,
        pages : [{type: mongoose.Schema.ObjectId, ref: "Page"}],
        dateCreated: {type: Date, default: Date.now}

    },
        {collection: "assignment.website"});
    return WebsiteSchema;
};