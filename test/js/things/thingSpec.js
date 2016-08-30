/**
 * philosophy stuff. does a thing know wabout the world? if i'm a thing and i want to move somewhere do i ask the
 * world if there is stuff there? i think so. i don't negotiate with the world about the location of objects, i
 * query it with my senses and determine whether there's stuff where i want to be. so i guess Things know about the
 * World. but maybe just when the world tells the thing it can do something? "ok, you can do a thing now, here's me if
 * you need any info about me"
 */
describe("Things", function () {
    describe("type awareness", function () {
        it('should know what type of thing it is', function () {
            var thing = new Thing(Thing);
            expect(thing.getType()).toEqual(Thing);
        });
    });

    describe("Well being", function () {
        var thing;

        beforeEach(function () {
            thing = new Thing(Thing);
        });

        it('has health', function () {
            expect(thing.hp).toBeDefined();
        });
        it('has vitality', function () {
            expect(thing.vitality).toBeDefined();
        });
        it('loses health every turn once its vitality reaches zero', function () {
            var dataGrid = [
                [thing, null]
            ];
            var world = new World(dataGrid);
            thing.hp = 100;
            thing.vitality = 0;
            world.turn();
            expect(thing.hp).toBe(90);
            world.turn();
            expect(thing.hp).toBe(80);
        });
    });

    describe("age", function () {
        it('should know how old it is', function () {
            var thing = new Thing(Thing);
            expect(thing.age).toBe(0);
            var world = new World([[thing]]);
            var turnContext = new TurnContext(world, thing, new Coordinates(0, 0));
            thing.takeTurn(turnContext);
            expect(thing.age).toBe(1);
        });
    });

    describe("Life and Death", function () {
        it('Things should be removed from the world when their health reaches zero', function () {
            var thing = new Thing(Thing);

            var dataGrid = [
                [thing]
            ];
            var world = new World(dataGrid);
            thing.vitality = 0;
            thing.hp = 1;
            world.turn(); //this kills the thing
            world.turn(); //this removes the thing
            expect(world.thingAt(0, 0)).toBeNull();
        });
    });

    describe("tracking beasts", function () {
        it('beast should be able to be tagged for tracking', function () {
            var thing = new Thing(Thing);
            thing.tag();
            expect(thing.isTagged()).toBe(true);
        });
    });

    describe("mixins", function () {
        function MyMixin() { }

        MyMixin.prototype.foo = function () {
            return 'foo';
        };

        it('should be able to have behaviors mixed in', function () {
            var thing = new Thing(Thing);
            thing.mixin(MyMixin);
            expect(thing.foo()).toEqual('foo');
        });

        it('should be able to remove mixins', function () {
            var thing = new Thing(Thing);
            thing.mixin(MyMixin);
            expect(thing.foo()).toEqual('foo');
            thing.removeMixin(MyMixin);
            expect(thing.foo).toBeUndefined();
        });
    });

});