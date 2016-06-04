/**
 * Created by Swapnil on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var id = $routeParams["id"];
        function init() {
             UserService
                 .findUserById(id)
                 .then(function (res) {
                    vm.user  = res.data;
                 });
        }

        init();

        function deleteUser(){
            UserService
                .deleteUser(id)
                .then(
                    function () {
                        vm.success = "Your profile was removed.";
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Unable to delete profile";
                    }
                );
        }

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function (response) {
                        vm.success = "Your profile was saved.";
                    },
                    function (error) {
                        vm.error = "Unable to update profile";
                    }
                );
        }
    }
})();
