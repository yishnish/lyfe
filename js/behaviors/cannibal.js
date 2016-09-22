function Cannibal(){
}

Cannibal.prototype = Object.create(BaseBehavior.prototype);

Cannibal.prototype.eatIfPossible = function(turn){
    var placesWithFood = this.findPlaces(turn, function(thing){
        return thing && thing.getClazz() === this.getClazz();
    });
    var placeToEatAt = this.pickRandomLocation(placesWithFood);
    if(placeToEatAt){
        turn.doThisToThatThere(this.eat, placeToEatAt);
        return true;
    }
    return false;
};
