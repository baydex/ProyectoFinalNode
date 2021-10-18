
function id(key){
    return document.getElementById(key)
}

search_bar = id("search-bar")

search_bar.addEventListener("blur", function(){
    search_bar.parentElement.parentElement.style.background = "rgba(255, 255, 255, 0.2)"
    search_bar.parentElement.parentElement.style.boxShadow = ""
    search_bar.parentElement.parentElement.style.color = "white"
    search_bar.style.color = "white"
})
search_bar.addEventListener("focus", function(){
    search_bar.parentElement.parentElement.style.background = "white"
    search_bar.parentElement.parentElement.style.boxShadow = "3px 3px 10px 0px rgba(0,0,0,0.3)"
    search_bar.parentElement.parentElement.style.color = "gray"
    search_bar.style.color = "gray"
})