describe("Creatures", function () {
    describe("Movement", function () {
        it('should be able to move around in the world', function () {
            var creature = new Creature('bird');
            var dataGrid = [
                [creature, null]
            ];
            var world = new World(dataGrid);
            world.turn();
            expect(world.thingAt(0, 0)).toBeNull();
            expect(world.thingAt(0, 1)).toBe(creature);
        });

        it('should know that it cannot move off the map', function () {
            var creature = new Creature('bird');
            var dataGrid = [
                [creature, null, null],
                [null, null, null],
                [null, null, null]
            ];
            var world = new World(dataGrid);
            expect(creature.hasThingAt(new Coordinates(-1, 0), world)).toBe(false);
            expect(creature.hasThingAt(new Coordinates(-1, -1), world)).toBe(false);
            expect(creature.hasThingAt(new Coordinates(0, -1), world)).toBe(false);
            expect(creature.hasThingAt(new Coordinates(50, 50), world)).toBe(false);
            expect(creature.hasThingAt(new Coordinates(1, 1), world)).toBe(true);
        });
    });
    describe("type awareness", function () {
        it('should know what type of thing it is', function () {
            var thing = new Thing('vole');
            expect(thing.iAmA).toEqual('vole');
        });
    });
    describe("awareness of surroundings", function () {
        it('should know what adjacent squares are unoccupied', function () {
            var thing = new Thing('bird');
            var thing2 = new Thing('bird');
            var dataGrid = [
                [null, thing, null],
                [null, thing2, null],
                [null, null, null]
            ];
            var world = new World(dataGrid);
            expect(thing.hasThingAt(new Coordinates(0, 0), world)).toBe(true);
            expect(thing.hasThingAt(new Coordinates(0, 1), world)).toBe(false);
            expect(thing.hasThingAt(new Coordinates(1, 1), world)).toBe(false);
        });

    });

    describe("Well being", function () {
        var thing;

        beforeEach(function () {
            thing = new Thing();
        });

        it('has health', function () {
            expect(thing.hp).toBeDefined();
        });
        it('has vitality', function () {
            expect(thing.vitality).toBeDefined();
        });
        it('loses vitality every turn', function () {
            var dataGrid = [
                [thing, null]
            ];
            var world = new World(dataGrid);
            thing.vitality = 10;
            world.turn();
            expect(thing.vitality).toBe(9);
        });
        it('loses health every turn once its vitality reaches zero', function () {
            var dataGrid = [
                [thing, null]
            ];
            var world = new World(dataGrid);
            thing.hp = 10;
            thing.vitality = 1;
            world.turn();
            expect(thing.vitality).toBe(0);
            expect(thing.hp).toBe(10);
            world.turn();
            expect(thing.vitality).toBe(0);
            expect(thing.hp).toBe(9);
        });
    });

    describe("Death", function () {
        it('Things should be removed from the world when their health reaches zero', function () {
            var thing = new Thing('bird');

            var dataGrid = [
                [thing]
            ];
            var world = new World(dataGrid);
            thing.hp = 1;
            thing.vitality = 0;
            world.turn();
            expect(world.thingAt(0, 0)).toBeNull();
        });
    });
});