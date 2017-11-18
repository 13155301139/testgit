<template>
  <div class="quotation">

    <div class="inner-container">

      <div class="quotation-header">

        <div class="quotation-header-left">
          <router-link to="/home"><img src="../assets/img/quotation/quotation_logo.png"/></router-link>
          <div class="transaction-variety">
            <div class="transaction-btn-box" @click="closeOPenTradingClass()" style="cursor: pointer">
              <span>币币交易区</span>
              <i class="iconfont" >&#xe673;</i>
            </div>
            <transition
              enter-active-class="animated fadeIn"
              leaveActiveClass="animated fadeOut"
            >
              <div class="select-trading-class" v-show="sserl">
                <div class="select-trading-coin">
                  <div class="BaoJia">
                    <div v-for="item in coinStyle">
                      <span style="flex: 1" class="baojia-title">{{item.commodity}}</span>
                    <span style="flex: 1"
                          v-if="item.commodity.indexOf('CNY')!==-1">{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float2}}</span>
                    <span style="flex: 1"
                          v-else>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float6}}</span>
                      <p style="flex: 1;"
                         :class="((businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising:'')<0)? 'red':((businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising:'')>0)?'green':''">
                        <span>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising : 0 | BaoJ}}</span>
                      <span v-if="businessPrice.get(item.commodity)">
                  <i class="el-icon-caret-top" v-show="businessPrice.get(item.commodity).rising>0"></i>
                  <i class="el-icon-caret-bottom" v-show="(businessPrice.get(item.commodity).rising<0)"></i>
                  <i class="el-icon-minus" v-show="(businessPrice.get(item.commodity).rising===0)"></i>
                </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="transaction-variety-chuangxin" >
            <div class="transaction-btn-box" style="cursor: pointer" @click="closeOPenTradingClass2()">
              <span>创新区</span>
              <i class="iconfont" >&#xe673;</i>
            </div>
            <!-- <transition
              enter-active-class="animated fadeIn"
              leaveActiveClass="animated fadeOut"
            >
              <div class="select-trading-class" v-show="sser2">
                <div class="select-trading-coin">
                  <div class="BaoJia">
                    <div v-for="item in coinStyle">
                      <span style="flex: 1" class="baojia-title">{{item.commodity}}</span>
                      <span style="flex: 1"
                            v-if="item.commodity.indexOf('CNY')!==-1">{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float2}}</span>
                      <span style="flex: 1"
                            v-else>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float6}}</span>
                      <p style="flex: 1;"
                         :class="((businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising:'')>0)? 'red':((businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising:'')<0)?'green':''">
                        <span>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising : 0 | BaoJ}}</span>
                        <span v-if="businessPrice.get(item.commodity)">
                    <i class="el-icon-caret-top" v-show="businessPrice.get(item.commodity).rising>0"></i>
                    <i class="el-icon-caret-bottom" v-show="(businessPrice.get(item.commodity).rising<0)"></i>
                    <i class="el-icon-minus" v-show="(businessPrice.get(item.commodity).rising===0)"></i>
                  </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition> -->
          </div>
        </div>
        <div class="quotation-header-right">
          <div class="login-show-box-k"><a href="javascript:;" v-show="!trading_login" @click="TKShowTrue()">登录</a></div>
          <transition enter-active-class="animated fadeIn" leaveActiveClass="animated fadeOut">
            <div class="login-show-box-k" v-show="trading_login">
              <img src="../assets/img/header/fw_header_user.png" alt=""/>
              <span class="user-phone">{{userNumM}}</span>
              <a href="javascript:;" @click="KTClose()">退出</a>
            </div>
          </transition>
          <div>
            <!--<a href="javascript:;">返回专业版</a>-->
            <router-link to="/business">返回专业版</router-link>
          </div>
          <div>
            <a href="javascript:;" v-show="!ZXIANG" @click="ZTURE()">纵向</a>
            <a href="javascript:;" v-show="ZXIANG" @click="ZFALSE()">返回</a>
          </div>
          <div>
            <a href="javascript:;" v-show="!HXIANG" @click="HTURE()">横向</a>
            <a href="javascript:;" v-show="HXIANG" @click="HFALSE()">返回</a>
          </div>
        </div>

      </div>
      <div class="quotation-center">
        <div class="quotation-chart">
          <!--行情K线图-->
          <div class="quotation-chart-line">
            <KLine></KLine>
          </div>

          <div class="quotation-chart-data-ipt-box">
            <div class="quotation-chart-data-ipt">
              <a href="javascript:;" class="quotation-chart-data-ipt-select" :myIndex="1" @click="getData($event)">当前委托</a>
              <!--<a href="javascript:;" :myIndex="2">计划委托</a>-->
              <a href="javascript:;" :myIndex="3" @click="getData($event)">历史委托</a>
            </div>
            <div class="quotation-chart-data-ipt-more">
              <router-link to="/business">更多记录</router-link>
              <!--<a href="javascript:;">更多记录</a>-->
            </div>
          </div>

          <div v-show="hideHeader" class="quotation-chart-data">
            <div class="quotation-chart-data-table-box">
              <table>
                <thead>
                <tr>
                  <td>委托时间</td>
                  <td>委托价格</td>
                  <td>委托量</td>
                  <td>成交量</td>
                  <td>方向</td>
                  <td>委托类型</td>
                  <td>成交均价</td>
                  <td v-show="!newData">成交额</td>
                  <td v-show="newData">操作<a href="javascript:;" style="color: #3db45f" v-show="revoke1AllState" @click="revoke1All()">[批量撤单]</a></td>
                  <td v-show="!newData">状态</td>
                </tr>
                </thead>
                <tbody v-show="!trading_login">
                <tr>
                  <td colspan="8" class="noCode-tbody-td">您还没有登录，请<a href="javascript:;" style="color: #de211d" @click="TKShowTrue()">登录</a>或<router-link to="/register" style="color: #3da248">注册</router-link>后再尝试</td>
                </tr>
                </tbody>
                <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody"
                                  v-show="(noRecord=entrust.totalElements>0) && newData &&trading_login">
                  <tr v-for="(item,index) in entrust.content" :index="index" :key="index">
                    <td>{{item.createDate | dateYMDHIS}}</td>
                    <td>{{item.price | return_}}</td>
                    <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{item.amount | float4 }}</td>
                    <td v-else>{{item.amount | float4 }}</td>
                    <td>{{item.dealVolume | float4}}</td>
                    <td>{{item.cammand | translate}}</td>
                    <td>{{item.orderType | translate}}</td>
                    <td>{{item.dealPrice | float6}}</td>
                    <td><a href="javascript:;" :code="item.code" :commodity="item.commodity"
                           style="color:#01aaef"
                           @click="revoke1($event)">撤销</a></td>
                  </tr>
                </transition-group>
                <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody"
                                  v-show="noRecord1 && !newData &&trading_login">
                  <tr v-for="(item,index) in entrust_history" :index="index" :key="index">
                    <td>{{item.createDate | dateYMDHIS}}</td>
                    <td>{{item.price | return_}}</td>
                    <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{item.amount | float4 }}</td>
                    <td v-else>{{item.amount | float4 }}</td>
                    <td>{{item.dealVolume | float4}}</td>
                    <td>{{item.cammand | translate}}</td>
                    <td>{{item.orderType | translate}}</td>
                    <td v-show="!newData">{{item.dealPrice | float6}}</td>
                    <td>{{item.dealAmount | float4}}</td>
                    <td>{{item.orderStatus | translate}}</td>
                  </tr>
                </transition-group>
              </table>
            </div>
          </div>
        </div>
        <div v-show="hideRight" class="quotation-trading">
          <header>
            {{BaojiaPing | BJCurrency}}
            交易 </header>
          <div class="quotation-pankou-wrap">
            <div class="quotation-pankou">
              <div class="quotation-pankou-s dtscoll">
                <table>
                  <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody">
                    <tr v-for="(item,index) in depth.s" :key="index" @click="aaa(item, 0)">
                      <td class="display-flex green" v-html="PanKouDataPrice(Float4(item.price))"></td>
                      <td v-html="PanKouDataVol(Float4(item.vol))" style="color: #a7acaf"></td>
                      <!--<td>{{(!isNaN(mySell[index]) ? (mySell[index].toFixed(4)) : '-')}}</td>-->
                    </tr>
                  </transition-group>
                </table>
              </div>
              <span>{{BaoJia.price | float6}}</span>
              <div class="quotation-pankou-b dtscoll">
                <table>
                  <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody">
                    <tr v-for="(item,index) in  depth.b" :key="index" @click="aaa(item, 1)">
                      <td class="display-flex red" v-html="PanKouDataPrice(Float4(item.price))"></td>
                      <td v-html="PanKouDataVol(Float4(item.vol))" style="color: #a7acaf"></td>
                      <!--<td>{{(!isNaN(myBuy[index]) ? (myBuy[index].toFixed(4)) : '-')}}</td>-->
                    </tr>
                  </transition-group>
                </table>
              </div>
            </div>
            <div class="quotation-jiaoyiliushui dtscoll">
              <table>
                <tbody>
                <tr v-for="(item,index) in trades">
                  <td>{{item.time | dateHIS}}</td>
                  <td class="display-flex"><span v-html="Float4(item.price)"
                                                 :class="item.rising>0?'red':'green'"></span></td>
                  <td>{{item.volume | float4}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="quotation-trading-from">
            <div class="quotation-trading-from-ch buy">
              <p>
                <span>可用：</span><span class='KBuyMoneny'>{{KMoneny[BaojiaPing] ? Float4(KMoneny[BaojiaPing.substr(-3)+BaojiaPing.substr(-3)]) : '--'}}</span>{{BaojiaPing | substr_3}}
              </p>
              <p><span>可买：</span><span class='KBuyNum'>{{KMoneny[BaojiaPing] ? Float4(KMoneny[BaojiaPing.substr(-3)+BaojiaPing.substr(-3)]/(Number(buyPrice) ? buyPrice : 1)): '--'}}</span>{{BaojiaPing | substr3}}</p>
              <div style="margin-top: 5px;">
                <label for="buyPrice">买入价({{BaojiaPing | substr_3}})</label>
                <input id="buyPrice" class="quotation-trading-from-ch-ipt ch-ipt1" v-model="buyPrice"/>
              </div>
              <div>
                <label for="buyVol">买入量({{BaojiaPing | substr3}})</label>
                <input id="buyVol" class="quotation-trading-from-ch-ipt ch-ipt2" v-model="buyNum"/>
              </div>
              <!--
              <div class='valueBuy-class'><el-slider
                v-model="valueBuyE"
                @change="BuySliderE"
                :format-tooltip="formatTooltip"
              ></el-slider>
              -->
              <div class='valueBuy-class'>
                <pointSlider :value="valueBuyE" @update:value="val => valueBuyE = val" />
              </div>

              <p><span>预计交易额：</span>{{buySum | float4}}{{BaojiaPing | substr_3}}</p>
              <button @click="businessBuy()">立即买入</button>
            </div>
            <div class="quotation-trading-from-ch sell">
              <p>
                <span>可用：</span><span class='KSellMoneny'>{{KMoneny[BaojiaPing] ? Float4(KMoneny[BaojiaPing]): '--'}}</span>{{BaojiaPing | substr3}}
              </p>
              <p><span>可卖：</span><span class='KSellNum'>{{KMoneny[BaojiaPing] ? Float4(KMoneny[BaojiaPing]): '--'}}</span>{{BaojiaPing | substr3}}</p>
              <div style="margin-top: 5px;">
                <label for="sellPrice">卖出价({{BaojiaPing | substr_3}})</label>
                <input id="sellPrice" class="quotation-trading-from-ch-ipt ch-ipt3" v-model="sellPrice"/>
              </div>
              <div>
                <label for="sellVol">卖出量({{BaojiaPing | substr3}})</label>
                <input id="sellVol" class="quotation-trading-from-ch-ipt ch-ipt4" v-model="sellNum"/>
              </div>
              <!--
              <div class='valueSell-class'><el-slider
                v-model="valueSellE"
                @change="SellSliderE"
                :format-tooltip="formatTooltip"
              ></el-slider>
              -->
              <div class='valueSell-class'>

              <pointSlider :value="valueSellE" @update:value="val => valueSellE = val" :sliderType="1" />

            </div>
              <p><span>预计交易额：</span>{{sellSum | float4}}{{BaojiaPing | substr_3}}</p>
              <button @click="businessSell()">立即卖出</button>
            </div>
          </div>
        </div>
      </div>
      <transition enter-active-class="animated fadeIn" leaveActiveClass="animated fadeOut">
        <TKLogin v-show="TKLoginShow"></TKLogin>
      </transition>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import TKLogin from '../components/lettle_components/TKLogin.vue';
  import KLine from '../components/K.vue';
  import {mapGetters} from 'vuex';

  import pointSlider from '../components/pointSlider/pointSlider';

  export default {
    data() {
      return {
        coinStyle: [],
        warningData: [],
        entrust_current: [],
        entrust_history: [],
        noRecord: false,
        noRecord1: false,
        trading_style: true,
        cnyAccount: true,
        userNumM: '',
        commodity: '',
        account: '',
        cunency: '',
        newData: true,
        currentPage: 1,
        BaojiaPing: '',//报价货币名称
        sserl: false,
        sser2:false,
        BaoJiaObj: {'': {}},//报价obj
        BaoJia: {},
        socket: '',
        userId: '',//用戶id
        officePrice: {},
        KMoneny: [],
        revoke1AllState: false,
        pageSizeNum: 0,
        ZXIANG: false,
        HXIANG: false,
        hideRight: true,
        hideHeader: true,
        buyPrice:'',
        buyNum:'',
        buySum:'',
        sellPrice:'',
        sellNum:'',
        sellSum:'',
        legalCurrency:'ETH', //结算币种
        tradeCurrency:'BTM',  //交易币种
        assets:{},
        valueBuyE:0,
        valueSellE:0,
        winHeight:0
      }
    },
    components: {
      TKLogin,
      KLine,
      pointSlider
    },
    created() {

      this.getBaoPrice();
    },
    mounted() {
      let _this=this;
      this.ar()
      var commodity = localStorage.getItem('commodity');
      this.legalCurrency = commodity.substring(3, 6);
      this.tradeCurrency = commodity.substring(0,3);
      this.BaojiaPing = commodity;
      var dd=setInterval(function() {
        // console.log(1)
       _this.buyPrice=_this.sellPrice=(_this.$store.state.businessPrice.data.get(_this.BaojiaPing)?_this.$store.state.businessPrice.data.get(_this.BaojiaPing).price:0).toFixed(4);
        if(Number(_this.buyPric) || Number(_this.sellPrice)){
          clearInterval(dd);
          // console.log(1)
        }
      }, 500);
      localStorage.setItem('timers', 'min1');
      //阻止行情面板页面刷新时，头部和尾部组件出来
      {
        this.$store.dispatch('hideHeader');
        this.$store.dispatch('hideFooter');
      }
      {

      }
      {
        this.entrust_current = this.$store.state.weiTuo;
      }
      {
        $('.quotation-chart-data-ipt a').click(function () {
          $(this).addClass('quotation-chart-data-ipt-select').siblings().removeClass('quotation-chart-data-ipt-select');
//          alert($(this).attr('myIndex'));
        });
      }
      {
          let _this=this;
          $('.ch-ipt1').blur(function () {
            _this.buyPrice=Number($(this).val()).toFixed(4);
          });
        $('.ch-ipt2').blur(function () {
          _this.buyNum=Number($(this).val()).toFixed(4);
        });
        $('.ch-ipt3').blur(function () {
          _this.sellPrice=Number($(this).val()).toFixed(4);
        });
        $('.ch-ipt4').blur(function () {
          _this.sellNum=Number($(this).val()).toFixed(4);
        });
      }

      var that = this;

      //监听最新价,动态更新 kyc
      window.addEventListener("latestPrice", function (e) {
        that.BaoJia = e.newValue;
//        console.log(that.BaoJia,'jiantingdao');
      });
      window.addEventListener('userCapital', function () {
//          console.log('监听到资产发生变化')
        that.getCapitalInfo();
      });
      window.addEventListener('rellAllState', function () {
        if (that.$store.state.loginState) {
          if (that.newData) {
            that.request_entrust_current(1);
          } else {
            that.request_entrust_history(1)
          }
        }
      });

      window.onresize=function(){
        _this.ar();
      }
    },
    methods: {
      ar(){
        console.log("修改页面")
        if (window.innerHeight){
                  this.winHeight = window.innerHeight;
                }else if ((document.body) && (document.body.clientHeight)){
                  this.winHeight = document.body.clientHeight;
                }

            //通过深入Document内部对body进行检测，获取浏览器窗口高度
                  if (document.documentElement && document.documentElement.clientHeight){
                      this.winHeight = document.documentElement.clientHeight;
                  }
                  let oWidth = $(document).width();
        let oHeight = $(document).height();
        let odHeight = window.screen.height - 75;
        let odWight = window.screen.width;
        if (odHeight < 700) {
          this.pageSizeNum = 5;
          $('.numBGColor').css({
            height: '100px'
          })
          $('.numBGColor1').css({
            height: '100px'
          })
        } else {
          this.pageSizeNum = 10;
        }
        //$('.quotation').css({height: this.winHeight + 'px', width: odWight + 'px'});
        //$('.quotation-center').css({height: odHeight * 0.98 + 'px'});
        //$('.quotation-center-table1').css({maxHeight: (odHeight - 120) + 'px', overflow: 'hidden'})
      },
      aaa(item, index){
        if(index === 0){
          this.buyPrice = item.price.toFixed(4);
          this.buyNum = item.vol.toFixed(4);
        }else{
          this.sellPrice = item.price.toFixed(4);
          this.sellNum = item.vol.toFixed(4);
        }

      },

      getUserMessage() {
        let _this = this;
        setTimeout(function () {
          let res = localStorage.getItem('getU');
          _this.userNumM = JSON.parse(res).loginUser;
          _this.userId = JSON.parse(res).id;
        }, 500);
      },
      businessBuy() {
        this.getCommodity();
        if(this.$store.state.loginState){
          if(this.buyPrice && this.buyNum){
            this.$http({
              url: this.$URL_API + 'trade/entrust',
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Authorization': 'Bearer ' + this.$store.state.token,
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: {
                commodity: this.commodity,
                types: 'B_LIMITED',
                price: this.buyPrice,
                amount: this.buyNum,
                source: 'WEB'
              }
            }).then((res) => {
//              console.log(res);
              if (res.data.code === 200) {
                this.showError(res.data.code, res.data.message);
                this.getCapitalInfo();
//              this.request_entrust_current(1);
                this.newData = true;
              } else {
                this.showError(res.data.code, res.data.message)
              }
            }).catch((req) => {
//              console.log(req)
              this.showError(req.code, req.message)
            })
          }else {
            this.showError('','请检查输入框是否完整')
          }
        }else {
          this.showError('','请先登录');
        }

      },//交易
      businessSell() {
        this.getCommodity();
        if(this.$store.state.loginState){
          if(this.sellPrice && this.sellNum){
            this.$http({
              url: this.$URL_API + 'trade/entrust',
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Authorization': 'Bearer ' + this.$store.state.token,
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: {
                commodity: this.commodity,
                types: 'S_LIMITED',
                price: this.sellPrice,
                amount: this.sellNum,
                source: 'WEB'
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.showError(res.data.code, res.data.message);
                this.getCapitalInfo();
//              this.request_entrust_current(1);
                this.newData = true;
              } else {
                this.showError(res.data.code, res.data.message)
              }
            }).catch((req) => {
              this.showError(req.code, req.message)
            })
          }else {
            this.showError('','请检查输入框是否完整')
          }
        }else {
            this.showError('','请先登录');
        }

      },//交易
      getData(ev) {
          let a=ev.target.getAttribute('myIndex');
//          console.log(typeof ev.target.getAttribute('myIndex'));
          switch (a){
            case '1':
//                console.log(1);
              this.newData=true;
              this.request_entrust_current(1);
              break;
            case '3':
//                console.log(3);
              this.newData=false;
              this.request_entrust_history(1)
          }

//        this.newData = !this.newData;
//        if (this.newData) {
//          this.request_entrust_current(1);
//        } else {
//          this.request_entrust_history(1)
//        }
      },//获取委托
      TKShowTrue() {
        this.$store.state.TKShow = true
      },
////      截屏
//      screenshot() {
//        html2canvas(document.body, {
//          onrendered: function (canvas) {
//            $('.screenShot').css({display: 'block'});
//            $('.screenShot-content-home').html(canvas);
//          },
//          width: 355,
//          height: 200
//        });
//      },
////      关闭截屏弹窗
//      closeScreenShot() {
//        $('.screenShot').css({display: 'none'});
//      },
//      选择交易品种
      closeOPenTradingClass() {
        this.sser2=false;
        this.sserl = !this.sserl
      },
      closeOPenTradingClass2() {
        this.sserl=false;
        this.sser2 = !this.sser2
      },
//      价格预警
      oPenWaring() {
        $('.header-warning').show();
      },
      RouterGo() {
        this.getCapitalInfo();
      },
      KTClose() {
        localStorage.removeItem('token');
        localStorage.removeItem('userPsd');
        localStorage.removeItem('userName');
        localStorage.removeItem('signTime');
        sessionStorage.removeItem('EMAIL');
        sessionStorage.removeItem('MOBILE');
        localStorage.removeItem('getU');
        this.$store.state.token = '';
        this.$store.state.loginTrue = false;
        this.$store.dispatch('loginStateFalse');
        this.sendEvent('logout', '');
      },
//      getTypes() {
//        if (this.trading_style) {
//          //买
//          //console.log("买");
//          if (this.businessStyle2) {
//            //console.log('限价买');
//            this.amount = this.business_num;
//            this.types = 'B_LIMITED';
//          } else {
//            //console.log('市价买');
//            this.amount = this.business_price;
//            this.types = 'B_MARKET';
//          }
//        } else {
//          //卖
//          //console.log("卖");
//          if (this.businessStyle1) {
//            //console.log('限价卖');
//            this.amount = this.business_num;
//            this.types = 'S_LIMITED';
//          } else {
//            //console.log('市价卖');
//            this.types = 'S_MARKET';
//            this.amount = this.business_num;
//          }
//        }
//      },//获取买卖方式
      getCommodity() {
        this.commodity = localStorage.getItem('commodity');
      },//获取交易品种
      revoke1(ev) {
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
            this.getCapitalInfo();
            this.currentPage = 1;
//            ev.target.parentNode.parentNode.remove();
//            this.request_entrust_current(this.currentPage);
          }
        }).catch((req) => {
          this.showError(req.code, req.message);
        })

      },
      revoke1All(){
        this.$http({
          url: this.$URL_API + 'trade/cancelsAll/' + localStorage.getItem('commodity'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      request_entrust_current(currentPage) {
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
            pageSize: this.pageSizeNum,
            param: {
              commodity: localStorage.getItem('commodity'),
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNum1 = res.data.data.totalElements ? res.data.data.totalElements : this.pageSizeNum;
            this.noRecord = res.data.data.totalElements > 0;
            this.revoke1AllState = res.data.data.totalElements > 0;
            for (let i = 0; i < this.entrust_current.length; i++) {
              this.entrust_current[i].orderSerialList = null;
            }
            this.$store.state.weiTuo = res.data.data;
          } else {
            this.totalNum1 = this.pageSizeNum;
            this.noRecord = false;
          }
        })
      },
      request_entrust_history(currentPage) {
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
            pageSize: this.pageSizeNum,
            param: {
              commodity: localStorage.getItem('commodity'),
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNum2 = res.data.data.totalElements ? res.data.data.totalElements : this.pageSizeNum;
            this.noRecord1 = res.data.data.totalElements > 0;
            this.entrust_history = res.data.data.content;
          } else {
            this.totalNum2 = this.pageSizeNum;
            this.noRecord = false;
          }
        })
      },
      handleCurrentChange2(currentPage) {
        this.currentPage = currentPage;
        this.request_entrust_current(currentPage)
      },
      handleCurrentChange3(currentPage) {
        this.request_entrust_history(currentPage)
      },
      dt(de) {
        this.BaojiaPing = de.find('.baojia-title').text();
        this.$store.state.LatestPriceCurrency = this.BaojiaPing;
        this.cunency = (this.BaojiaPing).substring(0, 3);
        this.account = (this.BaojiaPing).substr(-3);
      },
      getBaoPrice() {
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let dd = res.data.data;
            for (let i = 0; i < dd.length; i++) {
              if (dd[i].commodity.substr(-3) === 'CNY') {
                this.officePrice[dd[i].commodity.substr(0, 3)] = dd[i];
              }
            }
            this.coinStyle = res.data.data;
            this.$store.state.trades = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.BaoJiaObj[res.data.data[i].commodity] = {
                price: res.data.data[i].price,
                rising: res.data.data[i].rising,
                vol: res.data.data[i].vol
              }
            }
          }
        }).then(() => {
          let that = this;
          $('.BaoJia div').click(function () {
              that.BaojiaPing = $(this).find('.baojia-title').text();
              that.$store.state.LatestPriceCurrency = that.BaojiaPing;
              localStorage.setItem('commodity', that.BaojiaPing);
              that.sendEvent('rellAllState', '');
              that.sserl = false;
              that.sser2 = false;
              that.cunency = (that.BaojiaPing).substring(0, 3);
              that.account = (that.BaojiaPing).substr(-3);

              //切换品种后 更新
              that.tradeCurrency = (that.BaojiaPing).substring(0, 3);
              that.legalCurrency = (that.BaojiaPing).substr(-3);
              that.getCapitalInfo();

//              that.getDepth();
              that.dt($(this));
            }
          )
        })

        // console.log(socket);

      },
