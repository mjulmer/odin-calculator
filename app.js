"use strict";

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

function operate(firstOperand, secondOperand, operator) {
  return operator(firstOperand, secondOperand);
}

let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;

let currentTextEntry = "";

const inputText = document.querySelector(".input-text");
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    currentTextEntry = currentTextEntry + button.textContent;
    inputText.textContent = currentTextEntry;
  })
);

document.querySelectorAll(".operator").forEach((button) =>
  button.addEventListener("click", () => {
    switch (button.textContent) {
      case "+":
        operator = add;
        break;
      case "-":
        operator = subtract;
        break;
      case "X":
        operator = multiply;
        break;
      case "/":
        operator = divide;
        break;
      default:
        operator = undefined;
        log.console.error("Unexpected operator button.");
    }
    firstOperand = parseInt(currentTextEntry);
    currentTextEntry = "";
    inputText.textContent = "";
  })
);

document.querySelector(".clear-button").addEventListener("click", () => resetLogicAndDisplay());

document.querySelector(".equals-button").addEventListener("click", () => {
    secondOperand = currentTextEntry === "" ? undefined : parseInt(currentTextEntry);
  // If nothing has been entered, or only one number has been entered, do nothing.
  if (firstOperand === undefined || secondOperand === undefined || operator === undefined) {
    return;
  }
 
  firstOperand = operator(firstOperand, secondOperand);
  // This supports clearing the display instead of appending digits to the
  // previous answer, if the user enters a digit next
  currentTextEntry = ""
  inputText.textContent = firstOperand;

  operator = undefined;
});


function resetLogicAndDisplay() {
    currentTextEntry = "";
    inputText.textContent = "";
    firstOperand = undefined;
    secondOperand = undefined;
    operator = undefined;
}
