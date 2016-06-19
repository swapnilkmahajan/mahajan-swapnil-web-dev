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
                    if(page && page._id){
                        vm.page = page;
                    }
                    else{
                        vm.error = "Invalid page request"
                    }
                });

        }
        init();

        function updatePage(page){
            vm.editPageForm.$submitted=true;
            if (page.name) {
                PageService
                    .updatePage(vm.pageId, page)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function () {
                            vm.error = "Error updating page";
                        }
                    );
            }
        }
        
        function removePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                    function(){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(){
                        vm.error = "Can not delete Page";
                    }
                );
        }
    }
})();
