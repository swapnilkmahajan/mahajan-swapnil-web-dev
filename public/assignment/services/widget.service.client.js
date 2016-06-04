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
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget)
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
