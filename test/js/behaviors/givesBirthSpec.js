describe("things that give birth", function(){
    var thing;
    var birthing = new Behavior('birthing');
    beforeAll(function(){
        birthing.addTrait(new GivesBirth());
        MyThing.prototype.addBehavior(birthing);
    });
    afterAll(function(){
        MyThing.prototype.removeBehavior(birthing);
    });

    beforeEach(function(){
        thing = new MyThing();
        thing.pregnant = true;
    });

    it('should give birth if pregnant', function(){
        var world = new World([[null, thing]]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).getClazz()).toBe(MyThing);
    });

    it('should not give birth if not pregnant', function(){
        var world = new World([[null, thing]]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.pregnant = false;
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0)).toBeNull();
    });

    it('looks for empty adjacent locations to give birth at', function(){
        var world = new World([
            [null, thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).getClazz()).toBe(MyThing);
        expect(world.thingAt(0, 1).getClazz()).toBe(MyThing);
        expect(world.thingAt(0, 2).getClazz()).toBe(FruitBush);
    });

    it('should do nothing if there are no empty spaces', function(){
        var world = new World([
            [new FruitBush(), thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).getClazz()).toBe(FruitBush);
        expect(world.thingAt(0, 1).getClazz()).toBe(MyThing);
        expect(world.thingAt(0, 2).getClazz()).toBe(FruitBush);
    });

    it('should give birth when a free space shows up', function(){
        var world = new World([
            [new FruitBush(), thing, new FruitBush()]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).getClazz()).toBe(FruitBush);
        expect(world.thingAt(0, 1).getClazz()).toBe(MyThing);
        expect(world.thingAt(0, 2).getClazz()).toBe(FruitBush);
        world.remove(0, 2);
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).getClazz()).toBe(FruitBush);
        expect(world.thingAt(0, 1).getClazz()).toBe(MyThing);
        expect(world.thingAt(0, 2).getClazz()).toBe(MyThing);
    });

    it('should give birth to a child with the same vitality as the parent', function(){
        var world = new World([
            [null, thing]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.vitality = 2;
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).vitality).toBe(2);
    });

    it('should give birth to a child with the same health as the parent', function(){
        var world = new World([
            [null, thing]
        ]);
        var turn = new TurnContext(world, thing, new Coordinates(0, 1));
        thing.hp = 2;
        thing.takeTurn(turn);
        expect(world.thingAt(0, 0).hp).toBe(2);
    });
});