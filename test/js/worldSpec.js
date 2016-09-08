describe("A World", function(){
    var dataGrid, world;
    beforeAll(function(){
        jasmine.addMatchers(customMatchers);
    });
    beforeEach(function(){
        dataGrid = [[new Cow()]];
        world = new World(dataGrid);
    });
    describe('basic benchmark', function(){
        //this adds a few seconds onto the build time so dont always run it. also these time are arbitrary and
        //will vary based on machine running the tests so take it with a grain of cyanide
        xit('should turn at at least a given rate', function(){
            var gridsize = 100;
            const ACCEPTABLE_CHROME_TIME = 300;
            const ACCEPTABLE_FF_TIME = 100;
            dataGrid = new Array(gridsize);
            for(let i = 0; i < gridsize; i++){
                dataGrid[i] = new Array(gridsize);
                for(let j = 0; j < gridsize; j++){
                    dataGrid[i][j] = new Cow();
                }
            }
            var world = new World(dataGrid);
            var start, end;
            var starts = [], ends = [];
            for(let t =0; t < 10; t++){
                start = Date.now();
                world.turn();
                end = Date.now();
                starts.push(start);
                ends.push(end);
            }
            var totalDifferences = ends.reduce(function(prev, curr, indx){
                return prev + curr - starts[indx];
            }, 0);
            var averageDiff = totalDifferences/starts.length;
            if(window.chrome){
                expect(averageDiff).toBeLessThan(ACCEPTABLE_CHROME_TIME);
            }
            if(typeof InstallTrigger === 'object'){
                expect(averageDiff).toBeLessThan(ACCEPTABLE_FF_TIME);
            }
        });
    });

    describe("validations", function(){
        it('should fail when there is no data', function(){
            expect(function(){
                new World();
            }).toThrowError("Can't create a world from empty data");
        });
        it('should fail when there is empty data', function(){
            expect(function(){
                new World([]);
            }).toThrowError("Can't create a world from empty data");
        });
        it("should fail when the data isn't rectangular", function(){
            expect(function(){
                new World(
                    [
                        [new Cow(), new Cow()],
                        [new Cow()]
                    ]);
            }).toThrowError("Can't create a non-rectangular world");
        });
    });
    describe('callbacks', function(){
        var thing;
        beforeEach(function(){
            thing = {value: null, otherValue: null};
        });

        it('performs a callback on a registered object', function(){
            world.eachTurn(thing, function(){
                this.value = 69;
                this.otherValue = 2;
            });
            world.turn();
            expect(thing.value).toEqual(69);
        });
        it('performs multiple callbacks on a registered listener', function(){
            world.eachTurn(thing, function(){
                this.value = 69;
            });
            world.eachTurn(thing, function(){
                this.otherValue = 42;
            });
            world.turn();
            expect(thing.value).toEqual(69);
            expect(thing.otherValue).toEqual(42);
        });
        it('performs callbacks on multiple listeners', function(){
            var otherThing = {value: null};
            world.eachTurn(thing, function(){
                this.value = 69;
            });
            world.eachTurn(otherThing, function(){
                this.value = 42;
            });
            world.turn();
            expect(thing.value).toEqual(69);
            expect(otherThing.value).toEqual(42);
        });
    });
    describe('notifications', function(){
        it('publishes an event after turning', function(){
            var pubsub = PubSub();
            spyOn(pubsub, 'publish');
            var world = new World([[]]);
            world.turn();
            expect(pubsub.publish).toHaveBeenCalledWith('turned');
        });
        it('publishes an event when adding a thing', function(){
            var pubsub = PubSub();
            spyOn(pubsub, 'publish');
            var world = new World([[]]);
            var thing = new Thing(Thing);
            world.add(thing, new Coordinates(0, 0));
            expect(pubsub.publish).toHaveBeenCalledWith('thing-added', thing.getTypeName());
        });
        it('publishes an event when removing a thing', function(){
            var pubsub = PubSub();
            spyOn(pubsub, 'publish');
            var thing = new Thing(Thing);
            var world = new World([[thing]]);
            world.remove(0, 0);
            expect(pubsub.publish).toHaveBeenCalledWith('thing-removed', thing.getTypeName());
        });
    });
    describe("Contents", function(){
        it('should tell you what is at a location', function(){
            var world = new World(
                [
                    [new Cow(), new Cow()],
                    [new Cow(), null]
                ]);
            expect(world.thingAt(0, 0)).toBeACow();
            expect(world.thingAt(1, 1)).toBeNull();
        });
        describe("activating Things that live in it", function(){
            it('should notifiy Things when they can move', function(){
                var thing = new Cow();
                var world = new World(
                    [
                        [thing, null],
                        [null, null]
                    ]);
                spyOn(thing, 'takeTurn').and.callThrough();
                world.turn();

                expect(thing.takeTurn).toHaveBeenCalled();
            });
        });
        describe("moving contents", function(){
            it('should move a Thing to another requested location', function(){
                var thing1 = new Cow();
                var thing2 = new Cow();
                var thing3 = new Cow();
                var world = new World(
                    [
                        [thing1, thing2],
                        [thing3, null]
                    ]);
                world.move(new Coordinates(0, 0), new Coordinates(1, 1));
                expect(world.thingAt(0, 0)).toBeNull();
            });
        });
        describe('removing Things', function(){
            it('should let you remove things', function(){
                var thing = new Cow();
                var world = new World(
                    [
                        [thing]
                    ]);
                world.remove(0, 0);
                expect(world.thingAt(0, 0)).toBeNull();
            });
            it('should be able to be cleared of all contents', function(){
                var world = new World([
                    [new Cow(), new Wolf()]
                ]);
                expect(world.thingAt(0, 0)).toBeACow();
                expect(world.thingAt(0, 1)).toBeAWolf();
                world.clear();
                expect(world.thingAt(0, 0)).toBeNull();
                expect(world.thingAt(0, 1)).toBeNull();
            });
        });
        describe('adding Things', function(){
            it('should let you add things', function(){
                var thing = new Cow();
                var world = new World(
                    [
                        [null]
                    ]);
                world.add(thing, new Coordinates(0, 0));
                expect(world.thingAt(0, 0)).not.toBeNull();
            });
            it('should raise an error if you try to add a thing where there already is a thing', function(){
                var thing1 = new Cow();
                var thing2 = new Cow();
                var world = new World(
                    [
                        [thing1]
                    ]);
                expect(function(){
                    world.add(thing2, new Coordinates(0, 0));
                }).toThrowError();
            });
        });
    });
});