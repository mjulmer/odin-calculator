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
  if (b == 0) {
    return NaN;
  }
  return a / b;
};

function operate(firstOperand, secondOperand, operator) {
  return operator(firstOperand, secondOperand);
}

let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;
// Used to determine if the display should be cleared on a digit press (since
// digits should not be appended to an existing answer)
let lastActionWasEquals = false;

let currentTextEntry = "";

const inputText = document.querySelector(".input-text");

let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    // If currentTextEntry is empty, the user just completed a calculation with
    // equals and new digits should not be appended.
    if (lastActionWasEquals) {
      inputText.textContent = button.textContent;
      lastActionWasEquals = false;
      firstOperand = undefined;
    } else {
      inputText.textContent += button.textContent;
    }
    currentTextEntry += button.textContent;
  })
);

document
  .querySelector(".clear-button")
  .addEventListener("click", () => resetLogicAndDisplay());

document.querySelector(".equals-button").addEventListener("click", () => {
  secondOperand =
    currentTextEntry === "" ? undefined : parseInt(currentTextEntry);
  // If nothing has been entered, or only one number has been entered, do nothing.
  if (
    firstOperand === undefined ||
    secondOperand === undefined ||
    operator === undefined
  ) {
    return;
  }

  performCalculationAndReadyDisplay();
  // This supports clearing the display instead of appending digits to the
  // previous answer, if the user enters a digit next
  lastActionWasEquals = true;
  currentTextEntry = "";
});

function resetLogicAndDisplay() {
  mulmer@veridical:~/code/odin/odin-calculator$ git add app.js 
  currentTextEntry = "";
  inputText.textContent = "";
  firstOperand = undefined;
  secondOperand = undefined;
  operator = undefined;
  lastActionWasEquals = false;
}

function performCalculationAndReadyDisplay() {
  console.log(`a ${firstOperand} b ${secondOperand}`);
  firstOperand = operator(firstOperand, secondOperand);
  inputText.textContent = firstOperand;
  // This supports the case where a second operator press triggers the
  // computation.
  currentTextEntry = firstOperand;
  secondOperand = undefined;
  operator = undefined;
}

document.querySelectorAll(".operator").forEach((button) =>
  button.addEventListener("click", () => {
    // If the user just computed a calculation, we can use the result as
    // firstOperand and take input for the operator of the next calculation.
    if (currentTextEntry == "") {
      currentTextEntry = inputText.textContent;
      firstOperand = parseInt(inputText.textContent) ;
      secondOperand = undefined;
    }

    const knownOperators = ["+", "-", "X", "/"];
    if (knownOperators.includes(inputText.textContent.at(-1))) {
      return;
    }

    // Check for the case where this is a second operator being added to an
    // existing computation (to add a third operand). If so, compute and
    // display the answer to that calculation.
    if (
      firstOperand !== undefined &&
      operator !== undefined &&
      inputText.textContent.at(-1) >= "0" &&
      inputText.textContent.at(-1) <= "9"
    ) {
      secondOperand = parseInt(currentTextEntry);
      performCalculationAndReadyDisplay();
    }

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
        console.error("Unexpected operator button.");
    }

    if (firstOperand === undefined) {
      firstOperand = parseInt(inputText.textContent);
    }
    inputText.textContent = currentTextEntry + button.textContent;
    currentTextEntry = "";
  })
);
