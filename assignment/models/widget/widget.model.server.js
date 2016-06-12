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
        var rowsVar = null;
        if (widget.rows){
            rowsVar =parseInt(widget.rows);
        }

        var sizeVar = null;
        if (widget.size){
            sizeVar =parseInt(widget.size);
        }

        return Widget
            .update({_id: widgetId},{
                $set: {
                    name: widget.name,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: rowsVar,
                    size: sizeVar,
                    class: widget.class,
                    icon:widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted,
                }
            });
    }

    function deleteWidget(widgetId){
        return Widget.remove({"_id": widgetId});
    }

    function reorderWidget(pageId, start, end){

    }
};
