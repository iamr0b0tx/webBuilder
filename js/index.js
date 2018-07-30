
function addClass(element){
	style = element.getAttribute("id");
	
	cc = getCurrentStyle();
	cc['styles'][style] = null;
	showStyleAttributesStyles();
}

function addElement(element){
	id = element.getAttribute("id");
	tag = document.createElement(id);
	content =  'This is '+id+' Tag';
	tag.innerHTML = content;

	index = newLayer("element", id);
	_current_layer_index = index;
	updateLayer(index, "content", content);

	d = duplicate(ELEMENTS[id]["attributes"]);
	d["id"] = "layer_"+index;
	updateLayer(index, "attributes", d);
	updateLayer(index, "basic-attributes", duplicate(ELEMENTS[id]["basic-attributes"]));
	updateLayer(index, "parentNode", 0);
	updateLayer(index, "childNode", null);

	updateLayer(0, "childNode", index);
	
	code = tag.outerHTML;

	setCurrentLayer(index);
}

function createClass(){
	list = Object.keys(_css_classes);
	if(list.length < 1){
		index = 1;

	}else{
		index = max(list)+1
	}

	cls = index.toString();
	_css_classes[cls] = new Object();
	_css_classes[cls]['name'] = index.toString();
	_css_classes[cls]['styles'] = new Object();

	_current_css_class = index;
	showStyles();
	showStyleAttributes();
}

function deleteCurrentLayer(){
	if(_current_layer_index == 0) return;

	r= confirm("Are you sure you want to delete "+getLayerName(_current_layer_index)+"? ")
	if(r == false) return

	index = _current_layer_index;
	
	delete _layers[index];
	for(layer in _layers){
		if(_layers[layer]["childNode"] != null && _layers[layer]["childNode"].indexOf(index) != -1){
			_layers[layer]["childNode"] = removeFromList(_layers[layer]["childNode"], index);
		}

		if(_layers[layer]["childNode"] != null && _layers[layer]["childNode"].length == 0) _layers[layer]["childNode"] = null;
	}

	

	LAYERS = Object.keys(_layers);
	LAYERS = removeFromList(removeFromList(LAYERS, index), 0)
	if(LAYERS.length == 0) setCurrentLayer(0);
	else {
		setCurrentLayer(parseInt(LAYERS[0]));

	}
}

function editClassName(cls_id){
	cls = _css_classes[cls_id]
	attributes_title.innerHTML = '<input type="text" style="width:92.5%;text-align:center;" id="class_'+cls_id+'" placeholder="Enter style name" value="'+cls["name"]+'" onchange="updateClassName(this)" onfocusout="resetClassTitle(this)">';
}

function formatInput(index, current_value, attribute, attribute_type, array="layers"){
	attr_type = getAttributeType();
	code = "";
	if(attribute_type == "distance"){
		if(current_value == null){
			current_value = 0;
		}

		val = parseInt(current_value).toString()
		p = current_value.replace(val, "");
		
		s1 = "";
		s2 = "";
		if(p == "%"){
			s1 = "selected"; 

		}else {
			s2 = "selected";
		
		}
		code += '<input type="number" style="width:70%;" id="input_'+attribute+"_"+index+'" placeholder="Enter '+attribute+'..." value="'+val+'" onchange="updateElementAttribute(this, \''+attribute+'\', \''+attribute_type+'\', \''+array+'\')">\
						<select id="select_'+attribute+"_"+index+'" style="width:20%;" onchange="updateElementAttribute(this, \''+attribute+'\', \''+attribute_type+'\', \''+array+'\')">\
								<option value="%" '+s1+'>%</option>\
								<option value="px" '+s2+'>px</option>\
						</select>';
	
	}else if(attribute_type == "color"){
		if(current_value == null){
			current_value = "#EEE";
		}
		code += '<h3 style="">'+attribute+'<input type="color" id="input_'+attribute+"_"+index+'" placeholder="Enter '+attribute+'..." value="'+current_value+'" style="width:25%;float:right" onchange="updateElementAttribute(this, \''+attribute+'\', \''+attribute_type+'\', \''+array+'\')"></h3>'
	
	}else if(attribute_type == "string"){
		if(current_value == null){
			current_value = "";
		}
		
		code += '<input type="text" style="width:92.5%;" id="input_'+attribute+"_"+index+'" placeholder="Enter '+attribute+'..." value="'+current_value+'" onchange="updateElementAttribute(this, \''+attribute+'\', \''+attribute_type+'\', \''+array+'\')">';

	}

	print(code)
	return code
}

