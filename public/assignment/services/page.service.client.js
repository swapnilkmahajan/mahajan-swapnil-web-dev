/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;


        function createPage(websiteId, name, title) {
            var newPage = {
                _id :(new Date).getTime().toString(),
                websiteId: websiteId,
                name:name,
                title:title
            };
            
            pages.push(newPage);
            return newPage;
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page){
            for (var i in pages){
                if(pages[i]._id === pageId){
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var i in pages){
                if(pages[i]._id === pageId){
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
