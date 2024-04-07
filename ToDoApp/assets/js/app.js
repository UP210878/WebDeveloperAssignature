// Elementos HTML
const userSelect = document.getElementById('select-users');
// console.log(userSelect);
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const displayButton = document.getElementById('btndisplay');

//Codigo
document.addEventListener('DOMContentLoaded',()=>{
    getAllUsers().then(allUsers => {
        let template = "";
        const firstUser = allUsers[0];
        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            template = template + `
            <option value="${i+1}">${allUsers[i].firstname}</option>
            `
        }
        userSelect.innerHTML = template
        userContainer.innerHTML =
        `
        <h3>Información del usuario seleccionado</h3>
        <ul>
          <li>Nombre completo:${firstUser.firstname} ${firstUser.lastname} </li>
          <li>Email: 
            ${firstUser.email}
          </li>
        </ul>
        `
        // console.log(template);
    })

})
// METODO ANTERIOR PARA SACAR INFO
// userSelect.addEventListener('click',()=>{
//     // getAllUsers()
//     getUser(parseInt(userSelect.value)).then((text)=>{
//         const nombreCompleto = userContainer.children[1].children[0].children[0];
//         const emailUsuario = userContainer.children[1].children[1].children[0];
//         // console.log(text)
//         nombreCompleto.textContent = `${text.firstname} ${text.lastname}`
//         emailUsuario.textContent = `${text.email}`
//     })
//     //console.log(getAllTasks())
//     getTasks(userSelect.value).then((text)=>{
//         taskContainer.style.visibility = 'hidden'
//         const ul = taskContainer.children[1]
//         // ul.replaceChildren()
//         while(ul.firstChild){
//             ul.removeChild(ul.firstChild)
//         }
//             for (let i = 0; i < text.length; i++) {
//                 const li = document.createElement('li')
//                 const checkbox = document.createElement('input')
//                 checkbox.setAttribute('type','checkbox')
//                 li.innerText = `${text[i].id}. ${text[i].title}`
//                 if (text[i].completed) {
//                     checkbox.checked = true
//                 }
//                 li.appendChild(checkbox)
//                 ul.appendChild(li)    
//             }            
//     })  
// }); //Fin de select mostrar informacion
//Metodo correcto
userSelect.addEventListener('change', (e)=>{
    const id = parseInt(e.target.value);

    getAllUsers().then(allUsers=>{
        const ul = document.createElement('ul');
        for (let i = 0; i < allUsers.length; i++) {
            if (id === allUsers[i].id) {
                const liNombre = document.createElement('li');
                const liEmail = document.createElement('li')
                liNombre.innerText = `Nombre completo: ${allUsers[i].firstname} ${allUsers[i].lastname}`
                liEmail.innerText = `Email: ${allUsers[i].email}`;
                ul.appendChild(liNombre);
                ul.appendChild(liEmail);
                
                // console.log(allUsers[i]);
                break;
            }
        }
        const h3 = document.createElement('h3')
        h3.innerText = `Informacion del usuario seleccionado`
        
        userContainer.innerHTML = ""
        userContainer.appendChild(h3)
        userContainer.appendChild(ul)
    })
})

displayButton.addEventListener('click',()=>{
    const id = parseInt(userSelect.value);
    getAllTasks().then(allTasks =>{
        let template = ""
        console.log(allTasks.length)
        for (let i = 0; i < allTasks.length; i++) {
            if (id === allTasks[i].idUser){
                let isChecked = "";

                if(allTasks[i].completed){
                    isChecked="checked";
                }

                template += `
                <li>
                <span>${allTasks[i].title} </span>
                <input type="checkbox" ${isChecked}>
                `
            }            
        }
        taskContainer.innerHTML = 
        `
        <h3>Lista de tareas del usuario</h3>
        <ul>
            ${template}
        </ul>
        `
        // console.log(template);
    })
})



displayButton.addEventListener('click',()=>{
    if (taskContainer.style.visibility === 'visible') {
        taskContainer.style.visibility = 'hidden';
    } else {
        taskContainer.style.visibility = 'visible';
    }
})

function getAllUsers() {
    return fetch('http://localhost:5000/connection.php')
    .then((resp) => {
        return resp.json()
    });
}

function getUser(value) {
    return fetch('data/usuarios.json')
    .then((resp) => {
        return resp.json()
    }).then((resp)=>{
        return resp[value-1]
    });
}

function getTasks(userId){
    return fetch('data/tareas.json')
    .then((resp)=>{
        return resp.json()
    }).then((resp)=>{
        const array = []
        for (let i = 0; i < resp.length; i++) {
            const element = resp[i];
            if (element.userId==userId) {
                array.push(element);
            }
        }
        return array
    })
}

// function getAllTasks() {
//   return fetch('data/tareas.json')
//     .then(resp => {
//         return resp.json()});
// }

function getAllTasks() {
    return fetch('http://localhost:5000/tasks.php')
      .then(resp => {
          return resp.json()});
  }
  