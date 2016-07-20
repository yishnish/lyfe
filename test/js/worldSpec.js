describe("A World", function () {
    var dataGrid, world;
    beforeEach(function () {
        dataGrid = [[{iAmA: "vole"}]];
        world = new World(dataGrid);
    });
    it("contains data", function () {
        expect(world.getGrid()).toEqual(dataGrid);
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