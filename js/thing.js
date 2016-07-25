function Thing(type) {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];
    this.iAmA = type;
    this.hp = 10;
    this.vitality = 10;

    this.canMoveTo = function (coords, world) {
        var row = coords.row, col = coords.col;
        return row >= 0 && col >= 0 && row < world.rows && col < world.columns && !world.thingAt(row, col);
    };

    this.takeTurn = function(world, location) {
        var placesToMoveTo = findPlacesToMoveTo.call(this, location, world);
        moveToRandomLocation(placesToMoveTo, world, location);
        adjustHealthBasedOnVitality.call(this, world, location);
        decrementVitality.call(this);
    };
    this.die = function (world, location) {
        world.remove(location.row, location.col);
    };

    function decrementVitality() {
        this.vitality = Math.max(--this.vitality, 0);
    }

    function adjustHealthBasedOnVitality(world, location) {
        if (this.vitality === 0) {
            this.hp = Math.max(--this.hp, 0);
        }
        if(this.hp <= 0) {
            this.die(world, location);
        }
    }

    function moveToRandomLocation(placesToMoveTo, world, location) {
        if (placesToMoveTo.length > 0) {
            var placeToMoveTo = placesToMoveTo[Math.floor(Math.random() * placesToMoveTo.length)];
            world.move(location, placeToMoveTo);
        }
    }

    function findPlacesToMoveTo(location, world) {
        var placesToMoveTo = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (dy !== 0 && dx !== 0) {
                    var possiblePlaceToMoveTo = {row: location.row + rowChange, col: location.col + colChange};
                    var canMoveTo = this.canMoveTo(possiblePlaceToMoveTo, world);
                    if (canMoveTo) {
                        placesToMoveTo.push(possiblePlaceToMoveTo);
                    }
                }
            }, this);
        }, this);
        return placesToMoveTo;
    }
}
