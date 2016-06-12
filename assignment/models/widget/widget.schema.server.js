/**
 * Created by Swapnil on 6/11/2016.
 */


module.exports = function () {
    var mongoose  = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        type: {type: String, enum:['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        palceholder : String,
        description: String,
        url : String,
        width: {type:String, default:"100%"},
        height : String,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        deletable: Boolean,
        formatted : Boolean,
        dateCreated: {type: Date, default: Date.now}
    },
        {collection: "assignment.widget"});
    return WidgetSchema;
};