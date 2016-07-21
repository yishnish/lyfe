/**
 maybe visualizer does something like take a 2d array of objects that have
 an attribute that is like "iAmA" which says they are a type of creature
 then visualizer colors all the cells with their corresponding color
 maybe color comes from a color mapping somewhere

 */
function Visualizer(world, colorMapping) {
    var nodes, nodeHTML;

    init.apply(this);

    this.thingAt = function (row, col) {
        return this.getDataNodes()[row][col];
    };

    this.getDisplayHtml = function () {
        return nodeHTML;
    };

    this.getDataNodes = function () {
        return nodes;
    };

    this.update = function () {
        world.getGrid().forEach(function (row, rowNum) {
            row.forEach(function (col, colNum) {
                nodes[rowNum][colNum].setColor(colorMapping[col.iAmA]);
            });
        });
    };

//private
    function init(){
        validate();
        var nodeStuff = createNodeStuff();
        nodes = nodeStuff.nodeCollection;
        nodeHTML = nodeStuff.nodeHTML;
        world.onChange(this, function () {
            this.update();
        });
    }

    function validate(){
        validateColorMapping();
    }

    function createNodeStuff(){
        var tableNode  = document.createElement("table");
        tableNode.setAttribute("id", "the-world");
        var nodeCollection = [];

        world.getGrid().forEach(function (row) {
            var r = [];
            var rowNode = document.createElement("tr");
            row.forEach(function (col) {
                var worldNode = new WorldNode();
                worldNode.setColor(colorMapping[col.iAmA]);
                var tdNode = worldNode.getTableCell();
                rowNode.appendChild(tdNode);
                r.push(worldNode);
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
}
