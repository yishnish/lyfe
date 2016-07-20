/**
 A world contains a grid containing all the items in the world.
 You can register an object with the world and a callback to have
 called each time the world finishes a 'turn'
 */

function World(dataGrid){
    var callbacks = [];

    init();

    this.getGrid = function () {
        return dataGrid;
    };
    this.onChange = function(obj, callback) {
        callbacks.push({_object : obj, _callback : callback})
    };
    this.turn = function(){
        callbacks.forEach(function (objectAndCallback) {
            objectAndCallback._callback.apply(objectAndCallback._object);
        });
    };

    //private

    function init(){
        validateDataShape();
    }

    function validateDataShape() {
        if(!dataGrid || dataGrid.length == 0){
            throw new Error("Can't create a world from empty data");
        }
        var rowCount = dataGrid.length;
        if (rowCount > 0) {
            var colCount = dataGrid[0].length;
            dataGrid.forEach(function (row) {
                if (row.length !== colCount) {
                    throw new Error("Can't create a non-rectangular world");
                }
            });
        }
    }
}