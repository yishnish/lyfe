function Cow() {
    Thing.call(this, 'cow');
}

(function () {
    Cow.prototype = Object.create(Thing.prototype);
    Cow.prototype.constructor = Cow;

    Cow.prototype.mixin(Birthing);
    Cow.prototype.mixin(Copulates);
    Cow.prototype.mixin(Vegetarian);
    Cow.prototype.mixin(Food);
    Cow.prototype.mixin(Moves);

    Cow.prototype.doYourTurnThings = function (turn) {
        var didEat, gaveBirth, didHump;
        if (this.pregnant) {
            gaveBirth = this.giveBirth(turn);
        }
        if(!gaveBirth && this.vitality > 0){
            didHump = this.tryHumping(turn);
        }
        if (!gaveBirth && !didHump && this.vitality < this.MAX_VITALITY) {
            didEat = this.eatIfPossible(turn);
        }
        if (!gaveBirth && !didHump && !didEat ) {
            this.moveIfPossible.call(this, turn);
        }
        this.maybePoopAPlant(turn);
    };

    Cow.prototype.eat = function (food) {
        this.vitality += 2;
        food.getEaten();
    };

    Cow.prototype.newInstance = function () {
        return new Cow();
    };
})();