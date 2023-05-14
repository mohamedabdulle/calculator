const EQUAL = "="
const DECIMAL = "."
const BACKTRACK = "backtrack";
const DEL = "DEL";
const AC = "AC"
const OPERATOR = "operator";
const OPERAND = "operand";
const SIGN = "±";

class CalculatorInput {
  #firstOperand;
  #operator;
  #secOperand;
  #isEqualsOperation;
  #backtrack;
  #answer;

  constructor() {
    this.#firstOperand = "";
    this.#operator = "";
    this.#secOperand = "";
    this.#isEqualsOperation = false;
    this.#backtrack = "";
    this.#answer = "";
  }

  isInputValid(input, type) {
    switch (type) {
      case OPERAND:
        return this.#isOperandInputValid(input);
      case OPERATOR:
        return this.#isOperatorInputValid(input);
    }
    return true;
  }

  #isOperandInputValid(input) {
    if (input === DECIMAL) {
      if (this.#lastInputTypeDefined() === OPERAND && this.#isNotEmptyString(this.#lastInputDefined())) {
        let multipleDecimalPoints = /[.]+/
        return !(multipleDecimalPoints.test(this.#lastInputDefined()));
      }
      return false;
    }
    return true;
  }

  #isOperatorInputValid(input) {
    if (input !== EQUAL && input !== SIGN) { 
      if (this.#isEqualsOperation) return true;
      else return this.#isNotEmptyString(this.#firstOperand);
    } else if (input === SIGN) {
      return this.#lastInputTypeDefined() === OPERAND;
    } else {
      return this.#isNotEmptyString(this.#firstOperand) && this.#isNotEmptyString(this.#secOperand);
    }
  }

  processCalcInput(input, type) {
    switch (type) {
      case OPERAND:
        this.#clearEqualsOperation();
        this.#processOperandInput(input);
        break;
      case OPERATOR:
        this.#processOperatorInput(input);
        break;
      case BACKTRACK:
        this.#processBacktrackInput(input);
    }
  }

  #processOperandInput(input) {
    (this.#isNotEmptyString(this.#firstOperand) && this.#isNotEmptyString(this.#operator)) 
      ? this.#secOperand += input : this.#firstOperand += input;
  }

  #processOperatorInput(input) {
    if (input !== SIGN) {
      if (input !== EQUAL) {
        if (this.#isEqualsOperation) this.#firstOperand = this.#answer;
        this.#deleteEqualsOperation();
        this.#operator = input;
      } else {
         this.#isEqualsOperation = true;
      };
    } else {
      this.#deleteEqualsOperation();
      if (this.#lastInputTypeDefined() === OPERATOR) this.#delete();
      (this.#isNotEmptyString(this.#secOperand)) ? this.#secOperand *= -1 : this.#firstOperand *= -1;
    }
  }
  
  #processBacktrackInput(input) {
    if (input === AC) this.#clear();
    else if (input === DEL) this.#delete();
    this.#backtrack = input;
  }

  #lastInputTypeDefined() {
    if (this.#isNotEmptyString(this.#secOperand)) return OPERAND;
    else if (this.#isNotEmptyString(this.#operator)) return OPERATOR;
    else if (this.#isNotEmptyString(this.#firstOperand)) return OPERAND;
  }

  #lastInputDefined() {
    if (this.#isNotEmptyString(this.#secOperand)) return this.#secOperand;
    else if (this.#isNotEmptyString(this.#firstOperand)) return this.#firstOperand;
    return "";
  }

  #clear() {
    this.#firstOperand = "";
    this.#operator = "";
    this.#secOperand = "";
    this.#isEqualsOperation = false;
    this.#backtrack = "";
    this.#answer = "";
  }

  #delete() {
    if (this.#isNotEmptyString(this.#secOperand)) this.#secOperand = "";
    else if (this.#isNotEmptyString(this.#operator)) this.#operator = "";
    else if (this.#isNotEmptyString(this.#firstOperand)) this.#firstOperand = "";
    this.#isEqualsOperation = false;
  }

  #clearEqualsOperation() {
    if (this.#isEqualsOperation) this.#clear();
  }

  #deleteEqualsOperation() {
    if (this.#isEqualsOperation) this.#delete();
    this.#isEqualsOperation = false;
  }

  #isNotEmptyString(input) {
    return input !== "";
  }

  get firstOperand() {
    return this.#firstOperand;
  }

  set answer(answer) {
    this.#answer = answer;
  }

  get operator() {
    return this.#operator;
  }

  get secOperand() {
    return this.#secOperand;
  }
 
  get isEqualsOperation() {
    return this.#isEqualsOperation;
  }

  get backtrack() {
    return this.#backtrack;
  }

  set backtrack(backtrack) {
    this.#backtrack = backtrack;
  }
}

export {CalculatorInput, AC};