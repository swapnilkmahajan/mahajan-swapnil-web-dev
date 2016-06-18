/**
 * Created by Swapnil on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        var id = $routeParams["id"];

        function init() {
             UserService
                 .findUserById(id)
                 .then(
                     function (res) {
                         var user =res.data;
                        if (user && user._id){
                            vm.user = user;
                        }else{
                                vm.error = "Invalid user request";
                        }
                     },
                     function () {
                         vm.error = "Error Finding user";
                     }
                 );
        }

        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function(response) {
                       $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }

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
