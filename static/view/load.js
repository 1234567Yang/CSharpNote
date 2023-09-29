function load(){
    console.log(document.URL);

    var params = getUrlParams(document.URL);
    var html = params["u"];
    var title = params["t"];


    if(html != undefined){
        changeContent(html);
    }else{
        document.getElementById("info").innerHTML = "无法加载html, html == undifined";
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
    
}
function loadCodeHighlight(){
    console.log("d");
    var elements = document.getElementsByClassName("codeTextarea");
    for(var a of elements){
        var cm = CodeMirror.fromTextArea(a, {
            lineNumbers: true,
            mode: "text/x-csharp",
            smartIndent: true,
            lineWrapping: true,
        });
        cm.refresh();
    }
}
function getUrlParams(url) {
	let urlStr = url.split('?')[1]
	const urlSearchParams = new URLSearchParams(urlStr)
	const result = Object.fromEntries(urlSearchParams.entries())
	return result
}

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
            document.getElementById("info").innerHTML = value;
        }
    }
}