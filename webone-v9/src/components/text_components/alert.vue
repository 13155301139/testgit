<template>
    <div class="alert-panel" v-show="visible">
      <div class="content">
        <span class="title" v-if="title">{{ title }}</span>
        <p class="description" v-if="description">{{ description }}</p>
      </div>
    </div>
</template>

<script type="text/babel">
  export default {
    name: 'Alert',

    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
      };
    },

    watch : {

      visible(value) {

        let self = this;

        value && setTimeout(() => {

          self.$emit('update:visible', false);

        }, 3500);
      }

    },

    methods: {
    },

    computed: {

    }
  };
</script>

<style type="less" scoped>

  .alert-panel {
    position: fixed;
    left: 0;
    top: 56px;
    right: 0;

    display: flex;

    justify-content: center;

    align-items: center;

    height: 60px;

    background: #d3355180;

    color: #fff;

    font-size: 16px;

    font-weight: bolder;

    z-index: 100000;

    text-align: center;

  }

</style>
