/**
 * Created by Swapnil on 6/4/2016.
 */
module.exports = function(app, models){

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    function createPage(req, res){
        var websiteId =  req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function (website) {
                                website.pages.push(page._id);
                                websiteModel
                                    .updateWebsite(websiteId, website)
                                    .then(
                                        function (stats) {
                                            console.log("page added to websites as well");
                                            res.json(page);
                                        },
                                        function (error) {
                                            res.statusCode(400).send(error);
                                        }
                                    );
                            },
                            function (error) {
                                res.statusCode(400).send(error);
                            }
                        ); //find websitr by ID
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    var websiteId  = page._website;
                    websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function (website) {
                                for (var p in website.pages){
                                    if (website.pages[p].equals(pageId)){
                                        website.pages.splice(p,1);
                                        websiteModel
                                            .updateWebsite(websiteId, website)
                                            .then(
                                                function (stats) {
                                                    console.log("Deleted from website");
                                                    pageModel
                                                        .deletePage(pageId)
                                                        .then(
                                                            function (delStat) {
                                                                console.log("Deleted from website and page");
                                                                res.sendStatus(200);
                                                                return;
                                                            },
                                                            function (error) {
                                                                console.log("Deleted from website error at page");
                                                                res.statusCode(400).send(error);
                                                                return;
                                                            }
                                                        ); // end of deletePage
                                                },
                                                function (error) {
                                                    console.log("Deleted from website failed");
                                                    res.statusCode(400).send(error);
                                                    return;
                                                }
                                            ); //end ofupdateWebsite
                                    }
                                }
                                // console.log("page id not found in website");
                                // res.statusCode(400).send(error);
                            },
                            function (error) {
                                console.log("no website with this id");
                                res.statusCode(400).send(error);
                            }
                        ); // findWebsiteById
                },
                function (error) {
                    console.log("no page with this id");
                    res.statusCode(404).send(error);
                }
            );//findPageById

    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(
                function (stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
}