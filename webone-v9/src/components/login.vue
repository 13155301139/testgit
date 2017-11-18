<template>
  <div class="login">
    <div class="login-box">
      <loginCenter></loginCenter>
    </div>
  </div>
</template>
<script>
  import loginCenter from './lettle_components/loginCenter.vue';
  export default {
    components: {loginCenter},
  }
</script>
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    min-width: 1170px;
    margin-top: 56px;
    height: 52rem;
    background-image:url("../assets/img/login/egg_dlbj.png");
    background-repeat:no-repeat;
    background-size: cover;
    /*overflow: hidden;*/
    /*background: #0397DD;*/
  }

  .login-box {
    /*display:flex;*/
    position: relative;
    
  }
</style>
