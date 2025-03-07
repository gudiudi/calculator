function add() {

}

function subtract() {

}

function multiply() {

}

function divide() {

}

function operate() {
  
}

(() => {
  const calculatorButtons = document.querySelector('.calculator-buttons');

  calculatorButtons.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target.textContent);
  });
})();