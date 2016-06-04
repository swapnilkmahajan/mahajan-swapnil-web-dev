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

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);

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
