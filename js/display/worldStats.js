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

    this.getThingCount = function(thingClass){
        return things.get(thingClass) || 0;
    };

    pubsub.subscribe('thing-added', function(thing){
        var type = thing.getType();
        var oldValue = things.get(type);
        if(!oldValue){
            oldValue = 0;
            things.set(type, oldValue);
        }
        things.set(type, oldValue + 1);
    });

    pubsub.subscribe('thing-removed', function(thing){
        var type = thing.getType();
        things.set(type, things.get(type) - 1);
    });

    pubsub.subscribe('turned', updateTurnCount.bind(this));
    pubsub.subscribe('reset', function(){
        things = new Map();
        turnCount = 0;
    });
}