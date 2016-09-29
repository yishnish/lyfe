function Cow(){
    Animal.call(this, Cow);
}

Cow.prototype = Object.create(Animal.prototype);
Cow.prototype.constructor = Cow;
Cow.prototype.behaviors = [];

Cow.prototype.addBehavior((new Behavior('birthing')).addTrait(new GivesBirth()));
Cow.prototype.addBehavior((new Behavior('copulates')).addTrait(new HasSex()));
Cow.prototype.addBehavior((new Behavior('diet')).addTrait(new EatsVegetables()));
Cow.prototype.addBehavior((new Behavior('moves')).addTrait(new MovesAround()));
Cow.prototype.mixin(Food);

