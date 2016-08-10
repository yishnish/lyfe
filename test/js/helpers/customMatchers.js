var customMatchers = {

    toBeSameCoordinates: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {pass: false};
                if (actual.getRow() === expected.getRow() && actual.getColumn() === expected.getColumn()) {
                    result.pass = true;
                } else {
                    result.message = 'Expected (row: ' + actual.getRow() + ', col: ' + actual.getColumn() +
                        ') to be (row: ' + expected.getRow() + ', col: ' + expected.getColumn() + ')';
                }
                return result;
            }
        }
    },

    toBeACreature: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {pass: false};
                if (actual instanceof VegetarianCreature) {
                    result.pass = true;
                } else {
                    result.message = 'Expected a creature';
                }
                return result;
            }
        }

    },

    toBeAFruitBush: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {pass: false};
                if (actual instanceof FruitBush) {
                    result.pass = true;
                } else {
                    result.message = 'Expected a FruitBush';
                }
                return result;
            }
        }

    }
};