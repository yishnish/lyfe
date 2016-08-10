function Copulates(){}

(function () {
    var dx = [-1, 0, 1];
    var dy = [-1, 0, 1];

    Copulates.prototype.tryHumping = function (turn) {
        var humpableDeltas = this.findPlaces(turn, this.isHumpable);
        var humpeeDelta = this.pickRandomLocation(humpableDeltas);
        if (humpeeDelta) {
            turn.doThisToThatThere(this.hump, humpeeDelta);
        }
    };

    Copulates.prototype.findPlaces = function (turn, criteria) {
        var places = [];
        dy.forEach(function (rowChange) {
            dx.forEach(function (colChange) {
                if (rowChange + colChange !== 0) {
                    var delta = new Delta(rowChange, colChange);
                    if (turn.hasMatchingThingAt(delta, criteria.bind(this))) {
                        places.push(delta);
                    }
                }
            }, this);
        }, this);
        return places;
    };

    Copulates.prototype.pickRandomLocation = function (locations) {
        return locations[Math.floor(Math.random() * locations.length)];
    };

    Copulates.prototype.hump = function (creature) {
        creature.getHumped();
    };

    Copulates.prototype.getHumped = function () {
        if (this.vitality === this.MAX_VITALITY) {
            this.pregnant = true;
        }
    };

    Copulates.prototype.isHumpable = function (thing) {
        return thing && thing.getIamA() === this.getIamA();
    };
})();