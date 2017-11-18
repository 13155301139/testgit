<template>
  <div class="topHeader">
    <header :class="{'header_bs': $route.path == '/home'}">
      <div class="header">
        <div class="header_left">
          <router-link to="/home">
          <img style="width:130px;height:37px;"
          src="../../src/assets/img/header/egg_logo.png" alt="logo"/>
          </router-link>
          <div class="egg_dhldiv">
            <ul class="egg_dhlul">
              <router-link to="/home" tag="li" class="egg_dhqk" >
              <a href="javascript:" class="egg_dhl">{{$t('Home')}}</a>
              </router-link>
              <router-link to="/business" tag="li" class="egg_dhqk" >
              <a href="javascript:" class="egg_dhl">{{$t('Spot')}}</a>
              </router-link>
              <router-link to="" tag="li" class="egg_dhqk"
              @click.native='cc()'>
              <a href="javascript:"  class="egg_dhl">
              {{$t('Market')}}</a>
              </router-link>
              <router-link to="" tag="li" class="egg_dhqk" 
              @click.native='cc()'>
              <a href="javascript:" class="egg_dhl">
              {{$t('Funding')}}</a>
              </router-link>
              <router-link to="" tag="li" class="egg_dhqk"
              @click.native='cc()'>
              <a href="javascript:" class="egg_dhl">
              {{$t('OTC')}}</a>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="header-right">
        <img src="../../src/assets/img/header/egg_dhtu.png"
             style="height:19px;padding-right:10px;" />
          <div v-show="!userId" >
            <router-link to="/register" tag="button" class="egg_dz">
            {{$t('register')}}</router-link>
            <router-link to="" tag="button" class="egg_dz1">|</router-link>
            <router-link to="/login" tag="button" class="egg_dz">
            {{$t('Login')}}</router-link>
          </div>
          <div class="header-user-show" v-show="userId">
            <a href="javascript:" class="user-box" >
              <a href="/#/userIndex">
              <span class="user-phone">{{userNumM}}</span>
              </a>
              <i class="el-icon-arrow-down">{{dd}}</i>
              <div class="user-M-box">
                <i class="iconfont">&#xe695;</i>
                <span class="user-m-name">{{userNameM}}</span>
                <span class="user-m-phone">{{userNumM}}</span>
                <ul class="user-m-ul">
                  <li><a href="/#/userIndex">
                  <i class="fa fa-street-view" aria-hidden="true"></i>
                  {{$t('Personal')}}</a></li>
                  <router-link to="/broker" tag="li"><a href="javascript:;"><i class="iconfont">&#xe6c5;</i>{{$t('Recommended')}}</a>
                  </router-link>
                  <li><a href="javascript:;" @click="quitLogin()"><i class="iconfont">&#xe6d3;</i>{{$t('Logout')}}</a></li>
                </ul>
              </div>
            </a>
          </div>
          &nbsp;&nbsp;
          <div class="lan-wrap">
            <a href="javascript:void(0)" class="lan-selected">{{lanSelected}}
              <ul class="lan-panel">
                <li @click="selected='zh'">中文简体</li>
                <li @click="selected='zw'">中文繁体</li>
                <li @click="selected='en'">English</li>
              </ul>
            </a>
          </div>
          <!--
          <select v-model="selected" name="city" @change="changeLanguage">
             <option value="zh" >中文简体</option>
             <option value="zw" >中文繁体</option>
             <option value="en" >English</option>
           </select>
           -->
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import $ from  'jquery';
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        free: false,
        notice: true,
        userNameM: '',
        userNumM: '',
        newNotice: '',
        selected:localStorage.getItem('language')
      }
    },
    methods: {
      //切换语言
      changeLanguage(ele){
        localStorage.setItem('language', this.selected);
        //window.location.reload();
        this.$i18n.locale = this.selected;

      },
      cc(){
        this.showError(200, '即将开放');
      },
      signLogBtn(){
        this.$store.dispatch('signLogShow');
      },
      notice_show_close() {
        $('.nav-notice').toggle();
        $('.nav-notice-close2').toggle();
        this.notice = true;
      },
      quitLogin() {
        localStorage.removeItem('token');
        localStorage.removeItem('userPsd');
        localStorage.removeItem('userName');
        localStorage.removeItem('getU');
        localStorage.removeItem('real');
        sessionStorage.removeItem('EMAIL');
        sessionStorage.removeItem('MOBILE');
        localStorage.removeItem('signTime');
        this.$store.state.token = '';
        this.$store.state.loginTrue = false;
        this.$store.dispatch('loginStateFalse');
        this.$router.push('/login');
        this.userNameM = '';
        this.userNumM = '';
        this.sendEvent('logout', '');
      },
      getNewNotice(){
        this.$http({
          url: this.$URL_API + 'notices/newest',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          this.newNotice = res.data.data;
        })
      },
    },
    computed: {
      lanSelected() {
        if(this.selected == 'zh') {

          return '中文简体';

        } else if (this.selected == 'zw') {

          return '中文繁体';

        } else if (this.selected == 'en') {

          return 'English';

        }
      },
      userId() {
        return this.$store.state.loginState;
      },
      dd() {
        let that = this;
        if (this.$store.state.loginState) {
          if(!localStorage.getItem('getU')){
            that.$http({
              url: this.$URL_API + 'account/info',
              method: 'GET',
              data: {},
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Authorization': 'Bearer ' + that.$store.state.token
              }
            }).then((res) => {
              that.userNameM = res.data.data.userName;
              that.userNumM = res.data.data.loginUser;
              sessionStorage.setItem('accountId', res.data.data.id);
              localStorage.setItem('getU', JSON.stringify(res.data.data))
            }).catch((req) => {
              this.showError(req.code, req.message);
              that.quitLogin();
            })//获取用户信息
          }else{
            sessionStorage.setItem('accountId', JSON.parse(localStorage.getItem('getU')).id);
          }
        }
      },
      ...mapGetters(['LatestPrice'])
    },
    mounted() {
    let self =this
    {  
        $(window).scroll(function(){
          if(self.$route.path === '/home'){
            if($(window).scrollTop() >= 50) { 
                  var current = $("header");
                  current.removeClass("header_bs");
                  current = $(this);
              }else{ 
                  $('header').addClass('header_bs');
            }
          }
        });
    }
      let that = this;
      {
        $('.user-box').hover(function () {
          if (localStorage.getItem('signTime')) {
            let dateNew = new Date();
            let signDate = Number(localStorage.getItem('signTime'));
            let signDateOld = new Date(signDate);
            let oneYear = dateNew.getFullYear() - signDateOld.getFullYear();
            let oneMonth = dateNew.getMonth() - signDateOld.getMonth();
            let oneDay = dateNew.getDay() - signDateOld.getDay();
            if (oneYear > 0) {
              $('.signBtnClass').css({background: '#01aaef'});
              localStorage.removeItem('signTime');
            } else if (oneMonth > 0) {
              $('.signBtnClass').css({background: '#01aaef'});
              localStorage.removeItem('signTime');
            } else if (oneDay > 0) {
              $('.signBtnClass').css({background: '#01aaef'});
              localStorage.removeItem('signTime');
            } else {
              $('.signBtnClass').css({background: '#cdcdcd'});
            }
          } else {
            $('.signBtnClass').css({background: '#01aaef'});
            localStorage.removeItem('signTime');
          }

        }, function () {

        })
      }



      {
        if (localStorage.getItem('token')) {
          that.$store.dispatch('loginStateTrue');
          that.$store.state.loginState = true;
          that.$store.state.loginTrue = true;
          that.$store.state.token = localStorage.getItem('token');
        } else {
          that.$store.dispatch('loginStateFalse');
          that.$store.state.token = '';
          that.$store.state.loginTrue = false;
        }
      }




      if (localStorage.getItem('getU')) {
        let res = localStorage.getItem('getU');
        this.userNameM = JSON.parse(res).userName;
        this.userNumM = JSON.parse(res).loginUser;
      }

      this.getNewNotice();
    },

    watch: {

      selected(value){

        this.changeLanguage();
      }

    }

  }
