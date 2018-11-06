var __CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("bootMap.js").replace("maps/scripts/", "");
;

window.webSiteRootUrl = bootPATH;

export  {bootPATH}
// document.write('<link href="' + layerUrl.apiCssUrl + '" rel="stylesheet" type="text/css" />');
//
// document.write('<link rel="stylesheet" href="' + bootPATH + 'maps/styles/iconfont/iconfont.css" />');
// document.write('<link rel="stylesheet" href="' + bootPATH + 'maps/styles/diagram_map.css" />');
// document.write('<link rel="stylesheet" href="' + bootPATH + 'maps/styles/rippleDot.css" />');
// document.write('<link rel="stylesheet" href="' + bootPATH + 'maps/styles/mapToolbar.css" />');
// document.write('<link rel="stylesheet" href="' + bootPATH + 'maps/styles/radar.css" />');
//
// document.write('<script src="' + bootPATH + 'maps/scripts/publicMethod.js" type="text/javascript"></sc' + 'ript>');
// document.write('<script src="' + layerUrl.apiIndexUrl + '" type="text/javascript"></sc' + 'ript>');
//
// document.write('<script src="' + bootPATH + 'maps/scripts/arcgis.API.js" type="text/javascript"></sc' + 'ript>');
//
// document.write('<script src="' + bootPATH + 'maps/scripts/mapToolbar.js" type="text/javascript"></sc' + 'ript>');
// document.write('<script src="' + bootPATH + 'maps/scripts/mapOperatebar.js" type="text/javascript"></sc' + 'ript>');
// document.write('<script src="' + bootPATH + 'maps/scripts/mapLegend.js" type="text/javascript"></sc' + 'ript>');
// document.write('<script src="' + bootPATH + 'maps/scripts/dataDictionary.js" type="text/javascript"></sc' + 'ript>');
