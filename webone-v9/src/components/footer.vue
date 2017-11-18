<template>
<footer>
<div class="footer-container">
 <div class="base-intro">
  <h5 class="di_bt">
  {{$t('trading')}}</h5>
  <p class="di_wz">
  {{$t('Tobuild')}}
</p>
 </div>
 <div class="quick-link">
   <div class="link-section">
    <h5 class="section-header">{{$t('Customer')}}</h5>
    <span class="collapse-indicator">x</span>
    <ul class="section-content">
              <li>
                <a href="" >{{$t('API')}}</a></li>
              <li>
                <a href="/#/CallUs" >{{$t('contact')}}</a></li>
              <li>
                <a href="">{{$t('Rate')}}</a>
              </li>
       </ul>
   </div>
   <div class="link-sectionto">
    <h5 class="section-header">{{$t('About')}}</h5>
    <span class="collapse-indicator">x</span>
    <ul  class="section-content">
              <li >
                <a href="/#/technique" >{{$t('advanced')}}</a></li>
              <li >
                <a href="/#/security" >{{$t('Asset')}}</a>
              </li>
              <li >
                <a href="" target="_blank"></a>
              </li>
       </ul>
   </div>
 </div>
<div class="copyright-egg">
      <a class="link-left" href="/#/userAgreement" >{{$t('agreement')}}</a>
      <a class="link-ritght" href="/#/dealAml" >{{$t('statement')}}</a>
      <p class="company">
      <span class="short-split-line">|</span>EGGONE<span class="symbol">©</span>2017</p>
</div>
</div>
</footer>
</template>
// <script>
//   import $ from 'jquery';
//   export default{
//     data(){
//       return {
//         weChatShow: false
//       }
//     },
//     mounted() {
//       let that = this;
//       {
//         $('.footer-header-share-weChat').hover(function () {
//           that.weChatShow = true;
//         }, function () {
//           that.weChatShow = false;
//         })
//       }//微信二维码显示隐藏
//     },
//     methods: {}
//   }
// </script>
<style scoped>
a{
  color: #F5F5F5;
  padding: 2px 0;
  display: block;
  transition: all 0.4s ease;
  text-decoration:none;
  font-weight:bolder;
}
a:focus, a:hover {
    color: #2A8863;
    text-decoration: none;
}
footer{
  background-color:#2D5B65;;
  padding: 30px 15px;
  color: #F5F5F5;
  border-top: 1px solid rgba(151,151,151,0.25);
  min-width: 1170px;
}
.footer-container{
  width: 100%;
  margin: 0 auto;
  max-width: 1170px;
}
.base-intro{
  float: left;
  width: 50%;
  border-bottom: none;
  margin-bottom: 15px;
  font-weight: normal;
  letter-spacing: 0.1em;
}
.di_bt{
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: bolder;
  letter-spacing: 2px;
}
.di_wz{
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bolder;
}
.quick-link{
  float: right;
  text-align: left;
  position: relative;
}
.link-section{
  float: left;
  width: 135px;
  margin-left: 35px;
  border-bottom: none;
  line-height: 1.8em;
  letter-spacing: 0.1em;
}
.section-header{
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: bolder;
}
.collapse-indicator{
  display: none;
}
.section-content{
  display: block;
  font-size: 14px;
  margin-bottom: 15px;
  padding-left: 30px;
  margin-left: -28.5px;
}
.link-sectionto{
  float: left;
  margin-left: 35px;
  border-bottom: none;
  line-height: 1.8em;
  letter-spacing: 0.1em;
}
.copyright-egg{
  padding-top: 15px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(255, 255, 255, 0.5);
  clear: both;
  display: block;
  font-size: 14px;
  font-weight: bolder;
}
.link-left{
 line-height: 1.8em;
 letter-spacing: 0.1em;
 padding-right: 10px;
 text-decoration:none;
 display: inline-block;
}
.link-ritght{
 line-height: 1.8em;
 letter-spacing: 0.1em;
 padding-right: 10px;
 text-decoration:none;
 display: inline-block;
}
.company{
  margin-top: 0;
  display: inline-block;
}
.short-split-line{
  display: inline-block;
  padding: 0 8px 0 0;
}
.symbol{
  padding: 0 3px;
}
</style>
