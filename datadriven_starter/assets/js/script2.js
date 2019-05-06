let xmlhttp = new XMLHttpRequest(),
    url = "assets/json/data.json";

xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        var menuItems = JSON.parse(xmlhttp.responseText);
        buildItem(menuItems);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function buildItem(items){
    var output = "",
        selectedID = localStorage.getItem("selected");

    items.forEach(function(item){
        if(selectedID == item.objID){
            output =  "<li class='item'>" +
                        "<h3>" + item.name + "</h3>" + 
                        "<img class='pic' src=assets/img/" + item.image +".png />" +
                        "<p>" + item.description + "</p>" + 
                        "<p>Cost: $" + item.cost + "</p>" + 
                        "<p>Average Rating: " + item.rating + " % positive.</p>" +
                        "<p>Personal Time Played: " + item.timePlayed + " hours.</p>" + 
                      "</li>";
        }
    });
    document.getElementById("item").innerHTML = output;
}