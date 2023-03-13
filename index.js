let operations = document.getElementById("operations");
let liveView = document.getElementById("liveView");
let calc = document.getElementById("calc");
let equalSign = document.getElementById("equals");
let negativeSign = document.getElementById("negative");
let plusSign = document.getElementById("plus");
let minusSign = document.getElementById("minus");
let multiplySign = document.getElementById("multiply");
let divideSign = document.getElementById("divide");

let decimalAlreadyInserted = false;
let numberAfterDecimalAfterOperation = false;
let doubleOperation = false;
let newEntry = false;
let negativeSignBoolean = true;

calc.addEventListener("click", (e) => {
  if (e.target.innerHTML === "=") {
    if (operations.innerHTML.length > 0 && liveView.innerHTML.length === 0) {
      liveView.innerHTML = `${eval(operations.innerHTML)}`;
      newEntry = true;
      decimalAlreadyInserted = false;
    } else if (
      operations.innerHTML.length === 0 &&
      liveView.innerHTML.length === 0
    ) {
      operations.innerHTML = liveView.innerHTML;
    } else {
      operations.innerHTML = liveView.innerHTML;
      setTimeout(clearLiveView, 1);
      function clearLiveView() {
        liveView.innerHTML = `${eval(operations.innerHTML)}`;
      }
      newEntry = true;
      decimalAlreadyInserted = false;
    }
  } else if (e.target.innerHTML === "C") {
    liveView.innerHTML = "";
    negativeSign.classList.remove("activated");
    equalSign.classList.remove("deny");
    plusSign.classList.remove("deny");
    minusSign.classList.remove("deny");
    multiplySign.classList.remove("deny");
    divideSign.classList.remove("deny");
    negativeSignBoolean = true;
  } else if (e.target.innerHTML === "CE") {
    liveView.innerHTML = "";
    operations.innerHTML = "";
    negativeSign.classList.remove("activated");
    equalSign.classList.remove("deny");
    plusSign.classList.remove("deny");
    minusSign.classList.remove("deny");
    multiplySign.classList.remove("deny");
    divideSign.classList.remove("deny");
    negativeSignBoolean = true;
  } else if (e.target.innerHTML === "(-)") {
    if (negativeSignBoolean) {
      if (newEntry) {
        liveView.innerHTML = "(-";
        newEntry = false;
        negativeSign.classList.add("deny");
        equalSign.classList.add("deny");
        plusSign.classList.add("deny");
        minusSign.classList.add("deny");
        multiplySign.classList.add("deny");
        divideSign.classList.add("deny");
        negativeSignBoolean = false;
      } else {
        let lastCharacter = liveView.innerHTML[liveView.innerHTML.length - 1];
        if (
          lastCharacter === "+" ||
          lastCharacter === "-" ||
          lastCharacter === "*" ||
          lastCharacter === "/" ||
          liveView.innerHTML.length === 0
        ) {
          liveView.innerHTML += "(-";
          negativeSign.classList.add("deny");
          equalSign.classList.add("deny");
          plusSign.classList.add("deny");
          minusSign.classList.add("deny");
          multiplySign.classList.add("deny");
          divideSign.classList.add("deny");
          negativeSignBoolean = false;
        } else {
          negativeSign.classList.add("deny");
        }
      }
    } else {
      negativeSign.classList.remove("activated");
      equalSign.classList.remove("deny");
      plusSign.classList.remove("deny");
      minusSign.classList.remove("deny");
      multiplySign.classList.remove("deny");
      divideSign.classList.remove("deny");
      liveView.innerHTML += ")";
      negativeSignBoolean = true;
    }
  } else {
    if (newEntry) {
      if (
        e.target.innerHTML === "+" ||
        e.target.innerHTML === "-" ||
        e.target.innerHTML === "*" ||
        e.target.innerHTML === "/"
      ) {
        liveView.innerHTML += e.target.innerHTML;
        doubleOperation = true;
        newEntry = false;
      } else {
        liveView.innerHTML = e.target.innerHTML;
        newEntry = false;
      }
    } else {
      if (e.target.innerHTML === ".") {
        if (decimalAlreadyInserted) {
          liveView.innerHTML += "";
        } else {
          liveView.innerHTML += e.target.innerHTML;
          decimalAlreadyInserted = true;
        }
      } else {
        if (
          (e.target.innerHTML === "+" ||
            e.target.innerHTML === "-" ||
            e.target.innerHTML === "*" ||
            e.target.innerHTML === "/") &&
          numberAfterDecimalAfterOperation
        ) {
          if (doubleOperation) {
            liveView.innerHTML =
              liveView.innerHTML
                .split("")
                .slice(0, liveView.innerHTML.length - 1)
                .join("") + e.target.innerHTML;
            negativeSign.classList.remove("deny");
          } else {
            liveView.innerHTML += e.target.innerHTML;
            decimalAlreadyInserted = false;
            doubleOperation = true;
            negativeSign.classList.remove("deny");
          }
        } else if (
          (e.target.innerHTML === "+" ||
            e.target.innerHTML === "-" ||
            e.target.innerHTML === "*" ||
            e.target.innerHTML === "/") &&
          !numberAfterDecimalAfterOperation
        ) {
          if (doubleOperation) {
            liveView.innerHTML =
              liveView.innerHTML
                .split("")
                .slice(0, liveView.innerHTML.length - 1)
                .join("") + e.target.innerHTML;
          } else {
            liveView.innerHTML += "";
          }
        } else {
          if (doubleOperation) {
              if (negativeSignBoolean) {
                liveView.innerHTML += e.target.innerHTML;
                numberAfterDecimalAfterOperation = true;
                doubleOperation = false;
              } else {
                liveView.innerHTML += e.target.innerHTML;
                numberAfterDecimalAfterOperation = true;
                doubleOperation = false;
                negativeSign.classList.remove("deny")
                negativeSign.classList.add("activated")
              }
          } else {
            if (negativeSignBoolean) {
                liveView.innerHTML += e.target.innerHTML;
                numberAfterDecimalAfterOperation = true;
              } else {
                liveView.innerHTML += e.target.innerHTML;
                numberAfterDecimalAfterOperation = true;
                negativeSign.classList.remove("deny")
                negativeSign.classList.add("activated")
              }
          }
        }
      }
    }
  }
});
