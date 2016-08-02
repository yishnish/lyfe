function FruitBush(){
    Food.call(this, 'fruitBush');
}

FruitBush.prototype = Object.create(Food.prototype);
FruitBush.prototype.constructor = FruitBush;

FruitBush.prototype.takeTurn = function () {
    this.hp = Math.min(this.MAX_HP, this.hp + 1);
};