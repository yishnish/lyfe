function Animal(clazz){
    Thing.call(this, clazz);
}

Animal.prototype = Object.create(Thing.prototype);
Animal.prototype.constructor = Animal;


