const display = document.getElementById('display');
let currentInput = '';

function updateDisplay() {
    display.value = currentInput;
}

function appendToDisplay(value) {
    currentInput += value;
    updateDisplay();
}

document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    updateDisplay();
});

document.getElementById('equals').addEventListener('click', () => {
    try {
        // Using Function constructor as a safer alternative to eval
        currentInput = new Function('return ' + currentInput)().toString();
        updateDisplay();
    } catch {
        currentInput = 'Error';
        updateDisplay();
    }
});

// Event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        if (value !== null) {
            appendToDisplay(value);
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9+\-*/.]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        document.getElementById('equals').click();
    } else if (key === 'Escape') {
        document.getElementById('clear').click();
    }
});
