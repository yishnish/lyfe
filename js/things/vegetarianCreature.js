function VegetarianCreature(type) {
    Thing.call(this, type);
}
(function () {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    VegetarianCreature.prototype = Object.create(Thing.prototype);
    VegetarianCreature.prototype.constructor = VegetarianCreature;

    VegetarianCreature.prototype.mixin(Birthing);
    VegetarianCreature.prototype.mixin(Copulates);
    VegetarianCreature.prototype.mixin(Vegetarian);

    VegetarianCreature.prototype.doYourTurnThings = function (turn) {
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

    VegetarianCreature.prototype.eat = function (food) {
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