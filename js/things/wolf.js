function Wolf(){
    Thing.call(this, Wolf);
}

(function(){
    Wolf.prototype = Object.create(Thing.prototype);
    Wolf.prototype.constructor = Wolf.constructor;

    Wolf.prototype.mixin(Copulates);
    Wolf.prototype.mixin(Birthing);
    Wolf.prototype.mixin(Carnivore);
    Wolf.prototype.mixin(Food);
    Wolf.prototype.mixin(Moves);

    Wolf.prototype.doYourTurnThings = function (turn) {
        var didEat, gaveBirth, didHump;
        if (this.pregnant) {
            gaveBirth = this.giveBirth(turn);
        }
        if (!gaveBirth && this.vitality > 0) {
            didHump = this.tryHumping(turn);
        }
        if (!gaveBirth && !didHump && this.vitality < this.MAX_VITALITY) {
            didEat = this.eatIfPossible(turn);
        }
        if (!gaveBirth && !didHump && !didEat) {
            this.moveIfPossible.call(this, turn);
        }
    };

    Wolf.prototype.newInstance = function () {
        return new Wolf();
    };

    Wolf.prototype.eat = function (food) {
        this.vitality += 2;
        food.getEaten();
    };
})();