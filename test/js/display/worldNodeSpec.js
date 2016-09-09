describe('WorldNode', function () {
    describe('wraps the DOM node for an item in the world', function () {
        describe("setting attributes", function () {
            var colorMapping;
            beforeAll(function(){
                colorMapping = ColorMapping();
            });
            it('should use a color mapping to set color attribute when initialized', function () {
                var cow = new Cow();
                var wolf = new Wolf();
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var cowNode = nodeFactory.newNode(cow);
                var wolfNode = nodeFactory.newNode(wolf);
                expect(cowNode.color()).toBe(colorMapping.colorFor(cow));
                expect(wolfNode.color()).toBe(colorMapping.colorFor(wolf));
            });

            it('should setContents color when contents change', function () {
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var cow = new Cow();
                var node = nodeFactory.newNode(cow);
                expect(node.color()).toBe(colorMapping.colorFor(cow));
                var wolf = new Wolf();
                node.setContents(wolf);
                expect(node.color()).toBe(colorMapping.colorFor(wolf));
            });

            it('should highlight a cell when right clicked', function () {
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var node = nodeFactory.newNode(new Cow());
                expect(node.getTableCell().classList).not.toContain('temp-highlight');
                var rightClick = new MouseEvent('mousedown', {button : 2});
                node.getTableCell().dispatchEvent(rightClick);
                expect(node.getTableCell().classList).toContain('temp-highlight');
            });

            it('should highlight a cell when a tagged thing is added', function () {
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var cow = new Cow();
                cow.tag();
                var node = nodeFactory.newNode(cow);
                expect(node.getTableCell().classList).toContain('tagged');
            });

            it('should clear highlight from a cell when a tagged thing is replaced by a not tagged thing', function () {
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var cow = new Cow();
                cow.tag();
                var node = nodeFactory.newNode(cow);
                expect(node.getTableCell().classList).toContain('tagged');
                node.setContents(new Cow());
                expect(node.getTableCell().classList).not.toContain('tagged');
            });

            it('should clear highlight from a cell when a tagged thing is removed', function () {
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var cow = new Cow();
                cow.tag();
                var node = nodeFactory.newNode(cow);
                expect(node.getTableCell().classList).toContain('tagged');
                node.setContents(null);
                expect(node.getTableCell().classList).not.toContain('tagged');
            });

            it('should clear highlights for a cell when the contents change', function () {
                var nodeFactory = new WorldNodeFactory(colorMapping);
                var node = nodeFactory.newNode(new Cow());
                expect(node.getTableCell().classList).not.toContain('temp-highlight');
                var rightClick = new MouseEvent('mousedown', {button : 2});
                node.getTableCell().dispatchEvent(rightClick);
                expect(node.getTableCell().classList).toContain('temp-highlight');
                node.setContents(new Cow());
                expect(node.getTableCell().classList).not.toContain('temp-highlight');
            });
        });
    });
});
