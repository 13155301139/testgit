<template >
  <div class="business-wrapper">
    <div class="notFound" v-show="notFoundFunc()">
      您所寻找的页面不存在, 请查看您的路径是否正确~
    </div>
    <div  v-show="!notFoundFunc()">
      <div class="business-container">

        <div class="container">

          <div class="business-band clearfix" >
            <!-- 根据主板以及创新板菜单项mock数据进行菜单切换路由 -->

            <router-link :to="`/businessOne/${mainPanelArr[0] || 'btceth'}`" :class="(!$route.params.id || (mainPanelArr.indexOf($route.params.id) != -1)) ? 'active' : ''">币币区</router-link>
            <router-link :to="`/businessOne/${innovatePanelArr[0] || 'ethbtc'}`" :class="($route.params.id && (innovatePanelArr.indexOf($route.params.id) != -1)) ? 'active' : ''" v-show="innovatePanelArr.length">USDO区</router-link>

          </div>

          <div class="bg_fff tab-list-wrap">

            <!-- 顶部块 -->
            <div class="tab-list">

              <!-- 币种选择菜单 -->
              <div class="tab-list-hd clearfix">

                <div class="btn-group btn-group" role="group">
                  <!-- 根据板块渲染对应的菜单项 -->
                  <!-- 根据路由状态切换菜单项active状态 -->

                  <!--币币区 从store  businessPrice中拿取数据-->
                  <div v-show="!$route.params.id || (mainPanelArr.indexOf($route.params.id) != -1)">
                    <template v-for="item in mainPanelData">
                      <router-link :to="`/businessOne/${item.commodity.toLowerCase()}`" :class="['btn', {'active' : (!$route.params.id && (item.commodity == 'BTCETH')) || ($route.params.id == item.commodity.toLowerCase()) }]"><i :class="'coin-logo coin-logo-' + item.commodity.substring(0,3)"></i>{{`${item.commodity.substring(0, 3)}/${item.commodity.substring(3,item.commodity.length)}`}}</router-link>
                    </template>
                  </div>

                  <!--创新区-->
                  <div v-show="$route.params.id && innovatePanelArr.indexOf($route.params.id) != -1">
                    <template v-for="item in innovatePanelData">
                      <router-link :to="`/businessOne/${item.commodity.toLowerCase()}`" :class="['btn', {'active' : ($route.params.id == item.commodity.toLowerCase()) }]">
                      <i :class="'coin-logo coin-logo-' + item.commodity.substring(0,3)"></i>{{`${item.commodity.substring(0, 3)}/${item.commodity.substring(3,item.commodity.length)}`}}</router-link>
                    </template>
                  </div>

                </div>
                <!-- 右侧资讯链接 请自行配置 -->
                <!--
                <div class="pull-right mt15">
                  <a class="ft14 mr5" href="javascript:void(0)" target="_self"><i class="fa fa-line-chart fa-fw"></i>K线交易</a>
                  <a class="ft14 mr5" href="javascript:void(0)" target="_blank"><i class="fa fa-globe fa-fw"></i>全球行情</a>
                  <a class="ft14" href="javascript:void(0)" target="_blank"><i class="fa fa-book fa-fw"></i>币种资料</a>
                </div>
                -->

              </div>

              <!-- 用户资产统计面板 -->
              <div class="tab-list-bd">

                <div class="row">
                  <div class="col-xs-4 text-left item">
                    <div class="line">可用:<b id="canUseMoney" class="text-second">{{getBBAmount('legalMoney')}}</b> {{ getBBType('ETH', 'legalMoney') }} </div>
                    <div class="line">可买:<b id="canBuyCoin" class="text-gray">{{getBBAmount('legalMoney', 1)}}</b> {{ getBBType('BTC', 'currency') }} </div>
                  </div>
                  <div class="col-xs-4 text-left item">
                    <div class="line">可用:<b id="canUseCoin" class="text-primary">{{getBBAmount('currency')}}</b> {{ getBBType('BTC', 'currency') }} </div>
                    <div class="line">可卖:<b id="canSellMoney" class="text-gray">{{getBBAmount('currency')}}</b> {{ getBBType('ETH', 'legalMoney') }} </div>

                  </div>
                  <div class="col-xs-4 price">
                    <h4>
                      <b id="curPrice" :class="{'text-second': riseStatus() > 0, 'text-primary' : riseStatus() < 0}">{{businessPrice.get(commodity) ? (businessPrice.get(commodity).price.toFixed(this.scaleC) || '--') : '--'}}<i v-show="riseStatus() != 0" :class="['fa', {'fa-long-arrow-up' : riseStatus() >= 0 ,'fa-long-arrow-down': riseStatus() < 0 }]"></i></b>

                      <span id="riseRate" :class="{'text-second': riseStatus() > 0, 'text-primary' : riseStatus() < 0}">{{getBusinessRisePercent()}}</span>

                    </h4>
                    <h6>高：<span id="maxHeightPrice" class="mr15">{{businessPrice.get(commodity) ? (businessPrice.get(commodity).high.toFixed(this.scaleC) || '--') : '--'}}</span>低：<span id="minLowPrice" class="mr15">{{businessPrice.get(commodity) ? (businessPrice.get(commodity).low.toFixed(this.scaleC)|| '--') : '--'}}</span>量：<span id="dayVolume">{{businessPrice.get(commodity) ? (((businessPrice.get(commodity).vol == 0) ? '0.0000' : businessPrice.get(commodity).vol.toFixed(this.scaleC)) || '--') : '--'}}</span></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="trans-form">
        <div class="container">
          <div class="clearfix">
            <div class="trans-left bg_fff col-xs-8">
              <div class="row">
                <div class="col-xs-6 item">
                  <div class="buy-form">
                    <div class="length mb15" id="bkBuyType">
                      <ul class="table">
                        <li role="button" :class="['cell', {'active' : !buyData.marketPriceToggle}]" @click="buyData.marketPriceToggle = false">限价买入</li>
                        <li role="button" :class="['cell', {'active' : buyData.marketPriceToggle}]" @click="buyData.marketPriceToggle = true">
                          <span class="bluepopover">市价买入
                            <div class="popover fade top in" role="tooltip" style="left: -60px;top:-74px">
                              <div class="arrow" style="left: 50%;"></div>
                              <div class="popover-content">
                                <p>市价买入, 系统会根据您预留的数量在市场上从高到低进行扫单，直至当前币种买完为止</p>
                              </div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <form role="form" id="buyForm" class="form-horizontal" method="post" action="" autocomplete="off">

                      <!-- 限价/批量买入委托开始 -->
                      <div id="buyDefaultForm">
                        <div class="form-group has-feedback form-subline">
                          <label class="control-label" for="buyUnitPrice">
                            <span class="buyBatLabel">限定最高买入价</span>
                            <span class="buyDefaultLabel">{{buyData.marketPriceToggle? '以当前最优市场价格买入' : '买入价'}}</span> ({{ getBBType('ETH', 'legalMoney') }})
                          </label>
                          <div class="input-group">
                            <input type="text" class="form-control form-second" v-model="buyData.price"  v-show = "!buyData.marketPriceToggle" id="buyUnitPrice" name="buyUnitPrice">
                          </div>
                          <div class="input-group">
                            <input type="text" class="form-control form-second" v-show = "buyData.marketPriceToggle" disabled>
                          </div>
                        </div>
                        <div class="form-group has-feedback form-subline buyBatLabel">
                          <label class="control-label" for="buyMinPrice">
                            限定最低买入价 (CNY)
                          </label>
                          <div class="input-group">
                            <input type="text" class="form-control form-second" id="buyMinPrice" name="buyMinPrice">
                          </div>
                        </div>
                        <div class="form-group has-feedback form-subline">
                          <label class="control-label" for="buyNumber">买入量 ({{ getBBType('BTC','currency') }})</label>

                          <div class="input-group">
                            <input type="text" class="form-control form-second" v-model="buyData.amount" id="buyNumber" name="buyNumber">
                          </div>
                        </div>

                        <pointSlider :value="buyData.percent" @update:value="val => buyData.percent = val" />

                        <div class="form-group has-feedback">
                          <label class="control-label egg-yjjye" for="realBuyAccount">预计交易额：<b class="text-second" id="realBuyAccount"><!--{{buyTotalMoney}}-->{{toFixed(buyData.price * buyData.amount, this.scaleC)}}</b> {{ getBBType('ETH', 'legalMoney') }}</label>
                        </div>

                      </div>
                      <!-- 限价/批量买入委托结束 -->

                      <div class="form-group">
                        <button id="buyBtn" type="button" @click="btnBuyClick" class="btn btn-second btn-block ft16">
                          立即买入
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-xs-6 item">
                  <div class="sell-form">
                    <div class="length mb15" id="bkSellType">
                      <ul class="table">
                        <li role="button" :class="['cell', {'active' : !sellData.marketPriceToggle}]" @click="sellData.marketPriceToggle = false">限价卖出</li>
                        <li role="button" :class="['cell', {'active' : sellData.marketPriceToggle}]" @click="sellData.marketPriceToggle = true">
			  	          <span class="bluepopover">市价卖出
				              <div class="popover fade top in" role="tooltip" style="top:-74px">
				                <div class="arrow" style="left: 60%;"></div>
				                <div class="popover-content">
				                	<p>市价卖出, 系统会根据您预留的数量在市场上从高到低进行扫单，直至当前币种卖完为止</p>
				                </div>
			                </div>
				            </span>
                        </li>

                      </ul>
                    </div>
                    <form role="form" id="sellForm" class="form-horizontal" method="post" action="" autocomplete="off">
                      <input type="hidden" name="sellType" id="sellType" value="0">
                      <!-- 限价/批量委托卖出开始 -->
                      <div id="sellDefaultForm">
                        <div class="form-group has-feedback form-subline">
                          <label class="control-label" for="sellUnitPrice">
                            <span class="sellBatLabel">限定最低卖出价</span>
                            <span class="sellDefaultLabel">{{sellData.marketPriceToggle? '以当前最优市场价格卖出' : '卖出价'}}</span> ({{ getBBType('ETH', 'legalMoney') }})
                          </label>

                          <div class="input-group">
                            <input type="text" class="form-control form-second" v-model="sellData.price" v-show = "!sellData.marketPriceToggle" id="sellUnitPrice" name="sellUnitPrice">
                          </div>

                          <div class="input-group">
                            <input type="text" class="form-control form-second" v-show = "sellData.marketPriceToggle" disabled>
                          </div>
                        </div>
                        <div class="form-group has-feedback form-subline sellBatLabel">
                          <label class="control-label" for="sellMaxPrice">
                            限定最高卖出价 (CNY)
                          </label>
                          <div class="input-group">
                            <input type="text" class="form-control form-second" id="sellMaxPrice" name="sellMaxPrice">
                          </div>
                        </div>
                        <div class="form-group has-feedback form-subline">
                          <label class="control-label" for="sellNumber">卖出量 ({{ getBBType('BTC', 'currency') }})</label>
                          <div class="input-group">
                            <input type="text" class="form-control form-second" v-model="sellData.amount" id="sellNumber" name="sellNumber">
                          </div>
                        </div>

                        <pointSlider :value="sellData.percent" @update:value="val => sellData.percent = val" :sliderType="1" />

                        <div class="form-group has-feedback">
                          <label class="control-label egg-yjjye" for="realSellAccount">预计交易额：<b class="text-primary" id="realSellAccount">{{toFixed(sellData.price * sellData.amount, this.scaleC)}}</b> {{ getBBType('ETH', 'legalMoney') }}</label>
                        </div>

                      </div>

                      <div class="form-group">
                        <button id="sellBtn" type="button" @click="btnSellClick" class="btn btn-primary btn-block ft16">
                          立即卖出
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>

            </div>
            <div class="trans-right bg_fff col-xs-4 pull-right">

              <div class="length spec">
                <ul class="table" style="height: 28px">

                  <li role="button" data-type="length" class="cell">
                    <a role="button"><span>档位</span></a>
                  </li>

                  <li role="button" data-type="length" class="cell">
                    <a role="button"><span>{{ getBBType('BTC', 'currency') }}价格({{ getBBType('ETH', 'legalMoney') }})</span><!--<i class="fa fa-angle-down icon"></i>--></a>
                    <!--
                    <dl>
                      <dd role="button" data-length="5" class="active">5档</dd>
                      <dd role="button" data-length="10">10档</dd>
                      <dd role="button" data-length="20">20档</dd>
                      <dd role="button" data-length="50">50档</dd>
                    </dl>
                    -->
                  </li>
                  <li role="button" data-type="length" class="cell">
                    <a role="button"><span>{{ getBBType('BTC', 'currency') }}数量</span></a>
                  </li>
                  <!--
                  <li role="button" data-type="depth" class="cell active" id="bkDepth">
                    <a role="button"><span>默认深度</span><i class="fa fa-angle-down icon"></i></a>
                    <dl>

                      <dd role="button" data-depth="0.01" class="active">合并0.01</dd>

                      <dd role="button" data-depth="0.1" class="">合并0.1</dd>

                      <dd role="button" data-depth="1" class="">合并1</dd>

                    </dl>
                  </li>
                  -->

                </ul>
              </div>

              <div class="market-form">
                <table id="sellMarket" width="100%">
                  <tbody>

                  <template v-for="(item, index) in panKouSArr">

                    <tr @click="depthClick(0, index)">
                      <td width="33%" class="text-primary">卖{{5 - index}}</td>
                      <td width="33%">{{item.price ? item.price.toFixed(scaleC) : '--'}}</td>
                      <td width="33%" class="text-right text-g">{{item.vol ? item.vol.toFixed(scaleC) : '--'}}<g>079</g></td>
                      <!--
                      <td width="20%" class="text-left"><div class="percent text-second" style="width:24.00%"></div></td>
                      -->
                    </tr>

                  </template>

                  </tbody>
                </table>
                <div class="divider" style="margin:10px auto;"></div>
                <table id="buyMarket" width="100%">
                  <tbody>

                  <template v-for="(item, index) in panKouBArr">
                    <tr @click="depthClick(1, index)">
                      <td width="33%" class="text-second">买{{index + 1}}</td>
                      <td width="33%">{{item.price ? item.price.toFixed(scaleC) : '--'}}</td>
                      <td width="33%" class="text-right text-g">{{item.vol ? item.vol.toFixed(scaleC) : '--'}}<g></g></td>
                      <!--
                      <td width="20%" class="text-left"><div class="percent text-primary" style="width:24.00%"></div></td>
                      -->
                    </tr>
                  </template>

                  </tbody>
                </table>
              </div>
            </div>

            <div class="trans-record bg_fff col-xs-12">

              <div class="tab-list mt0" id="bkEntrustTab">
                <div class="tab-list-hd clearfix">
                  <div class="btn-group btn-group" role="group">
                    <a :class="['btn', {'active' : !entrustData.toggleStatus}]" @click="entrustTabClick(1)">当前委托</a>
                    <a :class="['btn', {'active' : entrustData.toggleStatus}]" @click="entrustTabClick()">历史委托</a>
                  </div>

                  <!--
                  <div class="pull-right mt20 mr15">
                    <a href="https://trans.chbtc.com/record/btc" target="_self" role="button"><i class="fa fa-calendar fa-fw"></i>更多记录</a>
                  </div>
                  -->
                </div>
                <div class="tab-list-bd">
                  <div class="entrust" v-show="!entrustData.toggleStatus">
                    <table class="table table-striped table-bordered table-hover">
                      <thead>
                      <tr>
                        <th style="">委托时间</th>
                        <th style="text-align:left;">委托类型</th>
                        <th style="text-align:left;">买卖类型</th>
                        <th style="">委托总额/已成交({{ getBBType('BTC', 'currency') }})</th>
                        <th style="">委托价格/成交均价({{ getBBType('ETH', 'legalMoney') }})</th>
                        <th style="">成交总额({{ getBBType('ETH', 'legalMoney') }})</th>
                        <th style="">状态</th>
                        <th style="">订单来源</th>
                        <th style="width:115px;">操作<a style="cursor:pointer" @click="revokeAll()" v-show="this.entrustData.currentData.totalElements">[全部撤单]</a></th>
                      </tr>
                      </thead>
                      <tbody id="entrustRecord">

                      <tr v-show="!loginState">

                        <td colspan="9">
                          <div class="norecord">
                            <p>
                              <i class="fa fa-commenting"></i>
                              您还没有登录，请
                              <a style="color:#D33551; margin:0 5px;" href="">登录</a>
                              或 <a style="color:#2A8863; margin:0 5px;" href="">注册</a>
                              后再尝试。
                            </p>
                          </div>
                        </td>

                      </tr>

                      <tr v-show="(this.entrustData.currentData.totalElements == 0)">

                        <td colspan="9">
                          <div class="norecord">
                            <p>
                              <i class="fa fa-commenting"></i>
                              <a style="color:#2A8863; margin:0 3px;" >暂无记录</a>
                            </p>
                          </div>
                        </td>

                      </tr>

                      <template v-show="this.entrustData.currentData.totalElements">

                          <tr v-for="item in this.entrustData.currentData.content">

                            <td>
                              {{item.createDate | dateYMDHIS}}
                            </td>

                            <td>
                              {{item.orderType | translate}}
                            </td>

                            <td>
                              {{item.cammand | translate}}
                            </td>

                            <td>
                              {{item.amount | float4}}/{{item.dealVolume | float4}}
                            </td>

                            <td>
                              {{item.price | float4}}/{{item.dealPrice | float4}}
                            </td>

                            <td>{{item.dealAmount | float4}}</td>

                            <td>
                              {{item.orderStatus | translate}}
                            </td>

                            <td>
                              {{item.source}}
                            </td>

                            <td>
                              <a @click="revoke(item.code)" :data-code="item.code" href="javascript:void(0)">撤单</a>
                            </td>

                          </tr>

                      </template>

                      </tbody>
                    </table>

                  </div>

                  <div class="entrust" v-show="entrustData.toggleStatus">
                    <table class="table table-striped table-bordered table-hover">
                      <thead>
                      <tr>
                        <th style="">委托时间</th>
                        <th style="text-align:left;">委托类型</th>
                        <th style="text-align:left;">买卖类型</th>
                        <th style="">委托总额/已成交({{ getBBType('BTC', 'currency') }})</th>
                        <th style="">委托价格/成交均价({{ getBBType('ETH', 'legalMoney') }})</th>
                        <th style="">成交总额({{ getBBType('ETH', 'legalMoney') }})</th>
                        <th style="">订单来源</th>
                        <th style="">状态</th>
                      </tr>
                      </thead>
                      <tbody id="historyRecord">
                      <tr>
                        <td colspan="8" v-show="!loginState">
                          <div class="norecord">
                            <p>
                              <i class="fa fa-commenting"></i>
                              您还没有登录，请 <a style="color:#D33551; margin:0 5px;" href="">登录</a> 或 <a style="color:#2A8863; margin:0 5px;" href="">注册</a> 后再尝试。</p>
                          </div>
                        </td>
                      </tr>

                      <tr v-show="(this.entrustData.historyData.totalElements == 0)">

                        <td colspan="8">
                          <div class="norecord">
                            <p>
                              <i class="fa fa-commenting"></i>
                              <a style="color:#D33551; margin:0 3px;" >暂无记录</a>
                            </p>
                          </div>
                        </td>

                      </tr>

                      <template v-show="this.entrustData.historyData.totalElements">

                        <tr v-for="item in this.entrustData.historyData.content">

                          <td>
                            {{item.createDate | dateYMDHIS}}
                          </td>

                          <td>
                            {{item.orderType | translate}}
                          </td>

                          <td>
                            {{item.cammand | translate}}
                          </td>

                          <td>
                            {{item.amount | float4}}/{{item.dealVolume | float4}}
                          </td>

                          <td>
                            {{item.price | float4}}/{{item.dealPrice | float4}}
                          </td>

                          <td>{{item.dealAmount | float4}}</td>

                          <td>
                            {{item.source}}
                          </td>

                          <td>
                            {{item.orderStatus | translate}}
                          </td>

                        </tr>

                      </template>

                      </tbody>
                    </table>
                  </div>

                  <paginate
                    ref="paginateRef"
                    v-show="entrustPageShow()"
                    :page-count="entrustPageCount()"
                    :click-handler="entrustPageClick"
                    :prev-text="'«'"
                    :next-text="'»'"
                    :container-class="'pagination'">
                  </paginate>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Alert
      :visible = "alertData.show"
      :title = "alertData.title"
      :description = "alertData.desc"
      @update:visible="val => alertData.show = val"
    />
  </div>
