<template>
  <div class="bindPhone">
    <div class="title-user-profile green">手机绑定</div>
    <div class="bindPhone-from">
      <div class="bindPhone-from-group">
        <span>国家/地区</span>
        <div>
          <input type="text" value="中国" disabled class="disabled-input"/>
          <span class="bindPhoneNum-tips-city"></span>
        </div>
      </div>
      <div class="bindPhone-from-group">
        <span>手机号码</span>
        <div>
          <div class="cityCord"><span>{{cityCord}}</span><input type="text" placeholder="手机号码" v-model="bindPhoneNum"
                                                                class="bindPhoneNum-input"/></div>
          <span class="bindPhoneNum-tips"></span>
        </div>
      </div>
      <div class="bindPhone-from-group">
        <span>验证码</span>
        <div>
          <div class="bindPhone-input-box">
            <input type="text" placeholder="验证码" v-model="bindPhoneRYZ" class="bindPhoneRYZ-input" maxlength="6"/>
            <a @click="bindPhoneRgetCord()">{{bindPhoneRGetCord}}</a>
          </div>
          <span class="bindPhoneRYZ-tips"></span>
        </div>
      </div>
      <div class="bindPhone-from-group">
        <span>手机验证码</span>
        <div>
          <div class="bindPhone-input-box">
            <input type="text" placeholder="手机验证码" v-model="bindPhoneRCaptcha" maxlength="6"/>
            <button class="bindGetEmailCord">获取验证码</button>
          </div>
          <span class="bindPhoneRCaptcha-tips"></span>
        </div>
      </div>
      <div class="bindPhone-from-group">
        <span>&nbsp;</span>
        <div>
          <a href="javascript:;" class="QbindPhone" @click="QbindPhone()">确认绑定</a>
          <span class="phone-tips"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        bindPhoneNum: '',
        bindPhoneRCaptcha: '',
        bindPhoneRYZ: '',
        bindPhoneRGetCord: '',
        cityCord: '+86'
      }
    },
    mounted() {
      let that = this;
      that.bindPhoneRgetCord();
      {
        $('.bindPhoneRYZ-input').keyup(function () {
          if (that.bindPhoneRYZ == that.bindPhoneRGetCord) {
            $('.bindPhoneRYZ-tips').html('');
            that.$store.state.bindPhoneNum.YZ = true;
          } else {
            $('.bindPhoneRYZ-tips').html('请核对验证码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.bindPhoneNum.YZ = false;
          }
        })
      }//验证码校验
      {
        $('.bindPhoneNum-input').keyup(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          if (pattern.test(that.bindPhoneNum)) {
            $('.bindPhoneNum-tips').html('');
            that.$store.state.bindPhoneNum.phone = true;
          } else {
            that.$store.state.bindPhoneNum.phone = false;
            $('.bindPhoneNum-tips').html('您输入的手机格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        });
      } //手机正则验证
      {
        $('.bindGetEmailCord').click(function () {
          $('.bindGetEmailCord').attr("disabled", true).css("cursor", "default");
          let second = 60;
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          let url = that.$URL_API + 'captcha/email/' + that.bindPhoneNum;
          if (that.bindPhoneNum.length !== 0 && pattern.test(that.bindPhoneNum)) {
            that.$http.get(url).then((res) => {
              that.showError(res.data.code, res.data.message);
              if (res.data.code === 200) {

                that.timer = setInterval(function () {
                  $('.bindGetEmailCord').html((--second) + 's');
                  if (second <= 0) {
                    $('.bindGetEmailCord').removeAttr("disabled").css("cursor", "pointer");
                    clearInterval(that.timer);
                    $('.bindGetEmailCord').html('获取验证码');
                  }
                }, 1000);
                $('.bindPhoneRCaptcha-tips').html('请输入验证码').css({
                  alignSelf: 'flex-start',
                  color: 'red',
                  marginLeft: '1.5rem'
                })
              } else {
                $('.bindGetEmailCord').removeAttr("disabled").css("cursor", "pointer");
              }
            }).catch((req) => {
              $('.bindGetEmailCord').removeAttr("disabled").css("cursor", "pointer");
              that.showError(req.code, req.message)
            })
          } else {
            $('.bindGetEmailCord').removeAttr("disabled").css("cursor", "pointer");
            $('.bindPhoneRCaptcha-tips').html('请核对手机号').css({
              alignSelf: 'flex-start',
              color: 'red',
              marginLeft: '1.5rem'
            })
          }
        });
      }
    },
    methods: {
      bindPhoneRgetCord() {
        let num = parseInt(Math.random() * 10000);//0~9999
        if (num < 10) {
          num = '000' + num;
        } else if (num < 100) {
          num = '00' + num;
        } else if (num < 1000) {
          num = '0' + num;
        }
        this.bindPhoneRGetCord = num;
      },
      QbindPhone() {
        let that = this;
        //console.log(that.$store.state.bindPhoneNum.phone, that.$store.state.bindPhoneNum.YZ);
        if (that.$store.state.bindPhoneNum.phone && that.$store.state.bindPhoneNum.YZ) {
          that.$http({
            url: this.$URL_API + 'authentication/mobileAuth',
            method: 'POST',
            data: {
              mobile: that.bindPhoneNum,
              captcha: that.bindPhoneRGetCord,
              mobileCountry: that.cityCord
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            that.showError(res.data.code, res.data.message);
            if(res.data.code===200){
              that.$router.push('/settings');
            }
          }).catch((req) => {
            that.showError(req.code, req.message)
          })
        }
      }
    }
  }
</script>
<style scoped>
.title-user-profile {
    height: 50px;
    
    line-height: 50px;

    font-size: 18px;
    
    font-weight:bolder;
    padding-left: 20px;

    color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  .green {
      background: #2A8863;
    }
  .bindPhone {
    font-size: 1.167rem;
  }

  .bindPhone .bindPhone-title {
    border-bottom: 1px solid #ddd;
  }

  .bindPhone .bindPhone-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .bindPhone-from {
    padding: 4rem 0;
  }

  .bindPhone-from-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
    height: 5rem;
  }

  .bindPhone-from-group > span:nth-of-type(1) {
    padding-top: 0.583rem;
    width: 20rem;
    margin-bottom: 0;
    text-align: right;
    margin-right: 2rem;
  }

  .bindPhone-from-group > div {
    width: 28.8rem;
    margin-bottom: -1.6rem;
  }

  .bindPhone-input-box {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
  }

  .cityCord {
    display: flex;
    width: 28.8rem;
    align-items: center;
    border: 1px solid #ddd;
  }

  .cityCord > span {
    width: 15%;
    height: 2.75rem;
    line-height: 2.75rem;
    text-align: center;
    border-right: 1px solid #ddd;
  }

  .cityCord > input {
    border: none !important;
  }

  .bindPhone-input-box > input {
    border: none !important;
    width: 70% !important;
  }

  .bindPhone-input-box > a, .bindPhone-input-box > button {
    background: #2A8863;
    color: #fff;
    text-align: center;
    width: 30%;
    height: 36px !important;
    line-height: 35px !important;
    cursor: pointer;
    border: none;
  }

  .bindPhone-from-group > div > input, .bindPhone-from-group > div > select, .bindPhone-input-box > input, .cityCord > input {
    width: 100%;
    padding: 0.667rem 1rem;
    box-sizing: border-box;
    border: none;
    border: 1px solid #ddd;
  }

  .bindPhone-from-group > div > span, .bindPhone-input-box > a, .bindPhone-input-box > button {
    height: 1.5rem;
  }

  .QbindPhone {
    width: 10.833rem;
    text-align: center;
    padding: 10px 40px;
    background: #2A8863;
    color: #fff;
    border-radius: .133rem;
  }

  .disabled-input {
    cursor: no-drop;
  }
</style>
