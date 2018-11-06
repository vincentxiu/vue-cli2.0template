window.pM = new PM();

function PM() {
    this.listenList = [];
}

PM.prototype.substring = function (str, len) {
    if (!str) {
        return ""
    }
    if (!len) {
        return str;
    }
    if (str.length > len) {
        return str.substring(0, len) + "...";
    }
    return str;

}

PM.prototype.precision = function (data, precision) {
    if (data != null) {
        return data.toFixed(precision || 2);
    } else {
        return;
    }
};

PM.prototype.number = function (data, precision) {
    if (data != null) {
        return data.toFixed(precision || 2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    } else {
        return;
    }
};

PM.prototype.formatDate = function (val) {
    if (val != null) {
        var date = new Date(val);
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (m < 10) {
            m = "0" + m;
        }
        if (d < 10) {
            d = "0" + d;
        }
        return date.getFullYear() + "-" + m + "-" + d;
    }
};

PM.prototype.calAngle = function (pntFirst, pntNext, amend) {

    var rotateAngle = 0;
    var deltX = pntNext.x - pntFirst.x;
    var deltY = pntNext.y - pntFirst.y;
    var k;
    var angle = 0;

    if (deltX != 0) {
        k = deltY / deltX;
        if (k == 0) {
            if (deltX > 0) {
                rotateAngle = 0;
            }
            else if (deltX < 0) {
                rotateAngle = 180;
            }
        }
        else if (k > 0) {
            if (deltX > 0)
                rotateAngle = Math.atan(k)
                    * 180 / Math.PI;
            else if (deltX < 0)
                rotateAngle = 180 + Math.atan(k)
                    * 180 / Math.PI;
        }
        else if (k < 0) {
            if (deltX < 0)
                rotateAngle = 180 + Math.atan(k)
                    * 180 / Math.PI;
            else if (deltX > 0)
                rotateAngle = 360 + Math.atan(k)
                    * 180 / Math.PI;
        }
    }
    else if (deltX == 0) {
        if (deltY > 0) {
            rotateAngle = 90;
        }
        else if (deltY < 0) {
            rotateAngle = 270;
        }
    }
    ;
    if (amend) {
        angle = rotateAngle + amend;
    } else {
        angle = rotateAngle;
    }
    ;

    return angle;

};
PM.prototype.unloading = function () {
    var mapLoadingJQ = $("#mapLoading");
    if (mapLoadingJQ) {
        mapLoadingJQ.hide();
    }
}
PM.prototype.loading = function () {
    var mapLoadingJQ = $("#mapLoading");
    if (mapLoadingJQ && mapLoadingJQ.length > 0) {
        mapLoadingJQ.show();
    } else {
        var divJQ = $("<div id='mapLoading' class=\"mapLoading\"></div>").appendTo("body")
        var html = `<div class="spinner"><div class="spinner-container container1">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
  <div class="spinner-container container2">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
  <div class="spinner-container container3">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div></div>`;
        $(html).appendTo(divJQ);
    }
}
PM.prototype.listen = function (message, fn) {
    if (!this.listenList[message]) {
        this.listenList[message] = [];
    }
    ;

    this.listenList[message].push(fn);
};

PM.prototype.trigger = function (message,param) {
    if (!this.listenList[message]) {
        return;
    }
    ;

    this.listenList[message].map(function (fn) {
            fn.call(this, param);
        }
    );
};

PM.prototype.formatText = function (text) {
    if (text == "" || text == undefined || text == null || !text) {
        return '--';
    }
    // ;
    // if (!fw.core.util.ObjectUtils.hasValue(text)) {
    //     return "--"
    // }
    // ;
    if (typeof text === "string") {
        if (text.toLowerCase() == "null") {
            return "--";
        }
        ;
        if (text.toLowerCase() == "undefined") {
            return "--";
        }
        ;
    }
    ;

    return text;
};

PM.prototype.randomColor = function () {
    var color = Math.floor(Math.random() * 200);
    return color;
};


PM.prototype.compare = function (obj1, obj2, keyField) {

    var val1 = obj1.distance;
    var val2 = obj2.distance;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
};
PM.prototype.getDistance = function (lng1, lat1, lng2, lat2) {
    var EARTH_RADIUS = 6378137;
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;

    s = Math.round(s) / 1000;

    function rad(d) {
        return d * Math.PI / 180.0;
    };
    return s;
};
PM.prototype.getGridSymbol = function () {
    var gridSymbolList = [],
        opacity = 200,
        colorList = [
            [241, 238, 61, opacity], [218, 232, 75, opacity], [134, 193, 39, opacity], [1, 169, 143, opacity],
            [0, 146, 223, opacity], [42, 22, 111, opacity], [152, 67, 122, opacity], [228, 102, 62, opacity],
            [207, 102, 54, opacity], [204, 154, 57, opacity]
        ];

    for (var i = 0, len = colorList.length; i < len; i++) {
        var symbol = mapAPI.getDefaultSymbolByName(mapAPI.Enum.Code__SymbolNames.Polygon,
            {
                lineColor: [45, 140, 240],
                borderWidth: 2,
                fillColor: colorList[i]
            });
        gridSymbolList.push(symbol);
    }
    ;

    return gridSymbolList;

};
PM.prototype.arrayToDictionary = function (centerList, key) {
    if (!centerList || centerList.length < 1 || !key) {
        return;
    }
    ;
    var obj = {}, entity = null;
    for (var i = 0, len = centerList.length; i < len; i++) {
        entity = centerList[i];
        obj[entity[key]] = entity;
    }
    ;
    return obj
};
PM.prototype.addDate = function (date, dateStep, dateFormatStr) {
    var _this = this,
        currentTime = _this.stringToDate(date);

    currentTime.setDate(currentTime.getDate() + dateStep)

    return currentTime.Format(dateFormatStr || "yyyy-MM-dd");

};
PM.prototype.stringToDate = function (s) {
    s = s.replace(/-/g, "/");
    return new Date(s);
};
PM.prototype.upperFirst = function (str) {
    str = str.substring(0, 1).toUpperCase() + str.substring(1)
    return str
}
PM.prototype.treeToList = function (tree) {

}

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.diff = function (nodes, keyField) {
    var list = this;

    return list.filter(function (item) {
        if (!nodes || nodes.length < 1) {
            return true;
        } else {
            var isExist = false
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i][keyField] == item[keyField]) {
                    isExist = true;
                }
                ;
            }
            ;
            return !isExist;
        }
        ;
    });
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function mapClickOpenInfo(properties) {
    var settings = $.extend({}, properties);

    if (!settings.e) {
        return
    }
    ;

    var attr = settings.e.attributes;
    if (!attr) {
        return
    }
    var divJQ = $("<div class='openInfoContent'></div>").width(settings.width || "400px").appendTo("body");

    var html = ""
    if (settings.html) {
        html = settings.html
    } else {
        html = "<div>" + pM.formatText(attr.Name) + "</div>";
    }
    ;
    $(html).appendTo(divJQ);

    mapAPI.mapInfoWindowShow({
        Title: settings.label || "",
        domNode: divJQ[0],
        evt: settings.gEvt,
        Width: divJQ.outerWidth(),
        Height: divJQ.outerHeight()
    });
    mapAPI.highlightGeometry({
        geometryList: [{
            geometry: geometry
        }],
        geometryType: pM.upperFirst(geometry.type)
    })
};


