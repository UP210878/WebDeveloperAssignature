import { deleteTask, createTask, getAllUsers,getTaskUsingID } from "./requests.js";
const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
const taskTitle = document.getElementById('form-title')
const completedCheckbox = document.getElementById('completed');

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
    const userTasks = await getTaskUsingID(listUsers.value);
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

const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach(button =>{
  button.addEventListener('click', async ()=>{
      const taskId = button.id.replace('updateBtn','');
      taskTitle.innerText = "Update Task";
      taskForm.children[0].children[0].setAttribute('value','Hola')
  })
});

});

taskForm.addEventListener('submit', async ()=>{
  const formData = new FormData(taskForm);

  const completedValue = completedCheckbox.checked ? 1 : 0;

  formData.append('completed', completedValue);


  console.log(formData);
  await createTask(formData);
})