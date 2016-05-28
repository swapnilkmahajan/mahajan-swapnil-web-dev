/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]

    function UserService() {
        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
        return api;

        function createUser(newUser) {
        }

        function deleteUser(id){
            
        }

        function findUserByUsernameAndPassword(username, password){
            for(var i in users){
                if(users[i].username === username && users[i].password === password ){
                    var id = users[i]._id;
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
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
