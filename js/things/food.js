function Food(type){
    Thing.call(this, type);
}

Food.prototype = Object.create(Thing.prototype);
Food.prototype.constructor = Food;

Food.prototype.getEaten = function () {
    this.hp--;
    if (this.hp <= 0) {
        this.die(null);
    }
};
