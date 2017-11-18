<template>
  <div class="retrieval">
    <div class="retrieval-box">
      <div class="retrieval-header">
        <span>{{$t('Retrieve')}}</span>
        <a href="javascript:" v-if="retrieval_text" @click="retrieval_style()">
        {{$t('Mailbox')}}</a>
        <a href="javascript:" v-if="!retrieval_text" @click="retrieval_style()">
        {{$t('Mobile')}}</a>
      </div>
      <div class="retrieval-from" v-show="retrieval_text">
        <form name="retrieval1">
<!-- 手机找回密码-手机号码-开始-->
    <div class="form-group has-success has-feedback">
    <div class="input-group" style="margin-left:24%;margin-right:25%;">
      <span class="input-group-addon egg-sjhm"><i class="fa fa-mobile" aria-hidden="true" style="font-size:36px;"></i></span>
      <input type="text" class="form-control userNameIptR" aria-label="...":placeholder="$t('Cellphone')" v-model="userNameM" maxlength="11" />
      <div class="input-group-btn">
        <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        中国+86 <span class="caret"></span></button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">中国</a></li>
          <li><a href="#">香港</a></li>
          <li><a href="#">台湾</a></li>
          <li><a href="#">香港</a></li>
        </ul>
      </div>
     </div>
     <div class="phone-tishiR egg-xsts1" ></div>
    </div>
          
<!-- 手机找回密码-手机号码-结束-->
<!-- 手机找回密码-获取验证码-开始-->
      <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-yzm"><i class="fa fa-commenting-o" aria-hidden="true" style="font-size:20px;"></i></span>
          <input type="text" class="form-control"
                 :placeholder="$t('Phonecode')"
                  v-model="userCordM" maxlength="6">
          <span class="input-group-btn">
            <button class="btn btn-success getCodeMR" type="button"
            @click="getCodeMR($event)">{{$t('getcode')}}</button>
          </span>
        </div>
      </div>
<!-- 手机找回密码-获取验证码-结束-->
<!-- 手机找回密码-新的密码-开始-->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsdMR"
                 :placeholder="$t('Newpass')"v-model="userPsdM"
                 minlength="6"maxlength="32" />
        </div>
        </div>
<!-- 手机找回密码-新的密码-结束-->
<!-- 手机找回密码-确认密码-开始-->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsdsMR"
                 :placeholder="$t('Confirm')" v-model="userPsdsM"
                 minlength="6"maxlength="32"/>
        </div>
        <div class="help-tips-psdsMR egg-xsts1" ></div>
        </div>
<!-- 手机找回密码-确认密码-结束-->
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" :value="$t('Submit')"
                     class="retrieval-submit" @click="phoneRE($event)"/>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <span>{{$t('Has')}}</span>
              <router-link to="/login" class="go-login">&nbsp;{{$t('Direct')}}</router-link>
            </div>
          </div>
        </form>
      </div>
      <div class="retrieval-from" v-show="!retrieval_text">
        <form name="retrieval1">
<!-- 邮箱注册-邮箱-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group"
              style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true" style="font-size: 20px;"></i></span>
          <input type="email" class="form-control userNameEIptR"
                 :placeholder="$t('Email')" v-model="userNameE"/>
        </div>
        <div class="help-tips-userEmailR egg-xsts1"></div>
        </div>
<!-- 邮箱注册-邮箱-结束 -->
<!-- 邮箱注册-邮箱验证码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon"><i class="fa fa-envelope-open-o" aria-hidden="true"  style="font-size:20px;"></i></span>
          <input type="text" class="form-control"
                 :placeholder="$t('verification')"
                  v-model="userCordE" maxlength="6"/>
          <span class="input-group-btn">
            <button class="btn btn-success getCodeER" type="button"
            @click="getCodeER($event)">{{$t('getcode')}}</button>
          </span>
        </div>
        </div>
