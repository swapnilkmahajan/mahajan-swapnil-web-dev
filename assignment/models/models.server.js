/**
 * Created by Swapnil on 6/11/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")()
    };

    return models;
};