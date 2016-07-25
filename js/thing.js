function Thing(type) {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];
    this.iAmA = type;
    this.hp = 10;
    this.vitality = 10;

    this.canMoveTo = function (coords, world) {
        var row = coords.getRow(), col = coords.getColumn();
        return row >= 0 && col >= 0 && row < world.rows && col < world.columns && !world.thingAt(row, col);
    };

    this.takeTurn = function (world, location) {
        var placeToMoveTo = moveIfPossible.call(this, location, world);
        adjustHealthBasedOnVitality.call(this, world, placeToMoveTo || location);
        decrementVitality.call(this);
    };
    this.die = function (world, location) {
        world.remove(location.getRow(), location.getColumn());
    };

    function moveIfPossible(startingPoint, world) {
        var placesToMoveTo = findPlacesToMoveTo.call(this, startingPoint, world);
        var placeToMoveTo = chooseLocationToMoveTo(placesToMoveTo);
        if (placeToMoveTo) {
            world.move(startingPoint, placeToMoveTo);
        }
        return placeToMoveTo;
    }

    function decrementVitality() {
        this.vitality = Math.max(--this.vitality, 0);
    }

    function adjustHealthBasedOnVitality(world, location) {
        if (this.vitality === 0) {
            this.hp = Math.max(--this.hp, 0);
        }
        if (this.hp <= 0) {
            this.die(world, location);
        }
    }

    function chooseLocationToMoveTo(placesToMoveTo) {
        return placesToMoveTo[Math.floor(Math.random() * placesToMoveTo.length)];
    }

    function findPlacesToMoveTo(location, world) {
        var placesToMoveTo = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (dy !== 0 && dx !== 0) {
                    var possiblePlaceToMoveTo = new Coordinates(location.getRow() + rowChange, location.getColumn() + colChange);
                    if (this.canMoveTo(possiblePlaceToMoveTo, world)) {
                        placesToMoveTo.push(possiblePlaceToMoveTo);
                    }
                }
            }, this);
        }, this);
        return placesToMoveTo;
    }
}
