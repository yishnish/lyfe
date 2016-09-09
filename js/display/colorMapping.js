var ColorMapping = (function(){
    var mapping;

    function createNewMapping(){
        var colorMap = new Map();
        colorMap.set(Cow, 'brown');
        colorMap.set(Wolf, 'blue');
        colorMap.set(PolarBear, 'yellow');
        colorMap.set(Civet, 'red');
        colorMap.set(FruitBush, 'green');
        colorMap.set('empty', 'white');
        return {
            colorFor: function(thing){
                if(!thing){
                    return colorMap.get('empty');
                }
                return colorMap.get(thing.getType());
            }
        };
    }

    return function(){
        if(!mapping){
            mapping = createNewMapping();
        }
        return mapping;
    };
})();