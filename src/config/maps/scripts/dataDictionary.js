import mSet from './mapSettings';
var ptImgUrl = window.webSiteRootUrl + "maps/styles/images/";
var DDictionary = {
  layerInfo: {
    "0": {
      layerUrl: mSet.envSynthesizeUrl,
      layerName: "envSynthesize",
      label: "环境综合",
      layerId: 0,
      attrKey: "",
      codeField: "HJZHGKDYBM",
      cantonField: "",
      manageCategoryCodeField: "ZHGKDYFL",
      nameField: "HJZHGKDYMC",
      attrKey: "ZHGKDYFL",
      getHtml: function (attributes) {
        var html = `<tr><td style="width:42%">环境综合管控单元编码:</td><td>${pM.formatText(attributes.HJZHGKDYBM || attributes["环境综合管控单元编码"])}</td></tr>
                                <tr><td>环境综合管控单元名称:</td><td>${pM.formatText(attributes.HJZHGKDYMC || attributes["环境综合管控单元名称"])}</td></tr>
                                <tr><td>省:</td><td>${pM.formatText(attributes.PROV || attributes["省"])}</td></tr>
                                <tr><td>市:</td><td>${pM.formatText(attributes.CITY || attributes["市"])}</td></tr>
                                <tr><td>县:</td><td>${pM.formatText(attributes.AREA || attributes["区县"])}</td></tr>
                                <tr><td>管控单元分类:</td><td>${pM.formatText(attributes.ZHGKDYFL || attributes["综合管控单元分类"])}</td></tr>
                                <tr><td>空间布局约束:</td><td>${pM.formatText(attributes.KJBJYS || attributes["空间布局约束\n"]) }</td></tr>
                                <tr><td>污染物排放管控:</td><td>${pM.formatText(attributes.PWWPFGK || attributes["污染物排放管控\n"]) }</td></tr>
                                <tr><td>环境风险防控:</td><td>${pM.formatText(attributes.HJFXFK || attributes["环境风险防控\n"])}</td></tr>
                                <tr><td>资源开发效率要求:</td><td>${pM.formatText(attributes.ZYKFXLYQ || attributes["资源开发效率要求\n"])}</td></tr>
                                <tr><td>备注:</td><td>${pM.formatText(attributes.REMARK || attributes["备注\n"]) }</td></tr>
                    `;
        return html
      }
    },
    "1": {
      layerUrl: mSet.zoologyEnvUrl,
      layerName: "zoologyEnv",
      label: "生态环境",
      layerId: 0,
      codeField: "STHJYSGKFQBM",
      cantonField: "",
      manageCategoryCodeField: "ZHGKDYFL",
      nameField: "STHJZHGKFQMC",
      attrKey: "ZHGKDYFL",
      getHtml: function (attributes) {

        var html = `<tr><td style="width:42%">生态环境管控单元编码:</td><td>${pM.formatText(attributes.STHJYSGKFQBM)}</td></tr>
                                <tr><td>生态环境管控单元名称:</td><td>${pM.formatText(attributes.STHJZHGKFQMC || attributes["STHJZHGKFQMC\n"])}</td></tr>
                                <tr><td>省:</td><td>${pM.formatText(attributes.PROV)}</td></tr>
                                <tr><td>市:</td><td>${pM.formatText(attributes.CITY)}</td></tr>
                                <tr><td>县:</td><td>${pM.formatText(attributes.AREA)}</td></tr>
                                <tr><td>管控单元分类:</td><td>${pM.formatText(attributes.ZHGKDYFL)}</td></tr>
                                <tr><td>环境要素:</td><td>${pM.formatText(attributes.HJYS)}</td></tr>
                                <tr><td>要素细类:</td><td>${pM.formatText(attributes.YSXL)}</td></tr>
                                <tr><td>空间布局约束:</td><td>${pM.formatText(attributes.KJBJYS)}</td></tr>
                                <tr><td>污染物排放管控:</td><td>${pM.formatText(attributes.PWWPFGK) }</td></tr>
                                <tr><td>环境风险防控:</td><td>${pM.formatText(attributes.HJFXFK) }</td></tr>
                                <tr><td>资源开发效率要求:</td><td>${pM.formatText(attributes.ZYKFXLYQ) }</td></tr>
                                <tr><td>备注:</td><td>${pM.formatText(attributes.REMARK) }</td></tr>
                    `;
        return html
      }
    },
    "2": {
      layerUrl: mSet.waterEnvUrl,
      layerName: "waterEnv",
      label: "水环境",
      layerId: 0,
      codeField: "SHJGKFQBM",
      cantonField: {0: "", 1: "", 2: ""},
      manageCategoryCodeField: "ZHGKDYFL",
      nameField: "SHJGKFQMC",
      attrKey: "ZHGKDYFL",
      getHtml: function (attributes) {
        var html = `<tr><td  style="width:42%">水环境管控分区编码:</td><td>${pM.formatText(attributes.SHJGKFQBM)}</td></tr>
                                <tr><td>水环境管控分区名称:</td><td>${pM.formatText(attributes.SHJGKFQMC)}</td></tr>
                                <tr><td>省:</td><td>${pM.formatText(attributes.PROV)}</td></tr>
                                <tr><td>市:</td><td>${pM.formatText(attributes.CITY)}</td></tr>
                                <tr><td>县:</td><td>${pM.formatText(attributes.AREA)}</td></tr>
                                <tr><td>流域名称:</td><td>${pM.formatText(attributes.LYMC)}</td></tr>
                                <tr><td>河段名称:</td><td>${pM.formatText(attributes.HDMC)}</td></tr>
                                <tr><td>控制断面起点经度:</td><td>${pM.formatText(attributes.KZDMQDJD)}</td></tr>
                                <tr><td>控制断面起点纬度:</td><td>${pM.formatText(attributes.KZDMQDWD) }</td></tr>
                                <tr><td>控制断面终点经度:</td><td>${pM.formatText(attributes.KZDMZDJD) }</td></tr>
                                <tr><td>控制断面终点经度:</td><td>${pM.formatText(attributes.KZDMZDWD) }</td></tr>
                                <tr><td>管控单元分类:</td><td>${pM.formatText(attributes.ZHGKDYFL)}</td></tr>
                                <tr><td>环境要素:</td><td>${pM.formatText(attributes.HJYS)}</td></tr>
                                <tr><td>要素细类:</td><td>${pM.formatText(attributes.YSXL)}</td></tr>
                                <tr><td>空间布局约束:</td><td>${pM.formatText(attributes.KJBJYS) }</td></tr>
                                <tr><td>污染物排放管控:</td><td>${pM.formatText(attributes.PWWPFGK) }</td></tr>
                                <tr><td>环境风险防控:</td><td>${pM.formatText(attributes.HJFXFK)}</td></tr>
                                <tr><td>资源开发效率要求:</td><td>${pM.formatText(attributes.ZYKFXLYQ) }</td></tr>
                                <tr><td>备注:</td><td>${pM.formatText(attributes.REMARK) }</td></tr>
                    `;
        return html
      }
    },
    "3": {
      layerUrl: mSet.airEnvUrl,
      layerName: "airEnv",
      label: "大气环境",
      layerId: 0,
      codeField: "DQHJGKFQBM",
      cantonField: {0: "", 1: "", 2: ""},
      manageCategoryCodeField: "ZHGKDYFL",
      nameField: "DQHJGKFQMC",
      attrKey: "ZHGKDYFL",
      getHtml: function (attributes) {
        var html = `<tr><td style="width:42%">大气环境管控分区编码:</td><td>${pM.formatText(attributes.DQHJGKFQBM)}</td></tr>
                                <tr><td>大气环境管控分区名称:</td><td>${pM.formatText(attributes.DQHJGKFQMC)}</td></tr>
                                <tr><td>省:</td><td>${pM.formatText(attributes.PROV)}</td></tr>
                                <tr><td>市:</td><td>${pM.formatText(attributes.CITY)}</td></tr>
                                <tr><td>县:</td><td>${pM.formatText(attributes.AREA)}</td></tr>
                                <tr><td>管控单元分类:</td><td>${pM.formatText(attributes.ZHGKDYFL)}</td></tr>
                                <tr><td>环境要素:</td><td>${pM.formatText(attributes.HJYS)}</td></tr>
                                <tr><td>要素细类:</td><td>${pM.formatText(attributes.YSXL)}</td></tr>
                                <tr><td>空间布局约束:</td><td>${pM.formatText(attributes.KJBJYS) }</td></tr>
                                <tr><td>污染物排放管控:</td><td>${pM.formatText(attributes.PWWPFGK)}</td></tr>
                                <tr><td>环境风险防控:</td><td>${pM.formatText(attributes.HJFXFK)}</td></tr>
                                <tr><td>资源开发效率要求:</td><td>${pM.formatText(attributes.ZYKFXLYQ) }</td></tr>
                                <tr><td>备注:</td><td>${pM.formatText(attributes.REMARK) }</td></tr>
                    `;
        return html
      }
    }
  },
  OverControlUnitPt: {
    1: window.webSiteRootUrl + "maps/styles/images/Duan3.png",
    2: window.webSiteRootUrl + "maps/styles/images/Duan5.png"
  },
  manageCategoryObj: {1: "优先", 2: "重点", 3: "一般"}

};
export {ptImgUrl, DDictionary}
