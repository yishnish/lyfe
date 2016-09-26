describe("world statistics", function(){
    beforeAll(function(){
        jasmine.addMatchers(customMatchers);
    });
    it('should know the number of turns the world has made thus far', function(){
        var world = new World([[]]);
        var worldStats = new WorldStats(world);
        expect(worldStats).hasTakenTurns(0);
        world.turn();
        expect(worldStats).hasTakenTurns(1);
    });
    it('should know the number of a type of thing in the world', function(){
        var world = new World([[null, null]]);
        var worldStats = new WorldStats(world);
        var cow = new Cow();
        world.add(cow, new Coordinates(0, 0));
        expect(worldStats.getThingCount(Cow)).toBe(1);
        var wolf = new Wolf();
        world.add(wolf, new Coordinates(0, 1));
        expect(worldStats.getThingCount(Cow)).toBe(1);
    });
    it('removing a thing should lower the number of those things reported for the world', function(){
        var world = new World([[null, null]]);
        var worldStats = new WorldStats(world);
        var cow = new Cow();
        world.add(cow, new Coordinates(0, 0));
        expect(worldStats.getThingCount(Cow)).toBe(1);
        world.remove(0, 0);
        expect(worldStats.getThingCount(Cow)).toBe(0);
    });
    it('should throw an error if you somehow decrement a value that was never added', function(){
        var world = new World([[]]);
        var worldStats = new WorldStats(world);
        expect(function(){
            PubSub().publish('thing-removed', new Cow());
        }).toThrow();
    });
    it('should know the maximum number of a type of Thing that ever existed', function(){
        var world = new World([[null, null]]);
        var worldStats = new WorldStats(world);
        world.add(new Cow(), new Coordinates(0, 0));
        expect(worldStats.getMaxThingCount(Cow)).toBe(1);
        world.add(new Cow(), new Coordinates(0, 1));
        expect(worldStats.getMaxThingCount(Cow)).toBe(2);
        world.remove(0, 0);
        expect(worldStats.getMaxThingCount(Cow)).toBe(2);
    });
    it('should know the maximum number of things that ever existed at the same time', function(){
        var world = new World([[null, null]]);
        var worldStats = new WorldStats(world);
        world.add(new Cow(), new Coordinates(0, 0));
        expect(worldStats.getMaxTotalCount()).toBe(1);
        world.remove(0, 0);
        expect(worldStats.getMaxTotalCount()).toBe(1);
        world.add(new Cow(), new Coordinates(0, 0));
        expect(worldStats.getMaxTotalCount()).toBe(1);
        world.add(new Cow(), new Coordinates(0, 1));
        expect(worldStats.getMaxTotalCount()).toBe(2);
    });
    it('should reset the max total number of things when a reset event occurs', function(){
        var world = new World([[null, null]]);
        var worldStats = new WorldStats(world);
        expect(worldStats.getMaxTotalCount()).toBe(0);
        world.add(new Cow(), new Coordinates(0, 0));
        expect(worldStats.getMaxTotalCount()).toBe(1);
        PubSub().publish('reset');
        expect(worldStats.getMaxTotalCount()).toBe(0);
    });
    it('adding a thing after being reset should show the correct max total', function(){
        var world = new World([[null, null]]);
        var worldStats = new WorldStats(world);
        expect(worldStats.getMaxTotalCount()).toBe(0);
        world.add(new Cow(), new Coordinates(0, 0));
        expect(worldStats.getMaxTotalCount()).toBe(1);
        PubSub().publish('reset');
        expect(worldStats.getMaxTotalCount()).toBe(0);
        world.add(new Cow(), new Coordinates(0, 1));
        expect(worldStats.getMaxTotalCount()).toBe(1);
    });
});