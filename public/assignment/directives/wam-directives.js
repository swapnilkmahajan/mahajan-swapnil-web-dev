/**
 * Created by Swapnil on 6/12/2016.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable",wamSortable);
    
    function wamSortable() {
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            $(element)
                .sortable({
                    axis: 'y',
                    start: function(event, ui) {
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        end = ui.item.index();
                        scope.wamCallback({
                            start: start,
                            end: end
                        });
                    }
                });
        }
        return {
            scope: {
                wamCallback: '&'
            },
            link: linker
        }
    }
})();
