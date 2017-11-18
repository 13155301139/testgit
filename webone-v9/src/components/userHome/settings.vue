<template>
  <div class="setting">
    <div class="title-user-profile green">安全设置</div>
    <div class="setting-content">
      <div class="setting-table">
        <table>
          <tbody>
          <tr>
            <td>
                  <span v-show="!realName">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未认证</span>
                  </span>
              <span v-show="realName">
                    <i class="iconfont">&#xe675;</i>
                    <span>已认证</span>
                  </span>
            </td>
            <td>实名认证</td>
            <td>保障账户安全，确认用户身份</td>
            <td>
              <router-link to="/settings/user" v-show="!realName">立即认证</router-link>
              <router-link to="/settings/user/userDetail" v-show="realName">详情</router-link>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realEmail">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未绑定</span>
                  </span>
              <span v-show="realEmail">
                    <i class="iconfont">&#xe675;</i>
                    <span>已绑定</span>
                  </span>
            </td>
            <td>邮箱绑定</td>
            <td>保障资金安全，获取账户资金变动通知</td>
            <td>
              <router-link to="/settings/bindEmail" v-show="!realEmail">立即绑定</router-link>
              <!--<a href="javascript:;" v-show="!realEmail">立即绑定</a>-->
              <span v-show="realEmail">{{emailNum}}</span>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realPhone">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未绑定</span>
                  </span>
              <span v-show="realPhone">
                    <i class="iconfont">&#xe675;</i>
                    <span>已绑定</span>
                  </span>
            </td>
            <td>手机绑定</td>
            <td>保障资金安全，是您在EggOne重要的身份凭证</td>
            <td>
              <router-link to="/settings/bindPhone" v-show="!realPhone">立即绑定</router-link>
              <!--<a href="javascript:;" v-show="!realPhone">立即绑定</a>-->
              <span v-show="realPhone">{{iponeNum}}</span>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!isGoogle">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未开启</span>
                  </span>
              <span v-show="isGoogle">
                    <i class="iconfont">&#xe675;</i>
                    <span>已开启</span>
                  </span>
            </td>
            <td>Google认证</td>
            <td>保障账户安全，Google认证设置</td>
            <td>
              <router-link to="/message" v-show="!isGoogle">立即开启</router-link>
              <span v-show="isGoogle">已开启</span>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realPsd">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未设置</span>
                  </span>
              <span v-show="realPsd">
                    <i class="iconfont">&#xe675;</i>
                    <span>已设置</span>
                  </span>
            </td>
            <td>登录密码</td>
            <td>上次登陆时间：<span class="login-timer">{{loginTime | dateYMDHIS}}</span></td>
            <td>
              <a href="javascript:;" v-show="!realPsd">立即设置</a>
              <router-link to="/settings/modifyPsd" v-show="realPsd">修改</router-link>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realMoneyPsd">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未设置</span>
                  </span>
              <span v-show="realMoneyPsd">
                    <i class="iconfont">&#xe675;</i>
                    <span>已设置</span>
                  </span>
            </td>
            <td>资金密码</td>
            <td>资金安全，提现等资金相关操作时使用</td>
            <td>
              <router-link to="/settings/bindFullPsd" v-show="!realMoneyPsd">立即设置</router-link>
              <router-link to="/settings/modifyFullPsd" v-show="realMoneyPsd">修改</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        iponeNum: '',
        emailNum: '',
        Xiang: 5,
        EXP: '低',
        loginTime: ''
      }
    },
    mounted() {
      let that = this;
      this.$http({
        url: this.$URL_API + 'authentication/info',
        method: 'GET',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          'X-Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then((res) => {
        let userLength;
        if (res.data.code === 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].authsEnum === 'PASSWORD') {
              that.$store.state.realName.userPsd = true;
              that.loginTime = res.data.data[i].createDate;
            }//密码
            if (res.data.data[i].authsEnum === 'ORDINARY_REAL_NAME') {
              that.$store.state.realName.userName = true;
            }//实名
            if (res.data.data[i].authsEnum === 'MOBILE') {
              that.$store.state.realName.userPhone = true;
              sessionStorage.setItem('MOBILE', 'yes');
              that.iponeNum = res.data.data[i].code;
            }//Google
            if (res.data.data[i].authsEnum === 'GOOGLE') {
              that.$store.state.realName.google = true;
              sessionStorage.setItem('GOOGLE', 'yes');
            } //手机
            if (res.data.data[i].authsEnum === 'EMAIL') {
              that.$store.state.realName.userEmail = true;
              sessionStorage.setItem('EMAIL', 'yes');
              that.emailNum = res.data.data[i].code;
            } //邮箱
            if (res.data.data[i].authsEnum === 'CAPIT_PASSWORD') {
              that.$store.state.realName.userMoneyPsd = true;
            }//资金密码
            if (res.data.data[i].authsEnum === 'GESTURE_PASSWORD') {
              userLength = res.data.data.length - 1;
            } else {
              userLength = res.data.data.length;
            }
          }

          that.Xiang = 5 - userLength;
          if (userLength <= 2) {
            that.EXP = '低';
          } else if (userLength <= 4) {
            that.EXP = '中';
          } else {
            that.EXP = '高';
          }
          $('.setting-safe-view-box i').css({
            left: 20 * userLength + '%'
          });
        }
      })
    },
    computed: {
      realName() {
        return this.$store.state.realName.userName;
      },//实名认证
      realEmail() {
        return this.$store.state.realName.userEmail;
      },//邮箱认证
      realPhone() {
        return this.$store.state.realName.userPhone;
      },//手机认证
      realPsd() {
        return this.$store.state.realName.userPsd;
      },//登录密码
      realMoneyPsd() {
        return this.$store.state.realName.userMoneyPsd;
      },//资金密码
      bindPhone(){
      },//绑定邮箱

      isGoogle(){
        return this.$store.state.realName.google;
      }
    }
  }
