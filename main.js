const taskSubmit = document.getElementById('submit-button');
const taskTable = document.getElementById('taskTable');
let displayTasks = '';
let tasks = [];

taskSubmit.addEventListener('click', function(event) {
  event.preventDefault();
  const newTask = document.forms[0].elements[0].value;
  tasks.push(newTask);
  displayTasks = '';
  displayTasks += `<tr class="task_list task_item${tasks.length - 1}" id="tasklists">
        <th>${tasks.length - 1}</th>
        <th>${tasks[tasks.length - 1]}</th>
        <th> 
          <button type="button" class="working-button${tasks.length - 1}">作業中</button>
          <button type="button" class="delete-execution${tasks.length - 1}">削除</button>
        </th>
      </tr>
      `;
  if(tasks.length == 1){
    taskTable.insertAdjacentHTML('beforeend', displayTasks);
  } else{
    taskTable.insertAdjacentHTML('beforeend', displayTasks);
  }
});