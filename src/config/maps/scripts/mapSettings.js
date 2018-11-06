window.mapFrom = 0;//天地图
window.mapFrom = 1;//省厅

window.esriAPIFrom=0;//公司
window.esriAPIFrom=1;//省厅

var layerUrl = {};
var baseMap = "TDT";
var random = (new Date()).getTime();
var whereRandom = " AND " + random + "=" + random;
if(window.esriAPIFrom==1){
    layerUrl.apiIndexUrl = "http://10.32.202.106:40000/arcgisAPI/map324/jsapi/index.js";
    layerUrl.apiCssUrl = "http://10.32.202.106:40000/arcgisAPI/map324/jsapi/3.24/esri/css/esri.css";
    layerUrl.apiCssUrl_claro = "http://10.32.202.106:40000/arcgisAPI/map324/jsapi/3.24/dijit/themes/claro/claro.css";
}else{
    layerUrl.apiIndexUrl = "http://58.210.204.106:10031/1199/arcgisapi/map324/jsapi/index.js";
    layerUrl.apiCssUrl = "http://58.210.204.106:10031/1199/arcgisapi/map324/jsapi/3.24/esri/css/esri.css";
    layerUrl.apiCssUrl_claro = "http://58.210.204.106:10031/1199/arcgisapi/map324/jsapi/3.24/dijit/themes/claro/claro.css";
}

if (window.mapFrom == 1) {
    layerUrl.geometryServiceUrl =  "http://10.32.202.95:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
    layerUrl.pureLayerUrl = "http://10.32.201.235/ArcGIS/rest/services/JS_blue/MapServer";
    layerUrl.imgLayerUrl = "http://10.32.200.51/ArcGIS/rest/services/jsyxdt/MapServer";
    layerUrl.vectorLayerUrl = "http://10.32.200.51/ArcGIS/rest/services/jsdzdt2/MapServer";


} else {
    layerUrl.geometryServiceUrl =  "http://58.210.204.106:10053/arcgis/rest/services/Utilities/Geometry/GeometryServer";
    layerUrl.pureLayerUrl = "http://58.210.204.106:10053/arcgis/rest/services/soil/dz0411/MapServer";
    layerUrl.imgLayerUrl = "";
    layerUrl.vectorLayerUrl = "";


}
;


layerUrl.river = ""
layerUrl.riverNoLevel = ""
layerUrl.canton = ""
layerUrl.road = ""
layerUrl.redLine = ""
layerUrl.environmentBussiness = ""

layerUrl.envSynthesizeUrl = "http://10.32.202.95:6080/arcgis/rest/services/SXYDPT/ZHHJGKDY/MapServer";//环境综合
layerUrl.zoologyEnvUrl = "http://10.32.202.95:6080/arcgis/rest/services/SXYDPT/STHJGKDY_GJ/MapServer";//生态环境国控
layerUrl.waterEnvUrl_s = "http://10.32.202.95:6080/arcgis/rest/services/SXYDPT/SHJGKFQ_SJ/MapServer";//水环境——省级
layerUrl.airEnvUrl = "http://10.32.202.95:6080/arcgis/rest/services/SXYD/DQHJGKFQ/MapServer";//气环境
layerUrl.zoologyEnvUrl_s="http://10.32.202.95:6080/arcgis/rest/services/SXYDPT/STHJGKDY_SJ/MapServer";//生态环境省控

let mSet = {
    defaultExtent: {
        xmax: 122.6500732421875,
        xmin: 116.0802490234375,
        ymax: 35.392999885804805,
        ymin: 30.317316292054805,
        wkid: 4326
    },
    defaultCenter: {x: 120.7, y: 31.4},
    defaultZoom: window.mapFrom ? 4 : 3,
    ptZoomLevel: window.mapFrom ? 6 : 5,
    geometryServiceUrl: layerUrl.geometryServiceUrl,
    pureLayerUrl: layerUrl.pureLayerUrl,
    imgLayerUrl: layerUrl.imgLayerUrl,
    vectorLayerUrl: layerUrl.vectorLayerUrl,
    preUrl: layerUrl.preUrl,
    river: layerUrl.river,
    riverNoLevel: layerUrl.riverNoLevel,
    canton: layerUrl.canton,
    road: layerUrl.road,
    redLine: layerUrl.redLine,
    controlUnit: layerUrl.controlUnit,
    hydraulicBussiness: layerUrl.hydraulicBussiness,
    environmentBussiness: layerUrl.environmentBussiness,
    siteFacilitiesBussiness: layerUrl.siteFacilitiesBussiness,
    highLineColor: [0, 255, 255],
    highBorderWidth: 2,
    highFillColor: [0, 255, 255, 10],
    opacity: 0.9,
    envSynthesizeUrl: layerUrl.envSynthesizeUrl,
    zoologyEnvUrl: layerUrl.zoologyEnvUrl,
    waterEnvUrl: layerUrl.waterEnvUrl_s,
    airEnvUrl: layerUrl.airEnvUrl,
    zoologyEnvUrl_s:layerUrl.zoologyEnvUrl_s
};

export default mSet
