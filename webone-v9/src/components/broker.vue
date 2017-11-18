<template>
  <div class="broker" style="padding-top:56px;">
    <div class="broker-box">
    <div class="egg_hdbj">
    	<p style="font-size:70px;color:#16AB3B;text-align: center;padding-top:100px;font-weight: bold;">{{$t('Send')}}</p>
    	<p style="font-size:20px;color:#fff;
    	text-align:center;padding-top:32px;">{{$t('Invite')}}</p>
    </div>
      <div class="broker-center">
        <div class="broker-center-left">
        <p style="padding-top:50px;">
         <i class="egg_hdtb"></i>
         <span style="font-size:30px;color:#16AB3B;text-align:center;
            line-height:1.8;padding-left:20px;">
         {{$t('Congra')}}<span>{{totalNumH}}</span>{{$t('people')}}</span></p>
        </div>
        <div class="broker-center-right">
          <p style="">
          {{$t('Referee')}}<span class="shareBrokerId">{{recommendCodeNew}}</span></p>
          <p v-show="false">
            <a href="javascript:;" class="bds_sqq">腾讯QQ</a>
            <a href="javascript:;" class="bds_tsina">新浪微博</a>
            <a href="javascript:;" class="bds_weixin">微信</a>
            <a href="javascript:;" class="bds_fbook">Facebook</a>
            <a href="javascript:;" class="bds_twi">Twitter</a>
          </p>
          <p class="border-er-box">
            <input type="text" v-model="brokerUrl" readonly id="broker-input"/>
            <i class="iconfont borkerERBTN">&#xe635;</i>
            <a href="javascript:;" id="brokerBtn" text="复制成功" @click="CopyText($event)">{{$t('copy')}}</a>
            <span id="borkerER" v-show="ERShow"></span>
          </p>
          <!--<p><input type="text" placeholder="输入您好友的邮箱"/><a href="javascript:;">邀请</a></p>-->
          <!--<p>*多个邮箱请用半角逗号分隔</p>-->
        </div>
      </div>
      <div style="border-bottom: 1px solid #ddd;">
      <div style="line-height:2.5;font-size:14px;color:#333;width: 800px;
           margin: 10px auto;background: #fff;padding: 20px 80px 40px;
           box-sizing: border-box;">
      <p style="text-align:center;color:#16AB3B;font-size:30px;">{{$t('Activity')}}</p>
      <p style="color:#666;font-size:15px">{{$t('Visit')}}</p>
      <p style="font-size:15px;color:#666;">{{$t('October')}}</p>
      <p style="font-size:15px;color:#666;">{{$t('Ifthere')}}</p>
      <p style="font-size:15px;color:#666;">{{$t('rewards')}}</p>
      <p style="font-size:15px;color:#666;">{{$t('Thefinal')}}</p>
      </div>
        <!-- <p>已成功推荐了<span>{{totalNumH}}</span>人</p>
        <p>共获得奖励</p>
        <div class="broker-footer-Q">
          <p>
            <span>{{(businessPrice.get(rewardCurrency + 'CNY') ? businessPrice.get(rewardCurrency + 'CNY').price : 0) * (rewardMoney * totalNumH) | float2}}</span>CNY
          </p>
          <p><span>{{(rewardMoney * totalNumH) | float8}}</span>{{rewardCurrency}}</p> -->
        </div>
        <div class="broker-table">
          <p style="color:#16AB3B;font-size:30px;padding: 20px 20px 20px;">{{$t('details')}}</p>
          <table >
            <thead>
            <tr>
              <td>{{$t('Time')}}</td>
              <td>{{$t('number')}}</td>
              <td>{{$t('Event')}}</td>
              <td>{{$t('Rewards')}}</td>
            </tr>
            </thead>
            <tbody v-show="noCord">
            <tr v-for="item in brokerList">
              <td>{{item.createDate | dateYMDHIS}}</td>
              <td>{{item.remark}}</td>
              <td>{{item.activityName}}</td>
              <td>{{item.amount | float8}}/{{item.currency}}</td>
            </tr>
            </tbody>
            <tbody class="noRcoed" v-show="!noCord">
            <tr>
              <td colspan="4">
                <i class="iconfont">&#xe661;</i>
                <span>{{$t('Norecords')}}</span>
              </td>
            </tr>
            </tbody>
            <tfoot class="table-footer-page">
            <tr>
              <td colspan="4">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="prev, pager, next"
                  :total="totalNumH"
                  class="page-right"
                ></el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        tableView: false,
        noCord: false,
        recommendCodeNew: '',
        brokerUrl: '',
        totalNumH: 10,
        currentPage: 1,
        brokerList: [],
        rewardMoney: '',
        rewardCurrency: '',
        ERShow:false,
      }
    },
    mounted() {
      //获取邀请码
      {
        this.recommendCodeNew = JSON.parse(localStorage.getItem('getU')).recommendCode;
        let urlBroker = window.location.href;
//        urlBroker=urlBroker.replace(new RegExp('borker', 'g'),'borkerRegister');
        this.brokerUrl = urlBroker + 'Register?id=' + this.recommendCodeNew;
//        console.log(this.brokerUrl);
      }
      {
          let _this=this;
        $('.borkerERBTN').hover(function () {
          _this.ERShow=true;
          _this.QRC('borkerER',_this.brokerUrl)
        }, function () {
          _this.ERShow=false;
          $('#borkerER').html('');
        });
      }
      this.handleCurrentChange(1);
    },
    methods: {
      CopyText(ev){
        this.copy('broker-input', ev.target.getAttribute('text'))
      },
      handleCurrentChange(currentPage){
        this.$http({
          url: this.$URL_API + 'activity/rewardList',
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
              activityCode: 'RECOMMENDER'
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNumH = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.brokerList = res.data.data.content;
            this.noCord = res.data.data.totalElements > 0;
            this.rewardMoney = res.data.data.content.length ? res.data.data.content[0].amount : 0;
            this.rewardCurrency = res.data.data.content.length ? res.data.data.content[0].currency : 'BTC';
          }
        })
      }
    },
    computed: {
      ...mapGetters(['businessPrice'])
    }
  }
