# Task Manager

## Brief Description
A lightweight, client‑side **Task Manager** built with plain **HTML**, **CSS**, and **JavaScript**. Users can add, complete, delete, and filter tasks. All data is persisted in the browser’s **localStorage**, so tasks survive page reloads without any backend.

---

## Tech Stack
- **HTML** – markup for the UI
- **CSS** – styling and responsive layout
- **JavaScript** – core functionality, DOM manipulation, and local storage handling

---

## Features
- **Add tasks** via input field or pressing **Enter**
- **Mark tasks as completed** with a checkbox
- **Delete tasks** individually
- **Filter view** – All / Active / Completed
- **Persistence** – tasks are saved to `localStorage`
- **Responsive design** – works on mobile, tablet, and desktop

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository‑url>
   cd <repo‑folder>
   ```
2. **Open the application**
   - Simply open `index.html` in any modern browser (no server required).
   - Example:
     ```bash
     open index.html   # macOS
     start index.html  # Windows
     ```

---

## Usage Guide
### Adding a Task
1. Type a task description into the **"Add a new task"** input field.
2. Click **Add** **or** press **Enter**.
3. The task appears in the list.

### Completing a Task
- Click the checkbox next to a task. The text will receive a `completed` style (usually a strikethrough) and the state is saved.

### Deleting a Task
- Click the **Delete** button that appears next to each task.

### Filtering Tasks
- Use the three filter buttons at the bottom:
  - **All** – shows every task.
  - **Active** – shows only tasks that are not completed.
  - **Completed** – shows only tasks that have been marked done.

---

## Local Storage Persistence
The app stores the task array as a JSON string under the key `"tasks"` in `localStorage`.
```js
// Save
localStorage.setItem('tasks', JSON.stringify(tasks));

// Load
const stored = localStorage.getItem('tasks');
const tasks = stored ? JSON.parse(stored) : [];
```
Because the data lives in the browser, it persists across page reloads and even after closing/re‑opening the browser – as long as the user does not clear site data.

---

## Responsive Design Notes
- The layout uses flexible widths (`max‑width`, `width: 100%`) and media queries to adapt to smaller screens.
- Buttons and inputs scale nicely on touch devices.
- No horizontal scrolling occurs; the UI stacks vertically on narrow viewports.

---

## Key JavaScript Functions (app.js)
```js
// Load tasks from localStorage
function loadTasksFromStorage() {
  const stored = localStorage.getItem('tasks');
  try {
    tasks = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse tasks from storage', e);
    tasks = [];
  }
}

// Save tasks to localStorage
function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask(title) {
  if (!title) return;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  saveTasksToStorage();
  renderTasks(currentFilter);
  taskInput.value = '';
}

// Delete a task by its id
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasksToStorage();
  renderTasks(currentFilter);
}

// Toggle completion state
function toggleTaskCompleted(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks(currentFilter);
  }
}
```

## Sample HTML Structure
```html
<div class="app">
  <header>
    <h1>Task Manager</h1>
  </header>
  <input id="new-task-input" placeholder="Add a new task" />
  <button id="add-task-btn">Add</button>
  <ul id="task-list"></ul>
  <section class="filters">
    <button data-filter="all">All</button>
    <button data-filter="active">Active</button>
    <button data-filter="completed">Completed</button>
  </section>
</div>
```

---

*Enjoy managing your tasks!*