import './digital-clock';

/* selecting html tags */
const addTodoForm = document.querySelector('.add-todo-form');
const todoListContainer = document.querySelector('.todo-list-container');
let todoItems = JSON.parse(localStorage.getItem('todo-items')) || [];
const todoDeleteIcon = document.querySelector('delete-icon-wrap');

/* helper functions */
const renderTodos = () => {
  if (todoItems.length > 0) {
    const todoArray = todoItems.map(
      (todo) =>
        `<li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex justify-between" data-id="${
          todo.id
        }">
          <div class="todo-text-wrap">
            <input type="checkbox" class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 todo-checkbox" ${
              todo.completed ? 'checked' : ''
            }>
            <label class="text-sm font-medium text-gray-900 dark:text-gray-300 todo-text">${
              todo.todo
            }</label>
          </div>
          <div class="flex justify-center items-center delete-icon-wrap cursor-pointer">
            <svg class="delete-icon w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16"> <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z"/></svg>
          </div>
        </li>`
    );
    todoListContainer.innerHTML = `<ul
    class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-4 todo-list">${todoArray.join(
      ''
    )}
  </ul>`;
  } else {
    todoListContainer.innerHTML = '';
  }
};

const saveIntoLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const onTodoItemsUpdated = (evt) => {
  saveIntoLocalStorage('todo-items', JSON.stringify(todoItems));
  renderTodos();
};

/* event handlers */
const addTodoHandler = (evt) => {
  evt.preventDefault();

  if (!evt.currentTarget['todo-form-field'].value) return;

  const todo = {
    id: Date.now(),
    todo: evt.currentTarget['todo-form-field'].value /* name field can be accessed like this */,
    completed: false,
  };

  todoItems.push(todo);

  /* Dispatch custom event */
  addTodoForm.dispatchEvent(new CustomEvent('todoItemsUpdated'));

  /* resetting input field */
  evt.currentTarget.reset();

  /* focusing input tag */
  evt.currentTarget['todo-form-field'].focus();
};

const onClickHandler = (evt) => {
  if (evt.target.closest('.delete-icon')) {
    const parentLi = evt.target.closest('li');
    if (parentLi) {
      const liId = parentLi.getAttribute('data-id');
      const filteredTodos = todoItems.filter((todoItem) => todoItem.id !== Number(liId));
      todoItems = filteredTodos;
      saveIntoLocalStorage('todo-items', JSON.stringify(todoItems));
      renderTodos();
    }
  }

  if (evt.target.classList.contains('todo-checkbox')) {
    const parentLi = evt.target.closest('li');
    if (parentLi) {
      const liId = parentLi.getAttribute('data-id');
      const todo = todoItems.find((todoItem) => todoItem.id === Number(liId));
      if (todo) {
        todo.completed = evt.target.checked;
      }
      saveIntoLocalStorage('todo-items', JSON.stringify(todoItems));
      renderTodos();
    }
  }
};

/* adding event listeners */
addTodoForm.addEventListener('submit', addTodoHandler);
addTodoForm.addEventListener('todoItemsUpdated', onTodoItemsUpdated);

/* event delegation */
todoListContainer.addEventListener('click', onClickHandler);

/* on page load render html */
renderTodos();
