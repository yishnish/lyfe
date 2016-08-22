describe('Base behavior', function () {
    beforeAll(function () {
        MyThing.prototype.mixin(BaseBehavior);
    });
    afterAll(function () {
        MyThing.prototype.removeMixin(BaseBehavior);
    });

    it('should be able to find adjacent empty spaces', function () {
        var myBaseThing = new MyThing();
        var world = new World([[null, myBaseThing, {}]]);
        var turn = new TurnContext(world, myBaseThing, new Coordinates(0, 1));
        var placesToMoveTo = myBaseThing.findAdjacentEmptySpaces(turn);
        expect(placesToMoveTo.length).toBe(1);
        expect(placesToMoveTo[0]).toEqual(new Delta(0, -1));
    });

    it('should be able to find adjacent spaces that match a criteria', function () {
        var myBaseThing = new MyThing();
        var world = new World([ [{isAwesome: false}, myBaseThing, {isAwesome: true}]]);
        var turn = new TurnContext(world, myBaseThing, new Coordinates(0, 1));
        var myCriteria = function(thing) {
            return thing && thing.isAwesome;
        };
        var placesToMoveTo = myBaseThing.findPlaces(turn, myCriteria);
        expect(placesToMoveTo.length).toBe(1);
        expect(placesToMoveTo[0]).toEqual(new Delta(0, 1));
    });
});