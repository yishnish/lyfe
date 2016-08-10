describe("things that give birth", function () {
    beforeAll(function () {
        MyThing.prototype.mixin(Birthing);
    });

    it('looks for empty adjacent locations to give birth at', function () {
        var thing = new MyThing();
        var world = new World([
            [null, thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).getIamA()).toBe('whatever');
        expect(world.thingAt(0, 1).getIamA()).toBe('whatever');
        expect(world.thingAt(0, 2).getIamA()).toBe('fruitBush');
    });

    it('should do nothing if there are no empty spaces', function () {
        var thing = new MyThing();
        var world = new World([
            [new FruitBush(), thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).getIamA()).toBe('fruitBush');
        expect(world.thingAt(0, 1).getIamA()).toBe('whatever');
        expect(world.thingAt(0, 2).getIamA()).toBe('fruitBush');
    });

    it('should give birth when a free space shows up', function () {
        var thing = new MyThing();
        var world = new World([
            [new FruitBush(), thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).getIamA()).toBe('fruitBush');
        expect(world.thingAt(0, 1).getIamA()).toBe('whatever');
        expect(world.thingAt(0, 2).getIamA()).toBe('fruitBush');
        world.remove(0, 2);
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).getIamA()).toBe('fruitBush');
        expect(world.thingAt(0, 1).getIamA()).toBe('whatever');
        expect(world.thingAt(0, 2).getIamA()).toBe('whatever');
    });

    it('should give birth to a child with the same vitality as the parent', function () {
        var thing = new MyThing();
        var world = new World([
            [null, thing]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.vitality = 2;
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).vitality).toBe(2);
    });

    it('should give birth to a child with the same health as the parent', function () {
        var thing = new MyThing();
        var world = new World([
            [null, thing]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.hp = 2;
        thing.giveBirth(turn);
        expect(world.thingAt(0, 0).hp).toBe(2);
    });
});