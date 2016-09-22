function Birthing() { }

    Birthing.prototype = Object.create(BaseBehavior.prototype);

    Birthing.prototype.giveBirth = function (turn) {
        var placesToGiveBirthAt = this.findAdjacentEmptySpaces(turn);
        var birthingSpot = this.pickRandomLocation(placesToGiveBirthAt);
        if (birthingSpot) {
            var baby = this.newInstance();
            baby.vitality = this.vitality;
            baby.hp = this.hp;
            turn.addThing(baby, birthingSpot);
            return true;
        } else return false;
    };
