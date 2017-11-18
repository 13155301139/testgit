<template>
  <div class="register" style="padding-top:56px;">
    <div class="register-box">
      <div class="register-header">
        <span>{{$t('Register')}}</span>
        <a href="javascript:" v-if="register_text" 
           @click="register_style()">
        {{$t('Useemail')}}</a>
        <a href="javascript:" v-if="!register_text" 
           @click="register_style()">
        {{$t('phone')}}</a>
      </div>
<!-- 手机注册样式重写开始 -->
      <div class="register-from" v-show="register_text">
        <form name="register1">
<!-- 手机注册-邀请码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-yqm"><i class="fa fa-handshake-o" aria-hidden="true" style="font-size:20px;"></i></span>
          <input type="text" class="form-control recommendCodeNewNUm"
                 :placeholder="$t('invitation')" v-model="recommendCodeNew"
                 minlength="6" maxlength="6" />
        </div>
        </div>
<!-- 手机注册-邀请码-结束 -->
<!-- 手机注册-手机号码-开始 -->
    <div class="form-group has-success has-feedback">
    <div class="input-group" style="margin-left:24%;margin-right:25%;">
      <span class="input-group-addon egg-sjhm"><i class="fa fa-mobile" aria-hidden="true" style="font-size:36px;"></i></span>
      <input type="text" class="form-control userNameIpt" aria-label="..."
            :placeholder="$t('Cellphone')" v-model="userNameM"
             onkeyup="this.value=this.value.replace(/\D/g,'')"
             onafterpaste="this.value=this.value.replace(/\D/g,'')"
             maxlength="11" />
      <div class="input-group-btn">
        <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">中国+86 <span class="caret"></span></button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">中国</a></li>
          <li><a href="#">香港</a></li>
          <li><a href="#">台湾</a></li>
          <li><a href="#">香港</a></li>
        </ul>
      </div>
      </div>
      <!-- 手机注册 判断手机号码是否正确 -->
      <div class="phone-tishi egg-xsts">
      </div>
      </div>
<!-- 手机注册-手机号码-结束 -->
<!-- 手机注册-密码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsd"
                 :placeholder="$t('Password')"v-model="userPasswordM"  minlength="6" maxlength="32" />
        </div>
        </div>
<!-- 手机注册-密码-结束 -->
<!-- 手机注册-确认密码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group"
              style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsds"
                 :placeholder="$t('Confirm')" v-model="userPasswordsM"minlength="6" maxlength="32"/>
        </div>
        <!--手机注册  密码不正确时在确认密码下显示-->
        <div class="help-tips-psds egg-xsts"></div>
        </div>

<!-- 手机注册-确认密码-结束 -->
<!-- 手机注册-手机验证码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-yzm"><i class="fa fa-commenting-o" aria-hidden="true" style="font-size:20px;"></i></span>
          <input type="text" class="form-control"
                 :placeholder="$t('Phonecode')"
                  v-model="captchM" maxlength="6">
          <span class="input-group-btn">
            <button class="btn btn-success getCodeM" type="button"
            @click="getCodeM($event)">{{$t('getcode')}}</button>
          </span>
        </div>
        </div>
<!-- 手机注册-手机验证码-开始 -->
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="checkbox" id="agree"/>
              <label for="agree">
                 &nbsp;{{$t('have')}}
                <router-link to="/userAgreement">{{$t('read')}}</router-link>
              </label>
            </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" :value="$t('Register')" class="register-submit"
                     @click="userRegisterM()"/>
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
<!-- 邮箱注册样式重写开始 -->
      <div class="register-from" v-show="!register_text">
<!-- 邮箱注册-邀请码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group"
              style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-yqm"><i class="fa fa-handshake-o" aria-hidden="true" style="font-size:20px;"></i></span>
          <input type="text" class="form-control recommendCodeNewNUm"
                 :placeholder="$t('invitation')" v-model="recommendCodeNew"
                   minlength="6" maxlength="6"/>
        </div>
        </div>
