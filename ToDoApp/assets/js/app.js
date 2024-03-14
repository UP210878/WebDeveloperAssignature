// Elementos HTML
const userSelect = document.getElementById('select-users');
console.log(userSelect);
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');

userSelect.addEventListener('click',()=>{
    // getAllUsers()
    getUser(userSelect.value).then((text)=>{
        const nombreCompleto = userContainer.children[1].children[0];
        const emailUsuario = userContainer.children[1].children[1];
        console.log(text)
        nombreCompleto.textContent = `Nombre completo: ${text.firstname} ${text.lastname}`
        emailUsuario.textContent = `Email: ${text.email}`
    })
    //console.log(getAllTasks())
    getTasks(userSelect.value).then((text)=>{
        const ul = taskContainer.children[1]
        // ul.replaceChildren()
        while(ul.firstChild){
            ul.removeChild(ul.firstChild)
        }
            for (let i = 0; i < text.length; i++) {
                const li = document.createElement('li')
                const checkbox = document.createElement('input')
                checkbox.setAttribute('type','checkbox')
                li.innerText = text[i].title
                if (text[i].completed) {
                    checkbox.checked = true
                }
                li.appendChild(checkbox)
                ul.appendChild(li)    
            }            
    })
    
})

// Codígo nesesario para mostrar información

// Fin de codígo 

// Funciones
/**
 * Optiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
    return fetch('data/usuarios.json')
    .then((resp) => console.log(resp.json()));
    
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

/**
 * Optiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('data/tareas.json')
    .then(resp => {
        return resp.json()});
}

/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador unico del usuario
 * @property {string} firtsname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electronico del usuario
  */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador unico de la tarea
 * @property {number} userId IDentificador del uaurio a quien corresponde la tarea
 * @property {string} title Titulo de la tarea
 * @property {boolean} completed Estado de la tarea si esta completada o no
 */

// -------------------- OTHER STUFF
// const button = document.getElementById('btn')
// const container = document.getElementById('container')
// console.log("This is working!!!");

// function sum(a,b){
//     return a+b;
// };

// function Suma2Numeros(callback){
//     const resultadoSuma = sum(1,2);

//     //Realice anteriormente mas cosas...
//     callback(resultadoSuma);
// };

// // function algo(valor) {
// //     console.log(valor);
// // }

// Suma2Numeros(function(valor) { 
//     console.log(valor)
//  });

// function getUsers() {
//     return fetch("http://127.0.0.1:3000/ToDoApp/data/usuarios.json")
//         .then((response)=>{
//             return response.json();
//         }).catch(()=>{
//             fetch("http://127.0.0.1:3000/data/usuarios.json")
//             .then((response)=>{
//                 return response.json();
//             })
//         });
// };

//  button.addEventListener('click',()=>{
//     getUsers().then((text)=>{
//         const ul = document.createElement('ul');
//         for (let index = 0; index < text.usuarios.length; index++) {
//             const li = document.createElement('li');
//             li.innerText = text.usuarios[index].name;

//             ul.appendChild(li);
//         }
//         container.appendChild(ul);
//         console.log(text.usuarios)
//     });

//  });
