<template>
  <div>
    <div class="title-user-profile green">Google认证设置</div>

    <div class="alert alert-success" role="alert">
      <p>
        1. 在手机上下载安装“Google Authenticator (身份验证器)”； <br>
        2. 在“验证器”应用程序中，点击“添加新账户 (iOS 下是 + 号)”，然后选择“扫描条形码”； <br>
        3. 扫描左侧条形码，输入Google验证码，完成认证。<br>
      </p>
      <p>
        如果您无法扫描成功上图的条形码，您还可以手动添加账户，并输入如下密匙:
        <span class="text-danger">{{googleSercet}}</span>
      </p>
      <p class="text-danger">
        请勿删除此双重验证密码账户，否则会导致您无法进行账户操作；如果误删，您可通过重置密钥重新获取。
      </p>
    </div>

    <form class="form-horizontal form-message">
      <div class="form-group">
        <label for="inputPwd" class="col-sm-2 control-label">密钥: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputPwd" v-model="googleSercet" readonly="readonly">
        </div>
      </div>
      <div class="form-group">
        <label for="inputCode" class="col-sm-2 control-label">谷歌验证码: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model="googleCaptcha" id="inputCode" placeholder="输入谷歌验证码">
        </div>
      </div>

      <div class="form-group" v-show="false">
        <label for="inputCode1" class="col-sm-2 control-label">短信验证码: </label>
        <div class="col-sm-10 code-send-wrap">
          <input type="text" class="form-control" id="inputCode1" placeholder="输入短信验证码">
          <button class="btn btn-success">发送验证码</button>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button  @click="googleAuth()" class="btn btn-success">验证并开启</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        googleSercet:'', //秘钥
        googleCaptcha: '', //谷歌验证码
        smsCaptcha:'', //短信验证码
      }
    },
    mounted() {
      this.googleInfo();
    },
    methods:{

      //google信息
      googleInfo() {
        var that = this;
        this.$http({
          url: this.$URL_API + 'authentication/googleInfo',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          that.googleSercet = res.data.data.sercet;
        })
      },

      //google认证
      googleAuth() {
        this.$http({
          url: this.$URL_API + 'authentication/googleAuth',
          method: 'POST',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          },
          data: {
            'googleCaptcha': this.googleCaptcha,
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }else{
            this.showError(res.data.code,'google认证已开启');
            this.$router.push('/settings');
          }    
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .btn-success{
    color: #fff;
    background-color: #2A8863;
    border-color: #2A8863;
  }
  .text-danger {
    color: #ff4500 !important;
  }
  .alert {
    margin: 20px;

    font-size: 13px;

    line-height: 1.6;
  }

  .form-message {
    padding: 15px 50px 15px 30px;
  }

  .code-send-wrap {
    display: flex;

    .btn {
      margin-left: -5px;

      border-radius: 0 4px 4px 0;
    }
  }

  .form-control.form-second {
    height: auto;
    padding: 6px 15px;
    line-height: 30px;
    font-size: 16px;
    border-radius: 0!important;
    -webkit-box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);
    border: 1px solid #e6e9ea;
  }
  .egg_gg1{
    height: 70px;
    background: #fbfbfb;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
  }
  .egg_h3{
    text-align: left;
    font-size: 18px;
    padding: 0 0 0 20px;
    height: 30px;
    line-height: 70px;
    font-weight: 100;
    color: #666;
  }
  .egg_smsm{
    border: 1px #fdb7b0 solid;
    position: relative;
    background: #fbf3f2 url(/statics/img/lamp.png) no-repeat scroll 5px 8px;
    color: #333;
    padding: 18px 40px;
    text-align: left;
    margin-top: 30px;
  }
</style>
