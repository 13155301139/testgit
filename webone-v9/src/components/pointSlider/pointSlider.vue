<template>
  <div :class="['range', {'range_sell': sliderType, 'range_buy': !sliderType}]" id="buySlider">
    <!-- 买单滑动杆 -->
    <div :class="['range_wrap', {'focus': hovering }]" ref="rangeWrap">
      <div class="range_paths_wrap">
        <div class="range_path"></div>
      </div>
      <div class="range_track_wrap">
        <div class="range_track"
             :style="{'width': currentPosition}"></div>
        <div class="range_handle"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseLeave"
             @mousedown="onButtonDown"
             :style="{'left': currentPosition}">
        </div>
      </div>
      <div class="range_points_wrap">
        <div :class="['range_point', {'active': currentPosition.replace('%', '') >= 0}]" @click="setPosition(0)"  style="left: 0%;"></div>
        <div :class="['range_point', {'active': currentPosition.replace('%', '') >= 25}]" @click="setPosition(25)" style="left: 25%;"></div>
        <div :class="['range_point', {'active': currentPosition.replace('%', '') >= 50}]" @click="setPosition(50)" style="left: 50%;"></div>
        <div :class="['range_point', {'active': currentPosition.replace('%', '') >= 75}]" @click="setPosition(75)" style="left: 75%;"></div>
        <div :class="['range_point', {'active': currentPosition.replace('%', '') == 100}]" @click="setPosition(100)" style="left: 100%;"></div>
      </div>
    </div>
    <span class="sliderPercent">{{currentPosition.replace('%','%')}}</span>
  </div>
</template>
<style lang="less" scoped>

  .range {
    position: relative;

    width: 100%;
    padding-right: 70px;
    height: 17px;
    margin: 20px 0 15px 0;

    background: none!important;
  }

  .sliderPercent {
    display: block;

    position: absolute;
    right: 0;
    top: -2px;

    width: 60px;
    height: 22px;
    text-align: right;
    font-size: 16px;
    font-weight: bolder;
    line-height: 22px;
    z-index: 100;
    color: #99abb7;

  }

  .item {
    min-height: 316px;

    font-size: 14px;
    padding-bottom: 4px;
  }

  .range_wrap {
    -moz-user-select: -moz-none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: 0;
    cursor: pointer;
    padding: 7px 0 8px;

    position: relative;

    .range_paths_wrap {
      position: relative;
      z-index: 1
    }

    .range_path {
      position: absolute;
      left: 0;
      top: 0;
      height: 2px;
      width: 100%;
      background: #d5d5d5;
      transition: all .05s;
      -moz-transition: all .05s;
      -webkit-transition: all .05s;
      -o-transition: all .05s;
    }

    .range_track_wrap {
      position: relative
    }

    .range_track {
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      height: 2px;
      width: 0;
      background: #090;
      transition: all .05s;
      -moz-transition: all .05s;
      -webkit-transition: all .05s;
      -o-transition: all .05s
    }

    .range_handle {
      position: absolute;
      width: 14px;
      height: 14px;
      border: 1px solid #d6d2d2;
      border-radius: 50%;
      top: -7px;
      z-index: 4;
      margin-left: -4px;
      cursor: col-resize;
      cursor: -webkit-grab;
      transition: left .05s;
      -moz-transition: left .05s;
      -webkit-transition: left .05s;
      -o-transition: left .05s;
      background: #fff;
    }

    .range_points_wrap {
      position: relative;
      top: -3px
    }

    .range_point {
      z-index: 3;
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin: -4px 0 0 -4px;
      text-align: center;

      &:after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #d5d5d5;
        border-radius: 50%;
        vertical-align: top;
        margin-top: 4px
      }
      &:hover:after {
        width: 16px;
        height: 16px;
        margin-top: 0;
        transition: all .05s;
        -moz-transition: all .05s;
        -webkit-transition: all .05s;
        -o-transition: all .05s
      }
      &.active:after {
        background: #090
      }

    }

    &.click {
      cursor: -webkit-grabbing;
      .range_handle {
        cursor: -webkit-grabbing
      }
    }
    &.focus .range_handle {
      border-color: #090
    }

    .range_handle {

    }

  }

  .range_buy .range_point.active:after,.range_buy .range_track,.range_edit_buy .range_point.active:after,.range_edit_buy .range_track {
    background-color: #2A8863;
  }

  .range_buy .focus .range_handle,.range_edit_buy .focus .range_handle {
    border-color: #2A8863;
  }

  .range_sell .range_point.active:after,.range_sell .range_track,.range_edit_sell .range_point.active:after,.range_edit_sell .range_track {
    background-color: #D33551;
  }

  .range_sell .focus .range_handle,.range_edit_sell .focus .range_handle {
    border-color: #D33551;
  }
</style>
<script>

  export default {
    name: 'pointSlider',

    props: {

      sliderType: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      }

    },

    data() {
      return {
        hovering: false,
        dragging: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: null,
        oldValue: this.value
      };
    },

    computed: {

      currentPosition() {
        return `${ Math.floor((this.value - this.min) / (this.max - this.min) * 100) }%`;
      }

    },

    methods: {

      handleMouseEnter() {
        this.hovering = true;
      },

      handleMouseLeave() {
        //this.hovering = false;
      },

      onButtonDown(event) {

        if (this.disabled) return;

        event.preventDefault();

        this.onDragStart(event);

        window.addEventListener('mousemove', this.onDragging);

        window.addEventListener('mouseup', this.onDragEnd);

        window.addEventListener('contextmenu', this.onDragEnd);

      },

      onDragStart(event) {
        this.dragging = true;

        this.startX = event.clientX;

        this.startPosition = parseFloat(this.currentPosition);

        this.newPosition = this.startPosition;
      },

      onDragging(event) {

        this.hovering = true;

        if (this.dragging) {

          let diff = 0;

          this.currentX = event.clientX;

          let _rangeWrapWidth = window.getComputedStyle ? window.getComputedStyle(this.$refs.rangeWrap, null).width : this.$refs.rangeWrap.currentStyle.width;

          diff = (this.currentX - this.startX) / parseFloat(_rangeWrapWidth.replace('px', '')) * 100;

          this.newPosition = this.startPosition + diff;

          this.setPosition(this.newPosition);

        }
      },

      onDragEnd() {
        if (this.dragging) {

          setTimeout(() => {

            this.dragging = false;

            this.hovering = false;

            this.setPosition(this.newPosition);

          }, 0);

          this.hovering = false;

          window.removeEventListener('mousemove', this.onDragging);
          window.removeEventListener('mouseup', this.onDragEnd);
          window.removeEventListener('contextmenu', this.onDragEnd);
        }
      },

      setPosition(newPosition) {

        if (newPosition === null) return;

        if (newPosition < 0) {

          newPosition = 0;

        } else if (newPosition > 100) {

          newPosition = 100;

        }

        const lengthPerStep = 100 / ((this.max - this.min) / this.step);

        const steps = Math.round(newPosition / lengthPerStep);

        let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;

        this.$emit('update:value', value);

        if (!this.dragging && this.value !== this.oldValue) {

          this.oldValue = this.value;

        }
      }
    }
  };

</script>
