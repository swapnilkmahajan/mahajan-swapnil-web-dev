/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService() {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;


        function createPage(websiteId, name, description) {
            var newPage = {
                _id :(new Date).getTime().toString(),
                websiteId: websiteId,
                name:name,
                description:description
            };
            
            pages.push(newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for (var i in pages){
                if(pages[i].websiteId === websiteId){
                 resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {

        }

        function updatePage(pageId, page){

        }

        function deletePage(pageId) {

        }
    }
})();
