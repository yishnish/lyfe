describe('Visualizers', function () {

    describe('building a visualization', function () {
        describe("from a data array", function () {
            describe("validations", function () {
                it('should fail when there is no color mapping', function () {
                    expect(function () {
                        new Visualizer(new World([[new Thing('vole'), new Thing('bird')]]), null);
                    }).toThrowError("You need a non-empty color mapping");
                });
            });
            it('should create a DOM table with the same number of rows and columns as the data', function () {
                var viz = new Visualizer(new World([[new Thing("vole")]]), ColorMapping);
                var table = new TableAccessor(viz.getDisplayHtml());
                expect(table.rows()).toEqual(1);
                expect(table.columns()).toEqual(1);
            });
            it('should create a 2D array of worldNodes with the same number of rows and columns as the data', function () {
                var viz = new Visualizer(new World([[new Thing("vole")]]), ColorMapping);
                expect(viz.getDataNodes().length).toEqual(1);
                expect(viz.getDataNodes()[0].length).toEqual(1);
            });
            describe('color mapping', function () {
                it('should have table elements colored according to their matching type', function () {
                    var viz = new Visualizer(new World([[new Thing("vole"), new Thing("bird")]]), ColorMapping);
                    expect(viz.thingAt(0, 0).color()).toBe("brown");
                    expect(viz.thingAt(0, 1).color()).toBe("blue");
                });
            });
        });
    });
    describe("updating a display", function () {
        it('should update the display nodes when the backing world changes', function () {
            var dataGrid = [
                [new Thing("vole"), new Thing("bird")],
                [new Thing("bird"), new Thing("vole")]
            ];
            var world = new World(dataGrid);
            var viz = new Visualizer(world, ColorMapping);
            expect(viz.thingAt(0, 0).color()).toBe("brown");
            expect(viz.thingAt(0, 1).color()).toBe("blue");
            expect(viz.thingAt(1, 0).color()).toBe("blue");
            expect(viz.thingAt(1, 1).color()).toBe("brown");
            world.getGrid()[0][0].iAmA = "bird";
            world.getGrid()[0][1].iAmA = "vole";
            world.getGrid()[1][0].iAmA = "vole";
            world.getGrid()[1][1].iAmA = "bird";
            world.turn();
            expect(viz.thingAt(0, 0).color()).toBe("blue");
            expect(viz.thingAt(0, 1).color()).toBe("brown");
            expect(viz.thingAt(1, 0).color()).toBe("brown");
            expect(viz.thingAt(1, 1).color()).toBe("blue");
        });

        it('should update the display HTML when the backing world changes', function () {
            var dataGrid = [
                [new Thing("vole"), new Thing("bird")],
                [new Thing("bird"), new Thing("vole")]
            ];
            var world = new World(dataGrid);
            var viz = new Visualizer(world, ColorMapping);
            var table = new TableAccessor(viz.getDisplayHtml());
            expect(table.cellColorAt(0, 0)).toBe("brown");
            expect(table.cellColorAt(0, 1)).toBe("blue");
            expect(table.cellColorAt(1, 0)).toBe("blue");
            expect(table.cellColorAt(1, 1)).toBe("brown");
            world.getGrid()[0][0].iAmA = "bird";
            world.getGrid()[0][1].iAmA = "vole";
            world.getGrid()[1][0].iAmA = "vole";
            world.getGrid()[1][1].iAmA = "bird";
            world.turn();
            expect(table.cellColorAt(0, 0)).toBe("blue");
            expect(table.cellColorAt(0, 1)).toBe("brown");
            expect(table.cellColorAt(1, 0)).toBe("brown");
            expect(table.cellColorAt(1, 1)).toBe("blue");
        });
    });
});
