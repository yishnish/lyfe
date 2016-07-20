describe('Visualizers', function () {
    var colorMapping = {"vole": "brown", "bird": "blue"};

    describe('building a visualization', function () {
        describe("from a data array", function () {
            describe("validations", function () {
                it('should fail when there is no data', function () {
                    expect(function () {
                        new Visualizer([], colorMapping)
                    }).toThrowError("Can't create a visualization from empty data");
                });
                it("should fail when the data isn't rectangular", function () {
                    expect(function () {
                        new Visualizer(
                            [
                                [{iAmA: "vole"}, {iAmA: "vole"}],
                                [{iAmA: "vole"}]
                            ]
                            , colorMapping)
                    }).toThrowError("Non rectangular world");
                });
                it('should fail when there is no color mapping', function () {
                    expect(function () {
                        new Visualizer([[{iAmA: "vole"}, {iAmA: "bird"}]], null)
                    }).toThrowError("You need a non-empty color mapping");
                });
            });
            it('should create a DOM table with the same number of rows and columns as the data', function () {
                var viz = new Visualizer([[{iAmA: "vole"}]], colorMapping);
                expect(viz.getDisplay().rows).toEqual(1);
                expect(viz.getDisplay().columns).toEqual(1);
            });
            describe('color mapping', function () {
                it('table elements should be colored according to their matching type', function () {
                    var viz = new Visualizer([[{iAmA: "vole"}, {iAmA: "bird"}]], colorMapping);
                    expect(viz.thingAt(0, 0).color()).toBe("brown");
                    expect(viz.thingAt(0, 1).color()).toBe("blue");
                });
            });
        });
    });
    describe("updating a display", function () {

    });
});
