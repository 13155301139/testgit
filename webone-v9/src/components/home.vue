<template>
  <div class="login-box container-full">
    <div class="home">
      <div style="width:100%;padding-top:300px;">
        <h1 style="color:#fff;font-size:60px;letter-spacing:1px;text-align:center;">
          {{$t('EggOne')}}</h1>
        <br>
        <br>
        <p style="color:#fff;font-size:30px;letter-spacing:2px;text-align:center;
           font-weight: bolder;">
        {{$t('World')}}</p>
        <br>
        <br>
        <div style="text-align:center;">
          <p class="egg_adq">{{$t('Simpler')}}</p>
        </div>
      </div>
    </div>
    <!-- 重新制作报价牌开始 -->
    <div class="index market">
      <div class="container">
        <div class="trade-navs">
          <div class="trade-tabs">
            <span id="1_market" :class="['trade-tab', category == 0 ? 'active' : '']" data-key="1" data-max="2" style="margin-left: 0px;"
                  @click="changeCategory(0)">{{$t('Main')}}</span>
            <span id="2_market" :class="['trade-tab', category == 1 ? 'active' : '']" data-key="2" data-max="2" style="margin-left: 0px;"
                  @click="changeCategory(1)">{{$t('New')}}</span>
          </div>
        </div>
        <div class="row market-top" style="text-align:center;font-weight: bolder;">
          <span class="col-xs-2" style="font-family: 微软雅黑;">
          {{$t('Coin')}}</span>
          <span class="col-xs-2" style="font-family: 微软雅黑;">
          {{$t('Last')}}</span>
          <span class="col-xs-2" style="font-family: 微软雅黑;">
          {{$t('High')}}</span>
          <span class="col-xs-2" style="font-family: 微软雅黑;">
          {{$t('Low')}}</span>
          <span class="col-xs-2" style="font-family: 微软雅黑;">
          {{$t('Volume')}}</span>
          <span class="col-xs-2" style="font-family: 微软雅黑;">
          {{$t('change')}}</span>
          <span class="col-xs-2 text-center" style="font-family: 微软雅黑;">
          {{$t('Price')}}</span>
          <span class="col-xs-2"></span>
        </div>
        <div v-show="officePrice.length === 0" style="height:64px;
        background: #fff;text-align: center;">
          <span style="line-height: 5;font-size:20px;">
          {{$t('Nodata')}}
          </span>
        </div>
        <ul>
          <li v-for="(item, index) in officePrice">
            <div class="row market-con 1_market_list" style="display:block;">
              <a class="text-danger" href="">
                    <span class="col-xs-2" style="font-size: 14px;
                    font-family: 微软雅黑;">
                      <i :class="'coin-logo coin-logo-' + item.commodity.substring(0,3)"></i>
                      {{item.commodity.substring(0, 3) + '/' + item.commodity.substring(3, item.commodity.length)}}
                    </span>
              </a>
              <span class="col-xs-2 text-danger" id="2_price"
                    style="font-family: 微软雅黑;">{{item.price}}</span>
              <span class="col-xs-2" id="2_high"
                    style="font-family: 微软雅黑;">{{item.high}}</span>
              <span class="col-xs-2" id="2_low"
                    style="font-family: 微软雅黑;">{{item.low}}</span>
              <span class="col-xs-2" id="2_total"
                    style="font-family: 微软雅黑;">{{item.vol}}</span>
              <span class="col-xs-2 text-danger" id="2_rose"
                    style="font-family: 微软雅黑;">{{item.rising >= 0 ? '+' : ''}}{{item.rising * 100 | float2}}%</span>
              <span class="col-xs-2">
                <canvas :id="item.commodity"
                        style="width:140px;height:64px;
                    position: relative;right: 10px;font-family: 微软雅黑;" class="canvas1">
                    </canvas>
                    <!--
                    <canvas :id="item.commodity"
                            style="width:140px;height:64px;
                    position: relative;right: 10px;font-family: 微软雅黑;" class="canvas1">
                    </canvas>
                    -->

                <!--
                    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="64" style="transform:scaleY(-1);">
                       <polyline fill="none" stroke="#ff4500" stroke-width="2"
                                 points="20,10 40,20 70,30 100,20"/>
                    </svg>
                -->
                <!--<schart :canvasId="item.commodity"-->
                        <!--:type="'line'"-->
                        <!--:width="160"-->
                        <!--:height="60"-->
                        <!--:data="chartData[item.commodity] || []"-->
                        <!--:options="options"-->
                <!--&gt;</schart>-->

              </span>
              <span class="col-xs-2" style="font-family: 微软雅黑;">
                    <a class="btn market-trading" @click="toQuotation(index)">
                    {{$t('Trade')}}<i class="triangle-right"></i></a>
                  </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 重新制作报价牌结束 -->
    <!-- 用背景写 -->
    <div class="egg_mx">
    <h2 style="padding-left: 25%;padding-top: 100px;">{{$t('EggOneAPP')}}</h2>
      <p style="font-size: 14px;padding-left: 25%;padding-top: 30px;     width: 600px;line-height: 18px;">{{$t('stlfpk')}}</p> 
      <p style="height: 10px;"></p>
    </div>
  <div style="height: 10px; background-color: rgb(255, 255, 255);"></div>
  </div>
