function MyThing() {
    Thing.call(this, 'whatever');
}

MyThing.prototype = Object.create(Thing.prototype);
MyThing.prototype.constructor = MyThing;

MyThing.prototype.newInstance = function () {
    return new MyThing();
};
