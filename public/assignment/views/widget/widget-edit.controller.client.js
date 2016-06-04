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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (res) {
                    vm.widget =res.data;
                    if(!vm.widget._id){
                        vm.error = "No widget found."
                    }
                });
        }
        init();

        function updateWidget(newWidget){
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .then(
                    function () {
                        $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget");
                    },
                    function () {
                        vm.error = "Error updating widget";
                    }
                );
        }

        function deleteWidget(widgetId){
            WidgetService
                .deleteWidget(widgetId)
                .then(
                    function () {
                        $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget");
                    },
                    function () {
                        vm.error = "Error deleting widget";
                    }
                );
        }
    }
})();