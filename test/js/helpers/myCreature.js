function MyCreature() {
    Cow.call(this);
}

MyCreature.prototype = Object.create(Cow.prototype);
MyCreature.prototype.constructor = MyCreature;
