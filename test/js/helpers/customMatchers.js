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

    toBeACow: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {pass: false};
                if (actual instanceof Cow) {
                    result.pass = true;
                } else {
                    result.message = 'Expected a cow';
                }
                return result;
            }
        }

    },

    toBeAWolf: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {pass: false};
                if (actual instanceof Wolf) {
                    result.pass = true;
                } else {
                    result.message = 'Expected a wolf got a ' + actual.constructor.name;
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