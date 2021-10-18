url = "http://localhost:3000"

//tabla de empleados y lista de empleados
tabla = document.getElementById("tablaEmpleados") 
empleados = []

//barra de busqueda
search = id("search-bar")
search.addEventListener("keyup", filter)

// Links a el perfil de usuario y a el registro de nuevos trabajadores
id("userButton").addEventListener("click",function(){
    location.href = "description.html?id="+sesionID   
})
id("registerButton").addEventListener("click",function(){
    location.href = "alta.html" 
})

if (!localStorage.getItem("token")) {
    window.location.href = "login.html"
}
else{
    local = localStorage.getItem("token")
    local = JSON.parse(local)

    //Datos de el usuario que inicio la sesion
    sesionID = local.user.id
    sesionName = local.user.Nombre
    sessionToken = local.token
    headers = {
        headers : {
            'Authorization': `bearer ${sessionToken}`,
        }
    }
}

loadUsers() //cargar usuarios





function loadUsers(){
    axios.get(url + "/panel", headers).then( //consultamos todos los usuarios
        function (res){
            if(res.data.code == 200){  //si el codigo es 200
                message = res.data.message //hacemos una variable con el mensaje por comodidad
                for(let i = 0; i< message.length; i++){  //recoremos el array del mensaje que contiene los empleados
                    
                    // Hacemos innerHTML
                    tabla.innerHTML += `<tr class="empleadoFila" id="${message[i].id}" onclick="details(${message[i].id})">
                                            <td>${message[i].id}</td>
                                            <td>${message[i].Nombre} ${message[i].Apellido}</td>
                                            <td>${message[i].Correo}</td>
                                            <td>${message[i].Staff == 1? "<span class='icon-yes'></span>": "<span class='icon-no'></span>"}</td>
                                        </tr>`
                    empleados.push(message[i])
                    // Agregamos el empleado a el array de empleados
                }
            }
            else{
                // Si el servidor manda un error lo muestra
                alert(res.data.message)
            }
        }
        ).catch(
            function (err){
            console.log(err)
            // F
        }
        )
    }
    

// Funcion que redirige a la descripcion y le pasa por get en la url el ID del empleado que quiere ver a detalle
function details(key){
    window.location.href = "description.html?id="+key
}

// Buscador de empleados, funciona tambien por correo electronico y usa el array de empleados
function filter(){
        filtrados = []
        empleados.forEach(element => {  //Recorremos todos los empleados
            if(
            element.id == search.value ||
            element.Nombre.toUpperCase().includes(search.value.toUpperCase()) ||
            element.Apellido.toUpperCase().includes(search.value.toUpperCase()) ||   //Aqui solo vemos si la cadena se incluye en los valores
            element.Correo.toUpperCase().includes(search.value.toUpperCase())
        ){
            filtrados.push(element) //Si la cadena escrita en el buscador es parte de el registro se agrega a un array de los filtrados
        }
    });
    load(filtrados) //cargamos en la tabla solo los filtrados
}


function load(filtrados){
    // innerHTML con los titulos de las columnas :D y al mismo tiempo elimina todas las filas que habian antes
    tabla.innerHTML=`<tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Correo</th>
    <th>Admin</th>
</tr>`
    filtrados.forEach(element => { //foreach que recorre los filtrados y agrega las filas
        tabla.innerHTML += `<tr class="empleadoFila" id="${element.id}" onclick="details(${element.id})">
                                            <td>${element.id}</td>
                                            <td>${element.Nombre} ${element.Apellido}</td>
                                            <td>${element.Correo}</td>
                                            <td>${element.Staff == 1? "<span class='icon-yes'></span>": "<span class='icon-no'></span>"}</td>
                                        </tr>`
    });
}





