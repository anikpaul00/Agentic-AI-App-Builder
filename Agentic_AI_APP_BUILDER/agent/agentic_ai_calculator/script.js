class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    // Prevent multiple leading zeros like "00"
    if (number === '0' && this.currentOperand === '0') return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let computation;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
      case '/':
        if (current === 0) {
          throw new Error('Division by zero');
        }
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation.toString();
    this.operation = null;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
}

// Export an instance of Calculator
const calculator = new Calculator();

// Existing UI handling code
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

function updateDisplay(value) {
  display.value = value;
}

function clearEntry() {
  display.value = display.value.slice(0, -1);
}

function resetCalculator() {
  display.value = '';
  if (typeof calculator !== 'undefined' && typeof calculator.clear === 'function') {
    calculator.clear();
  }
}

// New input handling logic
function handleInput(value) {
  try {
    if (/^[0-9.]$/.test(value)) {
      // Digit or decimal point
      calculator.appendNumber(value);
    } else if (['+', '-', '*', '/', '÷'].includes(value)) {
      // Operators (map '/' to '/' and keep '÷' as is)
      calculator.chooseOperation(value);
    } else if (value === '=') {
      calculator.compute();
    } else if (value === 'C') {
      calculator.delete();
    } else if (value === 'AC') {
      calculator.clear();
    } else {
      // Unsupported input – ignore
      return;
    }
    // Update the display after handling the input
    const displayValue = calculator.currentOperand || calculator.previousOperand || '';
    updateDisplay(displayValue);
  } catch (err) {
    // Handle errors such as division by zero
    alert(err.message);
    resetCalculator();
    updateDisplay('');
  }
}

// Attach click listeners to all calculator buttons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    if (value) {
      handleInput(value);
    }
  });
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key.match(/[0-9.]/)) {
    handleInput(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleInput(e.key);
  } else if (e.key === 'Enter') {
    handleInput('=');
  } else if (e.key === 'Backspace') {
    handleInput('C');
  } else if (e.key === 'Escape') {
    handleInput('AC');
  }
});
