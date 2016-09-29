describe("moves", function () {
    var movesAround;
    beforeAll(function () {
        movesAround = new Behavior('moves');
        movesAround.addTrait(new MovesAround());
        MyThing.prototype.addBehavior(movesAround);
    });
    afterAll(function () {
        MyThing.prototype.removeBehavior(movesAround);
    });

    describe('finding places to move to', function () {
        it('should be able to move around in the world', function () {
            var mover = new MyThing();
            var world = new World([
                [mover, null]
            ]);
            var turn = new TurnContext(world, mover, new Coordinates(0, 0));
            mover.takeTurn(turn);
            expect(world.thingAt(0, 0)).toBeNull();
            expect(world.thingAt(0, 1)).toBe(mover);
        });

        it('should not move to an occupied space', function () {
            var mover = new MyThing();
            var world = new World([
                [mover, new Cow()]
            ]);
            var turn = new TurnContext(world, mover, new Coordinates(0, 0));
            mover.takeTurn(turn);
            expect(world.thingAt(0, 0)).toBe(mover);
        });
    });
});