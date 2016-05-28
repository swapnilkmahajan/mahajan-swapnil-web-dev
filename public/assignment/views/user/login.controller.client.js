/**
 * Created by Swapnil on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login (username, password) {
            var user = UserService.findUserByUsernameAndPassword(username,password);
            if(user){
                $location.url("/profile/"+user._id);
            }else{
                vm.error = "User not found";
            }
        }
    }
})();