</template>
<script>
  import loginCenter from './lettle_components/loginCenter.vue';
  import schart from 'vue-schart';
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        officePrice: [],//最新价
        category: 0, //0-币币区， 1-创新区
        showCategory: true,
        flag1: 0,
        flag2: 1,
        chartData: {},
        options: {

          bgColor: '#f4f4f4',
          padding: 20,

          fillColor: '#ff4500',           // The color of line chart
          axisColor: '#f4f4f4',           // The color of the coordinate axis

          contentColor: '#f4f4f4',
          legendColor: '#f4f4f4',
          titleColor: '#f4f4f4'
        }
      }
    },
    destroyed(){
      clearInterval(this.flag1);
      clearTimeout(this.flag2);
    },
    mounted() {

      $("body").append('<script src="../../static/js/sChart.js"><\/script>');

      this.getOfferPrice(this.category);

      /*
      this.flag1 = setTimeout(function () {

        that.flag2 = setInterval(function () {

          that.getOfferPrice(that.category);

        }, 3000);  //3秒更新一次行情

      }, 3000);
      */

    },
    components: {
      loginCenter,
      schart
    },
    created() {
    },
    methods: {
      toQuotation(index) {
        localStorage.setItem('commodity', this.officePrice[index].commodity);
        this.$router.push('/businessOne/' + this.officePrice[index].commodity.toLowerCase());
      },
      changeCategory(index) {
        this.category = index;
        this.getOfferPrice(index);
      },
      getOfferPrice(category) {

        this.$http({
          url: this.$URL_API + 'quotation/offerPriceAll/' + (category == 0 ? 'COMMON' : 'NEW'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          if (res.data.code === 200) {

            this.officePrice = res.data.data;

            //划线数据临时变量
            let _datas = {};

            setTimeout(function () {

              for (let i = 0; i < res.data.data.length; i++) {

//              let _data = res.data.data[i];
//
//              let _commodity = _data.commodity;
//
//              _datas[_commodity] = [];
//
//              var _size =_data.kdata.length;
//
//              let _start = (_size < 4 ? 0 : _size - 4);
//
//              let _end = (_size == 0 ? 0 : _size - 1);
//
//              for (let i = _start; i < _end; i++) {
//                _datas[_commodity].push({'name': '1', 'value': _data.kdata[i].open});
//
//                _datas[_commodity].push({'name': '1', 'value': _data.kdata[i].close});
//
//              }
//
//            }
                var data = res.data.data[i];
                var datas = new Array();
                var size = data.kdataSize;
                for (let i = 0; i < size; i++) {
                  datas[i] = {'name': 123, 'value': data.kdata[i].close};
                }


                var commodity = data.commodity;

                new sChart(commodity, 'line', datas, {
                  title: '',
                  bgColor: '#ffffff',
                  titleColor: '#ffffff',
                  fillColor: '#E53657',
                  axisColor: '#ffffff',
                  contentColor: '#ffffff'
                });

              }
            }, 200);
          }

        });

      }
    },
    watch: {
      officePrice: function () {

      }
    },
    computed: {
      ...mapGetters(['businessPrice'])
    },
  }
