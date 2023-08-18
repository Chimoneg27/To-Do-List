import './style.css';

const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const toDoListEl = document.getElementById('todos-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

const renderTodos = () => {
  toDoListEl.innerHTML = '';

  todos.forEach((todo, index) => {
    toDoListEl.innerHTML += `
        <div class="todo" id="${index}">
            <i 
              class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
              style="color : ${todo.color}"
              data-action="check"
              ></i>
            <p class="" data-action="check">${todo.value}</p>
            <i class="bi bi-pencil-square" data-action="edit"></i>
            <i class="bi bi-trash" data-action="delete"></i>
        </div>
        `;
  });
};

renderTodos();

// eslint-disable-next-line consistent-return
const saveTodo = () => {
  const todoValue = todoInput.value;

  const isEmpty = todoValue === '';

  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    return '';
  } if (isDuplicate) {
    return '';
  }
  if (EditTodoId >= 0) {
    todos = todos.map((todo, index) => ({
      ...todo,
      value: index === EditTodoId ? todoValue : todo.value,
    }));
    EditTodoId = -1;
  } else {
    todos.push({
      value: todoValue,
      checked: false,
      color: 'black',
    });
  }

  todoInput.value = '';
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  saveTodo();
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
});

function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

toDoListEl.addEventListener('click', (event) => {
  const { target } = event;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  const todo = parentElement;
  const todoId = Number(todo.id);

  const { action } = target.dataset;

  switch (action) {
    case 'check':
      checkTodo(todoId);
      break;
    case 'edit':
      editTodo(todoId);
      break;
    case 'delete':
      deleteTodo(todoId);
      break;
    default:
      break;
  }
});