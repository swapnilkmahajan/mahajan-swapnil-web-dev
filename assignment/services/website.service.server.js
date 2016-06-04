/**
 * Created by Swapnil on 6/4/2016.
 */
module.exports = function(app){

    var websites = [
        { "_id": "123", "name": "Facebook", "description":"Facebook Description", "developerId": "456" },
        { "_id": "234", "name": "Tweeter",  "description":"Tweeter Description ", "developerId": "456" },
        { "_id": "456", "name": "Gizmodo", "description":"Gizmodo Description", "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe","description":"Tic Tac Toe  Description", "developerId": "123" },
        { "_id": "678", "name": "Checkers", "description":"Checkers  Description", "developerId": "123" },
        { "_id": "789", "name": "Chess", "description":"Chess Description", "developerId": "234" }
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

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
        for (var i in websites){
            if(websites[i]._id === websiteId){
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites){
            if(websites[i]._id === websiteId){
                res.json(websites[i]);
                return;
            }
        }
        res.json({});
    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var resultSet = [];

        for(var i in websites){
            if(websites[i].developerId === userId){
             resultSet.push(websites[i]);
            }
        }
        res.json(resultSet);
    }
};