//      获取用户资金信息
      getCapitalInfo() {
        this.$http({
          url: this.$URL_API + 'capital/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.KMoneny = [];
            let dd = res.data.data;
            // console.log(dd,'用户资金信息');
            for (let i = 0; i < dd.length; i++) {
              this.KMoneny[dd[i].currency+dd[i].legalMoney]=dd[i].balance
            }
            // console.log(this.KMoneny,'修改后的资金信息')
          }
        })
      },
      ZTURE(){
        this.ZXIANG = true;
        //$('.quotation-chart-line').css({height: '96%'});
//        $('#chart_mainCanvas').css({height:'100%'});
//        $('#chart_overlayCanvas').css({height:'100%'});
       this.hideHeader=false;
       let _this=this;
       $('.chart_option').css({height: $(window).height()+'px'});
       setTimeout(function(){
       _this.sendEvent('rellAllStates', '');
       },0)
//        this.sendEvent('rellAllStates', '');
        console.log("发射了")
      },
      ZFALSE(){
        this.ZXIANG = false;
        this.hideHeader=true;
        //$('.quotation-chart-line').css({height: '68%'});
//        $('#chart_mainCanvas').css({height:'70%'});
//        $('#chart_overlayCanvas').css({height:'70%'});
        this.sendEvent('rellAllStates', '');
        console.log("发射了")
      },
      HTURE(){
        this.HXIANG = true;
        this.hideRight = false;
        let _this=this;
        $('.chart_option').css({width: $(window).width()+'px'});
     setTimeout(function(){
        _this.sendEvent('rellAllStates', '');
     },0)
        console.log("发射了")
      },
      HFALSE(){
        this.hideRight = true;
        this.HXIANG = false;
        //$('.quotation-chart').css({width: '70%'});
        this.sendEvent('rellAllStates', '');
        console.log("发射了")

      },
      formatTooltip(val){
        return val+'%'
      },
      BuySliderE(e){
          // console.log($('.KBuyNum').html());
          var a=$('.KBuyNum').html();
          this.buyNum=(a * this.valueBuyE * 0.01).toFixed(4);
          // console.log(this.valueBuy);
      },
      SellSliderE(e){
          // console.log($('.KBuyNum').html());
          var a=$('.KSellNum').html();
          this.sellNum=(a * this.valueSellE * 0.01).toFixed(4);
          // console.log(this.valueBuy);
      },
    },
    computed: {
      TKLoginShow() {
        return this.$store.state.TKShow;
      },
      trading_login() {
        if (this.$store.state.loginState) {
          this.request_entrust_current(1);
          this.getUserMessage();
          this.getCapitalInfo();
        }
        return this.$store.state.loginState;
      },
      myBuy() {
        if (this.depth.b.length > 0 && this.entrust.content.length > 0) {
          var size = this.depth.b.length;
          var buyList = new Array(size);
          for (var i = 0; i < size; i++) {
            for (let item of this.entrust.content) {
              if (this.depth.b[i].price === item.price) {
                buyList[i] = item.amount - item.dealVolume + (isNaN(buyList[i]) ? 0 : buyList[i]);
              }
            }
          }
          return buyList;
        }
        return [];
      },
      mySell() {
        if (this.depth.s.length > 0 && this.entrust.content.length > 0) {
          var size = this.depth.s.length;
          var sellList = new Array(size);
          for (var i = 0; i < size; i++) {
            for (let item of this.entrust.content) {
              if (this.depth.s[i].price === item.price) {
                sellList[i] = item.amount - item.dealVolume + (isNaN(sellList[i]) ? 0 : sellList[i]);
              }
            }
          }
          return sellList;
        }
        return [];
      },
      ...mapGetters(['trades', 'depth', 'entrust', 'businessPrice'])
    },
    watch: {
      sellPrice(){
          if(!isNaN(this.sellPrice)){
            if(this.sellPrice && this.sellNum){
              this.sellSum = (this.sellPrice * this.sellNum).toFixed(8);
            }
          }else {
            this.sellPrice = 0;
          }

      },
      sellNum(){
          if(!isNaN(this.sellNum)){
            if(this.sellPrice && this.sellNum){
              this.sellSum = (this.sellPrice * this.sellNum).toFixed(8);
            }
          }else {
            this.sellNum = 0;
          }

      },
      buyPrice(){
          if(!isNaN(this.buyPrice)){
            if(this.buyPrice && this.buyNum){
              this.buySum = (this.buyPrice * this.buyNum).toFixed(8);
            }
          }else {
            this.buyPrice = 0;
          }
      },
      buyNum(){
          if(!isNaN(this.buyNum)){
            if(this.buyPrice && this.buyNum){
              this.buySum = (this.buyPrice * this.buyNum).toFixed(8);
            }
          }else {
            this.buyNum = 0;
          }

      },
       BaojiaPing(){
        console.log(this.BaojiaPing)
this.buyPrice=this.sellPrice=(this.$store.state.businessPrice.data.get(this.BaojiaPing)?this.$store.state.businessPrice.data.get(this.BaojiaPing).price:0).toFixed(4);
      }
    }


  }
