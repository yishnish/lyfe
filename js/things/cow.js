function Cow(){
    Animal.call(this, Cow);
}

Cow.prototype = Object.create(Animal.prototype);
Cow.prototype.constructor = Cow;
Cow.prototype.behaviors = [];

Cow.prototype.addBehavior((new Behavior('birthing')).addAction(new GivesBirth()));
Cow.prototype.addBehavior((new Behavior('copulates')).addAction(new HasSex()));
Cow.prototype.addBehavior((new Behavior('diet')).addAction(new EatsVegetables()));
Cow.prototype.addBehavior((new Behavior('moves')).addAction(new MovesAround()));
Cow.prototype.mixin(Food);

