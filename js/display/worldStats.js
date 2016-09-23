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

    // there is a race condition here where the stats display will ask for the thing count
    // when the 'thing-added' event happens, but the thing count may not have been updated here
    // and also may not have been initialized at all for this type of Thing
    this.getThingCount = function(thingClass){
        var thingData = getOrCreateThingData(thingClass);
        return thingData.currentCount || 0;
    };

    this.getMaxThingCount = function(thingClass){
        return getOrCreateThingData(thingClass).maxConcurrent;
    };

    pubsub.subscribe('thing-added', function(thing){
        incrementThingCount(thing);
        updateMaxThingCountIfNecessary(thing);
    });

    pubsub.subscribe('thing-removed', function(thing){
        decrementThingCount(thing);
    });

    pubsub.subscribe('turned', updateTurnCount.bind(this));

    pubsub.subscribe('reset', function(){
        things = new Map();
        turnCount = 0;
    });

    function getOrCreateThingData(thingClass){
        var thingData = things.get(thingClass);
        if(!thingData){
            thingData = {};
            things.set(thingClass, thingData);
        }
        return thingData;
    }

    function decrementThingCount(thing){
        var thingData = getThingDataAndFailIfItsNotThere(thing);
        thingData.currentCount--;
    }


    function incrementThingCount(thing){
        var thingData = getOrCreateThingData(thing.getClazz());
        thingData.currentCount = thingData.currentCount || 0;
        thingData.currentCount++;
    }

    function updateMaxThingCountIfNecessary(thing){
        var thingData = getOrCreateThingData(thing.getClazz());
        var currentMaxConcurrent = thingData.maxConcurrent || 0;
        var currentConcurrent = thingData.currentCount || 0;
        thingData.maxConcurrent = Math.max(currentMaxConcurrent, currentConcurrent);
    }

    function getThingDataAndFailIfItsNotThere(thing){
        var thingClass = thing.getClazz();
        var thingData = things.get(thingClass);
        if(!thingData){
            throw Error("You trying to decrement the value for " + thingClass + " but there are no entries for it.");
        }
        else if(!thingData.currentCount || thingData.currentCount < 0){
            throw Error("You somehow have " + thingData.currentCount + " as the value for " + thingClass + " and you're trying to remove another one.");
        }
        return thingData;
    }
}