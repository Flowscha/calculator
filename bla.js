const buttons = document.querySelectorAll("button");
const zahlen = document.querySelectorAll(".zahl");
const operatoren = document.querySelectorAll(".operator");
const display = document.querySelector(".outputNumbers");
const inputNumbers = document.querySelector(".inputNumbers")
const result = document.querySelector(`.operator[data-key="Enter"]`)

let input1 = "";
let input2 = "";
let resultOutput = "";
let operatorInput = "";

function calculation(a,b, operator) {
  a = Number(a);
  b = Number(b);

  switch(operator) {
    case "+":
      return a+b;
      break;
    case "-":
      return a-b;
      break;
    case "*":
      return a*b;
      break;
    case "/":
      return a/b;
      break;
  }
}

function removeTransistion(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("active");
  }

function zahlKlick(e) {
    const key = document.querySelector(`.zahl[data-key="${e.key}"]`);
    if (key === null){
        return;
    }
    key.classList.add("active");
    input1 += parseInt(key.textContent);
    
    inputNumbers.textContent = `${input2} ${operatorInput} ${input1}`;
  };

  function zahlMaus(input) {
    input1 += parseInt(input);
    inputNumbers.textContent = `${input2} ${operatorInput} ${input1}`;
  };

  function operatorMaus(input) {
    if (input === "="){
      resultOutput = calculation(input2, input1, operatorInput);
      if (resultOutput % 1 != 0){
        resultOutput = Number(resultOutput).toFixed(4);
        resultOutput = parseFloat(resultOutput);
      }
      if (isNaN(resultOutput) === true){
        inputNumbers.textContent = ""
        display.textContent = "";
        location.reload();
      }else{
      display.textContent = `= ${resultOutput}`;
      return;
      }
    }
    if (input === "clear"){
      inputNumbers.textContent = "C L E A R"
      display.textContent = "";
      location.reload();
    }else{
    operatorInput = input;  
    input2 = input1;
    if (input2 === ""){
      input2 = 0;
    };
    input1 = "";
    inputNumbers.textContent = `${input2} ${operatorInput}`;
  }};

function operatorKlick(e) {
  const key = document.querySelector(`.operator[data-key="${e.key}"]`);
  if (key === null){
      return;
  }
  key.classList.add("active");
  if (e.key === "Enter"){
    return;
  }
  if (e.key === "Backspace"){
    inputNumbers.textContent = "C L E A R"
    display.textContent = "";
    location.reload();
  }else{
  operatorInput = e.key;  
  input2 = input1;
  if (input2 === ""){
    input2 = 0;
  };
  input1 = "";
  inputNumbers.textContent = `${input2} ${operatorInput}`;
}};
 
  buttons.forEach(button => button.addEventListener('transitionend', removeTransistion));
  buttons.forEach(button => button.addEventListener("click", () => button.classList.add("active")));

  zahlen.forEach(zahl => zahl.addEventListener("click", () => {
    let input = zahl.textContent;
    zahlMaus(input);
  }  
  ));

  operatoren.forEach(operator => operator.addEventListener("click", () => {
    let input = operator.textContent;
    input = input.trim();
    operatorMaus(input);
    }

  ));

  window.addEventListener('keydown', zahlKlick);
  window.addEventListener('keydown', operatorKlick);

  result.addEventListener('transitionend', () => {
    resultOutput = calculation(input2, input1, operatorInput);
    if (resultOutput % 1 != 0){
      resultOutput = Number(resultOutput).toFixed(4);
      resultOutput = parseFloat(resultOutput);
    }
    if (isNaN(resultOutput) === true){
      inputNumbers.textContent = ""
      display.textContent = "";
      location.reload();
    }else{
    display.textContent = `= ${resultOutput}`;
    }
  });
  
  
