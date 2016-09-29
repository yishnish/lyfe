describe("Cannibals", function(){
    it("should eat it's own type of creature", function(){
        var thing = new MyCannibalThing();
        var world = new World([
            [thing, new MyCannibalThing()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).toHaveBeenCalled();
    });

    it('should not eat non-itself type of thing', function(){
        var thing = new MyCannibalThing();
        var world = new World([
            [thing, new Wolf()]
        ]);
        spyOn(thing, 'eat');
        var turn = new TurnContext(world, thing, new Coordinates(0, 0));
        thing.takeTurn(turn);
        expect(thing.eat).not.toHaveBeenCalled();
    });

    function MyCannibalThing(){
        Thing.call(this);
    }
    (function(){
        MyCannibalThing.prototype = Object.create(Thing.prototype);
        MyCannibalThing.prototype.constructor = MyCannibalThing;
        MyCannibalThing.prototype.behaviors = [];
        MyCannibalThing.prototype.addBehavior(new Behavior('cannibal').addAction(new CannibalDiet()));
    })();
});