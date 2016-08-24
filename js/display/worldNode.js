function WorldNode(colorMapping, thing){
    var td = document.createElement("td");
    var thingDetails = new ThingDetails(thing);
    setUpStatsDisplay(td);

    this.color = function () {
        return td.getAttribute("color");
    };
    this.getTableCell = function(){
        return td;
    };
    this.setContents = function(thing) {
        var color = thing ? colorMapping[thing.getTypeName()] : colorMapping.empty;
        td.setAttribute("color", color);
        thingDetails.setContents(thing);
    };
    this.setContents(thing);

    function setUpStatsDisplay(td) {
        var stats;
        td.onmouseover = function () {
            td.classList.add('highlight');
        };
        td.onmousedown = function () {
            stats = thingDetails.display();
            td.appendChild(stats);
        };
        td.onmouseout = function () {
            if(stats) {
                td.removeChild(stats);
                stats = null;

            }
            var highlighted = document.getElementsByClassName('highlight');
            for(let hilited of highlighted) {
                hilited.classList.remove('highlight');
            }
        };
    }

}
