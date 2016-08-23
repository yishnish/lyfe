function WorldNodeFactory(colorMapping) {
    this.newNode = function(thing) {
        var worldNode = new WorldNode(colorMapping);
        worldNode.update(thing);
        return worldNode;
    };
}