"use strict";

/**
 * Quiz user selectors
 */
const quizUsername = document.querySelector("#quiz-username");
const quizUsernameSubmit = document.querySelector("#btn-username");
const quizUsernameError = document.querySelector("#quiz-enter-username");

//  Event listener
quizUsernameSubmit.addEventListener("click", validateUsername);

/**
 ** Validate the username and store it in local storage
 */
function validateUsername(e) {
	if (quizUsername.value === "") displayError();
	else {
		window.open("quiz.html", "_self");
		localStorage.setItem("username", quizUsername.value);
	}
	e.preventDefault();
}

/**
 ** Displays the error message
 */
function displayError() {
	quizUsernameError.className = "show";
	setTimeout(() => {
		quizUsernameError.className = quizUsernameError.className.replace(
			"show",
			""
		);
	}, 2000);
}
