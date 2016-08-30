function StatsAccessor(statsDisplay){

    this.getTurnCount = function(){
        var stats = statsDisplay.getDisplay();
        return parseInt(stats.querySelector('#turns-count').innerHTML);
    };

    this.getNumberOf = function(type){
        var stats = statsDisplay.getDisplay();
        return parseInt(stats.querySelector('#' + type.toLowerCase() + '-count').innerHTML);
    };
}