"use strict";

const HTTP = new HTTPRequest();

const highscoreDataURL =
	"https://raw.githubusercontent.com/Andrew2432/Quiz-API-Project/master/data/data.json";
const quizDisplayScore = document.querySelector("#quiz-display-score");
const quizNewGame = document.querySelector("#quiz-new-game");
const quizHighScore = document.querySelector("#quiz-show-highscore");
const quizHighscoreDisplay = document.querySelector("#display-highscore");

quizNewGame.addEventListener("click", newQuiz);
quizHighScore.addEventListener("click", getHighScores);

quizDisplayScore.innerHTML = `Your score: ${localStorage.getItem("score")}.`;
updateHighScore();

function newQuiz() {
	localStorage.clear();
	window.open("index.html", "_self");
}

function getHighScores() {
	HTTP.get(highscoreDataURL)
		.then(data => showHighScores(data))
		.catch(err => console.log(err));
}

function updateHighScore() {
  HTTP.get(highscoreDataURL)
    .then(data => {
    data = data.sort(comparator("score"));
    console.log(data);
    })
    .catch(err => console.log(err));
}

function showHighScores(response) {
	let highscoreHTML = `
		<table>
			<tr>
				<th>Username</th>
				<th>Score</th>
			</tr>
	`;
	response.forEach(data => {
		highscoreHTML += `
			<tr>
				<td>${data.name}</td>
				<td>${data.score}</td>
			</tr>
		`;
	});
	highscoreHTML += "</table>";
	quizHighscoreDisplay.innerHTML = highscoreHTML;
}

function comparator(property) {
  return (a,b) => {
    if(a[property] > b[property]) return 1;
    else if(a[property] < b[property]) return -1;
    return 0;
  }
}