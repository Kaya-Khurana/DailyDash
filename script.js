document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const targetTimeInput = document.getElementById("target-time-input");
  const recurringInput = document.getElementById("recurring-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const voiceBtn = document.getElementById("voice-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  // Voice-to-Task Creation
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener("click", () => {
      recognition.start();
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      todoInput.value = transcript;
    };
  }

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    const targetTime = targetTimeInput.value;
    const recurring = recurringInput.value;
    if (taskText === "") return;

    let targetAt;
    if (targetTime && /^\d{2}:\d{2}$/.test(targetTime)) {
      const [hours, minutes] = targetTime.split(":").map(Number);
      const now = new Date();
      targetAt = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      ).toISOString();
    } else {
      targetAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
      targetAt: targetAt,
      recurring: recurring,
    };
    tasks.push(newTask);
    saveTasks();
    renderAllTasks();
    todoInput.value = "";
    targetTimeInput.value = "";
    recurringInput.value = "";

    // Smart Reminder (demo only, works if tab is open)
    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      targetAt
    ) {
      const delay = new Date(targetAt) - new Date();
      if (delay > 0) {
        setTimeout(() => {
          new Notification("Task Reminder", { body: taskText });
        }, delay);
      }
    }
  });

  function renderAllTasks() {
    const grid = document.getElementById("todo-grid");
    grid.innerHTML = ""; // Clear previous cards
    tasks.forEach((task, idx) => renderTask(task, idx));
  }

  function renderTask(task, idx) {
    const grid = document.getElementById("todo-grid");
    const card = document.createElement("div");
    card.className = "todo-card";

    // Assign a pastel color class (cycle through for variety)
    const pastelClasses = [
      "pastel-blue",
      "pastel-green",
      "pastel-yellow",
      "pastel-pink",
      "pastel-purple",
      "pastel-orange",
      "pastel-mint",
    ];
    card.classList.add(pastelClasses[idx % pastelClasses.length]);

    if (task.completed) card.classList.add("completed");
    card.innerHTML = `
      <div class="todo-title">${task.text}</div>
      <div class="todo-times">
        <span><span class="todo-time-label">Created:</span> ${formatDateTime(
          task.createdAt
        )}</span>
        <span><span class="todo-time-label">Target:</span> ${formatTime(
          task.targetAt
        )}</span>
        ${
          task.recurring
            ? `<span><span class="todo-time-label">Repeats:</span> ${task.recurring}</span>`
            : ""
        }
      </div>
      <button class="delete-btn"> Delete</button>
    `;
    card.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderAllTasks();
    });
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      task.completed = !task.completed;
      card.classList.toggle("completed");
      // Recurring Task Patterns: create next occurrence
      if (task.completed && task.recurring) {
        let nextDate = new Date(task.targetAt);
        if (task.recurring === "daily")
          nextDate.setDate(nextDate.getDate() + 1);
        if (task.recurring === "weekly")
          nextDate.setDate(nextDate.getDate() + 7);
        if (task.recurring === "monthly")
          nextDate.setMonth(nextDate.getMonth() + 1);
        const newRecurringTask = {
          ...task,
          id: Date.now(),
          completed: false,
          createdAt: new Date().toISOString(),
          targetAt: nextDate.toISOString(),
        };
        tasks.push(newRecurringTask);
        saveTasks();
        renderTask(newRecurringTask);
      }
      saveTasks();
    });
    grid.appendChild(card);
  }

  function formatDateTime(isoString) {
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  function formatTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Ask for notification permission on load
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
