



url = "http://localhost:3000"

if (!localStorage.getItem("token")) {
    window.location.href = "login.html"
}
else{
    local = localStorage.getItem("token")
    local = JSON.parse(local)
    sesionID = local.user.id
    sesionName = local.user.Nombre
    sessionToken = local.token
    headers = {
        headers : {
            'Authorization': `bearer ${sessionToken}`,
        }
    }
}

loadUsers()

tabla = document.getElementById("tablaEmpleados")
m = 0

function details(key){
    window.location.href = "description.html?id="+key
}

empleados = []

function loadUsers(){
    axios.get(url + "/panel", headers).then(
        function (res){
            if(res.data.code == 200){
                message = res.data.message
                for(let i = 0; i< message.length; i++){

                    tabla.innerHTML += `<tr class="empleadoFila" id="${message[i].id}" onclick="details(${message[i].id})">
                                            <td>${message[i].id}</td>
                                            <td>${message[i].Nombre} ${message[i].Apellido}</td>
                                            <td>${message[i].Correo}</td>
                                            <td>${message[i].Staff == 1? "<span class='icon-yes'></span>": "<span class='icon-no'></span>"}</td>
                                        </tr>`
                    empleados.push(message[i])
                }
            }
            else{
                alert(res.data.message)
            }
        }
    ).catch(
        function (err){
            console.log(err)

        }
    )
}

search = id("search-bar")
search.addEventListener("keyup", filter)

function filter(){
    filtrados = []
    empleados.forEach(element => {
        
        if(
            element.id == search.value ||
            element.Nombre.toUpperCase().includes(search.value.toUpperCase()) ||
            element.Apellido.toUpperCase().includes(search.value.toUpperCase()) ||
            element.Correo.toUpperCase().includes(search.value.toUpperCase())
        ){
            filtrados.push(element)
        }
    });
    load(filtrados)
}
function load(filtrados){
    tabla.innerHTML=`<tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Correo</th>
    <th>Admin</th>
</tr>`
    filtrados.forEach(element => {
        tabla.innerHTML += `<tr class="empleadoFila" id="${element.id}" onclick="details(${element.id})">
                                            <td>${element.id}</td>
                                            <td>${element.Nombre} ${element.Apellido}</td>
                                            <td>${element.Correo}</td>
                                            <td>${element.Staff == 1? "<span class='icon-yes'></span>": "<span class='icon-no'></span>"}</td>
                                        </tr>`
    });
}




id("userButton").addEventListener("click",userProfile)

function userProfile(){
    location.href = "description.html?id="+sesionID   
}

id("registerButton").addEventListener("click",altas)

function altas(){
    location.href = "alta.html"   
}