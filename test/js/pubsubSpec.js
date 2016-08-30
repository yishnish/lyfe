describe("pubsub", function(){
    it('should let you subscribe to an event', function(){
        var updated = false;
        var pubsub = new PubSub();
        pubsub.subscribe('myEvent', function(){ updated = true });
        pubsub.publish("myEvent");
        expect(updated).toBe(true);
    });
    it('subscribed functions can take parameters passed by the publisher', function(){
        var updated = 'old value';
        var pubsub = new PubSub();
        pubsub.subscribe('myEvent', function(value){ updated = value });
        pubsub.publish("myEvent", 'a new value');
        expect(updated).toBe('a new value');
    });
});