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


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


loadUser()

function id(key){
    return document.getElementById(key)
}
function loadUser(){
    axios.get(url + "/panel/" + getParameterByName("id"), headers).then(
        function (res){
            if(res.data.code == 200){
                message = res.data.message[0]
                Object.keys(message).forEach(key => {
                    if(key!="Status"){

                        element = id(key)
                        element.value = message[key]
                    }
                    if(key == "Staff" && message[key] == 1){
                        id("Staff").checked = true
                    }
                    if(message[key] == 0){
                        id("password").parentElement.style.display="none"
                    }
                });
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

edit = id("edit")
edit.addEventListener("click",editF)
acept = id("acept")
acept.addEventListener("click",aceptF)
cancel = id("cancel")
cancel.addEventListener("click",cancelF)
volver = id("volver")
volver.addEventListener("click",function(){
    location.href="panel.html"
})
staff = id("Staff")
staff.addEventListener("click",checkStaff)

inputs = document.querySelectorAll("input")
function editF(){
    inputs.forEach(element => {
        if(element.id != "id"){

            element.disabled = false
        }
    });
    acept.style.display = "block"
    cancel.style.display = "block"
    edit.style.display = "none"
}
function aceptF(){
    inputs.forEach(element => {
        element.disabled = true
    });    
    acept.style.display = "none"
    cancel.style.display = "none"
    edit.style.display = "block"
    if(id("id") &&
        id("Nombre") &&
        id("Apellido") &&
        id("Correo") &&
        id("Telefono") &&
        id("Direccion")    ){
            if((id("Staff").checked == true && id("password")) || id("Staff").checked == false){
                
                axios.post(url + "/panel/" + getParameterByName("id"),{
                    Nombre: id("Nombre").value,
                    Apellido: id("Apellido").value,
                    Correo: id("Correo").value,
                    Telefono: id("Telefono").value,
                    Direccion: id("Direccion").value,
                    Staff: id("Staff").checked==true? 1: 0,
                    password: id("Staff").checked==true? id("password").value: "",
                }, headers).then(
                    function (res) {
                        if(res.data.code == 200){
                            alert("Operacion exitosa")
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
    location.href="panel.html"
    acept.style.display = "none"
    cancel.style.display = "none"
    edit.style.display = "block"
}
function checkStaff(){
    if(staff.checked == true){
        id("password").parentElement.style.display = "block"
    }
    else{
        id("password").parentElement.style.display = "none"
    }
}

id("userButton").addEventListener("click",userProfile)

function userProfile(){
    location.href = "description.html?id="+sesionID   
}