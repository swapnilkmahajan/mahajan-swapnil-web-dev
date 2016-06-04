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
            var url = "/api/website/"+ websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId){
            var url = "/api/website/"+ websiteId;
            return $http.delete(url);
        }

        function findWebsitesByUser(userId){
            var url = "/api/user/"+ userId + "/website";
            return $http.get(url);
        }
    }
})();