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
        });
    });
});