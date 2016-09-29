function PolarBear(){
    Animal.call(this, PolarBear);
}

(function(){
    PolarBear.prototype = Object.create(Animal.prototype);
    PolarBear.prototype.constructor = PolarBear;
    PolarBear.prototype.behaviors = [];

    PolarBear.prototype.addBehavior(new Behavior('birthing').addAction(new GivesBirth()));
    PolarBear.prototype.addBehavior(new Behavior('copulates').addAction(new HasSex()));
    PolarBear.prototype.addBehavior(new Behavior('diet').addAction(new CannibalDiet()));
    PolarBear.prototype.addBehavior(new Behavior('moves').addAction(new MovesAround()));
    PolarBear.prototype.mixin(Food);
})();