/**
 * Created by Swapnil on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(username, password, verify) {
            vm.error =null;
            vm.noUser = null;
            vm.noPass = null;
            vm.noVPass = null;

            if (!username){
                vm.noUser = "Username is Required";
                if (!password) {
                    vm.noPass = "Password is required";
                }
                if (!verify) {
                    vm.noVPass = "Verify Password is required";
                }
            } else if (!password){
                vm.noPass = "Password is required";
                if (!verify) {
                    vm.noVPass = "Verify Password is required";
                }
            }else if (!verify){
                vm.noVPass = "Password and Verify Password must Match"
            }
            else if (password !== verify){
                vm.noVPass = "Password and Verify Password must Match"
            }
            else {
                UserService
                    .findUserByUsername(username)
                    .then(function (res) {
                        var user = res.data;
                        if (user) {
                            vm.error = "Username already used";
                        } else {
                            if (password === verify) {
                                UserService
                                    .createUser(username, password)
                                    .then(function (res) {
                                        var user = res.data;
                                        if (user) {
                                            $location.url("/user/" + user._id);
                                        } else {
                                            vm.error = "Failed create new user";
                                        }
                                    });
                            }
                            else {
                                vm.error = "Password and Verify Password do not match";
                            }
                        }
                    });
            }
        }
    }
})();
