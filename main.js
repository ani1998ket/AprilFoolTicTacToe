const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "black";

let currentUser = 1;

var Grid = {
    x : 0,
    y : 0,
    rows : 5,
    cols : 5, 
    array : [],
}
let Cell = {
   width : WIDTH / 15,
   height : WIDTH/ 15,
}
Grid.drawCross = (row, col) =>{
    let x = Grid.x + (col + 0.5) * Cell.width;
    let y = Grid.y + (row + 0.5) * Cell.height; 
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 10, 10);
}
Grid.drawCircle = (row, col) => {
    let x = Grid.x + (col + 0.5) * Cell.width;
    let y = Grid.y + (row + 0.5) * Cell.height; 
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 10, 10);
}
Grid.get = (row, col) => {
    return Grid.array[row][col];
}
Grid.set = (val, row, col) => {
    Grid.array[row][col] = val;
}
for(let i = 0; i < Grid.rows; i++){
    Grid.array[i] = [];
    for(let j = 0; j < Grid.cols; j++){
        Grid.array[i][j] = 0;
    }
}

Grid.width = Grid.cols * Cell.width;
Grid.height = HEIGHT;
Grid.x = WIDTH/2 - Grid.width/2;

function draw(){
    ctx.fillStyle = "white";
    ctx.fillRect(Grid.x, Grid.y, Grid.width, Grid.height);
    for(let i = 1; i < Grid.rows - 1; i++){
        for(let j = 1; j < Grid.cols - 1; j++){
            let x = Grid.x + j * Cell.width;
            let y = Grid.y + i * Cell.height;
            ctx.strokeRect(x, y, Cell.width, Cell.height);
        }
    }
}

draw();

function HandleMouseDown(e){
    let x = e.pageX - Grid.x;
    let y = e.pageY - Grid.y;

    let col = Math.floor(x / Cell.width);
    let row = Math.floor(y / Cell.height);

    if(row >= 1 && row <= 3 && col >= 1 && col <= 3){
        if(Grid.get(row,col) == 0){
            Grid.set(currentUser, row, col);
            if(currentUser == 1)
                Grid.drawCross(row, col);
            if(currentUser == 2)
                Grid.drawCircle(row, col);

            currentUser = (currentUser == 1) ? 2 : 1;
        }
            
    }
        
}
let aiMoves = 0; 
function AiMove(){
    aiMoves++;
    
}
canvas.addEventListener("click", HandleMouseDown)
