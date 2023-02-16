const buttons = document.querySelectorAll("button");
const zahlen = document.querySelectorAll(".zahl");
const operatoren = document.querySelectorAll(".operator");
const display = document.querySelector(".outputNumbers");
const inputNumbers = document.querySelector(".inputNumbers");
const result = document.querySelector(`.operator[data-key="Enter"]`);
const kitty = document.querySelector("#kitty");
const box = document.querySelector(".box");

const colorOne = document.querySelectorAll(".box, button, .bottom");
const colorTwo = document.querySelectorAll(".display, .operatoren, .zahlen");
const colorOperatorZahl = document.querySelectorAll(".operatoren, .zahlen");

let input1 = "";
let input2 = "";
let resultOutput = "";
let operatorInput = "";
let didResult = 0;

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

function checkDidResult(){
  if (didResult != 0){
    display.textContent = "";
    inputNumbers.textContent = resultOutput;
    input1 = resultOutput;
    input2 = resultOutput;
    operatorInput= "";
    didResult = 0;
  }
}

function checkOperator(){
  if (didResult != 0){
    display.textContent = "";
    inputNumbers.textContent = resultOutput;
    input1 = resultOutput;
    input2 = resultOutput;
    operatorInput= "";
    didResult = 0;
  }
};

function removeTransistion(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("active");
}

function zahlKlick(e) {
  checkDidResult();
    const key = document.querySelector(`.zahl[data-key="${e.key}"]`);
    if (key === null){
        return;
    }
    key.classList.add("active");
    if (isNaN(key.textContent) === true){
      input1 += key.textContent;
    }else{
    input1 += parseInt(key.textContent);
    }
    inputNumbers.textContent = `${input2} ${operatorInput} ${input1}`;
  };

  function zahlMaus(input) {
    if (isNaN(input) === true){
      input1 += input
    }else{
      input1 += parseInt(input);
    };
    inputNumbers.textContent = `${input2} ${operatorInput} ${input1}`;
  };

  function operatorMaus(input) {
    checkOperator();
    if (input === "="){
      if (input1.length < 1){
        input1 = "0";
        inputNumbers.textContent = `${input2} ${operatorInput} ${input1}`;
      }
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
      didResult = 1;
      return;
      }
    }
    if (input === "clear"){
      inputNumbers.textContent = "";
      display.textContent = "";
      input1 = "";
      input2 = "";
      operatorInput= "";
      didResult = 0;
    }else{
    operatorInput = input;  
    input2 = input1;
    if (input2 === ""){
      input2 = "0";
    };
    input1 = "";
    inputNumbers.textContent = `${input2} ${operatorInput}`;
  }}; 

function operatorKlick(e) {
  checkDidResult();
  const key = document.querySelector(`.operator[data-key="${e.key}"]`);
  if (key === null){
      return;
  }
  key.classList.add("active");
  if (e.key === "Enter"){
    document.addEventListener('keypress', function (e) {
          e.preventDefault();
  });
    return;
  }
  if (e.key === "Backspace"){
    inputNumbers.textContent = "";
    display.textContent = "";
    input1 = "";
    input2 ="";
    operatorInput= "";
    didResult = 0;
  }else{
  operatorInput = e.key;  
  input2 = input1;
  if (input2 === ""){
    input2 = 0;
  };
  checkOperator();
  input1 = "";
  inputNumbers.textContent = `${input2} ${operatorInput}`;
}};
 
  buttons.forEach(button => button.addEventListener('transitionend', removeTransistion));
  buttons.forEach(button => button.addEventListener("click", () => button.classList.add("active")));

  zahlen.forEach(zahl => zahl.addEventListener("click", () => {
    let input
    if (isNaN(zahl.textContent) === true){
      input = String(zahl.textContent);
    }else{
      input = zahl.textContent;
    };
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
    if (input1.length < 1){
      input1 = "0";
      inputNumbers.textContent = `${input2} ${operatorInput} ${input1}`;
    }
    resultOutput = calculation(input2, input1, operatorInput);
    if (resultOutput % 1 != 0){
      resultOutput = Number(resultOutput).toFixed(4);
      resultOutput = parseFloat(resultOutput);
    }
    if (isNaN(resultOutput) === true){
      inputNumbers.textContent = ""
      display.textContent = "";
      input1 = "";
      input2 = "";
    }else{
    display.textContent = `= ${resultOutput}`;
    didResult = 1;
    }
  });
  
  //color-changer
  kitty.addEventListener("click", () => {
  colorOne.forEach(color => color.classList.toggle("styleKitty1"));
  colorTwo.forEach(color => color.classList.toggle("styleKitty2"));
  box.classList.toggle("styleKitty3");
  if (kitty.textContent === "Sabines 'Hello Kitty' Mode"){
    kitty.textContent = "✨🌙 Standard Mode 🌙✨"
  }else{
    kitty.textContent = "Sabines 'Hello Kitty' Mode"
  };
  });

  
 
