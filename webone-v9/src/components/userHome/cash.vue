<template>
  <!-- 全新修改开始 -->
  <div class="finance-rd">
    <div class="title-user-profile green">{{$t('Withdrawl')}}</div>
    <accountSelected v-if="accountSelectedVal !== ''"
                     :title="'账户选择'"
                     :data=this.accountList
                     :value="accountSelectedVal"
                     @update:value="val => switchAccount(val)"
    />

    <div class="cash-container">
      <accountSelected v-if="currencySelecedVal !== ''"
                       :title="'提现/提币'"
                       :data=this.accountData[this.accountSelectedVal]
                       :value="currencySelecedVal"
                       :type="'classical'"
                       @update:value="val => switchCurrency(val)"
      />
      <div class="cash-form-container">
        <transition enter-active-class="animated fadeIn">
          <div class="recharge-group">
            <div class="title">
              提现到:
            </div>
            <transition enter-active-class="animated fadeIn">
              <div class="recharge-group-radio-select-bank btcAdr" v-show="moneyStyle">
                <div v-for="(item, index) in currencyAdr">
                  <input name="select-bank-cash1" type="radio" :id="'recharge-mode-cny20-cash1'+index"
                         :value="index+1"
                         :checked="index===0?'checked':''" :address="item.address"/>
                  <label :for="'recharge-mode-cny20-cash1'+index"
                         :class="index===0?'recharge-group-radio-checked':''">
                    <p>{{item.currency | translate}}地址 {{index + 1}}</p>
                    <p>{{item.address}}</p>
                  </label>
                </div>
                <div>
                  <input name="select-bank-cash1" type="radio" id="recharge-mode-cny22-cash1" value="0"/>
                  <label for="recharge-mode-cny22-cash1" class="add-bank-select-bank-btn" @click="goAddAdr()">
                    <i class="iconfont">&#xe689;</i>
                    <em>添加新地址</em>
                  </label>
                </div>

              </div>
            </transition>
          </div>
        </transition>
        <div class="recharge-group">
          <div class="title">
            金额:
          </div>
          <transition enter-active-class="animated fadeIn">
            <div class="cash-btc" v-show="moneyStyle">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="this.caculateMaxWithdraw()"
                  v-model="W_Money">
              </div>
              <section class="select-shouxufei" v-show="FreeShow">
                <p>选择手续费</p>
                <div class="section-div-label">
                  <div v-for="(item,index) in Fee">
                    <input type="radio" name="select-Service-Charge" :id="'Service-Charge-1'+index"
                           :value="item.fee"/>
                    <label :for="'Service-Charge-1'+index">{{item.fee}} {{item.currency}}</label>
                  </div>
                </div>
                <p>提高手续费可以在一定程度上提高网络的确认速度</p>
              </section>

              <div class="account-pwd-form-wrap">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    v-model="moneyPsd"
                    placeholder="资金密码"
                  />
                </div>
                <router-link to="/settings/modifyFullPsd">忘记资金密码？</router-link>
              </div>
              <section>
                <div class="section-div-label">
                  <input type="radio" name="cash-btc-style-yz" id="cash-btc-style-yz-email" value="emails"
                         v-show="EMAIL"/>
                  <label for="cash-btc-style-yz-email" v-show="EMAIL">邮箱验证</label>
                  <input type="radio" name="cash-btc-style-yz" id="cash-btc-style-yz-phone" value="mobiles"
                         v-show="MOBILE"/>
                  <label for="cash-btc-style-yz-phone" v-show="MOBILE">手机验证</label>
                </div>
              </section>

              <div class="form-group validate-code-wrap">
                <input
                  type="text"
                  class="form-control egg-txyzm"
                  placeholder="验证码"
                  v-model="serverYZ"
                />
                <button class="btn btn-success" :disabled="captchaDisabled" @click="getYZCode($event)">发送验证码</button>
              </div>
              <button class="btn btn-success" @click="QCash1($event)">确认提现</button>
            </div>
          </transition>
          <cashLog :currency="this.currencySelecedVal" :legalCurrency="accountSelectedVal"></cashLog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import cashLog from '../lettle_components/cashLog.vue';
  import {mapGetters} from 'vuex';
  import accountSelected from './accountSelected'

  export default {
    data() {
      return {
        accountSelectedVal: '',
        currencySelecedVal: '',//当前币种
        accountList: [], //账户列表
        accountData: {}, //账户及支持币种
        captchaDisabled: false, //验证码按钮是否无效

        account: true,
        moneyStyle: true,
        currencyAdr: [],//地址
        moneyControl: {},//资金控制
        W_Money: '',//提现数量
        FEE: '',//手续费
        moneyPsd: '',//资金密码
        serverYZ: '',//验证码
        Fee: [],//数字货币手续费
        FreeShow: true,
        CurrencyFee: '',//数字货币费率控制
        AccountZ: '',
        EMAIL: false,
        MOBILE: false,
        userMoney: {},
      }
    },
    components: {
      cashLog,
      accountSelected
    },
    created() {
    },
    mounted() {
      this.listAccounts();
      this.getUserMoney();

      {
        if (sessionStorage.getItem('EMAIL')) {
          this.EMAIL = true;
        }
        if (sessionStorage.getItem('MOBILE')) {
          this.MOBILE = true;
        }
      }


      let that = this;

      {
        $("input[name='cash-btc-style-yz']").change(function () {
          $(this).next().addClass('cash-btc-select-color').siblings().removeClass('cash-btc-select-color');
        })
        $("input[name='cash-btc-style-yz1']").change(function () {
          $(this).next().addClass('cash-btc-select-color').siblings().removeClass('cash-btc-select-color');
        })
      }

      {
        $('.btc-num-input input').keyup(function () {
          if (isNaN(that.W_Money)) {
            that.W_Money = '';
            $('.btc-num-input-tips').html('请输入数字');
          }
          if (parseFloat($(this).val()) < that.CurrencyFee.minWithdraw) {
            $('.btc-num-input-tips').html('最小提现数量为 ' + that.CurrencyFee.minWithdraw + ' ' + that.CurrencyFee.currency);
          } else if (parseFloat($(this).val()) > that.CurrencyFee.maxWithdraw) {
            $('.btc-num-input-tips').html('最大提现数量为 ' + that.CurrencyFee.maxWithdraw + ' ' + that.CurrencyFee.currency);
          } else {
            $('.btc-num-input-tips').html();
          }
        });
      }//数字货币资金控制
    },
    methods: {

      //计算最多提现
      caculateMaxWithdraw() {

        var max = ((
          this.userMoney[this.currencySelecedVal + this.accountSelectedVal] >
          this.CurrencyFee.maxWithdraw) ? this.CurrencyFee.maxWithdraw :
          this.userMoney[this.currencySelecedVal + this.accountSelectedVal]);

        max = max ? max.toFixed(4) : '0';

        return '本次最多可提' + max +  ' ' + this.currencySelecedVal;

      },

      goAddAdr() {
        if (localStorage.getItem('real')) {
          this.$router.push('/accountManagement/addCurrencyAdr/' + this.currencySelecedVal)
        } else {
          this.showError('', '未实名认证');
          this.$router.push('/settings/user')
        }
      },

      //获取提现地址
      getCashAdr() {
        this.$http({
          url: this.$URL_API + 'digital/withdrawInfo/' + this.currencySelecedVal,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.currencyAdr = res.data.data;
          }
        }).then(() => {
          //btc提现地址
          $("input[name='select-bank-cash1']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            sessionStorage.setItem('currencyAdr', $(this).attr('address'))
          })
        })
        this.closeNum();
      },

      //获取验证码
      getYZCode(ev) {
        let code = $("input[name='cash-btc-style-yz']:checked").val();
        if (code) {
          ev.target.setAttribute('disabled', 'true');
          this.captchaDisabled = true;

          this.$http({
            url: this.$URL_API + 'captcha/' + code,
            method: 'GET',
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + this.$store.state.token,
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              let s = 60;
              let ts = setInterval(function () {
                ev.target.innerHTML = (--s) + 's';
                if (s <= 0) {
                  clearInterval(ts);
				  $('.btn-success').removeAttr("disabled").css("cursor", "pointer");
                  ev.target.innerHTML = '获取验证码';
                  this.captchaDisabled = false;
//                  ev.target.setAttribute('disabled', 'false');
                }
              }, 1000);
            }
          }).catch((req) => {
            this.captchaDisabled = false;
            this.showError(req.code, req.message)
          })
        } else {
          this.showError('', '请选择验证方式')
        }
      },

      //数字货币提现
      QCash1(ev) {
        //手续费
        let fee = $("input[name='select-Service-Charge']:checked").val();
        let nextd;
        if (this.FreeShow) {
          nextd = fee ? true : false;
        } else {
          nextd = true;
        }
        let adr = sessionStorage.getItem('currencyAdr');
        let val = $("input[name='cash-btc-style-yz']:checked").val();
        if (!nextd) {
          this.showError('', '请选择手续费')
        }
        if (this.moneyPsd && this.W_Money && this.serverYZ && nextd) {
          if (this.W_Money >= this.CurrencyFee.minWithdraw && this.W_Money <= this.CurrencyFee.maxWithdraw && this.W_Money <= this.userMoney[this.currencySelecedVal + this.Account]) {
            ev.target.innerHTML = '处理中...';
            this.$http({
              url: this.$URL_API + 'digital/withdraw',
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Authorization': 'Bearer ' + this.$store.state.token,
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: {
                digtalAddr: adr,
                legalCurrency: this.accountSelectedVal,
                currency: this.currencySelecedVal,
                amount: this.W_Money,
                fee: this.FreeShow ? fee : 0,
                types: val,
                captcha: this.serverYZ,
                capitalPwd: md5(this.moneyPsd)
              }
            }).then((res) => {
              this.showError(res.data.code, res.data.message);
              if (res.data.code === 200) {
                ev.target.innerHTML = '确认提现';
                this.closeNum();
                this.$router.push('/cash/cashLog')
              }
            }).catch((req) => {
              this.showError(req.code, req.message);
              ev.target.innerHTML = '确认提现';
            })
          } else {
            this.showError('', '请输入正确提现数量');
          }
        } else {
          this.showError('', '请检查是否输入完整');
        }
      },
      //获取数字货币提现手续费
      getFee() {
        this.getRate();
        this.$http({
          url: this.$URL_API + 'digital/fee/' + this.currencySelecedVal,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          },
        }).then((res) => {
          if (res.data.code === 200) {
            this.Fee = res.data.data;
            this.FreeShow = res.data.data.length > 0;
          }
        }).then(() => {
          //提现速率
          $("input[name='select-Service-Charge']").change(function () {
            $(this).parent().addClass('cash-btc-select-color').siblings().removeClass('cash-btc-select-color');
          })
        })
      },
      //获取费率
      getRate() {
        this.$http({
          url: this.$URL_API + 'digital/rates/' + this.currencySelecedVal,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          },
        }).then((res) => {
          if (res.data.code === 200) {
            this.CurrencyFee = res.data.data;
          }
        })
      },
      closeNum() {
        this.W_Money = '';
        this.serverYZ = '';
        this.moneyPsd = '';
      },


      //获取用户资金信息
      getUserMoney() {
        this.$http({
          url: this.$URL_API + 'capital/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.$set(this.userMoney, res.data.data[i].currency + res.data.data[i].legalMoney, res.data.data[i].amount);
          }
        })
      },

      //切换账户
      switchAccount(account) {
        this.accountSelectedVal = account;
      },

      //切换币种
      switchCurrency(currency) {
        this.currencySelecedVal = currency;
        this.getCashAdr();
        this.getFee();
      },

      //获取账户列表以及账户支持的币种
      listAccounts() {
        this.$http({
          url: this.$URL_API + 'commodity/account',
          method: 'POST',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          data: {
            recharge: true
          }
        }).then((res) => {
          this.accountData = res.data.data;
          for (var key in this.accountData) {
            this.accountList.push(key);
          }
          //设置默认账户
          this.accountSelectedVal = this.accountList[0];
          //设置默认币种
          this.currencySelecedVal = this.accountData[this.accountSelectedVal][0];
          this.getCashAdr();
          this.getFee();
        })
      },

    }
  }
