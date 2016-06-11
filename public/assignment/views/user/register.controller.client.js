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
            UserService
                .findUserByUsername(username)
                .then(function (res) {
                    var user = res.data;
                    if(user){
                        vm.error = "Username already used";
                    }else{
                        if(password === verify){
                            UserService
                                .createUser(username, password)
                                .then(function (res) {
                                    var user = res.data;
                                    if (user){
                                        $location.url("/user/"+user._id);
                                    }else{
                                        vm.error = "Failed create new user";
                                    }
                                });
                        }
                        else{
                            vm.error = "Password and Verify Password do not match";
                        }
                    }
                });
        }
    }
})();
