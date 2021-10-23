// Asigning variables for each square, the mole, the time and user's score
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

// Assigning variables that will be updated throughout the game
let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;

// Removes class name 'mole'
// using Math.random() we assign a random square the class of 'mole' to add a mole to the grid
function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
}

// Adding the eventListener to the square on the grid
// If the correct square is clicked the result will increment and the score will increase
// Resets the hitposition at the end of the function
squares.forEach((square) => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

// setInterval calls the random square function every 500ms using setInterval
function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

moveMole();

// Function to control the timer
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  // When timer ends, the game is over and alerts the user
  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    swal({
      title: 'Game Over!',
      text: 'Your whacked the mole ' + result + ' times!',
      icon: 'success',
    });
  }
}
// Invokes the countDown function every second
let countDownTimerId = setInterval(countDown, 1000);