</script>
<style lang="less" scoped>
.title-user-profile {
    height: 50px;

    line-height: 50px;

    font-size: 18px;
    font-weight:bolder;
    padding-left: 20px;

    color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    &.green {
      background: #2A8863;
    }
  }
  .setting-header-title {
    padding: 1.5rem;
    border-bottom: 1px solid #ddd;
  }

  .setting-header-title > p {
    font-size: 1.333rem;
  }

  .setting-safe-view-box {
    padding: .2rem;
    border: 1px dashed #01aaef;
    position: relative;
    margin: 2.5rem;
  }

  .setting-safe-box {
    padding-top: 1.5rem;
  }

  .setting-safe-box > p {
    justify-content: center;
    font-size: 1.5rem;
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  .setting-safe-box > p:nth-of-type(2) {
    font-size: 1.333rem;
  }

  .setting-safe-box > p span {
    color: #01aaef;
    margin: 0 .5rem;
  }

  .setting-safe-box > p:nth-of-type(2) span {
    font-size: 1.333rem;
  }

  .setting-safe-view {
    background: linear-gradient(to right, #ff0000, #fff60d, #05c42e);
    height: 2.667rem;
    margin: 0.25rem;
  }

  .setting-safe-view-box > i {
    position: absolute;
    color: #01aaef;
    margin-left: -16px;
    left: 25%;
  }

  .setting-table table {
    width: 100%;
    padding: 2.5rem;
    box-sizing: border-box;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .setting-table .login-timer {
    display: inline !important;
  }

  .setting-table table tr td {
    padding: 25px;
    border-bottom: 1px solid #e9ecf3;
    font-size: 16px;
    font-weight:bolder;
  }

  .setting-table table tr td span {
    display: flex;
    align-items: center;
  }

  .setting-table table tr td .iconfont {
    font-size: 1.833rem;
  }

  .setting-table table tr td:nth-of-type(1) > span:nth-of-type(1) {
    color: #D33551 !important;
    font-weight: bolder;
    font-size:16px;
  }

  .setting-table table tr td:nth-of-type(1) > span:nth-of-type(2) {
    color: #2A8863 !important;
    font-weight: bolder;
    font-size:16px;
  }

  .setting-table table tr td:nth-of-type(4) {
    text-align: right;
  }

  .setting-table table tr td:nth-of-type(4) > span {
    justify-content: flex-end;
  }

  .setting-table table tr td:nth-of-type(4) > a {
    color: #2A8863 !important;
    text-decoration: none;
  }
</style>
