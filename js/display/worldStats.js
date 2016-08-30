function WorldStats(){
    var pubsub = PubSub();
    var turnCount = 0;

    function updateTurnCount(){
        turnCount++;
    }

    this.getTurnCount = function(){
        return turnCount;
    };

    pubsub.subscribe('turned', updateTurnCount.bind(this));
}