function FruitBush(){
    Food.call(this, 'fruitBush');
}

FruitBush.prototype = Object.create(Food.prototype);
FruitBush.prototype.constructor = FruitBush;

FruitBush.prototype.doYourTurnThings = function () {
    this.vitality = Math.min(this.MAX_VITALITY, this.vitality + 1);
};