function generateHTML(layer){
	tag = document.createElement(layer["element"]);
	if(layer["childNode"] == null) tag.innerHTML = layer["content"];

	for(attribute in layer["attributes"]){
		tag.setAttribute(attribute, layer["attributes"][attribute])
	}
	return tag;
}

function getAttributeType(){
	attr_type = "attributes";
	if(_properties_tab == 1) attr_type = "basic-attributes";
	return attr_type;
}

function getAttributeValue(attributes, attribute){
	li = attributes.split(";");
	attribute = PARSE_ATTRIBUTE[attribute];
	for(ix in li){
		attr = li[ix];
		attr = attr.split(":");

		if(attr[0].trim() == attribute){
			return attr[1];
		
		}
	}
	return ATTRIBUTES[attribute];
}

function getCurrentLayer(){
	return _layers[_current_layer_index];
}


function getCurrentStyle(){
	return _css_classes[_current_css_class];
}

function getLayerName(layer){
	l = _layers[layer];
	if(Object.keys(l["attributes"]).indexOf("id") != -1){
		name = l["attributes"]["id"];
	
	}else{
		name = "layer_"+layer;
	
	}
	return name;
}

function hidePreview(){
	preview.style.zIndex = "-15";
	preview.style.visibility = "hidden";

}

function hideShade(){
	shade.style.zIndex = "-5";

}

function moveCurrentLayer(where){
	id = _current_layer_index;
	LAYERS = _layers[_layers[id]["parentNode"]]["childNode"]
	index = LAYERS.indexOf(id);
	if(where == "down"){
		if(index < LAYERS.length - 1) index += 1

	
	}else if(where == "up"){
		if(index > 0) index -= 1
	}
	
	_layers[_layers[id]["parentNode"]]["childNode"] = sortLayer(id, index, LAYERS);
	showLayers();
}

function newLayer(key, value){
	list = Object.keys(_layers);
	if(list.length < 2){
		index = 1;

	}else{
		index = max(list)+1
	}

	_layers[index] = new Object();
	_layers[index][key] = value;
	return index;
}

function removeNodeInLayer(index, key, value){
	list = removeFromList(_layers[index][key], value);
	if(list.length == 0) list = null;
	_layers[index][key] = list;
}

function renderViewBox(){
	if(_current_layer_index != 0) {
		layer =  getCurrentLayer();

		tag = document.createElement(layer["element"]);
		tag.innerHTML = layer["content"];

		for(attribute in layer["attributes"]){
			tag.setAttribute(attribute, layer["attributes"][attribute])
		}

		viewbox.innerHTML = tag.outerHTML;
		showAttributes();
	
	}else{
		viewbox.innerHTML = "";
		attributes_panel.innerHTML = "";

	}

	
}

function renderWebpage(){
	showShade();
	showPreview();

	viewbox.innerHTML = ""
	preview.innerHTML = ""
	preview.appendChild(generateHTML(_layers[0]));

	child_nodes = [];
	for(i in _layers[0]["childNode"]){
		index = _layers[0]["childNode"][i];
		layer = _layers[index];
		id = _layers[index]["attributes"]["id"];

		$("main").appendChild(generateHTML(layer));
		
		print("adding main subnode "+index+" id "+id)
		if(layer["childNode"] != null){
			for(ix in layer["childNode"]){
				lyr = _layers[layer["childNode"][ix]]
				child_nodes.push(lyr);
				print("			adding child node "+layer["childNode"][ix])
				$(id).appendChild(generateHTML(lyr));
			}
		}
	}
	
	$("LAYER_"+_current_layer_index).className =  "active_layer";
}

