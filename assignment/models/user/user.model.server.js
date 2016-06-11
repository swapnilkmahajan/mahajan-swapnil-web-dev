/**
 * Created by Swapnil on 6/11/2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findAllUsers:findAllUsers

    };
    return api;

    function findAllUsers() {
        return User.find();
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId){
        return User.findById(userId);
    }

    function findUserByUsername(username){
            return User.findOne({username: username});
    }

    function findUserByCredentials(username, password){
            return User.findOne({username: username, password: password});
    }

    function updateUser(userId, user){
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    websites: user.websites
                }
            });
    }

    function deleteUser(userId){
        return User.remove({_id: userId});
    }
};