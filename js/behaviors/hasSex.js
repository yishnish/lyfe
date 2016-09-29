function HasSex(){
}

HasSex.prototype = Object.create(BaseBehavior.prototype);

HasSex.prototype.act = function(turn){
    if(turn.actor.vitality > 0){
        var humpableDeltas = this.findPlaces(turn, this.isHumpable.bind(turn.actor));
        var humpeeDelta = this.pickRandomLocation(humpableDeltas);
        if(humpeeDelta){
            turn.doThisToThatThere(this.hump, humpeeDelta);
            return true;
        } else return false;
    } else return false;
};

HasSex.prototype.hump = function(creature){
    if(creature.vitality > 0){
        creature.pregnant = true;
    }
};

HasSex.prototype.isHumpable = function(thing){
    return thing && thing.getClazz() === this.getClazz();
};
