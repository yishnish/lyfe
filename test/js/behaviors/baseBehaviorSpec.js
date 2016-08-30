describe('Base behavior', function () {
    beforeAll(function () {
        MyThing.prototype.mixin(BaseBehavior);
    });
    afterAll(function () {
        MyThing.prototype.removeMixin(BaseBehavior);
    });

    it('should be able to find adjacent empty spaces', function () {
        var myBaseThing = new MyThing();
        var world = new World([[new Cow(), myBaseThing, null]]);
        var turn = new TurnContext(world, myBaseThing, new Coordinates(0, 1));
        var placesToMoveTo = myBaseThing.findAdjacentEmptySpaces(turn);
        expect(placesToMoveTo.length).toBe(1);
        expect(placesToMoveTo[0]).toEqual(new Delta(0, 1));
    });

    it('should be able to find adjacent spaces that match a criteria', function () {
        var myBaseThing = new MyThing();
        var world = new World([ [new Cow(), myBaseThing, new Wolf()]]);
        var turn = new TurnContext(world, myBaseThing, new Coordinates(0, 1));
        var myCriteria = function(thing) {
            return thing && thing.getType() === Cow;
        };
        var matchingPlaces = myBaseThing.findPlaces(turn, myCriteria);
        expect(matchingPlaces.length).toBe(1);
        expect(matchingPlaces[0]).toEqual(new Delta(0, -1));
    });
});