function Vegetarian(){}

(function(){
    Vegetarian.prototype = Object.create(BaseBehavior.prototype);

    Vegetarian.prototype.eatIfPossible = function (turn) {
        var placesWithFood = this.findPlaces(turn, function (thing) {
            return thing instanceof Vegetable;
        });
        var placeToEatAt = this.pickRandomLocation(placesWithFood);
        if (placeToEatAt) {
            turn.doThisToThatThere(this.eat, placeToEatAt);
            return true;
        }
        return false;
    };

    Vegetarian.prototype.maybePoopAPlant = function(turn) {
        if(shouldPoopAPlant()) {
            var placeToPoop = this.pickRandomLocation(this.findAdjacentEmptySpaces(turn));
            if(placeToPoop) {
                turn.addThing(new FruitBush(), placeToPoop);
            }
        }
    };

    function shouldPoopAPlant(){
        return Math.floor(Math.random() * 50) === 0;
    }
})();
