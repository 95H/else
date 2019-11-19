<template>
	<div class="select-tree">
    <div class="el-tree-node__content zlpg-tree" v-show="isShowNode" :style="{ 'padding-left': (node.level - 1) * 18 + 'px' }">
      <span class="el-tree-node__expand-icon el-icon-caret-right" :class="{ 'is-leaf': node.children&&node.children.length==0 , 'expanded':node.children&&node.children.length!=0 && expanded}" @click.stop="handleExpandIconClick"></span>
      <el-checkbox v-if="node.type == 'isStaff'" v-model="node.checked" :indeterminate="isIndeterminate" :disabled="node.disabled" @click.native.stop @change="checkedUser"></el-checkbox>
      <i class="iconfont" :class="{'icon-company blue fs13':node.type=='isCompany','icon-jigou blue fs13':node.type=='isDept','icon-selecteduser gray':node.type=='isStaff'}"></i>
      <span class="el-tree-node__label">{{node.name}}</span>
    </div>
    <el-collapse-transition>
    <div class="el-tree-node__children" v-show="expanded">
      <zlpg-tree-node v-for="(item,index) in node.children" :key="index" :node="item" :root-tree="node.children" :filter-text="filterText"></zlpg-tree-node>
    </div>
    </el-collapse-transition>
	</div>
</template>

<script>
import Public from '../public.js'
export default {
  name: "zlpgTreeNode",
  data() {
    return {
      expanded: true,
      isIndeterminate: false,
      parent : this.$parent,
      isShowNode:true,
    };
  },
  props: {
    node: Object,
    filterText : String,
    rootTree:Array
  },
  watch: {
    "node.checked"(val) {},
    'filterText'(val){
      if(this.node.name.indexOf(this.filterText) == -1){
        this.isShowNode = false
      }else{
        this.isShowNode = true;
        this.$parentLoop(this);  //查找符合搜索条件的节点的所有父节点
      }
    }
  },  
  methods: {
    handleExpandIconClick() {
      this.expanded = !this.expanded;
    },
    checkedUser(val, ev){
      Public.$emit('getTreeSelectedFun',val,this.node);
    },
    // 递归树节点,查找其所有的父节点，that表示 当前 vue实例
    $parentLoop(that){
      if(that.node.level != 1){
        that.$parent.isShowNode = true;
        this.$parentLoop(that.$parent);
      }
    },
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.zlpg-tree{ background-color:#fff;}
/deep/ .el-tree-node__label {
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height:initial;
}
.iconfont{ margin-right:5px;}
</style>
