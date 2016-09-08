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

    pubsub.subscribe('thing-added', function(thing){
        var thingName = thing.getTypeName();
        if(!things[thingName]){
            things[thingName] = 0;
        }
        things[thingName]++;
    });

    pubsub.subscribe('thing-removed', function(thing){
        things[thing.getTypeName()]--;
    });

    pubsub.subscribe('turned', updateTurnCount.bind(this));
    pubsub.subscribe('reset', function(){things = new Map(); turnCount = 0;});
}