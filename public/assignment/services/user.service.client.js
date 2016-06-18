/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);


    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register
        };
        return api;

        function register(username, password){
            var newUser ={
                username : username,
                password: password
            };
            return $http.post("/api/register", newUser);
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var newUser ={
                username : username,
                password: password
            };
            return $http.post("/api/login", newUser);
        }

        function createUser(username, password) {
            var newUser ={
                username : username,
                password: password
            };
            return $http.post("/api/user", newUser);
        }

        function deleteUser(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByUsernameAndPassword(username, password){
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {

            var url = "/api/user/"+id;
            return $http.put(url,newUser);

        }
    }
})();
