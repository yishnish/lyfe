function WorldNode(colorMapping, thing){
    this.thing = thing;
    this.colorMapping = colorMapping;
    this.thingDetails = new ThingDetails(thing);
    this.td = CellFactory.createCell(this, this.thingDetails);
    this.setContents(thing);
}

(function(){
    WorldNode.prototype.color = function () {
        return this.td.getAttribute("color");
    };
    WorldNode.prototype.getTableCell = function(){
        return this.td;
    };
    WorldNode.prototype.setContents = function(thing) {
        this.td.classList.remove('temp-highlight');
        if(thing && thing.isTagged()) {
            this.td.classList.add('tagged');
        }else{this.td.classList.remove('tagged');}

        var color = this.colorMapping.colorFor(thing);
        this.td.setAttribute("color", color);
        this.thingDetails.setContents(thing);
    };
    WorldNode.prototype.toggleTagged = function () {
        if(this.thing) {
            this.thing.toggleTagged();
        }
    };
})();
    

