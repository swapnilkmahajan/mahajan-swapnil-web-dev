/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init(){
           vm .websites =  WebsiteService.findWebsitesByUser($routeParams.userId);
        }
        init();
    }
})();

