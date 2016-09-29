describe("Carnivores", function () {
    var thing;
    beforeEach(function(){
        thing = new MyCarnivoreThing();
        thing.vitality = 40;
    });

    it('should eat animals', function () {
        var world = new World([
            [thing, new Cow()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not eat non-animals', function () {
        var world = new World([
            [thing, new FruitBush()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    it('should not be a cannibal', function () {
        var world = new World([
            [thing, new MyCarnivoreThing()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    function MyCarnivoreThing(){
        Thing.call(this);
    }
    (function(){
        MyCarnivoreThing.prototype = Object.create(Thing.prototype);
        MyCarnivoreThing.prototype.constructor = MyCarnivoreThing;
        MyCarnivoreThing.prototype.behaviors = [];
        MyCarnivoreThing.prototype.addBehavior(new Behavior('carnivore').addAction(new EatsMeat()));
    })();
});