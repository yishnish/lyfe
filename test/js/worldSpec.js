describe("A World", function () {
    var dataGrid, world;
    beforeEach(function () {
        dataGrid = [[{iAmA: "vole"}]];
        world = new World(dataGrid);
    });
    it("contains data", function () {
        expect(world.getGrid()).toEqual(dataGrid);
    });
    describe("validations", function () {
        it('should fail when there is no data', function () {
            expect(function () {
                new World()
            }).toThrowError("Can't create a world from empty data");
        });
        it('should fail when there is empty data', function () {
            expect(function () {
                new World([])
            }).toThrowError("Can't create a world from empty data");
        });
        it("should fail when the data isn't rectangular", function () {
            expect(function () {
                new World(
                        [
                            [{iAmA: "vole"}, {iAmA: "vole"}],
                            [{iAmA: "vole"}]
                        ])
            }).toThrowError("Can't create a non-rectangular world");
        });
    });
    describe('callbacks', function () {
        var thing;
        beforeEach(function () {
            thing = {value: null, otherValue : null};
        });

        it('performs a callback on a registered object', function () {
            world.onChange(thing, function () {
                this.value = 69;
                this.otherValue = 2;
            });
            world.turn();
            expect(thing.value).toEqual(69);
        });
        it('performs multiple callbacks on a registered listener', function () {
            world.onChange(thing, function () {
                this.value = 69
            });
            world.onChange(thing, function () {
                this.otherValue = 42;
            });
            world.turn();
            expect(thing.value).toEqual(69);
            expect(thing.otherValue).toEqual(42);
        });
        it('performs callbacks on multiple listeners', function () {
            var otherThing = {value : null}
            world.onChange(thing, function () {
                this.value = 69
            });
            world.onChange(otherThing, function () {
                this.value = 42;
            });
            world.turn();
            expect(thing.value).toEqual(69);
            expect(otherThing.value).toEqual(42);
        });
    });
});