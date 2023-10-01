function changeContent(TheLink){
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = Callback;
    xmlHttp.open("GET", TheLink, false ); // read
    xmlHttp.send(null); 
}
function Callback(){
    if ( xmlHttp.readyState == 4 ) {
        if ( xmlHttp.status == 200 ) {
            var value = xmlHttp.responseText;
            setButton(value);
        }
    }
}
function setButton(text){
    text = text.split('\n');
    console.log(text);
    for(var sg of text){
        var param = sg.split('|');
        createButton(param[0], param[1], param[2]);
    }
    document.getElementById("hint").innerHTML = "loaded all information.";
}
function createButton(url, title, time){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = title;
    btn.setAttribute("url", url);
    btn.setAttribute("title", title);
    btn.setAttribute("time", time);
    btn.onclick = function(){
        var url = "";
        url = "../static/view/model.html";
        url += "?" + 
        "url=" + "../../smalltalk/content/" + btn.getAttribute("url") + "&" + 
        "title=" + btn.getAttribute("title") + "&" + 
        "time=" + btn.getAttribute("time");

        window.open(url, "_blank");
    }
    document.body.appendChild(btn);
}