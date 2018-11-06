var mapToolbarTemplate = `
<ul class="m-map-toolbar-ul" :class="{toggleUl:!expand}">
    <li v-if="expand" class="m-map-toolbar-li" @click="zoomToFullExtent">
        <i class="iconfont icon-fullextent"></i>
        <span>全图</span>
    </li>
    <li v-if="expand" class="m-map-toolbar-li">
      <div @click="toggleCollapsedState('baseMapObj')">
        <i class="toolbar-icon iconfont icon-baseMapToggle"></i>  
        <span>底图</span>
         <i class="toolbar-icon iconfont" v-if="baseMapObj.children && baseMapObj.children.length>0"
           :class="{ 'icon-arrow-up': !baseMapObj.collapsed,'icon-arrow-down': baseMapObj.collapsed }">
         </i>
      </div>
       <div class="m-toolbar-toolbox m-base-box-shadow-white" v-if="!baseMapObj.collapsed" style="width:88px;">
         <RadioGroup v-model="layerName" vertical @on-change="modifyBaseMap">
           <Radio :label="item.layerName" v-for="item in baseMapObj.children" >
            <span style="margin-left:10px;">{{item.layerlabel}}</span>
           </Radio>
         </RadioGroup>
        </div>
    </li>
    <li v-if="expand" class="m-map-toolbar-li">
       <div @click="toggleCollapsedState('toolboxObj')">
          <i class="toolbar-icon iconfont icon-toolbox"></i>
          <span>工具</span>
          <i class="toolbar-icon iconfont" v-if="toolboxObj.children && toolboxObj.children.length>0"
           :class="{ 'icon-arrow-up': !toolboxObj.collapsed,'icon-arrow-down': toolboxObj.collapsed }">
          </i>
       </div>
        <ul class="m-toolbar-toolbox m-base-box-shadow-white" v-if="!toolboxObj.collapsed" style="width: 94px;">
            <li v-if="toolboxObj.children" v-for="item in toolboxObj.children" @click="toolboxClickEvt(item.toolID)">
                <i class="toolbar-icon iconfont" :class="item.icon"></i>
                <span>{{item.toolName}}</span>
            </li>
        </ul>
        <div id="draw_line_result" class="draw-map-result" v-if="isShowDrawMapContainer">
         <ul class="draw-map-toolbar">
          <li class="draw-map-toolbar-item" @click="drawLine" title="画线">
             <i class="iconfont icon-draw-line" ></i>
           </li>
           <li class="draw-map-toolbar-item" @click="exportDrawRestule" title="导出">
             <i class="iconfont icon-export" ></i>
           </li>
           <li class="draw-map-toolbar-item" @click="copyDrawRestule" title="保存">
             <i class="iconfont icon-save"></i>
           </li>
           <li class="draw-map-toolbar-item" @click="clearDrawRestule" title="清空">
             <i class="iconfont icon-clear" ></i>
           </li>
             <li class="draw-map-toolbar-item" style="float:right;" @click="closeDraw" title="关闭">
             <i class="iconfont icon-close" ></i>
           </li>
          </ul>
           <i-table stripe :columns="columns1" :row-class-name="rowClassName" id="draw_map_res" :data="drawLineResult" size="mini" height="200px;"></i-table>
        </div>
    </li>
    <li v-if="expand" class="m-map-toolbar-li">
        <div @click="toggleCollapsedState('layerObj')">
          <i class="toolbar-icon iconfont icon-mapLayer"></i>
          <span>图层</span>
          <i class="toolbar-icon iconfont" v-if="layerObj.layerList && layerObj.layerList.length>0"
           :class="{ 'icon-arrow-up': !layerObj.collapsed,'icon-arrow-down': layerObj.collapsed }">
          </i>
        </div>
        <Tree  ref="layerTree" class="m-toolbar-layerlist m-base-box-shadow-white" v-if="!layerObj.collapsed"
        :data="layerObj.layerList"
        show-checkbox
         :render="renderContent"
          @on-check-change="checkLayerTool"
         ></Tree>
    </li>
    <li class="m-map-toolbar-toggle"   @click="toolbarToggle">
       <i class="toolbar-icon iconfont " style="font-size:18px;color:#ccc !important;" :class="{'icon-chevron-left':!expand,'icon-chevron-right':expand}"></i>
    </li>
</ul>`;

