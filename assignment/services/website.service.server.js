/**
 * Created by Swapnil on 6/4/2016.
 */
module.exports = function(app, models){

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    function createWebsite(req, res){
        var userId = req.params.userId;
        var newWebsite = req.body;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(
                function (newWebsite){
                    userModel
                        .findUserById(userId)
                        .then(
                            // found parent userObject for this website
                            function(user){
                                if (user){ // if valid user
                                    user.websites.push(newWebsite._id); // add the website to the user's websites
                                    userModel       // update the user in the database
                                        .updateUser(userId, user)
                                        .then(
                                            function(status){
                                                res.json(newWebsite);
                                            },
                                            function (error) {
                                                res.statusCode(404).send(error);
                                            }
                                        )
                                }
                                else{
                                    res.statusCode(404).send(error);
                                }
                            },
                            function(){
                                res.statusCode(404).send(error);
                            }
                        );
                },
                function (){
                    res.statusCode(404).send(error);
                })
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId) // find website for finding user id
            .then(
                function(website){
                    var userId = website._user;
                    websiteModel
                        .deleteWebsite(website._id) // delete website for website collection
                        .then(
                            function(stats){
                                console.log("website deleted, now removing from uses"+ stats);
                                userModel
                                    .findUserById(userId) // get user object
                                    .then(
                                        function(user){
                                            if (user){ // if valid user
                                                for( var w in user.websites){
                                                    if(user.websites[w].equals(website._id)){
                                                        user.websites.splice(w,1);
                                                        userModel       // update the user in the database
                                                            .updateUser(userId, user)
                                                            .then(
                                                                function(stats){
                                                                    console.log("website deleted from user as well ! success"+ stats);
                                                                    res.sendStatus(200);
                                                                },
                                                                function (error) {
                                                                    res.statusCode(400).send(error);
                                                                }
                                                            );
                                                    }
                                                }
                                                res.statusCode(400).send("website not found in user websites");
                                            }
                                            else{
                                                res.statusCode(404).send(error);
                                            }
                                        },
                                        function(){
                                            res.statusCode(404).send(error);
                                        }
                                    );
                            },
                            function(error){
                                res.statusCode(400).send(error);
                            }
                        )

                },
                function(error){
                    res.statusCode(404).send(error);
                }
            );
    }
    
    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website){
                    res.json(website);
                },
                function (error){
                    res.statusCode(404).send(error);
                }
            );
    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites){
                    res.json(websites);
                },
                function (){
                    res.statusCode(404).send(error);
                }
            );
    }
};