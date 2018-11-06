<template>
  <div class="sc-loginPage">
    <div id="divLoginHeader">
    </div>
    <div id="main-wrap" class="sc-loginPage-body">
    </div>
    <div id="divLoginFooter">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseInfo: {
        userName: '',
        passwd: ''
      }
    }
  },
  created() {
  },
  methods: {},
  mounted() {
    var viewIdObj = {
      header: "comjs:2636639288903680",
      body: "comjs:2636621445580800",
      footer: "comjs:2636641700218880"
    };
    //运行组件
    Comjs.use(viewIdObj.header, function (View) {
        var view = new View();
        //系统图标
        view.setImagesUrl(
            "http://192.168.252.119:8081/shencai-cm-web/web/cm/cm/uc/static/images/main/logo_01.jpg");
        //系统标题
        view.setTitle("江苏省环境税平台");
        //下载与帮助内容  ps传空数组即全都隐藏
        var linkArr = [{
            text: '帮助',
            url: 'http://www.baidu.com',
            target: '_blank',
            iconCls: 'fa fa-info-circle',
            children: []
        }, {
            text: '下载',
            url: '',
            iconCls: 'fa fa-download',
            children: [{
                    text: '谷歌浏览器下载',
                    target: '_blank',
                    url: 'http://www.baidu.com',
                    children: []
                }, {
                    text: '插件下载',
                    target: '_blank',
                    url: 'http://www.baidu.com',
                    children: []
                },
                {
                    text: '技术文档下载',
                    target: '_blank',
                    url: 'http://www.hao123.com',
                    children: []
                }
            ]
        }];
        view.setLinkArr(linkArr);
        var element = document.getElementById("divLoginHeader");
        view.appendTo(element);
    });


    //运行组件   测试账号密码：guww/guww
    Comjs.use(viewIdObj.body, function (View) {
        var view = new View();
        //登录成功回调事件
        view.onSuccess = function (data) {
            if (data.loginName.indexOf('admin') > -1) {
                window.location = 'http://192.168.252.119:8081/shencai-cm-web/web/cm/cm/viewRunner.html?ticket=' + data.ticket +
                    '&sideType=6&proId=2620298414786560';
            } else {
                window.location = 'http://192.168.252.119:8081/shencai-cm-web/web/cm/cm/viewRunner.html?ticket=' + data.ticket +
                    '&sideType=2&proId=2620723933562880';
            }
        };
        //登录框可动态配置的参数
        view.set({
            loginTypeArray: ["account", "mobile", "qrcode"], //需要哪些登录方式，ps传参格式是这样，但是暂不支持
            forgetPwd: true, //隐藏忘记密码，默认true
            userRegister: false, //隐藏用户注册，默认true
            rememberUserInfo: false //隐藏记住用户，默认true
        });
        //也可以写成
        view.setRememberUserInfo(true);
        //添加组件dom元素至body
        var element = document.getElementById("main-wrap");
        view.appendTo(element);
    });

    //运行组件
    Comjs.use(viewIdObj.footer, function (View) {
        var view = new View();
        //底部相关系统链接
        var linkArr = [{
                text: '一企一档',
                url: 'http://www.jshb.gov.cn/',
                target: "_blank"
            }, {
                text: '江苏环保',
                url: 'http://www.jshb.gov.cn/',
                target: "_blank"
            },
            {
                text: '环保云桌面',
                url: 'http://218.94.78.78:13000/portal/platform/index.do',
                target: "_blank"
            },
            {
                text: '企业服务',
                url: 'http://218.94.78.76:20008/mlsc-web/web/usercenter/login/login.htm',
                target: "_blank"
            },
            {
                text: '系统声明',
                url: 'http://www.baidu.com',
                target: "_blank"
            },
        ];
        view.setLinkArr(linkArr);
        //底部承建方信息以及技术支持的描述
        var bottomTextArr = ["江苏省生态环境监控中心（江苏省环境信息中心）· 苏ICP备10001599号",
            "技术支持：江苏神彩科技股份有限公司 联系电话：0512-62719888"
        ];
        view.setBottomTextArr(bottomTextArr);
        var element = document.getElementById("divLoginFooter");
        view.appendTo(element);
    })
  }
}
</script>

<style scoped>
.sc-loginPage {
    height: 100%;
    margin-left: 0px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    background-color: #ffffff;
    font-family: "微软雅黑";
}

.sc-loginPage .sc-loginPage-body {
    height: calc(100vh - 140px);
}
</style>
