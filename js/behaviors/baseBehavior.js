function BaseBehavior(){}

(function(){
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    BaseBehavior.prototype.findAdjacentEmptySpaces = function (turn) {
        var placesToMoveTo = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (rowChange + colChange !== 0) {
                    var delta = new Delta(rowChange, colChange);
                    if (turn.canMoveTo(delta)) {
                        placesToMoveTo.push(delta);
                    }
                }
            });
        });
        return placesToMoveTo;
    };

    BaseBehavior.prototype.pickRandomLocation = function (locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    };
})();