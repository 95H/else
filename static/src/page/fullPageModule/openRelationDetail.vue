<template>
  <div class="full_page">
    <!-- 顶部内容 -->
		<div class="full_page_title">
			<h3 class="fs14 fl projectName textOverflow1" :title="projectInfo.projectName">{{ projectInfo.projectName }}</h3>
			<span class="marginRight20 fs12 fl">{{ projectInfo.projectNumber }}</span>
			<div class="project-nature marginRight10 fl">
				<span>{{ commonData.projectNatureId[projectInfo.projectNatureId]?commonData.projectNatureId[projectInfo.projectNatureId].slice(0,commonData.projectNatureId[projectInfo.projectNatureId].length-2):'' }}</span>
				<span>{{ commonData.projectLevelId[projectInfo.projectLevelId] }}级</span>
				<span>{{ commonData.assessmentTarget[projectInfo.assessmentTarget]?commonData.assessmentTarget[projectInfo.assessmentTarget].slice(0,commonData.assessmentTarget[projectInfo.assessmentTarget].length-2):'' }}</span>
				<span>{{ projectInfo.isListedCompany==1?"上市":"非上市" }}</span>
			</div>
			<span class="fs13 fl">负责人：{{projectInfo.projectPersonName}}</span>
		</div>

		<!-- 左侧弹窗 -->
		<div class="full_page_left" :style="{'width': leftWidth}">
			<div class="projectNavTree fl" :style="{'left': navPosition}">
				<div class="navTree">
					<el-scrollbar>
						<!-- <el-tree :data="projectNavTree" default-expand-all ref="tree" show-checkbox :expand-on-click-node="false" :props="defaultDatas"></el-tree> -->
						<zlpg-tree-node ref="zlpgTree" v-for="(item,index) in projectNavTree" :key="index" :node="item" :show-checkbox="true">{{item.name}}</zlpg-tree-node>
					</el-scrollbar>
				</div>
				<div class="nav_bottom" v-if="!/externalOffLineTask|externalOffLineAudit/g.test($route.path)">
					<div class="bmStatus" v-if="/projectImplementation|projectReportAudit/g.test(this.$route.path)">
						<span class="heise">未送审</span>
						<span class="lvse" v-if="/projectImplementation/g.test(this.$route.path)">已送审</span>
						<span class="lvse" v-if="/projectAuditing/g.test(this.$route.path)">已通过</span>
						<span class="zise">已签发</span>
						<span class="huangse" v-if="/projectAuditing/g.test(this.$route.path)">待审核</span>
						<span class="hongse" v-if="isOnline==0 || /projectUnderLineTask/g.test(this.$route.path)">未通过</span>
					</div>
					<div class="bmStatus  bmStatusExternal" v-if="/examineModification|projectExternalAudit/g.test(this.$route.path)">
						<span class="gray">未签发</span>
						<span class="heise">内部签发</span>
						<span class="lvse" v-if="/examineModification/g.test(this.$route.path)">外部签发送审</span>
						<span class="hongse" v-if="/examineModification/g.test(this.$route.path)">未通过</span>
						<span class="huangse" v-if="/projectExternalAudit/g.test(this.$route.path)">待审核</span>
						<span class="lvse" v-if="/projectExternalAudit/g.test(this.$route.path)">已通过</span>
						<span class="hongse" v-if="/projectExternalAudit/g.test(this.$route.path)">已拒绝</span>
						<span class="zise">外部签发通过</span>
					</div>
				</div>
			</div>
			<a v-if="isShowTree" href="javascript:;" class="nav_btn fl" :class="navFlag ? 'nav_open_btn' : 'nav_close_btn'" @click="showNav"></a>
		</div>
    <!-- 主体内容 -->
    <div class="fullPageContent-content">
      <div class="is-vertical"></div>
      <!--<h3 class="fs13 projectName">{{dataSources}}</h3>-->
      <div class="tablesList">
				<!-- 资产基础法 -->
				<asset-based :customDisplay="customDisplay"></asset-based>
				<!-- 市场法 -->
				<!-- <asset-based v-if='dataSources=="市场法"' :customDisplay="customDisplay"></asset-based> -->
				<!-- 收益法 -->
				<!-- <asset-based v-if='dataSources=="收益法"' :customDisplay="customDisplay"></asset-based> -->
      </div>
    </div>
  </div>
