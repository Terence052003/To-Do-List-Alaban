const addTaskBtn = document.getElementById('add-task-btn');
const saveToFileBtn = document.getElementById('save-file-btn');
const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const taskList = document.getElementById('task-list').querySelector('tbody');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = task.date;
        row.appendChild(dateCell);

        const taskCell = document.createElement('td');
        taskCell.textContent = task.name;
        row.appendChild(taskCell);

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => editTask(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(index);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        taskList.appendChild(row);
    });
}

addTaskBtn.onclick = () => {
    const taskName = taskInput.value;
    const taskDate = taskDateInput.value;

    if (taskName && taskDate) {
        tasks.push({ name: taskName, date: taskDate });
        taskInput.value = '';
        taskDateInput.value = '';
        renderTasks(); 
    } else {
        alert("Please enter a task and date.");
    }
};

function editTask(index) {
    const task = tasks[index];
    const newTaskName = prompt("Edit task name:", task.name);
    const newTaskDate = prompt("Edit task date:", task.date);

    if (newTaskName && newTaskDate) {
        tasks[index] = { name: newTaskName, date: newTaskDate };
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks(); 
}

saveToFileBtn.onclick = saveTasksToFile;

function saveTasksToFile() {
    const taskData = JSON.stringify(tasks);
    const blob = new Blob([taskData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

renderTasks();
