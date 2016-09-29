function CannibalDiet(){
}

CannibalDiet.prototype = Object.create(BaseBehavior.prototype);

CannibalDiet.prototype.act = function(turn){
    var placesWithFood = this.findPlaces(turn, function(thing){
        return thing && thing.getClazz() === turn.actor.getClazz();
    });
    var placeToEatAt = this.pickRandomLocation(placesWithFood);
    if(placeToEatAt){
        turn.doThisToThatThere(turn.actor.eat, placeToEatAt);
        return true;
    }
    return false;
};
