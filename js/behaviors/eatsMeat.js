function EatsMeat(){
}

EatsMeat.prototype = Object.create(BaseAction.prototype);

EatsMeat.prototype.act = function(turn){
    var actor = turn.actor;
    if(actor.vitality < actor.MAX_VITALITY){
        var placesWithFood = this.findPlaces(turn, function(thing){
            return thing instanceof Animal && thing.getClazz() !== turn.actor.getClazz();
        });
        var placeToEatAt = this.pickRandomLocation(placesWithFood);
        if(placeToEatAt){
            turn.doThisToThatThere(turn.actor.eat, placeToEatAt);
            return true;
        } else return false;
    } else return false;
};
