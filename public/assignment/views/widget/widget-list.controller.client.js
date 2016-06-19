(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl=getSafeUrl;
        vm.reorderWidget = reorderWidget;

        vm.pageId = $routeParams.pageId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (res) {
                        vm.widgets = res.data;
                    },
                    function (error) {
                        vm.error = "Unable to find widgets for page:"+ vm.pageId;
                    }
                );
            // $(".container")
            //     .sortable({
            //         axis:'y'
            //     });
        }
        init();

        function reorderWidget(start, end) {
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(init);
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            if (widget.url) {
                var urlParts = widget.url.split("/");
                var id = urlParts[urlParts.length - 1];
                var url = "https://www.youtube.com/embed/" + id;
                return $sce.trustAsResourceUrl(url);
            }
        }
    }
})();