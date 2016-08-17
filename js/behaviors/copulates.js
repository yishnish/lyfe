function Copulates(){}

(function () {
    Copulates.prototype = Object.create(BaseBehavior.prototype);
    Copulates.prototype.constructor = Birthing;

    Copulates.prototype.tryHumping = function (turn) {
        var humpableDeltas = this.findPlaces(turn, this.isHumpable.bind(this));
        var humpeeDelta = this.pickRandomLocation(humpableDeltas);
        if (humpeeDelta) {
            turn.doThisToThatThere(this.hump, humpeeDelta);
        }
        if(humpeeDelta) {
            return true;
        }else return false;
    };

    Copulates.prototype.hump = function (creature) {
        creature.getHumped();
    };

    Copulates.prototype.getHumped = function () {
        if (this.vitality > 0) {
            this.pregnant = true;
        }
    };

    Copulates.prototype.isHumpable = function (thing) {
        return thing && thing.getIamA() === this.getIamA();
    };
})();