</script>

<style lang="less" scoped>
  .lan-wrap {
    position: relative;

  }
  .lan-selected {
    position: relative;
    display: block;
    background: rgba(255,255,255,0.4);
    height: 30px;
    line-height: 20px;
    padding: 5px 0;
    border-radius: 4px;
    width: 68px;
    text-align: center;
    text-decoration: none;
    &:hover, &:focus, &.active {
      color: #f4f4f4 !important;

      .lan-panel {

        display: block;

      }
    }
  }

  .lan-panel {
    display: none;
    position: absolute;

    right: 0;
    top: 30px;

    width: 100px;

    padding: 5px 0;

    background-color: #fff;

    color: #333;

    text-align: center;

    border-radius: 2px;

    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.1);

    li {
      height: 24px;

      line-height: 24px;

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }

  *{
    font-family: 微软雅黑;
  }
  a{
    text-decoration:none !important;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .egg_dhqk{
    padding: 15px 0px;
  }
  .egg_dhqk:hover{
    background: #4C808C;
  }
  .egg_dz{
    border-width: 0px;
    font-size: 16px;
    cursor:pointer;
    color: #fff;
    padding: 16px 5px;
    background-color: rgba(255, 255, 255, 0);
    font-weight: bolder;
    border: none;
    outline: none;
  }
  .egg_dz1{
    border-width: 0px;
    font-size: 16px;
    cursor:pointer;
    color: #fff;
    padding: 0 5px;
    background-color: rgba(255, 255, 255, 0);
    font-weight: bolder;
    border: none;
    outline: none;
  }
  .egg_dz:hover{
    color: #2A8863;
  }
  .egg_dhldiv{
    margin-left: 5%;
    min-width: 500px;
  }
  .egg_dhlul{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .egg_dhl{
    color: #fff;
    font-size: 18px;
    padding: 4px 18px;
    font-weight:bolder;
    letter-spacing: 1px;
    text-decoration: none;
  }
  .topHeader {
    background-color: #fff;
  }

  header {
    background: #2D5B65;
    width: 100%;
    min-width: 1170px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
  }
  .header_bs{
    background-color: rgba(51, 51, 51, 0.29);
  }
  .header {
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
  }

  .header_left {
    display: flex;
    align-items: center;
    flex: 1;
    /*padding-left:10px;*/
  }

  .header-data-box {
    margin-left: 5rem;
  }

  .header-data-box p {
    display: flex;
  }

  .header-data-box p:nth-of-type(1) {
    font-weight: bold;
    color: #ffffff;
  }

  .header-span-ratio > span {
    font-weight: normal;
    margin-left: 10px;
  }

  .header-span-price > span {
    margin-right: 10px;
  }

  .green {
    color: #00cc00;
  }

  .red {
    color: #cc0000;
  }

  .header-data-box p:nth-of-type(2) {
    font-size: 2rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .header-user-show {
    display: flex;
    align-items: center;
    position: relative;
  }

  .header-user-show > a {
    position: relative;
    padding: 1.5rem 0;
    text-decoration: none;
  }

  .user-free {
    margin-right: 1.5rem;
  }

  .user-box {
    display: flex;
    align-items: center;
    color: #BCC2CB;
  }

  .user-img {
    margin-right: 1.5rem;
    width: 3rem;
    border-radius: 50%;
  }

  .user-phone {
    color: #fff;
    margin-right: .5rem;
    font-size: 14px;
    font-weight: bolder;
  }

  .nav {
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  .nav-left {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
  }

  .nav-notice {
    margin: 0 1rem 0 1rem;
    font-size: 16px;
    padding-right: 30px;
    position: relative;

  }

  .nav-notice > img {
    position: absolute;
    top: -10px;
    right: 0;
    -webkit-animation: newList 0.5s infinite alternate;
    -o-animation: newList 0.5s infinite alternate;
    animation: newList 0.5s infinite alternate;
  }

  @keyframes newList {
    0% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: -10px;
    }
  }

  @-webkit-keyframes newList {
    0% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: -10px;
    }
  }

  @-o-keyframes newList {
    0% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: -10px;
    }
  }

  .nav-notice-bell {
    color: #01aaef;
    font-size: 2rem;
  }

  .nav-notice-close-icon {
    color: #ee3523;
    font-size: 1.2rem;
  }

  .nav-right, .nav-link-item {
    height: 100%;
  }

  .nav-link-box {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .nav-link-item a {
    height: 100%;
    line-height: 4.5rem;
    padding: 0 1.5rem;
    font-size: 1.6rem;
  }

  .nav-link-item:nth-of-type(1) a {
    border-bottom: 2px solid #01aaef;
    color: #01aaef;
  }

  .nav-link-item a:hover {
    border-bottom: 2px solid #01aaef;
    color: #01aaef;
  }

  .header-user-show > a:hover .user-M-box {
    display: flex;
  }

  .user-M-box {
    display: none;
    position: absolute;
    background: #fff;
    top: 4.4rem;
    z-index: 99999;
    border: 1px solid #efefef;;
    width: 18rem;
    right: 5px;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    box-shadow: 5px 5px rgba(102, 102, 102, 0.1);
  }

  .user-M-box > i {
    position: absolute;
    color: #fff;
    top: -11px;
    right: 40px;
  }

  .user-M-box .user-img {
    margin: 0;
    width: 57px;
    margin-bottom: 0.833rem;
  }

  .user-M-box > span {
    font-size: 16px;
    font-weight: bold;
  }

  .user-m-name {
    color: #2A8863;
  }

  .user-m-phone {
    margin-bottom: 10px;
    color: #333;
  }

  .user-m-sign {
    width: 100%;
    display: flex;
    padding: 1rem 1rem;
    box-sizing: border-box;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .user-m-sign a {
    height: 38px;
    line-height: 38px;
    width: 90px;
    text-align: center;
    font-size: 1.33rem;
    background: #01aaef;
    color: #fff;
  }

  .user-m-sign > div {
    border: 1px solid #ddd;
    width: 90px;
    color: #666;
    padding: 3px;
    box-sizing: border-box;
  }
  .user-m-ul {
    width: 100%;
  }
  .user-m-ul li a {
    width: 100%;
    padding: 8px 1rem;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-top: 1px solid #eee;
    font-size: 16px;
    color: #2A8863;
    font-weight: bold;
    text-decoration: none;
  }
  .user-m-ul li a i {
    color: #2A8863;
    width: 23px;
    font-size: 1.333rem;
    margin-right: 8px;
  }
  .user-m-ul li a img {
    margin-left: 5rem;
  }
  .user-m-ul li:hover {
    background: #f0f0f0;
  }
</style>
