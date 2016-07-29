var customMatchers = {

    toBeSameCoordinates: function (util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                var result = {pass: false};
                if(actual.getRow() === expected.getRow() && actual.getColumn() === expected.getColumn()) {
                    result.pass = true;
                }else{
                    result.message = 'Expected (row: ' + actual.getRow() + ', col: ' + actual.getColumn() +
                        ') to be (row: ' + expected.getRow() + ', col: ' + expected.getColumn() + ')';
                }
                return result;
            }
        }
    }
};