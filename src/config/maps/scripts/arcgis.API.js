import esriLoader from 'esri-loader'
import {PM} from './publicMethod';
import {webSiteRootUrl} from './bootMap'


window.pM = new PM();
let MapAPI=null
pM.listen("vmOnLoad",function(){
  var _this = {},
    AREA_CONVERTV_ALVUE = 1500,
    _Enum = {
      Code__MapLayerTypeCode: {
        Map: "Map", //地图
        Point: "Point", //点图层
        Line: "Line", //线图层
        Polygon: "Polygon", //面图层
        RipplyScott: 'RipplyScott', //涟漪层
        Text: 'Text'
      },
      Code__SymbolNames: {
        Point: "Point",
        Point_Picture: "Point_Picture",
        Point_Text: "Point_Text",
        Polyline: "Polyline",
        Polyline_Highlight: "Polyline_Highlight",
        Polygon: "Polygon",
        Polygon_Highlight: "Polygon_Highlight",
        Point_Highlight: 'Point_Highlight'
      },
      Code__MapGeometryType: {
        Point: "point" //点图层
        ,
        Polyline: "polyline" //线图层
        ,
        Polygon: "polygon" //面图层
        ,
        Extent: "extent",
        Multipoint: "multipoint"
      },
      Code__MapDrawToolCode: {
        "Arrow": "ARROW",
        "Circle": "CIRCLE",
        "Ellipse": "ELLIPSE",
        "FreehandPolygon": "FREEHAND_POLYGON",
        "FreehandPolyline": "FREEHAND_POLYLINE",
        "Polygon": "POLYGON",
        "Polyline": "POLYLINE",
        "Point": "POINT",
        "Line": "LINE",
        "Extent": "EXTENT",
        "Triangle": "TRIANGLE",
        "MultiPoint": "MULTI_POINT"
      },
      Code__RenderType: {
        UniqueValueRenderer: "UniqueValueRenderer",
        ClassBreaksRenderer: "ClassBreaksRenderer",
        SimpleRenderer: "SimpleRenderer",
        HeatmapRenderer: "HeatmapRenderer",
        DotDensityRenderer: "DotDensityRenderer",
        BlendRenderer: "BlendRenderer"
      },
      Code__CustomEvent: {
        OnPanEndEvent: "pan-end",
        OnZoomEndEvent: "zoom-end",
        OnZoomStartEvent: "zoom-start",
        OnMapClickEvent: "click",
        OnMouseMoveEvent: "mouse-move",
        OnMouseOverEvent: "mouse-over",
        OnMouseOutEvent: "mouse-out",
        OnMouseWheelEvent: 'mouse-wheel',
        OnResizeEvent: "resize",
        OnLoadEvent: "load",
        OnUpdateEndEvt: "update-end",
        OnExtentChange: "extent-change",
        OnDoubleClickEvent: 'dbl-click'
      },
      Code_Unit: {
        Perimeter: '千米',
        Area: '亩'
      }
    },
    requireList = ['esri/map',
      'esri/layers/ArcGISImageServiceLayer',
      'esri/layers/ArcGISTiledMapServiceLayer',
      'esri/layers/ArcGISDynamicMapServiceLayer',
      'esri/layers/ImageParameters',
      'extlayers/tdtlib/TianDiTuTiledMapServiceLayer_Image',
      'extlayers/tdtlib/TianDiTuTiledMapServiceLayer_Vector',
      'extlayers/tdtlib/TianDiTuTiledMapServiceLayer_PlaceName',
      'esri/layers/GraphicsLayer',
      'esri/layers/FeatureLayer',
      'esri/layers/LabelLayer',
      'extlayers/D3AnnoLayer',
      'extlayers/RasterLayer',
     'plugins/ClusterLayer',
     'plugins/WindLayer',
      'esri/geometry/Extent',
      'esri/SpatialReference',
      'esri/geometry/Point',
      'esri/geometry/Polyline',
      'esri/geometry/Polygon',
      'esri/geometry/Circle',
      'esri/graphic',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/symbols/PictureMarkerSymbol',
      'esri/symbols/TextSymbol',
      'esri/symbols/SimpleFillSymbol',
      'esri/tasks/RelationParameters',
      'esri/tasks/LengthsParameters',
      'esri/tasks/GeometryService',
      'esri/tasks/query',
      'esri/tasks/QueryTask',
      'esri/tasks/IdentifyTask',
      'esri/tasks/IdentifyParameters',
      'esri/tasks/BufferParameters',
      'esri/tasks/FeatureSet',
      'esri/tasks/Geoprocessor',
      'esri/tasks/DataFile',
      'esri/tasks/FindTask',
      'esri/tasks/FindParameters',
      'esri/tasks/AreasAndLengthsParameters',
      'esri/renderers/SimpleRenderer',
      'esri/renderers/UniqueValueRenderer',
      'esri/renderers/ClassBreaksRenderer',
      'esri/renderers/HeatmapRenderer',
      'esri/toolbars/draw',
      'esri/Color',
      'esri/symbols/Font',
      'esri/config',
      "esri/dijit/TimeSlider",
      "esri/TimeExtent",
      "esri/request",
      "dojo/_base/event"
    ];

  esriLoader.loadModules(requireList).then(([Map,
    ArcGISImageServiceLayer,
    ArcGISTiledMapServiceLayer,
    ArcGISDynamicMapServiceLayer,
    ImageParameters,
    TianDiTuTiledMapServiceLayer_Image,
    TianDiTuTiledMapServiceLayer_Vector,
    TianDiTuTiledMapServiceLayer_PlaceName,
    GraphicsLayer, FeatureLayer, LabelLayer, AnnoLayer, RasterLayer,
                                             ClusterLayer,WindLayer,
    Extent, SpatialReference,
    Point, Polyline, Polygon, Circle, Graphic,
    SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol, TextSymbol, SimpleFillSymbol,
    RelationParameters, LengthsParameters, GeometryService, Query,
    QueryTask, IdentifyTask, IdentifyParameters,
    BufferParameters, FeatureSet, Geoprocessor, DataFile, FindTask, FindParameters,
    AreasAndLengthsParameters,
    SimpleRenderer, UniqueValueRenderer, ClassBreaksRenderer, HeatmapRenderer,
    Draw, Color, Font, Config, TimeSlider, TimeExtent, esriRequest, baseEvent])=>{

    _Enum.Code__MapServiceLayerType = {
      "ArcGISImageServiceLayer": ArcGISImageServiceLayer,
      "ArcGISTiledMapServiceLayer": ArcGISTiledMapServiceLayer,
      "ArcGISDynamicMapServiceLayer": ArcGISDynamicMapServiceLayer,
      "TianDiTuTiledMapServiceLayer_Image": TianDiTuTiledMapServiceLayer_Image,
      "TianDiTuTiledMapServiceLayer_Vector": TianDiTuTiledMapServiceLayer_Vector,
      "TianDiTuTiledMapServiceLayer_PlaceName": TianDiTuTiledMapServiceLayer_PlaceName
    };
    _Enum.Code_SymbolType = {
      'Polyline_DASHDOT': SimpleLineSymbol.STYLE_DASHDOT,
      'Polygon_SOLID': SimpleFillSymbol.STYLE_SOLID,
    }
     MapAPI = function () {
      var _this = {};
      this.Enum = _Enum;

      this.initMap = function (properties) {
        _this = this;
        var settings = {
          mapId: "",
          displayGraphicsOnPan: true //地图拖动时图形是否移动
          ,
          defaultExtent: {
            xmin: 0,
            ymin: 0,
            xmax: 0,
            ymax: 0,
            wkid: 4326
          },
          logo: false //是否显示Esri Logo
          ,
          slider: false //是否显示水平级别
          ,
          scaleBar: false,
          onLoaded: function (evt) { //完成加载后触发事件
          },
          geometryServiceUrl: "" //几何服务地址
          ,
          isZoomEffect: true,
          isDoubleClickZoom: true,
          isScrollWheelZoom: true,
          isPinchZoom: true,
          callback: function () {

          }
        };
        $.extend(settings, properties);
        _this = this;
        var options = {};
        options.extent = _this.initExtent(settings.defaultExtent);

        if (settings.defaultCenter) {
          options.center = settings.defaultCenter;
          options.zoom = settings.defaultZoom;
        }
        if (settings.defaultZoomLevel) {
          _this.defaultZoomLevel = settings.defaultZoomLevel;
        }
        options.logo = settings.logo;
        options.slider = settings.slider;
        options.spatialReference = options.extent.spatialReference;

        options.isPinchZoom = settings.isPinchZoom;
        if (settings.basemap) {
          options.basemap = settings.basemap
        }
        _this.map = new Map(settings.mapId, options);
        _this.mapJQ = $("#" + settings.mapId);
        _this.mapId = settings.mapId;
        _this.map.spatialReference = options.spatialReference;

        if (!settings.isDoubleClickZoom) {
          _this.map.disableDoubleClickZoom();
        }
        ;
        Config.defaults.io.corsDetection = false;

        getGeometryService();

        mapProxy();

        function mapProxy() {

          if (!settings.proxyUrl) {
            return
          }
          ;
          Config.defaults.io.proxyUrl = settings.proxyUrl; //page.webSiteRootUrl + "resources/Maps/arcgis/FrameWork/proxy.ashx";
          Config.defaults.io.alwaysUseProxy = false;
        };

        function getGeometryService() {
          if (settings.geometryServiceUrl || _this.geometryServiceUrl) {
            _this.geometryService = new GeometryService(settings.geometryServiceUrl || _this.geometryServiceUrl);
            Config.defaults.geometryService = _this.geometryService;
          }
          ;
        };

        _this.addMapEvent(_Enum.Code__CustomEvent.OnLoadEvent, function (e) {
          if (settings.isZoomEffect) {
            _this.Effects._zoomEffect._init();
            _this.addMapEvent(_Enum.Code__CustomEvent.OnMouseWheelEvent, function (e) {
              var level = _this.map.getLevel();
              switch (e.value) {
                case 1:
                  if (level < _this.defaultMaxLevel) {
                    _this.Effects._zoomEffect._show(e.value, e.screenPoint);
                  }
                  ;
                  break;
                case -1:
                  if (level > 0 && level <= _this.defaultMaxLevel) {
                    _this.Effects._zoomEffect._show(e.value, e.screenPoint);
                  }
                  ;
                  break;
              }
            });
          }
          ;
          if ($.isFunction(settings.onLoaded)) {
            settings.onLoaded(_this.map);
          }
          ;
        });

        if ($.isFunction(settings.OnZoomEndEvent)) {
          _this.addMapEvent(_Enum.Code__CustomEvent.OnZoomEndEvent, settings.OnZoomEndEvent);
        }
        ;
        if ($.isFunction(settings.OnExtentChange)) {
          _this.addMapEvent(_Enum.Code__CustomEvent.OnExtentChange, settings.OnExtentChange);
        }
        ;
        if ($.isFunction(settings.onClick)) {
          _this.addMapEvent(_Enum.Code__CustomEvent.OnMapClickEvent, settings.onClick);
        }
        ;
        if ($.isFunction(settings.callback)) {
          settings.callback(_this.map);
        }
        ;

      };
      this.initExtent = function (defaultExtent) {
        var extent = null;
        if (!defaultExtent) {
          return extent;
        }
        ;

        if (defaultExtent.xmin && defaultExtent.ymin &&
          defaultExtent.xmax && defaultExtent.ymax) {
          extent = new Extent(defaultExtent.xmin, defaultExtent.ymin, defaultExtent.xmax, defaultExtent.ymax);

          if (defaultExtent.wkid) {
            extent.spatialReference = new SpatialReference({
              wkid: defaultExtent.wkid
            });
          } else {
            extent.spatialReference = new SpatialReference({
              wkt: defaultExtent.wkt
            });
          }
          ;
          this.defaultExtent = extent;
        }
        ;
        return extent;
      };
      //添加地图事件
      this.addMapEvent = function (eventName, event) {
        var eventHandler = _this.map[eventName];

        if (eventHandler && $.isFunction(eventHandler)) {
          _this.removeMapEvent(eventHandler);
        }
        ;

        eventHandler = _this.map.on(eventName, function (evt) {
          event(evt);
        });
      };
      //移除地图事件
      this.removeMapEvent = function (eventHandler) {
        if (eventHandler && $.isFunction(eventHandler)) {
          eventHandler.remove();
          eventHandler = null;
        }
        ;
      };
      this.addMapService = function (properties) {
        //添加地图
        var settings = {
          mapServiceLayerType: "ArcGISDynamicMapServiceLayer" //地图服务类型
          ,
          layerUrl: "" //地图服务地址
          ,
          opacity: 1 //透明度
          ,
          layerName: "" //地图名称
          ,
          childLayerId: [] //显示的子图层编号
          ,
          showAttribution: false //是否显示属性
          ,
          showMaxScale: 0,
          showMinScale: 0,
          isVisible: true //是否显示图层
          ,
          infoWindowsettings: null //消息窗对象
          ,
          callback: function () {
            //加载完成后回调函数
          },
          legend: null //图例数组
          ,
          isSymbolHLClear: true //是否清除高亮显示的图形
        };
        $.extend(settings, properties);
        //如果有图例的则显示
        if (settings.legend) {
          //图例
          var legendSettings = {
            arcgisWindow: _this.arcgisWindow,
            map: _this.map,
            width: 150,
            legend: settings.legend
          };
          $("#" + _this.map.id + "_Legend").LegendControl(legendSettings);
          $("#" + _this.map.id + "_Legend").show();
        }
        ;

        var layerIndex = _this.getLayerIndex(settings.layerName);
        var Layer = null;

        if (layerIndex >= 0) {
          Layer = _this.map.getLayer(settings.layerName);
          if (!Layer.visible) {
            Layer.show();
          }
          ;
        } else {
          Layer = _this.createLayer(settings.mapServiceLayerType, settings.layerUrl);

        }
        ;

        if (settings.showMaxScale > 0) {
          // Layer.maxScale = settings.showMaxScale;
          Layer.setMaxScale(settings.showMaxScale);
        }
        ;
        if (settings.showMinScale > 0) {
          // Layer.minScale = settings.showMinScale;
          Layer.setMinScale(settings.showMinScale);
        }
        ;

        if (Layer != null) {
          Layer.mapServiceLayerType = settings.mapServiceLayerType;
          Layer.opacity = settings.opacity;
          Layer.visible = settings.isVisible;
          if (settings.id) {
            Layer.id = settings.id;
          } else {
            if (settings.layerName) {
              Layer.id = settings.layerName;
            }
          }
          //控制显示的子图层编号
          if (settings.childLayerIds && settings.childLayerIds.length > 0) {
            Layer.setVisibleLayers(settings.childLayerIds);
          }
          ;

          _this.mapServiceLayerEvt(settings, Layer);
        }
        ;

        if (layerIndex < 0) {
          _this.map.addLayer(Layer);
        }
        ;
        // if(settings.reorderLayerIndex){
        //     _this.map.reorderLayer(Layer, settings.reorderLayerIndex);
        // };
        if ($.isFunction(settings.callback)) {
          settings.callback(Layer);
        }
        ;
        return Layer;
      };
      this.mapServiceLayerEvt = function (settings, layer) {

        if ($.isFunction(settings.onClickEvent)) {
          var layerOnMouseClick = function (evt) {

            if (!layer.visible) {
              return
            }

            var geometry = new Point(evt.mapPoint.x, evt.mapPoint.y);
            var setting = {
              layerUrl: settings.layerUrl ,
              geometry: geometry,
              layerIds: settings.childLayerIds,
              onCompletedEvent: function (result) {
                if (result.length > 0) {
                  var g = result[0].feature;
                  if ($.isFunction(settings.onClickEvent)) {
                    settings.onClickEvent({graphic:g,mapPoint:geometry});
                  }
                }
                ;
              }
            };
            _this.taskIdentify(setting);

          };

          if (layer.clickHandler) {
            layer.clickHandler.remove();
            layer.clickHandler = null;
          }
          ;
          layer.clickHandler = _this.map.on(_Enum.Code__CustomEvent.OnMapClickEvent, layerOnMouseClick);
        }
        ;
      };
      this.getLayerIdsLength = function () {
        if (!_this.map || !_this.map.layerIds) {
          return 0;
        }
        return _this.map.layerIds.length;
      };
      this.checkMapService = function (properties) {
        var settings = {
          layerName: ""
        };
        $.extend(settings, properties);
        var layerIndex = -1;

        for (var i = 0; i < _this.map.layerIds.length; i++) {
          if (_this.map.layerIds[i] == settings.layerName) {
            layerIndex = i;
            break;
          }

        }
        if (layerIndex < 0) return;

        return  _this.map.getLayer(settings.layerName);
      }
      //删除底图服务
      this.removeMapService = function (properties) {
        var settings = {
          layerName: ""
        };
        $.extend(settings, properties);
        var oldLayer = _this.checkMapService(settings);
        if (!oldLayer) {
          return
        }
        ;
        if (oldLayer.clickHandler) {
          oldLayer.clickHandler.remove();
          oldLayer.clickHandler = null;
        }
        ;
        _this.map.removeLayer(oldLayer);
      };
      this.hideMapService = function (properties) {
        var settings = {
          layerName: ""
        };
        $.extend(settings, properties);

        var oldLayer = _this.checkMapService(settings);
        if (oldLayer) {
          oldLayer.hide();
        }
        ;

        if (_this.map.clickHandler) {
          _this.map.clickHandler.remove();
          _this.map.clickHandler = null;
        }
      };
      //切换底图服务
      this.modiMapService = function (properties) { //修改地图服务地址
        var settings = {
          mapServiceLayerType: "AarcgisDynamicMapServiceLayer",
          layerUrl: "" //地图服务地址
          ,
          layerName: "" //图层名称
        };
        $.extend(settings, properties);
        var oldLayer = null,
          layerIndex = -1;

        if (!layerIsExist(settings.layerName)) {
          return;
        }
        ;

        removeOldLayer();

        addNewLayer();

        function layerIsExist(layerName) {

          for (var i = 0; i < _this.map.layerIds.length; i++) {
            if (_this.map.layerIds[i] == layerName) {
              layerIndex = i;
              return true;
            }
            ;
          }
          ;
          return false;
        };

        function removeOldLayer() {
          oldLayer = _this.map.getLayer(settings.layerName);
          _this.map.removeLayer(oldLayer);

        };

        function addNewLayer() {
          var newLayer = _this.createLayer(settings.mapServiceLayerType, settings.layerUrl);
          if (newLayer != null) {
            newLayer.mapServiceLayerType = settings.mapServiceLayerType;
            newLayer.opacity = oldLayer.opacity;
            newLayer.visible = oldLayer.visible;
            newLayer.id = oldLayer.id;
            _this.map.addLayer(newLayer, layerIndex);
          }
          ;
        };
      };
      //创建地图服务图层
      this.createLayer = function (mapServiceLayerType, layerUrl, Options) {
        var Layer = null;
        if (!mapServiceLayerType) {
          return;
        }
        ;

        var LayerHandle = _Enum.Code__MapServiceLayerType[mapServiceLayerType];
        if ($.isFunction(LayerHandle)) {
          Layer = new LayerHandle(layerUrl, Options);
        }
        ;

        return Layer;
      };
      //验证矢量图层是否存在
      this.checkExistMSLayer = function (layerName) {
        var layerIndex = _this.getLayerIndex(layerName);
        return layerIndex == -1 ? false : true;
      };
      //定位到某一个点
      this.zoomToPoint = function (properties) {
        var settings = {
          posX: 0 //经度X值，默认0，可选参数
          ,
          posY: 0 //纬度Y值，默认0，可选参数
          ,
          geometry: null //图形地理位置对象
          ,
          layerName: "" //业务图层名称
          ,
          layerKeyFieldName: "" //图层关键字段名称
          ,
          businessCode: "" //业务编码
          ,
          zoomScale: 0 //缩放比例，默认0，可选参数
          ,
          zoomLevel: _this.defaultZoomLevel //缩放级别，默认0，可选参数
          ,
          flashTime: "" //动画时间，默认10000毫秒
          ,
          flashSize: 40 //闪烁图片大小
          ,
          layerIndex: 2, //闪烁图层显示顺序
          offset: null,
          isBusinessLayer: true,
          isShowRippleLayer: true,
          rippleTime: 4500
        };
        $.extend(true, settings, properties);

        settings.layerName = _this.resetLayerName(settings.isBusinessLayer, settings.layerName);

        var businessLayer = _this.getOrCreateLayer({
            layerName: settings.layerName
          }),
          mapPoint = null;

        if (settings.posX > 0 && settings.posY > 0) {

          zoomToPointByXY();
        } else {
          zoomToPositionByLayer();
        }
        ;

        function zoomToPositionByLayer() {
          if (!settings.businessCode) {
            return;
          }
          ;

          var graphics = businessLayer.graphics,
            item = null;


          for (var i = 0; i < graphics.length; i++) {
            item = graphics[i];
            if (item.attributes[settings.layerKeyFieldName] === settings.businessCode) {
              mapPoint = item.geometry;
              mapPoint.guid = settings.businessCode;
              if (settings.isShowRippleLayer) {
                _this.showRippleLayer({
                  data: [{posX: mapPoint.x, posY: mapPoint.y}],
                  layerName: "ripppleLayer",
                  rippleTime: settings.rippleTime
                });
              }
              ;
              flyToPoint(item);
              break;
            }
            ;
          }
          ;

        };

        function zoomToPointByXY() {
          var symbol = null;
          if (settings.posX > 0 && settings.posY > 0) {
            var posX = settings.posX;
            var posY = settings.posY;
            if (settings.dx) {
              posX += settings.dx;
            }
            ;
            if (settings.dy) {
              posY += settings.dy;
            }
            ;
            mapPoint = new Point(posX, posY);
            mapPoint.spatialReference = _this.map.spatialReference;
          } else if (settings.geometry) {
            mapPoint = settings.geometry;
          }
          ;

          flyToPoint();
        };

        function flyToPoint(item) {
          if (settings.zoomScale > 0) {
            _this.map.setScale(settings.zoomScale);
            _this.map.centerAt(mapPoint);
          } else if (settings.zoomLevel) {
            _this.map.centerAndZoom(mapPoint, settings.zoomLevel)
          }
          ;

          if (settings.isShowRippleLayer) {
            _this.removeDivLayer({layerName: settings.ripppleLayer});
            setTimeout(function () {
              _this.showRippleLayer({
                data: [{
                  posX: settings.posX,
                  posY: settings.posY,
                  layerName: "ripppleLayer"
                }],
                rippleTime: settings.rippleTime
              });
            }, 1000)
          }
          ;

          if (item) {
            setTimeout(function () {
              clickLayer(item);
            }, 500);
          }
          ;
        };

        function clickLayer(item) {
          var evt = {
            graphic: item
          };
          if (businessLayer.clickEvt) {
            (businessLayer.clickEvt).off("click");
            businessLayer.clickEvt = null;
          }
          ;
          businessLayer.onClick(evt);
        };


        if ($.isFunction(settings.callback)) {
          settings.callback();
        }
        ;
      };
      this.showRippleLayer = function (properties) {
        var settings = $.extend({
          data: [],
          xField: "posX",
          yField: "posY",
          layerName: 'rippleLayer',
          rippleTime: 6000
        }, properties);


        _this.showDivLayer({
          layerName: settings.layerName,
          data: settings.data,
          xField: settings.xField,
          yField: settings.yField,
          templateFunction: function (graphic) {
            if (!graphic || !graphic.attributes || !graphic.graphicJQ) {
              return;
            }
            ;
            var attr = graphic.attributes;

            var html = '<div class="diffuseLayer">';
            html += circleDiffuse(attr);
            html += '</div>';

            function circleDiffuse(attr) {
              var h = '';
              h += '<div class="circle-diffuse zoomto" >\n' +
                '    <div class="circle-dot"></div>\n' +
                '    <div class="pulse"></div>\n' +
                '    <div class="pulse1"></div>\n' +
                '</div>';
              return h;
            };

            $(html).data("graphic", graphic).appendTo(graphic.graphicJQ);
            // $(".diffuseLayer").unbind("click").bind("click", function (e) {
            //     var _thisJQ = $(this);
            //     var graphic = _thisJQ.data("graphic");
            // });
            // $(".diffuseLayer").unbind("mouseover").bind("mouseover", function (e) {
            //     var _thisJQ = $(this);
            //     _thisJQ.css("cursor", 'pointer');
            // });
            // $(".diffuseLayer").unbind("mouseout").bind("mouseout", function (e) {
            //     var _thisJQ = $(this);
            //     _thisJQ.css("cursor", 'default');
            // });
          }
        });
        if (settings.rippleTime > 0) {
          setTimeout(function () {
            _this.removeDivLayer({layerName: settings.layerName});
          }, settings.rippleTime);
        }
        ;
      };
      //定位到某一个线或面（中心点）
      this.zoomToPolygon = function (geometry, zoomLevel, onCompletedEvent) {
        var mapPoint = this.getPolygonCenter(geometry);
        if (zoomLevel > 0) {
          _this.map.centerAndZoom(mapPoint, zoomLevel);
        } else {
          _this.map.centerAt(mapPoint);
        }
        ;
        if ($.isFunction(onCompletedEvent)) {
          var ExtentChangeEvent = _this.map.on("extent-change", onCompletedEvent);
          _this.map.ExtentChangeEvent = ExtentChangeEvent;
        }
      };
      this.zoomToExtent = function (properties) {
        var settings = {
          polygon: null,
          xPixels: 0,
          yPixels: 0,
          expandFactor: 1
        };
        $.extend(settings, properties);
        var extent = settings.polygon.getExtent();
        var calRea = this.calDxDy(extent, settings.xPixels, settings.yPixels)

        this.map.setExtent(extent.expand(settings.expandFactor).offset(calRea.dx, calRea.dy));
      }
      this.calDxDy = function (extent, xPixels, yPixels) {
        var calRes = {};
        if (!extent) {
          return calRes;
        }
        var iPerHeight = extent.getHeight() / this.map.height;
        var iPerWidth = extent.getWidth() / this.map.width;
        calRes.dx = xPixels * iPerWidth;
        calRes.dy = yPixels * iPerHeight;
        return calRes;
      }
      //设置地图切换到某一个区域

      this.mapChangeExtent = function (newExtent) {
        _this.map.setExtent(newExtent);
      };
      //根据坐标定位到某个区域
      this.zoomToPosition = function (xmin, ymin, xmax, ymax) {
        var newExtent = new Extent(xmin, ymin, xmax, ymax);
        _this.mapChangeExtent(newExtent);
      };
      this.getPolygonCenter = function (geometry) {
        return geometry.getExtent().getCenter();
      };
      //回到地图初始范围
      this.zoomToFullExtent = function () {
        if (_this.defaultZoomToPoint) {
          _this.zoomToPoint({
            posX: _this.defaultZoomToPoint.x,
            posY: _this.defaultZoomToPoint.y,
            zoomLevel: _this.defaultZoomToPoint.defaultZoomLevel
          });
        } else {
          _this.mapChangeExtent(_this.defaultExtent);
        }
        ;
      };
      //设置地图缩放到第几级别
      this.setZoom = function (level) {
        _this.map.setZoom(level);
      };
      //WGS84转百度
      this.wgs84tobd09 = function (lonLat) {
        var wgs84togcj02 = coordtransform.wgs84togcj02(lonLat.x, lonLat.y);
        //国测局坐标转百度经纬度坐标
        var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
        var newGeo = {
          x: gcj02tobd09[0],
          y: gcj02tobd09[1]
        };
        return newGeo;
      };
      //百度转WGS84
      this.bd09towgs84 = function (lonLat) {
        var bd09togcj02 = coordtransform.bd09togcj02(lonLat.lng, lonLat.lat);
        var gcj02towgs84 = coordtransform.gcj02towgs84(bd09togcj02[0], bd09togcj02[1]);
        var newGeo = {
          x: gcj02towgs84[0],
          y: gcj02towgs84[1]
        };
        return newGeo;
      };

      //==========动态2D地图服务==========
      //根据图层编号加载地图服务
      this.addMSLayerByLayerId = function (properties) {
        var settings = {
          isVisible: true //图层是否可见
          ,
          layerName: "" //图层名称
          ,
          childLayerId: "" //子图层编号
          ,
          mapServiceLayerType: _Enum.Code__MapServiceLayerType.DynamicMapService //地图服务类型
          ,
          layerUrl: "" //地图服务地址
          ,
          reorderLayerIndex: "" //排序
          ,
          Opacity: 0.8 //图层透明度
          ,
          showMaxScale: 0,
          showMinScale: 0,
          onClickEvent: function () {
            //图层点击事件
          }
        };
        $.extend(settings, properties);
        var businessLayer = null;

        if (this.checkExistMSLayer(settings.layerName)) {
          businessLayer = _this.map.getLayer(settings.layerName);
        } else {
          businessLayer = this.createLayer(settings.mapServiceLayerType, settings.layerUrl, {
            "id": settings.layerName
          });
          _this.map.addLayer(businessLayer);
        }
        ;
        if (settings.reorderLayerIndex) {
          _this.map.reorderLayer(businessLayer, settings.reorderLayerIndex);
        }
        ;
        businessLayer.setVisibility(settings.isVisible);
        //如果动态子图层不为空，则控制子图层显示
        if (settings.mapServiceLayerType == _Enum.Code__MapServiceLayerType.DynamicMapService) {
          if (settings.childLayerId) {
            //后期再考虑如果有多个的情况
            //        for (var i = 0; i < settings.ChildLayerName.length; i++) {
            //        };
            //var index = GetQueryLayerIndex(settings.ChildLayerName);
            // businessLayer.setVisibleLayers([index]);
            businessLayer.setVisibleLayers([settings.childLayerId]);
          }
          ;
        }
        ;


        if (settings.Opacity) {
          businessLayer.opacity = settings.Opacity;
        } else {
          businessLayer.opacity = 0.8;
        }
        ;
        if (settings.showMaxScale > 0) {
          Layer.maxScale = settings.showMaxScale;
        }
        ;
        if (settings.showMinScale > 0) {
          Layer.minScale = settings.showMinScale;
        }
        ;
        if (businessLayer.updateEndHandle) {
          dojo.disconnect(businessLayer.updateEndHandle);
          businessLayer.updateEndHandle = null;
        }
        ;
        if ($.isFunction(settings.onCompletedEvent)) {
          var updateEndHandle = dojo.connect(businessLayer, "onUpdateEnd", settings.onCompletedEvent);
          businessLayer.updateEndHandle = updateEndHandle;
        }
        ;

        //点击事件
        //如果原来有点击事件的先清空
        if (_this.map.clickHandler) {
          dojo.disconnect(_this.map.clickHandler);
          _this.map.clickHandler = null;
        }
        if ($.isFunction(settings.onClickEvent)) {
          var clickHandler = dojo.connect(_this.map, "onClick", settings.onClickEvent);
          _this.map.clickHandler = clickHandler;
        }
        ;

      };
      this.toggleLayer = function (properties) {
        var settings = {
          layerName: "",
          isVisible: null
        };
        $.extend(settings, properties);
        var layer = _this.map.getLayer(settings.layerName);
        if (layer) {
          if (!settings.isVisible) {
            layer.setVisibility(!layer.visible);
          } else {
            layer.setVisibility(settings.isVisible);
          }
          ;
          //点击事件
          //如果原来有点击事件的先清空
          if (_this.map.clickHandler) {
            _this.map.clickHandler.remove();
            _this.map.clickHandler = null;
          }
        } else if (_this.checkExistDynamicLayer({
            layerName: "Business_" + settings.layerName
          })) {
          var layer = _this.getOrCreateLayer({
            layerName: "Business_" + settings.layerName
          });
          if (!settings.isVisible) {
            layer.setVisibility(!layer.visible);
          } else {
            layer.setVisibility(settings.isVisible);
          }
          ;
        }
      };
      //创建聚类函数
      this.addClusterLayer = function (properties) {
        var settings = {
          data: [],
          distance: 100, // The max number of pixels between points to group points in the same cluster. Default value is 50.
          layerName: "clusters",
          labelColor: "#fff",
          labelOffset: -4,
          showMinScale: 0,
          resolution: this.map.extent.getWidth() / this.map.width,
          singleColor: "#00ffff",
          maxSingles: 300,
          onClickEvent: undefined,
          xField: "longitude",
          yField: "latitude",
          // renderSingleCallback:function (attributes) {
          //     var symbol = mapAPI.getDefaultSymbolByName("Point", {
          //         fillColor: [0, 255, 255],
          //         lineColor: [255, 200, 0, 0],
          //         size: 10
          //     })
          //
          //     if (attr.CO > 0 && attr.CO < 100) {
          //         symbol.color = [0, 0, 255]
          //     } else {
          //         symbol.color = [255, 0, 0]
          //     }
          //     return symbol;
          // } ,
          renderClusterObj: {
            renderType: _Enum.Code__RenderType.ClassBreaksRenderer,
            symbolArray: {
              attrKey: "clusterCount",
              attrValue: [{
                begin: 0,
                end: 2,
                symbol: _this.getDefaultSymbolByName("Point", {
                  fillColor: [255, 200, 0, 200],
                  lineColor: [255, 200, 0],
                  size: 10
                })
              }, {
                begin: 2,
                end: 100,
                symbol: _this.getDefaultSymbolByName("Point", {
                  fillColor: [255, 125, 3, 200],
                  lineColor: [255, 125, 3],
                  size: 25
                })
              }, {
                begin: 100,
                end: 500,
                symbol: _this.getDefaultSymbolByName("Point", {
                  fillColor: [255, 23, 58, 200],
                  lineColor: [255, 23, 58],
                  size: 30
                })
              }, {
                begin: 500,
                end: 1000,
                symbol: _this.getDefaultSymbolByName("Point", {
                  fillColor: [204, 0, 184, 200],
                  lineColor: [204, 0, 184],
                  size: 35
                })
              }, {
                begin: 1000,
                end: 20000,
                symbol: _this.getDefaultSymbolByName("Point", {
                  fillColor: [0, 0, 255, 200],
                  lineColor: [0, 0, 255],
                  size: 40
                })
              }]
            }
          }
        };
        $.extend(settings, properties);

        if (_this.checkExistDynamicLayer({
            layerName: "Business_" + settings.layerName
          })) {
          _this.map.getLayer("Business_" + settings.layerName).show();
        } else {
          clusterLayer = new ClusterLayer(settings);
          clusterLayer.id = "Business_" + settings.layerName;

          var renderer = _this.getRenderer(settings.renderClusterObj)
          clusterLayer.setRenderer(renderer)
          _this.map.addLayer(clusterLayer);
        }
      };

      //移除图层
      //非业务图层，目前包括Draw图层、聚类图层
      this.removeElementLayer = function (properties) {
        var settings = {
          layerName: ""
        };
        $.extend(settings, properties);
        if (_this.checkExistDynamicLayer({
            layerName: settings.layerName
          })) {
          _this.map.removeLayer(arcgis_DynamicElementLayer[settings.layerName]);
          arcgis_DynamicElementLayer[settings.layerName] = null;
        }
        ;
      }
      //==========要素服务==========
      //添加业务图层
      this.resetLayerName = function (isBusinessLayer, layerName) {
        return isBusinessLayer ? "Business_" + layerName : layerName;
      };
      this.businessLayerShow = function (properties) {
        var settings = {
          layerName: "" //业务图层名称layerName
          ,
          layerUrl: "" //地图服务地址
          ,
          geometryType: _Enum.Code__MapLayerTypeCode.Point //图层类型，一般有点图层、线图层和面图层，默认_Enum.Code__MapLayerTypeCode.Point
          ,
          layerIndex: null,
          symbol: null //图层渲染样式
          ,
          graphicList: null //自定义graphics列表
          ,
          itemFields: {
            xField: "x",
            yField: "y",
            attributes: "attributes"
          },
          geometryList: null,
          showLayeAttribution: false //是否显示图层属性
          ,
          showMaxScale: 0 //图层显示最大Scale
          ,
          showMinScale: 0 //图层显示最小Scale
          ,
          displayOnPan: true //图形在移动期间是否显示
          ,
          isBusinessLayer: true //是否为业务图层
          ,
          isRendererByType: false //是否根据特殊渲染器渲染
          ,
          isFromDB: false //是否是从数据库获取点
          ,
          symbolArray: null //渲染器参数
          ,
          where: "" //渲染过滤条件
          ,
          opacity: null,
          bindInfoTemplate: false //绑定infoTemplate
          ,
          infoTemplate: null,
          onCompletedEvent: function () {
            //回调函数，返回图层对象
          },
          isCallback: true,
          onClickEvent: function (evt) { //点击事件
          },
          onMouseOverEvent: function (evt) {
            _this.map.setMapCursor("pointer");
          },
          onMouseOutEvent: function (evt) {
            _this.map.setMapCursor("default");
          }
        };
        $.extend(settings, properties);
        settings.layerName = _this.resetLayerName(settings.isBusinessLayer, settings.layerName);


        if (!_this.checkExistDynamicLayer({
            layerName: settings.layerName
          }) ||
          settings.geometryList ||
          settings.graphicList || settings.where) {

          if (settings.layerUrl) {
            this.rendererLayerByType(settings);
          } else {
            this.addGraphicToLayer(settings);
          }
          ;
        } else {
          var businessLayer = _this.getOrCreateLayer({
            layerName: settings.layerName
          });
          if (settings.geometryType != _Enum.Code__MapLayerTypeCode.Point) {
            //10.1版本featurelayer的Bug处理
            var ramd = Math.random();
            businessLayer.setDefinitionExpression(ramd + "=" + ramd);
          }
          ;
          if (!businessLayer.visible) {
            businessLayer.show();
          }
          ;

          if ($.isFunction(settings.onCompletedEvent)) {
            settings.onCompletedEvent(businessLayer);
          }
          ;
          return;
        }
        ;


        var businessLayer = _this.getOrCreateLayer({
          layerName: settings.layerName
        });
        businessLayer.displayOnPan = settings.displayOnPan;

        if (settings.showMaxScale > 0) {
          businessLayer.maxScale = settings.showMaxScale;
        }
        ;
        if (settings.showMinScale > 0) {
          businessLayer.minScale = settings.showMinScale;
        }
        ;

        if ($.isFunction(settings.onClickEvent)) {
          _this.addBusinessLayerEvt(businessLayer, _Enum.Code__CustomEvent.OnMapClickEvent,
            settings.onClickEvent);
        }
        ;

        if ($.isFunction(settings.onMouseOverEvent)) {
          _this.addBusinessLayerEvt(businessLayer, _Enum.Code__CustomEvent.OnMouseMoveEvent,
            settings.onMouseOverEvent);
        }
        ;

        if ($.isFunction(settings.onMouseOutEvent)) {
          _this.addBusinessLayerEvt(businessLayer, _Enum.Code__CustomEvent.OnMouseOutEvent,
            settings.onMouseOutEvent);
        }
        ;

        if ($.isFunction(settings.onDoubleClickEvt)) {
          _this.addBusinessLayerEvt(businessLayer, _Enum.Code__CustomEvent.OnDoubleClickEvent,
            settings.onDoubleClickEvt);
        }
        ;
        if ($.isFunction(settings.onLoadEvent)) {
          _this.addBusinessLayerEvt(businessLayer, _Enum.Code__CustomEvent.OnLoadEvent,
            settings.onLoadEvent);
        }
        ;
        if ($.isFunction(settings.onCompletedEvent)) {
          _this.addBusinessLayerEvt(businessLayer, _Enum.Code__CustomEvent.OnUpdateEndEvt, settings);
        }
        ;

        return businessLayer;
      };
      this.addBusinessLayerEvt = function (businessLayer, eventName, callback) {
        var eventHandler = businessLayer[eventName + "Evt"];
        if (eventHandler && $.isFunction(eventHandler)) {
          _this.removeBusinessLayerEvt();
        }
        ;
        if ($.isFunction(callback)) {
          businessLayer[eventName + "Evt"] = businessLayer.on(eventName, callback);
        }
        ;
      };
      this.removeBusinessLayerEvt = function (eventHandler) {
        if (eventHandler && $.isFunction(eventHandler)) {
          eventHandler.remove();
          eventHandler = null;
        }
        ;
      };
      //移除业务图层
      this.businessLayerRemove = function (properties) {
        var _this = this;
        var settings = {
          layerName: "",
          isBusinessLayer: true
        };
        $.extend(settings, properties);
        var businessLayer;
        if (settings.keyword) {
          settings.isBusinessLayer = false;
        }
        ;
        if (settings.isBusinessLayer) {
          settings.layerName = "Business_" + settings.layerName;
        }
        if (_this.checkExistDynamicLayer({
            layerName: settings.layerName
          })) {
          businessLayer = _this.getOrCreateLayer({
            layerName: settings.layerName
          });
          _this.map.removeLayer(businessLayer);
        } else if (settings.keyword) {
          var layerIds = _this.map.graphicsLayerIds;
          for (var i = 0; i < layerIds.length; i++) {
            if (layerIds[i].indexOf(settings.keyword) != -1) {
              businessLayer = _this.map.getLayer(layerIds[i]);
              _this.map.removeLayer(businessLayer);
            }
            ;
          }
          ;
        }
      };
      //隐藏关闭业务图层
      this.businessLayerHide = function (properties) {
        //隐藏关闭业务图层
        var settings = {
          layerName: "" //业务图层名称layerName
          ,
          layerNameArray: null //业务图层名称数组
          ,
          isBusinessLayer: true
        };
        $.extend(settings, properties);
        if (!settings.layerNameArray) {
          settings.layerNameArray = [];
        }
        ;
        if (settings.layerName) {
          settings.layerNameArray.push(settings.layerName);
        }
        ;
        if (settings.layerNameArray.length <= 0 &&
          settings.layerName) {
          settings.layerNameArray.push(settings.layerName);
        }
        ;
        var preLayerName = '';
        if (settings.isBusinessLayer) {
          preLayerName = "Business_"
        }
        ;
        if (settings.layerNameArray.length > 0) {
          for (var i = 0; i < settings.layerNameArray.length; i++) {
            if (_this.checkExistDynamicLayer({
                layerName: preLayerName + settings.layerNameArray[i]
              })) {
              var businessLayer = _this.getOrCreateLayer({
                layerName: preLayerName + settings.layerNameArray[i]
              });
              businessLayer.hide();
            }
          }
          ;
        } else {
          var arcgis_DynamicElementLayer = _this.map.graphicsLayerIds;
          for (var i = 0; i < _this.map.graphicsLayerIds.length; i++) {
            var Layername = _this.map.graphicsLayerIds[i];
            if (Layername.substring(0, 8) == "Business") {
              if (_this.checkExistDynamicLayer({
                  layerName: Layername
                })) {
                var businessLayer = this.map.getLayer(Layername);
                businessLayer.hide();
              }
            }
            ;
          }
          ;
        }
        ;
        if ($.isFunction(settings.callback)) {
          settings.callback();
        }
        ;
      };

      this.queryGeometry = function (properties) {
        var settings = {
          where: "",
          layerUrl: "",
          callback: null
        };
        $.extend(settings, properties);
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        if (window.whereRandom) {
          if (settings.where) {
            query.where = settings.where + whereRandom;
          } else {
            query.where = "1=1" + whereRandom;
          }
          ;
        } else {
          if (settings.where) {
            query.where = settings.where;
          } else {
            query.where = "1=1";
          }
          ;
        }
        ;
        if (settings.geometry) {
          query.geometry = settings.geometry
        }
        query.outSpatialReference = _this.map.spatialReference;
        var queryTask = new QueryTask(settings.layerUrl);
        queryTask.execute(query, function (results) {
          if (results && results.features) {
            if ($.isFunction(settings.callback)) {
              settings.callback(results.features);
            }
            ;
          }
        }, function (error) {
          console.log(error);
        });
      };
      this.highlightGeometry = function (properties) {
        var settings = $.extend({layerName: "highlight"}, properties)
        if (!settings.symbol) {
          if (settings.geometryType) {
            switch (settings.geometryType) {
              case 'Point':
                settings.symbol = _this.getDefaultSymbolByName('Point_Highlight', settings.symbolObj)
                break;
              case 'Polyline':
                settings.symbol = _this.getDefaultSymbolByName('Polyline_Highlight', settings.symbolObj)
                break;
              case 'Polygon':
                settings.symbol = _this.getDefaultSymbolByName('Polygon_Highlight', settings.symbolObj)
                break;
            }
          } else {
            return
          }
        }
        _this.businessLayerShow(settings);
      };
      //给要素图层添加过滤条件
      this.setFeatureLayerDefinition = function (properties) {
        var settings = {
          layer: null,
          layerName: null,
          where: "" //过滤条件
        };
        $.extend(settings, properties);
        if (!settings.layerName && !settings.layer) {
          return;
        }
        if (_this.checkExistDynamicLayer({
            layerName: "Business_" + settings.layerName
          })) {
          settings.layer = _this.getOrCreateLayer({
            layerName: "Business_" + settings.layerName
          });
          settings.layer.setDefinitionExpression(settings.where);
        } else if (settings.layer) {
          settings.layer.setDefinitionExpression(settings.where);
        }
      };
      //检查某个图层是否在数组arcgis_DynamicElementLayer中
      this.checkExistDynamicLayer = function (properties) {
        var settings = {
          layerName: "" //图层名称
        };
        $.extend(settings, properties);
        //if (arcgis_DynamicElementLayer[settings.layerName] == undefined && arcgis_DynamicElementLayer[settings.layerName] == null)
        if (!_this.map.getLayer(settings.layerName))
          return false;
        else
          return true;
      };
      //添加GraphicsLayer
      this.getOrCreateLayer = function (properties) {
        var settings = {
          layerName: "" //图层名称
          ,
          addLayer: "" //已创建图层名称
          ,
          showMaxScale: 0,
          showMinScale: 0,
          layerIndex: null
        };
        $.extend(settings, properties);

        if (_this.map.getLayer(settings.layerName) == undefined) {
          if (!settings.addLayer) {
            if (settings.layerType == _Enum.Code__MapLayerTypeCode.RipplyScott) {
              settings.addLayer = new RipplyScottLayer({
                layerName: settings.layerName
              });
            } else {
              settings.addLayer = new GraphicsLayer();
            }
            ;
          }
          ;
          settings.addLayer.id = settings.layerName;

          if (settings.showMaxScale > 0) {
            settings.addLayer.setMaxScale(settings.showMaxScale);
          }
          ;
          if (settings.showMinScale > 0) {
            settings.addLayer.setMinScale(settings.showMinScale);
          }
          ;
          if (settings.layerIndex) {
            _this.map.addLayer(settings.addLayer, settings.layerIndex);
          } else {
            _this.map.addLayer(settings.addLayer);
          }
          ;

        } else {
          settings.addLayer = _this.map.getLayer(settings.layerName);
        }
        ;

        return settings.addLayer;
      };
      //移除某个图层的graphic
      this.removeGraphic = function (properties) {
        var settings = {
          layerName: "" //图层名称
          ,
          isBusinessLayer: true,
          layerNameArray: [] //图层名称数组
          ,
          Graphic: null //图形对象
          ,
          callback: function () { //回调函数
          }
        };
        $.extend(settings, properties);
        settings.layerName = _this.resetLayerName(settings.isBusinessLayer, settings.layerName);
        if (!settings.LayerTypeCodeArray) {
          settings.LayerTypeCodeArray = [];
        }
        ;
        if (settings.layerName) {
          settings.LayerTypeCodeArray.push(settings.layerName);
        }
        ;
        if (settings.LayerTypeCodeArray.length > 0) {
          for (var i = 0; i < settings.LayerTypeCodeArray.length; i++) {
            if (_this.checkExistDynamicLayer({
                layerName: +settings.LayerTypeCodeArray[i]
              })) {
              var businessLayer = _this.getOrCreateLayer({
                layerName: settings.LayerTypeCodeArray[i]
              });
              businessLayer.remove(settings.Graphic);
            } else if (_this.checkExistDynamicLayer({
                layerName: settings.LayerTypeCodeArray[i]
              })) {
              var businessLayer = _this.getOrCreateLayer({
                layerName: settings.LayerTypeCodeArray[i]
              });
              businessLayer.remove(settings.Graphic);
            }
            ;
          }
          ;
        }
        if ($.isFunction(settings.callback)) {
          settings.callback();
        }
        ;
      };
      //以不同方式对图层进行渲染
      this.rendererLayerByType = function (properties) {
        var settings = {
          layerName: "" //图层名称
          ,
          layer: undefined //图层
          ,
          layerUrl: "" //图层服务地址
          ,
          renderType: "" //渲染方式
          ,
          renderParams: "" //渲染参数
          ,
          where: "" //渲染条件
          ,
          symbol: null //符号对象
          ,
          symbolArray: null, //符号对象集合
          infoTemplate: null,
          isBusinessLayer: true
        };
        $.extend(settings, properties);

        // settings.layerName = _this.resetLayerName(settings.isBusinessLayer, settings.layerName);

        var businessLayer = null;
        if (settings.layer) {
          businessLayer = settings.layer;
        } else {
          if (!_this.checkExistDynamicLayer({
              layerName: settings.layerName
            })) {
            var options = {
              //MODE_SNAPSHOT MODE_ONDEMAND MODE_SELECTION
              mode: FeatureLayer.MODE_ONDEMAND,
              infoTemplate: settings.infoTemplate,
              showAttribution: settings.showLayeAttribution,
              outFields: ["*"],
              objectIdField: settings.objectIdField || null
            };

            businessLayer = new FeatureLayer(settings.layerUrl, options);
            businessLayer.spatialReference = _this.getSpatialRefrence();

            _this.getOrCreateLayer({
              layerName: settings.layerName,
              addLayer: businessLayer
            });
          } else {
            businessLayer = _this.getOrCreateLayer({
              layerName: settings.layerName
            });
          }
          ;
        }
        ;

        if (settings.opacity) {
          businessLayer.opacity = settings.opacity;
        }
        ;
        if (!businessLayer.visible) {
          businessLayer.show();
        }
        ;


        if (settings.where) {
          _this.setFeatureLayerDefinition({
            layer: businessLayer,
            where: settings.where
          });
        }
        ;

        var renderer = _this.getRenderer(settings);

        if (renderer) {
          businessLayer.setRenderer(renderer);
          businessLayer.refresh();
        }
        ;

        removeUpdateEvt();

        var lastWhere = "";
        businessLayer.updateEndEvt = _this.map.on("update-end", function (e) {
          if (lastWhere === settings.where) {
            return
          }
          lastWhere = settings.where;
          if (!businessLayer.visible) {
            removeUpdateEvt();
          }
          if (settings.isCallBack && $.isFunction(settings.callback)) {
            settings.callback(businessLayer);
          }
          ;
        });

        function removeUpdateEvt() {
          if (businessLayer.updateEndEvt) {
            businessLayer.updateEndEvt.remove();
            businessLayer.updateEndEvt = null
          }
        };

      };
      this.getRenderer = function (properties) {
        var settings = {};
        $.extend(settings, properties);

        var renderer = null;
        switch (settings.renderType) {
          case _Enum.Code__RenderType.SimpleRenderer:

            if (settings.symbol) {
              renderer = new SimpleRenderer(settings.symbol);
            } else if (settings.image) {
              renderer = new SimpleRenderer(_this.getDefaultSymbolByName('Point_Picture', {
                image: settings.image
              }));
            }

            break;
          case _Enum.Code__RenderType.UniqueValueRenderer:
            var attrKey = settings.symbolArray.attrKey;
            var renderer = new UniqueValueRenderer(null, attrKey);
            for (var i = 0; i < settings.symbolArray.attrValue.length; i++) {
              var item = settings.symbolArray.attrValue[i];
              var symbol = null;
              if (item.symbolUrl) {
                picSymbolUrl = page.webSiteRootUrl + item.symbolUrl;
                symbol = new PictureMarkerSymbol(picSymbolUrl, symbolArray.SymbolWidth, settings.symbolArray.SymbolHeight);
              } else if (item.symbol) {
                symbol = item.symbol;
              }
              ;
              renderer.addValue(item.value, symbol);
            }
            break;
          case _Enum.Code__RenderType.ClassBreaksRenderer:
            var attrKey = settings.symbolArray.attrKey;
            renderer = new ClassBreaksRenderer(null, attrKey);
            for (var i = 0; i < settings.symbolArray.attrValue.length; i++) {
              var item = settings.symbolArray.attrValue[i];
              renderer.addBreak(item.begin, item.end, item.symbol);
            }
            ;
            break;
        }
        ;
        return renderer;
      };
      this.setRenderer = function (properties) {

        var settings = {
          layerName: "",
          layer: null
        };
        $.extend(settings, properties);

        if (!settings.layer) {
          settings.layer = this.getOrCreateLayer({
            layerName: settings.layerName
          });
        }
        if (settings.sizeInfo) {
          var sizeInfo = {
            field: "",
            valueUnit: "meters",
            valueRepresentation: "area"
          };
          $.extend(sizeInfo, settings.sizeInfo);
          settings.layer.renderer.setSizeInfo(sizeInfo);
        }

        if (settings.colorInfo) {
          var colorInfo = {
            field: "",
            minDataValue: 1,
            maxDataValue: 100,
            colors: [
              new Color.toDojoColor("#ff0000"),
              new Color.toDojoColor("#ff4900"),
              new Color.toDojoColor("#ffdf00"),
              new Color.toDojoColor("#39AA00"),
              new Color.toDojoColor("#217100")
            ]
          };
          $.extend(colorInfo, settings.colorInfo);
          settings.layer.renderer.setColorInfo(colorInfo);

        }
      };
      //定位到某一个点位
      this.addPointAndZoomTo = function (properties) {
        var settings = {
          layerName: "",
          onMouseOverEvent: function (evt) {
            if (evt.graphic.geometry.type == "point" &&
              evt.graphic.symbol &&
              evt.graphic.symbol.url) {
              var sys = new PictureMarkerSymbol(evt.graphic.symbol.url, evt.graphic.symbol.width + 4, evt.graphic.symbol.height + 4);
              evt.graphic.setSymbol(sys);
            }
            ;
            this.map.setMapCursor("pointer");
          },
          onMouseOutEvent: function (evt) {
            if (evt.graphic.geometry.type == "point" &&
              evt.graphic.symbol &&
              evt.graphic.symbol.url) {
              var sys = new PictureMarkerSymbol(evt.graphic.symbol.url, evt.graphic.symbol.width - 4, evt.graphic.symbol.height - 4);
              evt.graphic.setSymbol(sys);
            }
            ;
            this.map.setMapCursor("default");
          }
        };
        $.extend(settings, properties);
        settings.Layer = this.map.getLayer("Business_" + settings.layerName);
        if (!settings.Layer) {
          settings.Layer = _this.getOrCreateLayer({
            layerName: "Business_" + settings.layerName
          });
        } else {
          settings.Layer.clear();
          if (!settings.Layer.visible) {
            settings.Layer.show();
          }
          ;
        }
        ;
        if (settings.reorderLayerIndex) {
          this.map.reorderLayer(settings.Layer, settings.reorderLayerIndex);
        }
        ;
        //点击事件
        if ($.isFunction(settings.onClickEvent)) {
          if (settings.Layer.clickHandler) {
            settings.Layer.clickHandler.off("click");
            settings.Layer.clickHandler = null;
          }

          settings.Layer.clickHandler = settings.Layer.on("click", settings.onClickEvent);
        }
        ;
        if (settings.data) {
          var mapPoint = new Point(parseFloat(settings.data[settings.itemFields.xField]), parseFloat(settings.data[settings.itemFields.yField]));
          if (settings.data.image) {
            settings.symbol = new PictureMarkerSymbol(settings.data.image, settings.symbolWidth, settings.symbolHeight);
          } else if (settings.data.symbol) {
            settings.symbol = settings.data.symbol;
          } else {
            settings.symbol = new PictureMarkerSymbol(page.webSiteRootUrl + "web/maps/styles/images/map_marker.png", 36, 36);
          }
          ;

          var attributes;
          if (settings.data[settings.itemFields.attributes]) {
            attributes = settings.data[settings.itemFields.attributes];
          } else {
            attributes = settings.data;
          }
          ;
          var graphic = new Graphic(mapPoint, settings.symbol, attributes);
          settings.Layer.add(graphic);
          var clickScreenPoint = this.map.toScreen(mapPoint);
          var evt = {
            graphic: graphic,
            screenPoint: clickScreenPoint
          };
          if (settings.Layer.clickEvt) {
            settings.Layer.clickEvt.off("pan-end");
            settings.Layer.clickEvt = null;
          }
          ;

          settings.Layer.clickEvt = this.map.on("pan-end", function (e) {
            if (evt) {
              settings.Layer.onClick(evt);
            }
            ;
            evt = null;
          });

          if (settings.ZoomScale > 0) {
            if (this.map.getScale() > settings.zoomScale) {
              this.map.setScale(settings.zoomScale);
              settings.Layer.onClick(evt);
            }
            ;
            this.map.centerAt(mapPoint);
          } else {
            if (settings.zoomLevel) {
              if (this.map.getLevel() < settings.zoomLevel) {
                this.map.setLevel(settings.zoomLevel);
                settings.Layer.onClick(evt);
              }
              ;
              this.map.centerAt(mapPoint);
            }
            ;
          }
          ;
        }
        ;
        if ($.isFunction(settings.onMouseOverEvent)) {
          if (settings.Layer.mouseoverHandler) {
            settings.Layer.mouseoverHandler.off("mouse-over");
            settings.Layer.mouseoverHandler = null;
          }
          settings.Layer.mouseoverHandler = settings.Layer.on("mouse-over", settings.onMouseOverEvent);
        }
        ;
        if ($.isFunction(settings.onMouseOutEvent)) {
          if (settings.Layer.mouseoutHandler) {
            settings.Layer.mouseoutHandler.off("mouse-out");
            settings.Layer.mouseoutHandler = null;
          }

          settings.Layer.mouseoutHandler = settings.Layer.on("mouse-out", settings.onMouseOutEvent);
        }
        ;

        if (settings.isCallback) {
          if ($.isFunction(settings.callback)) {
            settings.callback(settings.Layer);
          }
          ;
        }
        ;
      };
      //添加单个或列表图形到某个图层
      this.addGraphicToLayer = function (properties) {
        var settings = {
          itemFields: {
            xField: "x",
            yField: "y",
            attributes: "attributes"
          },
          graphicList: [] //坐标数组列表
          ,
          geometryList: [] //图形数组列表
          ,
          layerName: "" //图层名称
          ,
          layer: null //图层对象
          ,
          symbol: null //图形对象
          ,
          symbolWidth: 20 //图片宽度
          ,
          symbolHeight: 20 //图片高度
          ,
          isCallback: true //是否有返回值
          ,
          reorderLayerIndex: null //排序
          ,
          opacity: 1,
          callback: function () {
            //回调函数
          }
        };
        $.extend(settings, properties);

        //如果没有图层对象则查找
        if (!settings.Layer) {
          if(settings.layerName){
            settings.Layer=_this.getLayer(settings.layerName)
          }
        }
        if(!settings.Layer){
          settings.Layer = _this.getOrCreateLayer({
            layerName: settings.layerName,
            layerType: settings.layerType,
            showMaxScale: settings.showMaxScale,
            showMinScale: settings.showMinScale
          });
        }
        if (settings.Layer && settings.Layer.graphics.length > 0) {
          settings.Layer.clear();
        }
        ;

        if (!settings.Layer.visible) {
          settings.Layer.show();
        }
        ;
        if (settings.opacity) {
          settings.Layer.setOpacity(settings.opacity);
        }
        ;

        switch (settings.geometryType) {
          case _Enum.Code__MapLayerTypeCode.Point:
            _this.addPoint(settings);
            break;
          case _Enum.Code__MapLayerTypeCode.RipplyScott:
            _this.addRipplyScott(settings);
            break;
          case _Enum.Code__MapLayerTypeCode.Line:
            _this.addPolyline(settings);
            break;
          case _Enum.Code__MapLayerTypeCode.Polygon:
            _this.addPolygon(settings);
            break;
          case _Enum.Code__MapLayerTypeCode.Text:
            _this.addText(settings);
            break;
        }
        ;

        if (settings.isCallback) {
          if ($.isFunction(settings.callback)) {
            settings.callback(settings.Layer);
          }
          ;
        }
        return settings.Layer;
      };
      this.addPoint = function (properties) {
        var settings = $.extend({}, properties);
        if (settings.graphicList && settings.graphicList.length > 0) {
          addGraphicList();
        } else if (settings.geometryList && settings.geometryList.length > 0) {
          addGeometryList();
        }
        ;

        function addGraphicList() {
          settings.graphicList.map(function (item, index) {
            var mapPoint = new Point(item[settings.itemFields.xField],
              item[settings.itemFields.yField],
              _this.getSpatialRefrence());

            var symbol = null;
            if (settings.isHideSymbol) {
              symbol = null;
            } else {
              symbol = settings.symbol || getSymbol(item);
            }
            ;

            var graphic = new Graphic(mapPoint, symbol, item);

            settings.Layer.add(graphic);
          });
        }

        function addGeometryList() {

        }

        function getSymbol(item) {
          var symbol = null;
          if (item.image) {
            symbol = new PictureMarkerSymbol(item.image, settings.symbolWidth, settings.symbolHeight);
          } else if (item.symbol) {
            symbol = item.symbol;
          } else {
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color.toDojoColor([0, 255, 255]), 1),
              new Color.toDojoColor([0, 255, 255]));
          }
          ;
          return symbol;
        };

      };
      this.addRipplyScott = function (properties) {
        var settings = $.extend({}, properties);
        var layer = _this.getOrCreateLayer({
          layerName: settings.layerName,
          layerType: settings.layerType
        });

        if (settings.mapPoint) {
          layer.ripplyScott({
            mapPoint: settings.mapPoint,
            guid: settings.mapPoint.guid,
            scottTime: settings.scottTime
          });
          return;
        }
        ;
        if (settings.graphicList && settings.graphicList.length > 0) {
          settings.graphicList.map(function (item, index) {
            var mapPoint = new Point(item[settings.itemFields.xField],
              item[settings.itemFields.yField],
              _this.getSpatialRefrence());

            layer.ripplyScott({
              mapPoint: mapPoint,
              guid: item.guid,
              scottTime: settings.scottTime
            });
          });
        }
        ;
      };
      this.addPolyline = function (properties) {
        var settings = $.extend({}, properties);

        if (settings.graphicList && settings.graphicList.length > 0) {
          addGraphicList();
        } else if (settings.geometryList && settings.geometryList.length > 0) {
          addGeometryList();
        }
        ;

        function addGraphicList() {
          settings.graphicList.map(function (item, index) {

          });
        };

        function addGeometryList() {

          settings.geometryList.map(function (item, index) {
            var geometry = new Polyline(item.geometry.paths);
            var symbol = null;
            if (settings.isHideSymbol) {
              symbol = null;
            } else {
              symbol = settings.symbol || getSymbol(item);
            }
            ;
            var graphic = new Graphic(geometry, symbol, item.attributes);
            settings.Layer.add(graphic);
          });
        };

        function getSymbol(item) {
          var symbol = null;
          if (item.symbol) {
            symbol = item.symbol;
          } else {
            symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor(item.color || [0, 0, 0]), settings.borderWidth || 5);
            ;
          }
          ;
          return symbol;
        };

      };
      this.addPolygon = function (properties) {
        var settings = $.extend({}, properties);
        if (settings.graphicList && settings.graphicList.length > 0) {
          addGraphicList();
        } else if (settings.geometryList && settings.geometryList.length > 0) {
          addGeometryList();
        }
        ;

        function addGraphicList() {
          settings.graphicList.map(function (item, index) {

          });
        };

        function addGeometryList() {

          settings.geometryList.map(function (item, index) {
            var geometry = new Polygon(item.geometry.rings);
            var graphic = new Graphic(geometry, item.symbol || settings.symbol, item.attributes);
            settings.Layer.add(graphic);
          });
        };
      };
      this.addText = function (properties) {
        var _this = this;
        var settings = $.extend({
          textAttr: {}
        }, properties);

        if (settings.graphicList && settings.graphicList.length > 0) {
          addGraphicList();
        } else if (settings.geometryList && settings.geometryList.length > 0) {
          addGeometryList();
        }
        ;

        function addGraphicList() {
          settings.graphicList.map(function (item, index) {

            var mapPoint = new Point(item[settings.itemFields.xField],
              item[settings.itemFields.yField],
              _this.getSpatialRefrence());

            var symbol = null;
            if (settings.isHideSymbol) {
              symbol = null;
            } else {
              symbol = settings.symbol || getSymbol(item);
            }
            ;

            var graphic = new Graphic(mapPoint, symbol, item);

            settings.Layer.add(graphic);
          });
        };

        function addGeometryList() {

          settings.geometryList.map(function (item, index) {
            var geometry = new Point(item.geometry);
            var symbol = settings.symbol || getSymbol(item[settings.itemFields.attributes]);
            var graphic = new Graphic(geometry, symbol, item.attributes);
            settings.Layer.add(graphic);
          });
        };

        function getSymbol(item) {
          var symbol = _this.getDefaultSymbolByName(_this.Enum.Code__SymbolNames.Point_Text, {
              "text": item[settings.textAttr.textField],
              xoffset: item[settings.textAttr.xoffsetField] || settings.textAttr.xoffset || 0,
              yoffset: item[settings.textAttr.yoffsetField] || settings.textAttr.yoffset || 0,
              angle: item[settings.textAttr.angleField] || settings.textAttr.angle || 0,
              color: item[settings.textAttr.colorField] || settings.textAttr.color || [255, 255, 255],
              font: {
                family: item[settings.textAttr.fontFamilyField] || settings.textAttr.fontFamily || "Microsoft YaHei",
                size: item[settings.textAttr.fontSizeField] || settings.textAttr.fontSize || 10,
                weight: item[settings.textAttr.fontWeightField] || settings.textAttr.fontWeight || "normal"
              }
            }
          );

          return symbol;
        };
      };
      // 清空某个图层
      this.clearGraphicsLayer = function (properties) {
        var settings = {
          layerName: "" //图层名称
        };
        $.extend(settings, properties);
        var clearGLayer = null;

        if (_this.checkExistDynamicLayer({
            layerName: "Business_" + settings.layerName
          })) {
          clearGLayer = _this.map.getLayer("Business_" + settings.layerName);
        } else {
          clearGLayer = _this.map.getLayer(settings.layerName);
        }
        if (clearGLayer) {
          clearGLayer.clear();
        }
        ;
      };
      //添加要素图层Label,3.14+
      this.addFeatureLayerLabel = function (properties) {
        var settings = {
          layerName: "LabelLayer",
          featureLayer: null //featurelayer图层
          ,
          labelName: null //要显示的字段
          ,
          showMaxScale: 0 //图层显示最大Scale
          ,
          showMinScale: 0 //图层显示最小Scale
          ,
          textJosn: {
            type: "esriTS",
            color: [0, 0, 0, 255],
            backgroundColor: [246, 255, 197, 255],
            borderLineColor: null,
            verticalAlignment: "center",
            horizontalAlignment: "left",
            rightToLeft: false,
            angle: 0,
            xoffset: 0,
            yoffset: 0,
            text: "",
            font: {
              family: "黑体",
              size: "14pt",
              style: "normal",
              weight: "bold",
              decoration: "none"
            }
          }
        };
        $.extend(settings, properties);

        if (!settings.featureLayer || !settings.labelName) {
          return;
        }
        ;
        if (!_this.checkExistDynamicLayer({
            layerName: "Business_" + settings.layerName
          })) {
          var labelLayer = new LabelLayer({
            "id": "Business_" + settings.layerName
          });
          var labelSys = new TextSymbol(settings.textJosn);
          var labelRender = new SimpleRenderer(labelSys);
          labelLayer.addFeatureLayer(settings.featureLayer, labelRender, "{" + settings.labelName + "}");
          _this.getOrCreateLayer({
            layerName: "Business_" + settings.layerName,
            addLayer: labelLayer,
            showMinScale: settings.showMaxScale,
            showMinScale: settings.showMinScale
          });
        } else {
          var businessLayer = _this.getOrCreateLayer({
            layerName: "Business_" + settings.layerName,
            addLayer: labelLayer,
            showMinScale: settings.showMaxScale,
            showMinScale: settings.showMinScale
          });
          businessLayer.show();
        }
      };
      this.getSpatialRefrence = function () {
        return _this.map.spatialReference;
      };
      //==========统计图服务==========
      this.showDivLayer = function (properties) {
        var settings = {};
        $.extend(settings, properties);

        _this.addDivLayer(settings, function (e) {
          {
            if (e != undefined && e.layer != undefined) {
              e.layer.visible = true;
              e.layer.layerJQ.show();
            }
            ;
            if ($.isFunction(settings.callback)) {
              settings.callback(e);
            }
            ;
          }
        });
      };
      this.addDivLayer = function (properties, callback) {
        var settings = {
          layerName: "",
          data: null,
          templateFunction: function (graphic) {
            //加载完成后执行
          },
          xField: "x",
          yField: "y",
          minScale: 0,
          maxScale: 0
        };
        $.extend(settings, properties);

        var divLayerJQ = _this.getOrCreateDivLayerJQ(settings);
        if (divLayerJQ.length > 0 && settings.data.length > 0) {
          var entity = null,
            graphicJQ;
          for (var i = 0; i < settings.data.length; i++) {
            entity = settings.data[i];
            var graphic = {
              geometry: _this.getPoint({x: entity[settings.xField], y: entity[settings.yField]}),
              attributes: entity
            };
            graphicJQ = $("<div class=\"divGraphic\" style=\"position: absolute; top: 0px; left: 0px;z-index:0; \"></div>")
              .data("graphic", graphic).appendTo(divLayerJQ);
            graphic.graphicJQ = graphicJQ;
            settings.templateFunction(graphic);
          }
          ;
          if ($.isFunction(callback)) {
            callback({
              layer: divLayerJQ.data("layer")
            });
          }
          ;
        }
        ;
        _this.refreshDivLayers(settings);
      };
      this.getOrCreateDivLayerJQ = function (properties) {
        var settings = {
          layerName: null
        };
        $.extend(settings, properties);

        var divLayerJQ = _this.getDivLayerJQ(settings);
        if (divLayerJQ.length < 1) {
          var divLayersJQ = _this.getOrCreateDivLayersJQ(settings);
          var layer = {
            layerId: settings.layerName,
            visible: false
          };
          divLayerJQ = $("<div id=\"" + _this.mapId + "_divLayers" + "_" + settings.layerName + "\" style=\"position: absolute; top: 0px; left: 0px;\"></div>").data("layer", layer).appendTo(divLayersJQ).hide();
          layer.layerJQ = divLayerJQ;


          var mapTargetMoveHandle = function (obj1, obj2) {
            var isValited = true;
            //要求鼠标在移动对象上时不能移动
            $(obj2).bind("mouseover", function (event) {
              isValited = false;
            });
            $(obj2).bind("mouseout", function (event) {
              isValited = true;
            });
            $(".infowindow").bind("mouseover", function (event) {
              isValited = false;
            });
            $(".infowindow").bind("mouseout", function (event) {
              isValited = true;
            });
            $(obj1).bind("mousedown", function (event) {
              if (isValited) {
                /* 获取需要拖动节点的坐标 */
                // var offset_x = $(this)[0].offsetLeft; //x坐标
                //var offset_y = $(this)[0].offsetTop; //y坐标
                var offset_x = $(obj2)[0].offsetLeft; //x坐标
                var offset_y = $(obj2)[0].offsetTop; //y坐标
                /* 获取当前鼠标的坐标 */
                var mouse_x = event.pageX;
                var mouse_y = event.pageY;

                /* 绑定拖动事件 */
                /* 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素 */
                $(document).bind("mousemove", function (ev) {
                  /* 计算鼠标移动了的位置 */
                  var _x = ev.pageX - mouse_x;
                  var _y = ev.pageY - mouse_y;

                  /* 设置移动后的元素坐标 */
                  var now_x = (offset_x + _x) + "px";
                  var now_y = (offset_y + _y) + "px";
                  /* 改变目标元素的位置 */
                  $(obj2).css({
                    top: now_y,
                    left: now_x
                  });
                });
              }
              ;
            });
            /* 当鼠标左键松开，接触事件绑定 */
            $(document).bind("mouseup", function () {
              $(this).unbind("mousemove");
            });
          };

          mapTargetMoveHandle($("#divArcgisMap_layers"), divLayerJQ);


          _this.removeDivLayerEvt(divLayerJQ);

          divLayerJQ.zoomStartHandle = _this.map.on("zoom-start", function () {
            divLayerJQ.hide();
          });

          divLayerJQ.zoomEndHandle = _this.map.on('zoom-end', function () {
            mapPanAndZoomEvt();
          });

          divLayerJQ.panStartHandle = _this.map.on('pan-start', function () {
            divLayerJQ.hide()
          });

          divLayerJQ.panEndHandle = _this.map.on('pan-end', function () {
            mapPanAndZoomEvt();
          });
        }
        ;

        function mapPanAndZoomEvt() {
          divLayerJQ.css({
            left: "0px",
            top: "0px"
          });

          var mapLevel = _this.map.getLevel(),
            mapScale = _this.map.getScale();

          if (settings.minLevel || settings.maxLevel) {
            showByMapLevel(settings.minLevel, settings.maxLevel, mapLevel);
          } else if (settings.minScale || settings.maxScale) {
            showByMapScale(settings.minScale, settings.maxScale, mapScale);
          } else {
            divLayerJQ.show();
          }
          ;

          _this.refreshDivLayers(settings);

        };

        function showByMapScale(minScale, maxScale, currentScale) {
          if (minScale > 0 && maxScale > 0) {
            if (currentScale >= maxScale && currentScale <= minScale) {
              divLayerJQ.show();
            }
          } else if (maxScale > 0) {
            if (currentScale >= maxScale) {
              divLayerJQ.show();
            }
            ;
          } else if (minScale > 0) {
            if (currentScale <= minScale) {
              divLayerJQ.show();
            }
            ;
          } else {
            divLayerJQ.show();
          }
          ;
        };

        function showByMapLevel(minLevel, maxLevel, currentLevel) {
          if (minLevel > 0 && maxLevel > 0) {
            if (currentLevel >= minLevel && currentLevel <= maxLevel) {
              divLayerJQ.show();
            }
          } else if (minLevel > 0) {
            if (currentLevel >= minLevel) {
              divLayerJQ.show();
            }
            ;
          } else if (maxLevel > 0) {
            if (currentLevel <= maxLevel) {
              divLayerJQ.show();
            }
            ;
          } else {
            divLayerJQ.show();
          }
        };
        return divLayerJQ;
      };
      this.getDivLayerJQ = function (properties) {
        var _this = this;
        var settings = {
          layerName: null
        };
        $.extend(settings, properties);

        var divLayerId = _this.mapId + "_divLayers_" + settings.layerName;
        var divLayerJQ = $("#" + divLayerId);
        var currentLevel = _this.map.getLevel();

        if (settings.minLevel > 0) {
          if (currentLevel < settings.minLevel) {
            divLayerJQ.hide();
          }
        }
        ;
        return divLayerJQ;
      };
      this.getDivLayersJQ = function (properties) {
        var _this = this;
        var settings = {};
        $.extend(settings, properties);

        var divLayersId = _this.mapId + "_divLayers";
        return $("#" + divLayersId);
      };
      this.getOrCreateDivLayersJQ = function (properties) {
        var _this = this;
        var settings = {};
        $.extend(settings, properties);

        var divLayersJQ = _this.getDivLayersJQ(settings);
        if (divLayersJQ.length < 1) {
          var divLayersId = _this.mapId + "_divLayers";
          divLayersJQ = $("<div id=\"" + divLayersId + "\" style=\"position: absolute; top: 0px; left: 0px;z-index:1\"></div>")
            .appendTo("#" + _this.mapId + "_root");
        }
        ;


        return divLayersJQ;
      };
      this.removeDivLayerEvt = function (divLayersJQ) {

        if (!divLayersJQ) {
          return;
        }
        ;
        if (divLayersJQ.zoomStartHandle) {
          divLayersJQ.zoomStartHandle.remove('zoom-start');
          divLayersJQ.zoomStartHandle = null;
        }
        ;
        if (divLayersJQ.zoomEndHandle) {
          divLayersJQ.zoomEndHandle.remove('zoom-end');
          divLayersJQ.zoomEndHandle = null;
        }
        ;
        if (divLayersJQ.panStartHandle) {
          divLayersJQ.panStartHandle.remove('pan-start');
          divLayersJQ.panStartHandle = null;
        }
        ;
        if (divLayersJQ.panEndHandle) {
          divLayersJQ.panEndHandle.remove('pan-end');
          divLayersJQ.panEndHandle = null;
        }
        ;
      };
      this.refreshDivLayers = function (properties) {
        var settings = {};
        $.extend(settings, properties);
        var divLayersJQ = _this.getDivLayersJQ(settings);
        if (divLayersJQ.length > 0) {
          divLayersJQ.each(function () {
            var layer;
            $(">*", this).each(function () {
              layer = $(this).data("layer");
              if (layer) {
                _this.refreshDivLayer(settings);
              }
              ;
            });
          });
        }
        ;
      };
      this.refreshDivLayer = function (properties) {
        var settings = {
          layerName: null
        };
        $.extend(settings, properties);

        var divLayerJQ = _this.getDivLayerJQ(settings);

        if (divLayerJQ.length > 0) {
          var extent = _this.map.extent;

          var divGraphicJQ;
          divLayerJQ.each(function () {
            divGraphicJQ = $(">div.divGraphic", this);
            divGraphicJQ.each(function () {
              var thisJQ = $(this),
                graphic = thisJQ.data("graphic"),
                screenPt = _this.map.toScreen(graphic.geometry),
                x = screenPt.x,
                y = screenPt.y,
                minScreenPt = _this.map.toScreen(new Point(extent.xmin, extent.ymin)),
                maxScreenPt = _this.map.toScreen(new Point(extent.xmax, extent.ymax));

              var left = _this.map.width * (x - minScreenPt.x) / (maxScreenPt.x - minScreenPt.x),
                top = _this.map.height * ((maxScreenPt.y - minScreenPt.y) - (y - minScreenPt.y)) / (maxScreenPt.y - minScreenPt.y);

              if (settings.isDivCenter) {
                left = left - thisJQ.width() / 2;
                top = top - thisJQ.height() / 2;
              }
              ;
              if (settings.offsetX) {
                left = left - settings.offsetX;
              }
              ;
              if (settings.offsetY) {
                top = top - settings.offsetY;
              }
              ;

              thisJQ.css({
                left: left + "px",
                top: top + "px"
              });

              // if (settings.minLevel > 0) {
              //     var currentLevel=_this.map.getLevel();
              //     if (currentLevel < settings.minLevel) {
              //         divLayerJQ.hide();
              //     }
              // }
            });
          });
        }
        ;
      };
      this.removeDivLayer = function (properties) {
        var settings = {};
        $.extend(settings, properties);
        var divLayerJQ = _this.getDivLayerJQ(settings);
        if (divLayerJQ.length > 0) {
          divLayerJQ.remove();
        }
        ;

        _this.removeDivLayerEvt();

      };
      this.removeDivLayers = function (properties) {
        var settings = {};
        $.extend(settings, properties);
        var divLayerJQ = _this.getDivLayersJQ(settings);
        if (divLayerJQ.length > 0) {
          divLayerJQ.remove();
        }
        ;

        _this.removeDivLayerEvt();
      };
      /**************************************************************************
       //弹出窗
       ***************************************************************************/
      //修改弹框大小
      this.mapInfoWindowResize = function (properties) {
        var settings = {
          Width: 0,
          Height: 0
        };
        $.extend(settings, properties);
        if (!settings.Width || settings.Width <= 0) {
          settings.Width = _this.map.infoWindow.width;
        }
        if (!settings.Height || settings.Height <= 0) {
          settings.Height = _this.map.infoWindow.height;
        }
        _this.map.infoWindow.resize(settings.Width + 7, settings.Height + 28 + 9);
      };
      // 显示地图弹框
      this.mapInfoWindowShow = function (properties) {
        var settings = {
          Title: "",
          domNode: null,
          Html: "",
          Width: 0,
          Height: 0,
          evt: null,
          callback: null
        };
        $.extend(settings, properties);

        if (settings.Width > 0 && settings.Height > 0) {
          _this.map.infoWindow.resize(settings.Width, settings.Height + 28 + 9);
        }
        _this.map.graphics.clear(); //移除3.14默认的高亮标注
        _this.map.infoWindow.setTitle(settings.Title);
        if (settings.domNode) {
          _this.map.infoWindow.setContent(settings.domNode);
        } else {
          var cp2 = new dijit.layout.ContentPane({
            title: "MapTip"
          }, dojo.create('div'));
          cp2.set('content', settings.Html);

          _this.map.infoWindow.setContent(cp2.domNode);
        }

        var g;
        if (!settings.evt) {
          return;
        }
        if (settings.evt && settings.evt.declaredClass == "Graphic") {
          g = settings.evt;
        } else if (settings.evt && settings.evt.declaredClass == "Point") {
          _this.map.infoWindow.show(settings.evt);
          return;
        } else if (!settings.evt.graphic) {
          g = settings.evt;
        } else {
          g = settings.evt.graphic;
        }
        ;


        if (!g) {
          return;
        }

        if (g.geometry.type == _Enum.Code__MapGeometryType.Point) {
          if (settings.screenOffset) {
            var pos = _this.map.toScreen(g.geometry);
            pos.x = pos.x + settings.screenOffset.x;
            pos.y = pos.y + settings.screenOffset.y;
            _this.map.infoWindow.show(_this.map.toMap(pos));
          } else {
            _this.map.infoWindow.show(g.geometry);
          }
        } else if (g.geometry.type == _Enum.Code__MapGeometryType.Polygon || g.geometry.type == _Enum.Code__MapGeometryType.Polyline) {
          if (settings.evt.mapPoint) {
            _this.map.infoWindow.show(settings.evt.mapPoint);
          } else {
            _this.map.infoWindow.show(_this.getPolygonCenter(g.geometry));
          }
        } else {
          _this.map.infoWindow.show(settings.evt.screenPoint, _this.map.getInfoWindowAnchor(settings.evt.screenPoint));
        }
        ;
        if ($.isFunction(settings.callback)) {
          settings.callback();
        }
        ;
      };
      //隐藏地图弹框
      this.mapInfoWindowHide = function () {
        _this.map.infoWindow.hide();
      };
      //改变地图容器大小后，地图刷新
      this.mapResize = function () {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }
        ;
        resizeTimer = setTimeout(function () {
          this._this.map.resize();
          this._this.map.reposition();
        }, 500);
      };
      //改变图层的显示顺序
      this.reOrderLayer = function (properties) {
        var settings = {
          layerName: "" //图层名称
          ,
          Layer: null //图层对象
          ,
          reorderLayerIndex: null,//排序
          isBusinessLayer: true
        };
        $.extend(settings, properties);

        //如果没有图层对象则查找
        if (!settings.Layer) {
          var beginStr = ""
          if (settings.isBusinessLayer) {
            beginStr = "Business_"
          }
          settings.Layer = _this.getOrCreateLayer({
            layerName: beginStr + settings.layerName
          });
        }
        ;
        if (settings.reorderLayerIndex > -1) {
          _this.map.reorderLayer(settings.Layer, settings.reorderLayerIndex);
        }
        ;
      };
      this.getLayer = function (layerName) {
        var layerObj = _this.map.getLayer(layerName);
        if (layerObj) {
          return layerObj;
        }
        ;
      };
      this.createGraphic = function (properties) {
        var setting = {
          geometry: null,
          symbol: null,
          attributes: null
        };
        $.extend(setting, properties);
        var g = new esri.Graphic(setting.geometry, setting.symbol, setting.attributes);
        return g;
      };

      //根据图层编号获取矢量图层索引
      this.getLayerIndex = function (mapId) {
        var layerIndex = -1;
        for (var i = 0; i < _this.map.layerIds.length; i++) {
          if (_this.map.layerIds[i] == mapId) {
            layerIndex = i;
            break;
          }
          ;
        }
        ;
        return layerIndex;
      };
      //阻止父级事件冒泡
      this.stopBaseEvent = function (event) {
        if (baseEvent && $.isFunction(baseEvent.stop)) {
          if (event.preventDefault) {
            baseEvent.stop(event);
          }
        }
        ;
      };
      //设置鼠标样式
      this.setMapCursor = function (cursor) {
        var cursorCss = ["help", "default", "pointer", "wait", "progress", "cell", "crosshair", "text", "vertical-text"];
        //cell:粗十字,crosshair:细十字vertical-text:放倒的I
        if (cursorCss.indexOf(cursor) > -1) {
          _this.map.setMapCursor(cursor);
        } else {
          //自定义图标
          _this.map.setMapCursor("url(" + cursor + "),auto");
        }
        ;
      };
      //获取点位坐标工具
      this.getMapPoint = function (properties) {
        var settings = {
          callback: null
        };
        $.extend(settings, properties);
        var toolbars = new Draw(this.map);
        toolbars.activate(Draw["POINT"]);
        dojo.connect(toolbars, "onDrawEnd", function (event) {
          toolbars.deactivate();
          _this.removeMapEvent(_Enum.Code__CustomEvent.OnMouseMoveEvent);
          settings.callback(event);
        });
        _this.addMapEvent(_Enum.Code__CustomEvent.OnMouseMoveEvent, function (event) {
          $(".tooltip").html("经度：" + fw.fwNumber.FWNumberHelper.toString(event.mapPoint.x, "0.00000#") + " , 纬度：" + fw.fwNumber.FWNumberHelper.toString(event.mapPoint.y, "0.00000#")).css("width", 230);
        });
      };
      //QueryTask从已有的Geometry中搜索,并创建图层
      this.taskQueryByGeometry = function (properties) {
        var settings = {
          geometry: null,
          layerName: "",
          layerServicesUrl: "",
          onCompletedEvent: function (evt) {
            //evt返回featureList
          }
        };
        $.extend(settings, properties);
        var businessLayer = null;
        if (!settings.geometry) {
          return;
        }
        ;
        if (settings.layerServicesUrl) {
          businessLayer = new FeatureLayer(settings.layerServicesUrl, {
            mode: FeatureLayer.MODE_ONDEMAND,
            showAttribution: true,
            opacity: 0.8,
            outFields: ["*"]
          });
        } else {
          if (!settings.layerName) {
            return;
          }
          ;
          businessLayer = _this.getOrCreateLayer({
            layerName: "Business_" + settings.layerName
          });
        }
        ;
        if (businessLayer.declaredClass == "FeatureLayer") {
          dojo.connect(businessLayer, "onSelectionComplete", function (features) {
            if ($.isFunction(settings.onCompletedEvent)) {
              settings.onCompletedEvent(features);
            }
            ;
          });
          var selectQuery = new Query();
          selectQuery.geometry = settings.geometry;
          businessLayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW);
        } else {
          var graphics = businessLayer.graphics;
          var bFrist = true;
          var features = [];
          for (var i = 0; i < graphics.length; i++) {
            if (graphics[i].visible && settings.Geometry.contains(graphics[i].geometry)) {
              features.push(graphics[i]);
            }
            ;
          }
          ;
          if ($.isFunction(arcgis_Toolbars.Drawsettings.onCompletedEvent)) {
            settings.onCompletedEvent(features);
          }
          ;
        }
        ;
      };
      //QueryTask查询，不创建图层，返回features对象
      this.taskQueryReturnFeatures = function (properties) {
        var settings = {
          layerUrl: "" //图层服务地址
          ,
          where: "" //查询条件
          ,
          geometry: null //空间查询图形
          ,
          spatialRelationship: Query.SPATIAL_REL_CONTAINS //空间查询类别
          ,
          onCompletedEvent: function () {
            //完成回调事件
          }
        };
        $.extend(settings, properties);

        var queryTask = new QueryTask(settings.layerUrl);
        var query = new Query();
        query.returnGeometry = true;
        query.outSpatialReference = _this.map.spatialReference;
        query.outFields = ["*"];
        if (settings.where) {
          query.where = settings.where;
        } else {
          query.where = "1=1";
        }
        ;
        if (settings.geometry) {
          query.geometry = settings.geometry;
        }
        ;
        if (settings.spatialRelationship) {
          query.spatialRelationship = settings.spatialRelationship;
        }
        ;

        dojo.connect(queryTask, "onComplete", function (featureSet) {
          settings.onCompletedEvent(featureSet);
        });
        dojo.connect(queryTask, "onError", function (err) {
          //alert("函数taskQueryReturnFeatures出错：" + err.details);
        });
        queryTask.execute(query);
      };
      //IdentifyQuery空间查询
      this.taskIdentify = function (properties) {
        var settings = {
          geometry: null //空间查询对象
          ,
          layerUrl: "" //图层服务地址
          ,
          layerIds: "" //查询子图层编号
          ,
          tolerance: 1 //允许像素容差
          ,
          paramOption: "visible",
          onCompletedEvent: function () {
            //查询完成回调函数
          }
        };
        $.extend(settings, properties);

        var identifyTask = new IdentifyTask(settings.layerUrl);
        var params = new IdentifyParameters();
        params.tolerance = settings.tolerance;

        params.returnGeometry = true;
        if (settings.layerIds) {
          if (settings.layerIds && settings.layerIds.length > 0) {
            params.layerIds = settings.layerIds;
          } else {
            params.layerIds = [settings.layerIds];
          }
          ;
        }
        ;
        switch (settings.paramOption) {
          case "all":
            params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            break;
          case "visible":
            params.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE;
            break;
        }
        ;

        params.width = _this.map.width;
        params.height = _this.map.height;
        params.mapExtent = _this.map.extent;
        params.geometry = settings.geometry;
        identifyTask.execute(params, function (idResults) {
          settings.onCompletedEvent(idResults);
        }, function (err) {
          console.log(err)
        });

      };
      //FindTask属性查询
      this.taskFind = function (properties) {
        var settings = {
          layerUrl: "" //图层服务地址
          ,
          layerIds: "" //查询子图层编号
          ,
          searchFields: "" //查询属性列名
          ,
          searchText: "" //查询关键字
          ,
          onCompletedEvent: function () {
            //完成回调事件
          }
        };
        $.extend(settings, properties);

        FindTask = new FindTask(settings.layerUrl);
        findParams = new FindParameters();
        findParams.returnGeometry = true;
        if (settings.layerIds) {
          findParams.layerIds = [settings.layerIds];
        }
        findParams.searchFields = [settings.searchFields];
        findParams.searchText = settings.searchText;
        FindTask.execute(findParams, function (idResults) {
          settings.onCompletedEvent(idResults);
        });
      };
      //获取图层上所有图像信息（属性、图形）
      this.getLayerFields = function (properties) {
        var settings = {
          MapServicesUrl: "",
          callback: function (e) {

          }
        };
        $.extend(settings, properties);
        var queryTask = new QueryTask(settings.MapServicesUrl);
        var query = new Query();
        query.returnGeometry = true;
        query.where = '1=1';
        query.outFields = ["*"];
        // query.outSpatialReference = _this.map.spatialReference;
        dojo.connect(queryTask, "onComplete", function (featureSet) {

          var oRes = {
            fieldAliases: featureSet.fieldAliases,
            fields: featureSet.fields,
            features: featureSet.features,
            geometryType: featureSet.geometryType
          };
          if ($.isFunction(settings.callback)) {
            settings.callback(oRes);
          }
        });

        dojo.connect(queryTask, "onError", function (err) {
          if ($.isFunction(settings.callback)) {
            settings.callback(null);
          }
        });
        queryTask.execute(query);
      };
      //生成缓冲区
      this.geometryBuffer = function (properties) {
        var settings = {
          geometry: [] //几何图形的经纬度值
          ,
          wkid: 102100 //生成缓冲区的坐标系代码 102100
          ,
          spatialReference: null // 坐标系空间参考
          ,
          distances: [1] //缓冲区距离
          ,
          unit: GeometryService.UNIT_KILOMETER //缓冲区单位
          ,
          symbol: "" //样式
          ,
          callback: function () {
            //加载完成后触发
          },
          reorderIndex: 0,
          isBuffer: false //true以缓冲显示范围
          ,
          geodesic: true //false为圆
          ,
          layerName: "bufferLayer"
        };
        $.extend(settings, properties);

        var bufferLayer = _this.getOrCreateLayer({
          layerName: settings.layerName,
          isBusinessLayer: false
        });

        bufferLayer.clear();
        bufferLayer.show();

        var params = new BufferParameters();
        params.distances = settings.distances;
        if (settings.spatialReference) {
          params.bufferSpatialReference = settings.spatialReference;
        } else {
          params.bufferSpatialReference = new SpatialReference({
            wkid: settings.wkid
          });
        }
        params.outSpatialReference = _this.map.spatialReference;
        params.unit = settings.unit;
        var symbol = "";
        if (!settings.symbol) {
          symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color.toDojoColor([55, 142, 214]), 1), new Color.toDojoColor([55, 142, 214, 0.2]));
        } else {
          symbol = settings.symbol;
        }
        ;

        if (settings.geometryType == _Enum.Code__MapGeometryType.Polygon) {
          var outSR = new SpatialReference({
            wkid: settings.wkid
          });
          _this.geometryService.project(settings.geometry, outSR, function (outgeometry) {
            _this.geometryService.simplify(outgeometry, function (simplifiedGeometries) {
              params.geometries = settings.geometry
              _this.geometryService.buffer(params, showBuffer, showErr);
            }, showErr);
          }, showErr);
        } else if (settings.geometryType == _Enum.Code__MapGeometryType.Polyline) {
          params.geometries = settings.geometry;
          _this.geometryService.buffer(params, showBuffer, showErr);
        } else if (settings.geometryType == _Enum.Code__MapGeometryType.Point) {
          if (settings.isBuffer) {
            params.geometries = settings.geometry; //[settings.geometry];
            params.unionResults = true;
            _this.geometryService.buffer(params, showBuffer, showErr);
          } else {
            var settings = {
              radius: settings.distances * 1000 //圆的半径，单位为米
              ,
              layerName: settings.layerName //图层名称
              ,
              symbol: symbol,
              geometry: settings.geometry,
              geodesic: settings.geodesic,
              callback: settings.callback,
              layer: bufferLayer
            };
            this.drawCircle(settings);
          }
          ;
        }
        ;
        _this.map.reorderLayer(bufferLayer, settings.reorderIndex);

        function showBuffer(evt) {
          if (!evt || evt.length < 1) {
            return
          }
          for (var i = evt.length - 1; i >= 0; i--) {
            for (var z = 0; z < evt[i].rings.length; z++) {
              var polygon = new Polygon();
              polygon.addRing(evt[i].rings[z]);
              var polygonGraphic = new Graphic(polygon, symbol);
              bufferLayer.add(polygonGraphic);
              if ($.isFunction(settings.callback)) {
                settings.callback(polygon);
              }
              ;
            }
            ;
          }
          ;

          addLabel_div(evt[0].rings[0][0])
        };

        function showErr(err) {
          console.log(err.message);
        };

        function addLabel_div(pt) {
          _this.removeDivLayer({layerName: "distanceTextLabelLayer_div"});

          _this.showDivLayer({
            layerName: "distanceTextLabelLayer_div",
            data: [{x: pt[0], y: pt[1], distance: settings.distances[0]}],
            xField: "x",
            yField: "y",
            templateFunction: function (graphic) {
              if (!graphic || !graphic.attributes || !graphic.graphicJQ) {
                return;
              }
              ;
              var attr = graphic.attributes;

              var html = '<div style="background-color:#ff0000;color:#fff;border-radius:3px;padding: 0 5px;margin-left: -18px;">' + (attr.distance) + 'km</div>';

              $(html).data("graphic", graphic).appendTo(graphic.graphicJQ);
            }
          });
        };
      };
      /*************************************************************************
       //GP服务
       **************************************************************************/
      //插值服务
      this.idwGPServer = function (properties) {
        var settings = {
          data: null,
          dataField: "dataList",
          xField: "x",
          yField: "y",
          valueField: "monitorValue",
          modelField: "Id3",
          serverUrl: null,
          params: {
            input: "point",
            output: "resultLayer"
          },
          callback: function () {
          }
        };
        $.extend(settings, properties);
        var layersettingsList = settings.data;
        if (layersettingsList && layersettingsList.length > 0) {
          var layersettings, entityList, entity, point, graphic, model, features;
          var callBackCount = 0;
          for (var i = 0; i < layersettingsList.length; i++) {
            layersettings = layersettingsList[i];
            entityList = layersettings[settings.dataField];
            if (entityList.length > 0) {
              features = [];
              for (var j = 0; j < entityList.length; j++) {
                entity = entityList[j];
                point = new Point(entity[settings.xField], entity[settings.yField]);
                model = {};
                model[settings.modelField] = entity[settings.valueField];
                graphic = new Graphic(point, null, model);
                features.push(graphic);
              }
              ;
              var ServerHelper = {
                index: i,
                features: features,
                start: function () {
                  var serverHelper = this;
                  var featureset = new FeatureSet();
                  featureset.features = serverHelper.features;
                  featureset.spatialReference = _this.map.spatialReference;
                  var gp = new Geoprocessor(settings.serverUrl);
                  var param = {};
                  param[settings.params.input] = featureset;
                  var dataFile = new DataFile({
                    url: "D:\\airIdw2-1.lyr"
                  }); //D:\\airIdw6-1.lyr
                  param["idwCSS"] = dataFile;
                  gp.submitJob(param, function (jobinfo) {
                    var imgParam = new ImageParameters();
                    imgParam.format = "png32";
                    imgParam.transparent = true;
                    imgParam.layerIds = [0];
                    imgParam.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                    imgParam.imageSpatialReference = _this.map.spatialReference;
                    gp.getResultImageLayer(jobinfo.jobId, settings.params.output, imgParam, function (gpLayer, f, g) {
                      layersettingsList[serverHelper.index].layer = gpLayer;
                      callBackCount++;
                    }, function (e) {
                      debugger
                    });

                  }, function (suc, g, h) {
                    //callBackCount++;
                  }, function (err, j, k) {
                    console.log(err);
                    callBackCount++;
                  });
                }
              };
              ServerHelper.start();
            } else {
              callBackCount++;
            }
            ;
          }
          ;
          var setIntervalFunction = setInterval(function () {
            if (callBackCount == settings.data.length) {
              clearInterval(setIntervalFunction);
              if ($.isFunction(settings.progress)) {
                settings.progress(layersettingsList, callBackCount);
              }
              ;
              if ($.isFunction(settings.callback)) {
                settings.callback(layersettingsList);
              }
              ;
            } else {
              if ($.isFunction(settings.progress)) {
                settings.progress(layersettingsList, callBackCount);
              }
              ;
            }
            ;
          }, 1000);
        } else {
          if ($.isFunction(settings.callback)) {
            settings.callback(layersettingsList);
          }
          ;
        }
        ;
      };
      /*************************************************************************
       //绘图
       **************************************************************************/
      //画图工具
      this.DrawTool = {
        _drawToolbar: null,
        layerName: 'DrawLayer',
        labelName: 'labelText',
        init:

          function (properties) {
            var settings = {
              mapDrawToolCode: _Enum.Code__MapDrawToolCode.Circle,
              onCompletedEvent: function (evt) {
              },
              isDrag: false,
              onDragEndEvent: function (evt) {
                _this.DrawTool.clear();
                _this.drawAddToMap(evt.graphic.geometry);
              }
            };
            $.extend(settings, properties);

            if (!this._drawToolbar) {
              _this.DrawTool._drawToolbar = new Draw(_this.map);
              _this.DrawTool._drawToolbar.on("draw-end", _this.DrawTool.drawEndEvent);
            }
            ;

            var drawLayer = _this.getOrCreateLayer({
              layerName: _this.DrawTool.layerName,
              layerIndex: 0
            });

            _this.DrawTool._drawToolbar.activate(Draw[settings.mapDrawToolCode]);

            _this.DrawTool._drawToolbar.drawsettings = settings;

            _this.DrawTool.addEvt(settings, drawLayer);
          }

        ,
        addEvt: function (settings, drawLayer) {
          clickEvt();

          if (settings.isDrag) {
            mouseUpClick();

            mouseDownClick();
          }
          ;

          function clickEvt() {
            if ($.isFunction(settings.onClickEvent)) {
              if (drawLayer.clickHandler) {
                drawLayer.clickHandler.off("click");
                drawLayer.clickHandler = null;
              }
              drawLayer.clickHandler = drawLayer.on("click", function (evt) {
                settings.onClickEvent(evt);
              });

            }
            ;
          };

          function mouseUpClick() {
            if (drawLayer.graphicsOnMouseUp != null) {
              drawLayer.graphicsOnMouseUp.off('mouse-up');
              drawLayer.graphicsOnMouseUp = null;
            }
            drawLayer.graphicsOnMouseUp = drawLayer.on("mouse-up", graphicsOnMouseUp);

            function graphicsOnMouseUp(evt) {
              if (drawLayer.mouseDragEvent != null) {
                drawLayer.mouseDragEvent.off('mouse-drag');
                _this.map.enableMapNavigation();
                var moveLoc = evt.mapPoint;
                moveLoc.setSpatialReference(_this.map.spatialReference);
                if (evt.graphic.geometry.type == "point") {
                  evt.graphic.setGeometry(moveLoc);
                } else if (evt.graphic.geometry.type == "polyline") {
                  var temp = [];
                  for (var i = 0; i < pointsDis.length; i++) {
                    temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                  }
                  var geometry = new Polyline();
                  geometry.paths = [temp];
                  evt.graphic.setGeometry(geometry);
                } else if (evt.graphic.geometry.type == "polygon") {
                  var temp = [];
                  for (var i = 0; i < pointsDis.length; i++) {
                    temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                  }
                  var geometry = new Polygon();
                  geometry.rings = [temp];
                  evt.graphic.setGeometry(geometry);
                }
                ;
                //结束时返回对象
                settings.onDragEndEvent(evt);
              }
            }
          };

          function mouseDownClick() {
            if (drawLayer.graphicsOnMouseDown != null) {
              drawLayer.graphicsOnMouseDown.off("mouse-down");
              drawLayer.graphicsOnMouseDown = null;
            }
            drawLayer.graphicsOnMouseDown = drawLayer.on('mouse-down', graphicsOnMouseDown);

            if (drawLayer.mouseDragEvent != null) {
              drawLayer.mouseDragEvent.off('mouse-drag');
              drawLayer.mouseDragEvent = null;
            }

            function graphicsOnMouseDown(evt) {
              var oldLoc = null;
              var paraLoc = null;
              _this.map.disableMapNavigation(); //禁止地图拖动
              if (drawLayer.mouseDragEvent != null) {
                drawLayer.mouseDragEvent.off('mouse-drag');
              }
              oldLoc = evt.mapPoint;
              paraLoc = evt.mapPoint;
              if (evt.graphic.geometry.type == "polyline") {
                var temp = evt.graphic.geometry.paths[0];
                pointsDis = [];
                for (var i = 0; i < temp.length; i++) {
                  pointsDis.push([temp[i][0] - oldLoc.x, temp[i][1] - oldLoc.y]);
                }
              } else if (evt.graphic.geometry.type == "polygon") {
                var temp = evt.graphic.geometry.rings[0];
                pointsDis = [];
                for (var i = 0; i < temp.length; i++) {
                  pointsDis.push([temp[i][0] - oldLoc.x, temp[i][1] - oldLoc.y]);
                }
              }
              ;
              drawLayer.mouseDragEvent = drawLayer.on("mouse-drag", graphicsOnMouseDrag);

              function graphicsOnMouseDrag(evt) {
                var pointsDis = [];
                if (drawLayer.mouseDragEvent != null) {
                  var moveLoc = evt.mapPoint;
                  // var geoPt = esri.geometry.webMercatorToGeographic(evt.mapPoint);
                  moveLoc.setSpatialReference(_this.map.spatialReference);
                  if (evt.graphic.geometry.type == "point") {
                    evt.graphic.setGeometry(moveLoc);
                  } else if (evt.graphic.geometry.type == "polyline") {
                    var temp = [];
                    for (var i = 0; i < pointsDis.length; i++) {
                      temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                    }
                    var geometry = new Polyline();
                    geometry.paths = [temp];
                    evt.graphic.setGeometry(geometry);
                  } else if (evt.graphic.geometry.type == "polygon") {
                    var temp = [];
                    for (var i = 0; i < pointsDis.length; i++) {
                      temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                    }
                    var geometry = new Polygon();
                    geometry.rings = [temp];
                    evt.graphic.setGeometry(geometry);
                  }
                  ;
                }
              };
            };

          };


        }
        ,
        getSymbol: function (geometryType) {
          var symbol = null;
          switch (geometryType) {
            case "point":
              symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color.toDojoColor([255, 0, 0]), 1), new Color.toDojoColor([255, 255, 0, 200]));
              break;
            case "polyline":
              symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color.toDojoColor([255, 0, 0]), 2);
              break;
            case "polygon":
              symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color.toDojoColor([255, 0, 0]), 2), new Color.toDojoColor([255, 255, 255, 50]));
              break;
            case "extent":
              symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                  new Color.toDojoColor([255, 0, 0]), 2), new Color.toDojoColor([255, 255, 0, 50]));
              break;
            case "multipoint":
              symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color.toDojoColor([0, 0, 0]), 1), new Color.toDojoColor([255, 255, 0, 200]));
              break;
          }
          ;
          return symbol
        }
        ,
        drawEndEvent: function (g) {
          var geometry = g.geometry;
          if (_this.DrawTool._drawToolbar != null) {
            _this.DrawTool._drawToolbar.deactivate();
          }
          ;
          if (!_this.DrawTool._drawToolbar.drawsettings) {
            return;
          }
          ;
          var settings = _this.DrawTool._drawToolbar.drawsettings;

          var graphic = new Graphic(geometry, _this.DrawTool.getSymbol(geometry.type));

          var drawLayer = _this.getOrCreateLayer({
            layerName: _this.DrawTool.layerName
          });
          drawLayer.add(graphic);

          if (settings.isCalculate) {
            switch (geometry.type) {
              case "point":
                _this.DrawTool.calPoint(settings, geometry, drawLayer);
                break;
              case "polyline":
                _this.DrawTool.calDistance(settings, geometry, drawLayer);
                break;
              case "polygon":
                _this.DrawTool.calArea(settings, geometry, drawLayer);
                break;
            }
            ;
          }

          if ($.isFunction(settings.onCompletedEvent)) {
            var data = {};
            data.ResultText = [];
            data.geometry = geometry;

            switch (geometry.type) {
              case "polyline":
                for (var i = 0; i < geometry.paths[0].length; i++) {
                  var x = pM.precision(geometry.paths[0][i][0], 6);
                  var y = pM.precision(geometry.paths[0][i][1], 6);
                  data.ResultText.push(x + "," + y);
                }
                break;
              case "polygon":
                for (var i = 0; i < geometry.rings[0].length; i++) {
                  var x = pM.precision(geometry.rings[0][i][0], 6);
                  var y = pM.precision(geometry.rings[0][i][1], 6);
                  data.ResultText.push(x + "," + y);
                }
                break;
            }
            ;

            settings.onCompletedEvent(data);
          }
          ;

        }
        ,
        calPoint: function (settings, geometry, drawLayer) {
          if ($.isFunction(settings.onCompletedEvent)) {
            if (settings.showText) {
              var text = "<div>经度：<span class='map-draw-tool-label-caltext'>" + geometry.x.toFixed(6) + "</span></div>";
              text += "<div>纬度：<span class='map-draw-tool-label-caltext'>" + geometry.y.toFixed(6) + "</span></div>";

              _this.DrawTool.showTextDiv({
                geometry: geometry,
                text: text
              });
            }
            settings.onCompletedEvent(geometry);
          }
        }
        ,
        calDistance: function (settings, geometry, drawLayer) {
          _this.Calculate.calcGeometry({
            geometry: geometry,
            onCompletedEvent: function (result) {
              if (settings.showText) {
                result.resultText = "总长：<span class='map-draw-tool-label-caltext'>" + pM.precision(result.length, 3) + "</span>" + _Enum.Code_Unit.Perimeter;

                var mapPoint = result.geometry.getPoint(0, result.geometry.paths[0].length - 1);
                mapPoint.guid = geometry.guid;
                _this.DrawTool.showTextDiv({
                  geometry: mapPoint,
                  text: result.resultText
                });

              }
              ;
              settings.onCompletedEvent(geometry);
            }
          });
        }
        ,
        calArea: function (settings, geometry, drawLayer) {
          _this.Calculate.calcGeometry({
            geometry: geometry,
            onCompletedEvent: function (result) {
              if (settings.showText) {
                result.resultText = "<div>周长：<span class='map-draw-tool-label-caltext'>" + pM.precision(result.length, 3) + "</span>" + _Enum.Code_Unit.Perimeter + "</div>";
                result.resultText += "<div>面积：<span class='map-draw-tool-label-caltext'>" + pM.number(result.area * AREA_CONVERTV_ALVUE) + "</span>" + _Enum.Code_Unit.Area + "</div>";

                var mapPoint = geometry.getCentroid();
                mapPoint.guid = geometry.guid;
                _this.DrawTool.showTextDiv({
                  geometry: mapPoint,
                  text: result.resultText
                });
              }
              settings.onCompletedEvent(geometry);
            }
          });
        }
        ,
        deactivate: function () {
          if (_this.DrawTool._drawToolbar != null) {
            _this.DrawTool._drawToolbar.deactivate();
          }
          _this.map.showZoomSlider();
        }
        ,
        clear: function () {
          var drawLayer = _this.getOrCreateLayer({
            layerName: _this.DrawTool.layerName
          });
          drawLayer.clear();

          _this.removeDivLayer({
            layerName: _this.DrawTool.labelName
          });
        }
        ,
        showTextDiv: function (properties) {
          var settings = {};
          $.extend(settings, properties);

          var geometry = settings.geometry;

          if (!settings.geometry || settings.geometry.type !== 'point') {
            return
          }
          ;

          _this.showDivLayer({
            layerName: _this.DrawTool.labelName,
            data: [{
              x: geometry.x,
              y: geometry.y,
              guid: geometry.guid,
              text: settings.text
            }],
            templateFunction: function (graphic) {
              if (!graphic || !graphic.attributes || !graphic.graphicJQ) {
                return;
              }
              ;

              var html = '';
              html += '<div class="map-draw-tool-label">';
              if (graphic.attributes.text) {
                html += graphic.attributes.text;
              }
              ;
              html += '</div>';
              html += '<div class="map-draw-tool-label-close" guid="' + graphic.attributes.guid + '"><i class="iconfont icon-close"></i></div>'
              $(html).appendTo(graphic.graphicJQ);

              $(".map-draw-tool-label-close").unbind("click").bind("click", function (e) {
                var that = this,
                  guid = that.getAttribute("guid");
                $('[guid=' + guid + ']').parent().remove();
                var drawLayer = _this.getOrCreateLayer({
                  layerName: _this.DrawTool.layerName
                });
                if (drawLayer && drawLayer.graphics && drawLayer.graphics.length > 0) {
                  drawLayer.graphics.map(function (ele, index) {
                    if (ele.geometry.guid === guid) {
                      drawLayer.remove(ele);
                      return;
                    }
                    ;
                  })
                }
                ;
              });
            },
            xField: "x",
            yField: "y",
            idField: 'guid',
            offsetX: settings.offsetX || -10,
            offsetY: settings.offsetY || 10,
          });

        }
      };
      //画圆
      this.drawCircle = function (properties) {

        var settings = {
          radius: 1000, //圆的半径，单位为米
          layerName: "circles", //图层名称
          layer: null,
          symbol: null, //圆的样式
          geometry: null,
          geodesic: false,
          callback: null,
          isShowLabel_div: true,
          isShowLabel: false
        };
        $.extend(settings, properties);
        if (!settings.layer) {
          settings.layer = _this.getOrCreateLayer({
            layerName: settings.layerName
          });
          settings.layer.clear();
          settings.layer.show();
        }
        if (!settings.symbol) {
          settings.symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color.toDojoColor([255, 0, 0]), 2), new Color.toDojoColor([255, 0, 0, 0.25]));
        }
        ;

        var circle = new Circle({
          center: settings.geometry,
          geodesic: settings.geodesic, //当geodesic值设置为false时，结果是圆
          radius: settings.radius
        });
        var pt = circle.rings[0][0];
        var graphic = new Graphic(circle, settings.symbol);
        settings.layer.add(graphic);

        if (settings.isShowLabel_div) {
          addLabel_div(circle);
        } else if (settings.isShowLabel) {
          addLabel(circle);
        }
        ;

        if ($.isFunction(settings.callback)) {
          settings.callback(circle);
        }
        ;

        function addLabel(circle) {
          var geometry = _this.getPoint({x: pt[0], y: pt[1]});
          var textSymbol = _this.getDefaultSymbolByName(_Enum.Code__SymbolNames.Point_Text, {
            text: settings.radius / 1000 + "千米"
          });
          var graphic = new Graphic(geometry, textSymbol);
          settings.layer.add(graphic);
        };

        function addLabel_div(circle) {
          _this.removeDivLayer({layerName: "radiusTextLabelLayer_div"});

          _this.showDivLayer({
            layerName: "radiusTextLabelLayer_div",
            data: [{x: pt[0], y: pt[1], radius: settings.radius}],
            xField: "x",
            yField: "y",
            templateFunction: function (graphic) {
              if (!graphic || !graphic.attributes || !graphic.graphicJQ) {
                return;
              }
              ;
              var attr = graphic.attributes;

              var html = '<div style="background-color:#ff0000;color:#fff;border-radius:3px;padding: 0 5px;margin-left: -18px;">' + (attr.radius / 1000) + 'km</div>';

              $(html).data("graphic", graphic).appendTo(graphic.graphicJQ);
            }
          });
        };
      };
      //热力图
      this.addHeatMap = function (properties) {
        var setting = {
          layerUrl: "",
          layerName: "heatMap",
          maxPixelIntensity: 500,
          minPixelIntensity: 0,
          blurRadius: 10,
          showMinScale: 0,
          showMaxScale: 0,
          colorStops: [{ratio: 0, color: "rgba(180,216,152, 0)"},
            {ratio: 0.2, color: "rgba(193,217,128, 0.5)"},
            {ratio: 0.4, color: "rgba(217,225,102, 0.8)"},
            {ratio: 0.5, color: "rgba(246,215,65, 0.8)"},
            {ratio: 0.6, color: "rgba(249,193,88, 0.8)"},
            {ratio: 0.7, color: "rgba(244,164,82, 1)"},
            {ratio: 0.8, color: "rgba(240,132,55, 1)"},
            {ratio: 1, color: "rgba(234,85,50, 1)"}],
          reorderLayerIndex: 99,
          isBusinessLayer: true
        };
        $.extend(setting, properties);

        var Layerbegin = "Business_";
        if (!setting.isBusinessLayer) {
          Layerbegin = "";
        }
        ;

        var businessLayer = _this.map.getLayer(Layerbegin + setting.layerName);
        if (businessLayer) {
          businessLayer.show();
          if ($.isFunction(setting.onCompletedEvent)) {
            setting.onCompletedEvent(businessLayer);
          }
          return;
        }
        ;

        var heatmapFeatureLayerOptions = {
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND
        };
        var heatmapFeatureLayer = null;
        if (setting.layerUrl) {
          heatmapFeatureLayer = new esri.layers.FeatureLayer(setting.layerUrl, heatmapFeatureLayerOptions);
        } else {
          var layerDefinition = {
            "geometryType": "esriGeometryPoint",
            "fields": [{
              "name": "ID",
              "type": "esriFieldTypeInteger",
              "alias": "ID"
            }
            ]
          };

          var featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: null
          };
          heatmapFeatureLayer = new esri.layers.FeatureLayer(featureCollection, heatmapFeatureLayerOptions);
        }
        ;
        businessLayer = _this.getOrCreateLayer({
          layerName: Layerbegin + setting.layerName
          , addLayer: heatmapFeatureLayer
          , layerIndex: setting.reorderLayerIndex
        });
        if (setting.showMaxScale > 0) {
          businessLayer.maxScale = setting.showMaxScale;
        }
        ;
        if (setting.showMinScale > 0) {
          businessLayer.minScale = setting.showMinScale;
        }
        ;
        if (setting.opacity) {
          businessLayer.opacity = setting.opacity;
        }
        ;

        var heatmapRenderer = new esri.renderer.HeatmapRenderer({
          field: setting.field || "",
          blurRadius: setting.blurRadius,
          maxPixelIntensity: setting.maxPixelIntensity,
          minPixelIntensity: setting.minPixelIntensity,
          colorStops: setting.colorStops
        });

        businessLayer.setRenderer(heatmapRenderer);
        businessLayer.show();

        if (setting.reorderLayerIndex) {
          _this.map.reorderLayer(businessLayer, setting.reorderLayerIndex);
        }
        ;

        if ($.isFunction(setting.onCompletedEvent)) {
          setting.onCompletedEvent(businessLayer);
        }
        ;

      };
      this.mapPtToScreenPt = function (mapPoint) {
        if (!mapPoint || mapPoint.type !== 'point') {
          return
        }
        ;
        return _this.map.toScreen(mapPoint);
      };

      this.getPoint = function (properties) {
        var settings = $.extend({}, properties);
        var point = null;
        if (settings.x && settings.y) {
          point = new Point(settings.x, settings.y);
        }
        ;
        return point;
      };
      this.getPolygon = function (properties) {
        var settings = $.extend({}, properties);
        var polygon = null;
        if (settings.rings && settings.rings.length > 0) {
          polygon = new Polygon(settings.rings);
        }
        return polygon
      };
      this.getPolyline = function (properties) {
        var settings = $.extend({}, properties);
        var polyline = null;
        if (settings.paths && settings.paths.length > 0) {
          polyline = new Polyline(settings.paths);
        }
        ;
        return polyline;
      };
      //添加动态点位
      this.loadFeatureLayer = function (properties) {
        var settings = {};
        $.extend(settings, properties);
        var fillColor = "";
        var borderColor = "";
        var borderWidth = 1;
        var fillStyle = SimpleFillSymbol.STYLE_NULL;
        var lineStyle = SimpleLineSymbol.STYLE_NULL;
        if (settings.symbolFillColor) {
          fillColor = settings.SymbolFillColor;
          fillStyle = SimpleFillSymbol.STYLE_SOLID;
        }
        if (settings.symbolBorderColor) {
          borderColor = settings.SymbolBorderColor;
          lineStyle = SimpleLineSymbol.STYLE_SOLID;
        }
        if (settings.symbolBorderWidth) {
          borderWidth = settings.SymbolBorderWidth;
        }
        if (fillColor || borderColor || settings.symbolWidth) {
          settings.renderType = _Enum.Code__RenderType.SimpleRenderer;
        }
        //面
        if (settings.geometryType == _Enum.Code__MapLayerTypeCode.Polygon) {
          if (fillColor != "" && borderColor != "") {
            settings.symbol = new SimpleFillSymbol(fillStyle,
              new SimpleLineSymbol(lineStyle, new Color.toDojoColor(borderColor), borderWidth), new Color.toDojoColor(fillColor));
          }
        }
        //线
        else if (settings.geometryType == _Enum.Code__MapLayerTypeCode.Line) {
          if (borderColor != "") {
            settings.symbol = new SimpleLineSymbol(lineStyle, new Color.toDojoColor(borderColor), borderWidth);
          }
        }
        //点
        else {
          if (settings.symbolWidth && settings.symbolHeight) {
            if (settings.symbolUrl) {
              settings.symbol = new PictureMarkerSymbol(settings.symbolUrl, settings.symbolWidth, settings.symbolHeight);
            }
          }
          ;
        }
        ;
        _this.rendererLayerByType(settings);
      };

      //获取基本注记符号
      this.getDefaultSymbolByName = function (name, settings) {
        var symbol = null;
        switch (name) {
          case _Enum.Code__SymbolNames.Point: //STYLE_CIRCLE,STYLE_SQUARE
            var options = {
              fillColor: [0, 255, 0, 1],
              lineColor: [0, 0, 0],
              size: 10
            };
            $.extend(options, settings);
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, options.size, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor(options.lineColor), 1), new Color.toDojoColor(options.fillColor));
            break;
          case _Enum.Code__SymbolNames.Point_Highlight:
            var options = {
              fillColor: [0, 255, 255],
              lineColor: [0, 0, 0, 0],
              size: 10
            };
            $.extend(options, settings);
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, options.size, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor(options.lineColor), 1), new Color.toDojoColor(options.fillColor));
            break;
          case _Enum.Code__SymbolNames.Point_CheckPoint: //STYLE_CIRCLE,STYLE_SQUARE
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, settings.size, new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL, new Color.toDojoColor([255, 255, 255]), 1), new Color.toDojoColor(settings.fillColor));
            break;
          case _Enum.Code__SymbolNames.Point_Picture:
            var options = {
              width: 24,
              height: 24
            };
            $.extend(options, settings);
            symbol = new PictureMarkerSymbol(options.image, options.width, options.height);
            ;
            break;
          case _Enum.Code__SymbolNames.Point_Text:
            if (settings) {
              var TextJosn = {
                "type": "esriTS",
                "color": [255, 255, 255, 255],
                "backgroundColor": [246, 255, 197, 255],
                "borderLineColor": null,
                "verticalAlignment": "center",
                "horizontalAlignment": "left",
                "rightToLeft": false,
                "align": "left",
                "rotate": 0,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 10,
                "text": "",
                "font": {
                  "family": "Microsoft YaHei",
                  "size": "12px",
                  "style": "normal",
                  "weight": "bold",
                  "decoration": "none"
                }
              };
              $.extend(TextJosn, settings);
              symbol = new TextSymbol(TextJosn);

            }
            ;
            break;
          case _Enum.Code__SymbolNames.Polyline:
            if (settings) {
              symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor(settings.lineColor), settings.borderWidth);
            } else {
              symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color.toDojoColor([255, 255, 90]), 2);
            }
            ;
            break;
          //网格
          case _Enum.Code__SymbolNames.Polyline_WG:
            symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor([255, 0, 0]), 1);
            break;
          case _Enum.Code__SymbolNames.Polyline_Highlight:
            //            symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor("#ffff00"), 3), new Color.toDojoColor([255, 244, 91, 0]));
            symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color.toDojoColor([0, 255, 255]), 3);
            break;
          case _Enum.Code__SymbolNames.Polygon:
            var options = {
              lineStyle: SimpleLineSymbol.STYLE_SOLID,
              style: SimpleFillSymbol.STYLE_SOLID,
              lineColor: [57, 141, 238],
              borderWidth: 1,
              fillColor: [255, 255, 0, 0]
            };
            $.extend(options, settings);
            //STYLE_DASHDOT----虚线
            symbol = new SimpleFillSymbol(options.style, new SimpleLineSymbol(options.lineStyle, new Color.toDojoColor(options.lineColor), options.borderWidth), new Color.toDojoColor(options.fillColor));
            break;
          case _Enum.Code__SymbolNames.Polygon_Highlight:
            var options = {
              lineStyle: SimpleLineSymbol.STYLE_SOLID,
              fillStyle: SimpleFillSymbol.STYLE_NULL,
              lineColor: [0, 255, 255],
              borderWidth: 3,
              fillColor: [0, 255, 255, 0]
            };
            $.extend(options, settings);
            symbol = new SimpleFillSymbol(options.fillStyle, new SimpleLineSymbol(options.lineStyle,
              new Color.toDojoColor(options.lineColor), options.borderWidth),
              new Color.toDojoColor(options.fillColor));
            break;
        }
        ;
        return symbol;
      };

      //验证图形相互关系
      this.checkGeometryRelation = {
        isWithIn: function (geometry1, geometry2) {
          if (geometry2.contains(geometry1)) {
            return true;
          } else {
            return false;
          }
        },
        isWithInByService: function (geometry1, geometry2, callback) {
          var relationParams = new RelationParameters();
          relationParams.geometries1 = geometry2;
          relationParams.geometries2 = geometry1;
          relationParams.relation = RelationParameters.SPATIAL_REL_WITHIN;
          _this.geometryService.relation(relationParams, function (relations) {
            if (relations.length > 0) {
              callback(true);
            } else {
              callback(false);
            }
            ;
          }, function (e) {
            console.log(e);
          });
        }
      };

      //计算
      this.Calculate = {
        _rad: function (d) {
          var PI = Math.PI;
          return d * PI / 180.0;
        },
        _cross: function (o, a, b) { //外包络用
          return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
        },
        //获取两点之间距离
        getDistance: function (fromLongitude, fromLatitude, toLongitude, toLatitude, format) {
          var latitude = 0,
            longitude = 0,
            s = 0;
          latitude = _this.Calculate._rad(fromLatitude) - _this.Calculate._rad(toLatitude);
          longitude = _this.Calculate._rad(fromLongitude) - _this.Calculate._rad(toLongitude);
          s = 2 * Math.asin(Math.sqrt(Math.pow(Math.asin(latitude / 2), 2) + Math.cos(_this.Calculate._rad(fromLatitude)) * Math.cos(_this.Calculate._rad(toLatitude)) * Math.pow(Math.asin(longitude / 2), 2)));
          s = s * 6378.137;
          s = Math.round(s * 10000, 2) / 10000;
          s = s * 1000;

          if (format) {
            s = fw.fwString.FWStringHelper.toNumber(fw.fwNumber.FWNumberHelper.toString(s, format));
          }
          ;
          return s;
        },
        //根据图形对象计算图形面积或长度
        calcGeometry: function (properties) {
          var settings = {
            geometry: null,
            onCompletedEvent: null
          };
          $.extend(settings, properties);
          if (!_this.geometryService) {
            return;
          }

          switch (settings.geometry.type) {
            case "polyline":
              var lengthParams = new LengthsParameters();
              lengthParams.polylines = [settings.geometry];
              lengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;

              if (_this.map.spatialReference.wkid == 4326) {
                lengthParams.geodesic = true;
              } else {
                lengthParams.geodesic = false;
              }
              ;
              _this.geometryService.lengths(lengthParams, function (distance) {
                if ($.isFunction(settings.onCompletedEvent)) {
                  var data = {};
                  data.geometry = settings.geometry;
                  data.geometryType = settings.geometry.type;
                  data.length = distance.lengths[0];
                  settings.onCompletedEvent(data);
                }
                ;
              });
              break;
            case "polygon":
              var data = {};
              var areasAndLengthParams = new AreasAndLengthsParameters();
              areasAndLengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;
              areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_KILOMETERS;

              if (_this.map.spatialReference.wkid == 4326) {
                var outSR = new SpatialReference({
                  wkid: 102113
                });
                _this.geometryService.project([settings.geometry], outSR, function (outgeometry) {

                  _this.geometryService.simplify(outgeometry, function (simplifiedGeometries) {
                    areasAndLengthParams.polygons = simplifiedGeometries;
                    if (areasAndLengthParams.polygons[0].rings.length > 1) {
                      data.isSelfInsect = true;
                    }
                    _this.geometryService.areasAndLengths(areasAndLengthParams, function (result) {
                      if ($.isFunction(settings.onCompletedEvent)) {
                        data.geometry = settings.geometry;
                        data.geometryType = settings.geometry.type;
                        data.length = result.lengths[0];
                        data.area = result.areas[0];
                        if (data.area < 0) {
                          data.isSelfInsect = true;
                        }
                        settings.onCompletedEvent(data);
                      }
                      ;
                    });

                  });
                }, function (err) {
                });
              } else {
                areasAndLengthParams.polygons = [settings.geometry];
                areasAndLengthParams.geodesic = false;
                if (areasAndLengthParams.polygons[0].rings.length > 1) {
                  data.isSelfInsect = true;
                }
                _this.geometryService.areasAndLengths(areasAndLengthParams, function (result) {
                  if ($.isFunction(settings.onCompletedEvent)) {
                    data.geometry = settings.geometry;
                    data.geometryType = settings.geometry.type;
                    data.length = result.lengths[0];
                    data.area = result.areas[0];
                    if (data.area < 0) {
                      data.isSelfInsect = true;
                    }
                    settings.onCompletedEvent(data);
                  }
                  ;
                });
              }
              ;

              break;
          }
          ;

        }

      };
      this.toScreen = function (geometry) {
        if (!geometry) {
          return
        }
        ;
        return _this.map.toScreen(geometry)
      };
      this.Effects = {
        _zoomEffect: {
          _init: function () {
            var a = document.createElement("div");
            a.style.cssText = "width:108px;height:73px;overflow:hidden;position:absolute;visibility:hidden;z-index:200";

            var b = [];
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-right:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:0;top:0;"></div>');
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-left:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:100px;top:0;"></div>');
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-left:#F00 solid 2px;position:absolute;left:100px;top:67px;"></div>');
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-right:#F00 solid 2px;position:absolute;left:0;top:67px;"></div>');
            a.innerHTML = b.join("");
            this.va = a;
            $(a).appendTo(_this.mapJQ);
          },
          _show: function (a, p) {
            var b = this.va;
            if (p.x < 5 || p.y < 5 || p.x > this.width - 5 || p.y > this.height - 5 || p.V == !1)
              p.x = this.width / 2,
                p.y = this.height / 2;
            b.style.left = p.x - 54 + "px";
            b.style.top = p.y - 36.5 + "px";
            var c = 0,
              d = this;
            window.clearInterval(d.v);
            d.v = a > 0 ? setInterval(function () {
              var a = 9.5 * (4 - c),
                g = 5.75 * (4 - c);
              b.children[2].style.left = a + "px";
              b.children[2].style.top = g + "px";
              b.children[3].style.left = 108 - a - 9 + "px";
              b.children[3].style.top = g + "px";
              b.children[0].style.left = 108 - a - 9 + "px";
              b.children[0].style.top = 63 - g + "px";
              b.children[1].style.left = a + "px";
              b.children[1].style.top = 63 - g + "px";
              c >= 5 ? (window.clearInterval(d.v),
                  b.style.visibility = "hidden") :
                b.style.visibility = "visible";
              c++
            }, 80) : setInterval(function () {
              var a = 9.5 * c,
                g = 5.375 * c;
              b.children[0].style.left = a + "px";
              b.children[0].style.top = g + "px";
              b.children[1].style.left = 99 - a + "px";
              b.children[1].style.top = g + "px";
              b.children[2].style.left = 99 - a + "px";
              b.children[2].style.top = 64 - g + "px";
              b.children[3].style.left = a + "px";
              b.children[3].style.top = 64 - g + "px";
              c >= 5 ? (window.clearInterval(d.v),
                b.style.visibility = "hidden") : b.style.visibility = "visible";
              c++
            }, 120)
          }
        }

      }

      this.showTextLayer = function (properties) {
        var setting = $.extend({
          layerName: "textLayer",
          isHideSymbol: true,
          graphicList: [],
          layerType: _Enum.Code__MapLayerTypeCode.Point,
          itemFields: {
            xField: "posX",
            yField: "posY"
          },
          circleRadius: 40,
          fontSize: 12,
          fontColor: '#fff',
          fontWeight: 'normal',
          textAnchor: 'middle',
          labelVerticalAlign: 7,
          circleFillColor: 'rgba(44,140,240,0.8)',
          circleStrokeColor: 'rgba(37,116,211,1)',
          circleStrokeWidth: 0,
          key: 'cantonCode',
          labelList: ['name', 'num'],
          minScale: 3000000,
          maxScale: 1000000,
          minLevel: 3,
          maxLevel: 6,
          textCallback: function (ele, attributes) {
            var obj = {};
            obj.text = attributes[ele];
            if (ele === "name") {
              obj.text = pM.substring(obj.text, 4);
            }
            if (ele === 'num') {
              obj.text += "家"
            }

            obj.attr = textAttr[ele];

            return obj;
          },
          onClickEvent: function (key) {
            console.log(key)
          },
          onMouseOverEvent: function (e) {
            e.style.cursor = "pointer";
            $("circle", e).attr({
              "fill": 'rgba(255,125,0,0.9)'
            })
          },
          onMouseOutEvent: function (e) {
            e.style.cursor = "default";
            $("circle", e).attr({
              "fill": setting.circleFillColor
            })
          }
        }, properties);

        setting.layer = _this.addGraphicToLayer(setting);

        var d3AnnoLayer = new AnnoLayer(_this.map, setting.layer, setting);
        if (d3AnnoLayer && $.isFunction(d3AnnoLayer.init)) {
          d3AnnoLayer.init();
        }
        ;
      };

      this.removeTextLayer = function (properties) {
        var settings = $.extend({
          layerName: '',
          isBusinessLayer: false
        }, properties);
        if (!settings.layerName) {
          return
        }
        ;
        _this.businessLayerRemove(settings);

        settings.layerName += '-d3anno';
        var d3AnnoLayer = _this.map.getLayer(settings.layerName);
        if (d3AnnoLayer && $.isFunction(d3AnnoLayer.remove)) {
          d3AnnoLayer.remove();
        }
        ;
      };

      this.initTimeSlider = function (properties) {
        var settings = $.extend({
          options: {
            id: "timeSlider",
            style: 'width: 100%',
            thumbCount: 1,
            thumbMovingRate: 2000,
            loop: true
          },
          pId: "timeSliderDiv",
          timeUnit: "esriTimeUnitsHours",
          startTime: new Date(2016, 11, 1, 0, 0, 0),
          endTime: new Date(2016, 11, 1, 12, 0, 0),
          labelInterval: 4,
          timeInterval: 1
        }, properties);

        if (!_this.timeSlider) {
          _this.timeSlider = new TimeSlider(settings.options, document.getElementById(settings.pId));
          _this.timeExtent = new TimeExtent();
          _this.timeSlider.startup();
        }
        ;

        _this.timeExtent.startTime = settings.startTime;
        _this.timeExtent.endTime = settings.endTime;

        _this.timeSlider.createTimeStopsByTimeInterval(_this.timeExtent, settings.timeInterval, settings.timeUnit);

        var labels = _this.timeSlider.timeStops.map(function (timeStop, i) {
          if (i % settings.labelInterval == 0) {
            return getLableByTimeUnit(timeStop, settings.timeUnit)
          } else {
            return "";
          }
        });
        _this.timeSlider.setLabels(labels);
        _this.timeSlider.on('time-extent-change', function (args) {

          var curTime = args.endTime;
          window.windowDate = curTime;
          // console.log(curTime)
          if ($.isFunction(settings.callback)) {
            settings.callback(curTime)
          }
          ;
        });


        function getLableByTimeUnit(timeStop, timeUnit) {
          var year = timeStop.getFullYear(),
            month = timeStop.getMonth() + 1,
            date = timeStop.getDate(),
            hour = timeStop.getHours();

          var obj = {
            esriTimeUnitsYears: year,
            esriTimeUnitsMonths: year + "/" + month,
            esriTimeUnitsDays: year + "/" + month + "/" + date,
            esriTimeUnitsHours: year + "/" + month + "/" + date + " " + hour
          };

          var label = obj[timeUnit];

          if (label) {
            return label;
          }
          ;
          return "";
        };
      };

      this.destroyTimeSlider = function (properties) {
        if (_this.timeSlider) {
          _this.timeSlider.destroy();
          _this.timeSlider = null;
        }
      };
      this.showWindLayer = function (properties) {
        var settings = $.extend({data: [], layerName: "wind", projection: 'EPSG:4326'}, properties)

        var wind = new WindLayer(settings.data, {
          projection: settings.projection,
          map: _this.map
        });
        wind.id = settings.layerName;
        _this.map.addLayer(wind)
      }
      this.removeWindLayer = function (properties) {
        var settings = $.extend({layerName: "wind"}, properties)
        var WindLayer = mapAPI.getLayer(settings.layerName)
        if (WindLayer) {
          WindLayer.removeLayer();
        }
      }
      this.Enum = _Enum;

    }
    pM.trigger('esriOnLoad',MapAPI);
  });
  })
export default  MapAPI




