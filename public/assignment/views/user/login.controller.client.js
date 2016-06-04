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
            UserService
                .findUserByUsernameAndPassword(username,password)
                .then(function(res){
                    var user = res.data;
                    if(user){
                        $location.url("/user/"+user._id);
                    }else{
                        vm.error = "User not found";
                    }
                });
        }
    }
})();
