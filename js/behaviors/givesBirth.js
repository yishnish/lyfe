function GivesBirth(){}

GivesBirth.prototype = Object.create(BaseBehavior.prototype);

GivesBirth.prototype.act = function(turn){
    var actor = turn.actor;
    if(actor.pregnant){
        var placesToGiveBirthAt = this.findAdjacentEmptySpaces(turn);
        var birthingSpot = this.pickRandomLocation(placesToGiveBirthAt);
        if (birthingSpot) {
            var baby = actor.newInstance();
            baby.vitality = actor.vitality;
            baby.hp = actor.hp;
            turn.addThing(baby, birthingSpot);
            actor.pregnant = false;
            return true;
        }else return false;
    } else return false;
};