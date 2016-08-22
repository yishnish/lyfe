function FruitBush(){
    Vegetable.call(this, FruitBush);
}

(function(){
    FruitBush.prototype = Object.create(Vegetable.prototype);
    FruitBush.prototype.constructor = FruitBush;

    FruitBush.prototype.mixin(Food);

    FruitBush.prototype.doYourTurnThings = function () {
        this.vitality = Math.min(this.MAX_VITALITY, this.vitality + 10);
    };

    FruitBush.prototype.adjustHealthBasedOnVitality = function (turn) {
        if (this.vitality === 0) {
            this.hp = Math.max(0, this.hp - 10);
        } else if (this.vitality === this.MAX_VITALITY) {
            this.hp = Math.min(this.MAX_HP, this.hp + 5);
        }
        if (this.hp <= 0) {
            this.die(turn);
        }
    };
})();
