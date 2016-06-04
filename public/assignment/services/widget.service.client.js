/**
 * Created by Swapnil on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
        };
        return api;


        function createWidget(pageId, widget) {
            var newWidget = {
                _id: (new Date()).getTime().toString(),
                pageId: pageId,
                widgetType : widget.widgetType
            }

            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId){
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
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
            return updated;
        }

        function deleteWidget(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
