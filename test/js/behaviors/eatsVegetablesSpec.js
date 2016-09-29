describe("Vegetarians", function () {
    var vegetarian;
    beforeAll(function () {
        vegetarian = new Behavior('vegetarian');
        vegetarian.addTrait(new EatsVegetables());

        MyCreature.prototype.addBehavior(vegetarian);
    });
    afterAll(function () {
        MyCreature.prototype.removeBehavior(vegetarian);
    });

    it('should eat fruit', function () {
        var thing = new MyCreature();
        thing.vitality = thing.MAX_VITALITY - 1;
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not eat non-fruit', function () {
        var thing = new MyCreature();
        thing.vitality = thing.MAX_VITALITY - 1;
        var world = new World([
            [thing, new Wolf()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    it('should not eat if full', function(){
        var thing = new MyCreature();
        thing.vitality = thing.MAX_VITALITY;
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    it('should occasionally poop out a fruit bush', function () {
        var fruited = false, counter = 0;
        var thing = new MyCreature();
        var existingFood = new FruitBush();
        var world = new World([
            [thing, existingFood],
            [null, existingFood]
        ]);
        while (!fruited) {
            fruited = world.thingAt(1, 0) instanceof FruitBush || world.thingAt(0, 0) instanceof FruitBush;
            thing.vitality = 100;
            existingFood.hp = 10;
            world.turn();
            if (++counter > 500) {
                throw new Error("Expected the creature to poop a bush out within 500 tries");
            }
        }
        expect(fruited).toBeTruthy();
    });
});