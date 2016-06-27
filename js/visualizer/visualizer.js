/**
 maybe visualizer does something like take a 2d array of objects that have
 an attribute that is like "iAmA" which says they are a type of creature
 then visualizer colors all the cells with their corresponding color
 maybe color comes from a color mapping somewhere

 */
function Visualizer(world, colorMapping) {
    var nodes, nodeHTML;

    init();

    this.thingAt = function (row, col) {
        return this.getNodes()[row][col];
    };

    this.getDisplay = function () {
        return {rows: world.length, columns: world[0].length};
    };

    this.getNodes = function () {
        return nodes;
    };

//private

    function init(){
        validateDataShape();
        validateColorMapping();
        var nodeStuff = createNodeStuff();
        nodes = nodeStuff.nodeCollection;
        nodeHTML = nodeStuff.nodeHTML;
    }

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
                r.push(new WorldNode(tdNode));
            });
            tableNode.appendChild(rowNode);
            nodeCollection.push(r);
        });
        return {nodeHTML: tableNode, nodeCollection: nodeCollection};
    }

    function validateColorMapping(){
        if(colorMapping === null || isEmptyObject(colorMapping)) {
            throw new Error("You need a non-empty color mapping");
        }
    }

    function isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }

    function validateDataShape() {
        var rowCount = world.length;
        if(world === null || world.length === 0) {
            throw new Error("Can't create a visualization from empty data");
        }
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
