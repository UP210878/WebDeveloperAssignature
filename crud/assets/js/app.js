import { deleteTask, createTask, getAllUsers,getTaskUsingUserID, getTask } from "./requests.js";
const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
// const taskTitle = document.getElementById('form-title')
const completedCheckbox = document.getElementById('completed');
const submitButton = document.getElementById('insert');

document.addEventListener('DOMContentLoaded',async ()=>{
    const allUsers = await getAllUsers();
    // console.log(allUsers);

    let template=listUsers.innerHTML;
    for (const user of allUsers) {
        template = template + `
        <option value="${user.id}">${user.fullname}</option>
        `
    }

    listUsers.innerHTML = template;
});

listUsers.addEventListener('change',async ()=>{
    const userTasks = await getTaskUsingUserID(listUsers.value);
    console.log(userTasks)

    let template = "";
    const tableBody = taskTable.children[1];
    for (const task of userTasks){
        let taskCompleted = "No completada"
        if (task.completed) {
            taskCompleted = "Completada"
        }
        template = template + `
        <tr id=tablerow${task.id}>
        <td>${task.id}</td>
        <td>${task.firstname}</td>
        <td>${task.title}</td>
        <td>${taskCompleted}</td>
        <td>
          <button class="btn btn-info btn-sm updateBtn" id="updateBtn${task.id}">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${task.id}">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      </tr>        `
    }
    tableBody.innerHTML = template

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button =>{
  button.addEventListener('click', async ()=>{
      const taskId = button.id.replace('deleteBtn','');
      console.log(taskId)
      const row = document.getElementById(`tablerow${taskId}`);
      row.remove();
      await deleteTask(taskId);
  })
});

});


// AGREGAR TASK O UPDATE TASK
taskForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const formData = new FormData(taskForm);
  const completedValue = completedCheckbox.checked ? parseInt(1) : parseInt(0);
  formData.append('completed', completedValue);

  console.log(formData);

  try {
    const json = await createTask(formData);
    if (json.success) {
      console.log("JSON ID",json.taskId)
      const taskInfo = await getTask(json.taskId)
      console.log("INFO",taskInfo)
      // Update the DOM with the new task
      const newRow = document.createElement('tr');
      newRow.setAttribute("id",`tablerow${taskInfo.id}`)
      let taskCompleted = "No completada"
        if (taskInfo.completed) {
            taskCompleted = "Completada"
        }
      newRow.innerHTML = `
        <td>${taskInfo.id}</td>
        <td>${taskInfo.firstname}</td>
        <td>${taskInfo.title}</td>
        <td>${taskCompleted}</td>
        <td>
          <button class="btn btn-info btn-sm updateBtn" id="updateBtn${taskInfo.id}">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      `;
      taskTable.children[1].appendChild(newRow);

      const deleteButtons = document.querySelectorAll('.deleteBtn');
      deleteButtons.forEach(button =>{
      button.addEventListener('click', async ()=>{
          const taskId = button.id.replace('deleteBtn','');
          console.log(taskId)
          const row = document.getElementById(`tablerow${taskId}`);
          row.remove();
          await deleteTask(taskId);
      })
    });
    } else {
      console.error('Failed to create task');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});