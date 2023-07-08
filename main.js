const taskSubmit = document.getElementById('submit-button');
let submitNumber = 0;
const taskTable = document.getElementById('task-table');
const taskName = document.getElementById('task-name');
let tasks = [];
const tBody = document.getElementById('table-body');
const radioButtons = document.querySelectorAll('input[type="radio"][name="example"]');


taskSubmit.addEventListener('click', function(event) {
  submitNumber += 1;
  event.preventDefault();
  const newTask = taskName.value;
  tasks.push({
    id: submitNumber,
    taskName: newTask,
    taskStatus: 'working',
  });

  const radioButtons = document.getElementsByName("example");

  let selectedValue;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }

  console.log(selectedValue);
  tasksDisplay(selectedValue);
});

function deleteTask(selectedValue1) {
  const selectedValue2 = selectedValue1;
  const rowToRemove = event.target.closest('tr');
  if (rowToRemove) {
    const thElement = rowToRemove.querySelector('th');

    if (selectedValue2 === null) {
      if (thElement) {
        const taskIndex = parseInt(thElement.id);
        let targetIndex = tasks.findIndex(task => task.id === taskIndex);
        if (targetIndex !== -1) {
          tasks.splice(targetIndex, 1);
        }
      }
    }
    rowToRemove.remove();
    if (selectedValue2 === null) {
      const radioButtons = document.getElementsByName("example");

      let selectedValue;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedValue = radioButton.value;
          break;
        }
      }
      console.log(selectedValue);
      tasksDisplay(selectedValue);
    }

  }
}

function stateChangeRow(taskIndex, newRow) {
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
// タスク進捗別表示機能
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', event => {
    const checkedRadioButton = event.target;
    console.log('チェックされたラジオボタンは' + radioButton);

    if (checkedRadioButton.checked) {
      const selectedValue = checkedRadioButton.value;
      console.log('選択された値:', selectedValue);
      tasksDisplay(selectedValue);
    }
  });
});

function tasksDisplay(selectedValue) {

  if (selectedValue === 'all') {
    const targetValue = selectedValue;
    console.log(targetValue);

    const filteredTasks = tasks;
    if (filteredTasks) {
      for (const task of tasks) {
        console.log('この節内にはいる');
        filteredTasks.forEach((filteredTask) => {
          const taskIndex = tasks.findIndex(task => task.id === filteredTask.id);
          filteredTask.taskIndex = taskIndex + 1;
        });
        if (filteredTasks !== null) {
          displayChange(filteredTasks, selectedValue);
        }

      }
    }

  }
  else if (selectedValue === 'working') {
    const targetValue = selectedValue;
    console.log(targetValue);
    const filteredTasks = tasks.filter(task => task.taskStatus === "working");
    filteredTasks.forEach((filteredTask) => {
      const taskIndex = tasks.findIndex(task => task.id === filteredTask.id);
      filteredTask.taskIndex = taskIndex + 1;
    });
    if (filteredTasks !== null) {
      displayChange(filteredTasks, selectedValue);
    }
  }
  else if (selectedValue === 'completed') {
    const targetValue = selectedValue;
    console.log(targetValue);
    const filteredTasks = tasks.filter(task => task.taskStatus === "completed");
    filteredTasks.forEach((filteredTask) => {
      const taskIndex = tasks.findIndex(task => task.id === filteredTask.id);
      filteredTask.taskIndex = taskIndex + 1;
    });
    if (filteredTasks !== null) {
      displayChange(filteredTasks, selectedValue);
    }
    console.log(filteredTasks);
  }

}

function displayChange(filteredTasks, selectedValue) {
  if (tBody) {
    // 子要素をすべて削除する
    while (tBody.firstChild) {
      tBody.firstChild.remove();
    }
  }
  if (filteredTasks === 'all') {

  }
  else {

    filteredTasks.forEach((filteredTask) => {

      const displayTaskHTML = `
        <th id=${filteredTask.id}>${filteredTask.taskIndex}</th>
        <th>${filteredTask.taskName}</th>
      `;
      console.log(filteredTask.id + 'が' + filteredTask.taskIndex);
      const newRow = document.createElement("tr");
      newRow.id = filteredTask.id;
      newRow.innerHTML = displayTaskHTML;
      const statusButton = document.createElement("button");
      statusButton.type = "button";
      if (filteredTask.taskStatus === 'working') {
        statusButton.textContent = "作業中";
      }
      else if (filteredTask.taskStatus === 'completed') {
        statusButton.textContent = "完了";
      }

      statusButton.id = `status-button${filteredTask.id}`;
      statusButton.addEventListener("click", () => {
        console.log('押したボタンのidは' + statusButton.id);
        const stateChange = newRow;
        if (stateChange) {
          const changeElement = stateChange.querySelector('th');
          if (changeElement) {
            const taskIndex = parseInt(changeElement.id);
            console.log('changeElementは' + changeElement.id);
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
              console.log('idは' + statusButton.id);
              if (selectedValue === 'all') {
                stateChangeRow(taskIndex, newRow);
              }
              else {
                deleteTask(selectedValue);
              }
            }
          }
        }

      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.id = `delete-button${filteredTask.id}`;
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

  }
}
