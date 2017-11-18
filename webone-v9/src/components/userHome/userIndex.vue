<template>
  <!-- 重写账户资产开始 -->
  <div class="finance-rd">
    <div class="wallet-toggle-layer" v-show="panelShowStatus">
      <div class="wallet-toggle-panel">
        <p class="title">{{$t('Internal')}}<i class="icon-close" @click="panelShowStatus = false"></i></p>
        <div class="content">
          <div class="circle">{{transferFrom}}</div>
          <div class="arrow">
            <span>{{$t('Transferin')}}{{transferCurrency}}</span>
            <i></i>
          </div>
          <div class="circle">{{transferTo}}</div>
        </div>

        <form class="wallet-toggle-form">
          <div class="form-group">
            <input type="text" v-model="transferAmount" class="form-control" :placeholder="$t('amount')">
          </div>
          <div class="form-group">
            <input type="password" v-model="capitalPwd" class="form-control" :placeholder="$t('Funding')">
          </div>
          <button class="btn btn-default" @click="panelShowStatus = false">{{$t('cancel')}}</button>
          <button class="btn btn-success" @click="transfer()">{{$t('ok')}}</button>
        </form>

      </div>
    </div>

    <div class="title-user-profile green">{{$t('Account')}}</div>
    <div class="bk-tabList">
      <accountSelected v-if="accountSelectedVal !== '' && capitalsSuccess === true"
        :title="$t('Options')"
        :data=this.accountList
        :value="accountSelectedVal"
        @update:value="val => switchAccount(val)"
      />
      <div class="bk-tabList-bd">
        <div class="bk-asset" id="useAssetList">
          <ul>
            <li v-for="(item, index) in this.accountData[this.accountSelectedVal]">
              <div class="row">
                <div class="col-sm-4 list1">
                  <h6>{{$t('Available')}}{{item}}</h6>
                  <p style="color: #99abb7;font-size: 14px;font-weight: bold;"><span class="bk-num">{{getAmount(item)|float4}}<i></i></span> {{item}}</p>
                </div>
                <div class="col-sm-3 list2">
                  <span>{{$t('Frozen')}}<b class="list-text-red">{{getLocked(item)|float4}}</b> {{item}}</span>
                </div>
                <div class="col-sm-5 list3" v-show="accountSelectedVal !== 'USDO'">
                  <router-link to="/recharge" class="btn btn-sm btn-primary">
                    <i class="bk-ico incoin"></i>{{$t('Depositt')}}
                  </router-link>
                  <router-link to="/cash" class="btn btn-sm btn-second">
                    <i class="bk-ico outcoin"></i>{{$t('withdrawal')}}
                  </router-link>
                  <a class="btn btn-sm btn-second spec" @click="showTransferDialog(item)">
                    <i class="bk-ico outcoin"></i>{{$t('Transfer')}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
  </div>
  <!-- 重写账户资产结束 -->
</template>
<script>
  import accountSelected from './accountSelected'
  export default {
    data() {
      return {
        accountSelectedVal: '', //当前账户
        currencySelectedVal: '', //当前账户下的币种
        panelShowStatus: false,
        accountList: [], //账户列表
        accountData: {}, //账户及支持币种
        capitals: {},  //用户资产
        capitalsSuccess:false,
        transferFrom: '', //转账from
        transferTo: '', //转账 to
        transferCurrency: '', //转账币种
        transferAmount: '', //转账金额
        capitalPwd: '',//交易密码
      }
    },
    mounted() {
      this.getUserMoney();
      this.listAccounts();
    },
    components: {
      accountSelected
    },
    watch: {

    },
    methods: {

      switchAccount(account){
        this.accountSelectedVal = account;
        this.transferFrom = account;
        this.selectTransferTo();

      },

      //获取账户列表以及账户支持的币种
      listAccounts() {
        this.$http({
          url: this.$URL_API + 'commodity/account',
          method: 'GET',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          this.accountData = res.data.data;
          for (var key in this.accountData) {
            this.accountList.push(key);
          }
          this.accountSelectedVal = this.accountList[0];
          this.transferFrom = this.accountSelectedVal;
          this.selectTransferTo();
        })
      },

      //获取用户资金详情
      getUserMoney() {
        this.$http({
          url: this.$URL_API + 'capital/info',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {

          if (res.data.code === 200) {
            let dd = res.data.data;
            for (let i = 0; i < dd.length; i++) {
              var lc = dd[i].legalMoney;
              var c = dd[i].currency;
              if (!this.capitals[lc]) {
                this.capitals[lc] = {};
              }
              this.capitals[lc][c] = dd[i];
            }

            this.capitalsSuccess = true;

          }

        })
      },

      //弹出转账窗口
      showTransferDialog(currency) {
        this.panelShowStatus = true;
        this.transferCurrency = currency;
      },

      //转账
      transfer() {
        this.$http({
          url: this.$URL_API + 'capital/transfer',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          },
          data: {
            fromAccount: this.accountSelectedVal,
            toAccount: this.selectTransferTo(),
            currency: this.transferCurrency,
            amount: this.transferAmount,
            capitalPwd: md5(this.capitalPwd),
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if(res.data.code === 200){
            this.panelShowStatus = false;
            this.getUserMoney();
          }

        })
      },

      selectTransferTo(){
        for(var i=0; i<this.accountList.length; i++){
          var account = this.accountList[i];
          if(account !== this.accountSelectedVal){
            this.transferTo = account;
            return  account;
          }
        }
      },

      //获取账户币种可用
      getAmount(currency) {
        var data = this.capitals[this.accountSelectedVal];
        if (data) {
          var currencyAmount = data[currency];
          if (currencyAmount) {
            return currencyAmount ? currencyAmount.amount : 0;
          }
        }
        return 0;
      },

      //获取账户币种冻结
      getLocked(currency) {
        var data = this.capitals[this.accountSelectedVal];
        if (data) {
          var currencyAmount = data[currency];
          if (currencyAmount) {
            return currencyAmount ? currencyAmount.locked : 0;
          }
        }
        return 0;
      },
    }
  }
</script>

<style lang="less" scoped>
  .btn-success {
    color: #fff;
    background-color: #2A8863;
    border-color: #2A8863;
   }
  .wallet-toggle-layer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    background-color: rgba(0, 0, 0, 0.75);

    z-index: 2000;
  }

  .wallet-toggle-panel {
    position: absolute;
    left: 50%;
    top: 50%;

    width: 460px;
    height: 380px;

    margin-left: -230px;
    margin-top: -190px;

    background-color: #fff;

    border-radius: 3px;

    .title {
      position: relative;
      font-size: 15px;
      line-height: 50px;
      height: 50px;
      text-align: center;

      margin: 0;

      .icon-close {
        position: absolute;
        right: 15px;
        top: 15px;

        width: 20px;

        height: 20px;

        &:before, &:after {
          position: absolute;
          left: 0;
          top: 10px;

          content: '';

          display: block;

          width: 20px;

          height: 1px;

          background-color: #333;

        }

        &:before {

          transform: rotate(45deg);
        }

        &:after {

          transform: rotate(-45deg);
        }
      }
    }

    .content {
      display: flex;
      padding: 15px 36px;

      background-color: #333;

      .circle {
        width: 80px;
        height: 80px;

        border-radius: 40px;

        background-color: #1bbb63;

        color: #fff;

        line-height: 80px;

        text-align: center;

        &:first-child {
          background-color: #e83434;
        }
      }

      .arrow {
        flex: 1;

        span {
          display: block;

          height: 36px;

          line-height: 36px;

          text-align: center;

          color: #fff;

          font-size: 13px;

        }
        i {
          position: relative;
          left: -2px;

          display: block;

          width: 180px;
          height: 8px;

          //background-color: #0da05d;

          background: -webkit-gradient(60deg, #e83434, #1bbb63);

          background: linear-gradient(60deg, #e83434, #1bbb63);

          margin: 0 auto;

          &:after {
            position: absolute;
            right: -8px;
            top: -6px;

            content: '';
            display: block;

            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-left: 16px solid #2cb362;
            border-bottom: 10px solid transparent;

          }

        }
      }
    }

  }

  .wallet-toggle-form {

    padding: 28px 30px 20px;

    .form-control {
      height: 38px;

      margin-bottom: 20px;
    }

    .btn {

      margin-top: 5px;

      width: 160px;

      height: 36px;

      border-radius: 3px;

      &.btn-default {

        background-color: #eee;

        color: #333;

        &:hover {
          background-color: #ccc;
        }
      }

      &.btn-success {
        float: right;
      }

    }
  }

  .list-text-red {
    color: #ff4500;
  }

  .title-user-profile {
    height: 50px;

    line-height: 50px;

    font-size: 18px;
    font-weight: bolder;
    padding-left: 20px;

    color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    &.green {
      background: #2A8863;
    }
  }

  .userIndex {
    padding: 0 1.667rem 2rem 3.333rem;
  }

  .Q-C-T {
    display: flex;
    align-items: center;
  }

  .Q-C-T a {
    padding: .3rem .8rem;
    font-size: 1.167rem;
    color: #fff;
    background: #01aaef;
    border-radius: .4rem;
    margin-left: 2rem;
    margin-top: -1.5rem;
  }

  .Q-C-T a:nth-of-type(1) {
    margin-left: 6rem;
  }

  #DEcharts1, #ZEcharts1, #KEcharts1, #JEcharts1 {
    width: 25rem;
    height: 18rem;
    margin-right: 13rem;
  }

  .index-title {
    display: flex;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.333rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }

  .total-assets, .net-assets, .available-assets, .blocked-assets {
    padding-bottom: 1.25rem;
  }

  .index-title span {
    margin-right: 1.25rem;
  }

  .index-title a i {
    font-size: 1.833rem;
    color: #01aaef !important;
  }

  .assets-box {
    display: flex;
    justify-content: space-between;
  }

  .money-tabs-box {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 1.8rem 0;
  }

  .money-tabs-left {
    display: flex;
    align-items: center;
  }

  .money-tabs-right-dian {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: red;
    top: 0;
    right: -.7rem;
    position: absolute;
  }

  .money-tabs-left select {
    outline: none;
    padding: .2rem .5rem;
    margin-right: 2rem;
  }

  .money-tabs-left select option {
    padding: .2rem .5rem;
  }

  .money-tabs-right {
    display: flex;
    align-items: center;
    position: relative;
  }

  .money-tabs-right i {
    color: #01aaef;
    margin-right: 0.4167rem;
    font-size: 1.5rem;
  }

  .money-tabs-right a {
    color: #01aaef;
    text-decoration: underline;
    font-size: 1.333rem;
  }

  .assets-title, .assets-money, .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets-proportion, .assets_XRP, .assets_BCC {
    font-size: 1.5rem;
    margin-bottom: 1.833rem;
  }

  .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets_XRP, .assets_BCC {
    margin-bottom: 1.25rem !important;
  }

  .assets-money {
    color: #888888;
  }

  .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets_XRP, .assets_BCC {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #333;
  }

  .assets_CNY em, .assets_BTC em, .assets_LTC em, .assets_ETC em, .assets_ETH em, .assets_XRP em, .assets_BCC em {
    width: 3rem;
    display: inline-block;
    font-style: normal;
  }

  .assets_CNY span:nth-of-type(1), .assets_BTC span:nth-of-type(1), .assets_LTC span:nth-of-type(1), .assets_ETC span:nth-of-type(1), .assets_ETH span:nth-of-type(1), .assets_XRP span:nth-of-type(1), .assets_BCC span:nth-of-type(1) {
    width: 0.667rem;
    height: 0.667rem;
    background: #f54648;
    margin-right: .5rem;
  }

  .assets_XRP span:nth-of-type(1) {
    background: #00FF00;
  }

  .assets_BCC span:nth-of-type(1) {
    background: #ff0;
  }

  .assets_BTC span:nth-of-type(1) {
    background: #fead22;
  }

  .assets_LTC span:nth-of-type(1) {
    background: #38c4e9;
  }

  .assets_ETC span:nth-of-type(1) {
    background: #2dd1a5;
  }

  .assets_ETH span:nth-of-type(1) {
    background: #9c5ff9;
  }

  .assets-proportion1 {
    width: 80%;
    display: flex;
    align-items: center;
  }

  .assets-proportion1 span {
    height: 1.667rem;
    width: 1px;
  }

  .assets-proportion1 span:nth-of-type(1) {
    width: 0.5%;
    margin-right: 2px;
    background: #fead22;
  }

  .assets-proportion1 span:nth-of-type(2) {
    width: 0.5%;
    margin-right: 2px;
    background: #ff0;
  }

  .assets-proportion1 span:nth-of-type(3) {
    width: 0.5%;
    margin-right: 2px;
    background: #0f0;
  }

  .assets-proportion1 span:nth-of-type(4) {
    width: 0.5%;
    margin-right: 2px;
    background: #38c4e9;
  }

  .assets-proportion1 span:nth-of-type(5) {
    width: 0.5%;
    margin-right: 2px;
    background: #2dd1a5;
  }

  .assets-proportion1 span:nth-of-type(6) {
    width: 0.5%;
    background: #9c5ff9;
  }

  .more a {
    color: #01aaef;
    font-size: 1.167rem;
    margin-bottom: 0.833rem;
    text-align: center;
  }

  /*重写样式开始*/
  *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .clearfix:before, .clearfix:after, .dl-horizontal dd:before, .dl-horizontal dd:after, .container:before, .container:after, .container-fluid:before, .container-fluid:after, .row:before, .row:after, .form-horizontal .form-group:before, .form-horizontal .form-group:after, .btn-toolbar:before, .btn-toolbar:after, .btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after, .nav:before, .nav:after, .navbar:before, .navbar:after, .navbar-header:before, .navbar-header:after, .navbar-collapse:before, .navbar-collapse:after, .pager:before, .pager:after, .panel-body:before, .panel-body:after, .modal-footer:before, .modal-footer:after {
    content: " ";
    display: table;
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    height: 100%;
    position: relative;
    font-family: "Microsoft YaHei", Arial, sans-serif;
    color: #99abb7;
    font-size: 12px;
    background-color: #f5f5f5;
    text-align: center;
    margin: 0 auto;
  }

  .financen .container .finance-rd {
    background: #fff;
    min-height: 700px;
    margin-left: 170px;
    overflow: hidden;
  }

  .finance-rd .bk-tabList {
    margin: 0 !important;
  }

  .bk-onekey .finance-rd .bk-tabList-hd {
    padding-left: 15px;
  }

  .finance-rd .bk-tabList-hd {
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    margin: 0 20px;
    padding-bottom: 5px;
    font-size: 16px;
  }

  .bk-tabList-hd {
    text-align: left;
  }

  .pull-left {
    float: left !important;
  }

  .btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  h4, .h4, h5, .h5, h6, .h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
  }

  .finance-rd i.icon_asset_all {
    width: 16px;
    height: 20px;
    /*background: url(/statics/img/v2/user/safe_icon.png);*/
    background-position: -67px -263px;
    display: inline-block;
    /*margin-right: 8px;*/
    vertical-align: middle;
    margin-top: -2px;
  }

  i, em {
    font-style: normal;
  }

  .bk-num-mo {
    color: #ff4500;
  }

  .bk-num {
    color: #ff4500;
    font-size: 18px;
    font-family: Arial, sans-serif, "Microsoft YaHei";
  }

  .finance-rd .bk-asset {

    border-top: 1px solid #eee;

    border-bottom: 1px solid #eee;

  }

  .finance-rd .bk-asset .row {
    border-bottom: 1px solid #eee;
    margin: 0 20px;
    padding: 5px 0;
    overflow: hidden;
    min-height: 90px;
  }

  .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  .finance-rd .bk-asset .row .list1 {
    border-right: 1px solid #eee;
    text-align: left;
  }

  @media (min-width: 768px) {
    .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
      float: left;
    }
  }

  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .finance-rd .bk-asset .row h6 {
    color: #333;
    font-size: 16px;
  }

  .finance-rd .bk-asset .row .list1 p {
    margin-bottom: 0;
  }

  p {
    margin: 0 0 10px;
  }

  .finance-rd .bk-asset .row .bk-num {
    font-size: 24px;
  }

  .bk-num i {
    font-size: 12px;
    color: #6d7b82;
  }

  @media (min-width: 768px) {
    .col-sm-4 {
      width: 33.33333333%;
    }
  }

  .finance-rd .bk-asset .row .list2 {
    text-align: left;
    color: #333;
    font-size: 14px;
  }

  @media (max-width: 1400px) {
    .finance-rd .bk-asset .row .list2 span {
      margin-top: 15px;
    }
  }

  .finance-rd .bk-asset .row .list2 span {
    vertical-align: middle;
    display: inline-block;
    width: 200px;
    margin-top: 30px;
  }

  b, strong {
    font-weight: bold;
  }

  .finance-rd .bk-asset .row .list3 a {
    margin: 20px 10px 0 3px;
  }

  .btn.btn-sm {
    padding: 5px 10px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 3px;
    font-weight:bolder;
  }
  .btn.btn-sm.btn-primary:hover{
    border-color: #D33551;
    background-color:#D33551;
  }
  .btn.btn-sm.btn-second:hover{
    color:#fff;
  }
  .btn-primary {
    color: #fff;
    background-color: #D33551;
    border-color: #D33551;
  }

  .btn {
    padding: 9px 12px;
    border-radius: 3px;
    white-space: normal;
    box-shadow: none;
    background-image: none;
    text-shadow: none;
    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear;
  }

  .btn-sm, .btn-group-sm > .btn {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }

  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .btn-second {
    background-color: #2A8863;
    border-color: #2A8863;
    color: #fff;
    &.spec {
      background-color: #61727c;;
      border-color: #61727c;
    }
  }

  .bk-ico {
    width: 30px;
    height: 36px;
    display: inline-block;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  .bk-ico.incoin {
    margin-right: 10px;
    width: 20px;
    height: 18px;
    background-image: url(../../assets/img/iconPng/ico_incoin_white.png);
    background-size: auto 95%;
    vertical-align: text-bottom;
  }

  .bk-ico.outcoin {
    margin-right: 10px;
    width: 20px;
    height: 18px;
    background-image: url(../../assets/img/iconPng/ico_outcoin_white.png);
    background-size: auto 95%;
    vertical-align: text-bottom;
  }

  i, em {
    font-style: normal;
  }

  /*重写样式结束*/
</style>
