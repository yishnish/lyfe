function Copulates(){
}

Copulates.prototype = Object.create(BaseBehavior.prototype);

Copulates.prototype.tryHumping = function(turn){
    var humpableDeltas = this.findPlaces(turn, this.isHumpable.bind(this));
    var humpeeDelta = this.pickRandomLocation(humpableDeltas);
    if(humpeeDelta){
        turn.doThisToThatThere(this.hump, humpeeDelta);
        return true;
    } else return false;
};

Copulates.prototype.hump = function(creature){
    creature.getHumped();
};

Copulates.prototype.getHumped = function(){
    if(this.vitality > 0){
        this.pregnant = true;
    }
};

Copulates.prototype.isHumpable = function(thing){
    return thing && thing.getClazz() === this.getClazz();
};
