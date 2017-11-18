<template>
  <div class="userIndex">
    <div class="title-user-profile green">账户明细</div>
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
        :value="currencySelecedVal"
        :type="'classical'"
        @update:value="val => switchCurrency(val)"
      />
    </div>
    <userTable :currency="currencySelecedVal" :legalCurrency="accountSelectedVal"></userTable>
  </div>
</template>
<script>
  import accountSelected from './accountSelected';
  import userTable from '../lettle_components/userTable.vue';

  export default {
    data() {
      return {
        accountSelectedVal: '',
        currencySelecedVal: '',
        accountList: [], //账户列表
        accountData: {}, //账户及支持币种
      }
    },
    components: {
      accountSelected,
      userTable,
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
          }
        }).then((res) => {
          this.accountData = res.data.data;
          for (var key in this.accountData) {
            this.accountList.push(key);
          }
          this.accountSelectedVal = this.accountList[0];
          this.currencySelecedVal = this.accountData[this.accountSelectedVal][0];

        })
      },
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

  .recharge-group-radio-checked .a1, .recharge-group-radio-checked .a2, .recharge-group-radio-checked .a9 {
    background-position: 0;
  }

  .a1 {
    background: url("../../assets/img/iconPng/CNYzhanghu.png");
    background-position: -22px;

  }

  .a2 {
    background: url("../../assets/img/iconPng/BTCzhanghu.png");
    background-position: -22px;
  }

  .a9 {
    background: url("../../assets/img/iconPng/all.png");
    background-position: -22px;
  }

  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio > input {
    display: none;
  }

  .recharge-group:nth-of-type(1) label {
    flex-direction: column;
    width: 125px;
    box-sizing: border-box;
  }

  .recharge-group:nth-of-type(1) label > i {
    flex-direction: column;
    margin-right: 0;
  }

  .recharge-group-radio > label {
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

  .recharge-group-radio label > i {
    margin-right: 1rem;
  }

  .recharge-group-radio > label > span:nth-of-type(1) {
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

  .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

</style>
