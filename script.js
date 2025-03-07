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
  if (operators.length < 1) return null;
  const operatorsIndex = getOperatorsIndex(expressionArr, operators[operators.length - 1]);

  const a = expressionArr.slice(0, operatorsIndex);
  const b = expressionArr.slice(operatorsIndex + 1, expressionArr.length);
  if (b.length < 1) return null;

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

function truncateTo8Decimals(num) {
  return Math.trunc(num * 1e8) / 1e8;
}

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

    result = undefined;
  };

  const clearExpression = () => {
    result = undefined;
    updateDisplayText('0');
  };

  const handleOperatorInput = async (value, text, operators) => {
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

  const handleDecimalInput = (value, text, operators) => {
    // Pressing a new digit should clear the result and start a new calculation
    if (result !== undefined && !isOperator(value)) {
      result = undefined;
      updateDisplayText('0');
    }

    const expressionArr = text.split('');
    const getOperatorsIndex = (arr, operator) => arr.findLastIndex(x => x === operator);
    const operatorsIndex = getOperatorsIndex(expressionArr, operators[operators.length - 1]);

    const b = expressionArr.slice(operatorsIndex + 1, expressionArr.length);

    if (
      operators.length === 0 && !text.includes('.') && text.length > 0 ||
      operators.length >= 1 && b.length >= 0 && !b.includes('.')
    ) {
      updateDisplayText(getDisplayText() + value);
    }
  };

  calculatorButtons.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.textContent;
    const text = getDisplayText();

    const operators = getOperators(text.split(''));

    if (value === '=') {
      const expression = parseExpression(text);
      if (!expression) return;
      console.log(expression);
      result = truncateTo8Decimals(calculateExpression(expression));
      if (isNaN(result)) return result = undefined;
      console.log(result);
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
    } else if (isNumeric(value)) {
      handleNumericInput(value, text);
    } else if (value === '.') {
      handleDecimalInput(value, text, operators);
    }
  });
})();