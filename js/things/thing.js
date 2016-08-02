function Thing(type) {
    this.MAX_VITALITY = 10;
    this.MAX_HP = 10;
    this.iAmA = type;
    this.hp = 10;
    this.vitality = 10;
    this.dead = false;
}

Thing.prototype.die = function (turnContext) {
    this.dead = true;
};

Thing.prototype.adjustHealthBasedOnVitality = function (turnContext) {
    if (this.vitality === 0) {
        this.hp = Math.max(0, this.hp - 1);
    }else if(this.vitality === this.MAX_VITALITY) {
        this.hp = Math.min(this.MAX_HP, this.hp + 1);
    }
    if (this.hp <= 0) {
        this.die(turnContext);
    }
};

Thing.prototype.takeTurn = function (turnContext) {
    if(this.dead) {
        turnContext.removeThing();
    }else {
        this.adjustHealthBasedOnVitality(turnContext);
    }
};
