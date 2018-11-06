<template>
  <div>
    <div id="typeSelect">
        <todo-item></todo-item>
        <div class="menu">
            <div class="menu-left">
                <div>
                    <img src="@/assets/images/index/su.png"/>
                </div>
                <p>苏州市打赢污染防治攻坚战协同推进平台</p>
                <p>平台入口选择{{test}}</p>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="logo1366">
                    <img src="@/assets/images/login/logo1366.png"/>
                </div>
                <div class="platform">
                    <div class="platform-btn" @click="map">
                        <a>
                            <img src="@/assets/images/index/button1.png"/>
                        </a>
                    </div>
                    <div class="platform-btn">
                        <a>
                            <img src="@/assets/images/index/button2.png"/>
                        </a>
                    </div>
                    <div class="platform-btn">
                        <a href="#" target="_blank">
                            <img src="@/assets/images/index/button3.png"/>
                        </a>
                    </div>
                    <div class="platform-btn">
                        <a target="_blank" href="http://58.210.204.106:8777/mlsc-aad/web/shencai/main/side_cloud.html?ticket=ticket_60ED1D65-72F8-4E95-90C2-CEA4F949B777">
                            <img src="@/assets/images/index/button4.png"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div id="map" class="map">  
    </div> -->
  </div>
</template>

<script>
import Component from 'vue-class-component'
import {Vue} from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  test = 'fdafds'
}
</script>

<style scoped>
#map {
  height: 100vh;
}
#typeSelect {
  width: 100%;
  /* background-image: url(../../../static/images/background.png); */
  background-size: cover;
  position: relative;
}
#typeSelect .menu{
  background-color: #19203f;display: flex;justify-content: space-between;align-items: center;padding: 2px 8px;position: absolute;top: 0;width: 100%;
}
#typeSelect .menu .menu-left{
  display: flex;align-items: center;
}
#typeSelect .menu .menu-left img{
  width: 18px;
  margin-right: 5px;
}
#typeSelect .menu .menu-left p:nth-of-type(1){
  font-size: 14px;color: #fff;padding-right: 10px;border-right: 1px solid #979797;margin: 10px 0;letter-spacing: 3px;
}
#typeSelect .menu .menu-left p:nth-of-type(2){
  font-size: 12px;margin-left: 10px;color: #fff;
}
#typeSelect .content{
  height:100vh;display: flex;overflow: hidden;
}
#typeSelect .content>div{
  margin: 0 auto;
}
#typeSelect .content .logo1366{
  text-align: center;margin-bottom: 8vh;margin-top: 30vh;
}
#typeSelect .content .logo1366>img{
  width: 60vw;
}
#typeSelect .content .platform{
  display: flex;justify-content: center;
}
#typeSelect .content .platform .platform-btn:not(:nth-of-type(1)){
  padding-left: 50px;
}
#typeSelect .content .platform .platform-btn img{
  width: 10vw;
}
</style>
