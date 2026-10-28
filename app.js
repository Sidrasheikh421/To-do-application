let taskInput = document.querySelector("#taskInput");
let addBtn = document.querySelector("#addBtn");
let taskList = document.querySelector("#taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}


function showTasks() {
taskList.innerHTML = "";

tasks.forEach(function(task, index) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    if (task.completed) {
        span.classList.add("completed");
    }

    // Task complete karna
    span.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        showTasks();
    });

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    editBtn.addEventListener("click", () => {
        let newTask = prompt("Edit your task:", task.text);

        if (newTask !== null && newTask.trim() !== "") {
            tasks[index].text = newTask.trim();
            saveTasks();
            showTasks();
        } else if (newTask !== null) {
            alert("Task cannot be empty!");
        }
    });

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", () => {
        let confirmDelete = confirm("Do you want to delete this task?");

        if (confirmDelete) {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        }
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
});

}

addBtn.addEventListener("click", () => {
let taskText = taskInput.value.trim();

if (taskText === "") {
    alert("Please enter a task!");
    return;
}

tasks.push({
    text: taskText,
    completed: false
});

saveTasks();
showTasks();

taskInput.value = "";

});

taskInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
addBtn.click();
}
});

// Purane saved tasks show karna
showTasks();