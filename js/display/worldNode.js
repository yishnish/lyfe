/**
 *
 * wrapper for a DOM node that gets and sets status information (just color maybe?) for a node
 * i don't think it can just be a list of colors though because nodes need to get updated so
 * that CSS can update the color on the page. So keep it as the actual Nodes created by the document
 */
function WorldNode(){
    var td = document.createElement("td");
    this.color = function () {
        return td.getAttribute("color");
    };
    this.setColor = function(color) {
        td.setAttribute("color", color);
    };
    this.getTableCell = function(){
        return td;
    };
}