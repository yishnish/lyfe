describe("A World", function () {
    var dataGrid, world;
    beforeEach(function () {
        dataGrid = [[new Creature("vole")]];
        world = new World(dataGrid);
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
                        [new Creature("vole"), new Creature("vole")],
                        [new Creature("vole")]
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
                    [new Creature("vole"), new Creature("vole")],
                    [new Creature("vole"), null]
                ]);
            expect(world.thingAt(0, 0).getIamA()).toBe('vole');
            expect(world.thingAt(1, 1)).toBeNull();
        });
        describe("activating Things that live in it", function () {
            it('should notifiy Things when they can move', function () {
                var thing = new Creature("vole");
                var world = new World(
                    [
                        [thing, null],
                        [null, null]
                    ]);
                spyOn(thing, 'takeTurn').and.callThrough();
                world.turn();

                expect(thing.takeTurn).toHaveBeenCalled();
            });
        });
        describe("moving contents", function () {
            it('should move a Thing to another requested location', function () {
                var thing1 = new Creature("vole");
                var thing2 = new Creature("vole");
                var thing3 = new Creature("vole");
                var world = new World(
                    [
                        [thing1, thing2],
                        [thing3, null]
                    ]);
                world.move(new Coordinates(0, 0), new Coordinates(1, 1));
                expect(world.thingAt(0, 0)).toBeNull();
            });
        });
        describe('removing Things', function () {
            it('should let you remove things', function () {
                var thing = new Creature("vole");
                var world = new World(
                    [
                        [thing]
                    ]);
                world.remove(0, 0);
                expect(world.thingAt(0, 0)).toBeNull();
            });
        });
        describe('adding Things', function () {
            it('should let you add things', function () {
                var thing = new Creature("vole");
                var world = new World(
                    [
                        [null]
                    ]);
                world.add(thing, new Coordinates(0, 0));
                expect(world.thingAt(0, 0)).not.toBeNull();
            });
            it('should raise an error if you try to add a thing where there already is a thing', function () {
                var thing1 = new Creature("vole");
                var thing2 = new Creature("vole");
                var world = new World(
                    [
                        [thing1]
                    ]);
                expect(function(){world.add(thing2, new Coordinates(0, 0));}).toThrowError();
            });
        });
    });
});