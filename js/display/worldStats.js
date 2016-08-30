function WorldStats(){
    var pubsub = PubSub();
    var turnCount = 0;
    var things = new Map();

    function updateTurnCount(){
        turnCount++;
        pubsub.publish('turn-stats-updated');
    }

    this.getTurnCount = function(){
        return turnCount;
    };

    this.getThingCount = function(thingName){
        return things[thingName] || 0;
    };

    pubsub.subscribe('thing-added', function(thingName){
        if(!things[thingName]){
            things[thingName] = 0;
        }
        things[thingName]++;
    });

    pubsub.subscribe('thing-removed', function(thingName){
        things[thingName]--;
    });

    pubsub.subscribe('turned', updateTurnCount.bind(this));
    pubsub.subscribe('reset', function(){things = new Map(); turnCount = 0;});
}