/**
 * Created by Swapnil on 6/11/2016.
 */


module.exports = function () {
    var mongoose  = require("mongoose");

    var PageSchema = mongoose.Schema({
            _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
            name: String,
            title: String,
            description: String,
            widgets : [{type: mongoose.Schema.ObjectId, ref: "Widget"}],
            dateCreated: {type: Date, default: Date.now}
        },
        {collection: "assignment.page"});
    return PageSchema;
};