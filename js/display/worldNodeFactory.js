function WorldNodeFactory(colorMapping) {
    this.newNode = function(thing) {
        return new WorldNode(colorMapping, thing);
    };
}