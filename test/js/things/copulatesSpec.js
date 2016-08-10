describe("things that copulate to reproduce", function () {
    it('should only try to hump things of the same type', function () {
        Thing.prototype.mixin(Copulates);
        var thing = new Thing('whatever');
        var fruti = new FruitBush();
        var world = new World([
            [thing, fruti]
        ]);

        spyOn(thing, 'hump');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.tryHumping(turn);
        expect(thing.hump).not.toHaveBeenCalled();

        world.remove(0, 1);
        world.add(new Thing('whatever'), new Coordinates(0, 1));
        thing.tryHumping(turn);
        expect(thing.hump).toHaveBeenCalled();
    });
});