function layerClickOpenInfo(properties) {

    var settings = $.extend({}, properties);
    mapAPI.stopBaseEvent(settings.e);

    if (!settings.e || !settings.e.graphic) {
        return
    }
    ;

    var divJQ = $("<div class='openInfoContent'></div>").width(settings.width || "400px").appendTo("body");
    var html = "";
    var attr = settings.e.graphic.attributes;

    var geometry = settings.e.graphic.geometry;
    if (settings.html) {
        html = settings.html;
    } else {
        html = "<div>" + pM.formatText(attr.Name) + "</div>";
    }
    $(html).appendTo(divJQ);

    mapAPI.mapInfoWindowShow({
        Title: settings.label || "",
        domNode: divJQ[0],
        evt: settings.e,
        Width: divJQ.outerWidth(),
        Height: divJQ.outerHeight()
    });
    if (geometry.type === "polygon") {
        mapAPI.highlightGeometry({
            geometryList: [{
                geometry: geometry
            }],
            geometryType: pM.upperFirst(geometry.type)
        })
    }

    scMap.zoomToGeometry({
        geometry: geometry,
        isShowRippleLayer: false
    })

};

function layerClickOpenInfo_iframe(properties) {
    var settings = $.extend({e: null, url: "", width: "400px", height: "340px"}, properties)

    mapAPI.stopBaseEvent(settings.e);
    var width = settings.width;
    var height = settings.height;
    var divJQ = $("<div></div>").width(width).appendTo("body");
    var geometry = settings.e.graphic.geometry;
    var html = ` 
  <iframe  id="myiframe"  width="100%" height="${height}" src="${settings.url}" frameborder="0" v-bind:data-id="innerPage.url"
      seamless></iframe>               
`
    $(html).appendTo(divJQ);
    mapAPI.highlightGeometry({
        geometryList: [{
            geometry: geometry
        }],
        geometryType: pM.upperFirst(geometry.type)
    })
    mapAPI.mapInfoWindowShow({
        Title: '',
        domNode: divJQ[0],
        Width: divJQ.outerWidth(),
        Height: divJQ.outerHeight(),
        evt: settings.e,
        callback: function () {
            var isBig = false
            $(".esriPopup .contentPane").css({
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                "padding-bottom": 0
            });

            $(".esriPopup .titleButton.maximize").unbind("click").bind("click", function (e) {
                if (isBig) {
                    divJQ.width(width);
                    $('iframe', divJQ).height(height);
                    isBig = false;
                } else {
                    divJQ.width('100%').height('100%');
                    $('iframe', divJQ).height('100%');
                    isBig = true;
                }
            });
        }
    });
};

