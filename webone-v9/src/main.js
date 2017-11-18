// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css'
import router from './router'
import  store from './store'
import  echarts from 'echarts'
import axios from 'axios';
import Common from './Common';
import 'babel-polyfill';

import '../static/iconfont/iconfont.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import '../static/css/base.css'

import 'font-awesome/css/font-awesome.min.css'

// 国际化
import VueI18n from 'vue-i18n'

import i18nData from '../config/i18n/i18n.js';

//全局过滤器的注册
import filters from './filters'

Vue.use(Common);

Vue.use(VueI18n);

if(!localStorage.getItem('language')){
  localStorage.setItem('language', 'zh');
}

const i18n = new VueI18n({
  locale: localStorage.getItem('language'),
  messages: i18nData
});

// import VueResource from 'vue-resource'
// Vue.use(VueResource);

Vue.prototype.$defaultCurrency = 'BTMETH';
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.prototype.$URL_API = 'https://api.egg.one/bbjy/web/';
// Vue.prototype.$URL_API = 'http://47.52.130.29:8089/bbjy/web/';
// Vue.prototype.$URL_API = 'http://192.168.1.3:8089/bbjy/web/';

var $API = 'https://api.egg.one:8080/';
// var $API = 'http://47.52.130.29:9092/';
// var $API = 'http://192.168.1.3:9092/';


/**
 * 发送事件
 * @param key
 * @param value
 */
Vue.prototype.sendEvent = function (key, value) {
  var event = new Event(key);
  event.newValue = value;
  window.dispatchEvent(event);
};

Vue.use(ElementUI);

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: {App},
  i18n
});

/*
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
*/

router.beforeEach((to, from, next) => {

  if (to.matched.some(m => m.meta.auth)) {

    if (/*store.getters.loginState*/localStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login', query: { Rurl: to.fullPath } })
    }
  } else {
    next()
  }
});

var oriSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  //这里抛出自定义事件
  if (key && key === 'commodity') {
    var event = new Event("setItemEvent");

    event.newValue = value;

    window.dispatchEvent(event);

    console.log('切换品种' + value);
  }

  //实现原方法
  oriSetItem.apply(this, arguments);
};


let socket;
socket = io($API);

console.log('连接socket');

socket.on('connect', function() {

  console.log('连接上socket, 发送消息request:' + localStorage.getItem('commodity'));

  socket.emit('request', localStorage.getItem('commodity'));

  if (/*store.getters.loginState*/localStorage.getItem('token')) {

    console.log(sessionStorage.getItem('accountId'));

    console.log('发送消息 entrust ' + sessionStorage.getItem('accountId'));

    socket.emit('entrust', sessionStorage.getItem('accountId'));

  }

  subscribe(localStorage.getItem('commodity'));

});

socket.on('disconnect', function() {

  console.log('断开socket');

});

//切换品种事件监听
window.addEventListener("setItemEvent", function (e) {

  console.log('socket, 发送消息request:' + e.newValue);

  socket.emit('request', e.newValue);

  console.log('发送消息 entrust ' + sessionStorage.getItem('accountId'));

  socket.emit('entrust', sessionStorage.getItem('accountId'));

  subscribe(e.newValue);
});

//登录事件监听
window.addEventListener("login", function (e) {
  console.log('登录成功 socket, 发送消息:entrust ' + sessionStorage.getItem('accountId'));

  socket.emit('entrust', sessionStorage.getItem('accountId'));

});

//退出登录事件监听
window.addEventListener("logout", function (e) {
  socket.removeListener('entrust');
});

//切换周期事件监听
window.addEventListener("switchPeriod", function (e) {
  socket.removeListener('entrust');
  socket.emit('entrust', sessionStorage.getItem('accountId'));
});

function subscribe(commodity) {

  socket.removeAllListeners();

  //最新价
  {
    let commodityAll = localStorage.getItem('commodityAll').split(',');

    //更新store中businessPrice当前币种名
    store.commit('SETBUSINESSPRICENAME', commodity);


    for (let c in commodityAll) {

      let cc = commodityAll[c];

      socket.on('/market/latestPrice/' + cc, function(json) {

        //判断数据是否发生变化, 发生变化则更新store中businessPrice 所有币种参数
        (JSON.stringify(store.getters.businessPrice.get(cc)) != JSON.stringify(json.data)) && store.commit('SETBUSINESSPRICEDATA', {
          key : cc,
          value : json.data
        });

        if (cc === commodity) {

          var event = new Event("latestPrice");
          event.newValue = json.data;
          window.dispatchEvent(event);

        }

      });
    }

  }
  //盘口
  {
    socket.on('/market/depth/' + commodity, function(json) {

      //如果数据未发生变化则不进行更新
      //更新指定的币币交易的盘口数据

      //console.log(json.data);

      (JSON.stringify(store.getters.depth) != JSON.stringify(json.data)) && store.commit('SETDEPTH', json.data);

      var event = new Event("depthData");

      event.newValue = json.data;

      // console.log('盘口：' + JSON.stringify(event.newValue));


      window.dispatchEvent(event);
    });
  }
  //交易流水
  {
    socket.on('/market/trades/' + commodity, function(json) {
      // console.log(json.data.length);
      if (json.data.length > 100) {

        (JSON.stringify(store.getters.trades) != JSON.stringify(json.data.slice(0, 100))) && store.commit('SETTRADES', json.data.slice(0, 100));


      } else {

        (JSON.stringify(store.getters.trades) != JSON.stringify(json.data)) && store.commit('SETTRADES', json.data);

      }
    });
  }
  //当前委托
  {
    socket.on('/market/entrust/' + commodity, function(json) {

      if (json.data) {

        // console.log('接收到推送');

        json.data.commodity = localStorage.getItem('commodity');

        (JSON.stringify(store.getters.entrust) != JSON.stringify(json.data)) && store.commit('SETWEITUO', json.data);

      }

    });
  }
  // k线
  {
    socket.on('/market/kline/' + localStorage.getItem('timers') + '/' + commodity, function (json) {
      //推送切换周期后没有注销原来的 导致时间不一致
      sessionStorage.setItem('quotation', json.data)
    })
  }

  //资金详情
  {
    socket.on('/capital/info', function(json) {

      // console.log(json.data);

      (JSON.stringify(store.getters.capitalInfo) != JSON.stringify(json.data)) && store.commit('SETCAPITALINFO', json.data);

      // console.log('监听到资产信息');
      var event = new Event("userCapital");

      window.dispatchEvent(event);
    });
  }
}