</template>
<script>
import assetBased from "@/page/fullPageModule/assetBased";
import zlpgTreeNode from "@/page/fullPageModule/fullPageTreeNode";
export default {
  data(){
    return {
      commonData: window.commonData,
			projectInfo : JSON.parse(this.$getCookie("projectInfo")),
			customDisplay: {
        investorId: this.$route.query.investorId,
        projectId: this.$store.state.projectId,
        disabled: true, //是否可编辑   true不能编辑  false能编辑   默认可编辑
        disoperation: true, //是否可操作   true不能操作  false能操作   默认可操作
        checkedBG: false, //表格有选中色块   true有选中色块   false无选中色块   默认无选中色块
        tableHeight: window.screen.availHeight - 110, //表格高度
        selectName: this.$route.query.tabName || "资产负债表" //选中table页
			},
			dataSources : '',
			// 左侧导航
			navPosition: "-350px",
			leftWidth: "25px",
			navFlag: true,
			getCheckKeyArr: [],
			contentLeft: "0",
			projectNavTree: [],
			getCheckedObjArr: [],
			showAudit: false,
			isShowAssignee: false,
			treeText : '',
      isShowTree: true
    }
  },
	components : { assetBased,zlpgTreeNode },
  created() {
		if(this.$route.query.getLeftTree != '') {
      this.isShowTree = true;
      this.getLeftTree();
    } else {
      this.isShowTree = false;
		  return;
    }
    switch(this.$route.query.type){
      case '1':
				return this.dataSources = '项目信息';
        break;
      case '2':
        return this.dataSources = '资产占有方信息';
        break;
      case '3':
        return this.dataSources = '资产基础法';
				break;
			case '4':
        return this.dataSources = '市场法';
        break;
      case '5':
        return this.dataSources = '收益法';
        break;
    }
	},
	mounted(){
		let _this = this;
		_this.$store.state.leftMenuClick = function(node) {
			_this.leftMenuClick(node);
		};
	},
	methods:{
		// 左侧导航的显隐
		showNav() {
			if(this.navPosition == "0") {
				this.navPosition = "-350px";
				this.leftWidth = "25px";
				this.contentLeft = "0";
				this.navFlag = true;
				setTimeout(() => {
					this.$store.state.hierarchy = true;
				}, 400);
			} else {
				this.navPosition = "0";
				this.leftWidth = "350px";
				this.contentLeft = "249px";
				this.navFlag = false;
				this.$store.state.hierarchy = false;
			}
		},
		// 点击左侧树刷新右侧窗口
		leftMenuClick(node) {
			this.$store.state.investorId = node.id;
			let nodeList = document.querySelectorAll(".navTree .el-tree-node__label");
			for(let i = 0; i < nodeList.length; i++) {
				if(node.name == nodeList[i].innerHTML) {
					nodeList[i].classList.add("tree-actived");
					nodeList[i].parentNode.classList.add("tree_node_actived")
				} else {
					nodeList[i].classList.remove("tree-actived");
					nodeList[i].parentNode.classList.remove("tree_node_actived")
				}
			}
		},
		//获取左侧树
		getLeftTree() {
			var _this = this,
				postUrl = "/api/investors/",
				dataObj = {
					projectId: _this.$store.state.projectId,
					showLoading: false,
				}
			if(this.$route.query.getLeftTree == 'shenhe') {
				postUrl += "getExamineInvestorTree"; //审核
			} else if(this.$route.query.getLeftTree == 'waishen') {
				postUrl = "/api/changeInvestors/getChangeInvestorTree" //外审修改
				dataObj['onlineOffline'] = /externalOnLineTask/g.test(_this.$route.path) ? 1 : 0;
				dataObj['showLoading'] = true;
			} else if(this.$route.query.getLeftTree == 'waishenshenqing') {
				postUrl = "/api/changeInvestors/getChangeExamineInvestorTree" //线上外审修改申请
			} else {
				postUrl += "getInvestorTree"; //作业
			}
			_this.$http.post(postUrl, dataObj).then(function(res) {
				_this.contentShow = true;
				_this.treeArr = [];
				_this.projectNavTree = _this.dataLoop(res.data.data, 1);
				_this.$nextTick(function() {
					let labelList = document.querySelectorAll(".navTree .el-tree-node__label");
					for(let i=0; i<labelList.length; i++){
						if(labelList[i].innerHTML == this.treeText){
							labelList[i].classList.add("tree-actived");
							labelList[i].parentNode.classList.add("tree_node_actived")
						}
					}
				})
			})
			.catch(function(error) {
				_this.$messageError(error);
			});
		},
		// 循环数据，增加节点层级
		dataLoop(Arr, level) {
			for(let i in Arr) {
				this.$set(Arr[i], 'level', level);
				this.$set(Arr[i], 'checked', '');
				this.$set(Arr[i], 'disabled', true);
				if(Arr[i].id == this.$route.query.investorId){
					this.treeText = Arr[i].name;
				}
				this.treeArr.push(Arr[i]);
				this.dataLoop(Arr[i].children, level + 1);
			}
			return Arr;
		},
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .full_page {
		width: 100%;
		position: relative;
		background: #f6f6f6;
    box-sizing: border-box;
    height:100%;
    .projectName {
      margin-right: 20px;
      padding-left: 21px;
      position: relative;
      font-weight: bold;
      line-height:35px;
      &:before {
        position: absolute;
        content: "";
        width: 6px;
        height: 6px;
        background: #f09237;
        display: block;
        top: 14px;
        left: 10px;
        border-radius: 50%;
      }
    }
		.full_page_title {
			height: 35px;
			line-height: 35px;
			padding: 0 20px;
			box-sizing: border-box;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 80;
      transition: all 0.5s ease;
      .projectName{max-width: 640px;}
			.project-nature {
				margin-right: 10px;
				overflow: hidden;
				span {
					height: 25px;
					padding: 0 10px;
					line-height: 23px;
					text-align: center;
					color: #98c268;
					background: #f1f8e8;
					border: 1px solid #c8deaf;
					border-radius: 2px;
					float: left;
					margin: 5px 10px 5px 0;
					font-size: 12px;
					box-sizing: border-box;
				}
				 :nth-child(2) {
					color: #f09237;
					background: #fff2e5;
					border: 1px solid #ffc68f;
				}
				 :nth-child(3) {
					color: #7c9fee;
					background: #e9f0ff;
					border: 1px solid #bbd0ff;
				}
				 :nth-child(4) {
					color: #50adee;
					background: #e6f5ff;
					border: 1px solid #9bd6ff;
				}
			}
    }
		.full_page_left {
			position: absolute;
			left: 0;
			top: 0px;
			bottom: 10px;
			box-sizing: border-box;
			width: auto;
			z-index: 1001;
			transition: all 0.5s ease;
			.projectNavTree {
				overflow: hidden;
				transition: all 0.5s ease;
				box-sizing: border-box;
				border: 1px solid #ececec;
				border-top: none;
				height: 100%;
				position: absolute;
				background: #fff;
				// padding-bottom: 110px;
				width: 350px;
				.navTree {
					padding: 10px 5px;
					position: relative;
					bottom: 110px;
					top: 0;
					height: 100%;
					box-sizing: border-box;
					/deep/ .el-scrollbar{ height:100%;}
					/deep/ .el-scrollbar__wrap{overflow-x:hidden;}
				}
				.nav_bottom {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					max-height: 110px;
					overflow: hidden;
					.bmStatusExternal {
						span {
							min-width: 72px;
							text-align: left;
						}
					}
					.bmStatus {
						padding: 5px 10px;
						text-align: center;
						border-bottom: 1px solid #ececec;
						display: flex;
						align-content: flex-start;
						flex-wrap: wrap;
						span {
							font-size: 12px;
							color: #636363;
							padding-left: 15px;
							position: relative;
							margin: 0 12px;
							height: 20px;
							line-height: 20px;
							display: inline-block;
							&:before {
								position: absolute;
								content: "";
								width: 10px;
								height: 10px;
								display: block;
								left: 0;
								top: 5px;
								border-radius: 2px;
							}
						}
						.gray:before {
							background-color: #D3D3D3;
						}
						.heise:before {
							background-color: #29292b;
						}
						.lvse:before {
							background-color: #21cc64;
						}
						.zise:before {
							background-color: #7c9fee;
						}
						.huangse:before {
							background-color: #f5a623;
						}
						.hongse:before {
							background-color: #ff7182;
						}
					}
					.nav_bottom_btn {
						text-align: center;
						padding: 17px 0;
						.externalBtn {
							min-width: 100px;
						}
					}
					.smallPadding {
						padding: 7px 0;
					}
				}
			}
			.nav_btn {
				width: 25px;
				position: absolute;
				height: 47px;
				box-sizing: border-box;
				right: 0;
				top: 0;
				background-repeat: no-repeat;
				background-position: center;
				top: 50%;
				margin-top: -23px;
				z-index: 10;
			}
			.nav_btn:hover {
				opacity: 0.7;
			}
			.nav_open_btn {
				background-image: url(../../assets/common/open_btn.png);
			}
			.nav_close_btn {
				background-image: url(../../assets/common/close_btn.png);
			}
		}
    .fullPageContent-content {
			position: absolute;
			box-sizing: border-box;
			bottom: 10px;
			top: 4px;
			left: 10px;
			right: 10px;
			overflow: hidden;
      transition: all 0.5s ease;
      background-color:#fff;
      box-sizing: border-box;
      border:1px solid #ECECEC;
      padding:0 10px 10px;
      .tablesList{ position: absolute; bottom:10px; left:10px; right:10px; top:35px;}
    }
  }
</style>
