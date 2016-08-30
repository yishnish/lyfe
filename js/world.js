function World(dataGrid){
    var callbacks = [];
    var pubsub = PubSub();

    this.getGrid = function () {
        return this.dataGrid;
    };

    this.eachTurn = function(obj, callback) {
        callbacks.push({_object : obj, _callback : callback});
    };

    this.turn = function(){
        var thingsThatCanDoSomething = [];
        this.dataGrid.forEach(function (row, rowNumber) {
            row.forEach(function (maybeThing, colNumber) {
                if(maybeThing) {
                    thingsThatCanDoSomething.push(new TurnContext(this, maybeThing, new Coordinates(rowNumber, colNumber)));
                }
            }, this);
        }, this);
        thingsThatCanDoSomething.forEach(function (turnContext) {
            turnContext.takeTurn();
        }, this);
        callbacks.forEach(function (objectAndCallback) {
            objectAndCallback._callback.apply(objectAndCallback._object);
        });
        pubsub.publish('turned');
    };

    this.thingAt = function(row, col) {
        var y = this.dataGrid[row];
        if(y) {
            return y[col];
        }return null;
    };

    this.move = function(from, to) {
        var thing = this.dataGrid[from.getRow()][from.getColumn()];
        this.dataGrid[from.getRow()][from.getColumn()] = null;
        this.dataGrid[to.getRow()][to.getColumn()] = thing;
    };

    this.remove = function (row, col) {
        var thingAt = this.dataGrid[row][col];
        if(thingAt){
            pubsub.publish('thing-removed', thingAt.getTypeName());
        }
        this.dataGrid[row][col] = null;
    };

    this.add = function(thing, coords) {
        if(!thing){
            this.remove(coords.getRow(), coords.getColumn());
        }else {
            var thingAt = this.dataGrid[coords.getRow()][coords.getColumn()];
            if(!thingAt) {
                this.dataGrid[coords.getRow()][coords.getColumn()] = thing;
                pubsub.publish('thing-added', thing.getTypeName());
            }else{
                throw new Error("Tried to add a thing to (" + coords.getRow() + "," + coords.getColumn() + ") but there was already something there");
            }
        }
    };

    init(this);

    function init(_this){
        validateDataShape();
        _this.dataGrid = [];
        dataGrid.forEach(function(rowData, rowNum){
            _this.dataGrid[rowNum] = [];
            rowData.forEach(function(colData, colNum){
                _this.add(colData, new Coordinates(rowNum, colNum));
            });
        });
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