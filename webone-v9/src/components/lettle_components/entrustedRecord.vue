<template>
  <div class="entrustedRecord">
    <el-tabs v-model="activeName2" type="card" @tab-click="accBTN">
      <el-tab-pane label="当前委托" name="first">
        <table class="entrustedRecord-table">
          <thead class="entrustedRecord-table-thead">
          <tr>
            <td>时间</td>
            <td>类型</td>
            <td>方向</td>
            <td>来源</td>
            <td>委托价格</td>
            <td>委托额/量</td>
            <td>剩余</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody v-show="noRecord= (entrust.totalElements>0)" class="entrustedRecord-table-tbody">
          <tr v-for="item in entrust.content">
            <td>{{item.createDate | dateYMDHIS}}</td>
            <td>{{item.orderType | translate}}</td>
            <td>{{item.cammand | translate}}</td>
            <td>{{item.source}}</td>
            <td>{{item.price | return_}}</td>
            <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{item.amount | float2 }}</td>
            <td v-else>{{item.amount | float4 }}</td>
            <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{(item.amount - item.dealVolume) | float2}}</td>
            <td v-else>{{(item.amount - item.dealVolume) | float4}}</td>
            <td style="color:#01aaef">{{item.orderStatus | translate}}</td>
            <td><a href="javascript:;" :code="item.code" :commodity="item.commodity" style="color:#01aaef"
                   @click="revoke($event)">撤销</a></td>
          </tr>
          </tbody>
          <tbody v-show="!noRecord" class="entrustedRecord-table-tbody tbody-noRecord">
          <tr>
            <td colspan="9">
              <i class="iconfont">&#xe661;</i>
              <span>暂无记录</span>
            </td>
          </tr>
          </tbody>
          <tfoot class="entrustedRecord-table-page">
          <tr>
            <td colspan="9">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="(entrust.totalElements ? entrust.totalElements : 10)"
                class="page-right"></el-pagination>
            </td>
          </tr>
          </tfoot>
        </table>
      </el-tab-pane>
      <el-tab-pane label="历史委托" name="second">
        <table class="entrustedRecord-table second">
          <caption>
            <div class="table-select-time">
              <span>日期</span>
              <div class="block">
                <el-date-picker
                  v-model="timerDT"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
              </div>
            </div>
          </caption>
          <thead class="entrustedRecord-table-thead ">
          <tr>
            <td>委托时间</td>
            <td>类型</td>
            <td>方向</td>
            <td>来源</td>
            <td>委托价格</td>
            <td>委托数</td>
            <td>平均成交价</td>
            <td>成交量</td>
            <td>成交额</td>
            <td>状态</td>
          </tr>
          </thead>
          <tbody v-show="noRecord1" class="entrustedRecord-table-tbody">
          <tr v-for="item in contentArrH">
            <td>{{item.createDate | dateYMDHIS}}</td>
            <td>{{item.orderType | translate}}</td>
            <td>{{item.cammand | translate}}</td>
            <td>{{item.source}}</td>
            <td>{{item.price | return_ }}</td>
            <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{item.amount | float2 }}</td>
            <td v-else>{{item.amount | float4 }}</td>
            <td>{{item.dealPrice | float2}}</td>
            <td>{{item.dealVolume | float4}}</td>
            <td>{{item.dealAmount | float2}}</td>
            <td>{{item.orderStatus | translate}}</td>
          </tr>
          </tbody>
          <tbody v-show="!noRecord1" class="entrustedRecord-table-tbody tbody-noRecord">
          <tr>
            <td colspan="10">
              <i class="iconfont">&#xe661;</i>
              <span>暂无记录</span>
            </td>
          </tr>
          </tbody>
          <tfoot class="entrustedRecord-table-page">
          <tr>
            <td colspan="10">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="totalNumH"
                class="page-right"></el-pagination>
            </td>
          </tr>
          </tfoot>
        </table>
      </el-tab-pane>
    </el-tabs>
    <a href="javascript:;" class="revokeAll" @click="revokeAll($event)" v-show="revokeAllState=entrust.totalElements>0">全部撤销</a>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        activeName2: 'first',
        noRecord: false,
        noRecord1: false,
        currentPage: 1,
        totalNum: 10,
        totalNumH: 10,
        contentArr: [],
        contentArrH: [],
        account: localStorage.getItem('Account'),//当前账户
        currency: '',//当前币种
        timerDT: '',//筛选时间
        startDate: '',
        endDate: '',
        commodity: '',
        revokeAllState: false,

      };
    },
    mounted() {
      let that = this;
      window.addEventListener('changeCommodity', function () {
        that.handleCurrentChange(1);
        that.handleCurrentChange1(1);
      })
    },
    methods: {
      //获取当前账户，币种
//      unsettledBtn(tab,event){
//          console.log(tab,event)
////        this.handleCurrentChange(1);
//      },
//      historyBtn(){
//          alert(2)
//        this.handleCurrentChange1(1);
//      },
      accBTN(name){
        if (name.name === 'first') {
          this.handleCurrentChange(1);
        } else {
          this.handleCurrentChange1(1);
        }
//        console.log(name.name);
        if (this.noRecord) {
          this.revokeAllState = name.name === 'first';
        }
      },
      handleCurrentChange: function (currentPage) {
//          alert(localStorage.getItem('commodity')+'/woshi dangqianweituo')
        this.currentPage = currentPage;
        this.$http({
          url: this.$URL_API + 'trade/unsettled',
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
              commodity: localStorage.getItem('commodity'),
              legalMoney: this.account,
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNum = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.noRecord = res.data.data.totalElements > 0;
            this.revokeAllState = res.data.data.totalElements > 0;
            this.$store.state.weiTuo = res.data.data;
          } else {
            this.noRecord = false;
          }
        })
      },//获取当前委托
      handleCurrentChange1: function (currentPage) {
//        alert(localStorage.getItem('commodity')+'/woshi woshilishiwituo ')
        this.$http({
          url: this.$URL_API + 'trade/history',
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
              commodity: localStorage.getItem('commodity'),
              legalMoney: this.account,
              startTimes: this.startDate,
              endTimes: this.endDate
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNumH = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.noRecord1 = res.data.data.totalElements > 0;
            this.contentArrH = res.data.data.content;
          }
        })
      },//获取历史委托
      revoke(ev) {
        this.$http({
          url: this.$URL_API + 'trade/cancels/' + ev.target.getAttribute('commodity') + '/' + ev.target.getAttribute('code'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            this.currentPage = 1;
//            ev.target.parentNode.parentNode.remove()
//            this.handleCurrentChange(this.currentPage);
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },

      revokeAll(){
        this.$http({
          url: this.$URL_API + 'trade/cancelsAll/' + localStorage.getItem('commodity'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          this.totalNum = 10;
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      }
    },
    watch: {
      timerDT(newValue, oldValue) {
        let date1 = new Date(newValue[0]);
        let date2 = new Date(newValue[1]);
        this.startDate = date1.getTime();
        this.endDate = date2.getTime();
        this.handleCurrentChange1(1)
      }
    },
    computed: {
      ...mapGetters(['entrust'])
    }
  };
</script>
<style scoped>
  .entrustedRecord {
    background: #fff;
    padding: 2rem;
    position: relative;
  }

  .revokeAll {
    position: absolute;
    top: 35px;
    right: 65px;
    font-size: 14px;
    color: #01aaef;
  }

  .el-tab-pane {
    padding: 0.833rem;
    border: 1px solid #d1dbe5;
    border-top: none;
  }

  .el-tabs__header {
    margin-bottom: 0 !important;
  }

  .entrustedRecord-table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 0.833rem 0;
    font-size: 1.083rem;
  }

  .entrustedRecord-table td {
    width: 5.917rem;
    height: 1.583rem;
    padding: 0.667rem;
    text-align: left;
  }

  .entrustedRecord-table td:last-child {
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(1) {
    width: 12rem;
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(2), .entrustedRecord-table td:nth-of-type(3) {
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(4) {
    width: 5rem;
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(5) {
    width: 8rem;
    text-align: right;
  }

  .entrustedRecord-table td:nth-of-type(6) {
    width: 8rem;
    text-align: right;
  }

  .entrustedRecord-table td:nth-of-type(7) {
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(8) {
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(9) {
    text-align: center;
  }

  .entrustedRecord-table td:nth-of-type(10) {
    text-align: right;
  }

  .entrustedRecord-table-thead {
    border: 1px solid #d1dbe5;
    font-size: 1.1667rem;
  }

  .entrustedRecord-table-tbody {
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }

  .tbody-noRecord td {
    padding: 6.667rem;
  }

  .tbody-noRecord td i {
    font-size: 3rem;
  }

  .tbody-noRecord td i, .tbody-noRecord td span {
    display: inline !important;
  }

  .entrustedRecord-table-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

  .second td {
    width: 5.667rem;
  }

  .second td:nth-of-type(1) {
    width: 16rem;
  }

  .second td:nth-of-type(5) {
    width: 9.333rem;
  }

  .second td:nth-of-type(6) {
    width: 7.583rem;
  }

  .second td:nth-of-type(7) {
    width: 11.25rem;
  }

  .second td:nth-of-type(8) {
    width: 7.583rem;
  }

  .second td:nth-of-type(9) {
    width: 7.583rem;
  }

  .table-select-time {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.167rem;
    padding: 1rem 4rem 2rem 0;
  }

  .table-select-time span {
    margin-right: 2rem;
  }
</style>