<!-- 邮箱注册-邀请码-结束 -->
<!-- 邮箱注册-邮箱-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group"
              style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true" style="font-size: 20px;"></i></span>
          <input type="email" class="form-control userNameEIpt"
                 :placeholder="$t('Email')" v-model="userNameE"
                 maxlength="32"/>
        </div>
        <div class="help-tips-userEmail egg-xsts"></div>
        </div>
<!-- 邮箱注册-邮箱-结束 -->
<!-- 邮箱注册-密码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group"
             style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsdE"
                 :placeholder="$t('Password')" v-model="userPasswordE"
                  minlength="6"maxlength="32" />
        </div>
        </div>
<!-- 邮箱注册-密码-结束 -->
<!-- 邮箱注册-确认密码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon egg-mm"><i class="fa fa-lock" aria-hidden="true" style="font-size:24px;"></i></span>
          <input type="password" class="form-control userPsdsE"
                 :placeholder="$t('Confirm')" v-model="userPasswordsE"  minlength="6"maxlength="32"/>
        </div>
        <div class="help-tip-psdsE egg-xsts"></div>
        </div>
<!-- 邮箱注册-确认密码-结束 -->
<!-- 邮箱注册-邮箱验证码-开始 -->
        <div class="form-group has-success has-feedback">
        <div class="input-group" style="margin-left:24%;margin-right:25%;">
          <span class="input-group-addon"><i class="fa fa-envelope-open-o" aria-hidden="true"  style="font-size:20px;"></i></span>
          <input type="text" class="form-control"
                 :placeholder="$t('verification')"
                  v-model="captchE" maxlength="6"/>
          <span class="input-group-btn">
            <button class="btn btn-success getCodeE" type="button"
            @click="getCodeE()">{{$t('getcode')}}</button>
          </span>
        </div>
        </div>
