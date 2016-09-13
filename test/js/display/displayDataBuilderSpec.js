describe("display data builders", function(){
    it("should be able to build table data with an id", function(){
        var tdBuilder = new DisplayDataBuilder();
        var tableData = tdBuilder.withId("myId").build();
        expect(tableData.id).toEqual("myId");
    });
    it('can have an initial value set', function(){
        var initialValue = 'hi mom';
        var tdBuilder = new DisplayDataBuilder();
        var td = tdBuilder.withInitialValue(initialValue).build();
        expect(td.innerHTML).toMatch(initialValue);
    });
    it('can have an initial value set by a function', function(){
        var initialValue = 'hi mom';
        var tdBuilder = new DisplayDataBuilder();
        var td = tdBuilder.withInitialValue(function(){
            return initialValue;
        }).build();
        expect(td.innerHTML).toMatch(initialValue);
    });
    it('can subscribe to events', function(){
        var pubsub = PubSub();
        var called = false;
        var tdBuilder = new DisplayDataBuilder();
        var td = tdBuilder.subscribe('update-dammit', function(){
            called = true;
        }).build();
        pubsub.publish('update-dammit');
        expect(called).toBe(true);
    });
});