let hInfo = {
    hasAttributes: function (e) {
        if (!e || !e.graphic) {
            return false;
        }
        ;
        var attr = e.graphic.attributes;
        if (!attr) {
            return false;
        }
        ;

        return true;
    },
    searchRiverHtml: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>名称：" + attr.name + "</div>";
        h += "<div>水质等级：" + DDictionary.qualityCodeConvertName[attr.monitorValue] + "</div>";
        return h;
    },
    searchInfo: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>名称：" + attr.name + "</div>";
        h += "<div>距离：" + attr.distance + "千米</div>";

        return h;
    },
    section: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>断面名称：" + attr.sitename + "</div>";
        h += "<div>断面类型：" + attr.sitetypeNa + "</div>";
        h += "<div>所属河流：" + attr.riverName + "</div>";
        h += "<div>2018年目标：" + attr.targetLeve + "</div>";
        h += "<div>2020年目标：" + attr.targetLe_1 + "</div>";
        h += "<div>2020年目标：" + attr.targetLe_1 + "</div>";
        h += "<div>达标年限：" + attr.limitReach + "</div>";
        return h;
    },
    keyPollutionSource: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>污染源名称：" + pM.formatText(attr.PSName) + "</div>";
        h += "<div>企业类型：" + pM.formatText(attr.PSClassNam) + "</div>";
        h += "<div>所属区域：" + pM.formatText(attr.RegionName) + "</div>";
        h += "<div>注册类型：" + pM.formatText(attr.RegistType) + "</div>";
        h += "<div>企业规模：" + pM.formatText(attr.PSScaleNam) + "</div>";
        h += "<div>隶属关系：" + pM.formatText(attr.Subjection) + "</div>";
        h += "<div>行业类别：" + pM.formatText(attr.IndustryTy) + "</div>";
        h += "<div>所属流域：" + pM.formatText(attr.ValleyName) + "</div>";
        h += "<div>管控级别：" + pM.formatText(attr.AttentionD) + "</div>";
        h += "<div>企业地址：" + pM.formatText(attr.PSAddress) + "</div>";
        h += "<div>环保部门：" + pM.formatText(attr.PSEnvironm) + "</div>";
        h += "<div>环保负责人：" + pM.formatText(attr.Environmen) + "</div>";
        h += "<div>企业法人：" + pM.formatText(attr.Corporat_1) + "</div>";
        h += "<div>营业时间：" + pM.formatText(attr.RunDate) + "</div>";
        h += "<div>电话：" + pM.formatText(attr.MobilePhon) + "</div>";
        h += "<div>邮箱：" + pM.formatText(attr.Email) + "</div>";

        return h;
    },
    wasteProductionUnit: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>企业名称：" + pM.formatText(attr['企业名称']) + "</div>";
        h += "<div>所属行政区：" + pM.formatText(attr['区']) + "</div>";
        h += "<div>所属行业：" + pM.formatText(attr['行业']) + "</div>";
        h += "<div>工商注册类别：" + pM.formatText(attr['工商注册类']) + "</div>";
        h += "<div>企业规模：" + pM.formatText(attr['企业规模']) + "</div>";
        h += "<div>法人：" + pM.formatText(attr['法人']) + "</div>";
        h += "<div>联系人：" + pM.formatText(attr['联系人']) + "</div>";
        h += "<div>联系电话：" + pM.formatText(attr['联系方式']) + "</div>";
        h += "<div>成立日期：" + pM.formatText(attr['成立日期']) + "</div>";
        h += "<div>注册工商地址：" + pM.formatText(attr['注册工商地']) + "</div>";
        h += "<div>注册资本：" + pM.formatText(attr['注册资本']) + "万元</div>";
        h += "<div>工业园区：" + pM.formatText(attr['工业园区']) + "</div>";
        return h;
    },
    operationUnit: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>企业名称：" + pM.formatText(attr['企业名称']) + "</div>";
        h += "<div>所属行政区：" + pM.formatText(attr['区']) + "</div>";
        h += "<div>所属行业：" + pM.formatText(attr['行业']) + "</div>";
        h += "<div>工商注册类别：" + pM.formatText(attr['工商注册类']) + "</div>";
        h += "<div>企业规模：" + pM.formatText(attr['企业规模']) + "</div>";
        h += "<div>法人：" + pM.formatText(attr['法人']) + "</div>";
        h += "<div>联系人：" + pM.formatText(attr['联系人']) + "</div>";
        h += "<div>联系电话：" + pM.formatText(attr['联系方式']) + "</div>";
        h += "<div>成立日期：" + pM.formatText(attr['成立日期']) + "</div>";
        h += "<div>注册工商地址：" + pM.formatText(attr['注册工商地']) + "</div>";
        h += "<div>注册资本：" + pM.formatText(attr['注册资本']) + "万元</div>";
        h += "<div>工业园区：" + pM.formatText(attr['工业园区']) + "</div>";
        return h;
    },
    wasteWry: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;

        var h = "";
        h += "<div>企业名称：" + pM.formatText(attr.Name) + "</div>";
        h += "<div>所属行政区：" + pM.formatText(attr.cantonName) + "</div>";

        return h;
    },
    redLine: function (e) {
        if (!this.hasAttributes(e)) {
            return '';
        }
        ;
        var attr = e.graphic.attributes;
        var h = "";
        h += "<div>生态红线名称：" + pM.formatText(attr['Name']) + "</div>"
        h += "<card-content></card-content>"
        return h;
    }
};


