var mapOperateTemplate = `
<div class="map-operate" :class="{'position-right':isOperateRight}">
    <div id="mapType" class="map-type" @mouseover="mouseOverEvt_expand" @mouseout="mouseOutEvt_expand"
         :class="{expand:isExpand}">
        <div v-for="item in baseMapList" class="mapTypeCard" :class="item.mapType" @mouseover="mouseOverEvt_mapModify"
             @mouseout="mouseOutEvt_mapModify" >
            <div class="mapTypePicture" :class="item.mapType" :data-name="item.mapType" @click="clickEvt_mapModify"
            ></div>
            <!--<div v-show="(item.mapType===currentMapType && isExpand)" class="checkbox-container">-->
                <!--<el-checkbox label="注 记" name="type" class="place-name" v-model="checked"-->
                             <!--@change="changeEvt_placeName"-->
                <!--&gt;</el-checkbox>-->
            <!--</div>-->
        </div>
    </div>
</div>
`;

var mapOperatebarComponent = {
    template: mapOperateTemplate,
    props: ['baseLayer', 'isShowPlaceNameLayer','isOperateRight'],
    data: function () {
        return {
            isExpand: false,
            checked: false,
            currentMapType: '',
            baseMapList: [{mapType: 'vector'}, {mapType: 'black'}, {mapType: 'img'}],
            baseMapObj: {
                vector: {layerType: 'ArcGISTiledMapServiceLayer', layerUrl: mSet.vectorLayerUrl},
                black: {
                    layerType: 'ArcGISTiledMapServiceLayer',
                    layerUrl:  mSet.pureLayerUrl
                },
                img: {layerType: 'ArcGISTiledMapServiceLayer', layerUrl: mSet.imgLayerUrl},
                placeName:{layerType:'TianDiTuTiledMapServiceLayer_PlaceName',
                    layerName:'placeNameMap'}
            }
        };
    },
    methods: {
        mouseOverEvt_expand: function (e) {
            this.isExpand = true;
        },
        mouseOutEvt_expand: function (e) {
            this.isExpand = false;
        },
        clickEvt_mapModify: function (e) {
            this.currentMapType = $(e.currentTarget).attr("data-name");
            if (!this.currentMapType) {
                return
            }
            ;

            mapAPI.modiMapService({
                mapServiceLayerType: this.baseMapObj[this.currentMapType].layerType,
                layerUrl: this.baseMapObj[this.currentMapType].layerUrl,
                layerName: 'baseMap'
            });

        },
        mouseOverEvt_mapModify: function (e) {
            // this.currentMapType = $(e.currentTarget).attr("data-name");
        },
        mouseOutEvt_mapModify: function (e) {
            //   this.currentMapType = '';
        },
        changeEvt_placeName: function () {
            var placeNameLayer = mapAPI.getLayer("placeNameMap");

            if (placeNameLayer) {
                if (placeNameLayer.visible) {
                    placeNameLayer.hide();
                } else {
                    placeNameLayer.show();
                }
                ;
            } else {

                    mapAPI.addMapService({
                        mapServiceLayerType: this.baseMapObj['placeName'].layerType,
                        layerUrl: this.baseMapObj['placeName'].layerUrl,
                        layerName: this.baseMapObj['placeName'].layerName,
                    });
            }
            ;
        },
        setDefaultBaseLayer: function () {
            var baseLayerObj = this.baseMapObj[this.baseLayer];

            mapAPI.addMapService({
                mapServiceLayerType: baseLayerObj.layerType,
                layerUrl: baseLayerObj.layerUrl,
                layerName: "baseMap"
            });

            if (this.isShowPlaceNameLayer) {
                this.changeEvt_placeName();
            }
            ;
        }
    },
    mounted:function () {
        var _this=this;

        Vue.nextTick(function () {
            _this.currentMapType=_this.baseLayer;
            _this.setDefaultBaseLayer();
        });
    }
};