describe("Vegetarians", function () {
    beforeAll(function () {
        MyCreature.prototype.mixin(Vegetarian);
        jasmine.addMatchers(customMatchers);
    });
    afterAll(function () {
        MyCreature.prototype.removeMixin(Vegetarian);
    });

    it('should eat fruit', function () {
        var thing = new MyCreature();
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not eat non-fruit', function () {
        var thing = new MyCreature();
        var world = new World([
            [thing, new Food()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    it('should occasionally poop out a fruit bush', function(){
        var fruited = false, counter = 0;
        var thing = new MyCreature();
        var existingFood = new FruitBush();
        var world = new World([
            [thing, existingFood],
            [null, existingFood]
        ]);
        while(!fruited){
            fruited = world.thingAt(1, 0) instanceof FruitBush;
            thing.vitality = 1;
            existingFood.hp = 10;
            world.turn();
            if(++counter > 500) {
                throw new Error("Expected the creature to poop a bush out within 500 tries");
            }
        }
        expect(world.thingAt(1, 0)).toBeAFruitBush();
    })
});