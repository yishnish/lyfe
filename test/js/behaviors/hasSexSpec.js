describe("things that can have sex", function(){
    it("should hump things", function(){
        var thing1 = new MySexThing();
        var thing2 = new MySexThing();
        var world = new World([[thing1, thing2]]);
        world.turn();
        expect(thing1.pregnant).toBe(true);
        expect(thing2.pregnant).toBe(true);
    });

    it('should only try to hump things of the same type', function(){
        var thing = new MySexThing();
        var fruti = new FruitBush();
        var world = new World([
            [thing, fruti]
        ]);
        world.turn();
        expect(fruti.pregnant).not.toBeTruthy();
        expect(thing.pregnant).not.toBeTruthy();
    });

    it('should only try to hump things in adjacent squares', function(){
        var thing = new MySexThing();
        var otherThing = new MySexThing();
        var world = new World([
            [thing, null, otherThing]
        ]);
        world.turn();
        expect(thing.pregnant).toBeFalsy();
        expect(otherThing.pregnant).toBeFalsy();
    });

    function MySexThing(){
        Thing.call(this);
    }

    MySexThing.prototype = Object.create(Thing.prototype);
    MySexThing.prototype.constructor = MySexThing;
    MySexThing.prototype.behaviors = [];
    MySexThing.prototype.addBehavior((new Behavior()).addTrait(new HasSex()));
});