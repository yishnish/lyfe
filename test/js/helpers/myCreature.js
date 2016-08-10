function MyCreature() {
    Creature.call(this, 'whatever');
}

MyCreature.prototype = Object.create(Creature.prototype);
MyCreature.prototype.constructor = MyCreature;
