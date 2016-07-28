function Creature(type){
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];
    Thing.call(this, type);

    this.takeTurn = function (world, location) {
        var placeToMoveTo = moveIfPossible.call(this, location, world);
        this.adjustHealthBasedOnVitality.call(this, world, placeToMoveTo || location);
        decrementVitality.call(this);
    };

    function moveIfPossible(startingPoint, world) {
        var turnContext = new TurnContext(world, this, startingPoint);
        var placesToMoveTo = findPlacesToMoveTo.call(this, turnContext);
        var placeToMoveTo = chooseLocationToMoveTo(placesToMoveTo);
        if (placeToMoveTo) {
            world.move(turnContext.getActorLocation(), placeToMoveTo);
        }
        return placeToMoveTo;
    }

    function decrementVitality() {
        this.vitality = Math.max(--this.vitality, 0);
    }

    function chooseLocationToMoveTo(placesToMoveTo) {
        return placesToMoveTo[Math.floor(Math.random() * placesToMoveTo.length)];
    }

    function findPlacesToMoveTo(turnContext) {
        var placesToMoveTo = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (dy !== 0 && dx !== 0) {
                    var delta = new Delta(rowChange, colChange);
                    if (turnContext.canMoveTo(delta)) {
                        placesToMoveTo.push(turnContext.coordinatesForDelta(delta));
                    }
                }
            }, this);
        }, this);
        return placesToMoveTo;
    }

}

Creature.prototype = Object.create(Thing.prototype);
Creature.prototype.constructor = Creature;
