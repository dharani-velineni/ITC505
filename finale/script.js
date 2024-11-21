document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 5; 
    const board = document.getElementById("game-board");
    const targetMovesElement = document.getElementById("target-moves");
    const playerMovesElement = document.getElementById("player-moves");
    const timeElapsedElement = document.getElementById("time-elapsed");

    let squares = [];
    let playerMoves = 0;
    let timeElapsed = 0;
    let timer;
    const targetMoves = 10; 

    // Display target moves
    targetMovesElement.textContent = targetMoves;

    // Create the grid
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;
        board.appendChild(square);
        squares.push(square);
    }

    // Toggle a square and its immediate neighbors
    const toggleSquare = (index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;

        const toggle = (r, c) => {
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                const idx = r * boardSize + c;
                squares[idx].classList.toggle("is-off");
            }
        };

        toggle(row, col); 
        toggle(row - 1, col); 
        toggle(row + 1, col); 
        toggle(row, col - 1);
        toggle(row, col + 1); 
    };

    // Check if the game is solved
    const checkWin = () => {
        return squares.every((square) => square.classList.contains("is-off"));
    };

    // Randomize the board to create a solvable configuration
    const randomizeBoard = () => {
        for (let i = 0; i < targetMoves; i++) {
            const randomIndex = Math.floor(Math.random() * (boardSize * boardSize));
            toggleSquare(randomIndex);
        }
    };

    // Start the timer
    const startTimer = () => {
        timer = setInterval(() => {
            timeElapsed++;
            timeElapsedElement.textContent = timeElapsed;
        }, 1000);
    };

    // Stop the timer
    const stopTimer = () => {
        clearInterval(timer);
    };

    // Add click event listeners
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            const index = parseInt(square.dataset.index, 10);
            toggleSquare(index);

            playerMoves++;
            playerMovesElement.textContent = playerMoves;

            // Check win condition
            if (checkWin()) {
                stopTimer();
                setTimeout(() => {
                    alert(`You win! Time: ${timeElapsed} seconds, Moves: ${playerMoves}`);
                }, 100); // Slight delay to avoid blocking UI updates
            }
        });
    });

    // Initialize the board
    randomizeBoard();
    startTimer();
});
