(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl=getSafeUrl;

        vm.pageId = $routeParams.pageId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (res) {
                    vm.widgets = res.data;
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();