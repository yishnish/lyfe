describe("world node factories", function () {
    it('should create world nodes with color set to the correct color mapping value for the thing it was created with', function () {
        var colorMapping = {Cow: 'brown', Wolf: 'red', empty : 'white'};
        var worldNodeFactory = new WorldNodeFactory(colorMapping);
        expect(worldNodeFactory.newNode(new Cow()).color()).toBe(colorMapping.Cow);
        expect(worldNodeFactory.newNode(new Wolf()).color()).toBe(colorMapping.Wolf);
        expect(worldNodeFactory.newNode(null).color()).toBe(colorMapping.empty);
    });
});