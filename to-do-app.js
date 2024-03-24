// Function to get tasks from local storage
function getTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks === null ? [] : tasks;
  }
  
  // Function to save tasks to local storage
  function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Function to render tasks
  function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task');
      taskItem.innerHTML = `
        <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
      taskList.appendChild(taskItem);
    });
  }
  
  // Function to add a new task
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text !== '') {
      const tasks = getTasksFromStorage();
      const newTask = {
        id: Date.now(),
        text: text,
        completed: false
      };
      tasks.push(newTask);
      saveTasksToStorage(tasks);
      taskInput.value = '';
      renderTasks();
    }
  }
  
  // Function to delete a task
  function deleteTask(id) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage(updatedTasks);
    renderTasks();
  }
  
  // Function to toggle task completion status
  function toggleTask(id) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    saveTasksToStorage(updatedTasks);
    renderTasks();
  }
  
  // Initial rendering
  renderTasks();