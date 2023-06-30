const taskSubmit = document.getElementById('submit-button');
const taskTable = document.getElementById('task-table');
const taskName = document.getElementById('task-name');
let displayTasksHTML = '';
const taskItem = document.getElementById('task-item');
const tBody = document.getElementById('table-body');
const tasks = [];

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
          <button type="button" class="delete-execution${tasks.length}">削除</button>
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
