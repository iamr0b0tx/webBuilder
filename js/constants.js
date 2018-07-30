const INDENT = ''; //'<span style="width:auto;height:100%;border-radius:100%">_</span>';
const ATTRIBUTES = {
	"width": "100%",
	"height": "100%",
	"color": "#000000",
	"background-color": "#FFFFFF",
	"font-family": "vans serif"
}

const PARSE_ATTRIBUTE = {
	"width": "width",
	"height": "height",
	"textColor": "color",
	"background": "background-color",
	"font": "font-family",

}

const PARSE_ATTRIBUTE_R = invert(ATTRIBUTES);

const STYLES = {
	"background": "color",
	"color": "color",
	"font": "string",
	"height": "distance",
	"position": "position",
	"textColor": "color",
	"width": "distance",
}