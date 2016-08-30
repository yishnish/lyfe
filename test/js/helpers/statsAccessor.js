function StatsAccessor(statsDisplay){

    this.getTurnCount = function(){
        var stats = statsDisplay.getDisplay();
        return parseInt(stats.querySelector('#turns-count').innerHTML);
    }
}