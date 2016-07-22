/**
 * philosophy stuff. does a thing know wabout the world? if i'm a thing and i want to move somewhere do i ask the
 * world if there is stuff there? i think so. i don't negotiate with the world about the location of objects, i
 * query it with my senses and determine whether there's stuff where i want to be. so i guess Things know about the
 * World. but maybe just when the world tells the thing it can do something? "ok, you can do a thing now, here's me if
 * you need any info about me"
 */
describe("Things", function () {
    describe("type awareness", function () {
        it('should know what type of thing it is', function () {
            var thing = new Thing('vole');
            expect(thing.iAmA).toEqual('vole');
        });
    });
    describe("awareness of surroundings", function () {
        it('should know what adjacent squares are unoccupied', function () {
            var thing = new Thing('bird');
            var thing2 = new Thing('bird');
            var dataGrid = [
                [undefined, thing, undefined],
                [undefined, thing2, undefined],
                [undefined, undefined, undefined]
            ];
            var world = new World(dataGrid);
            expect(thing.canMoveTo({row: 0, col: 0}, world)).toBe(true);
            expect(thing.canMoveTo({row: 0, col: 1}, world)).toBe(false);
            expect(thing.canMoveTo({row: 1, col: 1}, world)).toBe(false);
        });
        it('should know that it cannot move off the map', function () {
            var thing = new Thing('bird');
            var dataGrid = [
                [
                    [thing, undefined, undefined],
                    [undefined, undefined, undefined],
                    [undefined, undefined, undefined]
                ]
            ];
            var world = new World(dataGrid);
            expect(thing.canMoveTo({row: -1, col: 0}, world)).toBe(false);
            expect(thing.canMoveTo({row: -1, col: -1}, world)).toBe(false);
            expect(thing.canMoveTo({row: 0, col: -1}, world)).toBe(false);
            expect(thing.canMoveTo({row: 50, col: 50}, world)).toBe(false);

        });
    });

    describe("Well being", function () {
        var thing;

        beforeEach(function () {
            thing = new Thing();
        });

        it('has health', function () {
            expect(thing.hp).toBeDefined();
        });
        it('has vitality', function () {
            expect(thing.vitality).toBeDefined();
        });
        it('loses vitality every turn', function () {
            var dataGrid = [
                [thing, undefined]
            ];
            var world = new World(dataGrid);
            thing.vitality = 10;
            world.turn();
            expect(thing.vitality).toBe(9);
        });
        it('loses health every turn once its vitality reaches zero', function () {
            var dataGrid = [
                [thing, undefined]
            ];
            var world = new World(dataGrid);
            thing.hp = 10;
            thing.vitality = 1;
            world.turn();
            expect(thing.vitality).toBe(0);
            expect(thing.hp).toBe(10);
            world.turn();
            expect(thing.vitality).toBe(0);
            expect(thing.hp).toBe(9);
        });
    });

    describe("Activities", function () {
        describe("movement", function () {
            it('should be able to move around in the world', function () {
                var thing = new Thing('bird');
                var dataGrid = [
                    [thing, undefined]
                ];
                var world = new World(dataGrid);
                world.turn();
                expect(world.thingAt(0, 0)).toBeUndefined();
                expect(world.thingAt(0, 1)).toBe(thing);
            });
        });
    });

});