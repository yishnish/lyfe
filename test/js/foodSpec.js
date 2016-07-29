describe("Food", function () {
    var food, creature;
    beforeEach(function () {
        food = new Food()
        creature = new Creature('bird');
    });
    describe("being eaten", function () {
        it("should lower the food's health by one", function () {
            var initialHealth = food.hp;
            creature.eat(food);
            expect(food.hp).toEqual(initialHealth - 1);
        });
    });
    describe('Death', function () {
        it('should die when health reaches zero', function () {
            spyOn(food, 'die');
            food.hp = 1;
            creature.eat(food);
            expect(food.die).toHaveBeenCalled();
        });
    });
});