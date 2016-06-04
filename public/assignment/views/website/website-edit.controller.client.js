/**
 * Created by Swapnil on 5/28/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.removeWebsite = removeWebsite;

        var id = $routeParams.websiteId;
        var userId = $routeParams.userId;
        function init() {
            WebsiteService
                .findWebsitesById(id)
                .then(function (res) {
                    var website = res.data;
                    if(website._id){
                        vm.website = website;
                    }
                });
        }
        init();


        function updateWebsite(newWebsite){
            var status = WebsiteService.updateWebsite(id, newWebsite);

            if(status === true){
                vm.success = "Success";
                $location.url("/user/"+userId+"/website/");
            }else{
                vm.failed = "Error";
            }
        }
        
        function removeWebsite(id) {
            var status = WebsiteService.deleteWebsite(id);
            if (status === true){
                $location.url("/user/"+userId+"/website/");
            }
        }
    }
})();
