<template>
	<div>
		<div v-if="isGenerate==0">
				<div class="createFile_box" v-loading="loading"
             :element-loading-text='loadTxt'
             element-loading-spinner="loading-upload-icon">
					<el-scrollbar class="el-scrollbar">
						<div class="createFile">
							<img src="../../assets/common/fileIcon.png" width="60" height="63" />
							<h2 class="fs20 green padding20">{{reportName}}</h2>
							<a class="create_btn" @click="createFile" v-if="$store.state.readonly">立即生成</a>
						</div>
						<div class="createFileStep marginTop15 padding15">
							<h3 class="fs13"><i class="iconfont icon-xunhuan orange"></i>
								{{thisTab==7 ? '为了保证评估报告准确生成，避免评估报告生成失败，请遵循以下流程进行报告生成：' : '为了保证评估说明准确生成，避免评估说明生成失败，请遵循以下流程进行说明生成：'}}
							</h3>
							<div class="createFileStep_img">
								<div class="step_item">
									<h3 class="fs16 green">导入明细表</h3>
									<cite class="bg_green marginTop10">1</cite>
									<span class="bg_green"><em class="bg_green"></em><i class="iconfont icon-sousuowenjian"></i></span>
								</div>
								<div class="step_item">
									<h3 class="fs16 blue">数据补充调整</h3>
									<cite class="bg_blue marginTop10">2</cite>
									<span class="bg_blue"><em class="bg_blue"></em><i class="iconfont icon-weibiaoti11"></i></span>
								</div>
								<div class="step_item">
									<h3 class="fs16 orange">{{thisTab == 7 ? '生成评估报告' : "生成评估说明"}}</h3>
									<cite class="bg_orange marginTop10">3</cite>
									<span class="bg_orange"><em class="bg_orange"></em><i class="el-icon-document"></i></span>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
		</div>
		<div v-if="isGenerate == 1">
			<create-file ref= 'creatFile' :editorMenu="reportCatalogTree"></create-file>
		</div>
		<!-- <div class="createLoading" v-if="loadingFlag">
			<div class="creating">文件生成中...</div>
		</div> -->
	</div>
</template>

