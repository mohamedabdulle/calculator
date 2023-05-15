import {CalculatorInput, AC} from "./calculator-input.js"

const DIVIDE = "÷";
const MULTIPLY = "x";
const MODULO = "%";
const SUBTRACT = "−";
const ADD = "+";

const calcPad = document.querySelector("#calculator-pad");
const formula = document.querySelector("#formula");
const answer = document.querySelector("#answer");

let calc = new CalculatorInput();

calcPad.addEventListener("click", (event) => {
  event.preventDefault();
  operate(calc, event.target);
});

window.addEventListener("keydown", (event) => {
  let keyboardButton = document.querySelector(`button[data-key="${event.key}"]`);
  if (keyboardButton != null) {
    keyboardButton.focus()
    operate(calc, keyboardButton);
  }
});

function operate(calc, input) {
  if (calc.isInputValid(input.innerText, input.getAttribute("class"))) {
    calc.processCalcInput(input.innerText, input.getAttribute("class"));
    setCalcDisplay(calc, calculate(calc.firstOperand, calc.operator, calc.secOperand));
  }
}

function calculate(firstOperand, operator, secOperand) {
  return roundAnswer(operation(firstOperand, operator, secOperand));
}

function operation(firstOperand, operator, secOperand) {
  switch (operator) {
    case DIVIDE:
      return firstOperand / secOperand;
    case MULTIPLY:
      return firstOperand * secOperand;
    case MODULO:
      return firstOperand % secOperand;
    case SUBTRACT:
      return firstOperand - secOperand;
    case ADD:
      return +firstOperand + +secOperand;
  }
}

function roundAnswer(answer) {
  if (Number.isFinite(answer)) return Number(answer.toPrecision(10));
}

function setCalcDisplay(calc, calcAnswer) {
  formula.innerText = `${calc.firstOperand} ${calc.operator} ${calc.secOperand}`;
  answer.innerText = "";
  formula.style = "";

  if (calc.isEqualsOperation) {
    formula.style = "color: rgb(160, 160, 160); font-size: 30px; ";
    answer.innerText = calcAnswer;
    calc.answer = calcAnswer ;
  } 
  
  if (calc.backtrack === AC) {
    formula.innerText = "";
    calc.backtrack = ""
  }
}