var mapToolbarComponent = {
        template: mapToolbarTemplate,
        data: function () {
            return {
                layerName: "pure",
                nodeKey: 'layerId',
                toolList: ['baseMapObj', 'toolboxObj', 'layerObj'],
                toolboxObj: {},
                layerObj: {},
                baseMapObj: {},
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                defaultExpandAll: true,
                defaultCheckedLayerIds: [],
                defaultCheckedLayerObjs: [],
                drawLineResult: [],
                isShowDrawMapContainer: false,
                columns1: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'posX',
                        key: 'posX'
                    },
                    {
                        title: 'posY',
                        key: 'posY'
                    }
                ],
            };
        },
        props: ['expand'],
        mounted: function () {
        },
        methods: {
            rowClassName(row, index) {

                return 'demo-table-info-row';

            },
            modifyBaseMap: function (layerName) {
                var layerInfoList = this.baseMapObj.children.filter(function (item) {
                    if (item.layerName === layerName) {
                        return item;
                    }
                });
                if (!layerInfoList || layerInfoList.length < 1) {
                    return;
                }
                ;
                var layerInfo = layerInfoList[0];
                mapAPI.modiMapService({
                    mapServiceLayerType: layerInfo.layerType,
                    layerUrl: layerInfo.layerUrl,
                    layerName: 'baseMap'
                });
                var tdtPlaceName = this.baseMapObj['tdtPlaceName'];

                if (!layerInfo.layerUrl) {
                    mapAPI.addMapService({
                        mapServiceLayerType: tdtPlaceName.layerType,
                        layerUrl: tdtPlaceName.layerUrl,
                        layerName: tdtPlaceName.layerName,
                    });
                } else {
                    mapAPI.removeMapService({layerName: tdtPlaceName.layerName})
                }
                ;
            },
            toolbarToggle: function () {
                if (this.expand) {
                    this.expand = false;
                } else {
                    this.expand = true;
                }
                ;
            },
            checkLayerTool: function (checkedNodes) {
                var _this = this;

                if (checkedNodes && checkedNodes.length > 0) {
                    checkedNodes.map(function (node) {
                        if (!node.children || node.children.length < 1) {
                            _this.showLayer(node);
                        }

                    });
                }
                ;
                if (!layerDataSource || layerDataSource.length < 1) {
                    return;
                }
                ;
                var unCheckedNodes = layerDataSource.diff(checkedNodes, "layerName");

                if (unCheckedNodes && unCheckedNodes.length > 0) {
                    unCheckedNodes.map(function (node) {
                        _this.hideLayer(node);
                    });
                }
                ;

            },
            showLayer: function (node) {
                if (node.layerType === 'MAP') {
                    mapAPI.addMapService(node);

                } else if (node.layerType === 'Business') {
                    mapAPI.businessLayerShow(node)
                }
                ;

            },
            hideLayer: function (node) {
                mapAPI.mapInfoWindowHide();

                mapAPI.businessLayerHide({layerName: 'GL', isBusinessLayer: false});

                if (node.layerType === 'MAP') {

                    mapAPI.removeMapService(node);

                } else if (node.layerType === 'Business') {

                    mapAPI.businessLayerHide(node)
                }
                ;
            }
            ,
            toggleCollapsedState: function (toolTypeKey) {

                if (!toolTypeKey) {
                    return;
                }
                ;
                this.setCollapsedState_close(toolTypeKey);
                if (this[toolTypeKey].collapsed) {
                    this[toolTypeKey].collapsed = false;
                } else {
                    this[toolTypeKey].collapsed = true;
                }
                ;
                if (this["toolboxObj"].collapsed) {
                    this.isShowDrawMapContainer = false;
                }
                ;
                setTimeout(function () {
                    if ($("#clearLayer") && $("#clearLayer").length > 0) {
                        $("#clearLayer").prev().remove();
                        $("#clearLayer").parent().css("text-align", 'right');
                    }
                    ;
                })
            }
            ,
            setCollapsedState_close: function (toolTypeKey) {
                var _this = this;
                this.toolList.map(function (ele, index) {
                    if (toolTypeKey !== ele) {
                        _this[ele].collapsed = true;
                    }
                    ;
                });
            }
            ,
            zoomToFullExtent: function () {
                mapAPI.zoomToFullExtent();
            }
            ,
            toolboxClickEvt: function (toolID) {
                var _this = this;
                _this.isShowDrawMapContainer = false;

                if (toolID && $.isFunction(_this[toolID])) {
                    _this[toolID]();
                }
                ;
            }
            ,
            clearTool: function () {
                mapAPI.DrawTool.clear();
            }
            ,
            makeLabel: function () {
                mapAPI.DrawTool.init({
                    mapDrawToolCode: 'POINT',
                    isCalculate: 1,
                    showText: true,
                    onCompletedEvent: function (evt) {
                    }
                });
            }
            ,
            measureDistance: function () {
                mapAPI.DrawTool.init({
                    mapDrawToolCode: 'POLYLINE',
                    isCalculate: 1,
                    showText: true,
                    onCompletedEvent: function (evt) {

                    }
                });
            }
            ,
            measureArea: function () {
                mapAPI.DrawTool.init({
                    mapDrawToolCode: 'POLYGON',
                    isCalculate: 1,
                    showText: true,
                    onCompletedEvent: function (evt) {

                    }
                });
            }
            ,
            drawMap: function () {
                var _this = this;
                _this.isShowDrawMapContainer = true;
            }
            ,
            drawLine: function () {
                var _this = this;
                mapAPI.DrawTool.init({
                    mapDrawToolCode: 'POLYLINE',
                    onCompletedEvent: function (evt) {
                        //  _this.drawLineResult = evt.geometry.paths[0];
                        evt.geometry.paths[0].map(function (ele, index) {
                            _this.drawLineResult.push({id: index, posX: ele[0].toFixed(6), posY: ele[1].toFixed(6)});
                        });
                    }
                });
            }
            ,
            copyDrawRestule: function () {

            },
            renderContent: function (h, {node, data}) {
                var label = data.hasXYcount > -1 ? data.label + '(' + data.hasXYcount + ')' : data.label;
                var title = data.count > -1 ? ( data.hasXYcount > -1 ? ('总数：' + data.count + "，有经纬度数：" + data.hasXYcount) : '') : '';
                if (data.image) {
                    return h('span', {
                        attrs: {
                            class: 'layerTreeItem'
                        }
                    }, [h('embed', {
                        attrs: {
                            src: data.image,
                            class: "layerTreeImage",
                            type: "image/svg+xml"
                        }
                    }), h('span', {
                        attrs: {
                            class: 'layerTreeName',
                            title: title
                        }
                    }, label)]);
                } else {
                    return h('span', [
                        h('span', {
                            attrs: {
                                title: title
                            }
                        }, label)
                    ]);
                }
            }
            ,
            getDefaultCheckedLayers: function () {
                var _this = this;
                var layerList = _this.layerObj.layerList
                if (!layerList || layerList.length < 1) {
                    return;
                }
                ;

                layerList.map(function (ele) {
                    if (ele.children && ele.children.length > 0) {
                        ele.children.map(function (child) {
                            if (child.checked || ele.checked) {

                                _this.defaultCheckedLayerObjs.push(ele[_this.nodeKey]);
                                _this.showLayer(ele);
                            }
                            ;
                        });
                    } else {
                        if (ele.checked) {

                            _this.defaultCheckedLayerObjs.push(ele[_this.nodeKey]);

                            _this.showLayer(ele);
                        }
                        ;
                    }
                    ;
                });
            }
            ,
            exportDrawRestule: function () {
                var _this = this;
                exportHandle.exportExcel("draw_map_res");
                // setTimeout(function () {
                //     _this.clearDrawRestule();
                // }, 1000)
            }
            , closeDraw: function () {
                this.isShowDrawMapContainer = false;

                this.clearTool();

                this.clearDrawRestule()

            },
            clearDrawRestule: function () {
                this.drawLineResult = [];
                //this.clearTool();
            }

        },
        mounted: function () {
            var _this = this;

            Vue.nextTick(function () {

                _this.toolboxObj = toolboxDataSource;

                _this.layerObj = layerDataSource_tree;

                _this.baseMapObj = baseMapDataSource;

            });
        }
    }
