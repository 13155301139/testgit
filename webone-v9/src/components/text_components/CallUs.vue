<template>
  <div class="CallUs layout" style="margin-top: 56px;">
    <div class="group">
      <h1 class="CallUs-title">提交工单</h1>
      <div class="CallUs-middle">
        <aside>
          <section>
            <span>姓名：</span>
            <input type="text" placeholder="请输入姓名" v-model="name" class="name-ipt"/>
          </section>
          <section>
            <span>电话：</span>
            <input type="text" placeholder="请输入联系电话" v-model="Phone" class="Phone-ipt" maxlength="11"/>
          </section>
          <section>
            <span>邮箱：</span>
            <input type="text" placeholder="请输入联系邮箱" v-model="Email" class="Email-ipt" maxlength="32"/>
          </section>
        </aside>
        <aside style="height:175px;">
          <span>问题或建议：</span>
          <textarea placeholder="请输入问题或建议" v-model="Text"></textarea>
        </aside>
      </div>
      <p>
        <button @click="subMit($event)">提交</button>
      </p>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data(){
      return {
        name: '',
        Phone: '',
        Email: '',
        Text: ''
      }
    },
    mounted(){
      let _this = this;
      $('.Phone-ipt').blur(function () {
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(_this.Phone))) {
          _this.showError('', '手机号码有误');
        }
      });
      $('.Email-ipt').blur(function () {
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(_this.Email)) {
          _this.showError('', '邮箱输入有误');
        }
      })
    },
    methods: {
      subMit(ev){
        let textContent;
        if (!this.Phone && !this.Email) {
          this.showError('', '手机号码/邮箱 不能为空');
        } else if (!this.Text) {
          this.showError('', '内容不能为空');
        } else {
          textContent = this.removeHTMLTag(this.Text);
          ev.target.innerHTML = '处理中...';
          this.$http({
            url: this.$URL_API + 'other/feedback',
            method: 'POST',
            data: {
              userName: this.name,
              contacts: this.Phone ? this.Phone : this.Email,
              content: textContent,
              status:0
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            if (res.data.code === 200) {
              this.showError(res.data.code, res.data.message);
              ev.target.innerHTML = '提交'
            } else {
              this.showError(res.data.code, res.data.message);
              ev.target.innerHTML = '提交'
            }
          }).catch((req) => {
            ev.target.innerHTML = '提交'
          })
        }
      }
    }
  }
</script>
<style scoped>
  .CallUs {
    margin: 20px auto;
    background: #fff;
  }

  .CallUs img {
    width: 100%;
  }

  .CallUs-title {
    text-align: center;
    font-weight: 500;
    padding: 20px 0;
  }

  .CallUs-middle {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    font-size: 16px;
  }

  .CallUs-middle aside span {
    font-size: 14px;
    padding: 5px 0;
  }

  .CallUs-middle aside section {
    margin-bottom: 15px;
  }

  .CallUs-middle aside input {
    width: 80%;
    padding: 10px 10px;
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
  }

  .CallUs-middle aside textarea {
    width: 80%;
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    height: 82%;
    border-radius: 2px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
  }

  aside {
    width: 40%;
  }

  .group > p {
    text-align: center;
  }

  button {
    margin: 20px auto;
    padding: 10px 50px;
    color: #FFFFFF;
    border: none;
    background-color: #16AB3B;
    border-radius: 4px !important;
    outline: none;
    cursor: pointer;
  }
</style>