<!-- 邮箱注册-邮箱验证码-结束 -->
<!-- 找回密码-新的密码-开始-->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsdER"
                 :placeholder="$t('Newpass')"v-model="userPsdE"
                 minlength="6" maxlength="32"/>
        </div>
        </div>
<!-- 邮箱找回密码-新的密码-结束-->
<!-- 邮箱找回密码-确认密码-开始-->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsdsER"
                 :placeholder="$t('Confirm')" v-model="userPsdsE" minlength="6" maxlength="32"/>
        </div>
        <div class="help-tip-psdsER egg-xsts1"></div>
        </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" :value="$t('Submit')"
                     class="retrieval-submit" @click="emailRE()"/>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <span>{{$t('Has')}}</span>
              <router-link to="/login" class="go-login">&nbsp;{{$t('Direct')}}</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  export default{
    data() {
      return {
        retrieval_text: true,
        userNameM: '',
        userNameE: '',
        userCordM: '',
        userCordE: '',
        userPsdM: '',
        userPsdE: '',
        userPsdsM: '',
        userPsdsE: '',
        timer: ''
      }
    },
    mounted() {
      let that = this;
      //      手机号码正则验证
      {
        let that = this;
        $('.userNameIptR').blur(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          //console.log(pattern.test(that.userNameM));
          if (!pattern.test(that.userNameM)) {
            that.$store.state.phoneR.username = false;
            $('.phone-tishiR').html('您输入的号码格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          } else {
            that.$store.state.phoneR.username = true;
            $('.phone-tishiR').html('');
          }

//          that.$http({
//            url: that.$URL_API + 'register/check/' + that.userNameM,
//            method: 'GET',
//            headers: {
//              "X-Requested-With": "XMLHttpRequest",
//              "Content-Type": "application/json;charset=UTF-8",
//            }
//          }).then((res) => {
//            if(res.data.message=="用户名不存在"){
//              $('.phone-tishi').html(res.data.message);
//            }
//
//          })

        });

      }
      //邮箱正则验证
      {
        let that = this;
        $('.userNameEIptR').blur(function () {
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          if (pattern.test(that.userNameE)) {
            $('.help-tips-userEmailR').html('');
            that.$store.state.emailR.username = true;
          } else {
            that.$store.state.emailR.username = false;
            $('.help-tips-userEmailR').html('您输入的邮箱格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        });
      }
      //获取验证码
      {
        let that = this;
        $('.getCodeMR').html($t('getcode'));
        $('.getCodeER').html($t('getcode'));
      }
      {
        {
          $('.userPsdER').mousedown(function () {
            $(document).keyup(function () {
              that.passWord(that.userPsdE, 'password-strengths', 'password-strength-views');
            })
          });
          $('.userPsdER').mouseleave(function () {
            $('.userPsdER').mousedown = null;
          })
          $('.userPsdMR').mousedown(function () {
            $(document).keyup(function () {
              that.passWord(that.userPsdM, 'password-strength', 'password-strength-view');
            })
          });
          $('.userPsdMR').mouseleave(function () {
            $('.userPsdMR').mousedown = null;
          })
        }
      }
    },
    methods: {
      getCodeER(ev){
        $('.getCodeER').attr("disabled", true).css("cursor", "default");
        let that = this;
        let second = 60;
        let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
        let url = that.$URL_API + 'captcha/email/' + that.userNameE;
        if (that.userNameE.length && pattern.test(that.userNameE)) {
          that.$http.get(url).then((res) => {
            that.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              that.timer = setInterval(function () {
                $('.getCodeER').html((--second) + 's');
                if (second <= 0) {
                  $('.getCodeER').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(that.timer);
                  $('.getCodeER').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeER').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              });
            } else {
              $('.getCodeER').removeAttr("disabled").css("cursor", "pointer");
            }
          }).catch((req) => {
            $('.getCodeER').removeAttr("disabled").css("cursor", "pointer");
            that.showError(req.code, req.message)
          })
        } else {
          $('.getCodeER').removeAttr("disabled").css("cursor", "pointer");
          $('.help-tips-getCodeER').html('请核对邮箱').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      },
      getCodeMR(ev){
        let that = this;
        let second = 60;
        $('.getCodeMR').attr("disabled", true).css("cursor", "default");
        let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
        let url = that.$URL_API + 'captcha/mobile/' + that.userNameM;
        if (that.userNameM && pattern.test(that.userNameM)) {
          that.$http.get(url).then((res) => {
            that.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              that.timer = setInterval(function () {
                $('.getCodeMR').html((--second) + 's');
                if (second <= 0) {
                  $('.getCodeMR').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(that.timer);
                  $('.getCodeMR').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeMR').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            } else {
              $('.getCodeMR').removeAttr("disabled").css("cursor", "pointer");
            }
          }).catch((req) => {
            $('.getCodeMR').removeAttr("disabled").css("cursor", "pointer");
            that.showError(req.code, req.message)
          })
        } else {
          $('.getCodeMR').removeAttr("disabled").css("cursor", "pointer");
          $('.help-tips-getCodeMR').html('请核对手机号').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      },
      retrieval_style() {
        this.retrieval_text = !this.retrieval_text;
      },
      phoneRE() {
        let that = this;
        if (that.userNameM && that.userCordM && that.userPsdM && that.userPsdsM) {
          that.$http({
            url: this.$URL_API + 'forget/password',
            method: 'POST',
            data: {
              moe: that.userNameM,
              captcha: that.userCordM,
              password: md5(that.userPsdM),
              cfpassword: md5(that.userPsdsM)
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              this.$router.push('/login');
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
          })
        }
      },//手机找回密码js
      emailRE() {
        let that = this;
        if (that.userNameE && that.userCordE && that.userPsdE && that.userPsdsE) {
          that.$http({
            url: this.$URL_API + 'forget/password',
            method: 'POST',
            data: {
              moe: that.userNameE,
              captcha: that.userCordE,
              password: md5(that.userPsdE),
              cfpassword: md5(that.userPsdsE)
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              this.$router.push('/login');
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
          })
        }
      },//邮箱找回密码js
    },
    watch: {
      userPsdM(){
        let that = this;
        if (that.userPsdsM) {
          if (that.userPsdM === that.userPsdsM) {
            that.$store.state.phoneR.userpsds = true;
            $('.help-tips-psdsMR').html('');
          } else {
            that.$store.state.phoneR.userpsds = false;
            $('.help-tips-psdsMR').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPsdE(){
        let that = this;
        if (that.userPsdsE) {
          if (that.userPsdE === that.userPsdsE) {
            $('.help-tip-psdsER').html('');
            that.$store.state.emailR.userpsds = true;
          } else {
            that.$store.state.emailR.userpsds = false;
            $('.help-tip-psdsER').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPsdsE(){
        let that = this;
        if (that.userPsdE) {
          if (that.userPsdE === that.userPsdsE) {
            $('.help-tip-psdsER').html('');
            that.$store.state.emailR.userpsds = true;
          } else {
            that.$store.state.emailR.userpsds = false;
            $('.help-tip-psdsER').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }

        }
      },
      userPsdsM(){
        let that = this;
        if (that.userPsdM) {
          if (that.userPsdM === that.userPsdsM) {
            that.$store.state.phoneR.userpsds = true;
            $('.help-tips-psdsMR').html('');
          } else {
            that.$store.state.phoneR.userpsds = false;
            $('.help-tips-psdsMR').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      }
    }
  }
</script>
<style scoped>
  .egg-mm{
    padding: 0px 14px;
  }
  .egg-yzm{
    padding: 0px 12px;
  }
  .egg-sjhm{
      padding: 0px 14px;
  }
  .egg-xsts1{
    margin-left:24%;
    margin-right:25%;
    font-size:14px;
    font-weight:bold;
  }
  .form-control{
    height: 38px;
  }
  .has-success .input-group-addon {
      color: #fff;
      background-color: #2A8863;
      border-color: #2A8863;
      font-weight: bold;
  }
  .btn-success {
    color: #fff;
    background-color: #2A8863;
    border-color: #2A8863;
    height: 38px;
  }
  .retrieval-header span{
    font-size: 18px;
    font-weight: bold;
  }
  .retrieval{
    padding-top: 56px;
  }
  .country-name > p {
    display: flex;
    align-items: center;
  }

  .retrieval-box {
    width: 64rem;
    margin: 2rem auto;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
  }

  .retrieval-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.333rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    min-height: 4rem;
  }

  .retrieval-header > a {
    color: #2A8863;
    font-size: 18px;
    font-weight: bold;
    text-decoration:none;
  }

  .retrieval-from {
    margin-top: 3.33rem;
  }

  .form-group1 {
    display: flex;
    margin-bottom: 2rem;
  }

  .form-group1 > span {
    width: 13.33rem;
    padding: 1rem 1.25rem 0 1.25rem;
    font-weight: 400;
    font-size: 1.167rem;
    text-align: right;
  }

  .form-group1-box {
    width: 50%;
  }

  .form-group1-box .form-group-content {
    width: 100%;
  }

  .form-group1-box .form-group-content button {
    background: #16AB3B;
    color: #fff;
    height: 3.167rem;
    width: 14rem;
    text-align: center;
    line-height: 3.167rem;
    font-size: 1.167rem;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .form-group-content {
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0 1.25rem;
    border: 1px solid #e5e5e5;
    background: #fff;
  }

  .form-group-content > input {
    padding: 0.667rem 1rem;
    border: 0;
    outline: none;
    width: 100%;
    height: 1.833rem;
  }

  .area-code {
    width: 3.333rem;
    margin-left: 0.667rem;
    border-right: 1px solid #e5e5e5;
    line-height: 3.167rem;
  }

  .form-group-content .help-tips {
    width: 100%;
    height: 1.5rem;
  }

  .de {
    border: none;
    flex-direction: column;
  }

  .de input {
    border: 1px solid #e5e5e5;
    width: 93.8%;
  }

  .form-group-content1 {
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0 1.25rem;
    font-size: 14px;
    font-weight: bold;
  }

  .form-group-content1 label {
    display: flex;
    align-items: center;
  }

  .form-group-content1 label a {
    font-size: 1.167rem;
    color: #5b9bd1;
  }

  .form-group-content1 label a:hover {
    color: #2A8863;
    text-decoration: underline;
  }

  .retrieval-submit {
    width: 120%;
    padding: 8px 0;
    border: none;
    color: #FFFFFF;
    background: #2A8863;
    font-size: 18px;
    outline: none;
    cursor: pointer;
    margin-top: 1.8rem;
    margin-bottom: .8rem;
    margin-left: -25px;
  }

  .retrieval-submit:hover {
    background: #2A8863;
  }
  .retrieval-submit:active {
    background: #74A994;
  }
  .form-group-content1 .go-login {
    margin: 0 .7rem;
    color: #2A8863;
  }

  .form-group-content1 .go-login:hover {
    color: #2A8863;
    text-decoration: none;
  }

  .dd {
    border-top: 1px solid #eee;
    margin-top: 1.5rem;
  }

  .margin-bottom-0 {
    margin-bottom: 0;
  }

  .password-strength, .password-strengths {
    display: flex;
    margin-top: -1.5rem;
    align-items: center;

  }

  .password-strength span, .password-strengths span {
    width: 3rem;
    height: 1rem;
    margin-right: .8rem;
    background: #e9ecf3;
  }

  .password-strength-view, .password-strength-views {
    color: red;
  }
</style>
