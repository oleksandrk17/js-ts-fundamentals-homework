# To-Do List Manager (Lesson 2 homework)

## Purpose
A console JavaScript app that manages a list of tasks. It practices arrays, objects, loops, functions, scope and JSON.

## Implemented features
- `addTask(title)`: adds a task with a unique id (separate counter, so ids never repeat); rejects empty and whitespace-only titles
- `showTasks()`: prints all tasks as `[x] 2 - Practice Loops`
- `markCompleted(id)`: finds a task by id and sets `completed` to `true`
- `removeTask(id)`: removes a task by id; prints a message if the id does not exist
- `findTask(keyword)`: case-insensitive search by title
- `countTasks()` and `countCompletedTasks()`
- `exportTasks()` and `importTasks(jsonString)`: array to JSON text and back (`JSON.stringify` / `JSON.parse`)

## Challenges
- Breaking a task into steps. For example, I first thought `markCompleted` should find tasks that are already completed, but it has to find a task by id and then change it.
- Loops: I compared the counter with the array itself instead of `tasks.length`, and read `tasks.id` instead of `tasks[i].id`.
- Unique ids: `tasks.length + 1` breaks after a removal, so I used a separate counter.
- Detecting a missing id in `removeTask`: a message inside the loop printed for every non-matching task. Comparing the array length before and after the loop solved it.
- Case-insensitive search: both the title and the keyword must go through `toLowerCase()`.
- `return` vs `console.log`, and passing the result of `exportTasks()` into `importTasks()`.
- The ternary operator: I did not fully understand it yet, so I used `if / else` instead. I plan to come back to it.

## Lessons learned
- An array is accessed by index, an object by key. `const` protects the variable, not the contents.
- `return` gives a value back to the caller; `console.log` only shows it.
- Validate input at the start of a function, and test with edge cases (empty title, id 999, uppercase keyword).
- Split a big task into small steps and run the code after each one.
- I used an AI mentor that mostly gave hints and questions, and a few worked examples when I was stuck.