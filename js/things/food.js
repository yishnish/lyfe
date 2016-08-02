function Food(type){
    Thing.call(this, type);

    this.getEaten = function () {
        this.hp--;
        if (this.hp <= 0) {
            this.die(null);
        }
    };

    this.die = function (turnContext) {
        this.dead = true;
    };

}

Food.prototype = Object.create(Thing.prototype);
Food.prototype.constructor = Food;