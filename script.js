document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const toggleDarkMode = document.getElementById("toggleDarkMode");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    function addTaskToDOM(taskText, completed = false) {
        const li = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(taskText));
        
        const span = document.createElement("span");
        span.textContent = taskText;
        if (completed) {
            span.classList.add("completed");
        }
        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => removeTask(taskText));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push({ text: task, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            addTaskToDOM(task);
            taskInput.value = "";
        }
    }

    function toggleTaskCompletion(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => task.text === taskText ? { ...task, completed: !task.completed } : task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (JSON.parse(localStorage.getItem("darkMode"))) {
        document.body.classList.add("dark-mode");
    }

    addTaskBtn.addEventListener("click", addTask);
    loadTasks();
});