function polygonToString(circle) {
    var str = 'POLYGON((';
    var rings = circle.rings[0];
    for (var i = 0; i < rings.length; i++) {
        str += rings[i][0] + " " + rings[i][1];
        if (i < rings.length - 1) {
            str += ",";
        }
        ;
    }
    str += "))";
    console.log(str)
    return str;
}

function getListCount(list) {
    var dataList = [],
        entity = null,
        obj = {};
    for (var i = 0; i < list.length; i++) {
        entity = list[i];
        if (obj[entity.type]) {
            obj[entity.type].count++;
        } else {
            obj[entity.type] = entity;
            obj[entity.type].count = 1;
        }
        ;
    }
    ;

    for (var key in obj) {
        dataList.push({
            name: key,
            elementCount: obj[key].count,
            image: obj[key].image,
            elementTypeName: obj[key].typeName,
        })
    }
    ;

    return dataList;
};

var convertTreeListToObj=function (treeList) {
    var obj = {};

    getList(treeList);

    function getList(entityList) {
        for (var i = 0, len = entityList.length; i < len; i++) {
            var data = entityList[i];
            obj[data.value]=data.label;
            if (data.children && data.children.length > 0) {
                getList(data.children);
            }
            ;
        }
        ;
    };

    return obj;
}

export   {PM,layerClickOpenInfo}
