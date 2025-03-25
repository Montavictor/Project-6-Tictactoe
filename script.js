let moves = 0;
let board = document.getElementById('board');
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let state = [];
let playerX = '';
let isPlayerturn = true;
let oButton = document.getElementById('o-button');
let xButton = document.getElementById('x-button');
let overlay = document.getElementById('board-overlay');
let choiceContainer = document.getElementById('choose');
let container = document.getElementById('container');
let winnerDiv = document.getElementById('winnerMessage');
let prev = document.getElementById('previous');
let next = document.getElementById('next');
next.disabled = true;
next.classList.remove('pointer');
next.style.pointerEvents = "none";
next.classList.add('cursor');
let reset = document.getElementById('reset');
let buttonContainer = document.getElementById('button-container');
let stateTracker = 0;
let playerScore = 0;
let computerScore = 0;
const githubButton = document.getElementById('github-button');
const winnerContainer = document.getElementById('winner-container');
const closeButton = document.getElementById('close-button');
let score = document.getElementById('score');

githubButton.addEventListener('click', () => {
    window.open('https://github.com/Montavictor/Project-6-Tictactoe', '_blank');
});

closeButton.addEventListener('click', ()=> {
    winnerContainer.classList.add('hidden');
})

oButton.addEventListener('click', () => {
    playerX = 'O';
    choiceContainer.classList.add('hidden');
    container.classList.remove('hidden');

});

xButton.addEventListener('click', () => {
    playerX = 'X'
    choiceContainer.classList.add('hidden');
    container.classList.remove('hidden');

});

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let square = document.createElement('div');
        square.classList.add('tictactoeBox');
        square.classList.add('pointer');
        let squareID = `box${i}`;
        square.setAttribute('id', squareID);
        board.appendChild(square);
        square.addEventListener('click', () => {
            if (isPlayerturn) {
                addMove(squareID, i);
            }
            if (!isPlayerturn) {
                //show "computer is thinking"
                overlay.classList.remove('hidden');
                setTimeout(() => {
                    addComputerMove();
                    overlay.classList.add('hidden');
                    // add styling
                }, 1500);
            }
        });
    }
}

function addMove(element, boxNumber) {
    let callGrid = document.getElementById(element);
    if (!callGrid.textContent) {
        callGrid.textContent = playerX;
        callGrid.classList.remove('pointer');
        callGrid.style.pointerEvents = "none";
        moves++;
        updateBoard(callGrid, boxNumber);
        if (moves < 9 && !checkWin(gameBoard)) {
            isPlayerturn = false;
        }
    }
    console.log("Player's move:");
    console.log(gameBoard);
};


const addComputerMove = () => {
    let emptyGrid = [];
    for (let i = 0; i < 9; i++) {
        let findEmpty = document.getElementById(`box${i}`);
        if (!findEmpty.textContent) {
            emptyGrid.push(i);
        }
    }
    if (!isPlayerturn) {
        if (emptyGrid.length > 0) {
            let random = Math.floor(Math.random() * emptyGrid.length);
            let randomGrid = document.getElementById(`box${emptyGrid[random]}`);
            if (playerX === 'X') {
                randomGrid.textContent = 'O';
            } else {
                randomGrid.textContent = 'X';
            }
            randomGrid.classList.remove('pointer');
            randomGrid.style.pointerEvents = "none";
            moves++;
            updateBoard(randomGrid, emptyGrid[random]);
            console.log("Computer's move:");
            console.log(gameBoard);
            if (moves < 9 && !checkWin(gameBoard)) {
                isPlayerturn = true;
            }
        }
    }
};

