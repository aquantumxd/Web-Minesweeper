const grid = document.getElementById("grid");

// Shows all mines.
let cheatActivated = false;

let lockGame = false;

let rows = 10;
let columns = 10;
let mines = 20;

generateGrid();

function generateGrid(){
    lockGame = false;
    grid.innerHTML = "";
    for(var x = 0; x < rows; x++){
        row = grid.insertRow(x);
        for(var y = 0; y < columns; y++){
            cell = row.insertCell(y);
            cell.onclick = function () { checkCell(this); };
            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }

    insertMines();
}

function insertMines(){
    for(var i = 0; i < mines; i++) {
        let mineInserted = false;
        while(!mineInserted){
            var row = Math.floor(Math.random() * rows);
            var column = Math.floor(Math.random() * columns);
            var cell = grid.rows[row].cells[column];

            if (cell.getAttribute("mine") == "true") {
                break;
            }
            
            if (cheatActivated) {
                cell.innerHTML = "X";
            }

            cell.setAttribute("mine", "true");
            mineInserted = true;
        }
    }
}

function showMines() {
    for(var x = 0; x < rows; x++) {
        for(var y = 0; y < columns; y++) {
            var cell = grid.rows[x].cells[y];
            if(cell.getAttribute("mine") == "true") {
                cell.className = "mine";
            }
        }
    }
}

function checkGameComplete(){
    var gameComplete = true;
    for(var x = 0; x < rows; x++){
        for(var y = 0; y < columns; y++){
            if((grid.rows[x].cells[y].getAttribute("mine") == "false") && 
               (grid.rows[x].cells[y].getAttribute("class") == null)){
                gameComplete = false;
            }
        }
    }
    if (gameComplete){
        showMines();
        alert("Victory!");
    }
}

function checkCell(cell){
    if (lockGame) {
        return;
    }

    if (cell.getAttribute("mine") == "true") {
        lockGame = true;
        showMines();
        return;
    }

    cell.className = "active";

    var mineCount = 0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;

    for(var x = Math.max(cellRow - 1, 0); x <= Math.min(cellRow + 1, 9); x++) {
        for(var y = Math.max(cellCol - 1, 0); y <= Math.min(cellCol + 1, 9); y++) {
            if(grid.rows[x].cells[y].getAttribute("mine") == "true"){
                mineCount++;
            }
        }
    }
    
    if(mineCount != 0){
        cell.innerHTML = mineCount;
    }
    
    if(mineCount == 0){
        for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++){
            for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++){
                if(grid.rows[i].cells[j].getAttribute("class") == null){
                    checkCell(grid.rows[i].cells[j]);
                }
            }
        }
    }

    checkGameComplete();
}
