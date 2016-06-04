/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        function init(){
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (res) {
                    vm.pages = res.data;
                });
        }
        init();
    }
})();
