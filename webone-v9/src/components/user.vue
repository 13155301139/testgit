<template>
  <div class="user">
    <div class="alert alert-danger alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <strong>公告：</strong>EggOne将于2017年11月10日开放公测，公测期间请勿进行任何资产的充值。平台将发放一定的测试代币，正式上线前平台数据将全部清空。
</div>
    <div class="egg_grzx clearfix">
      <div class="inner"></div>
    </div>
    <div class="user-box">
      <userBtnLink></userBtnLink>
      <div class="user-box-right">
        <transition enter-active-class="animated fadeIn">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import userBtnLink from './lettle_components/userBtnLink.vue';
  import $ from 'jquery';
  export default {
    data() {
      return {
      }
    },
     mounted() {
      $('.close').click(function(){
        $(".alert").css("display","none");
      })
     },
    components: {
      userBtnLink
    }
  }
</script>
<style lang="less" scoped>
  .alert{
    margin-bottom: 0px;
    font-size:18px;
    letter-spacing:2px;
  }
  .user{
    padding-top: 55px;
  }
  .egg_grzx{
    position: relative;
    height: 0;
    padding-bottom: 15%;
    background-image:url("../../src/assets/img/bgspec.png");
    background-repeat:no-repeat;
    background-size: cover;

    .inner {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;

    }

    .title-center {
      margin-top: 4%;
      margin-left: 10%;
      font-size: 50px;
      font-weight: bold;
      color: #fff;

    }
  }
  .user .user-box {
    color: #333;
    height: 100%;

  }
  .user-box {
    position: relative;
    width:80%;
    top: -150px;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    align-items: flex-start;
    box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    min-width: 1010px;
    margin: 0 auto;
  }

  .user-box-right {
    width: 100%;
    background: #fff;
    margin-left: 10px;
    min-height: 700px;
    box-sizing: border-box;
    border-left: 1px solid #eee;
  }
</style>

