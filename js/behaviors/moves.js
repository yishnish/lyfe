function Moves(){}

(function(){
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Moves.prototype = Object.create(BaseBehavior.prototype);

    Moves.prototype.moveIfPossible = function (turn) {
        var placesToMoveTo = this.findPlacesToMoveTo.call(this, turn);
        var placeToMoveTo = this.pickRandomLocation(placesToMoveTo);
        if (placeToMoveTo) {
            turn.moveThing(placeToMoveTo);
        }
    };

    Moves.prototype.findPlacesToMoveTo = function (turn) {
        var placesToMoveTo = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (!(rowChange === 0 && colChange ==0)) {
                    var delta = new Delta(rowChange, colChange);
                    if (turn.canMoveTo(delta)) {
                        placesToMoveTo.push(delta);
                    }
                }
            });
        });
        return placesToMoveTo;
    };

    Moves.prototype.pickRandomLocation = function(locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    }
})();