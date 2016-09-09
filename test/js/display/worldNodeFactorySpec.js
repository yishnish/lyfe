describe("world node factories", function () {
    it('should create world nodes with color set to the correct color mapping value for the thing it was created with', function () {
        var colorMapping = ColorMapping();
        var worldNodeFactory = new WorldNodeFactory(colorMapping);
        var cow = new Cow(), wolf = new Wolf();
        expect(worldNodeFactory.newNode(cow).color()).toBe(colorMapping.colorFor(cow));
        expect(worldNodeFactory.newNode(wolf).color()).toBe(colorMapping.colorFor(wolf));
        expect(worldNodeFactory.newNode(null).color()).toBe(colorMapping.colorFor(null));
    });
});