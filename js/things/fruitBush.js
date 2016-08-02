function FruitBush(){
    Food.call(this, 'fruitBush');

    this.takeTurn = function () {
        this.hp = Math.min(this.MAX_VITALITY, this.hp + 1);
    };
}

FruitBush.prototype = Object.create(Food.prototype);
FruitBush.prototype.constructor = FruitBush;