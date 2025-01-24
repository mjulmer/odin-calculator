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

let firstOperand = 0;
let secondOperand = 0;
let operator = add;

let currentTextEntry = "";

const inputText = document.querySelector(".input-text");
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    currentTextEntry = currentTextEntry + button.textContent;
    inputText.textContent = currentTextEntry;
  })
);
