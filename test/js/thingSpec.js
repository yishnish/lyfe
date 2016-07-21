describe("Things", function () {
    describe("type awareness", function(){
        it('should know what type of thing it is', function () {
            var thing = new Thing('vole');
            expect(thing.iAmA).toEqual('vole');
        });
    });
});