/**
 * Created by Swapnil on 6/4/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService){
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        vm.pageId = $routeParams.pageId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;


        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (res) {
                    var widget =res.data;
                    if(widget._id){
                        widget.url = url;
                        WidgetService
                            .updateWidget(vm.widgetId, widget)
                            .then(
                                function(){
                                    vm.success = "successfully updated image url."
                                    $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId+"/widget");
                                },
                                function(){
                                    vm.error="Can not update the URL for Image.";
                                }
                            );
                    }else{
                        vm.error = "No widget found."
                    }
                });
        }

        function searchPhotos(searchText){
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
    }
})();
