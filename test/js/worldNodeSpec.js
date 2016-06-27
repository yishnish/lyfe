describe('WorldNode', function () {
    describe('wraps the DOM node for an item in the world', function(){
        describe('accessing attributes', function(){
            var node;
            beforeEach(function () {
                node = document.createElement("td");
                node.setAttribute("color", "blue");
            });
            it('should provide the color of a node', function () {
                expect(new WorldNode(node).color()).toEqual("blue");
            });
            xit('should update the color of a node', function () {
                expect(true).toBeFalsy();
            });
        })
    })
});