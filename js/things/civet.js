function Civet(){
    Animal.call(this, Civet);
}

(function(){
    Civet.prototype = Object.create(Animal.prototype);
    Civet.prototype.constructor = Civet;

    Civet.prototype.mixin(Copulates);
    Civet.prototype.mixin(Birthing);
    Civet.prototype.mixin(Omnivore);
    Civet.prototype.mixin(Food);
    Civet.prototype.mixin(Moves);

    Civet.prototype.doYourTurnThings = function (turn) {
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

    Civet.prototype.newInstance = function () {
        return new Civet();
    };

    Civet.prototype.eat = function (food) {
        this.vitality += 20;
        food.getEaten();
    };
})();