function Behavior(name){
    this.traits = [];
    this.name = name;
}

Behavior.prototype.addTrait = function(trait){
    this.traits.push(trait);
    return this;
};

Behavior.prototype.behave = function(turn){
    return this.traits.some(function(trait){
        return trait.act(turn);
    });
};
