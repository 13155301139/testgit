<template>
<div class="finance-ld">
   <ul>

     <router-link to="/userIndex" tag="li" :class="{'on': $route.path == '/userIndex'}" >
       <a href="javascript:void(0)" class="s1">
         <i class="fa fa-id-card-o" aria-hidden="true"></i>
         {{$t('Account')}}
       </a>
     </router-link>

     <router-link to="/recharge" tag="li" :class="{'on': $route.path == '/recharge'}" >
       <a href="javascript:void(0)" class="s2">
         <i class="fa fa-sign-in" aria-hidden="true"></i>
         {{$t('Deposit')}}
       </a>
     </router-link>

     <router-link to="/cash" tag="li" :class="{'on': $route.path == '/cash'}" >
       <a href="javascript:void(0)" class="s3">
         <i class="fa fa-sign-out" aria-hidden="true"></i>
         {{$t('Withdrawl')}}
       </a>
     </router-link>

     <router-link to="/accountDetails" tag="li" :class="{'on': $route.path == '/accountDetails'}" >
       <a href="javascript:void(0)" class="s4">
         <i class="fa fa-outdent" aria-hidden="true"></i>
         {{$t('Capital')}}
       </a>
     </router-link>

     <router-link to="/accountManagement" tag="li" :class="{'on': $route.path == '/accountManagement'}" >
       <a href="javascript:void(0)" class="s5">
         <i class="fa fa-database" aria-hidden="true"></i>
         {{$t('management')}}
       </a>
     </router-link>

     <router-link to="/settings" tag="li" :class="{'on': $route.path == '/settings'}" >
       <a href="javascript:void(0)" class="s6">
         <i class="fa fa-key" aria-hidden="true"></i>
         {{$t('Security')}}
       </a>
     </router-link>

     <router-link to="/loginLog" tag="li" :class="{'on': $route.path == '/loginLog'}" >
       <a href="javascript:void(0)" class="s7">
         <i class="fa fa-calendar" aria-hidden="true"></i>
         {{$t('record')}}
       </a>
     </router-link>

   </ul>
 </div>
</template>
<script>
  export default{
    data(){
      return{
        status: '',
      }
    }
  }
</script>
<style scoped>
.finance-ld{
  width: 160px;
  float: left;
  background: #fff;
}
.finance-ld li a i {
    font-size: 40px;
    display: block;
    margin: 0 auto 4px auto;
}
.finance-ld li.on a,.finance-ld li a:hover{
    color: #2A8863;
}
.finance-ld li.on,.finance-ld li:hover{
   background: rgba(114, 202, 136, 0.1);
}
.finance-ld li {
    border-bottom: 1px solid #dce1e5;
    position: relative;
    height: 90px;
}
.finance-ld li a {
    width: 100%;
    display: block;
    height: 100%;
    font-size: 16px;
    font-weight: bolder;
    text-align: center;
    color: #61727c;
    position: relative;
    padding-top: 10px;
    text-decoration:none;
}
</style>
