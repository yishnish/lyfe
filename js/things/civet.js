function Civet(){
    Animal.call(this, Civet);
}

(function(){
    Civet.prototype = Object.create(Animal.prototype);
    Civet.prototype.constructor = Civet;
    Civet.prototype.behaviors = [];

    Civet.prototype.addBehavior((new Behavior('birthing')).addAction(new GivesBirth()));
    Civet.prototype.addBehavior((new Behavior('copulates')).addAction(new HasSex()));
    Civet.prototype.addBehavior((new Behavior('diet')).addAction(new EatsEverything()));
    Civet.prototype.addBehavior((new Behavior('moves')).addAction(new MovesAround()));
    Civet.prototype.mixin(Food);
})();