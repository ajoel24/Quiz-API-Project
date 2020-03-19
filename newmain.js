"use strict";

/**
 * TODO: Randomize the choice options
 * TODO: Use Bootstrap CSS
 */

let quizBody = document.querySelector("#quiz-body");
let quizQuestion = document.querySelector("#quiz-question");
let quizChoices = document.querySelector("#quiz-choices");
let quizAnswer = document.querySelector("#quiz-answer");
let quizSubmit = document.querySelector("#quiz-submit");
let quizTopic = document.querySelector("#quiz-topic");
let quizTopicSubmit = document.querySelector("#quiz-topic-submit");
let quizNext = document.querySelector("#quiz-next");
let quizReset = document.querySelector("#quiz-reset");
let quizOptions = document.querySelector("#quiz-options");
let requestURL = null;
let response = null;
let responseChoices = [];

quizTopicSubmit.addEventListener("click", quizTopicHandler);
quizNext.addEventListener("click", quizNew);
quizSubmit.addEventListener("click", quizHandler);
quizReset.addEventListener("click", quizClear);

/**
 *
 * @param {*} e The event object
 * @returns The URL of the API
 * @see quizGenerator(requestURL)
 */
function quizTopicHandler(e) {
	let selectedTopic = quizTopic.value;
	console.log(selectedTopic);

	requestURL = `https://opentdb.com/api.php?amount=1&category=${selectedTopic}&type=multiple`;
	quizGenerator(requestURL);
	console.log(requestURL);

	e.preventDefault();
	return requestURL;
}

/**
 *
 * @param {*} requestURL The URL of the OpenTrivialDB API
 * @returns The JSON object of the returned request
 * @implements XMLHttpRequest()
 */
function quizGenerator(requestURL) {
	const xhr = new XMLHttpRequest();
	let response = null;
	if (requestURL == null) {
		alert("Error.");
		return;
	}
	xhr.open("GET", requestURL, true);

	xhr.onload = function() {
		if (this.status === 200) {
			if (this.readyState === 4) {
				if (this.responseText != null) {
					console.log(this.responseText);
					let responseJSON = JSON.parse(this.responseText);
					response = responseJSON.results[0];
					console.log(response);
					quizHandler(response);
				} else {
					console.log("Cannot get question");
				}
			} else {
				console.log("AJAX error");
			}
		} else {
			console.log("HTTP response:" + this.status);
		}
	};
	xhr.send();
	return response;
}

function quizHandler(response) {
	// let output = "";
	if (response == null || response == undefined) {
		console.log("response is undefined");
		return;
	}

	quizQuestion.innerHTML = response.question;
	responseChoices = [response.correct_answer];

	responseChoices = responseChoices.sort(() => Math.random() - 0.5);

	console.log(responseChoices);
	let choicesHTML = `<ol type="1">`;

	responseChoices.forEach(element => {
		choicesHTML += `<li>${element}</li>`;
	});

	choicesHTML += `</ol>`;
	console.log(choicesHTML);
	quizChoices.innerHTML = choicesHTML;
}

function quizNew(e) {
	quizGenerator(requestURL);
	e.preventDefault();
}

function quizClear(e) {
	quizQuestion.innerHTML = "";
	quizChoices.innerHTML = "";
	e.preventDefault();
}
