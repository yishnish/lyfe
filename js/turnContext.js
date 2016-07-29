function TurnContext(world, actor, actorLocation) {
    this.location = actorLocation;

    this.hasThingAt = function(delta) {
        var row = this.location.getRow() + delta.dy();
        var col = this.location.getColumn() + delta.dx();
        return world.thingAt(row, col) !== null;
    };

    this.canMoveTo = function(delta) {
        var row = this.location.getRow() + delta.dy();
        var col = this.location.getColumn() + delta.dx();
        return row >= 0 && col >= 0 && row < world.rows && col < world.columns && world.thingAt(row, col) === null;
    };

    this.coordinatesForDelta = function(delta) {
        return new Coordinates(this.location.getRow() + delta.dy(), this.location.getColumn() + delta.dx());
    };

    this.coordinatesForThing = function () {
        return this.location;
    };

    this.moveThing = function(delta){
        var newLocation = this.coordinatesForDelta(delta);
        world.move(this.location, newLocation);
        this.location = newLocation;
    };

    this.removeThing = function(){
        world.remove(this.location.getRow(), this.location.getColumn());
    }
}