</template>

<script>
  import Vue from 'vue';

  import store from '../../store'
  import {mapGetters, mapMutations} from 'vuex';

  import Paginate from 'vuejs-paginate';

  import pointSlider from '../pointSlider/pointSlider';

  import Alert from '../text_components/alert';

  export default {
    data() {
      return {

        scaleC: 4, //交易币种小数位
        scaleL: 4, //结算币种小数位

        //指定路由页面是否存在
        notFound: {
          mainPanel : false,
          innovatePanel : false
        },    //1表示初始状态, 路由在其中一个块中不存在则为2, 在两个块中都不存在则为3, 3表示该路由无法找到对应的页面

        mainPanelArr: [],
        innovatePanelArr: [],
        //币币区数据
        mainPanelData: [],
        //创新区数据
        innovatePanelData: [],

        //账户
        account: 'BTC',

        //交易品种 交易币种+结算币种组合
        commodity: '',

        //买入数据
        buyData : {

          marketPriceToggle: false,

          price: (0).toFixed(this.scaleC),

          amount: (0).toFixed(this.scaleC),

          percent: 0

        },

        //卖出数据
        sellData : {

          marketPriceToggle: false,

          price: (0).toFixed(this.scaleC),

          amount: (0).toFixed(this.scaleC),

          percent: 0

        },

        //委托数据
        entrustData : {
          //切换状态参数   false显示当前委托  true显示
          toggleStatus: false,

          //当前委托页面页号
          pageCurrent: 1,

          //历史委托页面页号
          pageHistory: 1,

          //当前委托页数据
          currentData: {},

          //历史委托页数据
          historyData: {}
        },

        //alert字段
        alertData: {
          show: false,
          title: '',
          desc: ''
        }

      }
    },
    components:{
      Paginate,
      pointSlider,
      Alert
    },

    mounted() {

      window.scrollTo(0,0);

      let self = this;

      //获取localstorage中总共含有的币币名数组
      let _commodityAll = localStorage.getItem('commodityAll').split(',');

      //获取路由参数, 参数不存在, 则取默认值 btceth
      let _id = this.$route.params.id ? this.$route.params.id : 'btceth';

      /**
       * [start]初始化时, 先http获取币种以及价格数据, 然后激活对应的频道和币种
       **/
      this.getLaterPrice(0, (data) => {

        //由于store中对币币数据未进行分组, 所以不能直接使用store中的数据来进行币币区与创新区的管理
        //所以在页面中新建了状态数组对对应的分组进行处理, 其价格数据等依旧从store中获取
        this.mainPanelData = data;

        //获取币种名数组, 用于 菜单项 渲染
        this.mainPanelArr = data.map((item) => {

            //如果当前的币币数组中不含有获取到的币币种, 则加入到其中
            if(_commodityAll.indexOf(item.commodity) == -1) {

                _commodityAll.push(item.commodity);

                localStorage.setItem('commodityAll', _commodityAll.join(','));

                //如果发现store中对应的数据有变化则进行同步
                (JSON.stringify(this.businessPrice.get(item.commodity)) != JSON.stringify(item)) && this.SETBUSINESSPRICEDATA(item.commodity, item);

            }

            return item.commodity.toLowerCase();

        }) || [];

        //查询路由在币币区是否存在
        //如果存在则调用对应的socket拿去各类数据
        (this.mainPanelArr.indexOf(_id) == -1) ? (this.notFound.mainPanel = true) : this.setCommodity(_id.toUpperCase());

      });

      this.getLaterPrice(1, (data) => {

        this.innovatePanelData = data;

        //获取币种名数组, 用于 菜单项 渲染
        this.innovatePanelArr = data.map((item) => {

            //如果当前的币币数组中不含有获取到的币币种, 则加入到其中
            if(_commodityAll.indexOf(item.commodity) == -1) {

                _commodityAll.push(item.commodity);

                localStorage.setItem('commodityAll', _commodityAll.join(','));

                //如果发现store中对应的数据有变化则进行同步
                (JSON.stringify(this.businessPrice.get(item.commodity)) != JSON.stringify(item)) && this.SETBUSINESSPRICEDATA(item.commodity, item);

            }

            return item.commodity.toLowerCase();

        });

        //查询路由在创新区是否存在
      //如果存在则调用对应的socket拿去各类数据
      (this.innovatePanelArr.indexOf(_id) == -1) ? (this.notFound.innovatePanel = true) : this.setCommodity(_id.toUpperCase());

      });

      /**
       * [end]初始化时, 先http获取币种以及价格数据, 然后激活对应的频道和币种
       **/


      /**
       * [start]初始化时, 先http获取用户资金信息, 并根据其是否变化来判断是否对store中的数据进行更新
       **/

      this.getUserMoney((data) => {

        (JSON.stringify(this.capitalInfo) != JSON.stringify(data)) && this.SETCAPITALINFO(data);

      });

      /**
       * [end]初始化时, 先http获取用户资金信息, 并根据其是否变化来判断是否对store中的数据进行更新
       **/

    },

    methods: {

      ...mapMutations([
        'SETBUSINESSPRICENAME',

        'SETBUSINESSPRICEDATA',

        'SETDEPTH',

        'SETWEITUO',

        'SETCAPITALINFO'
      ]),

      //向下取(不进行四舍五入) 保留小数
      toFixed(num, v) {

        let _step = Math.pow(10, v);

        return (parseFloat(Math.floor(parseFloat(num) * _step)) / _step).toFixed(v);

      },

      alert(title, desc) {

        this.alertData = {
          show: true,
          title,
          desc
        };

      },

      riseStatus() {

        let _rising = this.businessPrice.get(this.commodity) ? this.businessPrice.get(this.commodity).rising : 0;

        return _rising;

      },

      getBusinessRisePercent() {

        let _rising = this.businessPrice.get(this.commodity) ? this.businessPrice.get(this.commodity).rising : 0;

        //let _price = this.businessPrice.get(this.commodity) ? this.businessPrice.get(this.commodity).price : 0;

        if (!_rising) {

          return '--';

        } else {

          return `${(_rising * 100).toFixed(2)}%`;

        }

      },

      //计算路由是否存在
      notFoundFunc() {
        return this.notFound.mainPanel && this.notFound.innovatePanel;
      },
      //根据路由 计算显示的币种名   kind为currency 显示前面的币种  kind为legalMoney 显示后面的币种
      getBBType(name, kind) {
        let _id = this.$route.params.id ? this.$route.params.id : 'btceth';

        //如果在区块中存在该币种
        if ((this.mainPanelArr.indexOf(_id) != -1) || (this.innovatePanelArr.indexOf(_id) != -1)) {

          return kind == 'currency' ? _id.substring(0, 3).toUpperCase() : _id.substring(3, _id.length).toUpperCase();

        } else {
          return name;
        }

      },

      //根据路由 从用户资金数据store capitalInfo以及币价格数据中 取出或计算对应的币的量
      //kind 取 currency 前面的币  取 legalMoney 后面的币
      //flag 非空则表示量切换到可买
      getBBAmount(kind, flag) {

        let _result = '--';

        let _id = this.$route.params.id ? this.$route.params.id.toUpperCase() : 'BTCETH';

        //路由在所有的币种中不存在
        if (!this.businessPrice.get(_id)) {
          return '--';
        }

        let _legalMoney = _id.substring(3, _id.length);

        let _currency = _id.substring(0, 3);

        let _legalMoneyAcount = this.capitalInfo.find((item) => {

            return `${item.legalMoney}${item.legalMoney}` == `${_legalMoney}${_legalMoney}`;

        });

        let _currencyAcount = this.capitalInfo.find((item) => {

            return `${item.currency}${item.legalMoney}` == `${_currency}${_legalMoney}`;

        });

        let _targetItem = this.businessPrice.get(_id);

        if (kind == 'legalMoney') {

          //需计算能购买多少 currency
          if (flag) {

            _result = (_legalMoneyAcount && _targetItem) ? this.toFixed(_legalMoneyAcount.amount / _targetItem.price, this.scaleC) : '--';

          } else {

            _result =  _legalMoneyAcount ? this.toFixed(_legalMoneyAcount.amount, this.scaleC) : '--';

          }

        } else if (kind == 'currency') {

            _result =  _currencyAcount ? this.toFixed(_currencyAcount.amount, this.scaleC) : '--';

        }

        return _result;

      },

      //设置commodity
      setCommodity(value) {this.commodity = value },

      //路由切换时调用
      routeChange() {

        /***********************************
         * [begin] 检查指定路由页面是否存在
         ***********************************/
        let _id = this.$route.params.id ? this.$route.params.id : 'btceth';

        //查询路由是否存在
        (this.mainPanelArr.indexOf(_id) == -1) ? (this.notFound.mainPanel = true) : (this.notFound.mainPanel = false);

        //查询路由是否存在
        (this.innovatePanelArr.indexOf(_id) == -1) ? (this.notFound.innovatePanel = true) : (this.notFound.innovatePanel = false);

        /***********************************
         * [end] 检查指定路由页面是否存在
         ***********************************/

        //同步store
        this.setCommodity(_id.toUpperCase());


        /***********************************
         * [begin]检查指定路由页面是否存在
         ***********************************/

        /***********************************
         * [end]检查指定路由页面是否存在
         ***********************************/

      },

      //币种交易接口
      //返回平台支持的所有品种的最新价格及成交量等信息
      // 0 表示币币区  其它表示 创新区
      getLaterPrice(category, callback) {

        this.$http({

          url: `${this.$URL_API}quotation/offerPriceAll/${(category == 0 ? 'COMMON' : 'NEW')}`,

          method: 'GET',

          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }

        }).then((res) => {

          if (res.data.code === 200) {

            callback(res.data.data);

          } else {

            this.showError(res.data.code, res.data.message);

          }

        });
      },

      //获取盘口数据 也就是买1-买5  卖1-卖5的数据

      getPanKou(commodity, callback){

        this.$http({
          url: `${this.$URL_API}quotation/depth/${commodity}/5`,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {

          if (res.data.code === 200) {

          callback(res.data.data);

        }
        }).catch((res) => {

          this.showError(res.code, res.message);

        });

      },

      //获取资金信息
      getUserMoney(callback){
        this.$http({
          url: this.$URL_API + 'capital/info',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {

          if (res.data.code === 200) {

            callback(res.data.data);

          }

        }).catch((res) => {

          this.showError(res.data.code, res.data.message);

        })
      },

      //获取委托信息
      //获取当前委托
      getCurrentEntrust: function (data, callback) {

        this.$http({
          url: this.$URL_API + 'trade/unsettled',

          method: 'POST',

          headers: {
            'X-Requested-With': 'XMLHttpRequest',

            'X-Authorization': 'Bearer ' + this.userToken,

            "Content-Type": "application/json;charset=UTF-8",
          },
          data

        }).then((res) => {

          if (res.data.code == 200) {

            callback(res.data.data);

          } else {

            this.showError(res.data.code, res.data.message);

          }

        });

      },

      //获取历史委托
      getHistoryEntrust: function (data, callback) {
        this.$http({
          url: this.$URL_API + 'trade/history',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.userToken,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data
        }).then((res) => {

          if (res.data.code === 200) {

            callback(res.data.data);

          } else {

            this.showError(res.data.code, res.data.message);

          }
        })
      },

      //取消委托
      revoke(code) {

        this.$http({
          url: this.$URL_API + 'trade/cancels/' + this.commodity + '/' + code,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.userToken
          }
        }).then((res) => {

          if (res.data.code === 200) {

            this.showError(200, "撤单成功~");

            //将指定的表格数据删除

            let _index = -1;

            let _content = this.entrustData.currentData.content;

            _content.map((_item, index) => {

              if (_item.code == code) {
                _index = index;

                return;
              }

            });

            (_index >= 0) && _content.splice(_index, 1) && this.entrustData.currentData.totalElements--;

          }

        }).catch((res) => {

            this.showError(res.data.code, res.data.message);

        });

      },

      //取消全部委托
      revokeAll(){

        this.$http({

          url: this.$URL_API + 'trade/cancelsAll/' + this.commodity,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.userToken
          }
        }).then((res) => {

          if (res.data.code == 200) {

            this.showError(200, "全部撤单成功~");

            this.entrustData.currentData.totalElements && (this.entrustData.currentData.totalElements = 0);

            this.entrustData.pageCurrent = 1;

          }

        }).catch((res) => {

          this.showError(res.data.code, res.data.message);

        })
      },

      //分页函数
      entrustPageClick(pageNum) {

        //处于历史委托面板
        if ( this.entrustData.toggleStatus ) {

          this.entrustData.pageHistory = pageNum;

          this.getHistoryEntrust({
            pageNo: pageNum - 1,

            pageSize: 10,

            param: {

              commodity: this.commodity

            }
          }, (data) => {

            this.entrustData.historyData = data;

          });

        } else {      //处于当前委托面板

          this.entrustData.pageCurrent = pageNum;

          this.getCurrentEntrust({
            pageNo: pageNum - 1,

            pageSize: 10,

            param: {

              commodity: this.commodity

            }
          }, (data) => {

            this.entrustData.currentData = data;

          });
        }

      },

      //计算是否显示分页
      entrustPageShow() {

        //处于历史委托面板
        if ( this.entrustData.toggleStatus ) {

          return (this.entrustData.historyData.totalElements > 0);

        } else {      //处于当前委托面板

          return (this.entrustData.currentData.totalElements > 0);

        }

      },

      //计算总页数
      entrustPageCount() {

        //处于历史委托面板
        if ( this.entrustData.toggleStatus ) {

          return (this.entrustData.historyData.totalElements ? Math.ceil(this.entrustData.historyData.totalElements/10) : 1);

        } else {      //处于当前委托面板

          return (this.entrustData.currentData.totalElements ? Math.ceil(this.entrustData.currentData.totalElements/10) : 1);

        }

      },

      //当前委托  历史委托tab切换 type为1  点击当前委托   不存在或为0 点击历史委托
      entrustTabClick(type) {

        if (type && (this.entrustData.toggleStatus == true)) {

          this.entrustData.toggleStatus = false;

          this.$refs.paginateRef.selected = this.entrustData.pageCurrent - 1;

        } else if (!type && (this.entrustData.toggleStatus == false)) {

          this.entrustData.toggleStatus = true;

          this.$refs.paginateRef.selected = this.entrustData.pageHistory - 1;

          this.entrustPageClick(1);

        }

      },

      //获取买入\卖出  以及  限价和市价的 类型
      //buyOrSell  买入调用还是卖出调用  true  买入  false  卖出
      getTypes(buyOrSell) {

        //买入
        if (buyOrSell) {

          //市价
          if (this.buyData.marketPriceToggle) {

            return 'B_MARKET';

          } else {      //限价

            return 'B_LIMITED';
          }

        } else {        //卖出

          //市价
          if (this.sellData.marketPriceToggle) {

            return 'S_MARKET';

          } else {      //限价

            return 'S_LIMITED';
          }

        }
      },

      sendTradeReq(data, callback) {
        this.$http({
          url: this.$URL_API + 'trade/entrust',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.userToken,
            "Content-Type": "application/json;charset=UTF-8"
          },
          data,
          }).then((res) => {

            if (res.data.code === 200) {

                callback(res.data.data);

            } else {

              this.showError(res.data.code, res.data.message);

            }
          });
      },

      btnBuyClick() {

        if(!this.userToken) {

          this.showError("", "请登陆后再进行买卖操作");

          return;

        }

        if (this.getTypes(1) == 'B_MARKET') {

          if (!(this.buyData.amount > 0)) {

            this.showError("", "买入额度不能为0.00");

            return;

          }

        } else if (!(this.buyData.price > 0) || !(this.buyData.amount > 0)) {

          this.showError("", "买入价格或额度不能为0.00");

          return;

        }

        this.sendTradeReq({
          commodity: this.commodity,

          types: this.getTypes(1),

          price: this.buyData.price,

          amount: this.buyData.amount,

          source: 'WEB'
        },(data) => {

          this.showError(200, "委托提交成功");

        });

      },

      btnSellClick() {
        if(!this.userToken) {

          this.showError("", "请登陆后再进行买卖操作");

          return;

        }

        if (this.getTypes() == 'S_MARKET') {

          if (!(this.sellData.amount > 0)) {

            this.showError("", "卖出额度不能为0.00");

            return;

          }

        } else if (!(this.sellData.price > 0) || !(this.sellData.amount > 0)) {

          this.showError("", "卖出价格或额度不能为0.00");

          return;

        }

        this.sendTradeReq({
          commodity: this.commodity,

          types: this.getTypes(),

          price: this.sellData.price,

          amount: this.sellData.amount,

          source: 'WEB'
        },(data) => {

          this.showError(200, "委托提交成功");

        });
      },

      //type 非0 为买   0 为卖   index表示其在其中的序列号
      depthClick(type, index) {

        if (type) {

          if (this.panKouBArr[index].price) {

            this.buyData.price = this.panKouBArr[index].price;
            this.sellData.price = this.panKouBArr[index].price;

            let _amount = 0;

            for(let i = 0; i < (index + 1); i++) {

              _amount += parseFloat(this.panKouBArr[i].vol);

            }

            setTimeout(() => {
              this.buyData.amount = _amount;
            }, 0);

            this.sellData.amount = _amount;

          }

        } else {

          if (this.panKouSArr[index].price) {

            this.buyData.price = this.panKouSArr[index].price;
            this.sellData.price = this.panKouSArr[index].price;

            let _amount = 0;

            for(let i = index; i < 5; i++) {

              _amount += parseFloat(this.panKouSArr[i].vol);

            }

            setTimeout(() => {
              this.buyData.amount = _amount;
            }, 0);

            this.sellData.amount = _amount;

          }

        }

      },

      //获取品种参数 kyc
      getCommodityParams: function () {
        this.$http({
          url: this.$URL_API + 'commodity/paramAll/' + this.commodity,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then((res) => {

          if (res.data.code === 200) {

            let length = res.data.data.length;
            for (var i = 0; i < length; i++) {
              let item = res.data.data[i];

              if (item.paramKey === 'SCALEC') {
                this.scaleC = item.paramValue;  //交易币种小数位
              } else if (item.paramKey === 'SCALEL') {
                this.scaleL = item.paramValue;  //结算币种小数位
              }
            }

          } else {

            this.showError(res.data.code, res.data.message);

          }
        })
      },

  },
    watch: {
      '$route' : 'routeChange',

      //监控commodity的变化, 可以通过这个来触发全局定义的LocalStorage setItem事件, 从而在路由到新页面时, 连接对应的socket, 设置store的状态
      commodity (value) {

        /**
         * [start] commodity变化时, 跟随commodity变化的Http接口需要重新调用
         **/

        this.getPanKou(value, (data) => {

          (JSON.stringify(this.depth) != JSON.stringify(data)) && this.SETDEPTH(data);

        });

        /**
         * [end]commodity变化时, 跟随commodity变化的Http接口需要重新调用
         **/


        /**
         * [start] commodity变化时, 重新调用对应的socket接口来同步数据
         **/

        localStorage.setItem('commodity', value);

        /**
         * [end] commodity变化时, 重新调用对应的socket接口来同步数据
         **/


        /**
         * [start] commodity变化时, 重新获取币种对应的委托数据
         **/

        //获取品种参数
        this.getCommodityParams();

        //切换到当前委托
        this.entrustData.toggleStatus = false;

        //重新设置分页数据
        this.entrustData.pageCurrent = 1;

        this.entrustData.pageHistory = 1;

        this.$refs.paginateRef.selected = 0;

        this.$refs.paginateRef.selected = 0;


        this.getCurrentEntrust({
          pageNo: 0,

          pageSize: 10,

          param: {

              commodity: value

            }
          }, (data) => {

          data.commodity = this.commodity;

          this.entrustData.currentData = data;

        });

        this.getHistoryEntrust({
          pageNo: 0,

          pageSize: 10,

          param: {

            commodity: value

          }
        }, (data) => {

          this.entrustData.historyData = data;

        });

        this.buyData = {
          marketPriceToggle: false,

          price: (0).toFixed(this.scaleC),

          amount: (0).toFixed(this.scaleC),

          percent: 0
        };

        this.sellData = {
          marketPriceToggle: false,

          price: (0).toFixed(this.scaleC),

          amount: (0).toFixed(this.scaleC),

          percent: 0
        };


      },

      //委托数据变化  查看当前页面是否处于第一页,路由是否正确 是则同步数据到currentData中
      entrust(data) {

        if ((this.entrustData.pageCurrent == 1) && (this.commodity == data.commodity)) {

          (this.entrustData.currentData = data);

        }

      },

      'buyData.percent' : function(value) {

        let _legalMoney = this.getBBAmount('legalMoney');

        (_legalMoney == '--') ? (_legalMoney = 0) : '';

        //当价格存在时, 显示额度
        (this.buyData.price > 0) && (_legalMoney > 0) && (this.buyData.amount = this.toFixed(_legalMoney / this.buyData.price * value / 100, this.scaleC));

      },
      'sellData.percent': function(value) {

        let _currencyMoney = this.getBBAmount('legalMoney', 1);

        (_currencyMoney == '--') ? (_currencyMoney = 0) : '';

        (this.sellData.price > 0) && (_currencyMoney > 0) && (this.sellData.amount = this.toFixed(_currencyMoney * value / 100, this.scaleC));

      },
      /*
      'buyData.price' : function(value) {

        let _legalMoney = this.getBBAmount('legalMoney');

        (_legalMoney == '--') ? (_legalMoney = 0) : '';

        (value > 0) && (_legalMoney > 0) && (this.buyData.amount = this.toFixed(_legalMoney / value * this.buyData.percent / 100, 4));

      },
      */
      'buyData.amount': function(value) {

        let _legalMoney = this.getBBAmount('legalMoney');

        (_legalMoney == '--') ? (_legalMoney = 0) : '';

        if ((this.buyData.price > 0) && (value > (_legalMoney / this.buyData.price))) {

          this.buyData.amount = this.toFixed(_legalMoney / this.buyData.price, this.scaleC);

          //this.buyData.percent = 100;

        } else {

          //(_legalMoney > 0) && (this.buyData.percent = value * this.buyData.price / _legalMoney * 100);

        }

      },
      'sellData.amount': function(value) {

        let _currencyMoney = this.getBBAmount('legalMoney', 1);

        (_currencyMoney == '--') && (_currencyMoney = 0);

        (parseFloat(value) > parseFloat(_currencyMoney)) && (this.sellData.amount = _currencyMoney);

      }

    },
    computed: {
      ...mapGetters(['businessPrice', 'depth', 'capitalInfo', 'userToken', 'loginState', 'entrust']),

      // 计算盘口的sell渲染数组
      panKouSArr: function () {

        let _resultArr = Object.assign([], this.depth.s);

        //将得到的新数组根据price进行排序

        _resultArr.sort((_item1, _item2) => {

          return _item1.price < _item2.price;

        });

        (_resultArr.length > 5) && (resultArr = _resultArr.slice(_resultArr.length - 5));

        //补充数据长度到五
        for (let i = _resultArr.length; i < 5; i++) {

          _resultArr.unshift({commodity: '', camand: 'S', price: '', vol: '', count: '', percent: 0})

        }

        return _resultArr;
      },

      // 计算盘口的buy渲染数组
      panKouBArr: function () {
        let _resultArr = Object.assign([], this.depth.b);

        //将得到的新数组根据price进行排序
//        _resultArr.sort((_item1, _item2) => {
//          return _item1.price < _item2.price;
//        });

        _resultArr = _resultArr.slice(0, 5);

        //补充数据长度到五
        for (let i = _resultArr.length; i < 5; i++) {

          _resultArr.push({commodity: '', camand: 'B', price: '', vol: '', count: ''})

        }

        return _resultArr;
      },


      /*
      buyTotalMoney: function() {

        //当价格存在时, 显示额度
        if (this.buyData.price > 0) {

          return this.toFixed(this.getBBAmount('legalMoney') * this.buyData.percent / 100, 2);

        } else {

          return (0).toFixed(2);

        }

      }
      */
    }

  }
