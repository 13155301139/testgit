<template>
  <div class="loginLog">
   <div class="title-user-profile green">登陆日志</div>
    <div class="loginLog-content">
      <table>
        <thead>
        <tr>
          <td>登录时间</td>
          <td>登录IP</td>
          <td>登录设备</td>
        </tr>
        </thead>
        <tbody v-show="noCord">
        <tr v-for="item in items">
          <td>{{item.createDate | dateYMDHIS}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.source | translate}}</td>
        </tr>
        </tbody>
        <tbody class="noCord" v-show="!noCord">
        <tr>
          <td colspan="3" rowspan="5">
            <i class="iconfont">&#xe661;</i>
            <span>暂无记录</span>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3">
            <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChangeLoginLog"
              :current-page="currentPage"
              :total="totalNum">
            </el-pagination>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        noCord: false,
        currentPage: 1,
        totalNum: 10,
        items: []
      }
    },
    mounted() {
      this.handleCurrentChangeLoginLog(1);
    },
    methods: {
      handleCurrentChangeLoginLog(currentPage){
        this.$http({
          url: this.$URL_API+'account/logs',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: 10,
            param: {}
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.noCord = res.data.data.totalElements > 0;
            this.totalNum = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.items = res.data.data.content;
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
          //console.log(req)
        })
      }
    }
  }
</script>
<style>
  .el-pager li.active {
    border-color: #2A8863;
    background-color: #2A8863;
  }
  .el-pagination button:hover {
    color: #2A8863;
  }
  .el-pager li:hover {
      color: #2A8863;
  }
</style>
<style lang="less" scoped>
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
  .loginLog-title {
    font-size: 1.33rem;
    padding: 2rem 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1.5rem;
  }

  .loginLog-content table {
    border-spacing: 0;
    width: 100%;
    border-collapse: collapse;
  }

  .loginLog-content table td {
    padding: 8px;
  }

  .loginLog-content table thead {
    border: 1px solid #ddd;
    font-size: 16px;
    font-weight: bolder;
  }

  .loginLog-content table tbody {
    border: 1px solid #ddd;
    font-size:14px;
  }

  .loginLog-content table tbody tr:nth-child(odd) {
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .loginLog-content table tbody tr:hover {
    background: #f9f9f9;
  }

  .loginLog-content table .noCord td {
    padding: 6.667rem;
    text-align: center;
  }

  .loginLog-content table .noCord td span, .loginLog-content table .noCord td i {
    display: inline;
    font-size: 2rem;
  }

  .loginLog-content table .noCord td span {
    font-size: 1.167rem;
  }

  .loginLog-content table tfoot td {
    text-align: right;
  }
</style>
