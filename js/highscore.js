"use strict";

// const highscoreDataURL =
// 	"https://github.com/Andrew2432/Quiz-API-Project/master/data/data.json";

// const githubURL =
// 	"https://github.com/Andrew2432/Quiz-API-Project/master/data/data.json";

const quizDisplayScore = document.querySelector("#quiz-display-score");
const quizNewGame = document.querySelector("#quiz-new-game");
// const quizHighScore = document.querySelector("#quiz-show-highscore");
// const quizHighscoreDisplay = document.querySelector("#display-highscore");

const score = localStorage.getItem("score");
const username = localStorage.getItem("username");

quizNewGame.addEventListener("click", newQuiz);
// quizHighScore.addEventListener("click", getHighScores);

quizDisplayScore.innerHTML = `Your score: ${localStorage.getItem(
	"score"
)}. <br /> Good work! <br />`;

let data = [
	{
		name: "Joel",
		score: 24
	}
];

// samplePUT(githubURL, data);
// function samplePUT(githubURL, data) {
// 	data = JSON.stringify(data);
// 	let encodedData = b64EncodeUnicode(data);
// 	console.log(encodedData);
// 	HTTP.put(githubURL, encodedData)
// 		.then(data => console.log(data))
// 		.catch(err => console.log(err));
// }

function newQuiz() {
	localStorage.clear();
	window.open("index.html", "_self");
}

// function getHighScores() {
// 	HTTP.get(highscoreDataURL)
// 		.then(data => updateHighScore(data))
// 		.then(data => showHighScores(data))
// 		.catch(err => console.log(err));
// }

// function updateHighScore(data) {
	// data = data.sort(comparator("score"));
	// if(data[0].score < score) {
	//   data.add({
	//     "name": username,
	//     "score": score
	//   });
	//   data = data.sort(comparator("score"));

	// }
// 	console.log(data);
// 	return data;
// }

// function showHighScores(response) {
// 	let highscoreHTML = `
// 		<table>
// 			<tr>
// 				<th>Username</th>
// 				<th>Score</th>
// 			</tr>
// 	`;
// 	response.forEach(data => {
// 		highscoreHTML += `
// 			<tr>
// 				<td>${data.name}</td>
// 				<td>${data.score}</td>
// 			</tr>
// 		`;
// 	});
// 	highscoreHTML += "</table>";
// 	quizHighscoreDisplay.innerHTML = highscoreHTML;
// }

// function comparator(property) {
// 	return (a, b) => {
// 		if (a[property] > b[property]) return -1;
// 		else if (a[property] < b[property]) return 1;
// 		return 0;
// 	};
// }

// function b64EncodeUnicode(str) {
// 	return btoa(
// 		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
// 			return String.fromCharCode(parseInt(p1, 16));
// 		})
// 	);
// }