</script>
<style lang="less" scoped>
  .egg-txyzm{
       border-top-left-radius: 4px;
       border-bottom-left-radius: 4px;
       border-top-right-radius: 0px;
       border-bottom-right-radius: 0px;
  }
  .form-group{
      flex-direction: inherit;
  }
  .btn{
    font-weight:bolder;
  }
  .btn-success:hover{
    color: #fff;
    background-color: #74A994;
    border-color: #74A994;
  }
  .btn-success{
    color: #fff;
    background-color: #2A8863;
    border-color: #2A8863;
  }
  label {
    display: inline-block;
    max-width: 100%;
    font-weight: 900;
    font-size: 14px;
  }
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
  a {
    text-decoration: none;
  }

  .cash-container {
    padding: 10px 0 30px;

    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .cash-form-container {
    padding: 10px 20px 20px;

    .title {
      height: 36px;
      line-height: 36px;

      font-size: 15px;
      font-weight:bolder;
      border-bottom: 1px solid #eee;
      margin-bottom: 1.667rem;
    }

  }

  .add-bank-select-bank-btn {

    background: #f4f4f4;

    width: 160px;

    height: 100px;

    margin: 15px 15px 15px 0;

    text-align: center;

    color: #2A8863;

    .iconfont {
      display: block;
      margin-top: 15px;
    }

    em {
      margin-left: 0 !important;
    }

  }

  .cash-btc {
    padding: 20px 0;

    .form-group {
      width: 46%;
    }
  }

  .account-pwd-form-wrap {
    display: flex;

    .form-group {
      width: 36%;
    }
    a {
      display: block;
      height: 36px;
      line-height: 36px;

      color: #ff4a0c;

      padding-left: 10px;

      font-size: 14px;
      font-weight: bolder;
    }
  }

  .validate-code-wrap {
    display: flex;

    .btn {
      margin-left: -1px;

      border-radius: 0 4px 4px 0;
    }

  }

  /*全新修改开始*/
  .table-bordered > thead > tr > td, .table-bordered > thead > tr > th {
    border-bottom: 1px solid #eff0f0;
  }

  .table thead tr th {
    text-align: center;
    vertical-align: middle;
  }

  .table thead tr th {
    height: 45px;
    white-space: nowrap !important;
    font-size: 12px;
  }

  #ListTable th {
    background: #f6f6f6;
  }

  /*.bk-onekey-form {
    padding: 0px 20px ;
  }*/
  .bk-onekey-form .chooseczbank p a {
    margin-left: 10px;
    cursor: pointer;
  }

  p {
    margin: 0 0 10px;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }

  .bk-onekey-form .input-group {
    text-align: left;
    color: #3c515e;
  }

  .bk-onekey-form .chooseczbank {
    padding-top: 15px;
    font-size: 14px;
    padding-left: 15px;
  }

  .bk-onekey-form .form-group .col-sm-8 {
    width: 80%;
    padding-right: 0;
  }

  .bk-onekey-form .form-group .col-sm-4 {
    width: 20%;
  }

  .bk-onekey-form .line-2 .control-label {
    padding-top: 15px;
    padding-left: 15px;
  }

  .bk-onekey-form .control-label {
    color: #3c515e;
    font-size: 14px;
    font-weight: normal;
  }

  .bilist a.on em, .bilist a:hover em {
    /*background: url(/statics/img/v2/user/right1botbule.png);*/
    background-size: cover;
    display: block;
  }

  .bilist a.on, .bilist a:hover {
    border: 1px solid #16AB3B;
    color: #16AB3B;
    background-color: rgba(22, 171, 59, 0.04);
  }

  .bilist a {
    padding: 0 26px 0 25px;
    height: 34px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 0;
    margin-right: 5px;
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
    color: #5d686d;
    position: relative;
    float: left;
    font-weight: bold;
  }

  .bilist {
    text-align: left;
    height: 34px;
  }

  .bk-onekey-form .form-horizontal .form-group {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .icon {
    width: 15px;
    height: 15px;
    background-image: url(../../assets/img/banklogo/pay_icon_sin.png);
    background-size: cover;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }

  .btn-group > .btn, .btn-group-vertical > .btn {
    position: relative;
    float: left;
  }

  .bk-onekey a.sinspan {
    padding-left: 0 !important;
    color: #353d41 !important;
    cursor: default;
  }

  .btn-group > .btn:first-child {
    margin-left: 0;
  }

  .bk-tabList-hd .btn-group .btn {
    border-radius: 0;
    border-bottom: 0;
    font-size: 14px;
    min-width: 113px;
    padding: 15px 12px;
  }

  .bk-onekey .bk-tabList-hd .btn-group .btn {
    padding-left: 30px;
    padding-right: 30px;
    font-weight: bold;
  }

  .btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  .bk-tabList-hd {
    text-align: left;
  }

  .finance-rd .bk-tabList-hd {
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    margin: 0 20px;
    padding-bottom: 5px;
    font-size: 16px;
  }

  .bk-onekey .finance-rd .bk-tabList-hd {
    padding-left: 15px;
  }

  .finance-rd .bk-tabList {
    margin: 0 !important;
  }

  .financen .container .finance-rd {
    background: #fff;
    min-height: 700px;
    margin-left: 170px;
    overflow: hidden;
  }

  /*全新修改结束*/
  .userIndex-cash {
    padding: 0 1.667rem 0 3.333rem;
    font-size: 1.167rem;
  }

  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem;

  }
  .recharge-group-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    font-size: 1.333rem;
    border-bottom: 1px solid #ddd;
    padding: 1.5rem 0;
    margin-bottom: 1.25rem;
  }

  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio, .recharge-group-radio-select-bank, .recharge-group-radio > section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio-select-bank > div {
    min-width: 320px;
  }

  .recharge-group-radio > input, .recharge-group-radio-select-bank > div > input, .recharge-group-radio > section > input {
    display: none;
  }

  .recharge-group-radio > label, .recharge-group-radio-select-bank > div > label, .recharge-group-radio > section > label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid #ddd;
    padding: 2.2rem 3rem;
    margin-right: 1.667rem;
    position: relative;
    cursor: pointer;
  }

  .recharge-group-radio-select-bank > div > label > em {
    font-style: normal;
    font-size: 14px;
    margin-left: 1rem;
  }

  .recharge-group:nth-of-type(1) label {
    flex-direction: column;
  }

  .recharge-group:nth-of-type(1) label > i {
    flex-direction: column;
    margin-right: 0;
  }

  .recharge-group-radio label > i, .recharge-group-radio > section label > i {
    margin-right: 1rem;
  }

  .recharge-group-radio > label > span:nth-of-type(1), .recharge-group-radio > section > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .recharge-group-radio > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #01aaef;
    color: #fff;
    padding: 0.1rem;
  }

  .recharge-group-radio-select-bank > div > label {
    padding: 1.5rem 3rem;
    margin-bottom: 1.667rem;
  }

  .recharge-group-radio-select-bank > div > label > span:nth-of-type(1) {
    border: 1px solid #999;
    padding: 5px;
    border-radius: 50%;
    margin-right: 1.5rem;
  }

  .recharge-group-radio-select-bank > div > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #fff;
    width: 4px;
    height: 4px;
  }

  .recharge-group-radio-checked {
    border-color: #2A8863 !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

  .recharge-group-radio-select-bank .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
  }

  .recharge-group-input > input {
    border: none;
    width: 90%;
    outline: none;
    padding: 0 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .recharge-group-input2 > input {
    border: none;
    width: 70%;
    outline: none;
    padding: 0 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .recharge-group-input2 > span {
    background: #e0e0e0;
    width: 30%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .add-bank-select-bank {
    border: none !important;
    font-size: 1.167rem;
    color: #01aaef;
  }

  .add-bank-select-bank em {
    margin-left: 0.5rem !important;
  }

  .add-charge-btc i {
    font-size: 22px;
    margin-left: 2rem;
  }

  .recharge-group-radio > a {
    color: #01aaef;
    font-weight: bold;
  }

  .btcAdr label {
    padding: .83rem 1rem !important;
    display: block !important;
  }

  .btcAdr .add-bank-select-bank-btcAdr {
    display: flex !important;
    border: none;
    color: #01aaef;
    align-items: center;
  }

  .btcAdr .add-bank-select-bank-btcAdr > em {
    margin-left: 0.5rem !important;
  }

  .recharge-group section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  .recharge-group section > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .recharge-group section > span {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .recharge-group section > div > input {
    outline: none;
    padding: 0.6rem .9rem;
    border: none;
  }

  .recharge-group section > div {
    border: 1px solid #ddd;
    color: #999;
    padding: 0 1.5rem;
    margin-right: 1rem;
    box-sizing: border-box;
  }

  .recharge-group section span {
    margin: 0 .3rem;
  }

  .recharge-group section > a {
    color: #01aaef;
    text-decoration: underline;
  }

  .color-blue {
    color: #01aaef;
  }

  .tishi-span-hide {
    font-size: 12px;
    color: red;
  }

  .tishi-span {
    cursor: pointer;
  }

  .section-div-label {
    border: none !important;
    padding: 0 !important;
  }

  .section-div-label > input, .section-div-label > div > input {
    display: none;
  }

  .section-div-label > label {
    padding: .6rem 1rem;
  }

  .section-div-label > label, .section-div-label > div {

    border: 2px solid #ddd;
    border-radius: 2px;
    margin: 0 1rem 1rem 0;
    cursor: pointer;
  }

  .section-div-label > div > label {
    padding: .8rem 1rem;
    display: inline-block;
    cursor: pointer;
  }

  .cash-btc-select-color {
    border-color: #2A8863 !important;
    color: #333 !important;
  }

  .recharge-group section > div > button {
    border: none;
    background: #5db75c;
    color: #fff;
    width: 66.656px;
    box-sizing: content-box;
    padding: 0.6rem 1rem;
    outline: none;
    cursor: pointer;
  }

  .recharge-group section:nth-last-child(2) > div {
    padding-right: 0;
    padding-left: 0.7rem;
  }

  .recharge-group section:nth-last-child(1) button {
    border: none;
    padding: 1rem 2rem;
    background: #01aaef;
    color: #fff;
    font-size: 1.167rem;
    border-radius: 3px;
  }

  .btc-num-input input {
    width: 19.42rem;
  }

  .select-shouxufei {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .select-shouxufei p {
    color: #2A8863;
    margin-bottom: .7rem;
    font-size: 14px;
    font-weight:bolder;
  }
</style>


