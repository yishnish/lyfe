function Thing(type) {
    this.MAX_VITALITY = 10;
    this.iAmA = type;
    this.hp = 10;
    this.vitality = 10;
    this.dead = false;

    this.takeTurn = function (turnContext) {
        if(this.dead) {
            turnContext.removeThing();
        }else {
            this.adjustHealthBasedOnVitality(turnContext);
        }
    };

    this.die = function (turnContext) {
        this.dead = true;
    };

    this.adjustHealthBasedOnVitality = function (turnContext) {
        if (this.vitality === 0) {
            this.hp = Math.max(--this.hp, 0);
        }
        if (this.hp <= 0) {
            this.die(turnContext);
        }
    };
}
