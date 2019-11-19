<template>
    <div class="bottomOpen" :style="{height:isShow?'auto':0}">
        <div class="bottomOpen-header" v-if="isHead">
            <div class="bottomOpen-header-btn"><slot name="btns"></slot></div>
            <div class="bottomOpen-header-tit"><slot name="tit"></slot></div>
        </div>
        <div class="bottomOpen-cont">
            <slot name="cont"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:["isHead","isShow"],
    data() {
      return {

      }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.bottomOpen{
    overflow: hidden;
    transition: height 2s;
    .bottomOpen-header{
        height: 40px;
        line-height: 40px;
        background: #F6FAFF;
        border-left: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
        border-top: 1px solid #E5E5E5;
        padding: 0 20px;
        .bottomOpen-header-btn{
            float: right;
        }
    }
    .bottomOpen-cont{
        border: 1px solid #E5E5E5;
        padding: 10px 20px;
        background: #fff;
    }
}
</style>

