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
            WidgetService
                .createWidget(vm.pageId, widget)
                .then(function (res) {
                    var newWidget = res.data;
                    if (newWidget._id){
                        vm.widget =  newWidget;
                        $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget/"+newWidget._id);
                    }
                    else{
                        vm.error("Can not create new widget");
                    }
                });
        }
    }
})();