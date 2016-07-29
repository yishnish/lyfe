function Creature(type) {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];
    Thing.call(this, type);

    this.takeTurn = function (turnContext) {
        if (this.vitality < this.MAX_VITALITY) {
            var didEat = eatIfPossible.call(this, turnContext);
        }
        this.adjustHealthBasedOnVitality.call(this, turnContext);
        if(!didEat) {
            moveIfPossible.call(this, turnContext);
            decrementVitality.call(this);
        }
    };

    this.eat = function (food) {
        this.vitality++;
        food.getEaten();
    };

    function eatIfPossible(turnContext) {
        var placesWithFood = findPlacesWithFood(turnContext);
        var placeToEatAt = pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turnContext.doThisToThat(this.eat, placeToEatAt);
            return true;
        }
        return false;
    }

    function moveIfPossible(turnContext) {
        var placesToMoveTo = findPlacesToMoveTo.call(this, turnContext);
        var placeToMoveTo = pickRandomLocation(placesToMoveTo);
        if (placeToMoveTo) {
            turnContext.moveThing(placeToMoveTo);
        }
    }

    function decrementVitality() {
        this.vitality = Math.max(--this.vitality, 0);
    }

    function pickRandomLocation(locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    }

    function findPlacesToMoveTo(turnContext) {
        var placesToMoveTo = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (dy !== 0 && dx !== 0) {
                    var delta = new Delta(rowChange, colChange);
                    if (turnContext.canMoveTo(delta)) {
                        placesToMoveTo.push(delta);
                    }
                }
            }, this);
        }, this);
        return placesToMoveTo;
    }

    function findPlacesWithFood(turnContext) {
        var placesWithFood = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (dy !== 0 && dx !== 0) {
                    var delta = new Delta(rowChange, colChange);
                    if (turnContext.hasMatchingThingAt(delta, function (thing) {
                            return thing instanceof Food
                        })) {
                        placesWithFood.push(delta);
                    }
                }
            }, this);
        }, this);
        return placesWithFood;
    }
}

Creature.prototype = Object.create(Thing.prototype);
Creature.prototype.constructor = Creature;
