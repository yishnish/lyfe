function StatsAccessor(statsDisplay){

    this.getTurnCount = function(){
        var stats = statsDisplay.getDisplay();
        return parseInt(stats.querySelector('#turns-count').innerHTML);
    };

    this.getNumberOf = function(thingClass){
        var stats = statsDisplay.getDisplay();
        return parseInt(stats.querySelector('#' + thingClass.name.toLowerCase() + '-count').innerHTML);
    };

    this.getMaxNumberOf = function(thingClass){
        var stats = statsDisplay.getDisplay();
        var selector = '#' + thingClass.name.toLowerCase() + '-max-count';
        return parseInt(stats.querySelector(selector).innerHTML);
    };
}