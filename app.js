// Grab elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearBtn = document.getElementById('clear-completed');

// Load from localStorage or start empty
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save to localStorage
function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the list
function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));

        const span = document.createElement('span');
        span.textContent = todo.text;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', () => deleteTodo(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });

    const remaining = todos.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} task${remaining === 1 ? '' : 's'} remaining`;
}

// Add task
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = '';
    save();
    render();
});

// Toggle complete
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    save();
    render();
}

// Delete one
function deleteTodo(index) {
    todos.splice(index, 1);
    save();
    render();
}

// Clear completed
clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    save();
    render();
});

// Initial render
render();
