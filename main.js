const taskSubmit = document.getElementById('submit-button');
const taskTable = document.getElementById('task-table');
const taskName = document.getElementById('task-name');
let displayTasksHTML = '';
const tasks = [];
const tBody = document.getElementById('table-body');


taskSubmit.addEventListener('click', function(event) {
  event.preventDefault();
  const newTask = taskName.value;
  tasks.push({
    id: Object.keys(tasks).length,
    taskName: newTask,
    taskStatus: 'working',
  });
  displayTasksHTML = '';
  displayTasksHTML += `
        <th>${tasks.length}</th>
        <th>${newTask}</th>
        <th> 
          <button type="button" class="working-button${tasks.length}">作業中</button>
          <button type="button" class="delete-button delete-execution${tasks.length}">削除</button>
        </th>
      `;

  const newRow = document.createElement("tr");
  newRow.innerHTML = displayTasksHTML;
  if (!tBody) {

    tBody.appendChild(newRow);
    taskTable.appendChild(tBody);
  }
  else {
    tBody.appendChild(newRow);
  }

});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    const rowToRemove = event.target.closest('tr');
    if (rowToRemove) {
      const thElement = rowToRemove.querySelector('th');
      if (thElement) {
        const taskIndex = parseInt(thElement.textContent);
        console.log(taskIndex);
        let targetIndex = tasks.findIndex(task => task.id === taskIndex);
        if (targetIndex !== -1) {
          tasks.splice(targetIndex, 1);
        }
        rowToRemove.remove();

        updateTaskIDs(taskIndex);
        displayTasks();
      }
    }
  }
});


function updateTaskIDs(deletedIndex) {
  const taskRows = taskTable.querySelectorAll('tbody tr');
  taskRows.forEach((row, index) => {
    const thElement = row.querySelector('th:first-child');
    if (thElement) {
      const taskId = index + 1;
      thElement.textContent = taskId;
      tasks[index].id = taskId;
    }
  });
}

function displayTasks() {
  const displayTasksElement = document.getElementById('displayTasks');
  if (displayTasksElement) {
    displayTasksElement.textContent = JSON.stringify(tasks);
  }
}
