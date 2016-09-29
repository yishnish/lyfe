function Thing(clazz){
    this.MAX_VITALITY = 100;
    this.MAX_HP = 100;
    this.hp = 100;
    this.vitality = 100;
    this.dead = false;
    this.age = 0;
    this.tagged = false;
    this.clazz = clazz;
}

(function(){
    Thing.prototype.behaviors = [];

    Thing.prototype.addBehavior = function(behavior){
        this.behaviors.push(behavior);
    };

    Thing.prototype.removeBehavior = function(behavior){
        var index = this.behaviors.findIndex(function(ohBehave){
            return ohBehave.name === behavior.name;
        });
        if(index !== -1){
            this.behaviors.splice(index, 1);
        }
    };

    Thing.prototype.getClazz = function(){
        return this.clazz;
    };

    Thing.prototype.tag = function(){
        this.tagged = true;
    };

    Thing.prototype.isTagged = function(){
        return this.tagged;
    };

    Thing.prototype.toggleTagged = function(){
        this.tagged = !this.tagged;
    };

    Thing.prototype.mixin = function(mixinClass){
        for(var methodName in mixinClass.prototype){
            this[methodName] = mixinClass.prototype[methodName];
        }
    };

    Thing.prototype.removeMixin = function(mixinClass){
        for(var methodName in mixinClass.prototype){
            this[methodName] = undefined;
        }
    };

    Thing.prototype.takeTurn = function(turnContext){
        if(!this.behave(turnContext)){
            this.doYourTurnThings(turnContext);
        }
        this.adjustHealthBasedOnVitality.call(this, turnContext);
        decrementVitality.call(this);
        this.age++;
    };

    Thing.prototype.behave = function(turn){
        return this.behaviors.some(function(behavior){
            return behavior.behave(turn);
        });
    };

    Thing.prototype.die = function(turnContext){
        this.dead = true;
    };

    Thing.prototype.doYourTurnThings = function(turn){
    };

    Thing.prototype.newInstance = function(){
        return new (this.getClazz())();
    };

    Thing.prototype.adjustHealthBasedOnVitality = function(turn){
        if(this.vitality === 0){
            this.hp = Math.max(0, this.hp - 10);
        } else if(this.vitality === this.MAX_VITALITY){
            this.hp = Math.min(this.MAX_HP, this.hp + 10);
        }
        if(this.hp <= 0){
            this.die(turn);
        }
    };

    function decrementVitality(){
        this.vitality = Math.max(this.vitality - 10, 0);
    }
})();