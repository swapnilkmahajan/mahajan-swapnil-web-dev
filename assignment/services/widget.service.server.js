/**
 * Created by Swapnil on 6/4/2016.
 */

module.exports = function(app, models){

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var width         = req.body.width;
        var myFile        = req.file;

        if (myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            widgetModel
                .findWidgetById(widgetId)
                .then(
                    function (widget) {
                        widget.url = "/uploads/" + filename;
                        widgetModel
                            .updateWidget(widgetId, widget)
                            .then(
                                function (stats) {
                                    console.log("uploaded the image to the widget");
                                    //res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                                },
                                function (error) {
                                    console.log("upload image to the widget failed");
                                    res.statusCode(400).send(error);
                                }
                            );
                    },
                    function (error) {
                        console.log("Failed to find the widget");
                        res.statusCode(400).send(error);
                    }
                );
        }
        res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }


    function createWidget(req, res){
        var pageId = req.params.pageId;
        var newWidget = req.body;

        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    var widgetId = widget._id;
                    pageModel
                        .findPageById(pageId)
                        .then(
                            function (page) {
                                page.widgets.push(widgetId);
                                pageModel
                                    .updatePage(pageId, page)
                                    .then(
                                        function (stats) {
                                            res.json(widget);
                                        },
                                        function (error) {
                                            console.log("Failed to add the widget to page's widget list");
                                            res.statusCode(400).send(error);
                                        }
                                    ); // end updatePage
                            },
                            function (error) {
                                console.log("Failed to find page for the widget");
                                res.statusCode(400).send(error);
                            }
                        );
                },
                function (error) {
                    console.log("Failed to create widget");
                    res.statusCode(400).send(error);
                }
            );// end createWidget
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    var pageId = widget._page;
                    pageModel
                        .findPageById(pageId)
                        .then(
                            function (page) {
                                for (var w in page.widgets){
                                    if (page.widgets[w].equals(widgetId)){
                                        page.widgets.splice(w,1);
                                        pageModel
                                            .updatePage(pageId, page)
                                            .then(
                                                function (statPage) {
                                                    console.log("update page don, deleting widget now");
                                                    widgetModel
                                                        .deleteWidget(widgetId)
                                                        .then(
                                                            function (statPage) {
                                                                res.sendStatus(200);
                                                            },
                                                            function (error) {
                                                                console.log("Deleting widget failed");
                                                                res.statusCode(400).send(error);
                                                            }
                                                        ) // deleteWidget
                                                },
                                                function (error) {
                                                    console.log("Updating page failed after removal");
                                                    res.statusCode(400).send(error);
                                                }
                                            ) //end updatePage
                                    }
                                }
                                console.log("Widget not found in page's widget list");
                                res.statusCode(400).send(error);
                            },
                            function (error) {
                                console.log("Page with id not found");
                                res.statusCode(400).send(error);
                            }
                        ); // end findPageById
                },
                function (error) {
                    console.log("Widget with id not found");
                    res.statusCode(400).send(error);
                }
            ); //findWidgetById
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        //
        // var updated = 400;
        // switch (widget.type) {
        //     case "HEADING":
        //         widgets[i].name = widget.name;
        //         widgets[i].text= widget.text;
        //         widgets[i].size = parseInt(widget.size);
        //         updated = 200;
        //         break;
        //     case "IMAGE":
        //         widgets[i].name = widget.name;
        //         widgets[i].text= widget.text;
        //         widgets[i].url = widget.url;
        //         if(widget.width)
        //             widgets[i].width = widget.width;
        //         else
        //             widgets[i].width = "100%";
        //         widgets[i].upload = widget.upload;
        //         updated = 200;
        //         break;
        //     case "HTML":
        //         updated = 200;
        //         break;
        //     case "YOUTUBE":
        //         widgets[i].name = widget.name;
        //         widgets[i].text= widget.text;
        //         widgets[i].url = widget.url;
        //         if(widget.width)
        //             widgets[i].width = widget.width;
        //         else
        //             widgets[i].width = "100%";
        //         updated = 200;
        //         break;
        //     default:
        //         updated = 400;
        // }
        // res.sendStatus(updated);

        widgetModel
            .updateWidget(widgetId,widget)
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
    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
}
