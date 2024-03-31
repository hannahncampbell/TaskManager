let tasks = [];

function addTask(name, dueDate, dueTime) {
  tasks.push({ name, dueDate, dueTime, completed: false });
}

function showTasks(type) {
  let filteredTasks = [];
  const today = new Date().toISOString().split('T')[0];

  switch(type) {
    case 'today':
      filteredTasks = tasks.filter(task => !task.completed && task.dueDate === today);
      break;
    case 'upcoming':
      filteredTasks = tasks.filter(task => !task.completed && task.dueDate !== today);
      break;
    case 'completed':
      filteredTasks = tasks.filter(task => task.completed);
      break;
  }

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  let heading = '';
  switch (type) {
    case 'today':
      heading = 'Today';
      break;
    case 'upcoming':
      heading = 'Upcoming';
      break;
    case 'completed':
      heading = 'Completed';
      break;
  }

  const headingElement = document.createElement('h2');
  headingElement.textContent = heading;
  taskList.appendChild(headingElement);

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    taskItem.innerHTML = `
      <input type="checkbox" onchange="completeTask(${tasks.indexOf(task)})">
      <span>${task.name}</span>
      ${type === 'upcoming' && task.dueDate ? `<span class="due-date">${formatDate(task.dueDate)}</span>` : ''}
      ${task.dueTime ? `<span class="due-time">${task.dueTime}</span>` : ''}
    `;
    taskList.appendChild(taskItem);
  });
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-'); 
  return `${day}-${month}-${year.slice(2)}`; 
}

function completeTask(index) {
  const task = tasks[index]; 
  tasks.splice(index, 1); 

  const completedTask = {...task, completed: true};
  tasks.push(completedTask);

  showTasks('upcoming');
}

const inputForm = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task-button');
const closeBtn = document.getElementsByClassName('close-button')[0];

addTaskBtn.onclick = function() {
  inputForm.style.display = 'block';
}

closeBtn.onclick = function() {
  inputForm.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == inputForn) {
    inputForm.style.display = 'none';
  }
}

const taskForm = document.getElementById('taskForm');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskName = document.getElementById('taskName').value;
  const dueDate = document.getElementById('dueDate').value;
  const dueTime = document.getElementById('dueTime').value;
  addTask(taskName, dueDate, dueTime);
  showTasks('upcoming');
  inputForm.style.display = 'none';
  taskForm.reset();
});
