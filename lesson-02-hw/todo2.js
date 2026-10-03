// Homework Project: To-Do List Manager

const tasks = [
  {
    id: 1,
    title: "Learn Closures",
    completed: false,
  },
  {
    id: 2,
    title: "Practice Loops",
    completed: true,
  },
];

// 1. Add Task
let nextId = tasks.length + 1;
function addTask(title) {
  if (title.trim() === "") {
    console.log(`Title cannot be empty.`);
    return;
  }
  const newTask = {
    id: nextId,
    title: title,
    completed: false,
  };
  tasks.push(newTask);
  nextId++;
}
// addTask("Learn Arrays");
// console.log(tasks);

// 2. Display All Tasks
function showTasks() {
  for (let i = 0; i < tasks.length; i++) {
    let icon = "";
    if (tasks[i].completed === true) {
      icon = "[x]";
    } else {
      icon = "[ ]";
    }
    console.log(`${icon} ${tasks[i].id} - ${tasks[i].title}`);
  }
}
//showTasks(tasks);

// 3. Mark Task as Completed
function markCompleted(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = true;
      console.log(tasks[i]);
    }
  }
}
// markCompleted(1);

// 4. Remove Task
function removeTask(id) {
  const lengthBefore = tasks.length;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      console.log(`Task under ${id} has been removed.`);
    }
  }
  if (lengthBefore === tasks.length) {
    console.log('This id doesn`t exist in the list');
  }
}
// removeTask(2);
// console.log(tasks);

// 5. Search Tasks
function findTask(keyword) {
  let forFoundTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title.toLowerCase().includes(keyword.toLowerCase())) {
      forFoundTasks.push(tasks[i]);
    }
  }
  console.log(forFoundTasks);
  return forFoundTasks;
}
// findTask("learn");

// 6. Count Tasks();
function countTasks() {
  console.log(`Total tasks: ${tasks.length}`);
}
// countTasks();

// 7. Count Completed Tasks
function countCompletedTasks() {
  let counter = 0;
  // let completedTasks = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      counter++;
      // completedTasks = counter;
    }
  }
  console.log(`Completed tasks: ${counter}`);
}
// countCompletedTasks();

// 8. JSON Requirement ( Export )
function exportTasks() {
  const exportT = JSON.stringify(tasks, null, 2);
  console.log(exportT);
  return exportT;
}
// exportTasks();

// 8. JSON Requirement ( Import )
function importTasks(jsonString) {
  const importT = JSON.parse(jsonString);
  console.log(importT);
}
// importTasks(exportTasks());

// Function calls
addTask("Learning"); // Add Task
addTask("Goodday"); // Add Task
addTask("Fifth"); // Add Task
console.log(tasks); // just check.
showTasks(tasks); // Show Tasks
markCompleted(1); // Mark Completed
removeTask(999); // Remove Task
findTask("learn"); // Find Task
countTasks(); // Count Tasks
countCompletedTasks(); // Count Completed Tasks
exportTasks(); // Export Tasks
importTasks(exportTasks()); // Import Tasks */
