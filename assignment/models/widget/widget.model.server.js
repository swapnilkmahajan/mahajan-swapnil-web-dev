/**
 * Created by Swapnil on 6/11/2016.
 */

module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;


    function createWidget(pageId, widget){
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page":pageId});
    }

    function findWidgetById(widgetId){
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget){
        delete widget._id;
        console.log("Widget Id : " + widgetId);
        console.log("Widget Id : " + widget.url);
        console.log(widget);
        if (widget.type === "IMAGE"){
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.url
                    }
                });
        }

        return Widget
            .update(
                {
                    _id: widgetId
                },
                {
                    $set: widget
                });
    }

    function deleteWidget(widgetId){
        return Widget.remove({"_id": widgetId});
    }

    function reorderWidget(pageId, start, end) {
        return Widget
            .find({"_page": pageId})
            .then(
                function(widgets){
                    widgets.forEach(
                        function(widget) {
                            if(start < end)
                            {
                                if(widget.order < start || widget.order > end);//unchanged widgets
                                else if(widget.order === start)
                                {
                                    widget.order = end;
                                    widget.save(function(){});
                                }
                                else if((widget.order > start) && (widget.order <= end))
                                {
                                    widget.order--;
                                    widget.save(function(){});
                                }
                            }
                            else{

                                if(widget.order < end || widget.order > start); // Unchanged
                                else if(widget.order === start)
                                {
                                    widget.order = end;
                                    widget.save(function(){});
                                }
                                else if((widget.order >= end) && (widget.order < start))
                                {
                                    widget.order++;
                                    widget.save(function(){});
                                }
                            }
                        }

                    )
                },
                function (error) {
                    return null;
                }
            );
    }

};