</script>
<style scoped>
  .login-box{
    min-width: 1170px;
  }
  .egg_adq {
    display: inline-block;
    background: #2A8863;
    color: #fff;
    font-size: 16px;
    height: 45px;
    line-height: 45px;
    padding: 0 30px;
    outline: 0;
    border-radius: 5px;
    letter-spacing:2px;
    border: 1px solid transparent;
    font-weight: bolder;
  }

  .egg_2 {
    line-height: 40px;
    font-size: 1.1em;
    color: #9b9ba0;
    width: 16.66666667%;
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .egg_mx {
    height: 300px;
    background-image: url("../../src/assets/img/home/egg-app.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .home {
    height: 800px;
    background-image: url("../../src/assets/img/home/egg_bjt.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .home-banner {
    width: 100%;
  }

  .home-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    color: #cecece;
  }

  .home-item-title em {
    display: block;
    padding: 0 20px;
  }

  .home-item-title span {
    height: 1px;
    flex: 1;
    background: #dcdcd7;
  }

  .red {
    color: #c00 !important;
  }

  .bg-red {
    background: #c00;
  }

  .green {
    color: #0c0;
  }

  .bg-green {
    background: #00cc00;
  }

  .gray {
    color: #666;
  }

  .bg-gray {
    background: #666
  }

  .home-item-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .home-item-contentr {
    overflow: hidden;
  }

  .home-item-contentr section {
    float: left;
    width: 277px;
    height: 136px;
    background: url("../assets/img/home/home_05.jpg");
    background-size: 100% !important;
    margin-bottom: 20px;
    margin-right: 16.5px;
    margin-left: 16.5px;
    position: relative;
  }

  .home-item-contentr section .baojia-color {
    display: block;
    height: 20px;
    width: 4px;
    position: absolute;
    left: -2px;
    top: 5px;
  }

  .home-item-contentr section .baojia-commodity {
    font-size: 14px;
    position: absolute;
    top: 5px;
    left: 15px;
  }

  .home-item-contentr section .baojia-price-box {
    right: 15px;
    top: 20px;
    position: absolute;
  }

  .home-item-contentr section .baojia-higt-low p {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }

  .home-item-contentr section .baojia-price-box .baojia-price {
    font-size: 26px;
    margin-bottom: 5px;
  }

  .home-item-contentr section .baojia-price-box .baojia-risking {
    display: flex;
    align-items: center;
    padding-left: 3px;
  }

  .home-item-contentr section .baojia-price-box .baojia-risking i {
    margin-right: 5px;
  }

  .home-item-contentr section .baojia-price-box .baojia-risking em {
    font-style: normal;
  }

  .home-item-contentr section .baojia-higt-low {
    position: absolute;
    bottom: 5px;
    left: 15px;
  }

  .home-item-content aside {
    width: 386px;
    background-size: 100% !important;
    height: 230px;
    position: relative;
    margin-bottom: 20px;
  }

  .home-item-content aside:nth-of-type(1) {
    background: url("../assets/img/home/home_09.png") #fff no-repeat;
  }

  .home-item-content aside:nth-of-type(2) {
    background: url("../assets/img/home/home_11.png") #fff no-repeat;
  }

  .home-item-content aside:nth-of-type(3) {
    background: url("../assets/img/home/home_13.png") #fff no-repeat;
  }

  .home-item-content aside a {
    color: #01aaef;
    position: absolute;
    font-size: 14px;
    top: 160px;
    left: 10%;
  }

  .home-item-content article {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32%;
    height: 150px;
    padding: 0 36px;
    box-sizing: border-box;
  }

  .home-item-content article img {
    margin-bottom: 20px;
  }

  .home-item-content article span {
    margin-bottom: 10px;
    color: #01aaef;
    font-size: 12px;
    font-weight: bold;
  }

  .home-item-content article p {
    text-align: center;
    line-height: 21px;
    color: #555964;
  }

  .home-item-content.foot {
    justify-content: center;
  }

  .home-item-content dl {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 260px;
    text-align: center;
    margin-bottom: 30px;
  }

  .home-item-content dl dt {
    margin-bottom: 20px;
  }

  .home-item-content dl dd {
    line-height: 1.5em;
    color: #555964;
  }

  .home-item-content dl:nth-of-type(1) {
    margin-right: 50px;
  }

  .home-item-content dl:nth-of-type(2) {
    margin-left: 50px;
  }

  /*报价牌样式*/
  .index .split {
    height: .5rem;
    width: 5em;
    display: inline-block;
  }

  .market {
    background: #fff;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .market .trade-navs {
    height: 50px;
    line-height: 45px;
    text-align: center;
  }

  .market .trade-tabs {
    border: 2px solid #2A8863;
    border-radius: 4px;
    display: inline-block;
    height: 38px;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media ( min-width: 768px) {
    .container {
      width: 750px;
    }
  }

  @media ( min-width: 992px) {
    .container {
      width: 970px;
    }
  }

  @media ( min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }

  .container > .navbar-header, .container-fluid > .navbar-header, .container > .navbar-collapse, .container-fluid > .navbar-collapse {
    margin-right: -15px;
    margin-left: -15px;
  }

  @media ( min-width: 768px) {
    .container > .navbar-header, .container-fluid > .navbar-header, .container > .navbar-collapse, .container-fluid > .navbar-collapse {
      margin-right: 0;
      margin-left: 0;
    }
  }

  @media ( min-width: 768px) {
    .navbar > .container .navbar-brand, .navbar > .container-fluid .navbar-brand {
      margin-left: -15px;
    }
  }

  .container .jumbotron, .container-fluid .jumbotron {
    border-radius: 6px;
  }

  .jumbotron .container {
    max-width: 100%;
  }

  @media screen and (min-width: 768px) {
    .jumbotron {
      padding-top: 48px;
      padding-bottom: 48px;
    }

    .container .jumbotron, .container-fluid .jumbotron {
      padding-left: 60px;
      padding-right: 60px;
    }

    .jumbotron h1, .jumbotron .h1 {
      font-size: 54px;
    }
  }

  .clearfix:before, .clearfix:after, .dl-horizontal dd:before, .dl-horizontal dd:after, .container:before, .container:after, .container-fluid:before, .container-fluid:after, .row:before, .row:after, .form-horizontal .form-group:before, .form-horizontal .form-group:after, .btn-toolbar:before, .btn-toolbar:after, .btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after, .nav:before, .nav:after, .navbar:before, .navbar:after, .navbar-header:before, .navbar-header:after, .navbar-collapse:before, .navbar-collapse:after, .pager:before, .pager:after, .panel-body:before, .panel-body:after, .modal-footer:before, .modal-footer:after {
    content: " ";
    display: table;
  }

  .clearfix:after, .dl-horizontal dd:after, .container:after, .container-fluid:after, .row:after, .form-horizontal .form-group:after, .btn-toolbar:after, .btn-group-vertical > .btn-group:after, .nav:after, .navbar:after, .navbar-header:after, .navbar-collapse:after, .pager:after, .panel-body:after, .modal-footer:after {
    clear: both;
  }

  .container {
    width: 1170px;
    max-width: none !important;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  #newstoplist.container.text-center {
    overflow: hidden;
    height: 45px;
    width: auto;
    color: #ffffff;
  }

  .market .trade-tab {
    color: #333;
    display: inline-block;
    padding: 0 30px;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
    float: left;
    cursor: pointer;
    font-weight: bolder;
    letter-spacing: 1px;
  }

  .market .trade-tab:hover, .market .trade-tab.active {
    text-decoration: none;
    background: #2A8863;
    color: #fff;
    transition: all 0.3s;
  }

  .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  .market-top {
    background: #FAFAFA;
  }

  .market-top span {
    line-height: 40px;
    font-size: 14px;
    color: #9B9BA0;
    width: 12.2%;
    font-weight: bolder;
  }

  .text-center {
    text-align: center;
  }

  #newstoplist.container.text-center {
    overflow: hidden;
    height: 45px;
    width: auto;
    color: #ffffff;
  }

  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
    float: left;
  }

  .col-xs-2 {
    width: 16.66666667%;
  }

  .market-con {
    border-bottom: #f7f6f6 solid 1px;
    border-left: #f7f6f6 solid 1px;
    border-right: #f7f6f6 solid 1px;
  }

  .market-con:hover {
    background: #f8f8f8;
  }

  .canvas1:hover {
    background: #f8f8f8;
  }

  .market-con span {
    color: #83838d;
    line-height: 64px;
    /*text-indent: 1.5em;*/
    font-size: 16px;
    transition: all 0.5s;
    text-align: center;
    width: 12.2%;
    height: 64px;
    font-weight: bolder;
  }

  .market-con span.indent {
    text-indent: 1em;
  }

  .market-con span.indent-db {
    text-indent: 2em;
  }

  .market-con span:first-child {
    color: #616161;
    border-right: #f7f6f6 solid 1px;
  }

  .market-con .coin-logo {
    width: 26px;
    height: 26px;
    display: inline-block;
    /*margin-right: 10px;*/
    vertical-align: middle;
    font-size: 0;
  }

  .market-con .market-trading {
    background: #2A8863;
    border-radius: 5px;
    width: 127px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding: 8px 12px;
    text-indent: initial;
    position: relative;
    transition: all 0.2s;
    font-weight: bolder;
  }

  .market-con .market-trading:hover {
    background: #74A994;
    color: #fff;
  }

  .market-con .market-trading .triangle-right {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid #fff;
    border-bottom: 5px solid transparent;
    top: 12px;
    right: 20px;
    margin-left: 8px;
    display: inline-block;
    transition: all 0.2s;
    border-left: 10px solid #fff;
    border-bottom: 5px solid transparent;
  }

  .market-con .market-trading:hover .triangle-right {
    border-left: 10px solid #fff;
  }

  .text-danger {
    color: #da2e22 !important;
  }

  a.text-danger:hover, a.text-danger:focus {
    color: #843534;
  }

  .login .form-control, .login .btn {
    border-radius: 0;
    height: 35px;
  }

  .login .btn-left {
    padding-left: 2px;
  }

  .login .btn-right {
    padding-right: 2px;
  }

  .btn {
    border-radius: 0;
    outline: none;
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
    font-size: 12px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .btn:focus, .btn:active:focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn.active.focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  .btn:hover, .btn:focus, .btn.focus {
    color: #333333;
    text-decoration: none;
  }

  .btn:active, .btn.active {
    outline: 0;
    background-image: none;
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }

  .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
    cursor: not-allowed;
    opacity: 0.65;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  a.btn.disabled, fieldset[disabled] a.btn {
    pointer-events: none;
  }

  .market-con .market-trading:hover .triangle-right {
    border-left: 10px solid #fff;
  }

  * {
    box-sizing: border-box;
  }

  .coin-logo-BTC {
    background: url(../../src/assets/img/bilogo/egg_btc.png);
    background-size: 100% 100%;
  }

  .coin-logo-ETH {
    background: url(../../src/assets/img/bilogo/egg_eth.png);
    background-size: 100% 100%;
  }

  .coin-logo-BTM {
    background: url(../../src/assets/img/bilogo/egg_btm.png);
    background-size: 100% 100%;
  }

  .coin-logo-EOS {
    background: url(../../src/assets/img/bilogo/egg_eos.png);
    background-size: 100% 100%;
  }

  * {
    outline: none;
  }
</style>
