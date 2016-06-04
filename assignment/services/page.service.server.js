/**
 * Created by Swapnil on 6/4/2016.
 */
module.exports = function(app){

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages){
            if(pages[i]._id === pageId){
                res.json(pages[i]);
                return;
            }
        }
        res.json({});
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        var resultSet = [];
        for (var i in pages){
            if(pages[i].websiteId === websiteId){
                resultSet.push(pages[i]);
            }
        }
        res.json(resultSet);
    }
}