<!-- 邮箱注册-邮箱验证码-结束 -->
<!-- 邮箱注册样式重写结束 -->
         <div class="form-group1 margin-bottom-0">
          <span> </span>
          <div class="form-group-content1">
            <input type="checkbox" id="agree1"/>
            <label for="agree1">
              &nbsp;{{$t('have')}}
              <router-link to="/userAgreement">{{$t('read')}}</router-link>
            </label>
          </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
          <span> </span>
          <div class="form-group-content1">
            <input type="button" :value="$t('Register')"
                   class="register-submit" @click="userRegisterE()"/>
          </div>
          </div>
          <div class="form-group1 margin-bottom-0">
          <span> </span>
          <div class="form-group-content1">
            <span>{{$t('Has')}}</span>
            <router-link to="/login" class="go-login">&nbsp;{{$t('Direct')}}</router-link>
          </div>
          </div>
      </div>
      <div class="border-user-num" v-show="recommendCodeState">推荐人编号：{{recommendCodeNew}}</div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  export default{
    data() {
      return {
        register_text: true,
        options: [{
          value: '1',
          label: '中国'
        }, {
          value: '2',
          label: '美国'
        }, {
          value: '3',
          label: '日本'
        }, {
          value: '4',
          label: '台湾'
        }, {
          value: '5',
          label: '香港'
        }],
        value8: '中国',
        userPasswordE: '',
        userPasswordsE: '',
        userNameE: '',
        userPasswordM: '',
        userPasswordsM: '',
        userNameM: '',
        moveYZ: true,
        moveYZ1: true,
        timer: '',
        captchE: '',
        captchM: '',
        recommendCodeNew: '',
        recommendCodeState: false

      }
    },
    methods: {
//      邮箱注册逻辑
      register_style() {
        this.register_text = !this.register_text;
        this.moveYZ = true;
        this.moveYZ1 = true;
        clearInterval(this.timer);
      },
      userRegisterE() {
        let that = this;

        if(!that.$store.state.registerE.checkStyleE){
          that.showError(-1, '请先勾选注册协议');
          return;
        }

        if(!that.$store.state.registerE.username || !that.$store.state.registerE.userpsds){
          that.showError(-1, '账号或密码不正确');
          return;
        }

        if (that.userNameE && that.userPasswordE && that.userPasswordsE && that.captchE) {
          that.$http({
            url: this.$URL_API + 'register',
            method: 'POST',
            data: {
              loginUser: that.userNameE,
              loginPwd: md5(that.userPasswordE),
              cifLoginPwd: md5(that.userPasswordsE),
              flag: that.$store.state.registerE.checkStyleE,
              registerDevice: 'WEB',
              registerIp: '192.168.1.110',
              captch: that.captchE,
              recommendCode: that.recommendCodeState ? that.recommendCodeNew : ''
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            that.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              localStorage.setItem('username', that.userNameE);
              setTimeout(function () {
                that.$store.state.registerE.checkStyleE = false;
                that.$router.push('/login')
              }, 1500)
            }
          }).catch((req) => {
            that.showError(req.code, req.message)
          })
        }

      },
//      手机注册逻辑
      userRegisterM() {
        let that = this;

        if(!that.$store.state.registerM.checkStyleM){
          that.showError(-1, '请先勾选注册协议');
          return;
        }

        if(!that.$store.state.registerM.username || !that.$store.state.registerM.userpsds){
          that.showError(-1, '账号或密码不正确');
          return;
        }
        if (that.userNameM && that.userPasswordM && that.userPasswordsM && that.captchM) {
          that.$http({
            url: this.$URL_API + 'register',
            method: 'POST',
            data: {
              loginUser: that.userNameM,
              loginPwd: md5(that.userPasswordM),
              cifLoginPwd: md5(that.userPasswordsM),
              flag: that.$store.state.registerM.checkStyleM,
              registerDevice: 'WEB',
              registerIp: '120.0.0.1',
              captch: that.captchM,
              recommendCode: that.recommendCodeState ? that.recommendCodeNew : ''
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((data) => {
            that.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              localStorage.setItem('username', that.userNameM);
              setTimeout(function () {
                that.$store.state.registerM.checkStyleM = false;
                that.$router.push('/login')
              }, 1500)
            }
          }).catch((req) => {
            that.showError(req.code, req.message)
          })
        }
      },
//      mover (){
//              //          滑动验证
//              clearInterval(this.timer);
//              let that = this;
//              $('.move-btn-yanzheng').mousedown(function (event1) {
//                var $evt1 = event1 || window.event;
//                var $iOffsetL = $evt1.clientX - this.offsetLeft;
//                $(document).bind('mousemove', function (event2) {
//                  var $evt2 = event2 || window.event;
//                  var $iPosX = $evt2.clientX - $iOffsetL;
//                  var $widths = $('.move-yanzheng').width() - 36;
//                  if ($iPosX >= $widths / 2) {
//                    $('.em-color').css({color: "#fff"})
//                  } else {
//              $('.em-color').css({color: "#999"})
//            }
//            if ($iPosX >= 0 && $iPosX < $widths) {
//              $('.yanzheng-tishi').css({
//                width: $iPosX,
//                background: '#01aaef',
//                position: "absolute",
//                opacity: .8,
//                height: 30
//              });
//              $('.move-btn-yanzheng').css({left: $iPosX + 'px'});
//            } else {
//              that.moveYZ = false;
//            }
//          });
//          $(document).bind('mouseup', function (event3) {
//            var $evt3 = event3 || window.event;
//            var $iPosX3 = $evt3.clientX - $iOffsetL;
//            var $widths = $('.move-yanzheng').width() - 36;
//            if ($iPosX3 < $widths) {
//              $('.yanzheng-tishi').animate({width: 0});
//              $('.move-btn-yanzheng').animate({left: 0});
//              $('.em-color').css({color: "#999"})
//            }
//            else {
//              that.moveYZ = false;
//            }
//            $(document).unbind('mousemove');
//            $(document).unbind('mouseup');
//          });
//          return false;
//        });
//      },
//      movers (){
//        //          滑动验证
//        clearInterval(this.timer);
//        let that = this;
//        $('.move-btn-yanzhengs').mousedown(function (event1) {
//          var $evt1 = event1 || window.event;
//          var $iOffsetL = $evt1.clientX - this.offsetLeft;
//          $(document).bind('mousemove', function (event2) {
//            var $evt2 = event2 || window.event;
//            var $iPosX = $evt2.clientX - $iOffsetL;
//            var $widths = $('.move-yanzhengs').width() - 36;
//            if ($iPosX >= $widths / 2) {
//              $('.em-colors').css({color: "#fff"})
//            } else {
//              $('.em-colors').css({color: "#999"})
//            }
//            if ($iPosX >= 0 && $iPosX < $widths) {
//              $('.yanzheng-tishis').css({
//                width: $iPosX,
//                background: '#01aaef',
//                position: "absolute",
//                opacity: .8,
//                height: 30
//              });
//              $('.move-btn-yanzhengs').css({left: $iPosX + 'px'});
//            } else {
//              that.moveYZ1 = false;
//            }
//          });
//          $(document).bind('mouseup', function (event3) {
//            var $evt3 = event3 || window.event;
//            var $iPosX3 = $evt3.clientX - $iOffsetL;
//            var $widths = $('.move-yanzhengs').width() - 36;
//            if ($iPosX3 < $widths) {
//              $('.yanzheng-tishis').animate({width: 0});
//              $('.move-btn-yanzhengs').animate({left: 0});
//              $('.em-colors').css({color: "#999"})
//            }
//            else {
//              that.moveYZ1 = false;
//            }
//            $(document).unbind('mousemove');
//            $(document).unbind('mouseup');
//          });
//          return false;
//        });
//      },
      getCodeM(ev){
        let _this = this;
        ev.target.setAttribute('disabled', true);
        $('.getCodeM').attr("disabled", true).css("cursor", "default");
        let second = 60;
        let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
        let url = this.$URL_API + 'captcha/mobile/' + this.userNameM;
        if (this.userNameM.length !== 0 && pattern.test(this.userNameM)) {
          this.$http.get(url).then((data) => {
            this.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              this.timer = setInterval(function () {
                $('.getCodeM').html((--second) + 's');
                if (second < 0) {
                  $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(_this.timer);
                  ev.target.innerHTML = '获取验证码'
//                  $('.getCodeM').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeM').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            } else {
              $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
            }
          }).catch((req) => {
            $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
            this.showError(req.code, req.message)
          })
        } else {
          $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
          $('.help-tips-getCodeM').html('请核对手机号').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      },
      getCodeE(){
        let _this = this;
        let second = 60;
        $('.getCodeE').attr("disabled", true).css("cursor", "default");
        let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
        let url = this.$URL_API + 'captcha/email/' + this.userNameE;
        if (this.userNameE.length !== 0 && pattern.test(this.userNameE)) {
          this.$http.get(url).then((data) => {
            this.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              this.timer = setInterval(function () {
                $('.getCodeE').html((--second) + 's');
                if (second <= 0) {
                  $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(_this.timer);
                  $('.getCodeE').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeE').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            } else {
              $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
            }
          }).catch((req) => {
            $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
            this.showError(req.code, req.message)
          })
        } else {
          $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
          $('.help-tips-getCodeE').html('请核对邮箱').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      }
    },
    mounted() {
      let that = this;
      let url = window.location.href;
      if (url.indexOf('?id') !== -1) {
        this.recommendCodeNew = url.substr(-6);
        this.recommendCodeState = true;
//        alert(this.recommendCodeNew);
      } else {
        this.recommendCodeState = false;
      }
      //选中协议
      {
        let that = this;
        $('#agree1').click(function () {
          that.$store.state.registerE.checkStyleE = $(this).is(':checked');
//          //console.log($(this).is(':checked'))
        });
        $('#agree').click(function () {
          that.$store.state.registerM.checkStyleM = $(this).is(':checked');
//          //console.log($(this).is(':checked'))
        })

      }
//      {
//        this.mover();
//        this.movers()
//      }
//      手机号码正则验证
      {
        let that = this;
        $('.userNameIpt'). blur(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          //let pattern = /^1\d{10}$/;
          if(!pattern.test(that.userNameM)) {
            that.$store.state.registerM.username = false;
            $('.phone-tishi').html('您输入的号码格式不正确');
          } else {
            that.$store.state.registerM.username = true;
            $('.phone-tishi').html('');
          }

          that.$http({
            url: that.$URL_API + 'register/check/' + that.userNameM,
            method: 'GET',
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            if(res.data.message=="用户名已存在"){
              $('.phone-tishi').html(res.data.message);
            }

          })
        });
        //用户名检测
//        $('.userNameIpt').blur(function () {
//          that.$http({
//            url: that.$URL_API + 'register/check/' + that.userNameM,
//            method: 'GET',
//            headers: {
//              "X-Requested-With": "XMLHttpRequest",
//              "Content-Type": "application/json;charset=UTF-8",
//            }
//          }).then((res) => {
//              if(res.data.message=="用户名已存在"){
//                $('.phone-tishi').html('用户名已存在');
//              }
//
// //           that.showError(res.data.code, res.data.message);
//
//           //console.log(res,'用户名不存在')
//          })
//        });

      }
      //邮箱正则验证
      {
        let that = this;
        $('.userNameEIpt').blur(function () {
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          if (pattern.test(that.userNameE)) {
            $('.help-tips-userEmail').html('');
            that.$store.state.registerE.username = true;
          } else {
            that.$store.state.registerE.username = false;
            $('.help-tips-userEmail').html('您输入的邮箱格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        });
      }
      //获取验证码
      {
        let that = this;
//        $('.getCodeM').click(function () {
//          let second = 60;
//          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
//          let url = that.$URL_API + 'captcha/mobile/' + that.userNameM;
//          if (that.userNameM.length !== 0 && pattern.test(that.userNameM)) {
//            that.$http.get(url).then((data) => {
//              that.showError(data.data.code, data.data.message);
//              if (data.data.code === 200) {
//                $('.getCodeM').attr("disabled", true).css("cursor", "default");
//                that.timer = setInterval(function () {
//                  $('.getCodeM').html((--second) + 's');
//                  if (second <= 0) {
//                    $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
//                    clearInterval(that.timer);
//                    $('.getCodeM').html('获取验证码');
//                  }
//                }, 1000);
//                $('.help-tips-getCodeM').html('请输入验证码').css({
//                  alignSelf: 'flex-start',
//                  color: 'red',
//                  marginLeft: '1.5rem'
//                })
//              }
//            }).catch((req) => {
//              that.showError(req.code, req.message)
//            })
//          } else {
//            $('.help-tips-getCodeM').html('请核对手机号').css({
//              alignSelf: 'flex-start',
//              color: 'red',
//              marginLeft: '1.5rem'
//            })
//          }
//        });
//        $('.getCodeE').click(function () {
//          let second = 60;
//          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
//          let url = that.$URL_API + 'captcha/email/' + that.userNameE;
//          if (that.userNameE.length !== 0 && pattern.test(that.userNameE)) {
//            that.$http.get(url).then((data) => {
//              that.showError(data.data.code, data.data.message);
//              if (data.data.code === 200) {
//                $('.getCodeE').attr("disabled", true).css("cursor", "default");
//                that.timer = setInterval(function () {
//                  $('.getCodeE').html((--second) + 's');
//                  if (second <= 0) {
//                    $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
//                    clearInterval(that.timer);
//                    $('.getCodeE').html('获取验证码');
//                  }
//                }, 1000);
//                $('.help-tips-getCodeE').html('请输入验证码').css({
//                  alignSelf: 'flex-start',
//                  color: 'red',
//                  marginLeft: '1.5rem'
//                })
//              }
//            }).catch((req) => {
//              that.showError(req.code, req.message)
//            })
//          } else {
//            $('.help-tips-getCodeE').html('请核对邮箱').css({
//              alignSelf: 'flex-start',
//              color: 'red',
//              marginLeft: '1.5rem'
//            })
//          }
//        });
      }
      {
        $('.userPsdE').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.userPasswordE, 'password-strengths', 'password-strength-views');
          })
        });
        $('.userPsdE').mouseleave(function () {
          $('.userPsdE').mousedown = null;
        })
        $('.userPsd').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.userPasswordM, 'password-strength', 'password-strength-view');
          })
        });
        $('.userPsd').mouseleave(function () {
          $('.userPsd').mousedown = null;
        })
      }
    },
    watch: {
      userPasswordE(){
        let that = this;
        if (that.userPasswordsE) {
          if (that.userPasswordE === that.userPasswordsE) {
            $('.help-tip-psdsE').html('');
            that.$store.state.registerE.userpsds = true;
          } else {
            that.$store.state.registerE.userpsds = false;
            $('.help-tip-psdsE').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPasswordM(){
        let that = this;
        if (that.userPasswordsM) {
          if (that.userPasswordM === that.userPasswordsM) {
            that.$store.state.registerM.userpsds = true;
            $('.help-tips-psds').html('');
          } else {
            that.$store.state.registerM.userpsds = false;
            $('.help-tips-psds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'

            })
          }
        }
      },
      userPasswordsE(){
        let that = this;
        if (that.userPasswordE) {
          if (that.userPasswordE === that.userPasswordsE) {
            $('.help-tip-psdsE').html('');
            that.$store.state.registerE.userpsds = true;
          } else {
            that.$store.state.registerE.userpsds = false;
            $('.help-tip-psdsE').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPasswordsM(){
        let that = this;
        if (that.userPasswordM) {
          if (that.userPasswordM === that.userPasswordsM) {
            that.$store.state.registerM.userpsds = true;
            $('.help-tips-psds').html('');
          } else {
            that.$store.state.registerM.userpsds = false;
            $('.help-tips-psds').html('两次输入的密码不一致').css({
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
  label{
    font-size: 14px;
  }
  .egg-yqm{
    padding: 0px 9px;
  }
  .egg-yzm{
    padding: 0px 12px;
  }
  .egg-mm{
    padding: 0px 14px;
  }
  .egg-sjhm{
    padding: 0px 14px;
  }
  .egg-xsts{
    margin-left:24%;
    margin-right:25%;
    font-size:14px;
    font-weight:bold;
  }
  a{
    text-decoration: none;
  }
  .form-control{
    height: 38px;
  }
  .register-header span{
    font-size: 18px;
    font-weight: bold;
  }
  .btn-success{
    background-color: #2A8863;
    border-color: #2A8863;
    height: 38px;
   font-weight: bold;
  }
  .has-success .input-group-addon {
    color: #fff;
    background-color: #2A8863;
    border-color: #3c763d;
    font-weight: bold;
  }
  .phone-tishi {
    color: red !important;
  }

  .el-input__inner {
    border: none !important;
  }

  .country-name > p {
    display: flex;
    align-items: center;
  }

  .form-group-content-select {
    width: 100%;
  }

  .form-group-content-option {
    width: 100%;
  }

  .register-box {
    width: 64rem;
    margin: 2rem auto;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
    border: 1px solid #e9ecf3;
    box-shadow: 0 0 10px rgba(233, 236, 243, .8);
  }

  .register-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.333rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    min-height: 4rem;
  }

  .register-header > a {
    color: #2A8863;
    font-size: 16px;
    font-weight: bolder;
  }

  .register-from {
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

  .form-group1-box .form-group-content a {
    background: #01aaef;
    color: #fff;
    height: 3.167rem;
    width: 14rem;
    text-align: center;
    line-height: 3.167rem;
    font-size: 1.167rem;
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
    cursor: pointer;
    outline: none;
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
    color: #2A8863;
  }

  .form-group-content1 label a:hover {
    color: #2A8863;
    text-decoration: underline;
    text-decoration:none;
  }

  .register-submit {
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

  .register-submit:hover {
    background: #2A8863;
  }
  .register-submit:active {
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

  .move-yanzheng, .move-yanzhengs {
    position: relative;
  }

  .yanzheng-tishi, .yanzheng-tishis {
    position: absolute;
  }

  .move-yanzheng > span, .move-yanzhengs > span {
    position: absolute;
    height: 100%;
    width: 36px;
    box-sizing: border-box;
    padding: 0 1rem;
    line-height: 2.5rem;
    background: #01aaef;
    color: #fff;
    cursor: pointer;
    z-index: 2;
  }

  .move-yanzheng > em, .move-yanzhengs > em {
    position: absolute;
    left: 45%;
    color: #999;
    height: 100%;
    line-height: 2.5rem;
  }

  .border-user-num {
    width: 100%;
    text-align: right;
    color: #999;
    font-size: 14px;
  }
</style>
