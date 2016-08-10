describe("things that copulate to reproduce", function () {
    beforeAll(function () {
        Thing.prototype.mixin(Copulates);
    });

    it('should only try to hump things of the same type', function () {
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

    it('should only look in adjacent squares for copulatees', function () {
        var thing = new Thing('whatever');

        var world = new World([
            [new Thing('whatever'), new Thing('whatever'), new Thing('whatever'), new Thing('whatever'), new Thing('whatever')],
            [new Thing('whatever'), null,                   null,                   null,                new Thing('whatever')],
            [new Thing('whatever'), null,                   thing,                  null,                new Thing('whatever')],
            [new Thing('whatever'), null,                   null,                   null,                new Thing('whatever')],
            [new Thing('whatever'), new Thing('whatever'), new Thing('whatever'), new Thing('whatever'), new Thing('whatever')]
        ]);

        spyOn(thing, 'hump');
        var turn = new TurnContext(world, thing, new Coordinates(2, 2));
        thing.tryHumping(turn);
        expect(thing.hump).not.toHaveBeenCalled();
    });

    describe('getting pregnant', function () {
        it('should get pregnant only if vitality is maxed out', function () {
            var thing1 = new Thing('whatever');
            var thing2 = new Thing('whatever');
            var world = new World([
                [thing1, thing2]
            ]);
            var turn = new TurnContext(world, thing1, new Coordinates(0, 0));
            thing2.vitality = thing2.MAX_VITALITY - 1;
            thing1.tryHumping(turn);
            expect(thing2.pregnant).toBeFalsy();

            thing2.vitality = thing2.MAX_VITALITY;
            thing1.tryHumping(turn);
            expect(thing2.pregnant).toBe(true);
        });
    });
});