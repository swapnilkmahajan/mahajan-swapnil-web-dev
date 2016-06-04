/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

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

    var isNew = null;

    function WidgetService() {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            getNewStatus: getNewStatus
        };
        return api;

        function getNewStatus(){
            return isNew;
        }

        function createWidget(pageId, widget) {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                pageId: pageId,
                widgetType : widget.widgetType
            }

            widgets.push(newWidget);
            isNew = newWidget._id;
            return newWidget;
        }

        function findWidgetsByPageId(pageId){
            var resultSet = [];
            for(var i in widgets){
                if (widgets[i].pageId === pageId){
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }

        function findWidgetById(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            var updated = false;
            for(var i in widgets){
                if (widgets[i]._id === widgetId) {
                    switch (widget.widgetType) {
                        case "HEADER":
                            widgets[i].name = widget.name;
                            widgets[i].text= widget.text;
                            widgets[i].size = parseInt(widget.size);
                            updated = true;
                            break;
                        case "IMAGE":
                            widgets[i].name = widget.name;
                            widgets[i].text= widget.text;
                            widgets[i].url = widget.url;
                            widgets[i].width = widget.width;
                            widgets[i].upload = widget.upload;
                            updated = true;
                            break;
                        case "HTML":
                            updated = true;
                            break;
                        case "YOUTUBE":
                            widgets[i].name = widget.name;
                            widgets[i].text= widget.text;
                            widgets[i].url = widget.url;
                            widgets[i].width = widget.width;
                            updated = true;
                            break;
                        default:
                            updated = false;
                    }
                }
            }
            isNew = null;
            return updated;
        }

        function deleteWidget(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i,1);
                    isNew = null;
                    return true;
                }
            }
            return false;
        }
    }
})();