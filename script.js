// Getting HTML Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Loading Tasks from Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task));
}

//Adding a Task to the Page
function addTaskToDom (task){
    const li = document.createElement("li");
    li.textContent = task;

    const rmvBtn = document.createElement("button");
    rmvBtn.textContent = "X";

    rmvBtn.addEventListener("click", ()=> removeTask(task));

    li.appendChild(rmvBtn);
    taskList.appendChild(li);
};

// Add tasks to local Storage
function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToDOM(task);
        taskInput.value = "";
    }
};

//Removing Taks
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Connecting Everything
addTaskBtn.addEventListener("click", addTask);
loadTasks();