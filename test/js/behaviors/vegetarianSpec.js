describe("Vegetarians", function () {
    beforeAll(function () {
        MyCreature.prototype.mixin(Vegetarian);
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
});