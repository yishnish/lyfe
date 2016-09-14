describe("DisplayRowBuilder", function(){
    it('should let you create a row', function(){
        var builder = new DisplayRowBuilder();
        expect(builder.createRow().build().tagName).toBe("TR");
    });
    it('should be optional to have a row label', function(){
        var builder = new DisplayRowBuilder();
        expect(function(){
            builder.createRow().build();
        }).not.toThrow();
    });
    it('should be optional to have row data', function(){
        var builder = new DisplayRowBuilder();
        expect(function(){
            builder.createRow().addRowLabel('hi-mom').build();
        }).not.toThrow();
    });
    it('should let you add a data column', function(){
        var builder = new DisplayRowBuilder();
        var column = new DisplayDataBuilder().withId('hi').withInitialValue('top secret data');
        var row = builder.createRow().addData(column).build();
        expect(row.querySelector("#hi").innerHTML).toMatch('top secret data');
    });
    it('should let you add multiple data columns', function(){
        var builder = new DisplayRowBuilder();
        var columnOne = new DisplayDataBuilder().withId('hi').withInitialValue('data 1');
        var columnTwo = new DisplayDataBuilder().withId('hi2').withInitialValue('data 2');
        var row = builder.createRow().addData(columnOne).addData(columnTwo).build();
        expect(row.querySelector("#hi").innerHTML).toMatch('data 1');
        expect(row.querySelector("#hi2").innerHTML).toMatch('data 2');
    });
});