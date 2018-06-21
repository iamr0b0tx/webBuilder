const HEADERS = ["h1", "h2", "h3", "h4", "h5", "h6", "h7"];

var EL = {
	"div":{
		"keywords": "division, section, div,",
		"attributes":{
			"style": "font-family:vans;height:15%;width:100%;background-color:#FFFFFF;color:#000000;"
		},
		"basic-attributes":{
			"width": "distance",
			"height": "distance",
			"font": "string",
			"textColor": "color",
			"background": "color",
			"position": "position",
		}
	},

	"img":{
		"keywords": "image, img, picture, photo",
	},

	"object":{
		"keywords": "object, ",
	},

	"span":{
		"keywords": "span, ",
	},
}

for(i in HEADERS){
	header = HEADERS[i];
	EL[header] = {
		"keywords": "header, h,",
		"attributes": {
			"style": "-webkit-margin-before: 0em;-webkit-margin-after: 0em;"
		},
	}
}

const ELEMENTS = EL;