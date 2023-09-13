const clear = document.getElementById("clear");
const delButton = document.getElementById("delete");
const equal = document.getElementById("equal");
const numBtn = document.querySelectorAll(".num:not(#clear, #equal, #delete)");
const opNums = document.querySelectorAll(".operator");
const display = document.getElementById("currentOperationScreen");
const smallScreen = document.getElementById("lastOperationScreen");
const operators = ["+", "-", "*", "/"];

let firstOperand = "";
let currentOperator = "";
let secondOperand = "";
let result = "";
let pre = "";
//clear button
clear.addEventListener("click", clearDisplay);
function clearDisplay() {
  firstOperand = "";
  currentOperator = "";
  secondOperand = "";
  result = "";
  display.textContent = "0";
  smallScreen.textContent = "0";
}
//delete button
delButton.addEventListener("click", deleteLast);
function deleteLast() {
  if (currentOperator === "") {
    firstOperand = firstOperand.slice(0, -1);
    display.textContent = firstOperand;
  } else if (secondOperand === "" && currentOperator != "") {
    currentOperator = "";
    smallScreen.textContent = firstOperand;
  } else {
    secondOperand = secondOperand.slice(0, -1);
    display.textContent = `${secondOperand}`;
  }
}
//append display
numBtn.forEach((btn) => {
  btn.addEventListener("click", () => appendDisplay(btn.textContent));
});
function appendDisplay(value) {
  if (currentOperator === "") {
    firstOperand += value;
    display.textContent = `${firstOperand} ${currentOperator}`;
  } else {
    secondOperand += value;
    display.textContent = secondOperand;
  }
}
// operator btns
opNums.forEach((btn) =>
  btn.addEventListener("click", () => handleOperator(btn.textContent))
);
function handleOperator(operator) {
  if (firstOperand !== "") {
    if (currentOperator === "") {
      currentOperator = operator;
      smallScreen.textContent = `${firstOperand} ${currentOperator}`;
    } else {
      calculateResult();
      currentOperator = operator;
    }
  }
}

//round
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// calculate function
equal.addEventListener("click", calculateResult);
function calculateResult() {
  if (firstOperand !== "" && secondOperand !== "") {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    switch (currentOperator) {
      case "+":
        pre = num1 + num2;
        result = pre;
        smallScreen.textContent = ` ${num1} + ${num2} = ${result}`;
        break;
      case "÷":
        if (num2 !== 0) {
          pre = num1 / num2;
          result = roundResult(pre);
          smallScreen.textContent = ` ${num1} ÷ ${num2} = ${result}`;
        } else {
          result = "stupid ";
          smallScreen.textContent = "bruh";
        }
        break;
      case "x":
        pre = num1 * num2;
        result = roundResult(pre);
        smallScreen.textContent = ` ${num1} x ${num2} = ${result}`;
        break;
      case "-":
        pre = num1 - num2;
        result = roundResult(pre);
        smallScreen.textContent = ` ${num1} - ${num2} = ${result}`;
        break;
    }
    firstOperand = result.toString();
    secondOperand = "";
    currentOperator = "";
    display.textContent = result;
  }
}

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
  document.querySelector('.checkbox-label').classList.toggle("dark")

})