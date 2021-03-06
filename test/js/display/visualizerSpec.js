describe('Visualizers', function () {
    describe('building a visualization', function () {
        describe("from a data array", function () {
            it('should create a DOM table with the same number of rows and columns as the data', function () {
                var viz = new Visualizer(new World([[new Cow()]]), ColorMapping());
                var table = new TableAccessor(viz.getDisplay());
                expect(table.rows()).toEqual(1);
                expect(table.columns()).toEqual(1);
            });
            it('should create a 2D array of worldNodes with the same number of rows and columns as the data', function () {
                var viz = new Visualizer(new World([[new Cow()]]), ColorMapping());
                var tableAccessor = new TableAccessor(viz.getDisplay());
                expect(tableAccessor.rows()).toEqual(1);
                expect(tableAccessor.columns()).toEqual(1);
            });
            describe('color mapping', function () {
                it('should have table elements colored according to their matching type', function () {
                    var viz = new Visualizer(new World([[new Cow(), new Wolf(), null]]), ColorMapping());
                    expect(viz.thingAt(0, 0).color()).toBe("brown");
                    expect(viz.thingAt(0, 1).color()).toBe("blue");
                    expect(viz.thingAt(0, 2).color()).toBe('white');
                });
            });
        });
    });
    describe("updating a display", function () {
        var cow, wolf, cowColor, wolfColor;
        beforeEach(function () {
            cow = new Cow();
            wolf = new Wolf();
            cowColor = ColorMapping().colorFor(cow);
            wolfColor = ColorMapping().colorFor(wolf);
        });
        it('should setContents the display nodes when the backing world changes', function () {
            var dataGrid = [
                [cow]
            ];
            var world = new World(dataGrid);
            var viz = new Visualizer(world, ColorMapping());
            expect(viz.thingAt(0, 0).color()).toBe(cowColor);
            world.remove(0, 0);
            world.add(wolf, new Coordinates(0, 0));
            world.turn();
            expect(viz.thingAt(0, 0).color()).toBe(wolfColor);
        });

        it('should setContents the display HTML when the backing world changes', function () {
            expect(cowColor).not.toEqual(wolfColor);
            var world = new World([
                [cow]
            ]);
            var viz = new Visualizer(world, ColorMapping());
            var table = new TableAccessor(viz.getDisplay());

            expect(table.cellColorAt(0, 0)).toBe(cowColor);
            world.remove(0, 0);
            world.add(wolf, new Coordinates(0, 0));
            world.turn();
            expect(table.cellColorAt(0, 0)).toBe(wolfColor);
        });

        it('should not remove a tagged status from a tagged thing when it moves to a new location', function(){
            var cow = new Cow();
            cow.tag();
            var world = new World([
                [cow, null]
            ]);
            var viz = new Visualizer(world, ColorMapping());
            var table = new TableAccessor(viz.getDisplay());
            world.turn();
            expect(table.classes(0, 1)).toMatch("tagged");
            expect(cow.isTagged()).toBe(true);
        });
    });
});
