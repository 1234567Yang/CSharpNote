function load(){
    var params = getUrlParams(document.URL);
    var path = params["path"];
    var fileName = params["filename"];
    var title = params["title"];
    var time = params["time"];
    if(path != undefined && fileName!=undefined){
        changeContent(path, fileName);
    }else{
        document.getElementById("info").innerHTML = "无法加载html, path != undefined && fileName!=undefined";
    }
    if(title != undefined){
        document.getElementById("header-hint").innerHTML="笔记 - " + title;
    }else{
        document.getElementById("header-hint").innerHTML="笔记 - 无法加载标题";
    }
    // CodeMirror.fromTextArea(document.getElementsByClassName("codeTextarea")[0], {
    //     lineNumbers: true,
    //     mode: "text/x-csharp"
    // });
    loadCodeHighlight();
    loadImage(path, fileName);
}
function loadCodeHighlight(){
    var elements = document.getElementsByClassName("codeTextarea");
    for(var a of elements){
        var cm = CodeMirror.fromTextArea(a, {
            lineNumbers: true,
            mode: "text/x-csharp",
            smartIndent: true,
            lineWrapping: true,
        });
        cm.setSize("auto", "auto");
        cm.refresh();
    }

    var elements = document.getElementsByClassName("outputTextarea");
    for(var a of elements){
        var cm = CodeMirror.fromTextArea(a, {
            lineNumbers: true,
            mode: "text/x-csharp",
            smartIndent: true,
            lineWrapping: true,
            theme: "ambiance"
        });
        cm.setSize("auto", "auto");
        cm.refresh();
    }
}
function loadImage(path, fileName){
    var elements = document.getElementsByClassName("img");
    for(var a of elements){
        console.log("***********" + a.src);
        a.src = path + "/" + "image" + "/" + fileName + "/" + a.src.substring(a.src.lastIndexOf("/") + 1);
        a.outerHTML = "<div class='imgboxer'>" + a.outerHTML + "<div style='position:relative;width:100%;'></div>" + "<span style='color:rgb(150,150,150)'>" + a.alt + "</span>" + "</div>";
    }
}
function getUrlParams(url) {
	let urlStr = url.split('?')[1]
	const urlSearchParams = new URLSearchParams(urlStr)
	const result = Object.fromEntries(urlSearchParams.entries())
	return result
}

function changeContent(path, FileName){
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = Callback;
    console.log(path);
    console.log("/" + FileName + ".html");
    xmlHttp.open("GET", path + "/" + FileName + ".html", false ); // read
    xmlHttp.send(null); 
}
function Callback(){
    if ( xmlHttp.readyState == 4 ) {
        if ( xmlHttp.status == 200 ) {
            var value = xmlHttp.responseText;
            document.getElementById("info").innerHTML = value;
        }
    }
}