function PolarBear(){
    Animal.call(this, PolarBear);
}

(function(){
    PolarBear.prototype = Object.create(Animal.prototype);
    PolarBear.prototype.constructor = PolarBear;
    PolarBear.prototype.behaviors = [];

    PolarBear.prototype.mixin(Copulates);
    PolarBear.prototype.mixin(Birthing);
    PolarBear.prototype.mixin(Cannibal);
    PolarBear.prototype.mixin(Food);
    PolarBear.prototype.mixin(Moves);

    PolarBear.prototype.doYourTurnThings = function (turn) {
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

    PolarBear.prototype.eat = function (food) {
        this.vitality += 20;
        food.getEaten();
    };
})();