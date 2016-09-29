var customMatchers = {

    toBeSameCoordinates: function(util, customEqualityTesters){
        return {
            compare: function(actual, expected){
                var result = {pass: false};
                if(actual.getRow() === expected.getRow() && actual.getColumn() === expected.getColumn()){
                    result.pass = true;
                } else{
                    result.message = 'Expected (row: ' + actual.getRow() + ', col: ' + actual.getColumn() +
                        ') to be (row: ' + expected.getRow() + ', col: ' + expected.getColumn() + ')';
                }
                return result;
            }
        };
    },

    toBeACow: function(util, customEqualityTesters){
        return {
            compare: function(actual, expected){
                var result = {pass: false};
                if(actual instanceof Cow){
                    result.pass = true;
                } else{
                    result.message = 'Expected a cow, got ' + actual;
                }
                return result;
            }
        };
    },

    toBeAWolf: function(util, customEqualityTesters){
        return {
            compare: function(actual, expected){
                var result = {pass: false};
                if(actual instanceof Wolf){
                    result.pass = true;
                } else{
                    result.message = 'Expected a wolf got a ' + actual.constructor.name;
                }
                return result;
            }
        };
    },

    hasTakenTurns: function(util, customEqualityTesters){
        return {
            compare: function(worldStats, expected){
                var result = {pass: false};
                var turnCount = worldStats.getTurnCount();
                if(turnCount === expected){
                    result.pass = true;
                } else{
                    result.message = 'Expected ' + expected + ' turns to have taken place but found ' + turnCount;
                }
                return result;
            }
        };
    },
    toDisplayNumberOfTurns: function(util, customEqualityTesters){
        return {
            compare: function(statsAccessor, expected){
                var result = {pass: false};
                var turnCount = statsAccessor.getTurnCount();
                if(turnCount === expected){
                    result.pass = true;
                } else{
                    result.message = 'Expected ' + expected + ' turns to have been displayed, got ' + statsAccessor.getTurnCount();
                }
                return result;
            }
        };
    }
};