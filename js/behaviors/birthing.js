function Birthing() { }

(function () {
    Birthing.prototype = Object.create(BaseBehavior.prototype);
    Birthing.prototype.constructor = Birthing;


    Birthing.prototype.giveBirth = function (turn) {
        var placesToGiveBirthAt = this.findAdjacentEmptySpaces(turn);
        var birthingSpot = this.pickRandomLocation(placesToGiveBirthAt);
        if (birthingSpot) {
            var baby = new Cow(this.getIamA());
            baby.vitality = this.vitality;
            baby.hp = this.hp;
            turn.addThing(baby, birthingSpot);
            return true;
        } else return false;
    };
})();