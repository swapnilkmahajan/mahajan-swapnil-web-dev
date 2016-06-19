/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;
        
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        function init(){

        }
        init();
        
        function createPage(name, title) {

            vm.newPageForm.$submitted = true;
            if(name) {
                PageService
                    .createPage(vm.websiteId, name, title)
                    .then(function (res) {
                        var newPage = res.data;
                        if (newPage) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        }
                        else {
                            vm.error = "Can not add new page";
                        }
                    });
            }
        }
    }
})();