<script>
	import createFile from "@/page/fullPageModule/createFile.vue";
	export default {
		data() {
			return {
				// loadingFlag: false,
				thisTab: this.$route.params.tabId,
				reportName: "",
				isGenerate: 999,
				reportCatalogTree: [],
				editorContent: "",
				loading: false,
				loadTxt:' ',
        timer: ''
			};
		},
		components: {
			createFile
		},
		watch: {
			$route(to, form) {
				var _this = this;
				_this.thisTab = _this.$route.params.tabId;
				_this.$store.state.createFile = function() {
					_this.createFile();
				};
				// 切换路由重新执行导出文件方法
				_this.$store.state.exportFile = function() {
					_this.exportFile();
				};
				//判断是否生成过报告
				_this.postPublicFun({
					projectId: _this.$store.state.projectId,
					investorId: _this.$store.state.investorId
				});
			}
		},
		created() {
			var _this = this;
			// 切换路由重新执行导出文件方法
			_this.$store.state.exportFile = function() {
				_this.exportFile();
			};
			// 生成文件
			_this.$store.state.createFile = function() {
				_this.createFile();
			};
			_this.$store.state.postPublicFun = function() {
				_this.postPublicFun({
					projectId: _this.$store.state.projectId,
					investorId: _this.$store.state.investorId
				});
			};
		},
		mounted() {
			let _this = this;
			//判断是否生成过报告
			_this.postPublicFun({
				projectId: _this.$store.state.projectId,
				investorId: _this.$store.state.investorId
			});
		},
    beforeDestroy(){
      clearTimeout(this.timer);
      this.timer = '';
    },

		methods: {
			// 接口请求公共方法
			postPublicFun(params,callback) {
				var _this = this,
					postUrl = "";
//				params.showLoading = false;
				if(_this.$route.params.tabId == "7") {
					postUrl = "/api/reportEvalDirectory/generationReport";
				} else {
					postUrl = "/api/reportDescDirectory/generationExplain";
				}
				_this.$http
					.post(postUrl, params)
					.then(function(res) {
						// _this.loadingFlag = false;
						if(res.data.isGenerate == 0) {
							_this.reportName = res.data.investor.name;
							_this.$store.state.saveContent = null;
						} else {
							callback && callback();
							_this.$store.state.Relationsign = _this.$route.params.tabId=='7' ? res.data.reportCatalogTree[0].sign : res.data.explainCatalogTree[0].sign;
							_this.$store.state.reportId = res.data.reportId;
							if(_this.$route.params.tabId == "7") {
								_this.reportCatalogTree = _this.dataLoop(
									res.data.reportCatalogTree,
									1
								);
							} else {
								_this.reportCatalogTree = _this.dataLoop(
									res.data.explainCatalogTree,
									1
								);
							}
						}
						_this.loading = false;
						_this.isGenerate = res.data.isGenerate;
					})
					.catch(function(error) {
						// _this.loadingFlag = false;
						_this.$messageError(error);
					});
			},
			exportFile() {
				var _this = this;
				if(this.isGenerate == 0) {
					_this.$messageError("请先生成文件！");
					return;
				} else {

					if(_this.$route.params.tabId == "7") {
						//评估报告
						window.location.href =
						"/api/reportEvalDirectory/exportReport?token=" +
						this.$getCookie("token") +
						"&projectId=" +
						this.$store.state.projectId +
						"&investorId=" +
						this.$store.state.investorId
					}else{
						//评估说明
						window.location.href =
						"/api/reportDescDirectory/exportExplain?token=" +
						this.$getCookie("token") +
						"&projectId=" +
						this.$store.state.projectId +
						"&investorId=" +
						this.$store.state.investorId
					}

				}
			},
			// 循环数据，增加节点层级
			dataLoop(Arr, level) {
				if(!Arr){return []}
				for(let i = 0; i < Arr.length; i++) {
					Arr[i]["level"] = level;
					Arr[i]["checked"] = "";
					if(Arr[i].children != undefined) {
						this.dataLoop(Arr[i].children, level + 1);
					}
				}
				return Arr;
			},
			createFile() {
				let _this = this;
        let txt = '<p class = "loading-head-text">正在生成...</p>大约需要等待30秒，请勿关闭当前页面<br/><span class="loading-head-text loading-content">亲，先去喝杯水吧~</span>';
        this.timer = setTimeout(()=>{
					let oLoading = document.querySelector('.el-loading-text');
        	oLoading.innerHTML = txt;
				},100)
        this.loading = true;
				_this.postPublicFun({
					projectId: _this.$store.state.projectId,
					investorId: _this.$store.state.investorId,
					flag: "1",
          showLoading:false
				},()=>{
					_this.$store.state.getLeftTree('','',true);
				});
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.createFile_box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 10px;
		right: 10px;
		.createFile {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 45%;
			min-height: 200px;
			position: relative;
			flex-flow: column;
			border: 1px dashed #b4dcff;
			background-color: #fcfdff;
			border-radius: 3px;
			box-sizing: border-box;
			.create_btn {
				width: 120px;
				height: 30px;
				line-height: 30px;
				display: block;
				background: #3a80ec;
				text-align: center;
				color: #fff;
				font-size: 14px;
				border-radius: 2px;
				cursor: pointer;
				transition: all 0.5s ease;
				&:hover {
					opacity: 0.7;
					transition: all 0.5s ease;
				}
			}
		}
		.createFileStep {
			background-color: #fff;
			border: 1px solid #ececec;
			height: 45%;
			min-height: 200px;
			position: relative;
			border-radius: 3px;
			box-sizing: border-box;
			h3 {
				font-weight: bold;
				line-height: 25px;
				i {
					font-weight: normal;
				}
			}
			.createFileStep_img {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				height: 90%;
				.step_item {
					width: 250px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-flow: column;
					overflow: hidden;
					cite {
						width: 100%;
						height: 30px;
						line-height: 30px;
						display: block;
						color: #fff;
						text-align: center;
						border-radius: 50px;
						position: relative;
						font-size: 13px;
						&:before {
							width: 30px;
							height: 30px;
							border-radius: 50px;
							background-color: #fff;
							content: "";
							position: absolute;
							left: -8px;
							top: 0;
						}
					}
					.bg_green {
						background-color: #98c268;
						border-color: #98c268;
						i {
							color: #98c268;
						}
						&:before {
							width: 0;
							height: 0;
						}
					}
					.bg_blue {
						background-color: #7c9fee;
						border-color: #7c9fee;
						i {
							color: #7c9fee;
						}
					}
					.bg_orange {
						background-color: #f19943;
						border-color: #f19943;
						i {
							color: #f19943;
						}
					}
					span {
						width: 47px;
						height: 47px;
						text-align: center;
						line-height: 47px;
						border: 1px solid;
						border-radius: 50px;
						box-sizing: border-box;
						position: relative;
						margin-top: 25px;
						em {
							position: absolute;
							width: 1px;
							height: 25px;
							display: block;
							left: 21px;
							top: -26px;
						}
						i {
							font-size: 20px;
						}
						&.bg_green,
						&.bg_blue,
						&.bg_orange {
							background-color: #fff;
						}
					}
				}
			}
		}
		.el-scrollbar {
			height: 100%;
			/deep/.el-scrollbar__view {
				height: 100%;
			}
		}
	}

	.createLoading {
		background-color: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1010;
		display: flex;
		justify-content: center;
		align-items: center;
		.creating {
			width: 130px;
			height: 130px;
			border: 10px solid #fff;
			border-radius: 50%;
			line-height: 130px;
			text-align: center;
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			position: relative;
			&:before {
				position: absolute;
				content: "";
				width: 130px;
				height: 130px;
				border: 10px solid;
				display: block;
				border-radius: 50%;
				border-color: #98c268 transparent transparent;
				left: -10px;
				top: -10px;
				animation: loading 1s linear 0s infinite;
			}
		}
	}

	@keyframes loading {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
  /deep/ .loading-upload-icon{background:url('../../../static/img/loading.gif');width: 188px;height: 148px;display:inline-block;transform: scale(.5)}
  /deep/ .el-loading-mask{z-index: 100 !important; background-color: rgba(255,255,255,1);}
  /deep/ .el-loading-spinner .el-loading-text{color: #50ADEE;margin-top:-36px;font-size: 13px}
  /deep/ .el-loading-spinner{top:30%}
  /deep/ .widget-pop-upload .layui-icon-close{font-weight: normal !important;}
  /deep/ .widget-pop-upload .layui-icon-close:hover:after{color: #409EFF;border-color: #c6e2ff;background: #ecf5ff;opacity: 1;}
  /deep/ .el-loading-spinner .el-loading-text .loading-head-text{margin-bottom:12px;color: #50ADEE;}
  /deep/ .loading-content{color: #50ADEE;line-height: 30px;}
</style>
