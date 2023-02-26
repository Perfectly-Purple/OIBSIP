const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = [];

function addTodo() {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(todo);
        renderTodos();
        todoInput.value = '';
    }
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.setAttribute('class', 'todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.setAttribute('class', 'todo-checkbox');
        todoCheckbox.setAttribute('data-id', todo.id);
        todoCheckbox.checked = todo.completed;
        todoCheckbox.addEventListener('click', toggleTodo);
        const todoText = document.createElement('span');
        todoText.innerText = todo.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'delete-btn');
        deleteBtn.setAttribute('data-id', todo.id);
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', deleteTodo);
        todoItem.appendChild(todoCheckbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
    });
}

function toggleTodo() {
    const id = Number(this.getAttribute('data-id'));
    todos.forEach(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
    });
    renderTodos();
}

function deleteTodo() {
    const id = Number(this.getAttribute('data-id'));
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

todoForm.addEventListener('submit', addTodo);