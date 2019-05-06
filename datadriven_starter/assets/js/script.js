let xhr = new XMLHttpRequest(),
    url = "assets/json/data.json";

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        var menuItems = JSON.parse(xhr.responseText);
        buildMenu(menuItems);
    }
};
xhr.open("GET", url, true);
xhr.send();

function buildMenu(items){
    var output = "";
    
    items.forEach(function(item){
        output += "<li class='item'" + "onclick=saveSelection(" + item.objID + ");> " +
                    "<img src=assets/img/" + item.image + ".png />" + 
                    "<p>" + item.name + "</p>" +
                  "</li>";
    });
    
    document.getElementById("menu_items").innerHTML = output;
}

function saveSelection(sel){
    localStorage.setItem("selected", sel);
    window.open("details.html", "_self");
}