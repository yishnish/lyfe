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
});