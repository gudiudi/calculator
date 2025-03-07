function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 0;
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function calculateExpression(exp) {
  const [a, b, operator] = exp;

  const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': modulus
  };

  return operations[operator] ? operations[operator](a, b) : 0;
}

function parseExpression(exp) {
  const expressionArr = exp.split('');
  console.log(expressionArr);

  const getOperatorIndex = (arr, operator) => arr.findLastIndex(x => x === operator);

  const operator = getOperator(expressionArr);
  const operatorIndex = getOperatorIndex(expressionArr, operator[operator.length - 1]);

  const a = expressionArr.slice(0, operatorIndex);
  const b = expressionArr.slice(operatorIndex + 1, expressionArr.length);
  if (b.length <= 0) return null;

  return [Number(a.join('')), Number(b.join('')), operator[operator.length - 1]];
}

function isOperator(value) {
  const operators =  ['+', '-', '*', '/', '%'];
  return operators.includes(value);
}

function getOperator(arr) {
  return arr.filter(x => isOperator(x));
}

function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

/*
TODO:
1. Make the result text smaller when the textContent is wider than the display width
2. Round the answers with long decimals so that they don’t overflow the display.
3. Check if displayValue first user input is 0, if it's then the second user input should replace it.
4. Prevent multiple comma
*/

(() => {
  const calculatorButtons = document.querySelector('.calculator-buttons');
  const calculatorDisplayValue = document.querySelector('.calculator-display-value');

  let result;
  calculatorButtons.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.textContent;

    const operators = getOperator(calculatorDisplayValue.textContent.split(''));

    if (value === '=') {
      const expression = parseExpression(calculatorDisplayValue.textContent);
      if (!expression) return;
      result = calculateExpression(expression);
      calculatorDisplayValue.textContent = result;
    } else if (value === 'DEL') {
      if (
        calculatorDisplayValue.textContent[calculatorDisplayValue.textContent.length - 1] !== 0 &&
        calculatorDisplayValue.textContent.length > 1
      ) {
        calculatorDisplayValue.textContent = calculatorDisplayValue.textContent.slice(0, -1);
      }
    } else if (value === 'AC') {
      result = undefined;
      calculatorDisplayValue.textContent = '0';
    } else if (
      (isOperator(value) && calculatorDisplayValue.textContent.length > 0 && calculatorDisplayValue.textContent[0] !== '-') || 
      (isOperator(value) && calculatorDisplayValue.textContent.length > 1 && calculatorDisplayValue.textContent[0] === '-') ||
      (isOperator(value) && value === '-')
    ) {
      if (
        (operators.length >= 1 && calculatorDisplayValue.textContent[0] !== '-' && !isOperator(calculatorDisplayValue.textContent[calculatorDisplayValue.textContent.length - 1])) ||
        (operators.length >= 2 && calculatorDisplayValue.textContent[0] === '-' && !isOperator(calculatorDisplayValue.textContent[calculatorDisplayValue.textContent.length - 1]))
      ) {
        return;
      }

      if (
        isOperator(calculatorDisplayValue.textContent[calculatorDisplayValue.textContent.length - 1]) ||
        (calculatorDisplayValue.textContent.length === 1 && calculatorDisplayValue.textContent === '0' && value === '-')
      ) {
        calculatorDisplayValue.textContent = calculatorDisplayValue.textContent.slice(0, -1);
      }

      calculatorDisplayValue.textContent += value;
      result = undefined;
    } else if (
      isNumeric(value) ||
      value === '.'
    ) {
      // Pressing a new digit should clear the result and start a new calculation
      if (result !== undefined && !isOperator(value)) {
        result = undefined;
        calculatorDisplayValue.textContent = '';
      }

      // Prevent the user from inputing 0 in front on operand a & b e.g. 02+5, 2+05
      if (
        (calculatorDisplayValue.textContent[0] === '0' && value !== '.' && calculatorDisplayValue.textContent.length === 1) ||
        (calculatorDisplayValue.textContent[calculatorDisplayValue.textContent.length - 1] === '0' && value !== '.' && isOperator(calculatorDisplayValue.textContent[calculatorDisplayValue.textContent.length - 2]))
      ) {
        calculatorDisplayValue.textContent = calculatorDisplayValue.textContent.slice(0, -1);
      }

      calculatorDisplayValue.textContent += value;
    }
  });
})();