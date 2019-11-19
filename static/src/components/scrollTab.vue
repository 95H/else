<template>
	<div class="scrollBox">
		<span class="scroll-tab-btn" :class="{'isactive':this.width >= this.scrollW}" @click="aaa('before')"><i class="iconfont icon-left-copy" :class="{actived:count}"></i></span>
		<div class = "scroll-tab-con" :style="{width:width + 'px'}">
			<div ref="scrollTab" class="scroll-tab">
				<div v-for="(item,index) in tabArr" :key="index" class="scroll-tab-item" @click="tabClick(item.id,index)" :class="{selected:index == active}">{{item.name}}</div>
			</div>
		</div>
		<span class="scroll-tab-btn" :class="{'isactive':this.width >= this.scrollW}" @click="aaa('after')"><i class="iconfont icon-gengduo_xiangqing" :class="{actived:actived}"></i></span>
	</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      active: 0,
      actived: false,
      scrollW: ""
    };
  },
  props: {
    tabArr: Array,
    width: String
  },
  mounted() {
    setTimeout(() => {
      this.scrollW = parseInt(window.getComputedStyle(this.$refs.scrollTab).width);
      this.actived = this.width < this.scrollW;
    }, 1000);
  },
  methods: {
    tabClick(val, index) {
      this.active = index;
      this.$emit("tabClick", val);
    },
    aaa(val) {
      let left = 0;
      if (val == "before") {
        if (this.count > 1) {
          this.count--;
        } else {
          this.count = 0;
        }
        this.actived = true;
        left = -150 * this.count;
      } else {
        this.count++;
        if (150 * this.count * 1 + this.width * 1 > parseInt(window.getComputedStyle(this.$refs.scrollTab).width)) {
          this.actived = false;
          this.count--;
          left = -parseInt(window.getComputedStyle(this.$refs.scrollTab).width) + this.width * 1;
        } else {
          this.actived = true;
          left = -150 * this.count;
        }
      }
      this.$refs.scrollTab.style.left = left + "px";
      this.$refs.scrollTab.style.transition = "left 1s";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.scrollBox {
  display: inline-block;
  width: 100%;
  .scroll-tab-btn {
    float: left;
    width: 30px;
    cursor: pointer;
    .iconfont {
      width: 30px;
      height: 35px;
      line-height: 35px;
      color: #a9a9a9;
      background: #fff;
      display: inline-block;
      text-align: center;
      border: 1px solid #ececec;
      border-top: none;
    }
    .actived {
      color: #fff;
      background: #5fa9ec;
    }
  }
  .isactive {
    pointer-events:none;
    opacity:0.5;
    cursor: default;
  }
  .scroll-tab-con {
    height: 35px;
    position: relative;
    overflow: hidden;
    float: left;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
    .scroll-tab {
      height: 36px;
      position: absolute;
      word-break: keep-all;
      white-space: nowrap;
      background: #f6faff;
      display: flex;
      left: 0;
      .scroll-tab-item {
        height: 35px;
        line-height: 35px;
        float: left;
        padding: 0 10px;
        font-size: 13px;
        text-align: center;
      }
      .scroll-tab-item:hover {
        color: #145fd2;
      }
      .selected {
        height: 36px;
        background: #fff;
        color: #145fd2;
        border-bottom: none;
        font-weight: bold;
        border-left: 1px solid #ececec;
        border-right: 1px solid #ececec;
      }
    }
  }
}
</style>