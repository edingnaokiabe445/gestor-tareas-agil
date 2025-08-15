document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    addTaskButton.addEventListener('click', addTask);
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.textContent = taskText;
    newTask.draggable = true;

    newTask.addEventListener('dragstart', dragStart);
    const todoContainer = document.querySelector('#todo .task-container');
    todoContainer.appendChild(newTask);
    saveTasks();
    taskInput.value = '';
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
}

const columns = document.querySelectorAll('.column');
columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const taskText = event.dataTransfer.getData('text/plain');
    const newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.textContent = taskText;
    newTask.draggable = true;
    newTask.addEventListener('dragstart', dragStart);

    event.target.querySelector('.task-container').appendChild(newTask);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.textContent = taskText;
        newTask.draggable = true;
        newTask.addEventListener('dragstart', dragStart);
        document.querySelector('#todo .task-container').appendChild(newTask);
    });
}