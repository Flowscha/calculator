const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

//buttton-hover anfang
function removeTransistion(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("active");
  }

  
buttons.forEach(button => button.addEventListener("mouseover", () => button.classList.add("active")));

//button-hover ende

display.textContent = "1984 - 1337 = 47";

function zahlKlick(e) {
    const key = document.querySelector(`.zahl[data-key="${e.key}"]`);
    if (key === null){
        return;
    }
    key.classList.add("active");
  }

  function operatorKlick(e) {
    const key = document.querySelector(`.operator[data-key="${e.key}"]`);
    if (key === null){
        return;
    }
    key.classList.add("active");
  }
 
  buttons.forEach(button => button.addEventListener('transitionend', removeTransistion));
  
  window.addEventListener('keydown', zahlKlick);
  window.addEventListener('keydown', operatorKlick);