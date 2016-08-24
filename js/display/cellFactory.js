var CellFactory = {
    createCell : function(node, thingsDetails) {
        var td = document.createElement("td");
        preventDefaultContextMenu();
        hilightOnMouseover();
        handleMouseClicks();

        var stats;
        function handleMouseClicks() {
            td.onmousedown = function (event) {
                if (event.button === 0) {
                    stats = thingsDetails.display();
                    td.appendChild(stats);
                } else if (event.button === 2) {
                    td.classList.toggle('temp-highlight');
                    node.toggleTag();
                }
                return false;
            };
        }

        function hilightOnMouseover() {
            td.onmouseover = function () {
                td.classList.add('highlight');
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
        function preventDefaultContextMenu() {
            document.oncontextmenu = function () {
                return false;
            };
        }
        return td;
    }
};