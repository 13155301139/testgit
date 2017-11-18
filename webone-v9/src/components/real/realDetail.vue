<template>
  <div class="realDetail">
    <div class="title-user-profile green">实名认证</div>
    <div class="identified-body">
    <div class="realDetail-content">
      <div>
        <span>姓名</span><span>{{userName}}</span>
      </div>
      <div>
        <span>国家/地区</span><span>{{userCountry}}</span>
      </div>
      <div>
        <span>证件类型</span><span>{{'身份证'}}</span>
      </div>
      <div>
        <span>证件号码</span><span>{{userIdCard}}</span>
      </div>
      <div>
        <span>状态</span>
        <span style="color: #2A8863;
        font-weight:bolder;border: 1px solid #4caf50;
        border-radius: 3px;padding: 2px 3px;width:52px;">{{'已认证'}}</span>
      </div>
      
    </div>
    <div class="identified-copy">
          <span style="font-size: 14px;color: #b7b7b7;font-weight:bolder;">官方认证
          </span>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        userName: '',
        userCountry: '',
        userIdCard: '',
      }
    },
    mounted() {

      let res = localStorage.getItem('getU');
      this.userName = JSON.parse(res).userName;
      this.userCountry=JSON.parse(res).country;
      this.$http({
        url: this.$URL_API+'authentication/info',
        method: 'GET',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          'X-Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then((res) => {
        if(res.data.code===200){
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].certificateEnum === 'IDCARD') {
              this.userIdCard = res.data.data[i].code;
            }
          }
        }
      })
    }

  }
</script>
<style lang="less" scoped>
  .identified-copy {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
  .identified-body{
    border: 3px solid #e3e3e3;
    margin: 40px 60px;
    padding: 10px;
    position: relative;
  }
  .title-user-profile {
    height: 50px;
    
    line-height: 50px;

    font-size: 18px;
    
    font-weight:bolder;
    padding-left: 20px;

    color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    &.green {
      background: #2A8863;
    }
  }
  .realDetail-title {
    padding: 2rem 0;
    border-bottom: 1px solid #ddd;
    font-size: 1.333rem;
  }

  .realDetail-content {
   border: 1px solid #e3e3e3;
    position: relative;
    padding: 20px;
  }
  .realDetail-content div {
    display: flex;
    margin-bottom: 2rem;
    font-size: 1.167rem;
  }

  .realDetail-content div > span {
    width: 200px;
  }

  .realDetail-content div > span:nth-of-type(1) {
    margin-right: 3rem;
    text-align: right;
  }
</style>
