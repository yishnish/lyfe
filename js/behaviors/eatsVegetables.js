function EatsVegetables(){
}

(function(){
    EatsVegetables.prototype = Object.create(BaseBehavior.prototype);

    EatsVegetables.prototype.act = function(turn){
        this.maybePoopAPlant(turn);
        if(turn.actor.vitality < turn.actor.MAX_VITALITY){
            var placesWithFood = this.findPlaces(turn, function(thing){
                return thing instanceof Vegetable;
            });
            var placeToEatAt = this.pickRandomLocation(placesWithFood);
            if(placeToEatAt){
                turn.doThisToThatThere(turn.actor.eat, placeToEatAt);
                return true;
            } else return false;
        } else return false;
    };

    EatsVegetables.prototype.maybePoopAPlant = function(turn){
        if(shouldPoopAPlant()){
            var placeToPoop = this.pickRandomLocation(this.findAdjacentEmptySpaces(turn));
            if(placeToPoop){
                turn.addThing(new FruitBush(), placeToPoop);
            }
        }
    };

    function shouldPoopAPlant(){
        return Math.floor(Math.random() * 50) === 0;
    }
})();
