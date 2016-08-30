describe("pubsub", function(){
    it('should let you subscribe to an event', function(){
        var updated = false;
        var pubsub = new PubSub();
        pubsub.subscribe('myEvent', function(){
            updated = true;
        });
        pubsub.publish("myEvent");
        expect(updated).toBe(true);
    });
    it('subscribed functions can take parameters passed by the publisher', function(){
        var updated = 'old value';
        var pubsub = new PubSub();
        pubsub.subscribe('myEvent', function(value){
            updated = value;
        });
        pubsub.publish("myEvent", 'a new value');
        expect(updated).toBe('a new value');
    });
    it('there should only be one pubsub', function(){
        var pubsub = new PubSub();
        var updated = false;
        pubsub.subscribe('hi', function(){
            updated = true;
        });
        var pubsub2 = new PubSub();
        expect(pubsub).toBe(pubsub2);
        pubsub2.publish('hi');
        expect(updated).toBe(true);
    });
});