;

function layerClickInfo(evt) {

    var attr = evt.graphic.attributes;
    var divJQ = $("<div class='mapInfoContainer'></div>").appendTo("body");
    var html = '';
    html += "<div class='mapInfo'>" + attr["类型"] + "</div>";
    $(html).appendTo(divJQ);

    mapAPI.mapInfoWindowShow({
        domNode: divJQ[0],
        evt: evt,
        Title: attr["名称"] || '--'
    });
};

var exportHandle = {
    idTmr: null,
    getExplorer: function () {
        var explorer = window.navigator.userAgent;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
            return 'Chrome';
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
            return 'Opera';
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            return 'Safari';
        }
    },
    exportExcel: function (tableid) {
        var _this = this;
        if (_this.getExplorer() == 'ie') {
            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");
            var oWB = oXL.Workbooks.Add();
            var xlsheet = oWB.Worksheets(1);
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            sel.select();
            sel.execCommand("Copy");
            xlsheet.Paste();
            oXL.Visible = true;

            try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                oXL.Quit();
                oXL = null;
                _this.idTmr = window.setInterval("cleanup();", 1);
            }

        }
        else {
            _this.tableToExcel()(tableid);
        }
    },
    cleanup: function () {
        var _this = this;
        window.clearInterval(_this.idTmr);
        CollectGarbage();
    },
    tableToExcel: function () {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g,
                    function (m, p) {
                        return c[p];
                    })
            }
        return function (table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
        }
    }
};

