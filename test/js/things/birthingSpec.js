describe("things that give birth", function () {
    it('looks for empty adjacent locations to give birth at', function () {
        Thing.prototype.mixin(Birthing);
        var thing = new Thing('wahtever');
        var world = new World([
            [null, thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).iAmA).toBe('wahtever');
        expect(world.thingAt(0, 1).iAmA).toBe('wahtever');
        expect(world.thingAt(0, 2).iAmA).toBe('fruitBush');
    });

    it('should do nothing if there are no empty spaces', function () {
        Thing.prototype.mixin(Birthing);
        var thing = new Thing('wahtever');
        var world = new World([
            [new FruitBush(), thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).iAmA).toBe('fruitBush');
        expect(world.thingAt(0, 1).iAmA).toBe('wahtever');
        expect(world.thingAt(0, 2).iAmA).toBe('fruitBush');
    });

    it('should give birth when a free space shows up', function () {
        Thing.prototype.mixin(Birthing);
        var thing = new Thing('wahtever');
        var world = new World([
            [new FruitBush(), thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).iAmA).toBe('fruitBush');
        expect(world.thingAt(0, 1).iAmA).toBe('wahtever');
        expect(world.thingAt(0, 2).iAmA).toBe('fruitBush');
        world.remove(0, 2);
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).iAmA).toBe('fruitBush');
        expect(world.thingAt(0, 1).iAmA).toBe('wahtever');
        expect(world.thingAt(0, 2).iAmA).toBe('wahtever');
    });
});