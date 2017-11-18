<template>
  <div class="rechargeLog" >
    <div class="cash-record">
      <el-tabs v-model="activeName" type="card">
          <div class="user-table1">
            <table>
              <thead class="user-table-thead">
              <tr>
                <td>提现时间</td>
                <td>提现地址</td>
                <td>提现金额 / {{currency}}</td>
                <td>手续费 / {{currency}}</td>
                <td>状态</td>
              </tr>
              </thead>
              <tbody class="user-table-tbody" v-show="noData">
              <tr v-for="item in items">
                <td>{{item.createDate | dateYMDHIS}}</td>
                <td>{{item.digtalAddr}}</td>
                <td>{{item.amount ? item.amount : item.applyBalance}}</td>
                <td>{{item.fee}}</td>
                <td>{{item.step |States}}</td>
              </tr>
              </tbody>
              <tbody class="user-table-tbody de-body" v-show="!noData">
              <tr>
                <td colspan="5">
                  <i class="iconfont">&#xe661;</i>
                  <span>暂无记录</span>
                </td>
              </tr>
              </tbody>
              <tfoot class="user-table-footer-page">
              <tr>
                <td colspan="5">
                  <el-pagination
                    layout="prev, pager, next"
                    :total="totalNum"
                    @current-change="handleCurrentChangeCashLog"
                    :current-page="currentPage"
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
        noData: false,
        totalNum: 10,//总条数
        items: [],//数组
        currentPage: 1,//默认页
      }
    },
    props:['currency', 'legalCurrency'],

    created(){
    },
    mounted() {
    },
    methods: {
      //获取提现记录
      getCashLog(currentPage){
        let url = this.$URL_API + 'digital/withdraw/list'
        this.$http({
          url: url,
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: this.currentPage - 1,
            pageSize: 10,
            param: {
              'currency': this.currency,

            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.noData = res.data.data.totalElements > 0;
            this.totalNum = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.items = res.data.data.content;
          }
        })
      },

      //换页
      handleCurrentChangeCashLog(currentPage){
        this.getCashLog(currentPage);
      },
    },
    watch: {
      currency(){
        this.getCashLog(this.currentPage);
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

  .cash-group-title {
    padding: 1.5rem 0;
    border-bottom: 1px solid #ddd;
    font-size: 1.333rem;
    margin-bottom: 2rem;
  }
  .user-table1 {
    /*border: 1px solid #d1dbe5;
    border-top: none;
    padding: 0.833rem;
    font-size: 1.167rem;*/
  }

  .user-table1 table {
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
  }

  .user-table1 table td {
    padding: 0.667rem;
  }

  .user-table-thead {
    border: 1px solid #d1dbe5;
  }

  .user-table-tbody {
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }

  .de-body td {
    padding: 6.667rem !important;
    text-align: center !important;
  }

  .de-body td i {
    font-size: 3rem;
  }

  .de-body td i, .de-body td span {
    display: inline !important;

  }

  .user-table-footer-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

  .user-table1 table td:nth-of-type(1) {
    width: 13rem;
  }

  .user-table1 table td:nth-of-type(2) {
    width: 25.333rem;
    text-align: center;
  }

  .user-table1 table td:nth-of-type(3) {
    width: 13.333rem;
  }

  .user-table1 table td:nth-of-type(4) {
    width: 10.833rem;
  }

  .user-table1 table td:nth-of-type(5) {
    width: 10.333rem;
  }

</style>
