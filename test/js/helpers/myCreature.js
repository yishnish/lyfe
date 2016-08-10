function MyCreature() {
    VegetarianCreature.call(this, 'whatever');
}

MyCreature.prototype = Object.create(VegetarianCreature.prototype);
MyCreature.prototype.constructor = MyCreature;
