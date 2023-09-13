const display = document.getElementById("currentOperationScreen");
const smallScreen = document.querySelector(".screen-last");
const clearButton = document.getElementById("clear");
const delButton = document.getElementById("delete");
const equalButton = document.getElementById("equal");
const numberButtons = document.querySelectorAll(
  ".btn:not(#clear, #equal, #delete)"
);

let input = "";

// clear button
clearButton.addEventListener("click", clearDisplay);
function clearDisplay() {
  input = "";
  display.textContent = "0";
  smallScreen.textContent = "0";
}

// append display
numberButtons.forEach((btn) =>
  btn.addEventListener("click", () => appendDisplay(btn.textContent))
);
function appendDisplay(value) {
  input += value;
  display.textContent = input;
  smallScreen.textContent = display.textContent;
}
// delete button
delButton.addEventListener("click", deleteLast);
function deleteLast() {
  input = input.slice(0, -1);
  display.textContent = input;
}
// calculate
equalButton.addEventListener("click", calculateResult);
function calculateResult() {
  const result = operate(input);
  input = result.toString();
  display.textContent = result;
}

function operate(expression) {
  //transform input into array
  const operators = ["+", "-", "*", "/"];
  const tokens = expression.split(/([\+\-\*\/])/);
  console.log(tokens);

  let currentOperator = null;
  let currentOperand = 0;

  for (const token of tokens) {
    if (operators.includes(token)) {
      currentOperator = token;
    } else {
      const operand = parseFloat(token);
      if (!isNaN(operand)) {
        if (currentOperator === null) {
          currentOperand = operand;
        } else {
          switch (currentOperator) {
            case "+":
              currentOperand += operand;
              break;
            case "*":
              currentOperand *= operand;
              break;
            case "-":
              currentOperand -= operand;
              break;
            case "/":
              currentOperand /= operand;
              break;
          }
          currentOperator = null;
        }
      }
    }
  }
  return currentOperand;
}
