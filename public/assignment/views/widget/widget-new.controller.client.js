/**
 * Created by Swapnil on 5/30/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService){
        var vm = this;
        vm.createWidget = createWidget;
        
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        
        function createWidget(widgetType) {
            var widget={};
            widget.widgetType = widgetType;
            var newWidget = WidgetService.createWidget(vm.pageId, widget);

            if (newWidget){
                vm.widget =  WidgetService.findWidgetById(newWidget._id);
                $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget/"+newWidget._id);
            }
        }
    }
})();