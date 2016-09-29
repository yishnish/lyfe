describe("vitality regeneration", function(){
    function MyRegeneratingThing(){
        Thing.call(this);
    }
    MyRegeneratingThing.prototype = Object.create(Thing.prototype);
    MyRegeneratingThing.prototype.constructor = MyRegeneratingThing;
    MyRegeneratingThing.prototype.behaviors = [];

    var regenerates = new Behavior('regenerates');
    regenerates.addAction(new RegeneratesVitality());
    MyRegeneratingThing.prototype.addBehavior(regenerates);

    it("should gain vitality back every turn resulting in a net gain of zero since you also lose health each turn", function(){
        var thing = new MyRegeneratingThing();
        thing.vitality = 20;
        thing.takeTurn(new TurnContext(null, thing, null));
        expect(thing.vitality).toBe(20);
    });
});