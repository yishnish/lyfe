describe('WorldNode', function () {
    describe('wraps the DOM node for an item in the world', function(){
        describe('accessing attributes', function(){
            var node;
            beforeEach(function () {
                node = new WorldNode();
                node.setColor("blue");
            });
            it('should provide the color of a node', function () {
                expect(node.color()).toEqual("blue");
            });
            it('should update the color of a node', function () {
                node.setColor("green");
                expect(node.color()).toEqual("green");
            });
        })
    })
});
