function WorldNodeFactory(colorMapping) {
    this.newNode = function(thing) {
        var worldNode = new WorldNode(colorMapping);
        worldNode.setContents(thing);
        return worldNode;
    };
}