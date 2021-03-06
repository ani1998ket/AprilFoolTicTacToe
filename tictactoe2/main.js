
var N_SIZE = 5,
EMPTY = "&nbsp;",
boxes = [],
turn = "X",
score,
moves;

/*
* Initializes the Tic Tac Toe board and starts the game.
*/

let event = new CustomEvent("hello" , {a : "b"});
let click = new Event("click");
let aiMoves = 0;
let r3 = 0, c3 = 0;
function init() {
var board = document.createElement('table');
board.setAttribute("border", 1);
board.setAttribute("cellspacing", 0);

var identifier = 1;
for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
        var cell = document.createElement('td');
        cell.setAttribute('height', 120);
        cell.setAttribute('width', 120);
        cell.setAttribute('align', 'center');
        cell.setAttribute('valign', 'center');
        cell.setAttribute('id', "r" + i + "c" + j);
        if(!(i == 0 || j == 0 || i == N_SIZE - 1 || j == N_SIZE - 1 )){
            cell.style.backgroundColor = 'black' ;
            cell.addEventListener("click", set);
        }

        if((i == 0 || j == 0 || i == N_SIZE - 1 || j == N_SIZE - 1 )){
            cell.addEventListener("hello", set);
        }
        
        cell.classList.add('col' + j,'row' + i);
        if (i == j) {
            cell.classList.add('diagonal0');
        }
        if (j == N_SIZE - i - 1) {
            cell.classList.add('diagonal1');
        }
        cell.identifier = identifier;
        
        row.appendChild(cell);
        boxes.push(cell);
        identifier += identifier;
    }
}


document.getElementById("tictactoe").appendChild(board);
startNewGame();
}

/*
* New game
*/
function startNewGame() {
score = {
    "X": 0,
    "O": 0
};
document.getElementById('turn').textContent  = "";
moves = 0;
turn = "X";
boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
});
document.getElementById("r2c2").dispatchEvent(click);
}

/*
* Check if a win or not
*/
function win(clicked) {
// Get all cell classes
var memberOf = clicked.className.split(/\s+/);
for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
var items = contains('#tictactoe ' + testClass, turn);
    // winning condition: turn == N_SIZE
    if (items.length == 3) {
        return true;
    }
}
return false;
}

function contains(selector, text) {
var elements = document.querySelectorAll(selector);
return [].filter.call(elements, function(element){
return RegExp(text).test(element.textContent);
});
}

/*
* Sets clicked square and also updates the turn.
*/
function set() {


if (this.innerHTML !== EMPTY ) {
    return false;
}
this.innerHTML = turn;
moves += 1;
score[turn] += this.identifier;
if (win(this)) {
    // alert('Winner: Player ' + turn);
    document.getElementById('turn').textContent  = "Think Outside the Box :P";
} else if (moves === N_SIZE * N_SIZE) {
    // alert("Draw");
} else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById('turn').textContent = 'Player ' + turn;
}
let r = parseInt(this.id[1]);
let c = parseInt(this.id[3]);
let r2 = 1,c2 = 1;


if(turn == "X"){
    // while((r2 == r && c2 == c || r2 == c2)){
    //     r2 = Math.floor(Math.random()*2 + 1);
    //     c2 = Math.floor(Math.random()*2 + 1);
    //     console.log(r2, c2);
    // }
    if(aiMoves == 1){
        aiMove(r3, c3);
        for(let i = 0; i < N_SIZE; i++){
            for(let j = 0; j < N_SIZE; j++){
                if(!(i == 0 || j == 0 || i == N_SIZE - 1 || j == N_SIZE - 1 )){
                    document.getElementById("r"+ i + "c" + j).removeEventListener("click", set);
                }
        
                if((i == 0 || j == 0 || i == N_SIZE - 1 || j == N_SIZE - 1 )){
                    document.getElementById("r"+ i + "c" + j).removeEventListener("hello", set);
                }
            }
        }
      
    }
    if(aiMoves == 0){
        if(r2 == r && c2 == c){
            r2 = 3;
            c2 = 3;
            r3 = 4;
            c3 = 4;
        }
        aiMove(r2, c2);
    }
    


}
return true;
}

function aiMove(r, c){
    aiMoves++;
    if((r == 0 || c == 0 || r == N_SIZE - 1 || c == N_SIZE - 1 )){
        document.getElementById("r" + r + "c" + c).dispatchEvent(event);
    }
    else{
        document.getElementById("r" + r + "c" + c).dispatchEvent(click);
    }
    
    
}
init();