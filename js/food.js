function Food(){
    Thing.call(this, 'food');

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