/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook", "description":"Facebook Description", "developerId": "456" },
        { "_id": "234", "name": "Tweeter",  "description":"Tweeter Description ", "developerId": "456" },
        { "_id": "456", "name": "Gizmodo", "description":"Gizmodo Description", "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe","description":"Tic Tac Toe  Description", "developerId": "123" },
        { "_id": "678", "name": "Checkers", "description":"Checkers  Description", "developerId": "123" },
        { "_id": "789", "name": "Chess", "description":"Chess Description", "developerId": "234" }
    ];

    function WebsiteService() {
        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsitesById:findWebsitesById,
            createWebsite:createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
            };
        return api;

        function findWebsitesById(websiteId) {
            for(var i in websites){
                if(websites[i]._id === websiteId){
                    return websites[i];
                }
            }
            return null;
        }

        function createWebsite(userId, website){

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
            var resultSet = [];

            for(var i in websites){
                if(websites[i].developerId === userId){
                 resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }
    }
})();