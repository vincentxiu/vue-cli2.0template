window.pM = new PM();

pM.listen('esriOnLoad', function () {

    window.mapAPI = new MapAPI();

    window.mapAPI_view = new MapAPI();
    window.scMap = new SCMap();

    scMap.init();

});

function SCMap() {
    var _this = null;
    var obj = {
        vm: null,
        layerName: {},
        init: function (callback) {
            _this = this;

            _this.initMap(callback);
        },
        getSectionService: function (callback) {
            vm.ajax({
                serviceType: "crossDomainCall",
                serviceName: "environment/master",
                methodName: "querySectionChart",
                data: {
                    ticket: "testTicket",
                    queryParams: {sectionTypeCode: "", monitorTime: "2018-03", dataStatusCode: '02'}
                }
                , success: function (resultData) {

                    if (resultData.status == vm.ResultStatusEnum.SUCCESS) {
                        if (!resultData.data || resultData.data.length < 1) {
                            return;
                        }
                        ;
                        if ($.isFunction(callback)) {
                            callback(resultData.data);
                        }
                        ;
                    }
                }
            });
        },
        initMap: function (callback) {

            var _this = this;
            mapAPI.initMap({
                mapId: "map",
                defaultExtent: mSet.defaultExtent_waterMain,
                geometryServiceUrl: mSet.geometryServiceUrl,
                proxyUrl: mSet.proxyUrl,
                slider: true,
                isZoomEffect: false,
                onLoaded: function (e) {
                    if ($.isFunction(callback)) {
                        callback();
                    }
                    ;
                },
                onClick: function (evt) {
                    // console.log(evt)
                },
                OnExtentChange: function (evt) {
                    console.log(evt)
                }
            });
            _this.showMapEvt();

        },
        showMapEvt: function () {
            _this.showBaseLayer();

            //_this.getSectionService(_this.showSectionLayer);
        },
        showBaseLayer: function () {
            mapAPI.addMapService({
                mapServiceLayerType: "ArcGISTiledMapServiceLayer",
                layerUrl: mSet.pureLayerUrl,
                layerName: "baseLayer"
            });
        },
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
                    })
                }
            }, properties);


            // mapAPI.businessLayerRemove({layerName: "test"});

            mapAPI.businessLayerShow(settings);

        },
        showSectionLayer: function (dataList) {
            mapAPI.removeDivLayers();
            mapAPI.businessLayerRemove({layerName: "section"});

            if (!dataList || dataList.length < 1) {
                return;
            }
            ;
            var graphicList = [];
            dataList.map(function (item) {
                var list = item.split("-");
                if (list.length > 4) {
                    graphicList.push({
                        code: list[0],
                        name: list[1],
                        posX: parseFloat(list[2]),
                        posY: parseFloat(list[3]),
                        qualityLevel: list[4],
                        image: DDictionary.symbolObj.sectionQualityImg[list[4]]
                    });
                }
                ;
            });
            _this.showBussinessLayer({
                layerName: "section",
                geometryType: "Point",
                graphicList: graphicList,
                itemFields: {xField: "posX", yField: "posY", attributes: "attributes"},
                symbolWidth: 28,
                symbolHeight: 28,
                onClickEvent: function (evt) {
                    var geometry = evt.graphic.geometry;
                    geometry.type = "point";

                    mapAPI.businessLayerRemove({layerName: "searchLayer_Pt"});
                    mapAPI.businessLayerRemove({layerName: "bufferLayer"});

                    _this.bufferSearch({geometry: geometry, distance: 5});
                },
                callback: function (layer) {
                    var dataList = [];
                    var graphics = layer.graphics;
                    dataList = graphics.map(function (item) {

                        return $.extend(item.attributes, {
                            longitude: item.geometry.x,
                            latitude: item.geometry.y,
                            qualityLevelName: DDictionary.qualityCodeConvertName[item.attributes.qualityLevel]
                        });
                    });

                    _this.showTextLabel(dataList, "name", "qualityLevelName", "qualityLevel");
                }
            });

        },
        sectionClickInfo: function (evt,apiType) {
            var _this = this;
            if (!evt || !evt.graphic) {
                return;
            }
            var attr = evt.graphic.attributes;

            if (!attr) {
                return;
            }
            ;
            if (_this.isLastSelectedDomAndShowing(attr)) {
                return;
            }
            ;

            var divJQ = $("<div class='layerOpenInfo'></div>").appendTo("body");

            var html = "";
            html += "<div class='layerOpenInfo_item title'>" + pM.formatText(attr.monitorSiteName) + "</div>";
            html += "<div class='layerOpenInfo_item'>监测结果：" + pM.formatText(DDictionary.qualityCodeConvertName[attr.qualityCode]) + "</div>";
            html += "<div class='layerOpenInfo_item'>监测时间：" + pM.formatText(attr.monitorTime).substring(0,7) + "</div>";
            html += "<div class='detailLink'></div>"
            $(html).appendTo(divJQ);

            $(".detailLink").unbind("click").bind("click", function (e) {
                var pageUrl = "http://192.168.252.119:8182/web/cm/cm/uc/fractureSurface/basicsInfo.html?ticket=" + vm.ticket + "&monitorPointCode=" + attr.monitorSiteCode;
                var configs = {
                    url: pageUrl
                    , type: 'page'
                    , title: attr.name
                    , width: $.publicMethod.percent
                    , height: $.publicMethod.percent
                };
                pageMix.methods.pageOpen(configs);
            });
            apiType.mapInfoWindowShow({
                domNode: divJQ[0],
                evt: evt
            });

        },
        isLastSelectedDomAndShowing: function (attr) {
            var _this = this;
            if (_this.lastSelectedDom) {
                if (JSON.stringify(_this.lastSelectedDom) == JSON.stringify(attr)) {
                    if (mapAPI_view.map.infoWindow.isShowing) {
                        mapAPI_view.mapInfoWindowHide();
                        return true;
                    }
                }
                ;
            }
            ;
            _this.lastSelectedDom = attr;
            return false;
        },
        showRippleLayer: function (properties) {
            var settings = $.extend({
                data: [],
                layerName: 'rippleLayer'
            }, properties);

            _this.getSectionService(function (data) {

                mapAPI_view.showDivLayer({
                    layerName: settings.layerName,
                    data: data,
                    xField: "posX",
                    yField: "posY",
                    templateFunction: function (graphic) {
                        if (!graphic || !graphic.attributes || !graphic.graphicJQ) {
                            return;
                        }
                        ;
                        var attr = graphic.attributes;

                        var html = '<div class="diffuseLayer">';
                        html += diffuseClass(attr);
                        html += circleDiffuse(attr);// rippleClass(attr);
                        html += '</div>';

                        function diffuseClass(attr) {
                            var h = ''

                            if (attr.isRiverMonitor && attr.diffuseTypeList && attr.diffuseTypeList.length > 0 && attr.qualityCode) {
                                var colorClass = DDictionary.waterQualityLevelObj[attr.qualityCode];
                                diffuseTypeList = JSON.parse(attr.diffuseTypeList);
                                for (var i = 0; i < diffuseTypeList.length; i++) {
                                    var itemClass = DDictionary.diffuseClassObj[diffuseTypeList[i]];
                                    var animationName = itemClass.substring(6) + "-" + colorClass;
                                    h += '<div class="' + itemClass + '" style="-webkit-animation-name:' + animationName + ';-o-animation-name:' + animationName + ';-moz-animation-name:' + animationName + ';animation-name:' + animationName + ';"></div>';
                                }
                                ;
                            }
                            ;
                            return h;
                        };

                        function rippleClass(attr) {
                            var h = '';
                            h += '<div class="pt-ripple">\n' +
                                '    <div class="dot ' + DDictionary.rippleClassObj[attr.dataStatusCode] + '"></div>\n' +
                                '</div>';
                            return h;
                        };

                        function circleDiffuse(attr) {
                            var h = '';
                            h += '<div class="circle-diffuse ' + DDictionary.rippleClassObj[attr.dataStatusCode] + '">\n' +
                                '    <div class="circle-dot"></div>\n' +
                                '    <div class="pulse"></div>\n' +
                                '    <div class="pulse1"></div>\n' +
                                '</div>';
                            return h;
                        }

                        $(html).data("graphic", graphic).appendTo(graphic.graphicJQ);
                        $(".diffuseLayer").unbind("click").bind("click", function (e) {
                            var _thisJQ = $(this);
                            var graphic = _thisJQ.data("graphic");

                            var evt = {
                                graphic: graphic,
                                screenPoint: mapAPI_view.map.toScreen(graphic.geometry)
                            };
                            _this.sectionClickInfo(evt,mapAPI_view);
                        });
                        $(".diffuseLayer").unbind("mouseover").bind("mouseover", function (e) {
                            var _thisJQ = $(this);
                            _thisJQ.css("cursor", 'pointer');
                        });
                        $(".diffuseLayer").unbind("mouseout").bind("mouseout", function (e) {
                            var _thisJQ = $(this);
                            _thisJQ.css("cursor", 'default');
                        });
                    }
                });
            });

        },
        removeRippleLayer: function (properties) {
            var settings = $.extend({
                layerName: ""
            }, properties);
            mapAPI_view.removeDivLayers({layerName: settings.layerName});
        },
        reSetMapExtent:function () {
            setTimeout(function () {
                mapAPI.map.centerAt(mapAPI.getPoint(mSet.defaultCenter));
            },500)
        }
    };

    return obj;
};








