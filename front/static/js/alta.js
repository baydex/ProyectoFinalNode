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



function id(key){
    return document.getElementById(key)
}


acept = id("acept")
acept.addEventListener("click",aceptF)
cancel = id("cancel")
cancel.addEventListener("click",cancelF)
staff = id("Staff")
staff.addEventListener("click",checkStaff)
volver = id("volver")
volver.addEventListener("click",function(){
    location.href="panel.html"
})
inputs = document.querySelectorAll("input")

function aceptF(){

    if(
        id("Nombre") &&
        id("Apellido") &&
        id("Correo") &&
        id("Telefono") &&
        id("Direccion")    ){
            if((id("Staff").checked == true && id("password")) || id("Staff").checked == false){
                
                axios.post(url + "/panel/registro" ,{
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
    }
    else{
        alert("Campos incompletos")
    }
}
function cancelF(){
    location.href="panel.html"
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