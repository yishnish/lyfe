describe("Things", function(){
    describe("type awareness", function(){
        it('should know what type of thing it is', function(){
            var thing = new Thing(Thing);
            expect(thing.getClazz()).toEqual(Thing);
        });
    });

    describe("Well being", function(){
        var thing;

        beforeEach(function(){
            thing = new Thing(Thing);
        });

        it('has health', function(){
            expect(thing.hp).toBeDefined();
        });
        it('has vitality', function(){
            expect(thing.vitality).toBeDefined();
        });
        it('loses health every turn once its vitality reaches zero', function(){
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

    describe("age", function(){
        it('should know how old it is', function(){
            var thing = new Thing(Thing);
            expect(thing.age).toBe(0);
            var world = new World([[thing]]);
            var turnContext = new TurnContext(world, thing, new Coordinates(0, 0));
            thing.takeTurn(turnContext);
            expect(thing.age).toBe(1);
        });
    });

    describe("Life and Death", function(){
        it('Things should be removed from the world when their health reaches zero', function(){
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

    describe("tracking beasts", function(){
        it('beast should be able to be tagged for tracking', function(){
            var thing = new Thing(Thing);
            thing.tag();
            expect(thing.isTagged()).toBe(true);
        });
    });

    describe("behaviors", function(){
        afterEach(function(){
            Thing.prototype.behaviors.forEach(function(it){
                Thing.prototype.removeBehavior(it)
            });
        });

        it('a thing should let you add behaviors to it', function(){
            var behavior = new Behavior('my behavior');
            Thing.prototype.addBehavior(behavior);
            expect(Thing.prototype.behaviors).toContain(behavior);
        });

        it("a thing should let you remove behaviors from it", function(){
            var behavior = new Behavior("behavior 1");
            var behavior2 = new Behavior("behavior 2");
            Thing.prototype.addBehavior(behavior);
            Thing.prototype.addBehavior(behavior2);
            expect(Thing.prototype.behaviors).toContain(behavior);
            expect(Thing.prototype.behaviors).toContain(behavior2);
            Thing.prototype.removeBehavior(behavior);
            expect(Thing.prototype.behaviors).not.toContain(behavior);
        });

        it('should execute traits associated with a behavior when it takes a turn', function(){
            var porks = new Behavior('porks');
            porks.addTrait(new HasSex());
            Thing.prototype.addBehavior(porks);

            var thing = new Thing(Thing);
            var otherThing = new Thing(Thing);

            var turn = new TurnContext(new World([[thing, otherThing]]), thing, new Coordinates(0, 0));
            thing.takeTurn(turn);
            expect(otherThing.pregnant).toBe(true);
        });

        describe("multiple behaviors", function(){
            var behaviorId = 0;
            var runs = {behave: function(){behaviorId = 1; return false;}};
            var alsoRuns = {behave: function(){behaviorId = 2; return true;}};
            var neverRuns = {behave: function(){behaviorId = 3;}};

            beforeAll(function(){
                Thing.prototype.addBehavior(runs);
                Thing.prototype.addBehavior(alsoRuns);
                Thing.prototype.addBehavior(neverRuns);

            });
            afterAll(function(){
                Thing.prototype.removeBehavior(runs);
                Thing.prototype.removeBehavior(alsoRuns);
                Thing.prototype.removeBehavior(neverRuns);
            });
            it('should stop executing behaviors when one reports success', function(){
                var thing = new Thing(Thing);
                var turn = new TurnContext(new World([[]]), thing, new Coordinates(0, 0));
                thing.takeTurn(turn);
                expect(behaviorId).toBe(2);
            });
        });

    });

    describe("mixins", function(){
        function MyMixin(){
        }

        MyMixin.prototype = Object.create(BaseBehavior.prototype);
        MyMixin.prototype.foo = function(){
            return 'foo';
        };

        it('should be able to have behaviors mixed in', function(){
            var thing = new Thing(Thing);
            thing.mixin(MyMixin);
            expect(thing.foo()).toEqual('foo');
        });

        it('should be able to remove mixins', function(){
            var thing = new Thing(Thing);
            thing.mixin(MyMixin);
            expect(thing.foo()).toEqual('foo');
            thing.removeMixin(MyMixin);
            expect(thing.foo).toBeUndefined();
        });

        it("shouldn't override its constructor with the mixin's constructor", function(){
            var thing = new Cow();
            thing.mixin(MyMixin);
            expect(thing.constructor).toBe(Cow);
        });
    });

});