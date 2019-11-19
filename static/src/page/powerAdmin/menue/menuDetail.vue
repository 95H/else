<template>
  <div class="menu-wrapper">
    <div class="newContain">
      <el-form ref="form" :model="menuData" label-width="130px" :rules="menuRules" v-if="menuData">
        <el-form-item label="菜单类型：" prop="functionType">
          <el-radio-group v-model="menuData.functionType">
            <el-radio :disabled= 'menuTypeSelect' v-for="(item,index) in functionMenu" :key="index" :label="item.value">
              {{item.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级菜单：">
          <el-input v-model="menuData.parentMenuName" :disabled="isReadonly" @focus="popParentMenu" maxlength="100"></el-input>
          <!-- <a href="javascript:;" class="search-btn clearMenu" @click.stop="clearParentMenu">清除菜单</a> -->
          <CenterDialog ref="parentMenu" dialogTitle="选择父级菜单" :dialogHeight="'400px'">
            <template slot="dialogContent">
              <div class="treeBox">
                <el-scrollbar style= "height: 100%" >
                  <tree-node v-if="treeData.length" v-for="(item,index) in treeData" :key="index" :node="item"></tree-node>
                  <!-- <el-tree :data="treeData" default-expand-all :props="defaultProps" :expand-on-click-node="false">
                    <span class="custom-tree-node el-tree-node__label" slot-scope="{ node, data }"
                          :class="{'tree-actived':node.data.id === parentId}"

                          @click="handleNodeClick(node)">
                          {{ node.label }}
                    </span>
                  </el-tree> -->
                </el-scrollbar>
              </div>
              <div class="text-center">
                <a href="javascript:;" class="search-btn" @click="selectParentMenuName(true)">确认</a>
                <a href="javascript:;" class="reset-btn" @click="selectParentMenuName(false)">取消</a>
              </div>
            </template>
          </CenterDialog>
        </el-form-item>
        <el-form-item label="菜单名：" prop="functionName">
          <el-input v-model="menuData.functionName" :readonly="isReadonly" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL：" prop="functionUrl">
          <el-input v-model="menuData.functionUrl" :readonly="isReadonly" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="menuData.sort" :readonly="isReadonly" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="菜单描述：" class="is-required">
          <el-input v-model="menuData.depict" :readonly="isReadonly" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别：">
          <el-select v-model="menuData.level" :disabled="isReadonly" placeholder="请选择">
            <el-option
              v-for="item in selectLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import CenterDialog from '@/components/centerDialog.vue';
  import TreeNode from "@/page/fullPageModule/fullPageTreeNode";
  import {mapState} from 'vuex';
  export default {
    data() {
      const checkNumber=(rule, value, callback) => {
        if(!value) return callback();
        if(isNaN(value)){
          return callback(new Error('请输入数字'))
        }else if((/^0\d+$/.test(value))){
          return callback(new Error('请确认输入正确'))
        }else{
          return  callback();
        }
      };
      return {
        functionMenu: [
          {
            value: 1,
            label: '菜单'
          },
          {
            value: 2,
            label: '功能'
          }
        ],
        treeData: [],
        defaultArr: [],
        menuRules:{
          functionType: [{required: true, message: '当前值不能为空', trigger: ['change', 'blur']}],
          functionName: [{required: true, message: '当前值不能为空', trigger: ['change', 'blur']}],
          functionUrl: [{required: true, message: '当前值不能为空', trigger: ['change', 'blur']}],
          sort: [
            {required: true, message: '当前值不能为空', trigger: ['change', 'blur']},
            {validator: checkNumber,  trigger: ['change', 'blur']}
          ]
        },
        menuTypeSelect: false,
        nodeData : {},
        selectLevel : [{
          value: 1,
          label: '一级'
        },{
          value: 2,
          label: '二级'
        }],
        isReadonly : this.$store.state.dataObj.isReadonly
      }
    },
    computed:{
      ...mapState(['dataObj', 'addDdialogFlag']),
      menuData(){
        if(!this.addDdialogFlag){
          this.menuTypeSelect = true;
        }
        return this.dataObj;
      }
    },
    watch:{
      menuData:{
        handler(newValue){
          return newValue;
        },
        deep: true
      }
    },
    components: {
      CenterDialog,TreeNode
    },
    mounted(){
      this.$store.state.handleNodeClick = (node)=>{
        this.handleNodeClick(node);
      };
    },
    methods:{
      // 数据处理
      dataLoop(Arr,level, defaultArr){
        for(let i in Arr){
          Arr[i]['level'] = level;
          Arr[i]['directoryName'] = Arr[i].label;
          Arr[i]['indexNumString'] = '';
          if(defaultArr.indexOf(Arr[i]['id']+'') !== -1){
            Arr[i]['checked'] = true;
          }else{
            Arr[i]['checked'] = false;
          }
          if(Arr[i].children.length){
            this.dataLoop(Arr[i].children,level+1, defaultArr);
          }
        }
        return Arr;
      },

      // 清除父级菜单
      clearParentMenu(){
        this.dataObj.parentMenuName = '';
        this.dataObj.parentId = 0;
      },

      // 弹出父级菜单【菜单树】
      popParentMenu(xzType) {
        let data = {
          xzType: xzType
        }
        this.$http.post('/api/sysfunction/functionTreeList', data)
          .then(res => {
            this.$refs.parentMenu.showDialog();
            this.treeData = this.dataLoop(res.data,1,this.defaultArr);
            this.$nextTick(() => {
              this.nodeData.id = this.dataObj.parentId;
              this.handleNodeClick(this.nodeData);
            })
          }).catch(err => {
            this.$messageError(err);
          })
      },

      //获取到选中的父级菜单[确定按钮]
      selectParentMenuName(flag){
        if(flag){
          // this.dataObj.parentMenuName = this.nodeData.label;
          this.$set(this.dataObj,'parentMenuName', this.nodeData.label)
          this.dataObj.parentId = this.nodeData.id;
          this.$refs.parentMenu.closeDialog();
        }else{
          this.$refs.parentMenu.closeDialog();
        }
      },

      // 点击选择父级菜单
      handleNodeClick(node) {
        let nodeList = document.querySelectorAll(".treeBox .el-tree-node__label");
        for (let i = 0; i < nodeList.length; i++) {
          if (node.id == nodeList[i].id) {
            nodeList[i].classList.add("tree-actived");
            this.nodeData = node;
          } else {
            nodeList[i].classList.remove("tree-actived");
          }
        }
      },

      childMethod(){ //右侧按钮事件统一命名
        const {id, functionType, parentId, functionName, functionUrl, iconClass, sort, depict, level} = this.menuData;
        const params = {id, functionType, parentId, functionName, functionUrl, iconClass, sort, depict, level};
        if(this.addDdialogFlag){
          //新增菜单
          this.$refs['form'].validate((valid) => {
            if(valid){
              this.$http.post('api/sysfunction/saveSysFunction', {...params})
                .then(response=>{
                  if(response.code === 200){
                    this.$store.state.refreshTableData();
                    this.$store.commit('changeShowCommon');
                  }else{
                    this.$messageError(response.msg);
                  }
                })
                .catch(err=>{
                  this.$messageError(err);
                })
            }else{
              this.$messageError('请检查输入是否正确');
            }
          })
        }else{
          //修改菜单
          this.$http.post('api/sysfunction/updateSysFunction', {...params})
          .then(response=>{
            if(response.code ===200){
              this.$store.state.refreshTableData();
              this.$store.commit('changeShowCommon');
            }
          })
          .catch(err=>{
            this.$messageError(err);
          })
        }
      },

      extraChildMethod(){ //右侧第二个按钮事件统一命名
        if(!this.addDdialogFlag){
          //删除当前项
          this.$confirm('您是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            const {id} = this.menuData ;
            this.$http.post('api/sysfunction/deleteSysFunction', {id})
            .then(response=>{
              this.$store.state.refreshTableData();
              this.$store.commit('changeShowCommon');
            })
            .catch(err=>{
              this.$messageError(err);
            })
          })
          .catch(err=>{
            this.$messageSuccess('已取消删除');
          })
        }else{
          this.$store.commit('changeShowCommon');
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .menu-wrapper{
    .newContain{
      /deep/ .el-form-item{
        margin-bottom: 0;
        width: 730px;
        .clearMenu{ position:absolute; right:-6px; top:8px; border-top-right-radius:4px; border-bottom-right-radius:4px;}
        .el-form-item__label{
          font-size: 13px;
          color:#686868;
        }
        /deep/ .el-select{ width:100%;}
        .el-form-item__content{
          .el-form-item__error{
            left: initial;
            right: 5px;
            top: 30%;
          }
        }
        .el-input__inner{
          color:#262628;
        }
        .el-form-item__content{
          .el-radio-group{
            .el-radio__label{
              color:#262628;
            }
          }
        }
      }
      .center-body{
        .treeBox{
          height:285px;
        }
      }
    }
    /deep/ .el-form-item.is-success .el-input__inner{border-color: #E1E1E1}
    /deep/ .el-form-item.is-required .el-input__inner[readonly]{ background-color:#f5f7fa; cursor:not-allowed;}
  }
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
