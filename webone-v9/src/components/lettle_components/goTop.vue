<template>
  <div class="goTop">
    <i class="iconfont" @click="goTop()">&#xe62e;</i>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    methods: {
      goTop(){
        $('html,body').animate({scrollTop: 0}, 'slow');
        return false;
      }
    }
  }
</script>
<style scoped>
  .goTop {
    display: none;
    position: fixed;
    right: 20px;
    bottom: 20px;
    color: #2A8863;
    border: 5px solid #2A8863;
    border-radius: 50%;
    font-weight: bold;
    padding: 5px;
    cursor: pointer;
  }
</style>
