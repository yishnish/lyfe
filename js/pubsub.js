function PubSub(){
    var topics = {};

    this.subscribe = function(topic, fun){
        topics[topic] = topics[topic] || [];
        topics[topic].push(fun);
    };

    this.publish  = function(topic, args){
        if(topics[topic]){
            for(let fun of topics[topic]){
                fun(args);
            }
        }
    };
}