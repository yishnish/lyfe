function Thing(type) {
    this.MAX_VITALITY = 10;
    this.MAX_HP = 10;
    this.iAmA = type;
    this.hp = 10;
    this.vitality = 10;
    this.dead = false;
}

Thing.prototype.takeTurn = function (turnContext) {
    this.doYourTurnThings(turnContext);
    adjustHealthBasedOnVitality.call(this, turnContext);
    decrementVitality.call(this);
};

Thing.prototype.die = function (turnContext) {
    this.dead = true;
};

Thing.prototype.doYourTurnThings = function (turn) { };

function adjustHealthBasedOnVitality(turn) {
    if (this.vitality === 0) {
        this.hp = Math.max(0, this.hp - 1);
    } else if (this.vitality === this.MAX_VITALITY) {
        this.hp = Math.min(this.MAX_HP, this.hp + 1);
    }
    if (this.hp <= 0) {
        this.die(turn);
    }
}

function decrementVitality() {
    this.vitality = Math.max(--this.vitality, 0);
}