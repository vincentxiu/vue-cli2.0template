import mSet from './mapSettings'
import {DDictionary} from './dataDictionary';
import {layerClickOpenInfo} from './publicMethod';

pM.listen('esriOnLoad', function (MapAPI) {
  window.mapAPI=new MapAPI()
  window.scMap = new SCMap(mapAPI);
  scMap.init();
  pM.trigger("scMapOnLoad");
});

function SCMap(mapAPI) {
    var _this = null;
    var symbol_mc1 = mapAPI.getDefaultSymbolByName("Polygon", {
        fillColor: [255, 255, 0, 180],
        lineColor: [204, 204, 204]
    })
    var symbol_mc2 = mapAPI.getDefaultSymbolByName("Polygon", {
        fillColor: [91, 185, 212, 180],
        lineColor: [204, 204, 204]
    })
    var symbol_mc3 = mapAPI.getDefaultSymbolByName("Polygon", {
        fillColor: [107, 152, 97, 180],
        lineColor: [204, 204, 204]
    })

    var obj = {
            highlightGeometryObj: {},
            highlightCantonObj: {},
            riverList: [],
            currentTime: '',
            // cardUrl: window.webSiteRootUrl + "sxyd/uc/coreTarget/onePicture/waterEnvironment/card.html?ticket=" + vm.ticket + "&code=",
            cursorLabel: window.webSiteRootUrl + 'maps/styles/images/labelcursor.svg',
            cursor: window.webSiteRootUrl + 'maps/styles/images/cursor.svg',
            init: function () {
                _this = this;

                //_this.currentTime = (new Date).Format("yyyy-MM-dd")

                _this.initMap();
            }

            ,
            initMap: function () {

                var _this = this;

                mapAPI.initMap({
                    mapId: "map",
                    defaultExtent: mSet.defaultExtent,
                    geometryServiceUrl: mSet.geometryServiceUrl,
                    proxyUrl: mSet.proxyUrl,
                    slider: true,
                    isZoomEffect: false,
                    onLoaded: function (e) {

                    },
                    onClick: function (evt) {
                        //console.log(evt.mapPoint)
                    },
                    OnExtentChange: function (evt) {
                        // console.log(evt)
                    }
                });

                _this.showMapEvt();

            }
            ,
            showMapEvt: function () {
                _this.showBaseLayer();

            }
            ,
            showBaseLayer: function () {
                mapAPI.addMapService({
                    mapServiceLayerType: "ArcGISTiledMapServiceLayer",
                    layerUrl: mSet.pureLayerUrl,
                    layerName: "baseMap"
                });
            }
            ,
            showMapLayer: function (tab) {

                _this.layerBaseInfo = DDictionary.layerInfo[tab];
                var settings = {
                    mapServiceLayerType: "ArcGISDynamicMapServiceLayer",
                    layerUrl: _this.layerBaseInfo.layerUrl,
                    childLayerIds: [_this.layerBaseInfo.layerId],
                    layerName: _this.layerBaseInfo.layerName,
                    opacity: 0.7,
                    isSymbolHLClear: false,
                    onClickEvent: function (e) {

                        var html = _this.layerBaseInfo.getHtml(e.graphic.attributes)
                        layerClickOpenInfo({e: e, html: html, label: "管控区信息"})
                        // var code = e.attributes.SHJGKFQBM
                        // var url = _this.cardUrl + code
                        // layerClickOpenInfo_iframe({e: gEvt, url: url})
                    }
                };
                mapAPI.addMapService(settings);

            }
            ,
            showBussinessLayer: function (properties) {
                var settings = $.extend({
                    layerName: "test",
                    geometryType: "Point",
                    graphicList: [{posX: 121, posY: 31.5, name: 'test'}],
                    itemFields: {xField: "posX", yField: "posY", attributes: "attributes"},
                    onClickEvent: function (evt) {
                        if (!evt || !evt.graphic) {
                            return;
                        }
                        var attr = evt.graphic.attributes;
                        if (!attr) {
                            return;
                        }
                        ;
                        var divJQ = $("<div class='layerOpenInfo'></div>").appendTo("body");

                        var html = "<div>" + attr.name + "</div>";
                        $(html).appendTo(divJQ);

                        mapAPI.mapInfoWindowShow({
                            Title: "站点",
                            domNode: divJQ[0],
                            evt: evt
                        });
                    }
                }, properties);

                ;
                mapAPI.businessLayerShow(settings);

            }
            ,
            zoomToPoint: function (data) {
                var zoomLevel = data.zoomLevel || mSet.ptZoomLevel;
                mapAPI.zoomToPoint({
                    posX: parseFloat(data.longitude),
                    posY: parseFloat(data.latitude),
                    zoomLevel: zoomLevel,
                    isShowScottLayer: true,
                    dx: data.dx || -0.05
                });
            }
            ,
            homeInit: function () {

                _this.layerBaseInfo = {};
                mapAPI.mapInfoWindowHide();
                mapAPI.businessLayerRemove({layerName: "highlight"});
                mapAPI.zoomToFullExtent();
                Object.keys(DDictionary.layerInfo).map(function (item) {
                    mapAPI.hideMapService({layerName: DDictionary.layerInfo[item].layerName});
                })
                mapAPI.businessLayerHide();

            }
            ,
            reorderLayer: function () {
                var layerNameList = [{layerName: 'bufferLayer', isBusinessLayer: false, reorderLayerIndex: 0},
                    {layerName: 'highlightLayer', isBusinessLayer: true, reorderLayerIndex: 1},
                    {layerName: 'searchLayer_river', isBusinessLayer: true, reorderLayerIndex: 2}
                ];
                layerNameList.map(function (item, index) {
                    mapAPI.reOrderLayer(item);
                })

            },
            filterLayer: function (properties) {
                var settings = $.extend({}, properties);
                _this.layerBaseInfo = DDictionary.layerInfo[settings.tab];
                if (!_this.layerBaseInfo) {
                    return
                }
                ;

                var where = getWhere(settings);

                mapAPI.mapInfoWindowHide();
                mapAPI.businessLayerRemove({layerName: "highlight"});
                mapAPI.businessLayerRemove({layerName: _this.layerBaseInfo.layerName});
                if (!where) {
                    mapAPI.businessLayerHide({layerName: _this.layerBaseInfo.layerName})
                    mapAPI.addMapService({layerName: _this.layerBaseInfo.layerName})
                    mapAPI.zoomToFullExtent()
                } else {
                    mapAPI.hideMapService({layerName: _this.layerBaseInfo.layerName})
                    pM.loading()
                    mapAPI.queryGeometry({
                        layerUrl: _this.layerBaseInfo.layerUrl + "/" + _this.layerBaseInfo.layerId,
                        where: where,
                        callback: function (geometryList) {
                            pM.unloading()
                            geometryList.map(function (item) {
                                var manageCategoryCodeField = item.attributes[_this.layerBaseInfo.manageCategoryCodeField].substring(0, 2)
                                switch (manageCategoryCodeField) {
                                    case "优先":
                                        item.symbol = symbol_mc1;
                                        break;
                                    case "重点":
                                        item.symbol = symbol_mc2;
                                        break;
                                    case "一般":
                                        item.symbol = symbol_mc3;
                                        break;
                                }
                            })
                            mapAPI.businessLayerShow({
                                layerName: _this.layerBaseInfo.layerName,
                                geometryList: geometryList,
                                geometryType: "Polygon",
                                onClickEvent: function (e) {
                                    var html = _this.layerBaseInfo.getHtml(e.graphic.attributes)
                                    layerClickOpenInfo({e: e, html: html, label: "管控区信息"})
                                    // var code = e.graphic.attributes.SHJGKFQBM
                                    // var url = _this.cardUrl + code;
                                    // layerClickOpenInfo_iframe({e: e, url: url})
                                },
                                isCallBack: true,
                                callback: function (layer) {
                                    if (!layer.graphics || layer.graphics.length < 1) {
                                        mapAPI.zoomToFullExtent();
                                        return
                                    }

                                    _this.zoomtoLayer(layer.graphics)
                                }
                            })
                        }
                    })

                }

                function getWhere(settings) {
                    var where = "";

                    if (settings.canton) {
                        var cantonField = _this.judgeCatonField(settings.canton)
                        where += cantonField + " like '%" + window.areas[settings.canton] + "%'"
                    }
                    if (_this.layerBaseInfo.manageCategoryCodeField && settings.manageCategoryCode) {
                        if (where) {
                            where += " AND "
                        }
                        where += _this.layerBaseInfo.manageCategoryCodeField + " like '" + DDictionary.manageCategoryObj[settings.manageCategoryCode] + "%'"
                    }
                    if (_this.layerBaseInfo.nameField && settings.name) {
                        if (where) {
                            where += " AND "
                        }
                        where += _this.layerBaseInfo.nameField + " like '%" + settings.name + "%'"
                    }
                    // if (!where) {
                    //     where = "1=1"
                    // }
                    // ;
                    return where;
                }
            },
            zoomtoLayer: function (graphics) {
                var rings = []

                graphics.map(function (graphic) {
                    rings.push(graphic.geometry.rings[0])
                })
                var geometry = mapAPI.getPolygon({rings: rings});
                setTimeout(function () {
                    mapAPI.zoomToExtent({polygon: geometry, expandFactor: 1.5});
                }, 300)

            },
            getLngLat: function () {
                mapAPI.map.graphics.clear();

                addCursorText();
                removeMapClick();
                _this.mapClickId = mapAPI.map.on("click", function (e) {
                    vm.isShowCursorText = false

                    var mapPoint = e.mapPoint

                    vm.lngLat = mapPoint.x.toFixed(6) + "," + mapPoint.y.toFixed(6);

                    addPtToMap(mapPoint)

                    removeMapClick()
                });

                function removeMapClick() {
                    if (_this.mapClickId) {
                        _this.mapClickId.remove();
                        _this.mapClickId = null;
                    }
                }

                function addCursorText() {
                    $("#map").unbind("mousemove").bind("mousemove", function (e) {
                        var _thisJQ = $(this);
                        var cursor_textJQ = $("#cursor_text");

                        cursor_textJQ.show();
                        cursor_textJQ.css({left: (e.clientX + 10) + "px", top: (e.clientY + 10) + "px"});

                    })
                    $("#map").unbind("mouseout").bind("mouseout", function (e) {
                        var cursor_textJQ = $("#cursor_text");
                        cursor_textJQ.hide();
                    });
                }

                function addPtToMap(mapPoint) {
                    var geomrtry = mapAPI.getPoint({x: mapPoint.x, y: mapPoint.y});
                    var symbol = mapAPI.getDefaultSymbolByName("Point_Picture", {
                        image: _this.cursorLabel,
                        width: 28,
                        height: 28
                    }).setOffset(0, 14)

                    var graphic = mapAPI.createGraphic({
                            geometry: geomrtry,
                            symbol: symbol
                        }
                    )
                    mapAPI.map.graphics.add(graphic)
                }
            },
            showOverControlUnitPt: function (code) {
                var dataList = [{longitude: 119.106972, latitude: 33.591404, status: 1, Name: "test1"},
                    {longitude: 119.049, latitude: 33.554, status: 2, Name: "test2"},
                    {longitude: 118.991, latitude: 33.442, status: 1, Name: "test3"},
                    {longitude: 119.06234, latitude: 33.476048, status: 2, Name: "test4"},
                    {longitude: 118.995049, latitude: 33.561192, status: 1, Name: "test5"},
                    {longitude: 119.174263, latitude: 33.637409, status: 2, Name: "test6"},
                    {longitude: 119.015648, latitude: 33.493214, status: 1, Name: "test7"},
                    {longitude: 118.938744, latitude: 33.403263, status: 1, Name: "test8"},
                    {longitude: 119.131004, latitude: 33.519306, status: 1, Name: "test9"},
                    {longitude: 119.016335, latitude: 33.590031, status: 1, Name: "test10"},
                    {longitude: 119.003975, latitude: 33.612003, status: 2, Name: "test11"},
                    {longitude: 119.106972, latitude: 33.473301, status: 1, Name: "test12"},
                    {longitude: 118.980629, latitude: 33.482914, status: 1, Name: "test13"},
                    {longitude: 119.080193, latitude: 33.535786, status: 1, Name: "test14"}
                ];
                dataList.map(function (item) {
                    item.symbol = mapAPI.getDefaultSymbolByName("Point_Picture", {
                        image: DDictionary.OverControlUnitPt[item.status],
                        width: 28,
                        height: 28
                    })
                })
                mapAPI.businessLayerShow({
                    layerName: "overControlUnitPt",
                    itemFields: {
                        xField: "longitude",
                        yField: "latitude",
                        attributes: "attributes"
                    },
                    graphicList: dataList,
                    onClickEvent: function (e) {
                        layerClickOpenInfo({e: e, label: "环境容量分析", width: "300px"})
                    }
                })
            },
            clearOverControlUnit: function () {
                mapAPI.mapInfoWindowHide();
                mapAPI.businessLayerRemove({layerName: "overControlUnitPt"});
                mapAPI.businessLayerRemove({layerName: "highlight"});
                mapAPI.zoomToFullExtent();
            }
        }
    ;
    obj.showHighlightLayer = function (properties) {
        var settings = $.extend({
            layerName: 'highlight',
            layerUrl: '',
            code: '',
            isHighlight: true,
            isShowRippleLayer: false,
            callback: null,
            symbolObj: {borderWidth: 2}
        }, properties)
        if (settings.tab) {
            _this.layerBaseInfo = DDictionary.layerInfo[settings.tab];
        }
        mapAPI.businessLayerRemove({layerName: "highlight"});
        mapAPI.mapInfoWindowHide();

        if (!_this.layerBaseInfo) {
            return
        }
        var where = '';
        if (settings.code) {
            where = _this.layerBaseInfo.codeField + "='" + settings.code + "'"
        } else if (settings.cantonName) {
            where = settings.cantonField + "='" + settings.cantonName + "'"
        }


        if (_this.highlightGeometryObj[settings.code]) {
            var features = _this.highlightGeometryObj[settings.code];

            queryCallback(features)
        } else if (_this.highlightCantonObj[settings.cantonName]) {
            var features = _this.highlightCantonObj[settings.cantonName];

            queryCallback(features)
        } else {
            mapAPI.queryGeometry({
                where: where,
                layerUrl: _this.layerBaseInfo.layerUrl + "/" + _this.layerBaseInfo.layerId,
                callback: function (features) {
                    if (!features || features.length < 1) {
                        mapAPI.zoomToFullExtent();
                        return;
                    }
                    if(settings.code){
                        _this.highlightGeometryObj[settings.code] = features;
                    }else if(settings.cantonName){
                        _this.highlightCantonObj[settings.cantonName] = features;
                    }


                    queryCallback(features)
                }
            });
        }

        function queryCallback(features) {
            if (settings.isHighlight) {
                mapAPI.highlightGeometry({
                    geometryList: features,
                    geometryType: pM.upperFirst(features[0].geometry.type)
                })
            }
            _this.zoomToGeometry({
                geometry: features[0].geometry,
                isShowRippleLayer: settings.isShowRippleLayer
            })

            if ($.isFunction(settings.callback)) {
                settings.callback(features);
            }
        }

    }
    obj.zoomToGeometry = function (properties) {
        var settings = $.extend({}, properties);
        if (!settings.geometry) {
            return
        }
        var xyObj = null;
        switch (settings.geometry.type) {
            case "point":
                xyObj = settings.geometry;
                break;
            case "polyline":
                break;
            case "polygon":
                xyObj = settings.geometry.getCentroid();
                break;
        }

        mapAPI.zoomToPoint({
            posX: xyObj.x,
            posY: xyObj.y,
            zoomLevel: settings.zoomLevel || mSet.ptZoomLevel - 1,
            isShowRippleLayer: settings.isShowRippleLayer
        });
    }
    obj.judgeCatonField = function (cantonCode) {
        var cantonField = ""
        if (cantonCode == "320000") {
            cantonField = "PROV"
        } else if (cantonCode.length == 6) {
            if (cantonCode.substring(4, 6) == "00") {
                cantonField = "CITY"
            } else {
                cantonField = "AREA"
            }
        }
        return cantonField
    }
    return obj;
}
;


export  {SCMap}





