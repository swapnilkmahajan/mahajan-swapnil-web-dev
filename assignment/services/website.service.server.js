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