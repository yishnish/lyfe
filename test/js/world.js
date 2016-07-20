/**
 A world contains a grid containing all the items in the world.
 You can register an object with the world and a callback to have
 called each time the world finishes a 'turn'
 */

function World(dataGrid){
    var inhabitants = dataGrid;
    var callbacks = [];

    this.getGrid = function () {
        return inhabitants;
    };
    this.onChange = function(obj, callback) {
        callbacks.push({_object : obj, _callback : callback})
    };
    this.turn = function(){
        callbacks.forEach(function (objectAndCallback) {
            objectAndCallback._callback.apply(objectAndCallback._object);
        });
    }
}