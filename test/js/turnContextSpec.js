describe('TurnContext', function () {
    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
    });
    it('should tell you if there are things at some delta from the location of a Thing', function () {
        var thing1 = new Thing('vole');
        var thing2 = new Thing('vole');
        var world = new World([
            [null, thing1, null],
            [null, thing2, null],
            [null, null, null]
        ]);
        var turnContext = new TurnContext(world, thing2, new Coordinates(1, 1));
        expect(turnContext.hasThingAt(new Delta(-1, -1))).toBe(false);
        expect(turnContext.hasThingAt(new Delta(-1, 0))).toBe(true);
        expect(turnContext.hasThingAt(new Delta(-1, 1))).toBe(false);
        expect(turnContext.hasThingAt(new Delta(0, -1))).toBe(false);
        expect(turnContext.hasThingAt(new Delta(0, 0))).toBe(true);
        expect(turnContext.hasThingAt(new Delta(0, 1))).toBe(false);
        expect(turnContext.hasThingAt(new Delta(1, -1))).toBe(false);
        expect(turnContext.hasThingAt(new Delta(1, 0))).toBe(false);
        expect(turnContext.hasThingAt(new Delta(1, 1))).toBe(false);
    });

    it('can tell you if a location is possible to move to', function () {
        var thing1 = new Thing('vole');
        var thing2 = new Thing('vole');
        var world = new World([
            [null, thing1, null],
            [null, thing2, null],
            [null, null, null]
        ]);
        var turnContext = new TurnContext(world, thing2, new Coordinates(1, 1));
        expect(turnContext.canMoveTo(new Delta(-1, -1))).toBe(true);
        expect(turnContext.canMoveTo(new Delta(-1, 0))).toBe(false);
        expect(turnContext.canMoveTo(new Delta(-1, 1))).toBe(true);
        expect(turnContext.canMoveTo(new Delta(0, -1))).toBe(true);
        expect(turnContext.canMoveTo(new Delta(0, 0))).toBe(false);
        expect(turnContext.canMoveTo(new Delta(0, 1))).toBe(true);
        expect(turnContext.canMoveTo(new Delta(1, -1))).toBe(true);
        expect(turnContext.canMoveTo(new Delta(1, 0))).toBe(true);
        expect(turnContext.canMoveTo(new Delta(1, 1))).toBe(true);
    });

    it('can provide coordinates given a Thing and a Delta', function () {
        var thing = new Thing('vole');
        var world = new World([
            [null, null, null],
            [null, thing, null],
            [null, null, null]
        ]);
        var turnContext = new TurnContext(world, thing, new Coordinates(1, 1));
        expect(turnContext.coordinatesForDelta(new Delta(-1, -1))).toBeSameCoordinates(new Coordinates(0, 0));
        expect(turnContext.coordinatesForDelta(new Delta(-1, 0))).toBeSameCoordinates(new Coordinates(0, 1));
        expect(turnContext.coordinatesForDelta(new Delta(-1, 1))).toBeSameCoordinates(new Coordinates(0, 2));
        expect(turnContext.coordinatesForDelta(new Delta(0, -1))).toBeSameCoordinates(new Coordinates(1, 0));
        expect(turnContext.coordinatesForDelta(new Delta(0, 0))).toBeSameCoordinates(new Coordinates(1, 1));
        expect(turnContext.coordinatesForDelta(new Delta(0, 1))).toBeSameCoordinates(new Coordinates(1, 2));
        expect(turnContext.coordinatesForDelta(new Delta(1, -1))).toBeSameCoordinates(new Coordinates(2, 0));
        expect(turnContext.coordinatesForDelta(new Delta(1, 0))).toBeSameCoordinates(new Coordinates(2, 1));
        expect(turnContext.coordinatesForDelta(new Delta(1, 1))).toBeSameCoordinates(new Coordinates(2, 2));
    });
    it('can move things in the world', function () {
        var thing = new Thing('vole');
        var world = new World([
            [null, null, null],
            [null, thing, null],
            [null, null, null]
        ]);
        var turnContext = new TurnContext(world, thing, new Coordinates(1, 1));
        turnContext.moveThing(new Delta(0, 1));
        expect(world.thingAt(1, 2)).toBe(thing);
    });
});