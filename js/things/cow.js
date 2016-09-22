function Cow(){
    Animal.call(this, Cow);
}

Cow.prototype = Object.create(Animal.prototype);
Cow.prototype.constructor = Cow;

Cow.prototype.mixin(Birthing);
Cow.prototype.mixin(Copulates);
Cow.prototype.mixin(Vegetarian);
Cow.prototype.mixin(Food);
Cow.prototype.mixin(Moves);

Cow.prototype.doYourTurnThings = function(turn){
    var didEat, gaveBirth, didHump;
    if(this.pregnant){
        gaveBirth = this.giveBirth(turn);
    }
    if(!gaveBirth && this.vitality > 0){
        didHump = this.tryHumping(turn);
    }
    if(!gaveBirth && !didHump && this.vitality < this.MAX_VITALITY){
        didEat = this.eatIfPossible(turn);
    }
    if(!gaveBirth && !didHump && !didEat){
        this.moveIfPossible.call(this, turn);
    }
    this.maybePoopAPlant(turn);
};

Cow.prototype.eat = function(food){
    this.vitality += 20;
    food.getEaten();
};
