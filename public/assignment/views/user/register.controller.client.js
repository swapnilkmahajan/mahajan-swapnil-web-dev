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

        function registerUser(newUser) {
            
            if(UserService.findUserByUsername(newUser.username)){
                vm.error = "Username already used";
            }else{
                if(newUser.password === newUser.verify){
                    UserService.createUser(newUser);
                    var user = UserService.findUserByUsernameAndPassword(newUser.username,newUser.password);
                    $location.url("/user/"+user._id);
                }
                else{
                    vm.error = "Password and Verify Password do not match";
                }
            }
        }
    }
})();
