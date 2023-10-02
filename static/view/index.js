function changeContent(fileName){
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = Callback;
    xmlHttp.open("GET", getUrlParams(document.URL)["path"] + "/" +fileName, false ); // read
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
    for(var sg of text){
        var param = sg.split('|');
        createButton(param[0], param[1], param[2]);
    }
    document.getElementById("hint").innerHTML = "loaded all information.";
}
function createButton(fileName, title, time){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = title;
    btn.setAttribute("filename", fileName);
    btn.setAttribute("title", title);
    btn.setAttribute("time", time);
    btn.onclick = function(){
        var url = "";
        url = "model.html";
        url += "?" + 
        "path=" + getUrlParams(document.URL)["path"] + "/content" + "&" + 
        "filename=" + btn.getAttribute("filename") + "&" + 
        "title=" + btn.getAttribute("title") + "&" + 
        "time=" + btn.getAttribute("time");

        console.log(getUrlParams(document.URL)["path"] + "/content" + "/" + btn.getAttribute("url"));

        window.open(url, "_blank");
    }
    document.body.appendChild(btn);
}
function getUrlParams(url) {
    let urlStr = url.split('?')[1]
    const urlSearchParams = new URLSearchParams(urlStr)
    const result = Object.fromEntries(urlSearchParams.entries())
    return result
}