function updateBoard(element, boxNumber) {
    let row = Math.floor(boxNumber / 3);
    let col = boxNumber % 3;
    gameBoard[row][col] = element.innerText;
    console.log(moves)

    let winner = checkWin(gameBoard);
    if (winner) {
        if (winner === playerX) {
            winnerContainer.classList.remove('hidden');
            winnerDiv.textContent = "Winner: Player!!";
            buttonContainer.classList.remove('hidden');
            playerScore++;
            score.textContent = `${playerScore} - ${computerScore}`;
        } else {
            winnerContainer.classList.remove('hidden');
            buttonContainer.classList.remove('hidden');
            winnerDiv.textContent = "Winner: Computer!!";
            computerScore++;
            score.textContent = `${playerScore} - ${computerScore}`;
        }
    } else if (moves === 9) {
        winnerContainer.classList.remove('hidden');
        winnerDiv.textContent = "It's a Draw!";
        console.log("It's a draw!");
        buttonContainer.classList.remove('hidden');
        score.textContent = `${playerScore} - ${computerScore}`;
    }
    updateState(gameBoard);
}

function checkWin(board) {
    // row
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            document.getElementById(`box${row * 3}`).classList.add('win');
            document.getElementById(`box${row * 3 + 1}`).classList.add('win');
            document.getElementById(`box${row * 3 + 2}`).classList.add('win');
            return board[row][0];
        }
    }
    // col
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            document.getElementById(`box${col}`).classList.add('winVertical');
            document.getElementById(`box${col + 3}`).classList.add('winVertical');
            document.getElementById(`box${col + 6}`).classList.add('winVertical');

            return board[0][col];
        }
    }
    // diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        document.getElementById('box0').classList.add('winDiagonal');
        document.getElementById('box4').classList.add('winDiagonal');
        document.getElementById('box8').classList.add('winDiagonal');

        return board[0][0];
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        document.getElementById('box2').classList.add('winDiagonalReverse');
        document.getElementById('box4').classList.add('winDiagonalReverse');
        document.getElementById('box6').classList.add('winDiagonalReverse');
        return board[0][2];
    }
    return null;
}

function updateState(boardCopy) {
    const newBoard = [];
    for (let i = 0; i < boardCopy.length; i++) {
        const row = [];
        for (let j = 0; j < boardCopy[i].length; j++) {
            row.push(boardCopy[i][j]);
        }
        newBoard.push(row);
    }
    state.push(newBoard);
    stateTracker = state.length - 1;
}

function reflectBoard(index) {
    let tempBoard = state[index];
    let moveString = [];
    for (let i = 0; i < tempBoard.length; i++) {
        for (let j = 0; j < tempBoard[i].length; j++) {
            moveString.push(tempBoard[i][j]);
        }
    }
    for (let grid = 0; grid < moveString.length; grid++) {
        document.getElementById(`box${grid}`).textContent = moveString[grid];
    }
}

prev.addEventListener("click", () => {
    next.disabled = false;
    next.classList.add('pointer');
    next.style.pointerEvents = "auto";
    next.classList.remove('cursor');
    if (stateTracker > 0) {
        stateTracker--;
        reflectBoard(stateTracker);
        console.log(stateTracker)
    }
    if (stateTracker === 0) {
        prev.disabled = true;
        prev.classList.remove('pointer');
        prev.style.pointerEvents = "none";
        prev.classList.add('cursor');    
    }
});

next.addEventListener("click", () => {
        prev.disabled = false;
        prev.classList.add('pointer');
        prev.style.pointerEvents = "auto";
        prev.classList.remove('cursor');    
    
    if (stateTracker < state.length) {
        stateTracker++;
        reflectBoard(stateTracker);
        console.log(stateTracker)
    }
    if (stateTracker === state.length - 1) {
        next.disabled = true;
        next.classList.remove('pointer');
        next.style.pointerEvents = "none";
        next.classList.add('cursor');
    }
});

reset.addEventListener('click', () => {
    state = [];
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    moves = 0;
    for (let i = 0; i < 9; i++) {
        const square = document.getElementById(`box${i}`);
        square.textContent = '';
        square.classList.remove('winDiagonalReverse', 'winDiagonal', 'win', 'winVertical');
        square.classList.add('pointer');
        square.style.pointerEvents = 'auto';
    }
    winnerContainer.classList.add('hidden');
    container.classList.add('hidden');
    choose.classList.remove('hidden');
    buttonContainer.classList.add('hidden');
    winnerDiv.textContent = '';
});


createBoard();