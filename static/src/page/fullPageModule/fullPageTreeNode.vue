<template>
	<div>
		<div class="el-tree-node__content zlpg-tree" :style="{ 'padding-left': (node.level - 1) * 18 + 'px' }" @click.stop="handleClick">
      <div class="iconBox" v-if="!node.directoryName && this.$store.state.onlineOffline && !/projectProjectSeal|reportCheckNumber|seal/.test(this.$route.path)">
        <i v-if="this.node.isReportGenerate" class="baogao" @click.stop="baogao">报</i>
        <i v-if="this.node.isExplainGenerate" class="shuoming" @click.stop="shuoming">说</i>
      </div>
      <div class="sealIconBox" v-if="!node.directoryName && /projectProjectSeal|reportCheckNumber|seal/.test(this.$route.path)">
        <i v-if="this.node.sealStatusId == '1386'" class="sealIcon dhsIcon">待核数</i>
        <i v-if="this.node.sealStatusId == '1387'" class="sealIcon dgzIcon">待盖章</i>
        <i v-if="this.node.sealStatusId == '1388'" class="sealIcon hsjjIcon">核数拒绝</i>
        <i v-if="this.node.sealStatusId == '1389'" class="sealIcon ygzIcon">已盖章</i>
        <i v-if="this.node.sealStatusId == '1390'" class="sealIcon gzjjIcon">盖章拒绝</i>
      </div>
      <span class="el-tree-node__expand-icon el-icon-caret-right" :class="{ 'is-leaf': node.children&&node.children.length==0 , 'expanded':node.children&&node.children.length!=0 && expanded}" @click.stop="handleExpandIconClick"></span>
      <el-checkbox v-if="showCheckbox" v-model="node.checked" :indeterminate="isIndeterminate" :disabled="node.disabled" @change="selectCheckBox" @click.native.stop></el-checkbox>
      <span v-if="node.directoryName" class="el-tree-node__label" :id="node.id" :title="node.indexNumString + node.directoryName">{{node.indexNumString + node.directoryName}}</span>
      <span v-else-if="node.label" class="el-tree-node__label">{{node.label}}</span>
      <template v-else>
        <span class="el-tree-node__label" v-if="/projectProjectSeal|reportCheckNumber|seal/.test(this.$route.path)" :class="{nodegray:node.investorStage != 1353}">{{node.name}}</span>
        <span class="el-tree-node__label" v-else :class="/externalOffLineTask|externalOffLineAudit/g.test($route.path) ? '':{'heise':node.investorStatus=='1000001','lvse':node.investorStatus=='1000002' || node.investorStatus=='1000004','huangse':node.investorStatus=='1000003','hongse':node.investorStatus=='1000005','zise':node.investorStatus=='1000006','gray':node.investorStatus=='1000007'}">{{node.name}}</span>
      </template>
    </div>
		<el-collapse-transition>
    <div class="el-tree-node__children" v-show="expanded">
      <zlpg-tree-node v-for="(item,index) in node.children" :key="index" :isSelectParent="isSelectParent" :node="item" :rootNode="rootNode" :notClick="notClick" @node-click="handleClick" :show-checkbox="showCheckbox"></zlpg-tree-node>
    </div>
    </el-collapse-transition>
	</div>
</template>

