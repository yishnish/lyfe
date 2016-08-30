describe("displaying world statistics", function(){
    beforeAll(function(){
        jasmine.addMatchers(customMatchers);
    });
    it('should show how many turns have passed', function(){
        var stats = new WorldStats();
        var world = new World([[]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        expect(statsDisplay).toDisplayNumberOfTurns(0);
        world.turn();
        expect(statsDisplay).toDisplayNumberOfTurns(1);
    });
});