/*工具数据配置*/
var toolboxDataSource = {
    "title": "工具", "collapsed": true,
    "children": [{"toolName": "清空", "toolID": "clearTool", "icon": "icon-clear"},
        {"toolName": "标记", "toolID": "makeLabel", "icon": "icon-label"},
        {"toolName": "距离", "toolID": "measureDistance", "icon": "icon-measureDistance"},
        {"toolName": "面积", "toolID": "measureArea", "icon": "icon-measureArea"},
        {"toolName": "定位", "toolID": "zoomToPosition", "icon": "icon-location"},
        {"toolName": "画图", "toolID": "drawMap", "icon": "icon-draw-line"}
    ]
}
/*底图数据配置*/
var baseMapDataSource = {
    "title": "底图", "collapsed": true,
    "children": [{
        "layerName": "vector",
        "layerlabel": "地图",
        "layerType": mSet.vectorLayerUrl ? 'ArcGISTiledMapServiceLayer' : 'TianDiTuTiledMapServiceLayer_Vector',
        "layerUrl": mSet.vectorLayerUrl
    },
        {
            "layerName": "img",
            "layerlabel": "影像",
            "layerType": mSet.imgLayerUrl ? 'ArcGISTiledMapServiceLayer' : 'TianDiTuTiledMapServiceLayer_Image',
            "layerUrl": mSet.imgLayerUrl
        },
        {
            "layerName": "pure",
            "layerlabel": "午夜",
            "layerType": 'ArcGISTiledMapServiceLayer',
            "layerUrl": mSet.pureLayerUrl
        }
    ],
    tdtPlaceName: {
        "layerName": "tdt_placename",
        "layerType": 'TianDiTuTiledMapServiceLayer_PlaceName',
        "layerUrl": ''
    }
};

