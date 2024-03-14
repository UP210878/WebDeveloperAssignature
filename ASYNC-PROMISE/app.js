const btn = document.getElementById("btn");
const container = document.getElementById("container-users");

btn.addEventListener("click", ()=> {
    container.innerHTML = "";


    getUsers((users)=>{
        const ul =  document.createElement('ul');
        for (let i = 0; i < users.length; i++){
            const li = document.createElement('li');
            const btnli = document.createElement('button');
            btnli.innerText = "Get user info!";

          

            li.innerText = users[i].name;
            li.appendChild(btnli);

            ul.appendChild(li);

            btnli.addEventListener('click', ()=>{
              
                const id = users[i].id;

                getUserInfo(id, (info)=>{
                
                    const ol = document.createElement('ol');
                
                    ol.innerHTML = `
                    <li> ${info.fullName} </li>
                    <li> ${info.birthday} </li>
                    `;

                    li.appendChild(ol);
                });

            });

        }
        container.appendChild(ul);

    });
});

function getUsers(callback){

    const time = Math.floor(Math.random() * 5 + 1) * 1000;

    setTimeout(()=>{
        const users = [
    { id: 1, name : "Paulina", years : 20},
    { id: 2, name : "Jaquelin", years : 19 }
    ];

    callback(users);

    }, time);
}


function getUserInfo(id, callback){

    const time = Math.floor(Math.random() * 5 + 1) * 1000;

    setTimeout(()=>{
        const userInfo = [
            { id: 1, idUser: 2, fullName: "Jaquelin Alvarez", birthday: "2003-10-17"},
            { id: 2, idUser: 1, fullName: "Paulina Alvarez", birthday: "2007-09-03"}
        ];

    const userFindInfo = userInfo.find(user => {
        return user.idUser === id
    })

    callback(userFindInfo);

    }, time);

}


