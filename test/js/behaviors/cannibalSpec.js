describe("Cannibals", function () {
    it("should eat it's own type of creature", function () {
        var thing = new PolarBear();
        var world = new World([
            [thing, new PolarBear()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not eat non-itself type of thing', function () {
        var thing = new PolarBear();
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });
});