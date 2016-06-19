/**
 * Created by Swapnil on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(username, password, verify) {
            vm.error =null;

            if (!username){
                vm.error = "Username is Required";
                if (!password) {
                    vm.error += " Password is required";
                }
                if (!verify) {
                    vm.error += " Verify Password is required";
                }
            } else if (!password){
                vm.error = "Password is required";
                if (!verify) {
                    vm.error += " Verify Password is required";
                }
            }else if (!verify){
                vm.error = "Password and Verify Password must Match"
            }
            else if (password !== verify){
                vm.error = "Password and Verify Password must Match"
            }
            else {
                UserService
                    .register(username, password)
                    .then(
                        function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        },
                        function (error) {
                            vm.error = "ERROR !! "+ error.data;
                        }
                    );
            }
        }
    }
})();
