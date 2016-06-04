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
            deleteUser: deleteUser
        };
        return api;

        function createUser(newUser) {
            newUser._id = (new Date).getTime().toString();
            delete newUser.verify;
            users.push(newUser);
        }

        function deleteUser(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    users.splice(i,1);
                }
            }
        }

        function findUserByUsername(username){
            for(var i in users){
                if(users[i].username === username){
                    var id = users[i]._id;
                    return users[i];
                }
            }
            return null;
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
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
    }
})();
