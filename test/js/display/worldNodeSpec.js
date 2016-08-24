describe('WorldNode', function () {
    describe('wraps the DOM node for an item in the world', function () {
        describe("setting attributes", function () {
            it('should use a color mapping to set color attribute when initialized', function () {
                var colorMapping = {Cow: 'black', Wolf : 'yellow'};
                var cow = new Cow();
                var wolf = new Wolf();
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var cowNode = nodeFactory.newNode(cow);
                var wolfNode = nodeFactory.newNode(wolf);
                expect(cowNode.color()).toBe(colorMapping.Cow);
                expect(wolfNode.color()).toBe(colorMapping.Wolf);
            });

            it('should setContents color when contents change', function () {
                var colorMapping = {Cow: 'black', Wolf : 'yellow'};
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var node = nodeFactory.newNode(new Cow());
                expect(node.color()).toBe(colorMapping.Cow);
                node.setContents(new Wolf());
                expect(node.color()).toBe(colorMapping.Wolf);
            });
        });
    });
});
