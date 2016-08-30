function WorldStats(){
    var pubsub = PubSub();
    var turnCount = 0;

    function updateTurnCount(){
        turnCount++;
        pubsub.publish('turn-stats-updated', turnCount);
    }

    this.getTurnCount = function(){
        return turnCount;
    };

    pubsub.subscribe('turned', updateTurnCount.bind(this));
}