function WorldNode(colorMapping, thing){
    var thingDetails = new ThingDetails(thing);
    var td = CellFactory.createCell(this, thingDetails);
    var _thing = thing;

    this.color = function () {
        return td.getAttribute("color");
    };
    this.getTableCell = function(){
        return td;
    };
    this.setContents = function(thing) {
        _thing = thing;
        td.classList.remove('temp-highlight');
        if(thing && thing.isTagged()) {
            td.classList.add('tagged');
        }else{td.classList.remove('tagged');}

        var color = thing ? colorMapping[thing.getTypeName()] : colorMapping.empty;
        td.setAttribute("color", color);
        thingDetails.setContents(thing);
    };
    this.toggleTag = function () {
        if(_thing) {
            _thing.toggleTag();
        }
    };
    this.setContents(thing);
}
