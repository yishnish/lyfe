function MovesAround(){}

(function(){
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    MovesAround.prototype = Object.create(BaseAction.prototype);

    MovesAround.prototype.act = function (turn) {
        var placesToMoveTo = findPlacesToMoveTo(turn);
        var placeToMoveTo = this.pickRandomLocation(placesToMoveTo);
        if (placeToMoveTo) {
            turn.moveThing(placeToMoveTo);
        }
    };

    function findPlacesToMoveTo(turn) {
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
    }
})();