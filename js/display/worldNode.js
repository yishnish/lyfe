function WorldNode(colorMapping){
    var td = document.createElement("td");
    this.color = function () {
        return td.getAttribute("color");
    };
    this.getTableCell = function(){
        return td;
    };
    this.update = function(thing) {
        var color = thing ? colorMapping[thing.getTypeName()] : colorMapping.empty;
        td.setAttribute("color", color);
    };
}