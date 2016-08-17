describe("Vegetarians", function () {
    beforeAll(function () {
        MyCreature.prototype.mixin(Carnivore);
        jasmine.addMatchers(customMatchers);
    });
    afterAll(function () {
        MyCreature.prototype.removeMixin(Carnivore);
    });

    it('should eat animals', function () {
        var thing = new MyCreature();
        var world = new World([
            [thing, new Cow()]
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

    it('should recover two vitality when eating food so that there is a net gain at the end of the turn', function () {
        var thing = new MyCreature();
        thing.vitality = 1;
        thing.eat(new FruitBush());
        expect(thing.vitality).toBe(3);
    });
});