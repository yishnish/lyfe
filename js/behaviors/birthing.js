function Birthing() { }

(function () {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Birthing.prototype.giveBirth = function (turn) {
        var placesToGiveBirthAt = this.findAdjacentEmptySpaces(turn);
        var birthingSpot = this.pickRandomLocation(placesToGiveBirthAt);
        if (birthingSpot) {
            var baby = new VegetarianCreature(this.getIamA());
            baby.vitality = this.vitality;
            baby.hp = this.hp;
            turn.addThing(baby, birthingSpot);
            return true;
        } else return false;
    };

    Birthing.prototype.findAdjacentEmptySpaces = function (turn) {
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
    };

    Birthing.prototype.pickRandomLocation = function (locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    };
})();