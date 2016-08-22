function TurnContext(world, actor, actorLocation) {
    this.world = world;
    this.actor = actor;
    this.location = actorLocation;
}

TurnContext.prototype.takeTurn = function () {
    if(this.actor.dead) {
        this.removeThing();
    }
    this.actor.takeTurn(this);
};
TurnContext.prototype.hasThingAt = function (delta) {
    var row = this.location.getRow() + delta.dy();
    var col = this.location.getColumn() + delta.dx();
    return this.world.thingAt(row, col) !== null;
};
TurnContext.prototype.hasMatchingThingAt = function (delta, criteria) {
    var row = this.location.getRow() + delta.dy();
    var col = this.location.getColumn() + delta.dx();
    if(row >= 0 && row < this.world.rows && col >= 0 && col < this.world.columns) {
        var thingAt = this.world.thingAt(row, col);
        return criteria(thingAt);
    }
    return false;
};
TurnContext.prototype.canMoveTo = function (delta) {
    return this.isOnMap(delta) && !this.hasThingAt(delta);
};
TurnContext.prototype.isOnMap = function (delta) {
    var row = this.location.getRow() + delta.dy();
    var col = this.location.getColumn() + delta.dx();
    return row >= 0 && col >= 0 && row < this.world.rows && col < this.world.columns;
};
TurnContext.prototype.coordinatesForDelta = function (delta) {
    return new Coordinates(this.location.getRow() + delta.dy(), this.location.getColumn() + delta.dx());
};
TurnContext.prototype.coordinatesForThing = function () {
    return this.location;
};
TurnContext.prototype.moveThing = function (delta) {
    var newLocation = this.coordinatesForDelta(delta);
    this.world.move(this.location, newLocation);
    this.location = newLocation;
};
TurnContext.prototype.removeThing = function () {
    this.world.remove(this.location.getRow(), this.location.getColumn());
};
TurnContext.prototype.addThing = function (thing, delta) {
    this.world.add(thing, this.coordinatesForDelta(delta));
};
TurnContext.prototype.doThisToThatThere = function (fun, delta) {
    var thatLocation = this.coordinatesForDelta(delta);
    var thing = this.world.thingAt(thatLocation.getRow(), thatLocation.getColumn());
    fun.call(this.actor, thing);
};
