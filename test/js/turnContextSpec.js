describe('TurnContext', function () {
    beforeAll(function () {
        jasmine.addMatchers(customMatchers);
    });
    it('should tell you if there are things at some delta from the location of a Thing', function () {
        var thing1 = new Cow();
        var thing2 = new Cow();
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

    it('should tell you if there are things at some delta that fulfil a criteria', function () {
        var thing1 = new Cow();
        var thing2 = new Cow();
        var food = new FruitBush();
        var world = new World([
            [null, thing1, null],
            [null, thing2, null],
            [null, null, food]
        ]);
        var turnContext = new TurnContext(world, thing2, new Coordinates(1, 1));
        var isFood = function (thing) {
            return thing instanceof FruitBush;
        };
        expect(turnContext.hasMatchingThingAt(new Delta(-1, 0), isFood)).toBe(false);
        expect(turnContext.hasMatchingThingAt(new Delta(0, 0), isFood)).toBe(false);
        expect(turnContext.hasMatchingThingAt(new Delta(0, 1), isFood)).toBe(false);
        expect(turnContext.hasMatchingThingAt(new Delta(1, 1), isFood)).toBe(true);
    });

    it('can tell you if a location is possible to move to', function () {
        var thing1 = new Cow();
        var thing2 = new Cow();
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
        var thing = new Cow();
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
        var thing = new Cow();
        var world = new World([
            [null, null, null],
            [null, thing, null],
            [null, null, null]
        ]);
        var turnContext = new TurnContext(world, thing, new Coordinates(1, 1));
        turnContext.moveThing(new Delta(0, 1));
        expect(world.thingAt(1, 2)).toBe(thing);
    });
    it('should setContents location after moving a thing', function () {
        var thing = new Cow();
        var world = new World([
            [null, null, null],
            [null, thing, null],
            [null, null, null]
        ]);
        var startingCoords = new Coordinates(1, 1);
        var turnContext = new TurnContext(world, thing, startingCoords);
        expect(turnContext.coordinatesForThing()).toBeSameCoordinates(startingCoords);
        turnContext.moveThing(new Delta(0, 1));
        expect(turnContext.coordinatesForThing()).toBeSameCoordinates(new Coordinates(1, 2));
    });
    it('can get the coordinates for the Thing in context', function () {
        var thing = new Cow();
        var world = new World([
            [null, null, null],
            [null, thing, null],
            [null, null, null]
        ]);
        var turnContext = new TurnContext(world, thing, new Coordinates(1, 1));
        expect(turnContext.coordinatesForThing()).toBeSameCoordinates(new Coordinates(1, 1));
    });
    describe('adding things to the world', function () {
        it('should be able to add things to the world', function () {
            var thing = new Cow();
            var world = new World([[null, thing]]);
            var turnContext = new TurnContext(world, thing, new Coordinates(0, 1));
            var delta = new Delta(0, -1);
            turnContext.addThing(new Cow(), delta);
            var newThingCoords = turnContext.coordinatesForDelta(delta);
            expect(world.thingAt(newThingCoords.getRow(), newThingCoords.getColumn())).toBeACow();
        });
    });
    it('should be able to remove things from the world', function () {
        var thing = new Cow();
        var world = new World([
            [thing]
        ]);
        var turnContext = new TurnContext(world, thing, new Coordinates(0, 0));
        turnContext.removeThing();
        expect(world.thingAt(0, 0)).toBeNull();
    });
    it('should perform an arbitrary action on a thing at a location', function () {
        var creature = new Cow();
        var food = new FruitBush();
        var world = new World([
            [creature, food]
        ]);
        var turnContext = new TurnContext(world, creature, new Coordinates(0, 0));
        spyOn(creature, 'eat').and.callThrough();
        creature.vitality = 10;
        turnContext.doThisToThatThere(creature.eat, new Delta(0, 1));
        expect(creature.eat).toHaveBeenCalled();
        expect(creature.vitality).toEqual(30);
    });
});