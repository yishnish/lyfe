function StatsDisplay(worldStats){
    var pubsub = PubSub();
    var stats = createDisplayList();
    var turnsRow = createTurnsRow();
    stats.appendChild(turnsRow);

    this.getDisplay = function(){
        return stats;
    };

    function createTurnsRow(){
        var turnsRow = document.createElement("li");
        turnsRow.classList.add('turns');
        var turnsData = document.createElement("span");
        var turnsLable = document.createElement("label");
        turnsLable.innerHTML = "Turns: ";
        turnsLable.setAttribute('for', 'turns-count');
        turnsData.appendChild(turnsLable);
        var turnsCount = document.createElement("span");
        turnsCount.setAttribute('id', 'turns-count');
        turnsCount.innerHTML = worldStats.getTurnCount();
        turnsData.appendChild(turnsCount);
        turnsRow.appendChild(turnsData);

        pubsub.subscribe('turn-stats-updated', function(count){
            turnsCount.innerHTML = worldStats.getTurnCount();
        });
        return turnsRow;
    }

    function createDisplayList(){
        return document.createElement("ul");
    }
}