//returns the class title to display and not input
function resetClassTitle(element){
	id = element.getAttribute("id").split("_");
	updateClassName(element);

	cls = _css_classes[id]
	attributes_title.innerHTML = cls['name']+' <span onclick="editClassName(\''+id+'\')"> [edit]</span>';
}

function setAsCurrentLayer(element){
	id = element.getAttribute("id").replace("LAYER_", "");
	element.className = "active_layer";
	$("LAYER_"+_current_layer_index).className =  "";
	setCurrentLayer(parseInt(id));
}

function setAsCurrentStyle(element){
	id = element.getAttribute("id").replace("STYLE_", "");
	element.className = "active_layer";
	$("STYLE_"+_current_css_class).className =  "";
	setCurrentStyle(id);
}

function setCurrentLayer(index){
	_current_layer_index = index;
	showLayers();
	renderViewBox();
}

function setCurrentStyle(index){
	_current_css_class = index;
	showStyles();
}

function searchAttribute(){
	key = $('style_search').value;
	search_result = [];
	code = "";

	for(style in STYLES){
		re = new RegExp(key, "i");
		if(style.search(re) != -1){
			search_result.push(style);
			code += '<div onclick="addClass(this)" id="'+style+'">'+style+'</div>';
		}
	}

	$('style_search_results').innerHTML = code
}

function searchElement(){
	key = element_search.value;
	search_result = [];
	code = "";

	for(element in ELEMENTS){
		re = new RegExp(key, "i");
		if(ELEMENTS[element]["keywords"].search(re) != -1){
			search_result.push(element);
			code += '<div onclick="addElement(this)" id="'+element+'">'+element+'</div>';
		}
	}

	search_results.innerHTML = code
}

function setElementPlace(element){
	id = element.getAttribute("id");
	li = id.replace("layer_", "").split("_")
	index = parseInt(li[1]);

	pos = {
		"in": "parentNode",
	}

	rpos = {
		"in": "childNode",
	}
	val = element.value;
	if(val == ""){
		val = null;
		

	}else{
		val = parseInt(val)
		print("-adding "+val+" "+rpos[li[0]]+" "+index);
		updateLayer(val, rpos[li[0]], index);
	}
	p = _layers[index][pos[li[0]]];
	place = rpos[li[0]]
	
	if(place == "childNode"){

		if(p != null) {
			print("removing "+p+" "+place+" "+index);
			removeNodeInLayer(p, place, index)
		}
	}else{
		print("removing "+p+" "+place+" "+val);
		updateLayer(p, place, val);

	}

	print("adding "+index+ " "+pos[li[0]]+" "+val);
	updateLayer(index, pos[li[0]], val);
	showAttributes();
	showLayers();
	
}

function showAttributes(){
	if(Object.keys(_layers).length == 1) return 

	cl = getCurrentLayer();
	ci = _current_layer_index;
	li = [_layers[ci]["parentNode"], _layers[ci]["nextNode"], _layers[ci]["previousNode"]];

	attributes = cl["attributes"];
	basic_attributes = cl["basic-attributes"];

	attributes_title.innerHTML = cl["attributes"]["id"];

	prop = '';
	if(_properties_tab == 1){
		prop = "Show Basic";
		
	}else{
		prop = "Show Advance";
		
	}

	code = '<button id="properties_btn" onclick="toggleProperties()">'+prop+'</button>';
		
	nodePos = {
		"parentNode": "in",
	}

	rnodePos = {
		"parentNode": "childNode",
	}

	if(_properties_tab == 0){
		for(i in nodePos){
			pos = nodePos[i];
			code += '<h3>'+pos+'<select id="layer_'+pos+'_'+_current_layer_index.toString()+'"" style="width:auto;height:35px;padding:1%;float:right" onchange="setElementPlace(this)">';
			
			
			for(index in _layers){
				p = li.indexOf(parseInt(index));
				
				selected = "";
				if(index == _current_layer_index || (nodePos[i] != "in" && index == 0)) {
					continue;
				}

				layer = _layers[index];
				layer_name = getLayerName(index);
				
				place = rnodePos[i];
				if((i == "parentNode" && cl["parentNode"] == index) || ci == layer[place]) selected = "selected";
				
				if(p != -1){
					if(p == 0 && pos != "in") continue;
				}

				code += '<option value="'+index+'" '+selected+'>'+layer_name+'</option>';
			}

			code += '</select></h3>'
		}

		//collects the id of the element
		code += '<input type="text" style="width:92.5%;" id="input_id_'+ci+'" placeholder="Enter element id" value="'+_layers[ci]["attributes"]["id"]+'" onchange="updateElementId(this)">';
		code += '<select style="width:92.5%;" id="select_class_'+ci+'" onchange="updateElementClass(this)">\
					<option value="">Select a custom css class</option>'

		for(cls_id in _css_classes){
			cls = _css_classes[cls_id]['name']
			selected = ""
			if(cl['attributes']['class'] == cls) selected = "selected"
			code += '<option value="'+cls+'" '+selected+'>'+cls+'</option>'
		}
		code += '</select>'

		for(basic_attribute in basic_attributes){
			current_value = getAttributeValue(_layers[index]["attributes"]["style"], basic_attribute)
			code += formatInput(ci, current_value, basic_attribute, basic_attributes[basic_attribute]);
		}
	
	}else{
		code = '<div class="right-base-corner">\
					<input type="text" onkeydown="searchAttribute()" id="style_search" placeholder="Search for CSS style here...">\
					<h2>Results</h2>\
					<div class="search_results" id="style_search_results"></div>\
				</div>'
	}

	attributes_panel.innerHTML = code;
	properties_btn = document.getElementById("properties_btn");

}


