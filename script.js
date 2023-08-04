// JavaScript for Tic-Tac-Toe Game

const cells = document.querySelectorAll(".cell");
const playAgainButton = document.getElementById("playAgain");
const playAgainButton2 = document.getElementById("playAgain2");
const AnnounceResult = document.querySelector("#AnnounceResult");
const WinnerCard = document.querySelector(".Winner");
const greet = document.querySelector("#greet");
let currentPlayer = "x";

// Function to toggle the current player
function togglePlayer() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
}

// Function to check for a win
function checkWin(currentClass) {
    // Define the winning combinations as an array of arrays
    const WINNING_COMBINATIONS = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8],
      [0, 4, 8], 
      [2, 4, 6], 
    ];
  
    // Check each winning combination
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      const cellA = cells[a];
      const cellB = cells[b]; 
      const cellC = cells[c];
  
      // If all three cells have the current player's class, return true
      if (
        cellA.classList.contains(currentClass) &&
        cellB.classList.contains(currentClass) &&
        cellC.classList.contains(currentClass)
      ) {
        return true;
      }
    }
  }
  

// Function to check for a draw
function checkDraw() {
    for (const cell of cells) {
      if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
        return false;
      }
    }
    return true;
  }

// Function to handle the cell click event
function handleCellClick(event) {
  const cell = event.target;

  if (cell.classList.contains("x") || cell.classList.contains("o")) {
    return;
  }

  cell.classList.add(currentPlayer);
  cell.setAttribute("data-marker", currentPlayer);

  if (checkWin(currentPlayer)) {
    setTimeout(() => {
      greet.textContent = "Congratulations!";
      AnnounceResult.textContent = ` ${currentPlayer.toUpperCase()} Wins The Match`;
      WinnerCard.style.display = "flex";
      playAgainButton2.style.display = "none";
    }, 100);
  } else if (checkDraw()) {
    setTimeout(() => {
      greet.textContent = "Try Again";
      AnnounceResult.textContent = `It's A Draw`;
      WinnerCard.style.display = "flex";
      playAgainButton2.style.display = "none";
    }, 100);
  } else {
    togglePlayer();
  }
}

// Function to reset the game
function resetGame() { 
  playAgainButton2.style.display = " flex";
  WinnerCard.style.display = "none";
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.removeAttribute("data-marker");
  });

  currentPlayer = "x";
}

// Event listener for cell click
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Event listener for "Play Again" button click
playAgainButton.addEventListener("click", resetGame);
playAgainButton2.addEventListener("click", resetGame);
