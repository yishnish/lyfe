function Creature(type) {
    Thing.call(this, type);
}

Creature.prototype = Object.create(Thing.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.eat = function (food) {
    this.vitality++;
    food.getEaten();
};

Creature.prototype.takeTurn = function (turnContext) {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];
    if(this.dead) {
        turnContext.removeThing();
    }else{
        var didEat;
        if (this.vitality < this.MAX_VITALITY) {
            didEat = eatIfPossible.call(this, turnContext);
        }
        this.adjustHealthBasedOnVitality.call(this, turnContext);
        if(!didEat) {
            moveIfPossible.call(this, turnContext);
            decrementVitality.call(this);
        }
    }

    function eatIfPossible(turnContext) {
        var placesWithFood = findPlacesWithFood(turnContext);
        var placeToEatAt = pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turnContext.doThisToThatThere(this.eat, placeToEatAt);
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
                            return thing instanceof Food;
                        })) {
                        placesWithFood.push(delta);
                    }
                }
            }, this);
        }, this);
        return placesWithFood;
    }
};

