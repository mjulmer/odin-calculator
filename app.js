"use strict";

// Number obtained by manually entering digits until the display was filled.
// Is this hacky? Yes. Will it need to be changed every time the font size or
// display width changes? Also yes. 
// The alternative would be to declare the font size of the display as the
// root font size and use em units to define everything, then redefine the 
// button font size. If this were a production project, I would do that.
// But it's not. So I'm going to keep the constant.
const MAX_DISPLAY_DIGITS = 11;
// ugh users can just keep multiplying and hit overflow :((
const MAX_ENTRY_DIGITS = 8;

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

let firstOperand = 0;
let secondOperand = 0;
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
        case '+':
            operator = add;
            break;
        case '-':
            operator = subtract;
            break;
        case 'X':
            operator = multiply;
            break;
        case '/':
            operator = divide;
            break;
        default:
            operator = undefined;
            log.console.error("Unexpected operator button.");
    }
    firstOperand = currentTextEntry;
  })
);

document.querySelector(".clear-button").addEventListener("click", () => {
    currentTextEntry = "";
    inputText.textContent = currentTextEntry;
  });