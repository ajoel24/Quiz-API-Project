"use strict";

/**
 * TODO: Randomize the choice options
 * TODO: Use Bootstrap CSS
 */

const HTTP = new HTTPRequest();

let quizBody = document.querySelector("#quiz-body");
let quizQuestion = document.querySelector("#quiz-question");
let quizChoicesDiv = document.querySelector("#quiz-choices");
let quizAnswer = document.querySelector("#quiz-answer");
let quizScore = document.querySelector("#quiz-score");

let quizSubmit = document.querySelector("#quiz-submit");
let quizTopic = document.querySelector("#quiz-topic");
let quizTopicSubmit = document.querySelector("#quiz-topic-submit");

let quizNext = document.querySelector("#quiz-next");
let quizReset = document.querySelector("#quiz-reset");
let quizOptions = document.querySelector("#quiz-options");

let requestURL = null;
let response = null;
let responseChoices = [];
let choicesHTML = "";
let score = 0;

/**
 * * Event Listeners
 * @method getQuiz Creates the quiz
 * @method submitAnswer Validates the answer
 * @method resetQuiz Resets the quiz window
 */
quizTopicSubmit.addEventListener("click", getQuiz);
quizSubmit.addEventListener("click", submitAnswer);
quizReset.addEventListener("click", resetQuiz);
quizNext.addEventListener("click", getQuiz);

/**
 * *Creates a HTTP GET request to the OpenTriviaDB API
 * @callback then Calls the showQuiz() when success
 * @callback catch Displays error if failure
 * @returns {null}
 */
function getQuiz() {
	let selectedTopic = quizTopic.value;
	console.log(selectedTopic);

	quizQuestion.innerHTML = "";
	quizChoicesDiv.innerHTML = "";
	choicesHTML = "";
	requestURL = `https://opentdb.com/api.php?amount=1&category=${selectedTopic}&type=multiple`;

	HTTP.get(requestURL)
		.then(data => showQuiz(data))
		.catch(err => console.log(err));
}

/**
 * *Displays the quiz question and choices
 * @param {JSON} data The JSON data returned by API
 * @returns {void}
 */
function showQuiz(data) {
	console.log(data);
	response = data.results[0];
	setScore(score);
	quizQuestion.innerHTML = response.question;
	createOptions(response, submitAnswer);
}

/**
 ** Creates the choices for the quiz questions
 * @param {JSON} response The data received from API
 * @param {function} callback Called after submit button is triggered
 */
function createOptions(response, callback) {
	responseChoices = [response.correct_answer];
	responseChoices.push(response.incorrect_answers[0]);
	responseChoices.push(response.incorrect_answers[1]);
	responseChoices.push(response.incorrect_answers[2]);
	console.log(responseChoices);
	responseChoices = responseChoices.sort(() => Math.random() - 0.5);
	console.log(responseChoices);

	for (let i = 0; i < responseChoices.length; i++) {
		choicesHTML += `
      <br />
      <input type="radio" name="choice" value="${responseChoices[i]}" id="quiz-choice-${i}"/>
      <label for="choice">${responseChoices[i]}</label>
      <br />
    `;
	}
	quizChoicesDiv.innerHTML = choicesHTML;
	quizSubmit.addEventListener("click", callback);
}

/**
 ** Validates the choice selected by the user
 * @param {Event} e The event object
 */
function submitAnswer(e) {
	let selectedOption = getSelectedOption();
	console.log(selectedOption);
	if (selectedOption != null) {
		if (selectedOption == response.correct_answer) {
			alert("Correct answer!");
			score++;
			setScore(score);
			getQuiz();
		} else {
			alert("Incorrect answer!");
		}
	} else {
		alert("Please choose an option");
	}
	e.preventDefault();
}

/**
 ** Gets the choice selected by the user
 * @returns {string} selectedQuizChoice
 */
function getSelectedOption() {
	let quizChoices = document.getElementsByName("choice");
	let selectedQuizChoice = null;
	for (let i = 0; i < quizChoices.length; i++) {
		if (quizChoices[i].checked) {
			selectedQuizChoice = quizChoices[i].value;
			break;
		}
	}
	console.log(typeof selectedQuizChoice);
	return selectedQuizChoice;
}

/**
 ** Resets the quiz window
 */
function resetQuiz() {
	quizQuestion.innerHTML = "";
	quizChoicesDiv.innerHTML = "";
	choicesHTML = "";
	score = 0;
	setScore(score);
}

function setScore(score) {
	quizScore.innerHTML = "";
	quizScore.innerHTML = `Your Score : ${score}`;
}
