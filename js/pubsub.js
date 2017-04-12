var PubSub = (function(){
    var pubsub;

    function init(){
        pubsub = {};
        var topics = {};
        pubsub.subscribe = function(topic, fun){
            topics[topic] = topics[topic] || [];
            topics[topic].push(fun);
        };

        pubsub.publish = function(topic, args){
            if(topics[topic]){
                for(var fun of topics[topic]){
                    fun(args);
                }
            }
        };
    }

    return function(){
        if(!pubsub){
            init();
        }
        return pubsub;
    };
})();