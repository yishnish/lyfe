function Carnivore(){}

(function(){
    Carnivore.prototype = Object.create(BaseBehavior.prototype);
    Carnivore.prototype.constructor = Birthing;

    Carnivore.prototype.eatIfPossible = function (turn) {
        var placesWithFood = this.findPlaces(turn, function (thing) {
            return thing instanceof Thing;
        });
        var placeToEatAt = this.pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turn.doThisToThatThere(this.eat, placeToEatAt);
            return true;
        }
        return false;
    };
})();
