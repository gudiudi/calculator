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
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function calculateExpression(a, b, operator) {
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

  const operators =  ['+', '-', '*', '/', '%'];
  const isOperator = (x) => operators.includes(x);
  const getOperator = (arr) => arr.filter(x => isOperator(x));
  const getOperatorIndex = (arr, operator) => arr.findIndex(x => x === operator);

  const operator = getOperator(expressionArr);
  const operatorIndex = getOperatorIndex(expressionArr, operator[0]);

  const operandA = expressionArr.slice(0, operatorIndex);
  const operandB = expressionArr.slice(operatorIndex + 1, expressionArr.length);

  return [Number(operandA.join('')), Number(operandB.join('')), operator[0]];
}

/*
TODO:
1. Prevent user from inputing multiple operator
2. Fix a case when the operand is a negative in parseExpression
3. Make the result text smaller when the textContent is wider than the display width
4. Round the answers with long decimals so that they don’t overflow the display.
5. Prevent the user to divide by 0
*/

(() => {
  const calculatorButtons = document.querySelector('.calculator-buttons');
  const calculatorDisplayValue = document.querySelector('.calculator-display-value');

  calculatorButtons.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.textContent;

    if (value === '=') {
      const [operandA, operandB, operator] = parseExpression(calculatorDisplayValue.textContent);
      const result = calculateExpression(operandA, operandB, operator);
      console.log(result);
      calculatorDisplayValue.textContent = result;
    } else if (value === 'DEL') {
      calculatorDisplayValue.textContent = calculatorDisplayValue.textContent.slice(0, -1);
    } else if (value === 'AC') {
      calculatorDisplayValue.textContent = '';
    } else {
      calculatorDisplayValue.textContent += value;
    }
  });
})();