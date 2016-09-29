function EatsEverything(){
}

EatsEverything.prototype = Object.create(BaseBehavior.prototype);

EatsEverything.prototype.act = function(turn){
    var actor = turn.actor;
    if(actor.vitality < actor.MAX_VITALITY){
        var placesWithFood = this.findPlaces(turn, function(thing){
            return thing && thing.getClazz() !== turn.actor.getClazz();
        });
        var placeToEatAt = this.pickRandomLocation(placesWithFood);
        if(placeToEatAt){
            turn.doThisToThatThere(actor.eat, placeToEatAt);
            return true;
        } else return false;
    } else return false;
};
