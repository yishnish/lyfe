function FruitBush(){
    Thing.call(this, FruitBush);
}

(function(){
    FruitBush.prototype = Object.create(Thing.prototype);
    FruitBush.prototype.constructor = FruitBush;

    FruitBush.prototype.mixin(Food);

    FruitBush.prototype.doYourTurnThings = function () {
        this.vitality = Math.min(this.MAX_VITALITY, this.vitality + 1);
    };
})();
