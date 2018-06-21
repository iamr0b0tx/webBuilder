//std functions
function __init__(){
	searchElement();
	showLayers();
	renderViewBox();
}

function $(id){
	return document.getElementById(id);
}

function $_(el){
	return document.createElement(el);
}

function print(data){
	console.log(data)
}

