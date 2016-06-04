/**
 * Created by Swapnil on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        function init() {
             UserService
                 .findUserById(id)
                 .then(function (res) {
                    vm.user  = res.data;
                 });
        }

        init();

        function updateUser(newUser) {
            var status = UserService.updateUser(id, newUser);

            if(status === true){
                vm.success = "Success";
            }else{
                vm.failed = "Error";
            }
        }
    }
})();
