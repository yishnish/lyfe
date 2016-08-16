describe("Food", function () {
    var food, creature;
    beforeEach(function () {
        food = new Food();
        creature = new Cow('bird');
    });
    describe("being eaten", function () {
        it("should lower the food's health by one", function () {
            var initialHealth = food.hp;
            creature.eat(food);
            expect(food.hp).toEqual(initialHealth - 1);
        });
    });
});