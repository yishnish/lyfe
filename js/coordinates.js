function Coordinates(row, col) {
    this._row = row;
    this._column = col;
}

Coordinates.prototype.getRow = function(){
    return this._row;
}

Coordinates.prototype.getColumn = function(){
    return this._column;
}