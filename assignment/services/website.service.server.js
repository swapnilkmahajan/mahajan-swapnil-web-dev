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
                        )
                },
                function (){
                    res.statusCode(404).send(error);
                })
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
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
        // for (var i in websites){
        //     if(websites[i]._id === websiteId){
        //         websites[i].name = website.name;
        //         websites[i].description = website.description;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
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