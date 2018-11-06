<template>
  <div class="login">
    <img src="static/images/logo.png" width="36">
    <div class="title">
    </div>
    <div class="content">
      <Form ref="baseInfo" style="position: relative;width:calc(40vw + 20px);margin: 0 auto;" :model="baseInfo">
        <Input class="userName" v-model="baseInfo.userName" placeholder="请输入您的账号"></Input>
        <Input class="passwd" @on-enter="submit" v-model="baseInfo.passwd" style="margin-right: 0;" type="password" placeholder="请输入您的密码">
        </Input>
        <img class="goLogin" @click="submit" src="@images/login/icon1.png" v-if="baseInfo.passwd !== ''">
      </Form>
    </div>
    <div id="canvas">
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
        },
        test: []
      }
    },
    created() {
      // this.$axios.post('prodId/sys/main/main/getDictCodeTreeByDepth', this.$qs.stringify({
      //     dictCode: 'std_canton',
      //     depth: 3,
      //     code: '320000',
      //     prodId: 'shencai-bssp'
      //   }))
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(error => console.log(error))
      // this.getSettingsDictionary(this.test,{
      //   code: 'std_canton',
      //   isTree: true,
      //   parentCode: '320000',
      //   emptyContent: '请选择行政区',
      //   maxLevel: '3',
      //   depth: 3
      // })
      // console.log(this.test)
      // setTimeout(() => console.log(this.test), 3000)
    },
    mounted() {
      // this.$store.commit('resetToken')
      // alert(this.$store.getters.token)
    },
    methods: {
      submit() {
        this.$router.push('/index')
        // this.$axios.get('ppc/Evaindex/queryGroupDictlist', {
        // })
        // .then(res => {
        //   console.log(res)
        // })
        // .catch(error => {
        //   console.log(error)
        // })
      },
      mounted() {}
    }
  }
</script>

<style lang="less" scoped>
  .login /deep/ .ivu-input {
    border-radius: 84px;
  }

  .login /deep/ .userName>input {
    background: url(~@/assets/images/login/user1920.png) #446b9f no-repeat 26px center !important;
    background-size: 12px 16px !important;
    border-radius: 84px;
  }

  .login /deep/ input {
    background: url(~@/assets/images/login/passwd1920.png) #446b9f no-repeat 26px center !important;
    background-size: 12px 16px !important;
    border: none !important;
    height: 50px !important;
    text-indent: 46px !important;
    color: #ffffff !important;
    font-size: 16px !important;
  }

  .login /deep/ input::-webkit-input-placeholder {
    color: #ffffff !important;
  }

  .login /deep/ .ivu-input-wrapper {
    width: 20vw !important;
    height: 42px;
    margin-right: 20px;
  }

  .login /deep/ button {
    width: 172px;
    height: 50px;
    background-color: #097bdb !important;
    border: 1px solid #097bdb !important;
    color: #ffffff !important;
    font-size: 13px !important;
  }

  @media screen and (max-width: 1440px) {
    .login /deep/ input {
      height: 40px !important;
    }
    .login /deep/ button {
      height: 40px;
    }
  }

</style>

<style scoped>
  .login {
    height: calc(100vh);
    overflow: hidden;
    position: relative;
    background: url(~@/assets/images/login/bg1920.png) no-repeat;
    background-size: cover;
  }

  .login>img {
    position: absolute;
    top: 5%;
    left: 2.9%;
  }

  .title {
    position: absolute;
    top: 17%;
    width: 100%;
    height: 69px;
    background: url(~@/assets/images/login/logo1920.png) no-repeat center center;
  }

  .content {
    position: absolute;
    transform: translate(-50%);
    left: 50%;
    top: 40%;
  }

  .content form {
    display: flex;
    justify-content: center;
  }

  .goLogin {
    position: absolute;
    right: 3px;
    top: 3px;
    cursor: pointer;
  }

  @media screen and (max-width: 1440px) {
    .title {
      height: 47px;
      background: url(~@/assets/images/login/logo1366.png) no-repeat center center;
    }
    .content {
      width: 1050px;
    }
    input {
      height: 40px !important;
    }
    button {
      height: 40px;
    }
    .goLogin {
      height: 33px;
    }
  }

  @media screen and (max-width: 1366px) {
    .login {
      background: url(~@/assets/images/login/bg1366.png) no-repeat;
    }
  }

</style>
