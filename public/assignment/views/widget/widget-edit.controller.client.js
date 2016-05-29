(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget =deleteWidget;

        vm.pageId = $routeParams.pageId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;
        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(newWidget){
            var status = WidgetService.updateWidget(vm.widgetId, newWidget);

            if (status === true){
                $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget");
            }else {
                vm.error = "Error updating widget";
            }
        }

        function deleteWidget(widgetId){
            var status = WidgetService.deleteWidget(widgetId);
            if (status === true){
                $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget");
            }else {
                vm.error = "Error deleting widget";
            }
        }
    }
})();