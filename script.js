// let newItem = document.querySelector(".new-item");
// let container = document.querySelector(".container");
// let items = document.querySelector(".items");
// let item = document.querySelector(".item");




// newItem.addEventListener('click',()=>{
//     let newLi = document.createElement("li");
//     newLi.classList.add('item');
    
//     console.log("you clicked");
//     items.append(newLi);
    
// })


const newItem = document.querySelector(".new-item");
const taskInput = document.querySelector("#task-input");
let items = document.querySelector(".items");

// Load saved tasks
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach(task => createTaskItem(task.text, task.completed));

// Save to localStorage
function saveTasks() {
  const taskElements = document.querySelectorAll(".item");
  const taskList = [];

  taskElements.forEach(li => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector("input[type='checkbox']").checked;
    taskList.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Create a task item
function createTaskItem(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = taskText;
  if (isCompleted) span.classList.add("completed");

  // Single-click to edit
  span.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    input.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        span.textContent = input.value.trim() || span.textContent;
        span.style.display = "inline";
        input.remove();
        saveTasks();
      }
    });

    input.addEventListener("blur", () => {
      span.textContent = input.value.trim() || span.textContent;
      span.style.display = "inline";
      input.remove();
      saveTasks();
    });

    span.style.display = "none";
    li.insertBefore(input, span);
    input.focus();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed");
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  items.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

// Add task on button click
newItem.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskItem(taskText);
  }
});

// Add task on Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      createTaskItem(taskText);
    }
  }
});





