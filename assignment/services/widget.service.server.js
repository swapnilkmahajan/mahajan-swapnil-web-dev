/**
 * Created by Swapnil on 6/4/2016.
 */

module.exports = function(app){

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                }
            }
        }
        res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }


    function createWidget(req, res){
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget._id=(new Date()).getTime().toString();

        widgets.push(newWidget);
        res.json(newWidget);
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        var updated = 400;
        for(var i in widgets){
            if (widgets[i]._id === widgetId) {
                switch (widget.widgetType) {
                    case "HEADER":
                        widgets[i].name = widget.name;
                        widgets[i].text= widget.text;
                        widgets[i].size = parseInt(widget.size);
                        updated = 200;
                        break;
                    case "IMAGE":
                        widgets[i].name = widget.name;
                        widgets[i].text= widget.text;
                        widgets[i].url = widget.url;
                        if(widget.width)
                            widgets[i].width = widget.width;
                        else
                            widgets[i].width = "100%";
                        widgets[i].upload = widget.upload;
                        updated = 200;
                        break;
                    case "HTML":
                        updated = 200;
                        break;
                    case "YOUTUBE":
                        widgets[i].name = widget.name;
                        widgets[i].text= widget.text;
                        widgets[i].url = widget.url;
                        if(widget.width)
                            widgets[i].width = widget.width;
                        else
                            widgets[i].width = "100%";
                        updated = 200;
                        break;
                    default:
                        updated = 400;
                }
            }
        }
        res.sendStatus(updated);

    }
    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === widgetId){
                res.json(widgets[i]);
                return;
            }
        }
        res.json({});
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var resultSet = [];
        for(var i in widgets){
            if (widgets[i].pageId === pageId){
                resultSet.push(widgets[i]);
            }
        }
        res.json(resultSet);
    }
}
