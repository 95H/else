<template>
	<div class="zlpg-home-all-cont">
		<div class="zlpg-home-all-cont-content fl">
			<div v-if="type == 0 || type == 1" class="zlpg-home-all-list marginTop10">
				<div class="zlpg-home-all-list-head"><i class="iconfont icon-xiangmutongji"></i>
					<span class="fw600">项目统计</span>
				</div>
				<div class="zlpg-home-all-list-con">
					<div class="zlpg-home-all-list-content" v-for="(item,ind) in projectStatistics" :key='ind' @click="setStatus(item)">
						<div class="zlpg-home-all-list-icon"><img :src="item.imgUrl" alt="" /></div>
						<div class="zlpg-home-all-list-right">
							<div class="fs16 fw600">{{ projectStatisticsData[item.countName] }}</div>
							<div class="fs13">{{ item.name }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="zlpg-home-all-list marginTop10">
				<div class="zlpg-home-all-list-head">
					<i class="iconfont icon-xiangmuliebiao"></i>
					<span class="fw600">项目列表</span>
					<div class="fr">
						<div class="el-input el-input--mini el-input--suffix projec-search-input fl">
							<search-inp :searchObj="searchObj" @selectVal="selectValFun"><i class="iconfont icon-sousuo" @click="search"></i></search-inp>
							<!-- <el-input placeholder="请输入项目名称关键字" v-model="projectName" @change="search">
								<i slot="suffix" class="iconfont icon-sousuo" @click="search"></i>
							</el-input> -->
						</div>
						<span class="border fl"></span>
						<span class="fl"><router-link to="/zlpg/project"><i class="iconfont icon-gengduo_xiangqing"></i></router-link></span>
					</div>
				</div>
				<div class="zlpg-list-con">
					<div class="noData" v-if='!projectStatusList.length'>暂无数据</div>
					<div class="zlpg-list-big" v-else v-for="(item,ind) in projectStatusList" :key='ind' @click="setProjectId(item)">
						<div class="zlpg-list-header">
							<span class="project-title textOverflow1" :title="item.projectName">{{ item.projectName }}</span>
							<div class="fr project-nature">
								<span>{{ commonData.projectNatureId[item.projectNatureId]?commonData.projectNatureId[item.projectNatureId].slice(0,commonData.projectNatureId[item.projectNatureId].length-2):'' }}</span>
								<span>{{ commonData.projectLevelId[item.projectLevelId] }}级</span>
								<span>{{ commonData.assessmentTarget[item.assessmentTarget]?commonData.assessmentTarget[item.assessmentTarget].slice(0,commonData.assessmentTarget[item.assessmentTarget].length-2):'' }}</span>
								<span>{{ item.isListedCompany==1?"上市":"非上市" }}</span>
							</div>
						</div>
						<div class="zlpg-list-content">
							<ul class="zlpg-list-content-main width200">
								<li class="textOverflow1" :title="item.projectNumber" :class="{gray:item.projectNumber===''}"><span class="circular"></span>{{ item.projectNumber?item.projectNumber:"未分配项目编号" }}</li>
								<li class="textOverflow1" :title="item.projectOwner" :class="{gray:item.projectOwner===''}"><span class="circular"></span>{{ item.projectOwner?item.projectOwner:"未分配承作机构" }}</li>
								<li class="textOverflow1" :title="assessmentMethod(item.assessmentMethodId)" :class="{gray:assessmentMethod(item.assessmentMethodId)===''}"><span class="circular"></span>{{ assessmentMethod(item.assessmentMethodId)?assessmentMethod(item.assessmentMethodId):"未选择评估方法" }}</li>
							</ul>
							<ul class="zlpg-list-content-main width110 paddingLeft15">
								<li class="textOverflow1" :title="commonData.assessmentObjectiveId[item.assessmentObjectiveId]" :class="{gray:!commonData.assessmentObjectiveId[item.assessmentObjectiveId]}">{{ commonData.assessmentObjectiveId[item.assessmentObjectiveId]?commonData.assessmentObjectiveId[item.assessmentObjectiveId]:"未填写评估目的" }}</li>
								<li class="textOverflow1" :title="commonData.billEconomicNatureId[item.billEconomicNatureId]" :class="{gray:!commonData.billEconomicNatureId[item.billEconomicNatureId]}">{{ commonData.billEconomicNatureId[item.billEconomicNatureId]?commonData.billEconomicNatureId[item.billEconomicNatureId]:"未填写经济性质" }}</li>
								<li class="textOverflow1" :title="commonData.assetReportTypeId[item.assetReportTypeId]" :class="{gray:!commonData.assetReportTypeId[item.assetReportTypeId]}">{{ commonData.assetReportTypeId[item.assetReportTypeId]?commonData.assetReportTypeId[item.assetReportTypeId]:"未填写报告类型" }}</li>
							</ul>
							<ul class="zlpg-list-content-main width120 paddingLeft15 not-right-border">
								<li class="textOverflow1" :title="item.leaderName">负责人：{{ item.leaderName }}</li>
								<li class="textOverflow1" :title="milstoneStatus(item.milstoneStatus)">状态：{{ milstoneStatus(item.milstoneStatus) }}</li>
								<li class="textOverflow1" :title="item.projectExpenseExpect+'万元' || '未填写合同金额'" :class="{gray:item.projectExpenseExpect===''}">合同金额：{{ item.projectExpenseExpect+'万元' || "未填写合同金额" }}</li>
							</ul>
							<div class="fl width230">
								<ul class="line-time">
									<!--,line-time-active:val.status == 'underway'-->
									<li :class="val.status" v-for="(val,key) in item.projectStatus" :key="key">
										<span class="fs12">{{val.name}}</span>
									</li>
								</ul>
								<div class="fs13 fr">创建时间：{{ item.createTime.slice(0,10) }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="zlpg-home-all-cont-echarts fr">
			<div class="zlpg-home-all-list marginTop10 zlpg-home-moban">
				<div class="zlpg-home-all-list-head"><i class="iconfont icon-moban"></i><span class="fw600">模板</span><button class="btnDown el-button--primary"><a href="/api/file/downloadFile?docsName=评估方法模板.zip&alyPath=&flag=1">打包下载</a></button></div>
				<div class="zlpg-home-all-list-con zlpg-home-moban-con">
					<el-table class="tabHeight" :data="tableData" border tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="name" width='120' label="文件" show-overflow-tooltip>
							<template slot-scope='scope'>
								<i class="iconfont icon-fujianwendang"></i><span :title="scope.row.name">{{scope.row.name}}</span>
							</template>
						</el-table-column>
						<el-table-column class="tabletime" prop="date" label="更新时间" width="80">
						</el-table-column>
						<el-table-column label="下载" width="37">
							<template slot-scope='scope'>
								<a :href="scope.row.src" class="iconfont icon-xiazai1"></a>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="zlpg-home-all-list marginTop10">
				<div class="zlpg-home-all-list-head"><i class="iconfont  icon-moguyun"></i><span class="fw600">摩估云</span></div>
				<div class="zlpg-home-all-list-con QRcode" style="height:130px">
					<div class="code-l">
						<div class="iosCode"></div>
						<p>苹果APP下载</p>
					</div>
					<div class="code-r">
						<div class="azCode"></div>
						<p>安卓APP下载</p>
					</div>
				</div>
			</div>
			<div class="zlpg-home-all-list marginTop10">
				<div class="zlpg-home-all-list-head"><i class="iconfont icon-pingguduixiangtongji"></i><span class="fw600">评估对象统计</span></div>
				<div class="zlpg-home-all-list-con">
					<div id="evaluationEchart" class="echarts"></div>
				</div>
			</div>
			<div class="zlpg-home-all-list marginTop10">
				<div class="zlpg-home-all-list-head"><i class="iconfont icon-shejishangshigongsitongji"></i><span class="fw600">涉及上市公司统计</span></div>
				<div class="zlpg-home-all-list-con">
					<div id="companyEchart" class="echarts height230"></div>
				</div>
			</div>
			<div class="zlpg-home-all-list marginTop10">
				<div class="zlpg-home-all-list-head"><i class="iconfont icon-xiangmuleixingtongji"></i><span class="fw600">项目类型统计</span></div>
				<div class="zlpg-home-all-list-con">
					<div id="projectTypeEchart" class="echarts height330"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import zltable from "@/components/zltable.vue";
	import searchInp from "@/components/searchInp.vue";
	export default {
		name: 'home-content',
		components: {
			zltable,
			searchInp
		},
		data() {
			return {
        projectNatureAll: '',
        projectLevelAll: '',
				searchObj:{
					holder:"请输入项目名称关键字",
					key:"projectName",
					url:"/api/projects/getProjectListByStatus",
					formData:{
						projectStatus:"all",
						findType:0,
					},
					input:''
				},
				optionData: {},
				type: 0,
				projectStatistics: [{
						name: '立项中',
						countName: 'setUpCount',
						imgUrl: require('./img/home1.png'),
						routerLink: '/zlpg/project',
						status: 'setup'
					},
					{
						name: '作业中',
						countName: 'ingCount',
						imgUrl: require('./img/home2.png'),
						routerLink: '/zlpg/project',
						status: 'implement'
					},
					{
						name: '结项中',
						countName: 'postCount',
						imgUrl: require('./img/home3.png'),
						routerLink: '/zlpg/project',
						status: 'post'
					},
					{
						name: '已完成',
						countName: 'endCount',
						imgUrl: require('./img/home4.png'),
						routerLink: '/zlpg/project',
						status: 'end'
					},
					//              	{name:'已超期',countName:'beyondCount',imgUrl:require('./img/home5.png'),routerLink:'/zlpg/project'},
					//              	{name:'异常完结',countName:'terminationCount',imgUrl:require('./img/home6.png'),routerLink:'/zlpg/project'},
					//              	{name:'现存风险',countName:'riskCount',imgUrl:require('./img/home7.png'),routerLink:'/zlpg/risk'},
					//              	{name:'现存问题',countName:'problemCount',imgUrl:require('./img/home8.png'),routerLink:'/zlpg/risk'},
				],
				tableData: [{
						date: '2018-11-29',
						name: '资产基础法测算表模板',
						src: '/api/file/downloadFile?docsName=资产基础法测算表模板v1.13.xlsx&alyPath=&flag=1'
					},
					{
						date: '2018-11-29',
						name: '收益法计算表-模板-年末折现模型（中期）',
						src: '/api/file/downloadFile?docsName=收益法计算表-模板-年末折现模型（中期）.xls&alyPath=&flag=1'
					},
					{
						date: '2018-11-29',
						name: '收益法计算表-模版-年末折现模型（全年）',
						src: '/api/file/downloadFile?docsName=收益法计算表-模版-年末折现模型（全年）.xls&alyPath=&flag=1'
					}
				],
				projectStatisticsData: '',
				//projectStatusList:'',
				projectStatusList: [],
				commonData: window.commonData,
				projectName: ''
			};
		},
    created () {
      let projectNatureArr = []
      let projectLevelArr = []
      commonOriginalData.projectNatureId.forEach(function(val, key) {
        projectNatureArr.push(val.id)
      })
      this.projectNatureAll = projectNatureArr.join(',')
      commonOriginalData.projectLevelId.forEach(function(val, key) {
				projectLevelArr.push(val.id)
      })
      this.projectLevelAll = projectLevelArr.join(',')
    },
    mounted(){
		  // 模糊搜索点击后进入详情页面
      let _this = this;
	// 	this.$store.state.lookInto = (val)=>{
    //     new Promise((resolve, reject)=>{
    //       _this.selectValFun(val);
    //       _this.projectList(resolve);
    //     }).then(()=>{
    //       this.projectStatusList[0] && _this.setProjectId(this.projectStatusList[0]);
    //     }).catch((err)=>{
	// 	      _this.$messageError(err)
    //     })
    //   }
      this.$store.state.searchInfo = ()=>{
        _this.projectList();
      }
      let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
				this.projectName = searchCondition.projectName;
				this.searchObj.input = searchCondition.projectName;
			}
    },

		methods: {
			selectValFun(val){
				this.projectName=val;
			},
			init(index,flag) {
				if(!this.$store.state.rememberSearchCondition && !flag){
					this.projectName = '';
					this.searchObj.input = '';
				}
				if(index !== '') {
					this.type = index;
					this.searchObj.formData.findType = this.type;
				}
				if(index == 0 || index == 1) {
					this.projectStatus();
				}
				this.projectList();
				this.draw('evaluationEchart', '/api/projects/getProjectAssessmentTargetCount', {
					data: ['整体评估', '部分评估', '单项评估'],
					name: '评估对象',
					color: ['#98C268', '#F7B543', '#7C9FEE']
				});
				this.draw('companyEchart', '/api/projects/getIslistedCompanyCount', {
					data: ['涉及上市公司', '未涉及上市公司'],
					name: '上市公司',
					color: ['#98C268', '#7C9FEE']
				});
				this.draw('projectTypeEchart', '/api/projects/getProjectNatureCount', {
					data: ['通用项目', '涉军项目', '房地产项目', '矿权项目', '土地项目', '研究课题项目'],
					name: '项目类型',
					color: ['#98C268', '#6883C2', '#7C9FEE', '#EBA2A2', '#C3A2EB', '#F7B543']
				});
			},
			search() {
				this.projectList()
			},
			// 项目统计
			projectStatus() {
				let _this = this;
				this.$http.post('/api/projects/projectStatusCount', {
					findType: this.type,
					groupId: this.$store.state.groupId,
          year: this.$store.state.year,
          projectNatureIds:this.projectNatureAll,
          projectLevelIds:this.projectLevelAll
				}).then(response => {
					_this.projectStatisticsData = response.data;
				}).catch(function(error) {
					_this.$messageError(error);
				})
			},
			setStatus(item) {
				this.$store.state.status = item.status;
				this.$router.push({
					path: '/zlpg/project'
				})
			},
			// 项目列表
			projectList(resolve) {
				let _this = this;
				this.projectStatusList = [];
				this.searchConditionData = {
					projectName : this.projectName,
					dataSearchPath: this.$route.path,
					type: this.type
				}
				this.$setCookie('searchCondition', JSON.stringify(this.searchConditionData) , 24 * 60 * 60);
				this.$http.post('/api/projects/getProjectListByStatus', {
					findType: this.$store.state.groupId ? '4' : this.type,
					groupId: this.$store.state.groupId,
					year: this.$store.state.year,
					projectName: this.projectName,
					projectStatus: 'all',
					homeAllFlag:1
				}).then(response => {
					_this.projectStatusList = response.data;
          resolve && resolve();
				}).catch(function(error) {
					_this.$messageError(error);
				})
			},
			setProjectId(item) {
				this.$store.state.projectId = item.id;
				this.$setCookie('projectId', item.id, 24 * 60 * 60);
				this.$router.push({
					path: '/zlpg/project/projectCont'
				})
			},
			draw(id, url, obj) {
				let _this = this;
				this.$http.post(url, {
					findType: this.type,
					groupId: this.$store.state.groupId,
          year: this.$store.state.year,
          projectNatureIds:this.projectNatureAll,
          projectLevelIds:this.projectLevelAll
				}).then(response => {
					obj.seriesName = response.data.list;
					//初始化echarts实例
					let myChart = this.$echarts.init(document.getElementById(id));
					//使用制定的配置项和数据显示图表
					myChart.setOption(this.option(obj));
				}).catch(function(error) {
					_this.$messageError(error);
				})
			},
			option(data) {
				return {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						y: '180px',
						data: data.data,
						formatter: function(name) {
							let str = name;
							let seriesValue;
							for(let item in data.seriesName) {
								if(data.seriesName[item].name == name) {
									seriesValue = data.seriesName[item].value
								}
							}
							let len = 30 - name.length * 3 - seriesValue.length;
							for(let i = 0; i < len; i++) {
								str += ' ';
							}
							str += seriesValue + "个";
							return str;
						},
						itemWidth: 10, // 设置宽度
						itemHeight: 10, // 设置高度
						itemGap: 13 // 设置间距
					},
					series: [{
						name: data.name,
						type: 'pie',
						radius: ['60%', '80%'],
						center: ['50%', '90px'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '14',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data.seriesName,
						color: data.color
					}]
				}
			}
		},
		computed: {
			assessmentMethod() {
				return function(val) {
					if(val){
						let valArr = val.split(',');
						let strArr = [];
						for(let i in valArr) {
							strArr.push(commonData.assessmentMethodId[valArr[i]]);
						}
						return strArr.join();
					}else{
						return '';
					}

				}

			},
			milstoneStatus() {
				return function(val) {
					let valArr = ['立项中', '作业中', '已完成', '已终止', '结项中', '审核中'];
					return valArr[val];
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.zlpg-home-all-cont {
		.zlpg-home-all-cont-content {
			.zlpg-home-all-list {
				width: 758px;
				background: #fff;
				border-radius: 2px;
				border: 1px solid #ECECEC;
				.zlpg-home-all-list-head {
					height: 36px;
					line-height: 36px;
					font-size: 14px;
					background: #fafafa;
					border-bottom: 1px solid #ececec;
					.iconfont {
						margin: 0 10px 0 17px;
					}
					.icon-xiangmutongji {
						color: #9BD6FF;
						margin: 0 10px 0 17px;
					}
					.icon-xiangmuliebiao {
						color: #7C9FEE;
						margin: 0 10px 0 17px;
					}
					.projec-search-input {
						width: 200px;
						margin-right: 10px;

					}
					/deep/ .el-input--suffix .el-input__inner{
						padding: 0 30px 0 15px !important;
					}
					.icon-sousuo {
						position: absolute;
						right: 10px;
						top: 1px;
						color: #C0C0C0;
						margin: 0;
						cursor: pointer;
					}
					.border {
						border-left: 1px solid #ECECEC;
						border-right: 1px solid #FFF;
						height: 36px;
					}
					.icon-gengduo_xiangqing {
						color: #C0C0C0;
						line-height: 36px;
						margin: 0 10px;
					}
					.icon-gengduo_xiangqing:hover {
						color: #5FA9EC;
					}
				}
				.zlpg-home-all-list-con {
					padding: 7px;
					overflow: hidden;
					.zlpg-home-all-list-content {
						width: 170px;
						height: 60px;
						border: 1px solid #ECECEC;
						margin: 7px;
						float: left;
						cursor: pointer;
						.zlpg-home-all-list-icon {
							width: 32px;
							height: 32px;
							border-radius: 4px;
							margin: 14px 12px 14px 14px;
							float: left;
						}
						.zlpg-home-all-list-right {
							margin: 10px;
							div {
								line-height: 20px;
								min-height: 20px;
							}
						}
					}
					.zlpg-home-all-list-content:hover {
						border: 1px solid #B9E1FC;
					}
				}
			}
		}
		.zlpg-home-all-cont-echarts {
			.zlpg-home-all-list {
				width: 258px;
				background: #fff;
				border-radius: 2px;
				border: 1px solid #ECECEC;
				.zlpg-home-all-list-head {
					height: 36px;
					line-height: 36px;
					font-size: 14px;
					background: #fafafa;
					border-bottom: 1px solid #ececec;
					.iconfont {
						margin: 0 10px 0 17px;
					}
					.icon-pingguduixiangtongji {
						color: #F09237;
					}
					.icon-shejishangshigongsitongji {
						color: #C3A2EB;
					}
					.icon-xiangmuleixingtongji {
						color: #57BFB2;
					}
				}
				.echarts {
					width: 180px;
					height: 260px;
					margin: 0 auto 10px;
				}
				.height230 {
					height: 230px;
				}
				.height330 {
					height: 330px;
				}
			}
		}
	}

	.zlpg-list-con {
		padding-top: 14px;
		.zlpg-list-big {
			width: 718px;
			height: 140px;
			border-radius: 2px;
			border: 1px solid #E5E5E5;
			margin: 0 20px 12px;
			cursor: pointer;
			.zlpg-list-header {
				height: 40px;
				background: #F6FAFF;
				border-bottom: 1px solid #E5E5E5;
				.project-title {
					width: 420px;
					display: inline-block;
					line-height: 40px;
					font-size: 16px;
					color: #262628;
					margin-left: 20px;
				}
				.project-nature {
					max-width: 260px;
					margin-right: 10px;
					span {
						height: 24px;
						padding: 0 10px;
						line-height: 24px;
						text-align: center;
						color: #98C268;
						background: #F1F8E8;
						border: 1px solid #C8DEAF;
						border-radius: 2px;
						float: left;
						margin: 8px 5px;
						font-size: 12px;
					}
					:nth-child(2) {
						color: #F09237;
						background: #FFF2E5;
						border: 1px solid #FFC68F;
					}
					:nth-child(3) {
						color: #7C9FEE;
						background: #E9F0FF;
						border: 1px solid #BBD0FF;
					}
					:nth-child(4) {
						color: #50ADEE;
						background: #E6F5FF;
						border: 1px solid #9BD6FF;
					}
				}
			}
			.zlpg-list-content {
				padding: 10px;
				.zlpg-list-content-main {
					float: left;
					border-right: 1px solid #ECECEC;
					li {
						height: 26px;
						line-height: 26px;
						font-size: 13px;
						.circular {
							width: 6px;
							height: 6px;
							float: left;
							margin: 10px;
							background: #F09237;
							border-radius: 100%;
						}
					}
					li:nth-child(2) .circular {
						background: #57BFB2;
					}
					li:nth-child(3) .circular {
						background: #7C9FEE;
					}
				}
				.width110 {
					width: 110px;
				}
				.width120 {
					width: 120px;
				}
				.width200 {
					width: 200px;
				}
				.width230 {
					width: 230px;
				}
				.line-time {
					border-top: 1px dashed #979797;
					margin: 38px 0 20px;
					li {
						width: 14px;
						height: 14px;
						float: left;
						margin-left: 36px;
						margin-top: -7px;
						border-radius: 100%;
						background: url(img/unfinished.png) no-repeat;
						background-size: 14px 14px;
						position: relative;
						span {
							width: 40px;
							color: #B9B9B9;
							line-height: 17px;
							text-align: center;
							position: absolute;
							top: -30px;
							left: -13px;
						}
					}
					.accomplish {
						background: url(img/complete.png) no-repeat;
						span {
							color: #98C268;
						}
					}
					.underway {
						background: url(img/doing.png) no-repeat;
						span {
							color: #83B3FF;
						}
					}
				}
			}
		}
	}

	.zlpg-home-moban {
		.zlpg-home-all-list-head {
			display: flex;
			align-items: center;
			border-bottom: 0;
		}
	}

	.icon-moban {
		color: #57BFB2;
	}

	.icon-moguyun {
		color: #C3A2EB;
	}

	.zlpg-list-big:hover {
		border: 1px solid #B9E1FC;
	}

	.QRcode {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.code-l {
			flex: 1;
			-ms-flex:1 0 auto;
			padding-left: 28px;
			.iosCode {
				background: url(img/ios.png) no-repeat;
				height: 95px;
			}
		}
		.code-r {
			flex: 1;
			-ms-flex:1 0 auto;
			.azCode {
				background: url(img/az.jpg) no-repeat;
				height: 95px;
        width: 95px;
        background-size: 100%;
			}
		}
		p {
			color: #636363;
			font-size: 13px;
			text-indent: 7px;
		}
	}

	.icon-xiazai1:hover {
		color: #5FA9EC;
	}

	.icon-xiazai1 {
		color: #C0C0C0;
	}

	.tabHeight {
		td {
			height: 25px;
		}
	}

	/deep/ .el-table .cell,
	.el-table th div {
		padding-right: 0;
	}

	/deep/ .el-table .cell,
	.el-table th div {
		padding-left: 0;
	}

	/deep/.el-table .cell,
	.el-table th div,
	.el-table--border th:first-child .cell,
	.el-table .el-table--border td:first-child .cell {
		text-align: center;
		padding-left: 0!important;
	}

	/deep/.el-table--border td:first-child .cell {
		text-align: left;
		padding-left: 5px!important;
	}

	.btnDown {
		width: 70px;
		height: 25px;
		background: rgba(58, 128, 236, 1);
		border-radius: 2px;
		border: 0;
		font-weight: 400;
		margin-left: 106px;
		a {
			color: #FFFFFF;
			font-size: 13px;
			text-decoration: none;
		}
	}

	.icon-fujianwendang {
		color: #87C6F2;
	}

	.zlpg-home-moban-con {
		padding: 14px 10px;
	}

	/deep/.zlpg-home-moban-con {
		.el-table__body-wrapper {
			.el-table__body {
				.cell {
					color: #6A6A6A;
				}
			}
		}
	}
</style>
