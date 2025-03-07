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

  const getOperatorsIndex = (arr, operator) => arr.findLastIndex(x => x === operator);

  const operators = getOperators(expressionArr);
  const operatorsIndex = getOperatorsIndex(expressionArr, operators[operators.length - 1]);

  const a = expressionArr.slice(0, operatorsIndex);
  const b = expressionArr.slice(operatorsIndex + 1, expressionArr.length);
  if (b.length <= 0) return null;

  return [Number(a.join('')), Number(b.join('')), operators[operators.length - 1]];
}

function isOperator(value) {
  const operators =  ['+', '-', '*', '/', '%'];
  return operators.includes(value);
}

function getOperators(arr) {
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
5. REFACTOR!!!!!!!!!!
*/

(() => {
  const calculatorButtons = document.querySelector('.calculator-buttons');
  const calculatorDisplayValue = document.querySelector('.calculator-display-value');
  let result;

  const updateDisplayText = (value) => calculatorDisplayValue.textContent = value;

  const getDisplayText = () => calculatorDisplayValue.textContent;

  const deleteLastEntry = (text) => {
    if (
      text[text.length - 1] !== 0 &&
      text.length > 1
    ) {
      updateDisplayText(text.slice(0, -1));
    } else if (
      text[text.length - 1] !== 0 &&
      text.length === 1
    ) {
      updateDisplayText('0');
    }
  };

  const clearExpression = () => {
    result = undefined;
    updateDisplayText('0');
  };

  const handleOperatorInput = (value, text, operators) => {
    if (
      (operators.length >= 1 && text[0] !== '-' && !isOperator(text[text.length - 1])) ||
      (operators.length >= 2 && text[0] === '-' && !isOperator(text[text.length - 1]))
    ) {
      return;
    }

    if (
      isOperator(text[text.length - 1]) ||
      (text.length === 1 && text === '0' && value === '-')
    ) {
      updateDisplayText(text.slice(0, -1));
    }

    updateDisplayText(getDisplayText() + value);
    result = undefined;
  };

  const handleNumericInput = (value, text) => {
    // Pressing a new digit should clear the result and start a new calculation
    if (result !== undefined && !isOperator(value)) {
      result = undefined;
      updateDisplayText('');
    }

    // Prevent the user from inputing 0 in front on operand a & b e.g. 02+5, 2+05
    if (
      (text[0] === '0' && value !== '.' && text.length === 1) ||
      (text[text.length - 1] === '0' && value !== '.' && isOperator(text[text.length - 2]))
    ) {
      updateDisplayText(text.slice(0, -1));
    }

    updateDisplayText(getDisplayText() + value);
  };

  calculatorButtons.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.textContent;
    const text = getDisplayText();

    const operators = getOperators(text.split(''));

    if (value === '=') {
      const expression = parseExpression(text);
      if (!expression) return;
      result = calculateExpression(expression);
      updateDisplayText(result);
    } else if (value === 'DEL') {
      deleteLastEntry(text);
    } else if (value === 'AC') {
      clearExpression();
    } else if (
      (isOperator(value) && text[0] !== '-') || 
      (isOperator(value) && text.length > 1 && text[0] === '-') ||
      (isOperator(value) && value === '-')
    ) {
      handleOperatorInput(value, text, operators);
    } else if (
      isNumeric(value) ||
      value === '.'
    ) {
      handleNumericInput(value, text);
    }
  });
})();