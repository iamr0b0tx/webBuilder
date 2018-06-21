var invert = function (obj) {

  var new_obj = {};

  for (var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }

  return new_obj;
};

var duplicate = function (obj) {

  var new_obj = {};

  for (var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      new_obj[prop] = obj[prop];
    }
  }

  return new_obj;
};

function removeFromList(list, value){
	new_list = [];
	for(i in list){
		v = list[i];
		if(v == value){
			continue;
		}
		new_list.push(v);
	}
	return new_list;
}

function max(list){
	m = parseInt(list[0]);
	for(i in list){
		x = parseInt(list[i])
		if(x > m){
			m = x
		}
	}
	return m;
}