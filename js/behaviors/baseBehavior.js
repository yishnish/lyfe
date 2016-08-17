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

    BaseBehavior.prototype.findPlaces = function (turn, criteria) {
        var places = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (!(rowChange === 0 && colChange === 0)) {
                    var delta = new Delta(rowChange, colChange);
                    if (turn.hasMatchingThingAt(delta, criteria.bind(this))) {
                        places.push(delta);
                    }
                }
            }, this);
        }, this);
        return places;
    };


    BaseBehavior.prototype.pickRandomLocation = function (locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    };
})();