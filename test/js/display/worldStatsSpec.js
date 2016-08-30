describe("world statistics", function(){
    beforeAll(function(){
        jasmine.addMatchers(customMatchers);
    });
    it('should display the number of turns the world has made thus far', function(){
        var world = new World([[]]);
        var worldStats = new WorldStats(world);
        expect(worldStats).hasTakenTurns(0);
        world.turn();
        expect(worldStats).hasTakenTurns(1);
    });
});