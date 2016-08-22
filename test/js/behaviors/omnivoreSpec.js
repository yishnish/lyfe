describe("Carnivores", function () {
    it('should eat animals', function () {
        var thing = new Civet();
        var world = new World([
            [thing, new Cow()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should eat non-animals', function () {
        var thing = new Civet();
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not be a cannibal', function () {
        var thing = new Civet();
        var world = new World([
            [thing, new Civet()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.eatIfPossible(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });
});