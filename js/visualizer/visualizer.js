/**
 maybe visualizer does something like take a 2d array of objects that have
 an attribute that is like "iAmA" which says they are a type of creature
 then visualizer colors all the cells with their corresponding color
 maybe color comes from a color mapping somewhere

 */
function Visualizer(world, colorMapping) {
    var nodeStuff = createNodeStuff();
    var nodes = nodeStuff.nodeCollection;
    var nodeHTML = nodeStuff.nodeHTML;

    validateDataShape();

    this.thingAt = function (x, y) {
        return {color: null};
    };

    this.update = function () {
    };

    this.getDisplay = function () {
        return {rows: world.length, columns: world[0].length};
    };

//private

    function createNodeStuff(){
        var tableNode  = document.createElement("table");
        var nodeCollection = [];

        world.forEach(function (row) {
            var r = [];
            var rowNode = document.createElement("tr");
            row.forEach(function (col) {
                var tdNode = document.createElement("td");
                tdNode.setAttribute("color", colorMapping[col.iAmA]);
                rowNode.appendChild(tdNode);
                r.push(tdNode)
            });
            tableNode.appendChild(rowNode);
            nodeCollection.push(r);
        });

        return {nodeHTML: tableNode, nodeCollection: nodeCollection};
    }

    function validateDataShape() {
        var rowCount = world.length;
        if (rowCount > 0) {
            var colCount = world[0].length;
            world.forEach(function (row) {
                if (row.length !== colCount) {
                    throw new Error("Non rectangular world");
                }
            });
        }
    }
}
