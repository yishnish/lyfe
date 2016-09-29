describe("Omnivores", function () {
    it('should eat animals', function () {
        var thing = new Civet();
        thing.vitality = thing.MAX_VITALITY - 1;
        var world = new World([
            [thing, new Cow()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should eat non-animals', function () {
        var thing = new Civet();
        thing.vitality = thing.MAX_VITALITY - 1;
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not be a cannibal', function () {
        var thing = new Civet();
        var world = new World([
            [thing, new Civet()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    it('should not eat if full', function(){
        var thing = new Civet();
        thing.vitality = thing.MAX_VITALITY;
        var world = new World([
            [thing, new Cow()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });
});