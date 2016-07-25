describe("A World", function () {
    var dataGrid, world;
    beforeEach(function () {
        dataGrid = [[new Thing("vole")]];
        world = new World(dataGrid);
    });
    it("contains data", function () {
        expect(world.getGrid()).toEqual(dataGrid);
    });
    describe("validations", function () {
        it('should fail when there is no data', function () {
            expect(function () {
                new World();
            }).toThrowError("Can't create a world from empty data");
        });
        it('should fail when there is empty data', function () {
            expect(function () {
                new World([]);
            }).toThrowError("Can't create a world from empty data");
        });
        it("should fail when the data isn't rectangular", function () {
            expect(function () {
                new World(
                    [
                        [new Thing("vole"), new Thing("vole")],
                        [new Thing("vole")]
                    ]);
            }).toThrowError("Can't create a non-rectangular world");
        });
    });
    describe('callbacks', function () {
        var thing;
        beforeEach(function () {
            thing = {value: null, otherValue: null};
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
                this.value = 69;
            });
            world.onChange(thing, function () {
                this.otherValue = 42;
            });
            world.turn();
            expect(thing.value).toEqual(69);
            expect(thing.otherValue).toEqual(42);
        });
        it('performs callbacks on multiple listeners', function () {
            var otherThing = {value: null};
            world.onChange(thing, function () {
                this.value = 69;
            });
            world.onChange(otherThing, function () {
                this.value = 42;
            });
            world.turn();
            expect(thing.value).toEqual(69);
            expect(otherThing.value).toEqual(42);
        });
    });
    describe("Contents", function () {
        it('should tell you what is at a location', function () {
            var world = new World(
                [
                    [new Thing("vole"), new Thing("vole")],
                    [new Thing("vole"), undefined]
                ]);
            expect(world.thingAt(0, 0).iAmA).toBe('vole');
            expect(world.thingAt(1, 1)).not.toBeDefined();
        });
        describe("activating Things that live in it", function () {
            it('should notifiy Things when they can move', function () {
                var thing = new Thing("vole");
                var world = new World(
                    [
                        [thing, undefined],
                        [undefined, undefined]
                    ]);
                spyOn(thing, 'takeTurn').and.callThrough();
                world.turn();

                expect(thing.takeTurn).toHaveBeenCalledWith(world, {row: 0, col: 0});
            });
        });
        describe("moving contents", function () {
            it('should move a Thing to another requested location', function () {
                var thing1 = new Thing("vole");
                var thing2 = new Thing("vole");
                var thing3 = new Thing("vole");
                var world = new World(
                    [
                        [thing1, thing2],
                        [thing3, undefined]
                    ]);
                world.move({row: 0, col: 0}, {row: 1, col: 1});
                expect(world.thingAt(0, 0)).not.toBeDefined();
            });
        });
        describe('removing Things', function () {
            it('should let you remove things', function () {
                var thing = new Thing("vole");
                var world = new World(
                    [
                        [thing]
                    ]);
                world.remove(0, 0);
                expect(world.thingAt(0, 0)).not.toBeDefined();
            });
        });
    });
});