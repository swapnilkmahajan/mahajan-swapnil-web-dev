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
                    if(website && website._id){
                        vm.website = website;
                    }else{
                        vm.error = "No Such website";
                    }
                });
        }
        init();


        function updateWebsite(newWebsite){
            WebsiteService
                .updateWebsite(id, newWebsite)
                .then(
                    function () {
                        vm.success = "Changes saved.";
                        $location.url("/user/"+userId+"/website/");
                    },
                    function () {
                        vm.error = "Can not update website.";
                    }
                );
        }
        
        function removeWebsite(id) {
            WebsiteService
                .deleteWebsite(id)
                .then(
                    function () {
                        $location.url("/user/"+userId+"/website/");
                    },
                    function () {
                        vm.error = "Can not delete website.";
                    }
                );
        }
    }
})();
