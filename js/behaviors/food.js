function Food(type) { }

(function () {
    Food.prototype = Object.create(BaseBehavior.prototype);
    Food.prototype.constructor = Food;

    Food.prototype.getEaten = function () {
        this.hp -= 10;
        if (this.hp <= 0) {
            this.die(null);
        }
    };
})();