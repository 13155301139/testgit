<template>
    <div :class="['account-selected-container', type]">
        <div class="title">{{title}}:</div>
        <div class="list clearfix">
          <template v-for="(item, index) in data">
            <a :class="['list-item', {'active': valueTrack == item}]"  href="javascript:void(0)" @click="valueChanged(item)">
              {{item}}
            </a>
          </template>
        </div>
    </div>
</template>

<script>

  export default{
    name: 'accountSelected',

    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => {
          return [];
        }
      },
      value: {
        type: String,
        default: '',
        required: true
      }
    },
    data(){
      return{
        valueTrack: ''
      }
    },
    components:{

    },
    mounted() {
      this.valueTrack = this.value;
    },
    methods: {
      valueChanged(value) {
        this.$emit('update:value', value);

        this.valueTrack = value;
      }
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
  .account-selected-container {

    &.classical {

      background: #f4f4f4;
      margin: 15px;
      border-radius: 4px;

      .title {
        padding: 10px 20px 0;
      }

      .list-item {
        border-radius: 4px;

        border: 1px solid #ccc;

        &:hover, &:focus, &.active {

          background-color: #2A8863;

          border-color: transparent;
        }
      }

    }

    .title {
      height: 40px;
      line-height: 40px;

      padding: 5px 20px 0;

      font-size: 15px;
      font-weight: bolder;
    }

    .list {
      padding: 20px;
    }

    .list-item {

      float: left;

      margin: 5px 12px 5px 0;

      width: 100px;

      height: 36px;

      line-height: 25px;

      padding: 5px 10px;

      font-size: 14px;

      border-radius: 4px;

      border: 1px solid #eee;

      text-align: center;

      text-decoration: none;

      font-weight: bolder;
      &:hover, &:focus, &.active {
        color: #fff;

        background-color: #D33551;

        border-color: transparent;
      }

      &:first-child {
        margin-left: 0;
      }

    }

  }
</style>

