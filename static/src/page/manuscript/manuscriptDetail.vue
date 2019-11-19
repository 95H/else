<template>
	<div class="manuscriptDetail-container">
		<div class="manuscriptDetail_left">
			<div class="file_title">
				<i class="iconfont icon-jigou"></i> 股权结构树
			</div>
			<el-scrollbar>
				<el-tree :data="investorTree" default-expand-all :props="defaultProps" :expand-on-click-node="false">
					<span class="custom-tree-node el-tree-node__label" slot-scope="{ node, data }" :class="{'tree-actived':investorId === node.data.id}" @click="treeClickHandle(node)">
            {{ node.data.name }}
          </span>
				</el-tree>
			</el-scrollbar>
		</div>
		<div class="manuscriptDetail_right" v-if="investorTree.length">
			<div class="leftIcon"><i class="iconfont icon-fenlei"></i>底稿分类</div>
			<div class="rightIcon" v-if="fileZindex"><i class="iconfont icon-liebiao"></i>文件列表</div>
			<working-manuscript @fileZindex='liebiaoHandle' :key="investorId"></working-manuscript>
		</div>
	</div>
</template>

<script>
  import centerDialog from "../../components/centerDialog"
  import workingManuscript from "../fullPageModule/workingManuscript"
  import Public from '../../public.js'
  export default {
    data () {
      return {
        investorTree:[],
        investorId:'',
        defaultProps:{
          children : "children",
          label : "label",
          data:{
            name:""
          }
        },
        fileZindex:true//根据是否进入文件夹判断是否显示文件列表图标
      };
    },
    created(){
      let _this = this;
      //获取股权机构树
      _this.getInvestorTree()
    },
    components:{ centerDialog,workingManuscript },
    methods:{
      treeClickHandle(node){
        this.investorId = node.data.id;
        this.$store.state.investorId = this.investorId;
        this.$store.state.readonly = node.sendStatus.indexOf("1003")==-1;
//        this.$store.state.workingManuscript();
      },
      //获取股权机构树
      getInvestorTree(){
        const _this = this,
          postUrl = "/api/investors/getInvestorTree";
        _this.$http.post(postUrl,{
          projectId : _this.$store.state.projectId
        }).then((res)=>{
          _this.investorTree = res.data.data;
          _this.investorId = res.data.data[0].id;
          _this.$store.state.readonly = res.data.data[0].sendStatus.indexOf("1003")==-1
          _this.$store.state.investorId = _this.investorId;
        }).catch((error)=>{
          _this.$messageError(error);
        })
      },
      childMethod(){ //进入项目
        this.$store.commit('changeShowCommon');
        this.$router.push({path:'/zlpg/project/projectCont/projectInformation'});
      },
      liebiaoHandle(val){
        this.fileZindex = !val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .manuscriptDetail-container {
    .iconfont{margin-right: 10px;font-size: 15px;line-height: 32px;display: inline}
    .icon-jigou{color: #57BFB2}
    .icon-liebiao{color: #9EC671}
    .icon-fenlei{color: #7C9FEE}
    .manuscriptDetail_left {
      width: 200px;
      position: absolute;
      left: 10px;
      top: 10px;
      bottom: 0;
      margin-bottom: 30px;
      box-sizing: border-box;
      border: 1px solid #ECECEC;
      padding: 15px 10px;
      overflow: hidden;
      /deep/ .el-scrollbar{ height:100%;
        .el-scrollbar__wrap{
          overflow-y: scroll;
          overflow-x: hidden;
        }
      }
      .file_title {
        margin-top: -15px;
        margin-left: -10px;
        margin-right: -10px;
        padding-left: 20px;
        background-color: #F6FAFF;
        border-bottom: 1px solid #ECECEC;
        line-height: 32px;
        box-sizing: border-box;
        height: 32px;
        font-size: 13px;
      }
    }
    .manuscriptDetail_right {
      position: absolute;
      left: 209px;
      top: 10px;
      right: 10px;
      bottom: 0;
      margin-bottom: 30px;
      box-sizing: border-box;
      overflow: hidden;
      .leftIcon,.rightIcon{
        position: absolute;
        top: 0;
        height: 32px;
        line-height: 32px;
        z-index: 1;
        font-size: 13px;
        padding-left: 20px;
      }
      .leftIcon{width: 278px}
      .rightIcon{width: 100px;left: 280px}
      /deep/ .manuscript_left{padding: 0;overflow: hidden;
        .el-scrollbar__wrap{
          padding-bottom: 32px;
          box-sizing: border-box;
        }
        .is-vertical{
          position: absolute;
          top: 0;
          bottom: 32px;
        }
      }
      /deep/ .manuscript_left:before{content: "";display: block;width: 100%;height: 32px;background-color: #F6FAFF;border-bottom: 1px solid #ECECEC;box-sizing: border-box;
      };
      /deep/  .manuscript_right{left: 279px;
        }
      /deep/ .file_title {background-color: #F6FAFF;line-height: 32px;box-sizing: border-box; height: 32px;font-size: 13px;
        .backFolder:hover {
          i {
            color: #3A80EC !important;
          }
        }
        .el-button {
          font-size: 13px;
          margin: 0 10px 0 0;
          color: #262628;
          transition: all 0.2s ease;
          padding: 0;
          i {
            font-size: 16px;
            color: #C0C0C0;
            transition: all 0.2s ease;
          }
          &:hover {
            color: #3A80EC;
            transition: all 0.2s ease;
            i {
              color: #3A80EC;
              transition: all 0.2s ease;
            }
          }
        }
      }
      .file_box {
        padding: 5px;
        .file_item {
          display: block;
          width: 108px;
          height: 130px;
          margin: 5px;
          border: 1px solid #fff;
          text-align: center;
          border-radius: 5px;
          box-sizing: border-box;
          position: relative;
          cursor: pointer;
          float: left;
          transition: all 0.2s ease;
          .el-checkbox {
            position: absolute;
            left: 5px;
            top: 5px;
            opacity: 0;
            transition: all 0.2s ease;
          }
          .icon_box {
            margin: 9px auto 0;
            width: 84px;
            height: 84px;
            overflow: hidden;
            line-height: 84px;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              font-size: 50px;
            }
          }
          a {
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13px;
            width: 100px;
            margin: 0 auto;
          }
          &.showCheckbox {
            border-color: #f1f5fa;
            background-color: #f1f5fa;
            transition: all 0.2s ease;
            .el-checkbox {
              opacity: 1;
              transition: all 0.2s ease;
            }
          }
          &.isChecked {
            border-color: #90c3fd;
            background-color: #f1f5fa;
            .el-checkbox {
              opacity: 1;
            }
          }
          .upload_icon {
            width: 55px;
            height: 55px;
            border: 1px dashed #CDCDCD;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              font-size: 25px;
              color: #E1E1E1;
            }
          }
        }
      }
    }
    /deep/ .el-tree{margin-top: 10px}
    /deep/ .el-tree-node__label{ text-overflow:ellipsis; overflow:hidden; white-space:nowrap; font-size:13px; margin-right:5px;}
  }
</style>
