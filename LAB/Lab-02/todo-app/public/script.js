function addTask() {
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (taskText === "" || deadline === "") {
        alert("Enter task and deadline");
        return;
    }

    const li = document.createElement("li");
    li.dataset.deadline = deadline;

    li.innerHTML = `
        <span>
            ${taskText} <br>
            <small>Deadline: ${deadline}</small>
            <div class="status"></div>
        </span>
        <div class="task-buttons">
            <button class="done-btn" onclick="markDone(this)">Done</button>
        </div>
    `;

    document.getElementById("pendingList").appendChild(li);
    taskInput.value = "";
    deadlineInput.value = "";

    checkDeadline(li);
}

function markDone(button) {
    const task = button.closest("li");
    task.querySelector(".task-buttons").innerHTML = `
        <button class="back-btn" onclick="moveBack(this)">Pending</button>
        <button class="delete-btn" onclick="removeTask(this)">Delete</button>
    `;
    task.querySelector(".status").innerHTML = "";
    document.getElementById("completedList").appendChild(task);
}

function moveBack(button) {
    const task = button.closest("li");
    task.querySelector(".task-buttons").innerHTML = `
        <button class="done-btn" onclick="markDone(this)">Done</button>
    `;
    document.getElementById("pendingList").appendChild(task);
    checkDeadline(task);
}

function removeTask(button) {
    button.closest("li").remove();
}

function checkDeadline(task) {
    const deadline = new Date(task.dataset.deadline);
    const now = new Date();

    const statusDiv = task.querySelector(".status");
    if (now > deadline) {
        statusDiv.innerHTML = "<span class='overdue'>OVERDUE</span>";
    } else {
        statusDiv.innerHTML = "";
    }
}
