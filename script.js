document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const filterTasks = document.getElementById("filterTasks");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const renderTasks = (filter = "all") => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;

            const li = document.createElement("li");
            li.textContent = task.text;
            li.classList.toggle("completed", task.completed);

            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "Undo" : "Complete";
            completeBtn.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filterTasks.value);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete");
            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(filterTasks.value);
            });

            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    };

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks(filterTasks.value);
        }
    });

    filterTasks.addEventListener("change", () => {
        renderTasks(filterTasks.value);
    });

    renderTasks();
});