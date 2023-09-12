const display = document.getElementById("currentOperationScreen");
const clearButton = document.getElementById("clear");
const delButton = document.getElementById("delete");
const equalButton = document.getElementById("equal");
const numberButtons = document.querySelectorAll(
  ".btn:not(#clear, #equal, #delete)"
);

let input = "";
//clear button
clearButton.addEventListener("click", clearDisplay);
function clearDisplay() {
  input = "";
  display.textContent = "";
}

//append call
numberButtons.forEach((btn) =>
  btn.addEventListener("click", () => appendDisplay(btn.textContent))
);
function appendDisplay(value) {
  input += value;
  display.textContent = input;
}
