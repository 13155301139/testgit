<template>
  <div class="rechargeLog">
    <div class="userIndex-recharge-footer">
      <el-tabs v-model="activeName" type="card">
          <div class="recharge-record">
            <table>
              <thead>
              <tr>
                <td>{{$t('Timee')}}</td>
                <td v-if="currency==='CNY'">充值银行</td>
                <td v-else>{{$t('Type')}}</td>
                <td>{{$t('Depunt')}} / {{currency}}</td>
                <td>{{$t('Actual')}} / {{currency}}</td>
                <td>{{$t('Status')}}</td>
              </tr>
              </thead>
              <tbody class="recharge-record-data getTrSelect" v-show="!noRecord">
              <tr v-for="item in items" :currency="item.currency">
                <td>{{item.createDate | dateYMDHIS}}</td>
                <td>{{item.digtalAddr}}</td>
                <td>{{item.amount | float4}}</td>
                <td>{{item.step | States}}</td>
              </tr>
              </tbody>
              <tbody class="recharge-record-data noRecode" v-show="noRecord">
              <tr>
                <td colspan="5">
                  <i class="iconfont">&#xe661;</i>
                  <span>{{$t('Norecords')}}</span>
                </td>
              </tr>
              </tbody>
              <tfoot class="recharge-record-data-page">
              <tr>
                <td colspan="5">
                  <el-pagination layout="prev, pager, next"
                                 @current-change="handleCurrentChangeRechargeLog"
                                 :current-page="currentPage"
                                 :total="totals"
                                 class="page-right"
                  ></el-pagination>
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        noRecord: true,
        account: false,
        currentPage: 1,//默认页
        totals: 0,//总条数
        items: [],
        AccountBTC: [],
      }
    },
    props:['currency', 'legalCurrency'],
    created(){
    },
    mounted() {

//      this.getRechargeLog(1);

      let that = this;
      {
        $("input[name='select-account43']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.legalCurrency = $(this).val();
          if ($(this).val() === 'CNY') {
            that.account = false;
          }
          else {
            that.account = true;
          }
        })
      }//选择账户
      {
        setTimeout(function () {
          $("input[name='select-currency44']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            that.currency = $(this).val();
          })
          $("input[name='select-currency45']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            that.currency = $(this).val();
          })
        }, 500)
//        $("input[name='select-currency45']").change(function () {
//          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
//          that.legalCurrency = $(this).val();
//        })
      }//选择充值币
    },
    methods: {
      handleCurrentChangeRechargeLog(currentPage){
        if (this.legalCurrency === "CNY") {
          this.getRechargeLog(currentPage);
        } else {
          this.getRechargeLog1(currentPage);
        }

      },
      getRechargeLog(currentPage) {
        let url;
        url = this.$URL_API + 'digital/payments/list';
        this.$http({
          url: url,
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: 10,
            param: {
              currency: this.currency,
              legalCurrency: this.legalCurrency,
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.noRecord = !res.data.data.totalElements > 0;
            this.totals = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.items = res.data.data.content
          }

        })
      },
    },
    watch: {
      currency(){
        this.getRechargeLog(1)
      }
    }
  }
</script>
<style>
  .el-tabs__header {
    margin-bottom: 0 !important;
    border: none !important; 
  }
  .el-pager li.active{
    border-color: #16AB3B;
    background-color: #16AB3B;
  }
</style>
<style scoped>
  .rechargeLog {
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

  .recharge-group-radio-select-bank .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
  }

  .userIndex-recharge-footer-title {

  }
  .recharge-record {
    /*padding: 0.833rem;
    border: 1px solid #d1dbe5;
    border-top: none;
    padding-top: 3rem;*/
  }
  .recharge-record table {
    width: 100%;
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .recharge-record table td {
    width: 12.667rem;
    padding: 0.883rem;
    text-align: left;
  }

  .recharge-record table td:nth-of-type(1) {
    width: 24.25rem
  }

  .recharge-record table td:nth-of-type(2) {
    width: 13rem
  }

  .recharge-record table td:nth-of-type(3) {
    width: 14.083rem
  }

  .recharge-record table td:nth-of-type(4) {
    width: 14.167rem;
  }

  .recharge-record table td:nth-of-type(5) {
    width: 10rem;
  }

  .recharge-record thead {
    border: 1px solid #d1dbe5;
  }

  .recharge-record-data {
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }

  .noRecode td {
    padding: 6.667rem !important;
    text-align: center !important;
  }

  .noRecode td i {
    font-size: 3rem;
  }

  .noRecode td i, .noRecode td span {
    display: inline !important;

  }

  .recharge-record-data-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

</style>
