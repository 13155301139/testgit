<template>
  <div class="finance-rd">
    <div class="title-user-profile green">{{$t('Deposit')}}</div>
    <accountSelected v-if="accountSelectedVal !== ''"
                     :title="$t('Options')"
                     :data=this.accountList
                     :value="accountSelectedVal"
                     @update:value="val => switchAccount(val)"
    />
    <div class="recharge-container">
      <accountSelected v-if="currencySelecedVal !== ''"
                       :title="$t('Deposit')"
                       :data=this.accountData[this.accountSelectedVal]
                       :value="currencySelecedVal"
                       :type="'classical'"
                       @update:value="val => switchCurrency(val)"
      />

      <form role="form" id="buyForm" class="form-horizontal" method="post" action="" autocomplete="off">
        <div class="recharge-from">

          <div class="form-group wallet-address">

            <label class="control-label">{{$t('Waress')}}</label>

            <div class="input-group chooseczbank">

              <div class="recharge-group-radio">

                <div class="add-charge-btc">

                  <input type="text" id="adr" :value="itemAddrs" readonly/>

                  <i class="iconfont erCord_bigBtn">&#xe635;</i>

                </div>
                <a href="javascript:;" @click="CopyAdr($event)" text="复制成功">{{$t('Copyad')}}</a>
              </div>
            </div>
          </div>
          <div class="ercord-big" id="erCord_big" v-show="itemAddrs">
          </div>
        </div>
      </form>
      <div class="recharge-log-container">
        <rechargeLog :currency="currencySelecedVal" :legalCurrency="accountSelectedVal"></rechargeLog>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import rechargeLog from '../lettle_components/rechargeLog.vue';
  import accountSelected from './accountSelected'
  export default {
    data() {
      return {
        accountSelectedVal: '',//当前选择的账户
        currencySelecedVal: '',//当前选择的币种
        accountList: [], //账户列表
        accountData: {}, //账户及支持币种
        itemAddrs: '', //充值地址
        qrcode:{}  //二维码
      }
    },
    components: {
      rechargeLog,
      accountSelected

    },
    created() {
    },
    mounted() {
      this.listAccounts();
      //初始化二维码
      this.qrcode = new QRCode('erCord_big', {
        text: 'not init',
        width: 200,
        height: 200,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
      });
    },
    methods: {
      //切换账户
      switchAccount(account) {
        this.accountSelectedVal = account;
      },

      //切换币种
      switchCurrency(currency) {
        this.currencySelecedVal = currency;
        this.getBindMoneyAdr();
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
          this.getBindMoneyAdr();
        })
      },
      //复制地址
      CopyAdr(ev){
        this.copy('adr', ev.target.getAttribute('text'));
        this.showError(200, '复制成功');
      },
      //获取选择的账户下的币种的地址
      getBindMoneyAdr() {
        this.$http({
          url: this.$URL_API + 'digital/rechargeInfo/' + this.currencySelecedVal + '/' + this.accountSelectedVal,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.itemAddrs = res.data.data.address;
            this.qrcode.clear();
            this.qrcode.makeCode(this.itemAddrs);
          }
        });
      }
    },
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
  .chooseczbank{
    width:100%;
  }
  .recharge-container {
    border-top: 1px solid #eee;

  }
  .recharge-from {
    display: flex;

    padding: 20px 40px 30px 30px;

    border-bottom: 1px solid #eee;

  }

  .ercord-big {

    background-color: #f1f1f1;
    img {
      width: 200px;
      height: 200px;
    }

  }

  .wallet-address {
    flex: 1;

    .control-label {
      display: block;
      height: 40px;
      font-size: 16px;
      font-weight:bolder;
      width:100%;
      text-align: left;
      color: #333;
    }
  }

  .recharge-log-container {
    padding: 10px;
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

  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem;
  }

  .ER-cord {
    margin-top: 2rem;
  }
  .a6 {
    background: url("../../assets/img/iconPng/wangshangyinhang.png");
    background-position: -22px;
  }

  .a7 {
    background: url("../../assets/img/iconPng/zizhuhuikuan.png");
    background-position: -22px;
  }

  .a8 {
    background: url("../../assets/img/iconPng/zhufubao.png");
    background-position: -22px;
  }

  .userIndex-recharge {
    padding: 0 1.667rem 0 3.333rem;
    font-size: 1.167rem;
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
    margin-bottom: 1.667rem;
    position: relative;
    cursor: pointer;
  }

  .recharge-group-radio-select-bank > div > label > em {
    font-style: normal;
    font-size: 1rem;
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

  .recharge-group-radio > label > span:nth-of-type(1) > span, .recharge-group-radio > section > label > span:nth-of-type(1) > span {
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
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

  .recharge-group-radio-select-bank > div .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
  }

  .recharge-group-input {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    width: 250px;
    height: 30px;
    font-size: 1.333rem;
    color: #888;
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

  .recharge-group-button {
    border: none;
    padding: 1rem 2rem;
    color: #fff;
    background: #01aaef;
    margin-left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    outline: none;
  }

  .add-bank-select-bank {
    border: none !important;
    font-size: 1.167rem;
    color: #01aaef;
  }

  .add-bank-select-bank em {
    margin-left: 0.5rem !important;
  }

  .add-charge-btc {
    display: flex;
    align-items: center;
    background: #f0f0f0;
    padding: .7rem 1rem;
    cursor: no-drop;
    margin-right: 3rem;

    border-radius: 2px;
  }

  .add-charge-btc input {
    background: #f0f0f0;
    width: 28rem;
    font-weight:bolder;
    font-size:13px;
    border: none;
    outline: none;
  }

  .add-charge-btc i {
    font-size: 22px;
    margin-left: 2rem;
  }

  .recharge-group-radio > a {
    font-size: 14px;

    width: 110px;

    height: 46px;

    line-height: 46px;

    color: #fff;

    background: #2A8863;

    text-align: center;

    border-radius: 3px;
    
    font-weight:bolder;
    &:hover {
      text-decoration: none;
      background: #74A994;
    }
  }
</style>


