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
    it('should show how many cows there are', function(){
        var stats = new WorldStats();
        var world = new World([[]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        world.add(new Cow(), new Coordinates(0, 0));
        expect(statsDisplay.getNumberOf(Cow)).toBe(1);
    });
    it('should show how many wolves there are', function(){
        var stats = new WorldStats();
        var world = new World([[]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        world.add(new Wolf(), new Coordinates(0, 0));
        expect(statsDisplay.getNumberOf(Wolf)).toBe(1);
    });
    it('should show how many fruit bushes there are', function(){
        var stats = new WorldStats();
        var world = new World([[]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        world.add(new FruitBush(), new Coordinates(0, 0));
        expect(statsDisplay.getNumberOf(FruitBush)).toBe(1);
    });
    it('should show how many civets there are', function(){
        var stats = new WorldStats();
        var world = new World([[]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        world.add(new Civet(), new Coordinates(0, 0));
        expect(statsDisplay.getNumberOf(Civet)).toBe(1);
    });

    it('should show how many polar bears there are', function(){
        var stats = new WorldStats();
        var world = new World([[]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        world.add(new PolarBear(), new Coordinates(0, 0));
        expect(statsDisplay.getNumberOf(PolarBear)).toBe(1);
    });

    it('should show the maximum number of a type of thing that ever existed at once', function(){
        var stats = new WorldStats();
        var world = new World([[null, null]]);
        var statsDisplay = new StatsAccessor(new StatsDisplay(stats));
        world.add(new Cow(), new Coordinates(0, 0));
        expect(statsDisplay.getMaxNumberOf(Cow)).toBe(1);
        world.add(new Cow(), new Coordinates(0, 1));
        expect(statsDisplay.getMaxNumberOf(Cow)).toBe(2);
        world.remove(0, 0);
        expect(statsDisplay.getMaxNumberOf(Cow)).toBe(2);
    });
});