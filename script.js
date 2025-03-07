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

function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

(() => {
  const calculatorButtons = document.querySelector('.calculator-buttons');
  const calculatorDisplayValue = document.querySelector('.calculator-display-value');

  let a = '', 
      b = '', 
      operator = '';

  calculatorButtons.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.textContent;
    
    if (
      isNumeric(value) || 
      (value === '.' && !calculatorDisplayValue.textContent.includes('.')) ||
      (value === '-' && a[0] !== '-' && a.length === 0)
    ) {
      a += value;
      calculatorDisplayValue.textContent = a;
    }
  });
})();