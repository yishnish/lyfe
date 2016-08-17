describe('FruitBushes', function () {
    var fruitBush, creature;
    beforeEach(function () {
        fruitBush = new FruitBush();
        creature = new Cow();
    });
    describe("being eaten", function () {
        it("should lower the fruitBush's health by one", function () {
            var initialHealth = fruitBush.hp;
            creature.eat(fruitBush);
            expect(fruitBush.hp).toEqual(initialHealth - 1);
        });
    });
    describe('Death', function () {
        it('should die when health reaches zero', function () {
            spyOn(fruitBush, 'die');
            fruitBush.hp = 1;
            creature.eat(fruitBush);
            expect(fruitBush.die).toHaveBeenCalled();
        });
    });
    describe('health replenishment', function () {
        it('should increase every turn', function(){
            var world = new World([[fruitBush]]);
            fruitBush.hp = 1;
            world.turn();
            expect(fruitBush.hp).toEqual(2);
        })
    });
});