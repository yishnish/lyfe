function Vegetarian(){}

(function(){
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Vegetarian.prototype.eatIfPossible = function(turn) {
        var placesWithFood = this.findPlaces(turn, function (thing) {
            return thing instanceof FruitBush;
        });
        var placeToEatAt = this.pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turn.doThisToThatThere(this.eat, placeToEatAt);
            return true;
        }
        return false;
    }

    Vegetarian.prototype.findPlaces = function (turn, criteria) {
        var places = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (rowChange + colChange !== 0) {
                    var delta = new Delta(rowChange, colChange);
                    if (turn.hasMatchingThingAt(delta, criteria)) {
                        places.push(delta);
                    }
                }
            });
        });
        return places;
    };

    Vegetarian.prototype.pickRandomLocation = function (locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    };
})();
