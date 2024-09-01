
// selects all the class cells
const cells = document.querySelectorAll(".cell");

//selects the h2 status text
const statusText = document.querySelector("#status-text");

// selects the button restart button
const restartBtn = document.querySelector("#restartBtn");

// index that has the winning conditions
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,7],
    [0,4,8],
    [2,4,6]
];

// empty stings for each cell 
let options = ["","","","","","","","",""];

// tracks the curret player
let currentPlayer = "X";

// tracks if the game is running 
let running =false;

initializeGame();

// takes care of all the set up 
function initializeGame(){
    // for each click in the a cell, we call the cellCliked funstion
    cells.forEach(cell => cell.addEventListener("click",cellClicked));

    // when restart button is cliked , call the restartGame function
    restartBtn.addEventListener("click", restartGame)

    // updates the status text that will be printing in the website
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    
    // gets the cellindex of a specific cell that was clicked
    const cellIndex = this.getAttribute("cellIndex");

    // if the is not empty and the game is not running, we dont update the cell 
    if(options[cellIndex] != "" || !running){
        return; // therefore, nothing happens 
    } 

    // the cell is empty and the game is running so we update 
    updateCell(this, cellIndex);

    // we always check the winner 
    checkWinner();

}

function updateCell(cell, index)
{
    // updates the index, tracks the indexes of the cells 
    options[index] = currentPlayer;
    // prints the current player into a cell
    cell.textContent = currentPlayer;
}

function changePlayer(){
    // if currentPlayer == "X", current player = O, otherwise X
    currentPlayer = (currentPlayer == "X") ? "O" :"X";

    // prints in the HTML
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){


    let roundWon = false;

    // goes through all the winning conditions 
    for(let i =0;i<winConditions.length;i++){
        // takes the indexes at win condition, one by one 
        const condition = winConditions[i];

        // gets the index at a specific index 
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // if the cells with all possible winning spaces are empty, the game continues 
        if(cellA == "" || cellB =="" || cellC ==""){
            continue;
        }

        // if the cells have a winning index
        if(cellA == cellB && cellB == cellC){
            roundWon= true;
            break;
        }
    }

    // if roundwon, print the players name and game is over
    if(roundWon ){
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    }
    // its a draw
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    // keep going, and change player
    else{
        changePlayer();
    }
}


function restartGame(){

    // current player is back to X
    currentPlayer = "X";
    //options array is restarted
    options = ["","","","","","","","",""];
    // status text is restarted
    statusText.textContent = `${currentPlayer}'s turn`;
    // each is is restarted
    cells.forEach(cell => cell.textContent = "");
    // game is back 
    running = true;

}