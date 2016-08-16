function MyCreature() {
    Cow.call(this, 'whatever');
}

MyCreature.prototype = Object.create(Cow.prototype);
MyCreature.prototype.constructor = MyCreature;
