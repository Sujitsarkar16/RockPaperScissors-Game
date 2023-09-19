const getChoices = {
  rock: "./Rock.png",
  paper: "./Paper.png",
  scissors: "./Scissors.png",
};
const score = {
  USER: 0,
  COMPUTER: 0,
};
const title = document.querySelector(".title");
title.style.display = "none";

const btn_rules = document.getElementById("btn-rules");
const game_rules = document.getElementById("popup-rules");

game_rules.style.display = "none";

btn_rules.addEventListener("click", () => {
  game_rules.style.display = "block";
});

window.addEventListener("click", function (event) {
  if (event.target !== btn_rules && event.target !== game_rules) {
    game_rules.style.display = "none";
  }
});

const scoreboard = document.querySelector(".score-boards");
const divMain = document.querySelector(".wrapper-home");
const playStation = document.getElementById("play-station");
const next_btn = document.getElementById("btn-winpage");

hands.style.display = "none";
playStation.style.display = "none";

next_btn.style.display = "none";

const gameStart = () => {
  divMain.style.display = "none";
  // scoreboard.style.display = "none";
};

const btn_start = document.getElementById("btn-start");

btn_start.addEventListener("click", () => {
  hands.style.display = "flex";
  playStation.style.display = "flex";
  title.style.display = "block";

  gameStart();
});

const userChoice = (hand) => {
  // console.log(hand);
  const hands = document.querySelector("#hands");
  hands.style.display = "none";

  let contest = document.querySelector(".Arena");
  contest.style.display = "flex";

  let picked = document.getElementById("userpickedimage");
  picked.src = getChoices[hand];

  let randomIndex = computerChoice();
  judge(hand, randomIndex);
};

const computerChoice = () => {
  let hands = ["rock", "paper", "scissors"];
  let randomIndex = hands[Math.floor(Math.random() * 3)];
  // console.log("RANDOMINDEX", randomIndex);

  document.getElementById("computerPickedImage").src = getChoices[randomIndex];
  return randomIndex;
};

const judge = (userChoice, randomIndex) => {
  if (userChoice == "paper" && randomIndex == "scissors") {
    displayResult("YOU LOSE!");
    next_btn.style.display = "none";
    setComputerscore(score.COMPUTER + 1);
  }
  if (userChoice == "paper" && randomIndex == "rock") {
    displayResult("YOU WIN!");
    next_btn.style.display = "block";
    setuserscore(score.USER + 1);
  }
  if (userChoice == "paper" && randomIndex == "paper") {
    displayResult("It's a tie!");
  }
  if (userChoice == "rock" && randomIndex == "scissors") {
    displayResult("YOU WIN!");
    next_btn.style.display = "block";
    setuserscore(score.USER + 1);
  }
  if (userChoice == "rock" && randomIndex == "paper") {
    displayResult("YOU LOSE!");
    setComputerscore(score.COMPUTER + 1);
    next_btn.style.display = "none";
  }
  if (userChoice == "rock" && randomIndex == "rock") {
    displayResult("It's a tie!");
  }
  if (userChoice == "scissors" && randomIndex == "scissors") {
    displayResult("It's a tie!");
  }
  if (userChoice == "scissors" && randomIndex == "rock") {
    displayResult("YOU LOSE!");
    setComputerscore(score.COMPUTER + 1);
    next_btn.style.display = "none";
  }
  if (userChoice == "scissors" && randomIndex == "paper") {
    displayResult("YOU WIN!");
    next_btn.style.display = "block";
    setuserscore(score.USER + 1);
  }
  localStorage.setItem("score", JSON.stringify(score));
  setComputerscore(score.COMPUTER);
  setuserscore(score.USER);
};

const restartGame = () => {
  let hands = document.querySelector("#hands");
  hands.style.display = "flex";
  let contest = document.querySelector(".Arena");
  contest.style.display = "none";
};

const displayResult = (decesion) => {
  console.log(decesion);
  document.querySelector(".decesion h2").innerText = decesion;
};

const setuserscore = (scoreuser) => {
  score.USER = scoreuser;
  console.log(scoreuser);
  document.getElementById("player-score").innerHTML = scoreuser;
};
const setComputerscore = (scorepc) => {
  score.COMPUTER = scorepc;
  console.log(scorepc);
  document.getElementById("computer-score").innerHTML = scorepc;
};
const initializeScores = () => {
  const storedScore = JSON.parse(localStorage.getItem("score"));
  if (storedScore) {
    score.USER = storedScore.USER;
    score.COMPUTER = storedScore.COMPUTER;
  }

  setComputerscore(score.COMPUTER);
  setuserscore(score.USER);
};

initializeScores();

next_btn.addEventListener("click", () => {
  window.location.href = "winpage.html";
});
