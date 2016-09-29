function Cow(){
    Animal.call(this, Cow);
}

Cow.prototype = Object.create(Animal.prototype);
Cow.prototype.constructor = Cow;
Cow.prototype.behaviors = [];

Cow.prototype.addBehavior((new Behavior('birthing')).addTrait(new GivesBirth()));
Cow.prototype.addBehavior((new Behavior('copulates')).addTrait(new HasSex()));
Cow.prototype.addBehavior((new Behavior('diet')).addTrait(new EatsVegetables()));
Cow.prototype.mixin(Food);
Cow.prototype.mixin(Moves);

Cow.prototype.doYourTurnThings = function(turn){
    this.moveIfPossible.call(this, turn);
};

Cow.prototype.eat = function(food){
    this.vitality += 20;
    food.getEaten();
};
