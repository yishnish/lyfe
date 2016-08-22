function Cannibal(){}

(function(){
    Cannibal.prototype = Object.create(BaseBehavior.prototype);
    Cannibal.prototype.constructor = Cannibal;

    Cannibal.prototype.eatIfPossible = function (turn) {
        var placesWithFood = this.findPlaces(turn, function (thing) {
            return thing && thing.getType() === this.getType();
        });
        var placeToEatAt = this.pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turn.doThisToThatThere(this.eat, placeToEatAt);
            return true;
        }
        return false;
    };
})();