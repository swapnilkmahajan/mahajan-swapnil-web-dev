/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);


    function WebsiteService($http) {
        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsitesById:findWebsitesById,
            createWebsite:createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
            };
        return api;

        function findWebsitesById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);

        }

        function createWebsite(userId, name, desc){
            var newWebsite = {
                _id : (new Date).getTime().toString(),
                name: name,
                description: desc,
                developerId:userId
            };

            websites.push(newWebsite);
            return newWebsite;
        }

        function updateWebsite(websiteId, website){
            for (var i in websites){
                if (websites[i]._id === websiteId){
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId){
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findWebsitesByUser(userId){

            var url = "/api/user/"+ userId + "/website";
            return $http.get(url);

        }
    }
})();