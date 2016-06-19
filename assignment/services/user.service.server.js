/**
 * Created by Swapnil on 6/4/2016.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;

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
    app.post("/api/register", register);
    app.get("/auth/facebook", passport.authenticate('facebook', {scope:'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.ASSGN_FB_CLIENT_ID,
        clientSecret : process.env.ASSGN_FB_CLIENT_SECRET,
        callbackURL  : process.env.ASSGN_FB_CALLBACK_URL
    };

    passport.use('facebook',new FacebookStrategy(facebookConfig, facebookLogin));

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);

                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }

    function register(req, res){
        var username = req.body.username;
        var newUser = req.body;

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if (user){
                        res.status(400).send("Username already in use");
                        return;
                    }
                    else{
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel
                            .createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send("Error creating user");
                }
            ).then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send("Error Redirecting user");
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.statusCode(404).send("Error creating user");
                }
            );

    }

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
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
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
