# Project Overview

This is a simple web‑based calculator application built with **HTML**, **CSS**, and **JavaScript**. It provides a clean, responsive UI that allows users to perform basic arithmetic operations (addition, subtraction, multiplication, division) using either mouse clicks or keyboard shortcuts.

---

## Features

- **Basic arithmetic**: addition, subtraction, multiplication, division.
- **Responsive design**: works on desktop and mobile browsers.
- **Keyboard support**: use the number keys, `+`, `-`, `*`, `/`, `Enter` (equals), `Backspace` (clear entry), and `Esc` (reset).
- **Error handling**: displays a clear message for invalid input such as division by zero.
- **Clear and Reset**: `C` clears the current entry, `AC` resets the whole calculation.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (flexbox layout) |
| Logic | Vanilla JavaScript (ES6) |

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your‑username/your‑calculator‑repo.git
   cd your‑calculator‑repo
   ```
2. **Open the application**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari). No additional build steps or server are required.
   - For a quick preview you can also run:
     ```bash
     npx serve .   # if you have Node.js installed
     ```
     Then navigate to `http://localhost:5000`.

---

## Usage Guide

### Button Layout
| Button | Function |
|--------|----------|
| `0‑9` | Input digits |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `=` | Calculate result |
| `C` | Clear current entry |
| `AC` | Reset the whole calculation |
| `.` | Decimal point |

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0‑9` | Enter digit |
| `+` `-` `*` `/` | Choose operation |
| `Enter` or `=` | Evaluate expression |
| `Backspace` | Clear the last digit (same as `C`) |
| `Esc` | Reset calculator (same as `AC`) |
| `.` | Decimal point |

### Behavior on Invalid Input
- **Division by zero**: When the user attempts to divide by zero, the display shows `Error: Division by zero` and the calculator is automatically reset after a short pause.
- **Multiple consecutive operators**: The script replaces the previous operator with the new one, preventing malformed expressions.
- **Overflow / Too many digits**: If the result exceeds the display capacity, it is shown in exponential notation to keep the UI tidy.

---

## File Structure

```
project-root/
├─ index.html      # Main HTML page – loads style.css and script.js
├─ style.css       # Styling for the calculator layout and responsive design
├─ script.js       # Core JavaScript logic – handles UI events, calculations, and error handling
├─ README.md       # This documentation file
└─ assets/         # (optional) images or icons used by the UI
```

- **index.html**: Contains the markup for the calculator, including the display area and all buttons. It links to `style.css` for styling and `script.js` for interactive behavior.
- **style.css**: Defines the visual appearance, grid layout of buttons, colors, fonts, and responsive adjustments for different screen sizes.
- **script.js**: Implements the calculator logic:
  - Captures click events on buttons and keydown events from the keyboard.
  - Builds the arithmetic expression, evaluates it with `eval` (safely wrapped), and updates the display.
  - Handles special cases such as division by zero and clears/reset actions.
  - Communicates with the DOM elements defined in `index.html`.

---

## Contributing

Feel free to fork the repository, create a feature branch, and submit a pull request. Contributions such as UI improvements, additional operations (e.g., exponentiation), or accessibility enhancements are welcome.

---

## License

This project is licensed under the MIT License – see the `LICENSE` file for details.
