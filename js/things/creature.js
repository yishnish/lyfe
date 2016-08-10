function Creature(type) {
    Thing.call(this, type);
}
(function () {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Creature.prototype = Object.create(Thing.prototype);
    Creature.prototype.constructor = Creature;

    Creature.prototype.mixin(Birthing);
    Creature.prototype.mixin(Copulates);
    Creature.prototype.mixin(Vegetarian);

    Creature.prototype.doYourTurnThings = function (turn) {
        var didEat, gaveBirth, didHump;
        if (this.pregnant) {
            gaveBirth = this.giveBirth(turn);
        }
        else if (this.vitality < this.MAX_VITALITY) {
            didEat = this.eatIfPossible.call(this, turn);
        }
        else {
            didHump = this.tryHumping(turn);
        }
        if (!didEat && !gaveBirth && !didHump) {
            moveIfPossible.call(this, turn);
        }
    };

    Creature.prototype.eat = function (food) {
        this.vitality++;
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