function showPreview(){
	preview.style.zIndex = 15;
	preview.style.visibility = "visible";
}

function showShade(){
	shade.style.zIndex = 5;
}

function showStyleAttributes(){
	if(Object.keys(_layers).length == 1) return 

	// current css class
	cc = getCurrentStyle();
	ci = _current_css_class;
	
	attributes_title.innerHTML = cc["name"]+' <span onclick="editClassName(\''+_current_css_class.toString()+'\')"> [edit]</span>';

	code = '<input type="text" onkeydown="searchAttribute()" id="style_search" placeholder="Search for style here...">\
			<div id="styles">';		
	code += '</div>\
			<div class="right-base-corner">\
				<h2>Results</h2>\
				<div class="search_results" id="style_search_results"></div>\
			</div>'	
	attributes_panel.innerHTML = code;
	showStyleAttributesStyles();

}

function showStyleAttributesStyles(){
	code = ""
	cc = getCurrentStyle();
	ci = _current_css_class;

	for(style in cc['styles']){
		current_value = cc['styles'][style]
		code += formatInput(ci, current_value, style, STYLES[style], "styles");
	}
	
	$('styles').innerHTML = code;
}

function showStyles(){
	code = '<button onclick="createClass()">Create Class</button>'
	
	for(cls in _css_classes){
		c = "0";
		if(_current_css_class == cls) c = "active_layer";
		code += '<div onclick="setAsCurrentStyle(this)" id="STYLE_'+cls+'" class="'+c+'">'+cls+'</div>';
	}
	layers.innerHTML = code;
	showStyleAttributes();
}

function showLayers(){
	code = '<div onclick="renderWebpage(this)" id="layer_0" class="">Preview Webpage</div>';
	
	//breaks the code
	if(_layers[0]["childNode"] == null) {
		layers.innerHTML = "";
		return
	}

	for(ix in _layers[0]["childNode"]){
		layer = _layers[0]["childNode"][ix];
		name = getLayerName(layer);
		c = "0";
		if(_current_layer_index == layer && _current_layer_index != 0) c = "active_layer";
		code += '<div onclick="setAsCurrentLayer(this)" id="LAYER_'+layer+'" class="'+c+'">'+name+'</div>';
		
		code += getEmbededLayers(_layers[layer]["childNode"], INDENT, 1);
	}

	layers.innerHTML = code;
	showAttributes();
}

