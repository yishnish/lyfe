/**
 A world contains a grid containing all the items in the world.
 You can register an object with the world and a callback to have
 called each time the world finishes a 'turn'
 */

function World(dataGrid){
    var callbacks = [];

    init(this);

    this.getGrid = function () {
        return dataGrid;
    };
    this.onChange = function(obj, callback) {
        callbacks.push({_object : obj, _callback : callback});
    };
    this.turn = function(){
        var thingsThatCanDoSomething = [];
        dataGrid.forEach(function (row, rowNumber) {
            row.forEach(function (maybeThing, colNumber) {
                if(maybeThing) {
                    thingsThatCanDoSomething.push({thing: maybeThing, location: new Coordinates(rowNumber, colNumber)});
                }
            });
        });
        thingsThatCanDoSomething.forEach(function (thingAndLocation) {
            thingAndLocation.thing.takeTurn(this, thingAndLocation.location);
        }, this);
        callbacks.forEach(function (objectAndCallback) {
            objectAndCallback._callback.apply(objectAndCallback._object);
        });
    };
    this.thingAt = function(row, col) {
        var y = dataGrid[row];
        if(y) {
            return y[col];
        }return null;
    };

    this.move = function(from, to) {
        var thing = dataGrid[from.getRow()][from.getColumn()];
        dataGrid[from.getRow()][from.getColumn()] = null;
        dataGrid[to.getRow()][to.getColumn()] = thing;
    };

    this.remove = function (row, col) {
        dataGrid[row][col] = null;
    };

    //private

    function init(_this){
        validateDataShape();
        _this.rows = dataGrid.length;
        _this.columns = dataGrid[0].length;
    }

    function validateDataShape() {
        if(!dataGrid || dataGrid.length === 0){
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