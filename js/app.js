"use strict";

/**
 * TODO: Add loading animations
 * TODO: Use custom CSS
 */

const HTTP = new HTTPRequest();

/**
 * Quiz Body
 */
const quizBody = document.querySelector("#quiz-body");
const quizQuestion = document.querySelector("#quiz-question");
const quizChoicesDiv = document.querySelector("#quiz-choices");
const quizAnswer = document.querySelector("#quiz-answer");
const quizScore = document.querySelector("#quiz-score");

/**
 * Quiz Select Topic
 * Quiz Submit Answer
 */
const quizSubmit = document.querySelector("#quiz-submit");
const quizTopic = document.querySelector("#quiz-topic");
const quizTopicSubmit = document.querySelector("#quiz-topic-submit");

/**
 * Quiz controls
 */
const quizNext = document.querySelector("#quiz-next");
const quizReset = document.querySelector("#quiz-reset");
const quizOptions = document.querySelector("#quiz-options");

/**
 * Quiz messages
 */
const quizCorrectAnswer = document.querySelector("#quiz-correct-answer");
const quizIncorrectAnswer = document.querySelector("#quiz-incorrect-answer");
const quizChooseAnswer = document.querySelector("#quiz-choose-answer");
/**
 * Quiz loader
 */
const quizLoader = document.querySelector(".quiz-loader");
/**
 * Quiz Handling Variables
 */
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
	const selectedTopic = quizTopic.value;
	console.log(selectedTopic);

	quizQuestion.innerHTML = "";
	quizChoicesDiv.innerHTML = "";
	choicesHTML = "";
	showQuizOptions(false);
	showQuizLoader(true);
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
	showQuizLoader(false);
	quizQuestion.innerHTML = response.question;
	createOptions(response, submitAnswer);
	showQuizOptions(true);
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
	const selectedOption = getSelectedOption();
	console.log(selectedOption);
	if (selectedOption != null) {
		if (selectedOption == response.correct_answer) {
			setScore(score++);
			displayMessage("correct");
			// alert("Correct answer!");
			// score++;
			getQuiz();
		} else {
			setScore(score--);
			displayMessage("incorrect");
			// alert("Incorrect answer!");
			// score--;
			getQuiz();
		}
	} else {
		displayMessage("choose");
		//alert("Please choose an option");
	}
	e.preventDefault();
}

/**
 ** Gets the choice selected by the user
 * @returns {string} selectedQuizChoice
 */
function getSelectedOption() {
	const quizChoices = document.getElementsByName("choice");
	let selectedQuizChoice = null;
	for (let i = 0; i < quizChoices.length; i++) {
		if (quizChoices[i].checked) {
			selectedQuizChoice = quizChoices[i].value;
			break;
		}
	}
	// console.log(typeof selectedQuizChoice);
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
	showQuizOptions(false);
}

function setScore(score) {
	quizScore.innerHTML = "";
	quizScore.innerHTML = `Your Score : ${score}`;
}

function displayMessage(message) {
	switch (message) {
		case "correct":
			displayMessageDelay(quizCorrectAnswer);
			break;

		case "incorrect":
			displayMessageDelay(quizIncorrectAnswer);
			break;

		case "choose":
			displayMessageDelay(quizChooseAnswer);
			break;
	}
}

function displayMessageDelay(messageDiv) {
	messageDiv.className = "show";
	setTimeout(() => {
		messageDiv.className = messageDiv.className.replace("show", "");
	}, 2000);
}

function showQuizOptions(flag) {
	if (flag) quizOptions.className = "show";
	else quizOptions.className = quizOptions.className.replace("show", "");
}

function showQuizLoader(flag) {
	if (flag) quizLoader.classList.add("show");
	else quizLoader.classList.remove("show");
}