</script>
<style>
.el-pager li.active{
  	border-color: #16AB3B !important;
    background-color: #16AB3B !important;
  }
</style>
<style scoped>
  .number{
  	border-color: #16AB3B;
    background-color: #16AB3B;
  }
  .egg_hdtb{
  	height: 50px;
  	width: 50px;
  	background-image: url("../assets/img/hdtb.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float:left;
    display: block;


  }
  .egg_hdbj{
  	height: 400px;
  	background-image: url("../assets/img/hdbj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .broker-box {
    background: #fff;
    width: 100%;
    min-width: 1010px;
  }

  .broker-header {
    font-size: 1.167rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.667rem 0;
  }

  .broker-header > i {
    color: #01aaef;
    font-size: 5rem;
    padding: 1rem 1.3rem;
    border: 2px solid #01aaef;
    border-radius: 50%;
  }

  .broker-header > h1 {
    margin: 2.9rem auto;
    font-size: 3.5rem;
    font-weight: 300;
  }

  .broker-header > p {
    margin-bottom: 0.833rem;
    display: flex;
    align-items: center;
  }

  .broker-header > p > span {
    font-weight: bold;
    margin: 0 .5rem;
  }

  .broker-center {
    padding: 20px 0;
    border: 1px solid #dedede;
    border-left: none;
    border-right: none;
    display: flex;
    justify-content: center;
  }

  .broker-center > div {
    /*width: 43.5rem;*/
    width: 550px;
    min-width: 550px;
    padding: 0 1.5rem;
  }

  /*.broker-center-left > p:nth-of-type(1) {
    margin-top: 1.667rem;
    font-size: 1.833rem;
    margin-bottom: 0.833rem;
    color: #01aaef !important;
  }

  .broker-center-left > p:nth-of-type(2) {
    font-size: 1.25rem;
    width: 75%;
    margin: 5.417rem auto 0 auto;
    line-height: 2.5rem;
  }

  .broker-center-left > p:nth-of-type(2) span {
    text-indent: 2em;
  }

  .broker-center-left > p:nth-of-type(2) span:nth-of-type(1) {
    text-align: left;
  }

  .broker-center-left > p:nth-of-type(2) span:nth-of-type(2) {
    text-align: right;
  }
*/
  .broker-center-right {
    border-left: 1px solid #ddd;
  }

  .broker-center-right > p {
    margin-bottom: 0.833rem;
  }

  .broker-center-right > p:nth-of-type(1) {
    margin-top: 1.667rem;
    font-size: 1.833rem;
    display: flex;
    align-items: flex-end;
  }

  .broker-center-right > p:nth-of-type(2) {
    display: flex;
    flex-wrap: wrap;
  }

  .broker-center-right > p:nth-of-type(2) a {
    margin: .5rem .5rem .5rem 0;
    padding-left: 3.5rem;
    width: 9rem !important;
    margin-right: 1.667rem !important;
    text-indent: 0 !important;
    color: #444 !important;
    border: 1px solid #d6e6f2;
    border-radius: 3px !important;
    height: 3.333rem !important;
    line-height: 3.333rem !important;
    box-sizing: border-box;
  }

  .bds_sqq {
    background: url('../assets/img/share/broker_qq.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_tsina {
    background: url('../assets/img/share/broker_sina.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_weixin {
    background: url('../assets/img/share/broker_wechat.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_fbook {
    background: url('../assets/img/share/broker_fb.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_twi {
    background: url('../assets/img/share/broker_tw.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .broker-center-right > p:nth-of-type(3), .broker-center-right > p:nth-of-type(4) {
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
    font-size: 1.167rem;
    width: 94%;
  }

  .broker-center-right > p:nth-of-type(3) {
    background: #eeeeee;

  }

  .broker-center-right > p:nth-of-type(3) > input {
    background: #eee;
    cursor: not-allowed;
    outline: none;
    border: none;
    width: 79%;
    padding: 0.667rem 1rem;
  }

  .broker-center-right > p:nth-of-type(3) > a, .broker-center-right > p:nth-of-type(4) > a {
    color: #FFFFFF;
    background-color: #2A8863;
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-left: 1rem;
    text-decoration: none;
  }

  .broker-center-right > p:nth-of-type(4) > input {
    outline: none;
    border: none;
    width: 82.5%;
    padding: 0.667rem 1rem;
  }

  .broker-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .broker-footer > p {
    margin-bottom: 0.833rem;
  }

  .broker-footer > p:nth-of-type(1) {
    font-size: 1.833rem;
    display: flex;
    align-items: flex-end;
    margin-top: 1.667rem;
  }

  .broker-footer > p:nth-of-type(1) span {
    font-size: 3rem;
    margin: 0 .5rem;
  }

  .broker-footer > p:nth-of-type(2) {
    font-size: 1.333rem;
    margin-top: 1.25rem;
  }

  .broker-footer > div {
    margin-bottom: 0.83rem;
  }

  .broker-footer-Q {
    display: flex;
    align-items: center;
  }

  .broker-footer-Q > p:nth-of-type(2) {
    margin-left: 6.667rem;
  }

  .broker-footer-Q > p {
    display: flex;
    align-items: flex-end;
    font-size: 1.333rem;
  }

  .broker-footer-Q > p > span {
    font-size: 3rem;
    margin-bottom: -.3rem;
    margin-right: .5rem;
  }

  .broker-table {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .broker-table > a {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #01aaef;
    margin: 2rem 0;
  }

  .broker-table > a span {
    margin-right: .5rem;
    text-decoration: underline;
  }

  .broker-table table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  .broker-table table td {
    padding: 0.667rem;
    width: 17.25rem;
    text-align: center;
  }

  .broker-table table thead {
    border: 1px solid #dddddd;
  }

  .broker-table table tbody {
    border: 1px solid #dddddd;

  }

  .broker-table table tbody tr:nth-child(odd) {
    background: #f9f9f9;
  }

  .broker-table table tbody tr:hover {
    background: #f9f9f9;
  }

  .noRcoed tr td {
    padding: 6.667rem;
  }

  .noRcoed tr td span, .noRcoed tr td i {
    display: inline;
  }

  .table-footer-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

  .broker-footer-text {
    margin-top: 6.667rem;
    text-align: center;
  }

  .broker-footer-text p {
    margin-bottom: 0.83rem;
    font-size: 1.833rem;
  }

  .broker-footer-text p:nth-of-type(2) {
    font-size: 3rem;
  }

  #borkerER {
    width: 150px;
    height: 150px;
    border: 1px solid #000;
    padding: 5px;
    background: #fff;
    position: absolute;
    top: 40px;
    right: 35px;
  }

  .border-er-box {
    margin-top: 50px;
    position: relative;
  }

  .borkerERBTN {
    cursor: pointer;
  }
</style>
