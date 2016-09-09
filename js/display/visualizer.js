function Visualizer(world, colorMapping) {
    var nodes, nodeHTML;

    init.apply(this);

    this.thingAt = function (row, col) {
        return getDataNodes.call(this)[row][col];
    };

    this.getDisplay = function () {
        return nodeHTML;
    };

    this.setContents = function () {
        world.getRows().forEach(function (row, rowNum) {
            row.forEach(function (thing, colNum) {
                nodes[rowNum][colNum].setContents(thing);
            });
        });
    };

//private
    function init() {
        var nodeStuff = createNodeStuff();
        nodes = nodeStuff.nodeCollection;
        nodeHTML = nodeStuff.nodeHTML;
        world.eachTurn(this, function () {
            this.setContents();
        });
    }

    function getDataNodes() {
        return nodes;
    }

    function createNodeStuff() {
        var tableNode = document.createElement("table");
        tableNode.setAttribute("id", "the-world");
        var nodeCollection = [];
        var nodeFactory = new WorldNodeFactory(colorMapping);

        world.getRows().forEach(function (row) {
            var r = [];
            var rowNode = document.createElement("tr");
            row.forEach(function (thing) {
                var worldNode = nodeFactory.newNode(thing);
                var tdNode = worldNode.getTableCell();
                rowNode.appendChild(tdNode);
                r.push(worldNode);
            });
            tableNode.appendChild(rowNode);
            nodeCollection.push(r);
        });
        return {nodeHTML: tableNode, nodeCollection: nodeCollection};
    }

    function isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }
}
