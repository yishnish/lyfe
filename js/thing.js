function Thing(type) {
    this.iAmA = type;
    this.canMoveTo = function (coords, world){
        var row = coords.row, col = coords.col;
        return row >= 0 && col >= 0 && !world.thingAt(row, col);
    }

}