</script>

<style lang="less">
ul.pagination > .active > a, ul.pagination > .active > a:focus, ul.pagination > .active > a:hover, ul.pagination > .active > span, ul.pagination > .active > span:focus, ul.pagination > .active > span:hover {
    background-color: #2A8863;
    border-color: #2A8863;
  }
</style>

<style lang="less" scoped>
  .egg-yjjye{
    width:100%;
  }
  .Hide {
    display: none !important;
  }

  .bg_fff {
    background-color: #fff !important;
  }

  .pull-left {
    float: left !important;
  }

  .pull-right {
    float: right !important;
  }

  .mt15 {
    margin-top: 15px !important;
  }

  .ft12 {
    font-size: 12px !important;
  }

  .ft14 {
    font-size: 14px !important;
  }

  .ft16 {
    font-size: 16px !important;
    font-weight: bolder;
  }

  .ml10 {
    margin-left: 10px!important;
  }

  .mr5 {
    margin-right: 5px !important;
  }

  .mt0 {
    margin-top: 0 !important;
  }

  .mr15 {
    margin-right: 15px !important;
  }

  .mt20 {
    margin-top: 20px !important;
  }

  .text-primary {
    color: #D33551;
  }

  .text-second {
    color: #2A8863;
  }

  .text-gray {
    color: #999;
  }

  .text-left {
    text-align: left;
  }

  .container {
    min-width: 1010px !important;
  }

  .btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    &>.btn {
      position: relative;
      float: left;

      &:hover,&:focus,&.active {
        z-index: 2;
      }

    }
  }

  .btn-group {

    .btn, .btn-group{
      &+.btn, &+.btn-group {
        margin-left: -1px;
      }

    }

    &>.btn {

      &+.dropdown-toggle {
        padding-left: 8px;
        padding-right: 8px;
      }

      &:not(:first-child):not(:last-child):not(.dropdown-toggle) {
        border-radius: 0;
      }

      &:first-child {
        margin-left: 0
      }

      &:first-child:not(:last-child):not(.dropdown-toggle) {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0
      }

      &:last-child:not(:first-child) {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

    }

    &>.dropdown-toggle:not(:first-child) {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }

    &>.btn-group {
      float: left;

      &:not(:first-child):not(:last-child)>.btn {
        border-radius: 0
      }

      &:first-child:not(:last-child) {

        &>.btn:last-child , &>.dropdown-toggle {
          border-bottom-right-radius: 0;
          border-top-right-radius: 0
        }

      }

      &:last-child:not(:first-child)>.btn:first-child {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

    }

    .dropdown-toggle:active, &.open .dropdown-toggle {

      outline: 0;

    }

    &>.btn-lg+.dropdown-toggle {
      padding-left: 12px;
      padding-right: 12px
    }

    &.open .dropdown-toggle {
      -webkit-box-shadow: inset 0 3px 5px rgba(0,0,0,0.125);
      box-shadow: inset 0 3px 5px rgba(0,0,0,0.125);

      &.btn-link {
        -webkit-box-shadow: none;
        box-shadow: none
      }
    }

  }

  .btn-group-vertical {

    &>.btn, &>.btn-group, &>.btn-group>.btn {
      display: block;
      float: none;
      width: 100%;
      max-width: 100%;
    }

    &>.btn, &.btn-group {

      &+.btn, &+.btn-group {
        margin-top: -1px;
        margin-left: 0;
      }

    }

    &>.btn{

      &:not(:first-child):not(:last-child) {
        border-radius: 0;
      }

      &:first-child:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      &:last-child:not(:first-child) {
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        border-top-left-radius: 0
      }
    }

    &>.btn-group {

      &first-child:not(:last-child)>.btn:last-child ,&:first-child:not(:last-child)>.dropdown-toggle {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

      }

      &:last-child:not(:first-child)>.btn:first-child {
        border-top-right-radius: 0;
        border-top-left-radius: 0
      }

    }

  }

  .btn-group-justified {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;

    &>.btn, &>.btn-group {
      float: none;
      display: table-cell;
      width: 1%;
    }

    &>.btn-group {

      .btn {
        width: 100%;
      }

      .dropdown-menu {

        left: auto;

      }

    }

  }

  [data-toggle="buttons"]>.btn input[type="radio"],[data-toggle="buttons"]>.btn-group>.btn input[type="radio"],[data-toggle="buttons"]>.btn input[type="checkbox"],[data-toggle="buttons"]>.btn-group>.btn input[type="checkbox"] {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none
  }

  .clearfix:before,.clearfix:after,.dl-horizontal dd:before,.dl-horizontal dd:after,.container:before,.container:after,.container-fluid:before,.container-fluid:after,.row:before,.row:after,.form-horizontal .form-group:before,.form-horizontal .form-group:after,.btn-toolbar:before,.btn-toolbar:after,.btn-group-vertical>.btn-group:before,.btn-group-vertical>.btn-group:after,.nav:before,.nav:after,.navbar:before,.navbar:after,.navbar-header:before,.navbar-header:after,.navbar-collapse:before,.navbar-collapse:after,.pager:before,.pager:after,.panel-body:before,.panel-body:after,.modal-footer:before,.modal-footer:after {
    content: " ";
    display: table
  }

  .clearfix:after,.dl-horizontal dd:after,.container:after,.container-fluid:after,.row:after,.form-horizontal .form-group:after,.btn-toolbar:after,.btn-group-vertical>.btn-group:after,.nav:after,.navbar:after,.navbar-header:after,.navbar-collapse:after,.pager:after,.panel-body:after,.modal-footer:after {
    clear: both
  }

  .ml10 {
    margin-left: 10px !important;
  }

  [class^="u-level-"] {
    width: 37px;
    height: 14px;
    display: inline-block;
    background-image: url(../../assets/img/spec/user-level-s2.png);
    background-repeat: no-repeat;
    position: relative;
    top: 1px;
  }

  .u-level-2 {
    background-position: -13px -33px;
  }

  .tab-list {
    margin: 15px auto;

    h3 {
      font-size: 14px;
      margin-bottom: 30px;
      margin-top: 0;

      color: #7a8d9c;
    }

  }

  .tab-list-hd {
    text-align: left;
    border-bottom: 1px solid #eee;

    a.btn.pull-right {
      margin-top: 8px
    }

    .btn-group .btn {
      border-radius: 0;
      border-bottom: 0;
      font-size: 16px;
      font-weight: bolder;
      min-width: 113px;
      padding: 15px 12px;

      color: #7a8d9c;

      &:hover, &:focus, &.active {
        position: relative;
        color: #353d41;

        &:before {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          position: absolute;
          left: 0;
          bottom: -1px;
          background-color: #2A8863;
        }

      }

    }

    .table-responsive {
      overflow: visible
    }

  }

  .trans-form {
    .form-group {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 5px;
      text-align: left;

      .btn {
        display: block;
        width: 100%;

        padding: 9px 12px;

        border-radius: 3px;

        white-space: normal;

        box-shadow: none;

        transition: all .2s linear;

      }

      .btn-second {
        background-color: #2A8863;
        border-color: #2A8863;

        color: #fff;
      }
    }

    .form-control {
      padding-right: 15px;
      font-size: 16px;
      text-align: right;
      -webkit-box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);
      box-shadow: inset 1px 1px 3px rgba(0,0,0,.075);

      border: 1px solid #e6e9ea;

      &.form-second {
        height: auto;

        padding: 6px 15px;

        line-height: 30px;
        border-radius: 0;
      }
    }

    .input-group {
      width: 100%;

      position: relative;

      display: table;

      border-collapse: separate;

      .form-control {
        position: relative;

        z-index: 2;
        float: left;

        width: 100%;

        margin-bottom: 0;

        &:last-child {
          border-radius: 0;
        }
      }

    }

    .control-label {
      text-align: left;
      font-weight: normal;
      padding-top: 0;
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: bolder;
      color: #666;
      b {
        font-size: 14px;
        font-family: Arial,"Microsoft YaHei",sans-serif;
        cursor: pointer
      }
    }

    .form-subline {
      margin-bottom: 20px;

      .control-label {
        font-family: "Microsoft YaHei";
        margin-bottom: 4px;
        color: #6d7b82;
        position: absolute;
        left: 10px;
        top: 13px;
        z-index: 90;
      }

    }

    .isreal {
      display: inline-block;
      padding-top: 3px;
      float: right
    }

    .buyLabel, .sellLabel {
      display: none
    }
  }



  .fa-long-arrow-up, .fa-long-arrow-down {
    padding-left: 5px;
    font-size: 18px;
  }

  .business-wrapper {

  }

  .form-group .btn-primary {
    background-color: #D33551;
    border-color: #D33551;
  }
  .notFound {
    min-height: 350px;
    text-align: center;
    background: #fff;
    padding: 80px 15px;
    font-size: 17px;
    margin: 20px 50px;
    box-shadow: 1px 1px 8px 1px rgba(0,0,0, 0.1);
  }

  .business-band a{

    float: left;

    position: relative;

    margin-right: 20px;
    padding: 0 15px;

    min-width: 150px;

    height: 50px;
    line-height: 50px;

    font-size: 16px;
    font-weight: bolder;
    color: #4b4c4d !important;
    background-color: #eee;

    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear;

    text-align: center;

    &:hover, &.active {
      background-color: #fff;
      text-decoration: none;

      &:before {

        border-bottom-color: #ddd;

      }
    }

    &:before {
      width: 0;
      height: 0;
      border-bottom: 50px solid #e4e4e4;
      border-right: 13px solid transparent;
      content: "";
      display: block;
      position: absolute;
      right: -13px;
      bottom: 0;
    }
  }

  .business-container {
    position: relative;

    padding-top: 5px;
    margin-bottom: 10px;

    .item {
      padding-top: 10px;

      padding-bottom: 4px;

      font-size: 14px;

      p,.line {
        font-size: 14px;
        color: #666;
        font-weight:bolder;
        margin: 5px auto 5px;

        box-sizing: border-box;

        b {
          padding-left: 5px;
          font-size: 14px;
          font-family: Arial,"Microsoft YaHei",sans-serif;
          cursor: pointer;
        }
      }

    }

    .price {
      font-size: 14px;
      text-align: left;
      padding-bottom: 15px;
      padding-right: 0px;
      padding-left: 0px;

      h4 {
        margin-top: 0;
      }

      h6 {
        padding-left: 0px;
        margin: 0;
        color: #666;
        font-size:13px;
        padding-top: 10px;
        font-weight:bolder;
      }

      .icon {
        font-size: 14px;
        position: relative;
        left: 5px;
        top: -3px;
      }

    }

    .alert {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: auto;
      border: 0;
      background-color: rgba(42,51,58,0.75);
      padding: 20px 35px 20px 15px;
      display: none;
      color: #fdfdfd;
    }

    .tab-list-wrap {
      padding: 0 15px;
    }

    .tab-list {

      margin: 0;

    }

    .tab-list-bd {

      padding-top: 10px;
      position: relative;

      .btn-group .btn {
        padding: 15px 10px;
        font-weight: bolder;
      }

      .btn-group .btn img,.kType img {
        height: 20px;
        width: auto;
        margin-right: 5px
      }

    }

    .tab-list-hd {

      .btn-group .btn img, .kType img {

        height: 20px;

        margin-right: 5px;

        vertical-align: middle;

      }

      .btn-group .btn {
        position: relative;

        padding: 15px 10px;

        font-weight: bold;

        &:hover, &:focus, &.active {
          color: #353d41;
        }

      }

      a {
        color: #D33551;
        text-decoration: none;
      }

    }

  }

  #curPrice {
    font-size: 36px;
    cursor: pointer
  }


  #riseRate {
    position: relative;
    top: -4px;
    font-size: 14px;
    display: inline-block;
    padding: 3px 5px;
    margin-left: 10px;
    line-height: 1;
    border-radius: 3px;
    vertical-align: text-bottom;
    color: #fff;

    &.text-primary {
      background-color: #D33551;
    }

    &.text-second {
      background-color: #2A8863;
    }
  }

  .add-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 20px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    display: block
  }

  .add-btn.new {

    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMAgMAAAAbl6VVAAAACVBMVEUAAABOuwD////RmJ3LAAAAAXRSTlMAQObYZgAAADlJREFUCNdjEA0FAgeGUBAIYAgLi1qWBqSmpYaBqLQsMC8KyAPLLZ0ZAFUJ08cYwAACjA5gihVMAgD46RPS/AYghwAAAABJRU5ErkJggg==');
  }
  .add-btn.hot {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMAgMAAAAbl6VVAAAACVBMVEUAAAD/Uz7///8IXl6XAAAAAXRSTlMAQObYZgAAADZJREFUCNdjEA0FAgeGUBAIYAgLi5q2CkSlpqYCqVVACsoDy00FUhCVMH2MAQwgwOgApljBJADxxxOXepxSBwAAAABJRU5ErkJggg==');
  }

  .bluepopover {
    display: block;
    position: relative
  }

  .bluepopover .popover {
    display: none;
    width: 300px;
    font-size: 12px;
    text-align: left;
    top: -91px;
    left: -92px;
    padding: 5px 0 0
  }

  .bluepopover:hover .popover {
    display: block
  }

  .buy-form, .sell-form {
    margin: 0 auto
  }

  .buy-form {
    .form-second {
      color: #2A8863;

      font-weight: bold
    }

  }

  .sell-form {
    .form-second {
      color: #D33551;

      font-weight: bold
    }
  }

  .trans-left {
    padding-top: 15px;
    padding-bottom: 54px;
    margin-bottom: 10px
  }

  .trans-right {
    padding-top: 15px;
    padding-bottom: 10px;
    border-left: 10px solid #f5f5f5;

    .icon {
      position: relative;
      top: 2px;

      font-size: 16px;

      margin-left: 7px;
    }
  }

  .sellBatLabel,.buyBatLabel,#sellPlanForm,#buyPlanForm {
    display: none
  }

  .market-form {
    color: #333;
    font-size: 14px;
    font-weight:bolder;
    g {
      color: #999
    }

    table tr {
      cursor: pointer;

      &:hover td {
        background-color: #f9f9f9;
      }

      td {

        line-height: 26px;
        font-family: Arial,"Microsoft YaHei",sans-serif;

        &:last-child {
          padding-right: 15px;
          padding-left: 5px;
        }

        &:first-child {
          font-size: 14px;
          font-weight: bolder;
        }
      }

    }

    .percent {
      display: inline-block;
      height: 15px;
      vertical-align: middle;
      position: relative;
      top: -2px;
      max-width: 100%;
      min-width: 3%;

      &.text-primary {
        background-color: #D33551
      }
      &.text-second {
        background-color: #2A8863
      }
    }

  }

  .divider {
    height: 1px;

    width: 100%;

    clear: both;

    overflow: hidden;

    background-color: #e6e9e6;
  }

  .trans-btn {
    margin-bottom: 20px;

    .btn {
      height: 26px;
      line-height: 1.2;
      min-width: 110px;
      border-radius: 15px;
      margin: 0 6px 8px;
      text-shadow: 0 0 1px #fff
    }
  }

  .entrust {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bolder;
    .bkNum {
      color: #61727c;
      font-size: 16px;

      g {
        color: inherit;
        font-size: 14px;
      }

      &.text-primary {
        color: #D33551;
      }
    }
    .table {
      margin-bottom: 0;

      thead a {
        color: #2A8863;
        font-size: 14px;
      }

      tbody{

        a {
          color: #2A8863;
          font-size: 14px;
        }

        td {
          height: auto;
          padding: 15px 8px
        }

      }
    }

    .norecord {

      margin: 25px auto;

      text-align: center;

      color: #99abb7;

      .fa {
        margin-right: 3px;
      }
    }

    .label {
      display: inline-block;
      font-size: 12px;
      padding: 2px;
      position: relative;
      top: -2px;
      margin-right: 3px;
      margin-left: 0;
      font-weight: normal;
      font-size: 12px;

      &.text-primary {
        background-color: #D33551;
        color: #fff
      }

      &.text-second {
        background-color: #2A8863;
        color: #fff
      }

    }
  }

  #tradeRecord td {
    font-size: 12px;
    padding: 5px 8px
  }

  .depth {
    margin: 10px auto;

    li {
      float: left;
      width: 16.66666666%;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border: 1px solid #c9c9ca;
      border-right: 0;
      color: #656f77;

      &:last-child {
        border-right: 1px solid #c9c9ca
      }
      &:hover,.active {
        background-color: #D33551;
        color: #fff;
      }
    }

  }

  .length {
    margin-bottom: 10px;

    .table {
      display: table;
      table-layout: fixed;

      width: 100%;
      height: 100%;

      margin-bottom: 0;
    }

    .cell {
      display: table-cell;
      vertical-align: middle;
    }

    &.spec li {
      border: none;

      text-align: left;

      &:last-child {
        padding-right: 12px;
        border: none;
        text-align: right;
      }
    }

    li {
      height: 26px;
      line-height: 26px;
      font-size: 13px;
      text-align: center;
      border: 1px solid #eee;
      border-right: 0;
      color: #656f77;
      position: relative;
      font-weight:bolder;
      &:hover {
        background-color: #f9f9f9;

        dl {
          display: block;
        }
      }

      &.active{
        background-color: #f5f5f5;
        &:hover {
          background-color: #f5f5f5;
        }

        &:after {
          content: "";
          display: block;
          width: 0;
          height: 0;
          line-height: 0;
          font-size: 0;
          overflow: hidden;
          border-width: 6px;
          border-color: #eee transparent transparent transparent;
          border-style: solid dashed dashed dashed;
          position: absolute;
          bottom: -12px;
          left: -6px;
          margin-left: 50%
        }

      }

      &:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px
      }

      &:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        border-right: 1px solid #eee
      }

      &>a {
        display: block;
        width: 100%;
        height: 100%;
        color: #656f77;
        text-decoration: none;

        &:hover {
          color: #656f77;
          text-decoration: none
        }
      }

      dl {
        display: none;
        position: absolute;
        top: 100%;
        left: -1px;
        right: -1px;
        z-index: 100;
        background-color: #fff;
        border: 1px solid #eee;
        border-bottom: 0;
      }

      dd {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        text-align: center;
        border-bottom: 1px solid #eee;
        color: #656f77;
        position: relative;

        &:hover {
          background-color: #f9f9f9
        }

        &.active, &.active:hover {
          background-color: #f5f5f5
        }
      }

    }
  }

  .trans-record {

    .table {

      margin-bottom: 0;

      border-collapse: collapse;

      thead tr th {
        height: 45px;
        white-space: nowrap !important;

        font-size: 14px;

        color: #979ca0;

        padding: 8px;

        line-height: 1.42857143;

        background-color: transparent;

        vertical-align: middle;
      }

    }

    .table-bordered {

      &>tbody, &>tfoot, &>thead {

        &>tr>td, &>tr>th {

          border: 1px solid transparent;

        }

      }

      &>thead {
        &>tr>td, &>tr>th {
          border-bottom: 1px solid #eff0f0 !important;
        }
      }

    }



  }

  .search {
    text-align: left;
    padding-bottom: 5px;
    padding-left: 15px;

    #doSearchBtn, #reSetBtn {
      min-width: 100px
    }
  }

  #leverAccountSellLabel,#leverAccountBuyLabel {
    opacity: .3;
    cursor: not-allowed;

    &.open {
      opacity: 1;
      cursor: auto;

      .bluepopover {
        display: block;
      }
    }

    .bluepopover {
      display: none;
    }

  }

  .kHeader {
    padding: 0 10px;
    line-height: 40px;
    color: #6d7b82;
    border-bottom: 1px solid #2b2929;

    a {
      color: #6d7b82;
      &:hover {
        color: #D33551;
        text-decoration: none
      }
    }
  }

  .kLogo {
    margin-right: 10px;

    img {
      height: 32px;
      width: auto;
    }

    a {
      font-size: 14px;
      padding: 0 10px
    }

  }

  .kType {
    a {
      font-size: 14px;
      display: block;
      padding: 0 10px;
      font-weight: bold;

      &.active {
        color: #D33551;
        background-color: #333
      }

      &:hover {
        color: #D33551
      }
    }

    .dropdown-toggle {
      line-height: 42px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      text-align: left;
      padding: 0 35px 0 25px;
      border-left: 1px solid #333;
      border-right: 1px solid #333;
      background-color: #212020;

      &:hover {
        background-color: #333;
        color: #D33551
      }

      img {
        height: 25px;
        margin-right: 5px;
        vertical-align: middle
      }
    }

    .dropdown-menu {
      padding: 0;
      width: 360px;
      border: 1px solid #333;
      background-color: #212020;

      img {
        height: 20px;
        vertical-align: middle
      }
    }

    .drop-group .dropdown-toggle:after {
      top: 13px
    }

  }

  .kcoin {
    li {
      float: left;
      line-height: 42px;
      border-right: 1px solid #333;
      a {
        display: block;
        padding: 0 10px;
        background-color: #212020;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer
      }
    }

    a {
      &.active {
        color: #D33551;
        background-color: #333
      }

      &:hover {
        color: #D33551
      }
    }
    img {
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
      position: relative;
      top: -2px
    }

  }

  .kTool {
    line-height: 40px;

    a {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px;
      cursor: pointer;
      background-image: url(/statics/img/v2/common/kline-toggle.png);
      background-position: 0 0;
      background-repeat: no-repeat;

      &.toggle-foot {
        background-position: 0 0;
        &.active {
          background-position: 0 -20px;
          &:hover {
            background-position: -20px -20px;
          }
        }
        &:hover {
          background-position: -20px 0;
        }

      }
      &.toggle-right {
        background-position: 0 -40px;

        &.active {
          background-position: 0 -60px;

          &:hover {
            background-position: -20px -60px;
          }
        }
        &:hover {
          background-position: -20px -40px;
        }
      }

    }

  }
  .coin-logo-BTC {
    background: url(../../../src/assets/img/bilogo/egg_btc.png);
    background-size: 100% 100%;
  }

  .coin-logo-ETH {
    background: url(../../../src/assets/img/bilogo/egg_eth.png);
    background-size: 100% 100%;
  }

  .coin-logo-BTM {
    background: url(../../../src/assets/img/bilogo/egg_btm.png);
    background-size: 100% 100%;
  }

  .coin-logo-EOS {
    background: url(../../../src/assets/img/bilogo/egg_eos.png);
    background-size: 100% 100%;
  }
  .coin-logo {
    width: 26px;
    height: 26px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    font-size: 0;
  }
</style>
