<template>
    <div class="evaluateBox">
        <ul class="newSpotItem">
            <p>评估任务</p>
          <li v-for="(item,index) in tabs" :key="index" :class="{active:index == num}" @click="tabItem(num,index,item.id)">
                {{item.name}}
            </li>
        </ul>
        <!-- 跳转到对应页面 begin -->
        <component ref="child" v-bind:is="componentsType" :tabs="tabs"></component>
    </div>
</template>

<script>
import jobAllocation from "@/page/task/jobAllocation"; //按资产类别分配
//import powerAllocation from "@/page/task/powerAllocation";      //按公司分配
export default {
  name: "newSpotTask",
  components: {
    jobAllocation
    //,powerAllocation
  },
  data() {
    return {
      num: 0,
      tabs: [
        { name: "按资产类别分配", id: "jobAllocation" }
        //{ name: "按公司分配",id:"powerAllocation"}
      ],
      componentsType: "jobAllocation"
    };
  },
  created() {},
  methods: {
    tabItem(num, index, val) {
      this.componentsType = val;
      this.num = index;
      this.$emit("tabItem", index);
      //console.log(val);
    }
  }
};
</script>

<style lang='scss' scoped>
/deep/ .el-tabs__content {
  position: static !important;
  width: 100%;
  top: 0;
  bottom: 0;
  padding: 10px 11px 0 10px;
  box-sizing: border-box;
}
.newSpotItem {
  font-size: 0;
  border-bottom: solid 1px #ececec;
  height: 35px;
  p {
    display: inline-block;
    font-size: 13px;
    color: #262628;
    margin-left: 22px;
    line-height: 35px;
    position: relative;
  }
  p:after {
    content: "";
    position: absolute;
    top: 6px;
    height: 20px;
    border: 1px solid #c8c8c8;
    margin-left: 8px;
  }
  li {
    display: inline-block;
    font-size: 13px;
    color: #262628;
    margin-left: 20px;
    line-height: 35px;
  }
  li.active {
    border-bottom: solid 2px #145fd2;
    color: #145fd2;
    font-weight: bold;
  }
}
</style>
