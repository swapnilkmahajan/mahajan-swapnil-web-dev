/**
 * Created by Swapnil on 5/28/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.removePage = removePage;

        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (res) {
                    var page = res.data;
                    if(page._id){
                        vm.page = page;
                    }
                    else{
                        vm.error = "Invalid page request"
                    }
                });

        }
        init();

        function updatePage(page){
            var result = PageService.updatePage(vm.pageId, page);

            if (result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else{
                vm.error = "Error updating page";
            }
        }
        
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
