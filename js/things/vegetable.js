function Vegetable(clazz){
    Thing.call(this, clazz);
}

Vegetable.prototype = Object.create(Thing.prototype);
Vegetable.prototype.constructor = Vegetable;


