function TurnContext(world, actor, actorLocation) {

    this.getActorLocation = function () {
        return actorLocation;
    };

    this.hasThingAt = function(delta) {
        var row = actorLocation.getRow() + delta.dy();
        var col = actorLocation.getColumn() + delta.dx();
        return world.thingAt(row, col) !== null;
    };

    this.canMoveTo = function(delta) {
        var row = actorLocation.getRow() + delta.dy();
        var col = actorLocation.getColumn() + delta.dx();
        return row >= 0 && col >= 0 && row < world.rows && col < world.columns && world.thingAt(row, col) === null;
    };

    this.moveThing = function(delta){
        world.move(actorLocation, this.coordinatesForDelta(delta));
    };

    this.coordinatesForDelta = function(delta) {
        return new Coordinates(actorLocation.getRow() + delta.dy(), actorLocation.getColumn() + delta.dx());
    };
}