function FruitBush(){
    Vegetable.call(this, FruitBush);
}

(function(){
    FruitBush.prototype = Object.create(Vegetable.prototype);
    FruitBush.prototype.constructor = FruitBush;
    FruitBush.prototype.behaviors = [];
    FruitBush.prototype.addBehavior(new Behavior('regenerates').addAction(new RegeneratesVitality()));

    FruitBush.prototype.mixin(Food);
})();
