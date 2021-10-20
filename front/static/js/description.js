url = "http://localhost:3000" //url base



if (!localStorage.getItem("token")) {
    window.location.href = "login.html"
}
else{  //token y datos del usuario con la sesion activa
    local = localStorage.getItem("token")
    local = JSON.parse(local)
    sesionID = local.user.id
    sesionName = local.user.Nombre
    sessionToken = local.token
    headers = {
        headers : {
            'Authorization': `bearer ${sessionToken}`
        }
    }
}

loadUser() //cargamos a el usuario seleccionado

function getParameterByName(name) { //funcion que jala las variables get de la url
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



function id(key){ //para no hacer document.getElementBy bla bla bla mucho texto mejor una funcion con nombre corto
    return document.getElementById(key)
}

function loadUser(){
    axios.get(url + "/panel/" + getParameterByName("id"), headers).then( //hacemos una consulta get a la url /panel/id que nos pasa por url get
        function (res){
            if(res.data.code == 200){ //si todo sale bien...
                message = res.data.message[0]  //guardamos el mensaje en una variable
                console.log(message)
                Object.keys(message).forEach(key => {  //hacemos for each en las claves de el json que recibimos
                    if(key == "Staff" && message[key] == 1){ //Si la columna staff vale 1 pues el checkbox lo ponemos palomeado
                        id("Staff").checked = true
                    }
                    if(message[key] == 0){ //si no entonces ocultamos el campo de password, los que no son staff no pueden logear y no necesitan pass 
                        id("password").parentElement.style.display="none"
                    }
                    if(key != "Staff"){
                        id(key).value = message[key]
                    }
                });
            }
            else{
                alert(res.data.message) // si algo sale mal en el server lo mostramos
            }
        }
    ).catch(
        function (err){
            // F
        }
    )
}

edit = id("edit")
edit.addEventListener("click",editF)
acept = id("acept")
acept.addEventListener("click",aceptF)         //muchos botones
cancel = id("cancel")
cancel.addEventListener("click",cancelF)
remove = id("remove")
remove.addEventListener("click",removeF)
volver = id("volver")
volver.addEventListener("click",function(){ //para volver a el panel principal
    location.href="panel.html"
})
staff = id("Staff")     //hacemos un evento que este monitoreando si se activa o desactiva la checkbox que hace un usuario admin/staff
staff.addEventListener("click",checkStaff)

inputs = document.querySelectorAll("input") //Seleccionamos todos los inputs que tenemos

function editF(){  //Si quiere editar habilitamos todos los inputs menos el de ID 
    inputs.forEach(element => {
        if(element.id != "id"){

            element.disabled = false
        }
    });
    acept.style.display = "block" //Si estas editando cambian los botones que puedes usar
    cancel.style.display = "block"
    remove.style.display = "block"
    edit.style.display = "none"
}
function aceptF(){
    inputs.forEach(element => {
        element.disabled = true //SI ya aceptaste primero deshabilitamos y ocultamos los botones
    });    
    acept.style.display = "none"
    cancel.style.display = "none"
    remove.style.display = "none"
    edit.style.display = "block"
    if(id("id") &&
        id("Nombre") &&
        id("Apellido") &&
        id("Correo") &&
        id("Telefono") &&  //checamos que esten llenos los campos
        id("Direccion")    ){
            if((id("Staff").checked == true && id("password")) || id("Staff").checked == false){ //validacion extra de el password en base a si es staff
                
                axios.post(url + "/panel/" + getParameterByName("id"),{
                    Nombre: id("Nombre").value,
                    Apellido: id("Apellido").value,
                    Correo: id("Correo").value,
                    Telefono: id("Telefono").value,
                    Direccion: id("Direccion").value, //Un super JSON con todos los datos
                    Staff: id("Staff").checked==true? 1: 0,
                    password: id("Staff").checked==true? id("password").value: "",
                }, headers).then(
                    function (res) {
                        if(res.data.code == 200){
                            alert("Operacion exitosa") //Ojala siempre fuera asi, sin errores ni 404s
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
    }
    else{
        alert("Campos incompletos")
    }
}
function cancelF(){
    location.href="panel.html" // Cancelar te regresa al panel principal
}
function checkStaff(){
    if(staff.checked == true){
        id("password").parentElement.style.display = "block"
    }
    else{   //Haces visible o invisible en campo de password en base a si haces staff o no al usuario
        id("password").parentElement.style.display = "none"
    }
}

id("userButton").addEventListener("click",userProfile) //boton que te lleva al perfil de usuario

function userProfile(){
    location.href = "description.html?id="+sesionID   
}
function removeF(){
    axios.delete(url + "/panel/" + getParameterByName("id"),headers).then(
        function (res) {
            if(res.data.code == 200){
                alert("Usuario eliminado") //Ojala siempre fuera asi, sin errores ni 404s
                location.href="panel.html"
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