document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    addTaskButton.addEventListener('click', addTask);
    loadTasks(); // Load previously saved tasks
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Do not add empty tasks

    const newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.textContent = taskText; // Set task text
    newTask.draggable = true; // Make the task draggable

    newTask.addEventListener('dragstart', dragStart); // Add drag start event
    const todoContainer = document.querySelector('#todo .task-container');
    todoContainer.appendChild(newTask); // Append the new task
    saveTasks(); // Save updated tasks to local storage
    taskInput.value = ''; // Clear the input field
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent); // Store the task text for drag-and-drop
}

const columns = document.querySelectorAll('.column');
columns.forEach(column => {
    column.addEventListener('dragover', dragOver); // Allow dragging over column
    column.addEventListener('drop', drop); // Handle dropping tasks in the column
});

function dragOver(event) {
    event.preventDefault(); // Prevent default to allow dropping
}

function drop(event) {
    event.preventDefault();
    const taskText = event.dataTransfer.getData('text/plain'); // Get the dragged task text
    const newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.textContent = taskText; // Set task text
    newTask.draggable = true; // Make the new task draggable
    newTask.addEventListener('dragstart', dragStart); // Add drag start event

    event.target.querySelector('.task-container').appendChild(newTask); // Append to the target container
    saveTasks(); // Save updated tasks to local storage
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push(task.textContent); // Collect all task texts
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.textContent = taskText; // Set task text for loaded tasks
        newTask.draggable = true; // Make the task draggable
        newTask.addEventListener('dragstart', dragStart); // Add drag start event
        document.querySelector('#todo .task-container').appendChild(newTask); // Append loaded task
    });
}