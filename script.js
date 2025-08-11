const chick = document.getElementById("chick");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");
const gameContainer = document.getElementById("game-container");
const timesUpMsg = document.getElementById("times-up");

let score = 0;
let timeLeft = 30;
let gameInterval;
let chickX = 50;
let chickY = 50;

function startGame() {
  clearInterval(gameInterval);

  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  chick.style.display = "block";
  timesUpMsg.style.display = "none";

  chickX = 50;
  chickY = 50;
  chick.style.transform = `translate(${chickX}px, ${chickY}px)`;

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      chick.style.display = "none";
      timesUpMsg.innerHTML = `Time’s up!<br>You caught ${score} chick${score !== 1 ? "s" : ""}! 🤩`;
      timesUpMsg.style.display = "block";

    }
  }, 1000);
}

gameContainer.addEventListener("mousemove", (e) => {
  const rect = gameContainer.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const chickCenterX = chickX + 20;
  const chickCenterY = chickY + 20;

  const dx = mouseX - chickCenterX;
  const dy = mouseY - chickCenterY;

  const distance = Math.sqrt(dx * dx + dy * dy);
  const safeDistance = 60;

  if (distance < safeDistance) {
    const angle = Math.atan2(dy, dx);
    const moveDist = 30;

    chickX -= Math.cos(angle) * moveDist;
    chickY -= Math.sin(angle) * moveDist;

    const containerWidth = gameContainer.clientWidth - 40;
    const containerHeight = gameContainer.clientHeight - 40;

    chickX = Math.max(0, Math.min(containerWidth, chickX));
    chickY = Math.max(0, Math.min(containerHeight, chickY));

    chick.style.transform = `translate(${chickX}px, ${chickY}px)`;
  }
});

chick.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
});

restartBtn.addEventListener("click", () => {
  if (timeLeft > 0) {
    const confirmRestart = confirm("You still got some times. Are you sure you want to restart? 🤔");
    if (!confirmRestart) return;
  }
  startGame();
});

window.onload = startGame;
