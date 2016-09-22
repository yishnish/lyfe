function Carnivore(){
}

Carnivore.prototype = Object.create(BaseBehavior.prototype);

Carnivore.prototype.eatIfPossible = function(turn){
    var placesWithFood = this.findPlaces(turn, function(thing){
        return thing instanceof Animal && thing.getClazz() !== this.getClazz();
    });
    var placeToEatAt = this.pickRandomLocation(placesWithFood);
    if(placeToEatAt){
        turn.doThisToThatThere(this.eat, placeToEatAt);
        return true;
    }
    return false;
};
