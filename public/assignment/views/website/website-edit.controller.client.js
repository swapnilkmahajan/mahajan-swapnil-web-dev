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
        vm.gotoProfile = gotoProfile;

        var id = $routeParams.websiteId;
        var userId = $routeParams.userId;
        function init() {
            var website = WebsiteService.findWebsitesById(id)
            if(website){
                vm.website = website;
            }
        }
        init();

        function gotoProfile() {
            $location.url("/user/"+userId);
        }

        function updateWebsite(newWebsite){
            var status = WebsiteService.updateWebsite(id, newWebsite);

            if(status === true){
                vm.success = "Success";
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