function getEmbededLayers(LAYERS, indent, order){
	if(LAYERS != null){
		code = '';
		for(i in LAYERS){
			layer_index = LAYERS[i];
			layer_name = getLayerName(layer_index);

			c = "";
			if(_current_layer_index == layer_index && _current_layer_index != 0) c = "active_layer";
			code += indent+'<div onclick="setAsCurrentLayer(this)" id="LAYER_'+layer_index+'" class="'+c+'" style="width:'+(100-(7*1.5*order))+'%;border:1px solid black;float:right">'+layer_name+'</div>';
			code += getEmbededLayers(_layers[layer_index]["childNode"], indent+INDENT, order+1);
		}
		return code;
		
	}else{

		return '';
	}
}

function sortLayer(layer, index, LAYERS){
	old_index = LAYERS.indexOf(layer);
	old_value = LAYERS[index];

	LAYERS = removeFromList(LAYERS, layer);
	LAYERS = LAYERS.slice(0, index).concat([layer]).concat(LAYERS.slice(index, LAYERS.length));
	return LAYERS;
}

function switchBackgroundColor(){
	_bgci =  (_bgci + 1)%_colors.length;
	viewbox.style.backgroundColor = _colors[_bgci];
}

function toggleLayersTab(element){
	curr_tab = element.innerHTML;
	if(curr_tab == "Layers"){
		element.innerHTML = "Styles";
		showStyles();
	
	}else{
		element.innerHTML = "Layers";
		showLayers();

	}
	
}

function toggleProperties(){
	if(_properties_tab == 1){
		properties_btn.innerHTML = "Show Basic";
		_properties_tab = 0;
	
	}else{
		properties_btn.innerHTML = "Show Advance";
		_properties_tab = 1;
	}

	showAttributes();
	
}

function updateElementAttribute(element, attribute, attribute_class, array="layers"){
	attr_type = getAttributeType();

	//if the other is picked, it will run an update
	Id = element.getAttribute("id");
	if(Id.indexOf("select_") != -1){
		element = $(Id.replace("select_", "input_"));
	}
	Id = element.getAttribute("id").split("_")
	
	id =  Id[2];
	val = element.value;

	//get the id, then the other option(select) if available
	if(attribute_class == "distance"){
		val += $("select_"+Id[1]+"_"+id).value;
	}

	if(array == "layers"){
		index = parseInt(id);

		old_attr = _layers[index]["attributes"]["style"];
		old_attr_li = old_attr.split(";");
		
		isIn = false;
		attrib = "";
		for(ix in old_attr_li){
			attr = old_attr_li[ix];
			if(attr == ""){
				continue;
			}

			attr = attr.split(":");

			if(attr[0].trim() == PARSE_ATTRIBUTE[attribute]){
				attr[1] = val;
				isIn = true;
			
			}
			attrib += attr[0]+":"+attr[1]+";"
		}
		
		if(isIn == false){
			attrib = old_attr+PARSE_ATTRIBUTE[attribute]+":"+val+";"
		
		}
		_layers[index]["attributes"]["style"] = attrib;
		showAttributes();
		renderViewBox();
	
	}else{
		cc = getCurrentStyle();
		cc['styles'][id] = val;

		showStyleAttributes();
	}
}

// the class attributes title name editing
function updateClassName(element){
	id = element.getAttribute("id").split("_");
	id = parseInt(id[id.length-1]);

	cls = _css_classes[id]
	cls['name'] = element.value.replace(/ /g, '_');
}

function updateElementId(element){
	id = element.getAttribute("id").split("_");
	id = parseInt(id[id.length-1]);

	_layers[id]["attributes"]["id"] = element.value.replace(/ /g, '_');
	showLayers();
}

function updateElementClass(element){
	id = element.getAttribute("id").split("_");
	id = parseInt(id[id.length-1]);

	_layers[id]["attributes"]["class"] = element.value.replace(/ /g, '_');
	showLayers();
}

function updateLayer(index, key, value){
	if(key == "childNode"){
		if(value != null){
			if(_layers[index][key] == null){
				_layers[index][key] = [value];
			
			}else{
				if(_layers[index][key].indexOf(value) == -1) _layers[index][key].push(value);
			}

		}else{
			if(Object.keys(_layers[index]).indexOf(key) == -1) _layers[index][key] = null;
		}

	}else{
		_layers[index][key] = value;
	
	}
}

