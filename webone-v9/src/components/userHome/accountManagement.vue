<template>
  <div class="accountManagement">
    <div class="title-user-profile green">账户管理</div>
    <accountSelected v-if="accountSelectedVal !== ''"
                     :title="'账户选择'"
                     :data=this.accountList
                     :value="accountSelectedVal"
                     @update:value="val => switchAccount(val)"
    />
    <div style="border-top: 1px solid #eee;">
      <accountSelected v-if="currencySelecedVal !== ''"
        :title="'选择币种'"
        :data=this.accountData[this.accountSelectedVal]
        :value="accountSelectedVal"
        :type="'classical'"
        @update:value="val => switchCurrency(val)"
      />
    </div>
    <div class="recharge-group" style="border-top: 1px solid #eee;">
      <!-- <div class="recharge-group-title">
        <p>数字货币地址管理</p>
      </div> -->
      <div class="btcAdr">
        <div class="adrItem" v-for="(item,index) in currencyAdr">
          <p>{{item.address}}</p>
          <p><span>[{{item.currency | translate}}地址{{index + 1}}]</span><a href="javascript:;" @click="delAdr($event)"
          :digtalid="item.id">删除该地址</a></p>
        </div>
        <div class="adrItem addBankCard" @click="goAddAdr()">
          <i class="iconfont">&#xe689;</i>
          <span>添加新地址</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import accountSelected from './accountSelected'

  export default {
    data() {
      return {
        accountSelectedVal: '',
        currencySelecedVal: '',
        accountList: [], //账户列表
        accountData: {}, //账户及支持币种
        account: false,
        moneyStyle: false,
        itemBanks: [],
        currencyAdr: [],
      }
    },
    components: {
      accountSelected,
    },
    created() {
    },
    mounted() {

      this.listAccounts();
    },
    methods: {

      switchAccount(account) {
        this.currencySelecedVal = account;
      },

      switchCurrency(currency) {
        this.currencySelecedVal = currency;
        this.getBindCurrencyAdr();
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
          this.accountSelectedVal = this.accountList[0];
          this.currencySelecedVal = this.accountData[this.accountSelectedVal][0];
          this.getBindCurrencyAdr();

        })
      },

      goAddAdr() {
        if (localStorage.getItem('real')) {
          this.$router.push('/accountManagement/addCurrencyAdr/' + this.selectCurrency)
        } else {
          this.showError('', '未实名认证');
          this.$router.push('/settings/user')
        }
      },
      delAdr(ev) {
        let url = this.$URL_API + 'digital/cancel/' + ev.target.getAttribute('digtalid');
        this.$http({
          url: url,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            ev.target.parentNode.parentNode.remove();
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      //获取提现地址
      getBindCurrencyAdr() {

        this.$http({
          url: this.$URL_API + 'digital/withdrawInfo/' + this.currencySelecedVal,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.currencyAdr = res.data.data;
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },//获取绑定数字货币地址
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

  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem;

  }

  .recharge-group-radio-checked .aCNY, .recharge-group-radio-checked .aBCC, .recharge-group-radio-checked .aXRP, .recharge-group-radio-checked .aBTC, .recharge-group-radio-checked .aLTC, .recharge-group-radio-checked .aETH, .recharge-group-radio-checked .aETC {
    background-position: 0;
  }

  .aCNY {
    background: url("../../assets/img/iconPng/CNYzhanghu.png");
    background-position: -22px;

  }

  .aBCC {
    background: url("../../assets/img/iconPng/BCC.png");
    background-position: -22px;

  }

  .aXRP {
    background: url("../../assets/img/iconPng/ripple.png");
    background-position: -22px;

  }

  .aBTC {
    background: url("../../assets/img/iconPng/BTCzhanghu.png");
    background-position: -22px;
  }

  .aLTC {
    background: url("../../assets/img/iconPng/ltc.png");
    background-position: -22px;
  }

  .aETH {
    background: url("../../assets/img/iconPng/ETH.png");
    background-position: -22px;
  }

  .aETC {
    background: url("../../assets/img/iconPng/ETC.png");
    background-position: -22px;
  }

  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio, .recharge-group-radio > section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio > input, .recharge-group-radio > section > input {
    display: none;
  }

  .recharge-group-radio > label, .recharge-group-radio > section > label {
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

  .recharge-group:nth-of-type(1) label {
    flex-direction: column;
  }

  .recharge-group:nth-of-type(1) label > i {
    flex-direction: column;
    margin-right: 0;
  }

  .recharge-group-radio label > i, .recharge-group-radio > section > label > i {
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

  .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

  .bankCard {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .backItem {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    width: 23.333rem;
    height: 11.667rem;
    border-radius: 4px;
    margin-right: 1.833rem;
    margin-bottom: 1.833rem;
  }

  .backItem:hover {
    border-color: #01aaef;
  }

  .backItem:hover a {
    display: block;
  }

  .imgLogo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #f8f8f8;
    height: 5rem;
    padding: 0 1.83rem;
    box-sizing: border-box;
    margin-bottom: 1.833rem;
    border-radius: 4px 4px 0 0;
  }

  .imgLogo > span {
    background: #e0e0e0;
    padding: .2rem .5rem;
    border-radius: 4px;
    font-size: 1.167rem;
  }

  .backItem > p, .backItem > a {
    padding: 0 1.83rem;
    font-size: 1.167rem;
  }

  .backItem > a {
    display: none;
    color: #01aaef;
    align-self: flex-end;
  }

  .addBankCard {
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .addBankCard i {
    border: 2px solid #ddd;
    border-radius: 50%;
    color: #ddd;
    width: 30px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    margin-bottom: 1.333rem;
  }

  .addBankCard > span {
    font-size: 1.167rem;
    color: #2A8863;
    font-weight:bolder;
  }

  .addBankCard:hover i {
    color: #2A8863;
    border-color: #2A8863;
  }

  .addBankCard:hover span {
    color: #2A8863;
  }

  .btcAdr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .adrItem {
    display: flex;
    flex-direction: column;
    min-width: 24rem;
    height: 9.167rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin: 15px;
  }

  .adrItem:hover {
    border-color: #2A8863;
  }

  .adrItem:hover a {
    display: block !important;
  }

  .adrItem > p {
    padding: 0 1.5rem;
    box-sizing: border-box;
    font-weight:bolder;
  }

  .adrItem > p:nth-of-type(1) {
    background: #f8f8f8;
    height: 4.167rem;
    line-height: 4.167rem;
    border-radius: 4px 4px 0 0;
  }

  .adrItem > p:nth-of-type(2) {
    display: flex;
    align-items: center;
    padding-top: 2rem;
    justify-content: space-between;
  }

  .adrItem > p:nth-of-type(2) span {
    color: #ff8236;
    font-size:14px;
  }

  .adrItem > p:nth-of-type(2) a {
    color: #2A8863;
    text-decoration: none;
    display: none;
    font-size:14px;
  }
</style>
