/**
 * Created by Swapnil on 6/11/2016.
 */

module.exports = function () {


    var mongoose = require("mongoose");
    var UserSchema  = require("../user/user.schema.server")();
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;


    function createWebsiteForUser(userId, website){
        website._user  = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId){
        return Website.find({"_user":userId});
    }

    function findWebsiteById(websiteId){
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website){

    }

    function deleteWebsite(websiteId){

    }

}