/**基础图层数据配置**/
var layerDataSource_tree = (function () {
    if (!mSet) {
        return {};
    }
    ;
    var ptImageUrl = window.webSiteRootUrl + "maps/styles/images/searchIcon/";
    return {
        "title": "图层",
        "collapsed": true,
        "expand": true,
        "layerList": [
            {
                "label": "基础图层",
                "layerName": "baseLayer",
                "children": [{
                    "label": "水系",
                    "layerName": "riverSystem",
                    "children": [{
                        "label": "河流",
                        "layerName": "river",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "layerUrl": mSet.river,
                        "opacity": mSet.opacity,
                        "childLayerIds": [0],
                        "SymbolHLColor": true,
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "河流", gEvt);

                        }
                    },
                        {
                            "label": "湖泊",
                            "layerName": "lake",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "layerUrl": mSet.river,
                            "opacity": mSet.opacity,
                            "childLayerIds": [1],
                            "SymbolHLColor": true,
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "湖泊", gEvt);

                            }
                        }]
                }, {
                    "label": "行政区",
                    "layerName": "canton",
                    "children": [
                        {
                            "label": "省级",
                            "layerName": "js_省级",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "layerUrl": mSet.canton,
                            "opacity": 0.9,
                            "childLayerIds": [0],
                            "SymbolHLColor": true,
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "省级", gEvt);
                            }
                        },
                        {
                            "label": "市级",
                            "layerName": "js_市级",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "layerUrl": mSet.canton,
                            "opacity": 0.9,
                            "childLayerIds": [1],
                            "SymbolHLColor": true,
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "市级", gEvt);
                            }
                        }, {
                            "label": "县级",
                            "layerName": "js_县级",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "layerUrl": mSet.canton,
                            "opacity": 0.9,
                            "childLayerIds": [2],
                            "SymbolHLColor": true,
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "县级", gEvt);
                            }
                        }, {
                            "label": "乡镇级",
                            "layerName": "js_乡镇级",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "layerUrl": mSet.canton,
                            "opacity": 0.9,
                            "childLayerIds": [3],
                            "SymbolHLColor": true,
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "乡镇级", gEvt);
                            }
                        }]
                }, {
                    "label": "道路",
                    "layerName": "road",
                    "children": [{
                        "label": "高速",
                        "layerName": "highWay",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "layerUrl": mSet.road,
                        "opacity": 0.9,
                        "childLayerIds": [0],
                        "SymbolHLColor": true,
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "高速", gEvt);
                        }
                    }, {
                        "label": "国道",
                        "layerName": "stateRoad",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "layerUrl": mSet.road,
                        "opacity": 0.9,
                        "childLayerIds": [1],
                        "SymbolHLColor": true,
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "国道", gEvt);
                        }
                    }, {
                        "label": "省道",
                        "layerName": "proviceRoad",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "layerUrl": mSet.road,
                        "opacity": 0.9,
                        "childLayerIds": [2],
                        "SymbolHLColor": true,
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "省道", gEvt);
                        }
                    }]
                }]
            },
            {
                "label": "站点设施",
                "layerName": "stationFacility",
                "children": [
                    {
                        "label": "水环境",
                        "layerName": "brakePumpStation",
                        "children": [{
                            "label": "水质自动站",
                            "layerName": "waterQualityMonitoringStation",
                            "layerUrl": mSet.environmentBussiness,
                            "layerType": "Business",
                            "geometryType": "Point",
                            "renderType": "SimpleRenderer",
                            //"image": ptImageUrl + "waterStation.svg",
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e) {
                                layerClickOpenInfo(e, "水质自动站");
                            }
                        }, {
                            "label": "国考断面",
                            "layerName": "gSection",
                            "layerUrl": mSet.environmentBussiness,
                            "layerType": "Business",
                            "geometryType": "Point",
                            "renderType": "SimpleRenderer",
                           // "image": ptImageUrl + "hydrologicStation.svg",
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e) {
                                layerClickOpenInfo(e, "国考断面");
                            }
                        }, {
                            "label": "省考断面",
                            "layerName": "sSection",
                            "layerUrl": mSet.environmentBussiness,
                            "layerType": "Business",
                            "geometryType": "Point",
                            "renderType": "SimpleRenderer",
                           // "image": ptImageUrl + "hydrologicStation.svg",
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e) {
                                layerClickOpenInfo(e, "省考断面");
                            }
                        }]
                    },
                    {
                        "label": "气环境",
                        "layerName": "sewagePlant",
                        "children": [{
                            "label": "空气站",
                            "layerName": "airSite",
                            "layerUrl": mSet.environmentBussiness,
                            "layerType": "Business",
                            "geometryType": "Point",
                            "renderType": "SimpleRenderer",
                           // "image": ptImageUrl + 'airSit.svg',
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e) {
                                layerClickOpenInfo(e, "空气站");
                            }
                        }]
                    }, {
                        "label": "土环境",
                        "layerName": "sewagePlant",
                        "children": [{
                            "label": "土壤风险监测点",
                            "layerName": "soilSite",
                            "layerUrl": mSet.environmentBussiness,
                            "layerType": "Business",
                            "geometryType": "Point",
                            "renderType": "SimpleRenderer",
                            //"image": ptImageUrl + 'soilSit.svg',
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e) {
                                layerClickOpenInfo(e, "土壤风险监测点");
                            }
                        }]
                    }, {
                        "label": "污染源",
                        "layerName": "pollutionSource",
                        "children": [{
                            "label": "工业污染源",
                            "layerName": "industrialPollutionSource",
                            "children": [{
                                "label": "废水",
                                "layerName": "wasteWater",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                               // "image": ptImageUrl + "wasteWaterUnit.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "onClickEvent": function (e) {
                                    var html = hInfo.wasteWry(e);
                                    layerClickOpenInfo(e, "废水", html);
                                }
                            }, {
                                "label": "废气",
                                "layerName": "wasteAir",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                                //"image": ptImageUrl + "wasteAirUnit.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "onClickEvent": function (e) {
                                    var html = hInfo.wasteWry(e);
                                    layerClickOpenInfo(e, "废气", html);
                                }
                            }, {
                                "label": "工业污水厂",
                                "layerName": "sewagePlant",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                                //"image": ptImageUrl + "sewageUnit.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "onClickEvent": function (e) {
                                    var html = hInfo.wasteWry(e);
                                    layerClickOpenInfo(e, "工业污水厂", html);
                                }
                            }, {
                                "label": "重金属",
                                "layerName": "heavyMetalUnit",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                                //"image": ptImageUrl + "重金属.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "onClickEvent": function (e) {
                                    var html = hInfo.wasteWry(e);
                                    layerClickOpenInfo(e, "重金属", html);
                                }
                            }, {
                                "label": "其它企业",
                                "layerName": "wryCluster",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                                //"image": ptImageUrl + "其它企业.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "isCluster": true,
                                "clusterCallback": function () {

                                    if (localStorage.getItem("elsePolunitData")) {
                                        setTimeout(function () {
                                            showCluster(JSON.parse(localStorage.getItem("elsePolunitData")))
                                        })
                                    } else {
                                        vm.ajax({
                                            serviceType: "crossDomainCall",
                                            serviceName: "ppc/geo/geoSearch",
                                            methodName: "listElsePolUnit",
                                            data: {
                                                ticket: vm.ticket,
                                                queryParams: {code: "1"}
                                            }
                                            , success: function (resultData) {
                                                if (resultData && resultData.data) {
                                                    localStorage.setItem("elsePolunitData", JSON.stringify(resultData.data))
                                                    showCluster(resultData.data)
                                                }
                                            }
                                        })
                                    }

                                    function showCluster(data) {
                                        mapAPI.addClusterLayer({
                                            data: data,
                                            layerName: "wryCluster",
                                            xField: "longitude",
                                            yField: "latitude",
                                            onClickEvent: function (e) {
                                                var html = hInfo.wasteWry(e);
                                                layerClickOpenInfo(e, "其他企业", html);
                                            }
                                        })
                                    }

                                }
                            }]
                        }, {
                            "label": "农业污染源",
                            "layerName": "industrialPollutionSource",
                            "children": [{
                                "label": "畜牧养殖",
                                "layerName": "raiseLivestock",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                                //"image": ptImageUrl + "animalBreedUnit.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "onClickEvent": function (e) {
                                    layerClickOpenInfo(e, "畜牧养殖");
                                }
                            }, {
                                "label": "水产养殖",
                                "layerName": "breedAquatics",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                                "count": 0,
                                "hasXYcount": 0,
                               // "image": ptImageUrl + "fisherBreedUnit.svg",
                                "onClickEvent": function (e) {
                                    layerClickOpenInfo(e, "水产养殖");
                                }
                            }]
                        }, {
                            "label": "生活污染源",
                            "layerName": "industrialPollutionSource",
                            "children": [{
                                "label": "生活污水厂",
                                "layerName": "liveSewagePlant",
                                "layerUrl": mSet.environmentBussiness,
                                "layerType": "Business",
                                "geometryType": "Point",
                                "renderType": "SimpleRenderer",
                               // "image": ptImageUrl + "lifeSewageUnit.svg",
                                "count": 0,
                                "hasXYcount": 0,
                                "onClickEvent": function (e) {
                                    layerClickOpenInfo(e, "生活污水厂");
                                }
                            }]
                        }]
                    }
                ]
            },
            {
                "label": "业务图层",
                "layerName": "bussinessLayer",
                "children": [{
                    "label": "环境综合",
                    "layerName": "",
                    "children": [{
                        "label": "生态红线",
                        "layerName": "redLine",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "opacity": 0.8,
                        "layerUrl": mSet.redLine,
                        "SymbolHLColor": true,
                        "childLayerIds": [0],
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "reorderLayerIndex": 99,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "国控生态红线", gEvt);
                        }
                    },
                        {
                            "label": "产业园区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "产业园区", gEvt);
                            }
                        }, {
                            "label": "人口聚集区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "人口聚集区", gEvt);
                            }
                        }, {
                            "label": "基本农田",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "基本农田", gEvt);
                            }
                        }, {
                            "label": "其他",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他", gEvt);
                            }
                        }]
                }, {
                    "label": "生态环境",
                    "layerName": "",
                    "children": [{
                        "label": "生态红线-生态功能重要区域",
                        "layerName": "",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "opacity": 0.8,
                        "layerUrl": mSet.redLine,
                        "SymbolHLColor": true,
                        "childLayerIds": [0],
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "reorderLayerIndex": 99,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "生态红线-生态功能重要区域", gEvt);
                        }
                    },
                        {
                            "label": "生态红线-生态环境敏感脆弱区域",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "生态红线-生态环境敏感脆弱区域", gEvt);
                            }
                        }, {
                            "label": "生态红线-其它区域",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "生态红线-其它区域", gEvt);
                            }
                        }, {
                            "label": "其他生态空间",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他生态空间", gEvt);
                            }
                        }, {
                            "label": "一般管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "一般管控区", gEvt);
                            }
                        }]
                }, {
                    "label": "水环境",
                    "layerName": "",
                    "children": [{
                        "label": "优先保护区",
                        "layerName": "",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "opacity": 0.8,
                        "layerUrl": mSet.redLine,
                        "SymbolHLColor": true,
                        "childLayerIds": [0],
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "reorderLayerIndex": 99,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "优先保护区", gEvt);
                        }
                    },
                        {
                            "label": "工业污染重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "工业污染重点管控区", gEvt);
                            }
                        }, {
                            "label": "城镇生活污染重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "城镇生活污染重点管控区", gEvt);
                            }
                        }, {
                            "label": "农业污染重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "农业污染重点管控区", gEvt);
                            }
                        }, {
                            "label": "其他重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他重点管控区", gEvt);
                            }
                        }, {
                            "label": "一般管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "一般管控区", gEvt);
                            }
                        }]
                }, {
                    "label": "大气环境",
                    "layerName": "",
                    "children": [{
                        "label": "优先保护区",
                        "layerName": "",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "opacity": 0.8,
                        "layerUrl": mSet.redLine,
                        "SymbolHLColor": true,
                        "childLayerIds": [0],
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "reorderLayerIndex": 99,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "优先保护区", gEvt);
                        }
                    },
                        {
                            "label": "高排放重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "高排放重点管控区", gEvt);
                            }
                        }, {
                            "label": "布局敏感重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "布局敏感重点管控区", gEvt);
                            }
                        }, {
                            "label": "弱扩散重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "弱扩散重点管控区", gEvt);
                            }
                        }, {
                            "label": "受体敏感重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "受体敏感重点管控区", gEvt);
                            }
                        }, {
                            "label": "其他重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他重点管控区", gEvt);
                            }
                        }, {
                            "label": "一般管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "一般管控区", gEvt);
                            }
                        }]
                }, {
                    "label": "土壤环境",
                    "layerName": "",
                    "children": [{
                        "label": "农用地优先保护区",
                        "layerName": "",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "opacity": 0.8,
                        "layerUrl": mSet.redLine,
                        "SymbolHLColor": true,
                        "childLayerIds": [0],
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "reorderLayerIndex": 99,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "农用地优先保护区", gEvt);
                        }
                    },
                        {
                            "label": "其他优先保护区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他优先保护区", gEvt);
                            }
                        }, {
                            "label": "农用地污染风险重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "农用地污染风险重点管控区", gEvt);
                            }
                        }, {
                            "label": "建设用地污染风险重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "建设用地污染风险重点管控区", gEvt);
                            }
                        }, {
                            "label": "其他重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他重点管控区", gEvt);
                            }
                        }, {
                            "label": "一般管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "一般管控区", gEvt);
                            }
                        }]
                }, {
                    "label": "自然资源",
                    "layerName": "",
                    "children": [{
                        "label": "生态用水补给区",
                        "layerName": "",
                        "layerType": "MAP",
                        "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                        "opacity": 0.8,
                        "layerUrl": mSet.redLine,
                        "SymbolHLColor": true,
                        "childLayerIds": [0],
                        "SymbolHLColor": mSet.highLineColor,
                        "SymbolBorderWidth": mSet.highBorderWidth,
                        "SymbolHLFillColor": mSet.highFillColor,
                        "reorderLayerIndex": 99,
                        "count": 0,
                        "hasXYcount": 0,
                        "onClickEvent": function (e, gEvt) {
                            mapClickOpenInfo(e, "生态用水补给区", gEvt);
                        }
                    },
                        {
                            "label": "地下水开采重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "地下水开采重点管控区", gEvt);
                            }
                        }, {
                            "label": "土地资源重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "土地资源重点管控区", gEvt);
                            }
                        }, {
                            "label": "高污染燃料禁燃区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "高污染燃料禁燃区", gEvt);
                            }
                        }, {
                            "label": "重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "重点管控区", gEvt);
                            }
                        }, {
                            "label": "其他重点管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "其他重点管控区", gEvt);
                            }
                        }, {
                            "label": "一般管控区",
                            "layerName": "",
                            "layerType": "MAP",
                            "mapServiceLayerType": "ArcGISDynamicMapServiceLayer",
                            "opacity": 0.8,
                            "layerUrl": "",
                            "SymbolHLColor": true,
                            "childLayerIds": [0],
                            "SymbolHLColor": mSet.highLineColor,
                            "SymbolBorderWidth": mSet.highBorderWidth,
                            "SymbolHLFillColor": mSet.highFillColor,
                            "reorderLayerIndex": 99,
                            "count": 0,
                            "hasXYcount": 0,
                            "onClickEvent": function (e, gEvt) {
                                mapClickOpenInfo(e, "一般管控区", gEvt);
                            }
                        }]
                }]
            },
            {
                "label": "清空",
                "layerName": "clearLayer",
                render: function (h, {root, node, data}) {
                    return h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                type: 'primary'
                            }),
                            attrs: {id: 'clearLayer'},
                            style: {
                                padding: "3px 20px"
                            },
                            on: {
                                click: function (e) {

                                    var scVm = window.scVue ? window.scVue.vm : vm;
                                    if (!scVm) {
                                        return
                                    }
                                    if (!scVm.$refs.maptoolbar) {
                                        return
                                    }
                                    var maptoolbarNode = scVm.$refs.maptoolbar;
                                    if (!maptoolbarNode.$refs.layerTree) {
                                        return;
                                    }
                                    ;
                                    var layerTreeNode = maptoolbarNode.$refs.layerTree;


                                    clearParentNodeStyle();

                                    clearCheckedNodes();

                                    clearCheckedLayers();

                                    function clearParentNodeStyle() {
                                        var indeterminateJQ = $(".ivu-checkbox-indeterminate");
                                        indeterminateJQ.removeClass("ivu-checkbox-indeterminate");
                                    };

                                    function clearCheckedNodes() {
                                        var checkedNodes = layerTreeNode.getCheckedNodes();

                                        checkedNodes.map(function (item) {
                                            item.checked = false;
                                        });
                                    };

                                    function clearCheckedLayers() {
                                        maptoolbarNode.checkLayerTool([]);
                                    };
                                }
                            }
                        }, '清空'
                    );
                }
            }
        ]
    }
})();

var convertTreeListToList = function (treeList) {
    var centerList = [];

    getList(treeList);

    function getList(entityList) {
        for (var i = 0, len = entityList.length; i < len; i++) {
            var data = entityList[i];
            centerList.push(data);
            if (data.children && data.children.length > 0) {
                getList(data.children);
            }
            ;
        }
        ;
    };

    return centerList;
};


var layerDataSource = convertTreeListToList(layerDataSource_tree.layerList);


window.isShowRiverDetail = true

function showRiverDetail(attr) {
    console.log(attr)
}








