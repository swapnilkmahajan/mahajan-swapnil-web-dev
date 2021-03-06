/**
 * Created by Swapnil on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;


        function login (username, password) {
            vm.noUser = null;
            vm.noPass = null;
            vm.error = null;
            if (!username){
                vm.noUser = "Username is Required";
                if (!password) {
                    vm.noPass = "Password is required";
                }
            } else if (!password){
                vm.noPass = "Password is required";
            }
            else {
                UserService
                    .login(username, password)
                    .then(
                        function (res) {
                            var user = res.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            } else {
                                vm.error = "User not found";
                            }
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }
    }
})();
