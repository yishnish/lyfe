function Wolf(){
    Animal.call(this, Wolf);
}

(function(){
    Wolf.prototype = Object.create(Animal.prototype);
    Wolf.prototype.constructor = Wolf;
    Wolf.prototype.behaviors = [];

    Wolf.prototype.addBehavior(new Behavior('birthing').addAction(new GivesBirth()));
    Wolf.prototype.addBehavior(new Behavior('copulates').addAction(new HasSex()));
    Wolf.prototype.addBehavior(new Behavior('carnivore').addAction(new EatsMeat()));
    Wolf.prototype.addBehavior(new Behavior('moves').addAction(new MovesAround()));
    Wolf.prototype.mixin(Food);
})();