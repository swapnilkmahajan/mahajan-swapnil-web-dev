/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        var userId = $routeParams.userId;
        vm.userId = userId;
        function init(){
               WebsiteService
                   .findWebsitesByUser(userId)
                   .then(function (res) {
                       vm.websites = res.data;
                   });
        }
        init();
    }
})();

