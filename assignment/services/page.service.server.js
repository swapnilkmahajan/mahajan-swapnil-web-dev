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
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function deletePage(req, res){
        var pageId = req.params.pageId;
        for (var i in pages){
            if(pages[i]._id === pageId){
                pages.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for (var i in pages){
            if(pages[i]._id === pageId){
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

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