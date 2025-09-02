const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

async function loadTasks() {
  const res = await fetch('/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(addTaskToDOM);
}

function addTaskToDOM(task) {
  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.background = 'red';
  deleteBtn.style.color = 'white';
  deleteBtn.style.border = 'none';
  deleteBtn.style.borderRadius = '3px';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.padding = '3px 8px';

  deleteBtn.addEventListener('click', async () => {
    await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
    loadTasks();
  });

  taskItem.appendChild(taskSpan);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  loadTasks();
});

loadTasks();
