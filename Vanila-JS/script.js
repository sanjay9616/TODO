const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tableSection = document.getElementById("tableSection");
let tasks = [];

addTaskBtn.addEventListener("click", () => {
    let taskValue = taskInput.value.trim();
    if (!taskValue) {
        alert("Please enter a task!");
        return;
    }
    tasks.push({ id: tasks.length + 1, name: taskValue, date: new Date().toLocaleDateString() });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTable(tasks);
    taskInput.value = '';
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let taskValue = taskInput.value.trim();
        if (!taskValue) {
            alert("Please enter a task!");
            return;
        }
        tasks.push({ id: tasks.length + 1, name: taskValue, date: new Date().toLocaleDateString() });
        renderTable(tasks);
        taskInput.value = '';
    }
});

function renderTable(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (!document.querySelector("table")) {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th id="sortHeader" onclick="sort('name')">Task <i class="fas fa-sort"></i></th>
                    <th id="sortHeader" onclick="sort('date')">Creation Date <i class="fas fa-sort"></i></th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        tableSection.appendChild(table);
        tableSection.style.display = "block"; // Show the table section
    }
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";
    tasks.forEach((task, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.date}</td>
        <td>
            <div>
                <button type="button" onclick="editTask(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" onclick="deleteTask(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
        `
        tableBody.appendChild(row);
    })
}

function editTask(button) {
    const row = button.closest("tr");
    const id = Number(row.children[0].textContent);
    const name = row.children[1].textContent;
    const newName = prompt("Edit Task:", name);
    if (newName && newName !== name) {
        row.children[1].textContent = newName;
        const task = tasks.find((row) => Number(row.id) === id);
        task.name = newName;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function deleteTask(button) {
    const row = button.closest("tr");
    const id = Number(row.children[0].textContent);
    const rowIndex = tasks.findIndex((row) => Number(row.id) === id);
    if (rowIndex > -1 && row) {
        row.remove();
        tasks.splice(rowIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    const tableBody = document.querySelector("table tbody");
    if (tableBody.children.length === 0) {
        tableSection.style.display = "none";
        tableBody.closest("table").remove();
    }
}

function sort(property) {
    const isAscending = tasks.every((obj, index) => {
        return index === 0 || obj[property] >= tasks[index - 1][property];
    });
    isAscending ? tasks.sort((a, b) => a[property] > b[property] ? -1 : 1) : tasks.sort((a, b) => a[property] > b[property] ? 1 : -1);
    renderTable(tasks);
}

(() => {
    tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    if (tasks && tasks?.length) {
        renderTable(tasks);
    }
})();
