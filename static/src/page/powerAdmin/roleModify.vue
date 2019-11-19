<template>
  <div>
    <div class="role-container">
      <div class="nameStyle">
        <p class="name">
          <span class="redd">*</span><span>角色名 ：</span>
        </p>
        <el-input class="nameIpt" v-model="form.roleName" maxLength="100"></el-input>
      </div>
      <div class="nameStyle">
        <p class="name">
          <span class="name">角色描述 ：</span>
        </p>
        <el-input class="nameIpt" v-model="form.depict" maxLength="100"></el-input>
      </div>
      <div class="tree-inner">
        <div class="auth"><span class="authority">分配权限 ：</span></div>
        <div class="auth-tree">
          <el-scrollbar style= "height: 100%" >
            <div class="powerTree">
              <tree-node v-if="treeData.length" v-for="(item,index) in treeData" :key="index" :node="item" :rootNode="treeData" :isSelectParent="true" :notClick="false" :show-checkbox="true"></tree-node>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TreeNode from "@/page/fullPageModule/fullPageTreeNode";
  var that
  export default {
    data() {
      return {
        form: {
          roleName: '',
          depict: ''
        },

        defaultProps: {
          children: 'children',
          label: 'label'
        },

        tableData: [],
        treeData: [],
        defaultArr: [],
        getCheckKeyArr: [], //选中的id
        btnFlag: false
      }
    },

    mounted() {
      that = this;
      if (this.$store.state.dataObj.judge) {
        that.getTreeData();
      } else {
        this.btnFlag = false;
        that.form.roleName = this.$store.state.dataObj.roleName;
        that.form.depict = this.$store.state.dataObj.depict;
        let data = {
          id: this.$store.state.dataObj.id
        }
        //数据回显
        this.$http.post('/api/sysrole/findSysRoleById ', data)
          .then(res => {
            that.defaultArr = res.data.menuIds.split(',');
            that.getTreeData();
          }).catch(err => {
          this.$messageError(err)
        })
      }
    },

    methods: {
      dataLoop(Arr,level, defaultArr){
        for(let i in Arr){
          Arr[i]['level'] = level;
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

      // 获得Tree
      getTreeData(xzType) {
        let data = {
          xzType: xzType
        }
        this.$http.post('/api/sysfunction/functionTreeList', data)
          .then(res => {
            that.treeData = that.dataLoop(res.data,1,that.defaultArr);
          }).catch(err => {
          this.$messageError(err);
        })
      },

      //保存按钮
      extraChildMethod() {
        var str = (that.form.roleName).replace(/(^\s*)|(\s*$)/g, "")
        if (str == '') {
          that.$message({
            type: 'error',
            message: '角色名不能为空！'
          });
        } else {
          var id = this.$store.state.dataObj.id;
      // var menuIds = (this.$refs.treeRef.getCheckedKeys()).toString();
          this.getChecked();
          let menuIds = this.getCheckKeyArr.join(',');
          that.modifyOrAdd(id, that.form.roleName, that.form.depict, menuIds);
        }
      },

      // 循环获取选中的权限
      getChecked(){
        this.getCheckKeyArr = [];
        this.getCheckKey(that.treeData);
      },

      // 循环获取数据
      getCheckKey(data){
        for(let i in data){
          if(data[i].checked){
            this.getCheckKeyArr.push(data[i].id);
          }
          this.getCheckKey(data[i].children);
        }
      },

      // 删除按钮
      childMethod() {
       if(this.$store.state.dataObj.judge){
         this.$store.commit('changeShowCommon');
       }else{
         var id = this.$store.state.dataObj.id;
         let data = {
           id: id
         };
         this.$http.post('/api/sysrole/deleteSysRole', data)
          .then(res => {
            that.$messageSuccess(res.msg);
            // that.selectRoles();
            this.$store.state.refresh();
            this.$store.commit('changeShowCommon');
          }).catch(err => {
           this.$messageError(err);
         })
       }
      },

      modifyOrAdd(id, roleName, depict, menuIds) {
        let data = {
          id: id,
          roleName: roleName,
          depict: depict,
          menuIds: menuIds
        };
        this.$http.post('/api/sysrole/saveOrUpdateSysRole', data)
          .then(res => {
            that.$messageSuccess(res.msg);
            that.form.roleName = '';
            that.form.depict = '';
            this.$store.state.refresh();
            this.$store.commit('changeShowCommon');
          }).catch(err => {
          that.$message({
            type: 'error',
            message: '角色已存在，请确认！'
          });
          console.log(err);
        })
      }
    },
    components: {
      TreeNode
    }
  }
</script>
<style scoped lang="scss">
  .role-container { padding: 30px 40px;
    .nameStyle { display: flex; margin-bottom: 10px;
      .name { width: 88px; text-align: right; height: 25px; line-height: 25px; font-size: 13px;
        .redd { color: red; line-height: 25px; }
      }
      .nameIpt { margin-left: 10px; }
    }
    .tree-inner {
      overflow: hidden;
      .auth {float: left; width: 78px; text-align: right; height: 25px; line-height: 25px; font-size: 13px; }
      .auth-tree{flex:1; margin-left:87px; height:400px; border:1px solid #E5E5E5; border-radius:4px; font-size:13px; padding:8px 0;
        /deep/ .el-scrollbar__wrap {overflow-x: hidden;}
      }
    }
  }
</style>
