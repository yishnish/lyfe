function MyThing() {
    Thing.call(this, MyThing);
}

MyThing.prototype = Object.create(Thing.prototype);
MyThing.prototype.constructor = MyThing;

MyThing.prototype.newInstance = function () {
    return new MyThing();
};
