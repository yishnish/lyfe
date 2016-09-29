function Civet(){
    Animal.call(this, Civet);
}

(function(){
    Civet.prototype = Object.create(Animal.prototype);
    Civet.prototype.constructor = Civet;
    Civet.prototype.behaviors = [];

    Civet.prototype.addBehavior((new Behavior('birthing')).addAction(new GivesBirth()));
    Civet.prototype.addBehavior((new Behavior('copulates')).addAction(new HasSex()));
    Civet.prototype.mixin(Omnivore);
    Civet.prototype.mixin(Food);
    Civet.prototype.mixin(Moves);

    Civet.prototype.doYourTurnThings = function (turn) {
        var didEat, gaveBirth, didHump;
        if (this.vitality < this.MAX_VITALITY) {
            didEat = this.eatIfPossible(turn);
        }
        if (!gaveBirth && !didHump && !didEat) {
            this.moveIfPossible.call(this, turn);
        }
    };
})();