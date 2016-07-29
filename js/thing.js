function Thing(type) {
    this.iAmA = type;
    this.hp = 10;
    this.vitality = 10;

    this.canMoveTo = function (coords, world) {
        var row = coords.getRow(), col = coords.getColumn();
        return row >= 0 && col >= 0 && row < world.rows && col < world.columns && !world.thingAt(row, col);
    };

    this.takeTurn = function (turnContext) {
        this.adjustHealthBasedOnVitality(turnContext);
    };

    this.die = function (turnContext) {
        turnContext.removeThing();
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
