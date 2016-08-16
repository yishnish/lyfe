function Cow(type) {
    Thing.call(this, type);
}
(function () {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Cow.prototype = Object.create(Thing.prototype);
    Cow.prototype.constructor = Cow;

    Cow.prototype.mixin(Birthing);
    Cow.prototype.mixin(Copulates);
    Cow.prototype.mixin(Vegetarian);

    Cow.prototype.doYourTurnThings = function (turn) {
        var didEat, gaveBirth, didHump;
        if (this.pregnant) {
            gaveBirth = this.giveBirth(turn);
        }
        if(!gaveBirth && this.vitality > 0){
            didHump = this.tryHumping(turn);
        }
        if (!gaveBirth && !didHump && this.vitality < this.MAX_VITALITY) {
            didEat = this.eatIfPossible(turn);
        }
        if (!gaveBirth && !didHump && !didEat ) {
            moveIfPossible.call(this, turn);
        }
        this.maybePoopAPlant(turn);
    };

    Cow.prototype.eat = function (food) {
        this.vitality += 2;
        food.getEaten();
    };

    function moveIfPossible(turn) {
        var placesToMoveTo = findPlacesToMoveTo.call(this, turn);
        var placeToMoveTo = pickRandomLocation(placesToMoveTo);
        if (placeToMoveTo) {
            turn.moveThing(placeToMoveTo);
        }
    }

    function findPlacesToMoveTo(turn) {
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
    }

    function pickRandomLocation(locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    }

})();