<script>
export default {
  name: "zlpgTreeNode",
  data() {
    return {
      expanded: true,
      isIndeterminate: false,
      checkStrictly: false,
      nodesMap: {},
    };
  },
  props: {
    node: Object,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    notClick: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isSelectParent: {  //选中本身后是否选中其所有父级节点
      type: Boolean,
      default: false
    },
    rootNode : Array, //整棵树结构
  },
  watch: {
    "node.checked"(val) {
      if(!this.isSelectParent){
        if(this.node.children && this.node.children.length > 0){
          this.selectChildrenLoop(this.node.children,val);
        }
      }else{
        if(!val){
          this.unchecked(this.rootNode,this.node.pId);
        }
      }
    }
  },
  methods: {
    handleExpandIconClick() {
      this.expanded = !this.expanded;
    },
    selectCheckBox(val, ev) {
      if(this.isSelectParent){
        this.dataLoop(this.rootNode,this.node.pId);
      }
      if(this.node.children && this.node.children.length > 0){
        this.selectChildrenLoop(this.node.children,val);
      }
    },
    handleClick() {
      if (!this.showCheckbox) {
        if (this.node.directoryName) {
          this.$store.dispatch("handleNodeClick", this.node);
        } else {
          this.$store.dispatch("sealNodeClick", this.node);
        }
      } else {
        if (this.notClick) {
          this.$store.dispatch("leftMenuClick", this.node);
        }
      }
    },
    //更新当前节点所有子节点的选中状态
    selectChildrenLoop(Arr,val){
      for (let i in Arr) {
      	if(!Arr[i].disabled){
      		this.$set(Arr[i],"checked",val);
      	}
        if(Arr[i].children && Arr[i].children.length>0){
          this.selectChildrenLoop(Arr[i].children,val);
        }
      }
    },
    // 根据当前节点选择其所有的父节点的递归
    /*
      Arr : 树结构数组
      pId : 当前节点的父节点id，即当前节点的Pid
      val : 当前节点的选中状态
    */
    dataLoop(Arr,pId){
      for(let i=0;i<Arr.length;i++){
        if(Arr[i].id == pId){
          Arr[i]['checked'] = true;
          if(Arr[i].pId != 0){
            this.dataLoop(this.rootNode,Arr[i].pId);
          }
          break;
        }else{
          if(Arr[i].children && Arr[i].children.length>0){
            this.dataLoop(Arr[i].children,pId);
          }
        }
      }
    },
    // 是否取消当前节点的父节点的选中状态
    unchecked(Arr,pId){
      let checkedNum = 0;
      Arr.forEach(item=>{
        if(item.id == pId && pId != 0){
          item.children.forEach(childItem=>{
            if(childItem.checked) checkedNum++
          })
          if(checkedNum == 0) item.checked=false;
        }else{
          if(item.children && item.children.length>0){
            this.unchecked(item.children,pId);
          }
        }
      })
    },
    // 报告
    baogao(){
      // console.log('报告');
      this.$router.push({
        path : (/projectOnlineTask/.test(this.$route.path) ? "/zlpg/project/projectCont/projectImplementation/projectOnlineTask" : '/zlpg/project/projectCont/projectAuditing/projectReportAudit') + '/assessment/7'
      })
      this.$store.state.leftMenuClick(this.node);
    },
    // 说明
    shuoming(){
      // console.log('说明');
      this.$router.push({
        path : (/projectOnlineTask/.test(this.$route.path) ? "/zlpg/project/projectCont/projectImplementation/projectOnlineTask" : '/zlpg/project/projectCont/projectAuditing/projectReportAudit') + '/assessment/8'
      })
      this.$store.state.leftMenuClick(this.node);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
/deep/ .el-tree-node__label {
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height:initial;
}
.zlpg-tree {
  .heise {
    color: #29292b !important;
  }
  .lvse {
    color: #21cc64 !important;
  }
  .zise {
    color: #7c9fee !important;
  }
  .huangse {
    color: #f5a623 !important;
  }
  .hongse {
    color: #ff7182 !important;
  }
}
.baogao,.shuoming{ font-size:12px; border:1px solid #ff7182; border-radius:2px; padding:2px; cursor: pointer; color:#ff7182; display: inline-block; height:18px; line-height: 14px; box-sizing: border-box;}
.shuoming{ border-color:#7c9fee; color:#7c9fee;}
.iconBox{ width:50px; text-align:right;}
.nodegray {color: #B0B0B0;}
.sealIconBox {
  width: 56px;
  min-width: 44px;
  text-align:right;
  i {
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height: 18px;
    height:18px;
    border-radius:3px;
    border:1px solid;
    padding: 0 3px;
    max-width: 56px;
  }
  .dhsIcon {
    border-color: #3A80EC;
    color: #3A80EC;
  }
  .dgzIcon {
    border-color: #F09237;
    color: #F09237;
  }
  .hsjjIcon {
    border-color: #F86F45;
    color: #F86F45;
  }
  .ygzIcon {
    border-color: #11BF6B;
    color: #11BF6B;
  }
  .gzjjIcon {
    border-color: #F84545;
    color: #F84545;
  }
}
</style>