</script>
<style lang="less" scoped>

  .quotation {
    /*width: 100%;
    height: 100%;
    */
    position: fixed;

    left: 0;

    right: 0;

    top: 0;

    bottom: 0;

    overflow: auto;

    background: #fff;

    margin: 0 !important;

    .inner-container {
      height: 100%;

      min-width: 1070px;

      min-height: 650px;

      display: flex;

      flex-direction: column;
    }

  }

  .quotation-header {
    display: flex;
    height: 2rem;
    align-items: center;
    padding: 1rem 0;
    width: 100%;
    background: #1f1d1d;
    justify-content: space-between;

    &>div>div {
      padding: 0 1.5rem;
      border-left: 1px solid #ddd;
    }

  }

  .quotation-header-left > a {
    padding: 0 1.5rem;
  }

  .quotation-pankou {
    display: flex;

    flex-direction: column;

    width: 168px;
    box-sizing: border-box;

    border-right: 1px solid #404040;

  }

  .quotation-pankou > div {
    flex: 1;
    overflow: auto;

  }

  .quotation-pankou > span {
    display: block;
    height: 26px;

    line-height: 26px;
    text-align: center;

    border-top: 1px solid #404040;
    border-bottom: 1px solid #404040;

    font-size: 18px;
    color: #00FF00;
    background: #2b2929;
  }

  .quotation-header-left, .quotation-header-right {
    display: flex;
    align-items: center;
  }

  .transaction-btn-box {
    display: flex;
    align-items: center;
  }

  .transaction-variety > span {
    font-size: 1.167rem;
    font-weight: bold;
    color: #66a9e6;
  }

  .transaction-variety {
    position: relative;
  }

  .select-trading-class {
    position: absolute;
    background: #fff;
    width: 18.25rem;
    right: 0;
    border: 1px solid #ddd;
    border-radius: 0.333rem;
    top: 3.5rem;
    padding: 1rem 0.83rem;
    z-index: 9;

  }

  .select-trading-coin > div {
    border-left: 1px solid #ccc;
    padding-left: .6rem;
  }

  .select-trading-coin > span {
    color: #000;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 1.083rem;
    margin-left: .2rem;
  }

  .select-trading-coin > div > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }

  .select-trading-coin > div > div > p {
    display: flex;
    align-items: center;
    justify-content: flex-end;

  }

  .select-trading-coin > div > div > p > span {
    margin-right: .9rem;
  }

  .transaction-btn-box > span {
    font-size: 1rem;
    color: #8a9195;
  }

  .transaction-btn-box > .iconfont {
    color: #0a0a0a;
    font-weight: bold;
    margin-left: 1rem;
  }

  .quotation-center {
    display: flex;

    flex: 1;

    background: #1f1d1d;
  }

  .quotation-center > div {
    border: 1px solid #404040;
    border-bottom: none;
    background: #1f1d1d;
  }

  .quotation-chart {
    display: flex;

    flex-direction: column;

    flex: 1;
  }

  .quotation-chart-line {
    flex: 1;
    position: relative;

  }

  .quotation-trading  {
    position: relative;

    display: flex;

    flex-direction: column;

    width: 33%;

    min-width: 360px;

    header {
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 14px;
      color: red;

      border: 1px solid #404040;
      background: #0a0a0a;
    }
    .quotation-pankou-wrap {
      display: flex;

      flex: 1;
    }

  }

  .quotation-trading-from{
    display: flex;

    border-top: 1px solid #404040;
  }
  .quotation-trading-from-ch {
    flex: 1;

    padding: 10px;

    background: #0a0a0a;
    border: 1px solid #404040;
  }

  .BaoJia > div {
    padding: .8rem 0;
    margin-bottom: 0 !important;
  }

  .BaoJia > div:hover {
    background: #f5f5f5;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .quotation-chart-data {
    min-height: 180px;
    height:30%;
    /*width: 70%;*/
    background: #1f1d1d;
    border: 1px solid #404040;
    padding-right: 10px;

    overflow: auto;
  }

  .quotation-chart-data-ipt-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    border-bottom: 1px solid #404040;

  }

  .quotation-chart-data-ipt-box > div {
    display: flex;
    align-items: center;

  }

  .quotation-chart-data-ipt a {
    padding: 3px 20px;
    color: #6d7b82;
    margin: 0 5px;
    background: #2f2c2c;
    font-size: 14px;
  }

  .quotation-chart-data-ipt-select {
    background: #de211d !important;
    color: #fff !important;
  }

  .login-show-box-k {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    color: #fff;
  }

  .login-show-box-k img {
    width: 35px;
  }

  .login-show-box-k > span {
    margin: 0 1rem;
    font-size: 1.167rem;
  }

  .login-show-box-k > a {
    width: 30px;
  }

  .quotation-header-right a {
    color: #fff;
  }

  .quotation-pankou-s {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  table {
    border-spacing: 0;
    width: 100%;
    border-collapse: collapse;
  }

  .quotation-pankou table td {
    cursor: pointer;
    width: 50%;
    padding: 2px 0;
    letter-spacing: 1px;
  }
  table tr:hover {
    cursor: pointer;
    background: #383838;
  }

  .quotation-pankou table tr td:nth-of-type(1) {
    text-align: right;
    padding-right: 15px;
  }

  .quotation-pankou table tr td:nth-of-type(2) {
    display: block;
    padding-left: 15px;
  }

  .quotation-jiaoyiliushui {
    flex: 1;
    /* padding-top: 30px; */
    box-sizing: border-box;
    overflow: auto;
  }

  .quotation-jiaoyiliushui table td {
    color: #fff;
    text-align: center;
    line-height: 1.5;
    letter-spacing: 1px;
  }

  .quotation-jiaoyiliushui table tr td:nth-of-type(2) {
    margin-right: 30px;
  }

  .quotation-trading-from > div {
    background: #1f1d1d !important;
    border: none !important;
  }

  .quotation-trading-from-ch p, .quotation-trading-from-ch div {
    /*display: flex;*/
    align-items: center;
    justify-content: flex-start;
    color: #6d7b82;
  }

  .quotation-trading-from-ch div {
    position: relative;

    border: 1px solid #6d7b82;
    padding-right: 15px;
    padding-left: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;
  }

  .quotation-trading-from-ch div label {
    position: absolute;

    left: 10px;

    top: 2px;

    z-index: 90;

    font-size: 12px !important;
  }

  .quotation-trading-from-ch div input {
    display: block;

    width: 100%;

    outline: none;
    border: none;
    background: none;
    color: #fff;
    text-align: right;

    line-height: 17px;

    padding: 1px 0;
  }

  .quotation-trading-from-ch button {
    margin: 5px 0;
    display: block;
    width: 100%;
    height: 26px;
    cursor: pointer;
    color: #fff;
    border: none;
    outline: none;
  }

  .quotation-trading-from-ch.buy button {
    background: #de211d;
  }

  .quotation-trading-from-ch.sell button {
    background: #3dc18e;
  }

  .quotation-chart-data-ipt-more a {
    color: #de211d;
  }
  .quotation-chart-data a{
    display: inline;
    margin: 0 5px;
  }
  .quotation-chart-data table thead{
    border-bottom: 1px solid #404040;
  }
  .quotation-chart-data table td{
    padding: 5px 0;
    text-align: center;
  }
  .quotation-chart-data table{
    color: #6d7b82;
    font-size: 14px;
  }
.noCode-tbody-td{
  padding: 50px !important;
}
  .transaction-variety-chuangxin{
    position: relative;
  }
    .valueBuy-class,.valueSell-class,.valueBuy-class div,.valueSell-class div{
    border: none !important;
    padding:0 !important;
    margin-bottom:0 !important;
  }
</style>
