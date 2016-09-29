function Behavior(name){
    this.actions = [];
    this.name = name;
}

Behavior.prototype.addAction = function(trait){
    this.actions.push(trait);
    return this;
};

Behavior.prototype.behave = function(turn){
    return this.actions.some(function(trait){
        return trait.act(turn);
    });
};
