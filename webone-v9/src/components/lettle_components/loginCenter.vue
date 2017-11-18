<template>
  <div>
    <div class="login-box-content" v-show="!loginTrue">
      <div class="login-header">
        <p class="title" v-show="login_style1">{{$t('Login')}}</p>
      </div>
      <form name="user_login" v-show="login_style1" style="margin-top: 20px;">
        <div class="form-group has-success has-feedback"
        style="margin-bottom:30px;">
          <div class="input-group col-xs-10">
            <i class="iconfont input-group-addon">&#xe639;</i>
            <input class="form-control"
                   type="text" autocomplete="off"
                   :placeholder="$t('Cell')" name="userName"
                   id="userName" maxlength="32" v-model="userName"/>
          </div>
        </div>
        <div class="form-group has-success has-feedback">
          <div class="input-group col-xs-10">
            <i class="iconfont iconfont input-group-addon">&#xe631;</i>
            <input class="form-control" type="password" autocomplete="off"
                   :placeholder="$t('Password')" name="userPassword"
                   id="userPassword" maxlength="32" v-model="userPassword"/>
          </div>
        </div>
        <div class="form-group-checkbox">
          <!-- 记住账号密码 -->
          <input type="checkbox" id="remember"/><label for="remember">
          {{$t('Remember')}}</label>
        </div>
        <div class="form-group">
          <input type="button" :value="$t('Login')" class="login-btn" id="click"
          @click="userLogin()"/>
        </div>
        <div class="login-footer">
          <div class="password-retrieval">
            <router-link to="/passwordRetrieval">
            {{$t('Retrieve')}}</router-link>
          </div>
          <div class="register">
            <router-link to="/register">{{$t('Register')}}</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  $(function(){
    $(document).keydown(function(event){
      if(event.keyCode==13){
        $("#click").click();
      }
    })
    })
//  回车点击事件


  import $ from 'jquery';
  export default {
    data() {
      return {
        login_style1: true,
        userName: '',
        userPassword: '',
        showMoney: true,
        totalAssets: '',
        netAssets: ''
      }
    },
    mounted() {
      let that = this;
      {
        if (localStorage.getItem('username')) {
          that.userName = localStorage.getItem('username');
          $('#remember').attr('checked', true);
        }else{
          localStorage.removeItem('username');
        }
      }//获取localStorage
      {
        $('#remember').click(function () {
          that.$store.state.login.remember = $(this).is(':checked');
          if (that.$store
              .state.login.remember) {
            localStorage.setItem('username', that.userName);
          } else {
            localStorage.removeItem('username');
          }
        });
      }//记住用户名

    },
    methods: {
      login_style() {
        this.login_style1 = !this.login_style1;
        return false;
      },//登录方式
      userLogin() {
        var name = this.userName;
        let that = this;
        if (that.userName && that.userPassword) {
          that.$http({
            url: this.$URL_API + 'auth/login',
            method: 'POST',
            data: {
              "loginUser": that.userName,
              "loginPwd": md5(that.userPassword)
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
              "source": 'WEB'
            }
          }).then(function (data) {
            that.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              that.$store.dispatch('loginStateTrue');
              localStorage.setItem('token', data.data.data);
              localStorage.setItem('userPsd', md5(that.userPassword));
              if(document.getElementById("remember").checked){
                localStorage.setItem('username', that.userName);
              }else{
                localStorage.removeItem('username');
              }

              localStorage.setItem('commodity', that.$defaultCurrency);
              that.$store.state.loginTrue = true;
              that.$store.state.realName.userPsd = true;
              that.$store.state.token = data.data.data;
              that.getdr();
              that.sendEvent('login', '');
//              that.getUserM();
              let loginPattern = /0?^(13|14|15|18|17)[0-9]{9}/;
              if (loginPattern.test(that.userName)) {
                that.$store.state.realName.userPhone = true;
                that.$store.state.realName.userPhoneNum = that.userName;
              } else {
                that.$store.state.realName.userEmail = true;
                that.$store.state.realName.userEmailNum = that.userName;
              }
              that.$router.push('/user');
            }
//            if(this.userName==''||this.userName==null){
//              that.showError(data.data.code, data.data.message);
//              //alert("用户名不能为空");
//              return
//            }else if(this.userPassword==''||this.userPassword==null){
//              alert("密码不能为空");
//            }
          })
            // .catch((req) => {
            //   alert(req.message);
            //   this.showError(req.code, req.message)
            // })
        }
        if(that.userName==''||that.userName==null) {
              that.showError('','用户名不能为空');
              return
        }else if(that.userPassword==''||that.userPassword==null){
              that.showError('','密码不能为空');
        }

        //登陆不输入用户名和密码分别提醒

      },//帐号登录
//      getUserM() {
//        this.$http({
//          url: this.$URL_API + 'account/info',
//          method: 'GET',
//          headers: {
//            'X-Requested-With': 'XMLHttpRequest',
//            'X-Authorization': 'Bearer ' + this.$store.state.token,
//            'source': 'WEB',
//            'Content-Type': 'application/json'
//          }
//        }).then((res) => {
//          if (res.data.code === 200) {
//
//          }
//        })
//      },
      getdr(){
        this.$http({
          url: this.$URL_API + 'authentication/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].authsEnum === 'ORDINARY_REAL_NAME') {
              localStorage.setItem('real', 'yes');
            }//实名
            if (res.data.data[i].authsEnum === 'MOBILE') {
              sessionStorage.setItem('MOBILE', 'yes');
            } //手机
            if (res.data.data[i].authsEnum === 'EMAIL') {
              sessionStorage.setItem('EMAIL', 'yes');
            } //邮箱
          }
        })
      }
    },

    computed: {
      loginTrue() {
        return this.$store.state.loginTrue;
      },
    }
  }
