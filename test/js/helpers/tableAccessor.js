function TableAccessor(table){

    this.cellAt = function (row, col) {
        return table.rows[row].cells[col];
    };

    this.cellColorAt = function(row, col) {
        return this.cellAt(row, col).getAttribute("color");
    };

    this.classes = function(row, col){
        return this.cellAt(row, col).classList;
    };

    this.rows = function () {
        return table.rows.length;
    };

    this.columns = function () {
        return table.rows[0].cells.length;
    };
}