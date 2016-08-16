describe('Visualizers', function () {

    describe('building a visualization', function () {
        describe("from a data array", function () {
            describe("validations", function () {
                it('should fail when there is no color mapping', function () {
                    expect(function () {
                        new Visualizer(new World([[new Cow('vole'), new Cow('bird')]]), null);
                    }).toThrowError("You need a non-empty color mapping");
                });
            });
            it('should create a DOM table with the same number of rows and columns as the data', function () {
                var viz = new Visualizer(new World([[new Cow("vole")]]), ColorMapping);
                var table = new TableAccessor(viz.getDisplayHtml());
                expect(table.rows()).toEqual(1);
                expect(table.columns()).toEqual(1);
            });
            it('should create a 2D array of worldNodes with the same number of rows and columns as the data', function () {
                var viz = new Visualizer(new World([[new Cow("vole")]]), ColorMapping);
                var tableAccessor = new TableAccessor(viz.getDisplayHtml());
                expect(tableAccessor.rows()).toEqual(1);
                expect(tableAccessor.columns()).toEqual(1);
            });
            describe('color mapping', function () {
                it('should have table elements colored according to their matching type', function () {
                    var viz = new Visualizer(new World([[new Cow("vole"), new Cow("bird")]]), ColorMapping);
                    expect(viz.thingAt(0, 0).color()).toBe("brown");
                    expect(viz.thingAt(0, 1).color()).toBe("blue");
                });
            });
        });
    });
    describe("updating a display", function () {
        var vole, bird, voleColor, birdColor;
        beforeEach(function () {
            vole = new Cow("vole");
            bird = new Cow('bird');
            voleColor = ColorMapping[vole.getIamA()];
            birdColor = ColorMapping[bird.getIamA()];
        });
        it('should update the display nodes when the backing world changes', function () {
            var dataGrid = [
                [vole]
            ];
            var world = new World(dataGrid);
            var viz = new Visualizer(world, ColorMapping);
            expect(viz.thingAt(0, 0).color()).toBe(voleColor);
            world.remove(0, 0);
            world.add(bird, new Coordinates(0, 0));
            world.turn();
            expect(viz.thingAt(0, 0).color()).toBe(birdColor);
        });

        it('should update the display HTML when the backing world changes', function () {
            expect(voleColor).not.toEqual(birdColor);
            var dataGrid = [
                [vole]
            ];
            var world = new World(dataGrid);
            var viz = new Visualizer(world, ColorMapping);
            var table = new TableAccessor(viz.getDisplayHtml());

            expect(table.cellColorAt(0, 0)).toBe(voleColor);
            world.remove(0, 0);
            world.add(bird, new Coordinates(0, 0));
            world.turn();
            expect(table.cellColorAt(0, 0)).toBe(birdColor);
        });
    });
});
