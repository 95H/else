<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="mask" @click="bigImg">
            <!-- 遮罩层 -->
            <div class="img">
                <img :src="imgSrc">
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  props: ["imgSrc"],
  methods: {
    bigImg() {
      this.$emit("clickit"); // 发送事件
    }
  }
};
</script>
<style lang="scss" scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3D(0, 0, 0);
}
.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}
.mask {
  cursor: zoom-out;
}
/*不限制图片大小，实现居中*/
.mask .img img {
  max-width: 100%;
  max-height: 680px;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  cursor: zoom-out;
  border: 10px solid #fff;
}
</style>