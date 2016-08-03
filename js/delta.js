function Delta(dy, dx) {
    this._dy = dy;
    this._dx = dx;
}

Delta.prototype.dy = function () {
    return this._dy;
};

Delta.prototype.dx = function () {
    return this._dx;
};