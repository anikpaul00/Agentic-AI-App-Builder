// Task Manager Application
// Variable declarations
const taskInput = document.getElementById('new-task-input');
const addBtn = document.getElementById('add-task-btn');
const taskListEl = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('[data-filter]');
let tasks = [];

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

// Render tasks based on filter (all | active | completed)
function renderTasks(filter = 'all') {
  // Clear current list
  taskListEl.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';

    const span = document.createElement('span');
    span.textContent = task.title;
    if (task.completed) span.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskListEl.appendChild(li);
  });
}

// Add a new task
function addTask(title) {
  if (!title) return;
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };
  tasks.push(newTask);
  saveTasksToStorage();
  renderTasks(currentFilter);
  taskInput.value = '';
}

// Delete a task by id
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasksToStorage();
  renderTasks(currentFilter);
}

// Toggle completion state of a task
function toggleTaskCompleted(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks(currentFilter);
  }
}

let currentFilter = 'all';
function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks(filter);
}

// Event listeners
addBtn.addEventListener('click', () => {
  const title = taskInput.value.trim();
  addTask(title);
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const title = taskInput.value.trim();
    addTask(title);
  }
});

// Delegated events for task list (checkbox and delete button)
taskListEl.addEventListener('click', e => {
  const target = e.target;
  const li = target.closest('li.task-item');
  if (!li) return;
  const id = Number(li.dataset.id);

  if (target.matches('input.task-checkbox')) {
    toggleTaskCompleted(id);
  } else if (target.matches('button.delete-btn')) {
    deleteTask(id);
  }
});

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setFilter(btn.dataset.filter);
  });
});

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromStorage();
  renderTasks();
  setFilter('all');
});
