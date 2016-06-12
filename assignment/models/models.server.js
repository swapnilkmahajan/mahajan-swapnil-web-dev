/**
 * Created by Swapnil on 6/11/2016.
 */
module.exports = function () {

    var connectionString = 'mongodb://localhost/cs5610summer1';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    var mongoose = require("mongoose");
    mongoose.connect(connectionString);


    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel : require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };

    return models;
};