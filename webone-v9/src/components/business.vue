<template>
  <div class="business">
    <div class="business-box">
      <div class="business-box-right">
        <transition enter-active-class="animated fadeIn">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {}
</script>
<style scoped>
  .business{
    padding-top:56px;
    background: #2c3940;
    min-width: 1170px;
  }
  .business-box {
    width: 100%;
    margin: 0 auto;
    margin: 2rem auto;
    margin-bottom: 0rem;
    padding-bottom: 2rem;
    display: flex;
  }

  .business-box-right {
    width: 100%;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    box-sizing: border-box;
  }
</style>
