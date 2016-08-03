describe("Creatures", function () {
    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
    });

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
    });
    describe("type awareness", function () {
        it('should know what type of thing it is', function () {
            var thing = new Creature('vole');
            expect(thing.iAmA).toEqual('vole');
        });
    });

    describe("Well being", function () {
        var creature;

        beforeEach(function () {
            creature = new Creature();
        });

        it('has health', function () {
            expect(creature.hp).toBeDefined();
        });
        it('has vitality', function () {
            expect(creature.vitality).toBeDefined();
        });
        it('loses vitality every turn', function () {
            var dataGrid = [
                [creature, null]
            ];
            var world = new World(dataGrid);
            creature.vitality = 10;
            world.turn();
            expect(creature.vitality).toBe(9);
        });
        it('loses health every turn once its vitality reaches zero', function () {
            var dataGrid = [
                [creature, null]
            ];
            var world = new World(dataGrid);
            creature.hp = 10;
            creature.vitality = 1;
            world.turn();
            expect(creature.vitality).toBe(0);
            expect(creature.hp).toBe(10);
            world.turn();
            expect(creature.vitality).toBe(0);
            expect(creature.hp).toBe(9);
        });
        it('gains health every turn once its vitality reaches maximum', function () {
            var dataGrid = [
                [creature]
            ];
            var world = new World(dataGrid);
            creature.hp = 1;
            creature.vitality = 9;
            world.turn();
            expect(creature.vitality).toBe(8);
            expect(creature.hp).toBe(1);
            creature.vitality = 10;
            world.turn();
            expect(creature.hp).toBe(2);
            world.turn();
            expect(creature.vitality).toBe(8);
            expect(creature.hp).toBe(2);
        });
        describe("Eating", function () {
            var food, creature;
            beforeEach(function () {
                food = new Food();
                creature = new Creature('bird');
            });
            it('should raise vitality by one when eating food', function () {
                var startingVitality = creature.vitality;
                creature.vitality--;
                expect(creature.vitality).toEqual(startingVitality - 1);
                creature.eat(food);
                expect(creature.vitality).toEqual(startingVitality);

            });
            it('should eat food if food is adjacent and vitality is less than full', function () {
                var world = new World([
                    [food, creature]
                ]);
                spyOn(creature, 'eat');
                world.turn();
                expect(creature.eat).not.toHaveBeenCalled();
                creature.vitality--;
                world.turn();
                expect(creature.eat).toHaveBeenCalled();
            });
        });
    });

    describe("Death", function () {
        it('Things should be removed from the world when their health reaches zero', function () {
            var thing = new Creature('bird');

            var dataGrid = [
                [thing]
            ];
            var world = new World(dataGrid);
            thing.hp = 1;
            thing.vitality = 0;
            world.turn();//this kills the thing
            world.turn();//this removes the thing
            expect(world.thingAt(0, 0)).toBeNull();
        });
    });

    describe("porking", function () {
        it('two adjacent creatures should create a new creature if their vitality is full', function () {
            var thing1 = new Creature('bird');
            var thing2 = new Creature('vole');

            var dataGrid = [
                [thing1, thing2, null]
            ];

            var world = new World(dataGrid);

            world.turn();

            expect(world.thingAt(0, 0)).toBeACreature();
            expect(world.thingAt(0, 1)).toBeACreature();
            expect(world.thingAt(0, 2)).toBeACreature();
        });

        it('two adjacent creatures should not create a new creature if their vitality is not full', function () {
            var thing1 = new Creature('bird');
            var thing2 = new Creature('vole');

            var dataGrid = [
                [thing1, thing2]
            ];

            var world = new World(dataGrid);
            spyOn(thing2, 'getHumped');

            thing1.vitality -= 1;
            world.turn();
            expect(thing2.getHumped).not.toHaveBeenCalled();

            thing1.vitality = Creature.MAX_VITALITY;
            thing2.vitality = Creature.MAX_VITALITY;
            world.turn();
            expect(thing2.getHumped).toHaveBeenCalled();
        });
    });
});