/**
 * Created by Swapnil on 6/4/2016.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, models){

    var userModel = models.userModel;

    app.post("/api/logout", logout);
    app.post("/api/login",passport.authenticate('local'), login);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/loggedin", loggedin);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res){
        req.logout();
        res.sendStatus(200);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function deleteUser(req, res) {
        var id  = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id  = req.params.userId;
        var newUser =  req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createUser(req, res){
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user){
                    res.json(user);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findUserById(req,res){
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function (user){
                    res.json(user);
                },
                function (error){
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res){

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user){
                    res.json(user);
                },
                function (error){
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(username, res){
        userModel
            .findUserByUsername(username)
            .then(
                function (user){
                    res.json(user);
                },
                function (error){
                    res.statusCode(404).send(error);
                }
            );
    }

    function getUsers(req, res){
        var username = req.query.username ;
        var password = req.query.password;

        if (username && password){
            findUserByCredentials(username, password, res);
        }else if (username){
            findUserByUsername(username, res);
        }else{
            findAllUsers();
        }
    }
    
    function findAllUsers(){
        userModel
            .findAllUsers()
            .then(
                function (users){
                    res.json(users);
                },
                function (error){
                    res.statusCode(404).send(error);
                });
    }
};
