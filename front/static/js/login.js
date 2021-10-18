if (!localStorage.getItem("token")) {
    inicio = document.getElementById("inicio")
    inicio.addEventListener("click", login)
} else {
    window.location.href = "panel.html"
}


function login(){
    var user = document.getElementById("user").value
    var pass = document.getElementById("pass").value
    if(user && pass){

        axios({
            method: "post",
            url: "http://localhost:3000/user/login",
            data: {
                correo: user,
                password: pass,
            },
        }).then(
            function (res) {
                if(res.data.code == 200){
                    localStorage.setItem("token", JSON.stringify(res.data.message))
                    window.location.href = "panel.html"
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
    else{
        alert("campos incompletos")
    }

}