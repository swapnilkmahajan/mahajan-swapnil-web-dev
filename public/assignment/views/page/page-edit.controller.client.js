/**
 * Created by Swapnil on 5/28/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
//        vm.updatePage = updatePage;
        vm.removePage = removePage;

        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        function init() {
            var page = PageService.findPageById(vm.pageId);
            if(page){
                vm.page = page;
            }
        }
        init();
        
        function removePage(pageId) {
            var result = PageService.deletePage(pageId);

            if (result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else{
                vm.error = "Can not delete Page";
            }
        }
        
    }
})();
