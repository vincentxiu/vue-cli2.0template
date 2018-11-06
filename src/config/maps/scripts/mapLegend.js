var mapLegendTemplate = `
<div>
                        <div class="legend-section-reachstate" v-if="isShowReachStateLegend">
                            <div class="legend-section-unreach">未达标</div>
                        </div>
                    <div class="legend-section-quality" v-if="isShowSectionQualityLegend">
                        <div class="quality-level one">Ⅰ类</div>
                        <div class="quality-level two">Ⅱ类</div>
                        <div class="quality-level three">Ⅲ类</div>
                        <div class="quality-level four">Ⅳ类</div>
                        <div class="quality-level five">Ⅴ类</div>
                        <div class="quality-level six">劣Ⅴ类</div>
                    </div>
                      <div class="legend-air" v-if="isShowAirLegend">
                        <div class="quality-level good">达标</div>
                        <div class="quality-level fine">未达标</div>
                    </div>
</div> `;

var mapLegendComponent = {
    template: mapLegendTemplate,
    props: ["isShowReachStateLegend", "isShowSectionQualityLegend","isShowAirLegend"],
    data: function () {
        return {
            errorImg: ''
        }
    }

};

// <map-legend-component is-show-section-quality-legend="true"></map-legend-component>