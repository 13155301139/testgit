/**
 * Created by User on 2017/7/17.
 */
import * as types from './types';
export default {
  [types.HEADER_SHOW]: (state) => {
    state.topHeaderStyle = true;
  },
  [types.HEADER_HIDE]: (state) => {
    state.topHeaderStyle = false;
  },
  [types.FOOTER_SHOW]: (state) => {
    state.footerStyle = true;
  },
  [types.FOOTER_HIDE]: (state) => {
    state.footerStyle = false;
  },
  [types.LOGINSTATE_TRUE]: (state) => {
    state.loginState = true;
  },
  [types.LOGINSTATE_FALSE]: (state) => {
    state.loginState = false;
  },
  [types.ERROR_SHOW]: (state) => {
    state.ErrorState = true;
  },
  [types.ERROR_HIDE]: (state) => {
    state.ErrorState = false;
  },
  [types.ERROR_SHOW1]: (state) => {
    state.ErrorState1 = true;
  },
  [types.ERROR_HIDE1]: (state) => {
    state.ErrorState1 = false;
  },
  [types.SING_LOG_SHOW]:(state)=>{
    state.signLogState=true;
  },
  [types.SING_LOG_HIDE]:(state)=>{
    state.signLogState=false;
  },
  //修改businessPrice当前币种名
  [types.SETBUSINESSPRICENAME]: (state, name) => {

    state.businessPrice.name = name;

  },
  //更新businessPrice中所有币的信息
  [types.SETBUSINESSPRICEDATA]: (state, data) => {

    let _map = new Map();

    for(let item of state.businessPrice.data) {

      _map.set(item[0], item[1]);

    }

    _map.set(data.key, data.value);

    state.businessPrice.data = _map;

  },

  //更新指定的币币交易的盘口数据
  [types.SETDEPTH]: (state, data) => {

    state.depth = data;

  },

  //更新交易流水数据
  [types.SETTRADES]: (state, data) => {

    state.trades = data;

  },

  //更新当前委托数据
  [types.SETWEITUO]: (state, data) => {

    state.weiTuo = data;

  },

  //更新资金详情数据
  [types.SETCAPITALINFO]: (state, data) => {

    state.capitalInfo = data;

  }
}
