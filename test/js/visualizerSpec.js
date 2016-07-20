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
                var table = new TableAccessor(viz.getDisplayHtml());
                expect(table.rows()).toEqual(1);
                expect(table.columns()).toEqual(1);
            });
            it('should create a 2D array of worldNodes with the same number of rows and columns as the data', function () {
                var viz = new Visualizer([[{iAmA: "vole"}]], colorMapping);
                expect(viz.getDataNodes().length).toEqual(1);
                expect(viz.getDataNodes()[0].length).toEqual(1);
            });
            describe('color mapping', function () {
                it('should have table elements colored according to their matching type', function () {
                    var viz = new Visualizer([[{iAmA: "vole"}, {iAmA: "bird"}]], colorMapping);
                    expect(viz.thingAt(0, 0).color()).toBe("brown");
                    expect(viz.thingAt(0, 1).color()).toBe("blue");
                });
            });
        });
    });
    describe("updating a display", function () {
        xit('should update the display when the backing world changes', function () {
            expect(true).toBeFalsy();
        });
    });
});
