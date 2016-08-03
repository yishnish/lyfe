function Creature(type) {
    Thing.call(this, type);
}
(function () {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Creature.prototype = Object.create(Thing.prototype);
    Creature.prototype.constructor = Creature;

    Creature.prototype.takeTurn = function (turn) {
        if (this.dead) {
            turn.removeThing();
        } else {
            var didEat, gaveBirth, didHump;
            if (this.pregnant) {
                gaveBirth = giveBirth.call(this, turn);
            }
            else if (this.vitality < this.MAX_VITALITY) {
                didEat = eatIfPossible.call(this, turn);
            }
            else {
                didHump = tryHumping.call(this, turn);
            }
            this.adjustHealthBasedOnVitality.call(this, turn);
            if (!didEat && !gaveBirth && !didHump) {
                moveIfPossible.call(this, turn);
                decrementVitality.call(this);
            }
        }
    };

    Creature.prototype.eat = function (food) {
        this.vitality++;
        food.getEaten();
    };


    Creature.prototype.getHumped = function () {
        if (this.vitality === this.MAX_VITALITY) {
            this.pregnant = true;
        }
    };

    function giveBirth(turn) {
        var placesToGiveBirthAt = findPlacesToMoveTo(turn);
        var birthingSpot = pickRandomLocation(placesToGiveBirthAt);
        if (birthingSpot) {
            turn.addThing(new Creature(this.iAmA), birthingSpot);
            return true;
        } else return false;
    }

    function tryHumping(turn) {
        var humpableDeltas = findPlaces(turn, isHumpable);
        var humpeeDelta = pickRandomLocation(humpableDeltas);
        if (humpeeDelta) {
            turn.doThisToThatThere(hump, humpeeDelta);
        }
    }

    function hump(creature) {
        creature.getHumped();
    }

    function isHumpable(thing) {
        return thing instanceof Creature;
    }

    function eatIfPossible(turn) {
        var placesWithFood = findPlaces(turn, function (thing) {
            return thing instanceof Food;
        });
        var placeToEatAt = pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turn.doThisToThatThere(this.eat, placeToEatAt);
            return true;
        }
        return false;
    }

    function moveIfPossible(turn) {
        var placesToMoveTo = findPlacesToMoveTo.call(this, turn);
        var placeToMoveTo = pickRandomLocation(placesToMoveTo);
        if (placeToMoveTo) {
            turn.moveThing(placeToMoveTo);
        }
    }

    function decrementVitality() {
        this.vitality = Math.max(--this.vitality, 0);
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

    function findPlaces(turn, criteria) {
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
    }

    function pickRandomLocation(locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    }

})();