</script>
<style scoped>
  label{
     font-size: 14px;
  }
  .has-success .input-group-addon{
     color: #fff;
     background-color: #2A8863;
     border-color: #2A8863;
  }
  .input-group-addon{
    font-size: 20px;
    font-weight: bolder;
  }
  .form-control{
    height: 38px;
  }
  .login-header {
    position: relative;
  }

  .login-header img {
    position: absolute;
    top: -1.667rem;
    right: 0;
    cursor: pointer;
  }

  .login-box {
    position: relative;
  }

  .login-show-box-user {
    color: #fff;
  }

  .login-box-content {
    position: absolute;
    right: 80px;
    width: 28.33rem;
    top: 100px;
    background-color: rgba(0, 0, 0, .5);
    padding: 1.667rem 0;
    z-index: 999;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 1.25rem;
  }

  .help-tips {
    width: 100%;
    height: 1.5rem;
  }

  .input-icon {
    width: 80%;
    background: #fff;
    display: flex;
    align-items: center;
    left: 0;
  }

  .input-icon > i {
    color: #ccc;
    z-index: 3;
    font-size: 1.33rem;
    padding-left: 1rem;
  }

  .input-icon > .form-control {
    padding: 1rem 1rem;
    border: 0;
    outline: none;
    width: 100%;
  }

  .login-box-content .title {
    font-size: 1.833rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #53514f;
    color: #e0dfde;
    text-align: center;
  }

  .form-group-checkbox {
    display: flex;
    color: #b3b3b3;
    font-size: 2rem;
    align-items: center;
  }

  #remember{
    margin: 0 .3rem 0 2.767rem;
  }

  .login-btn {
    margin-top: 10px;
    width: 82%;
    border-width: 0;
    padding: 8px 0;
    font-size: 18px;
    font-weight: bolder;
    color: #FFFFFF;
    background: #2A8863;
    cursor: pointer;
    outline: none;
  }

  .login-btn:hover {
    background: #2A8863;
  }
  .login-btn:active {
    background: #74A994;
  }
  .login-footer {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2.767rem;
    font-size: 1.167rem;
  }

  .login-footer a {
    color: #b3b3b3;
    font-size: 16px;
    font-weight: bolder;
  }

  .login-footer a:hover {
    color: #2A8863;
    text-decoration:none;
  }

  .text-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .qr-code-box {
    margin: 2rem 0;
  }

  .qr-code-footer-mobile {
    color: #b3b3b3;
    font-size: 1.33rem;
    text-decoration: underline;
  }

  .qr-code-footer-mobile:hover {
    color: #5b9bd1;
  }

  .login-show-box-user .title {
    margin-bottom: 1.25rem;
  }

  .login-show-box-user section {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #b3b3b3;
    min-height: 26px;
  }

  .login-show-box-user section:last-child {
    margin-bottom: 0;
    justify-content: center;
  }

  .login-show-box-user section a {
    color: #b3b3b3;
  }

  .login-show-box-user section i {
    cursor: pointer;
    font-size: 22px;
  }

  .login-show-box-user section:nth-of-type(1) {
    justify-content: space-between;
  }

  .login-show-box-user section:nth-of-type(1) > span {
    margin-left: 50px;
  }

  .login-show-box-user section:nth-of-type(2), .login-show-box-user section:nth-of-type(3) {
    align-items: flex-end;
  }

  .login-show-box-user section:nth-of-type(2) > span, .login-show-box-user section:nth-of-type(3) > span {
    color: #fff;
  }

  .login-show-box-user section:nth-of-type(2) > span:nth-of-type(1), .login-show-box-user section:nth-of-type(3) > span:nth-of-type(1) {
    color: #b3b3b3;
    margin-left: 1.5rem;
    margin-right: 2rem;
  }

  .login-show-box-user section:nth-of-type(2) > span:nth-of-type(3), .login-show-box-user section:nth-of-type(3) > span:nth-of-type(3) {
    font-size: 22px;
  }

  .login-show-box-user section:nth-of-type(4) {
    margin-bottom: 1.5rem;

  }

  .login-show-box-user section:nth-of-type(4) > a {
    width: 100%;
    background: #01aaef;
    color: #fff;
    padding: 9px;
    text-align: center;
    font-size: 1.167rem;
  }

  .login-show-box-user section:nth-of-type(4) > a:hover {
    background: #0186bc;
  }

  .login-show-box-user section:nth-of-type(5) > a {
    font-size: 1.167rem;
    margin: 0 0.5rem;
  }

  .login-show-box-user section:nth-of-type(5) > a:hover {
    color: #01aaef;
    text-decoration: underline;
  }
</style>
