import {CalculatorInput, AC} from "./calculator-input.js"

const DIVIDE = "÷";
const MULTIPLY = "*";
const MODULO = "%";
const SUBTRACT = "−";
const ADD = "+";

const calcPad = document.querySelector("#calculator-pad");
const formula = document.querySelector("#formula");
const answer = document.querySelector("#answer");

let calc = new CalculatorInput();

calcPad.addEventListener("click", function (event) {
  event.preventDefault();
  operate(calc, event.target);
});

window.addEventListener("keydown", function (event) {
  event.preventDefault();
  operate(calc, document.querySelector(`button[data-key="${event.keyCode}"]`));
});

function operate(calc, input) {
  if (calc.isInputValid(input.innerText, input.getAttribute("class"))) {
    calc.processCalcInput(input.innerText, input.getAttribute("class"));
    setCalcDisplay(calc, calculate(calc.firstOperand, calc.operator, calc.secOperand));
  }
}

function calculate(firstOperand, operator, secOperand) {
  if (secOperand === "0") return "You can't divide by 0";
  else if (firstOperand === "" || operator === "" || secOperand === "") return "";
  else return roundAnswer(operation(firstOperand, operator, secOperand));
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
  return Math.round(answer * 100) / 100;
}

function setCalcDisplay(calc, calcAnswer) {
  formula.innerText = `${calc.firstOperand} ${calc.operator} ${calc.secOperand}`;
  answer.innerText = "";
  formula.style = "";

  if (calc.isEqualsOperation) {
    formula.style = "color: gray; font-size: 30px; ";
    answer.innerText = calcAnswer;
    calc.answer = calcAnswer ;
  } 
  
  if (calc.backtrack === AC) {
    formula.innerText = "";
    calc.backtrack = ""
  }
}