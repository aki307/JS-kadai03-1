const taskSubmit = document.getElementById('submit-button');
let submitNumber = 0;
const taskTable = document.getElementById('task-table');
const taskName = document.getElementById('task-name');
let displayTasksHTML = '';
let tasks = [];
const tBody = document.getElementById('table-body');

taskSubmit.addEventListener('click', function(event) {
  submitNumber += 1;
  event.preventDefault();
  const newTask = taskName.value;
  tasks.push({
    id: submitNumber,
    taskName: newTask,
    taskStatus: 'working',
  });
  displayTasksHTML = '';
  displayTasksHTML += `
        <th id=${submitNumber}>${tasks.length}</th>
        <th>${newTask}</th>
      `;
console.log(displayTasksHTML);
  const newRow = document.createElement("tr");
  newRow.id= submitNumber;
  newRow.innerHTML = displayTasksHTML;
  const statusButton = document.createElement("button");
  statusButton.type = "button";
  statusButton.textContent = "作業中";
  statusButton.id = `status-button${submitNumber}`;
  statusButton.addEventListener("click", () => {
    console.log('押したボタンのidは' + statusButton.id);
    const stateChange = newRow;
    if (stateChange) {
      const changeElement = stateChange.querySelector('th');
      if (changeElement) {
        const taskIndex = parseInt(changeElement.id);
        console.log('changeElementは' + changeElement.id);
        // let targetIndex = tasks.findIndex(task => task.id === taskIndex);
        const targetId = tasks.find((task) => {
          return task.id == taskIndex;
        });
        console.log('targetIdは' + targetId.id);

        if (targetId !== undefined) {
          tasks = tasks.map(obj => {
            if (obj.id === taskIndex) {
              console.log('obj.idは' + obj.id);
              console.log('taskIndexは' + taskIndex);
              if (obj.taskStatus === 'working') {
                return { ...obj, taskStatus: 'completed' };
              }
              else if (obj.taskStatus === 'completed') {
                return { ...obj, taskStatus: 'working' };
              }
            }
            return obj;
          });
          console.log('idは'+ statusButton.id);
          stateChangeRow(taskIndex, newRow);
        }
      }
    }

  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = `delete-button${tasks.length}`;
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => {
    // 削除ボタンがクリックされた時の処理

    if (deleteButton.id) {
      deleteTask();
      console.log('押されました');
    }
  });
  const buttonCell = document.createElement("th");
  buttonCell.appendChild(statusButton);
  buttonCell.appendChild(deleteButton);
  newRow.appendChild(buttonCell);
  if (!tBody) {

    tBody.appendChild(newRow);
    taskTable.appendChild(tBody);
  }
  else {
    tBody.appendChild(newRow);
  }
});

function deleteTask() {
  const rowToRemove = event.target.closest('tr');
  if (rowToRemove) {
    const thElement = rowToRemove.querySelector('th');
    if (thElement) {
      const taskIndex = parseInt(thElement.id);
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




function updateTaskIDs(deletedIndex) {
  const taskRows = taskTable.querySelectorAll('tbody tr');
  taskRows.forEach((row, index) => {
    const thElement = row.querySelector('th:first-child');
    if (thElement) {
      const taskId = index + 1;
      thElement.textContent = taskId;
      // tasks[index].id = taskId;
    }
  });
}

function displayTasks() {
  const displayTasksElement = document.getElementById('displayTasks');
  if (displayTasksElement) {
    displayTasksElement.textContent = JSON.stringify(tasks);
  }
}

function stateChangeRow(taskIndex,newRow) {
  const taskRow = taskTable.querySelector(`tr[id="${taskIndex}"]`);
  if (taskRow) {
    const changeRow = taskRow.querySelector('th:nth-child(3) button[id*="status-button"]');
    if (changeRow) {
      if (changeRow.textContent === '作業中') {
        changeRow.textContent = '完了';
      }
      else if (changeRow.textContent === '完了') {
        changeRow.textContent = '作業中';
      }
      console.log(`タスクID: ${taskIndex} の状態が変更されました。`);
      console.log('タスク情報:', tasks.find(task => task.id === taskIndex));
    }
  }
}
