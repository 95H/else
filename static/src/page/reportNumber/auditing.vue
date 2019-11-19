<template>
	<div class="auditing-con">
		<div class="container">
			<div class="singleRadio-container" v-if="hackReset">
				<single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
				<single-radio :singleradiooptions="pageOptions.singleRadioTypes" @onradioclick="radioEventType"></single-radio>
        <single-checkbox :singleradiooptions="pageOptions.singleRadioNatureOptions" @onradioclick="radioNatureEvent"></single-checkbox>
        <single-checkbox :singleradiooptions="pageOptions.singleRadioLevelOptions" @onradioclick="radioLevelEvent"></single-checkbox>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="pageOptions.itemsIptOptions">
					<div slot="ipt-date">
						<div class="btn-container">
							<button class="search-btn" @click="searchEvent">搜索</button>
							<button class="reset-btn" @click="resetEvent">重置</button>
						</div>
					</div>
				</ipt>
			</div>
		</div>
		<div class="list-wrapper">
			<div class="list-head" v-if="count !==0 ">
				<span>共计 {{ count }} 个签发信息</span>
			</div>
			<div v-else class="content-nodata">
				<div class="noData">暂无数据</div>
			</div>
			<div class="content" v-if="contentOptions.length" v-for="(item, optionIndex) in contentOptions" :key="optionIndex">
				<div class="wrap" @click="bodyClick(item.projectId,item.id)">
					<div class="head">
						<h2 :title="item.projectName"><span class="head-title" v-if='item.distributionType == 1'>自动分配</span> <span class="head-titleRed" v-else>人工分配</span>{{item.projectName}}</h2>
						<div class="headLabel-container">
							<span class="head-label projectNature">{{ commonData.projectNatureId[item.projectNatureId] }}</span>
							<span class="head-label projectLevel">{{ commonData.projectLevelId[item.projectLevelId] }}级</span>
							<span class="head-label assessmentTarget">{{ commonData.assessmentTarget[item.assessmentTarget] }}</span>
							<span class="head-label projectMessage">{{ item.isListedCompany == 1 ? "上市" : "非上市" }}</span>
						</div>
					</div>
					<ul class="body">
						<li v-for="(option,index) in pageOptions.tableOptions" :key="index">
							<div class="body-container">
								<div class="basic instanceName">
									<i class="circular"></i>
									<span class="instance">{{option.personnel}}</span>
									<span class="name" v-if="item.firstAuditor && index===0 || item.secondAuditor && index===1 || item.thirdAuditor && index===2" :title="index === 0 ? item.firstAuditor: '' || index === 1 ? item.secondAuditor : '' ||index === 2 ? item.thirdAuditor : ''">{{index === 0 ? item.firstAuditor: ''}}{{index === 1 ? item.secondAuditor : ''}}{{index === 2 ? item.thirdAuditor : ''}}</span>
									<span v-else style="width:68px;color:#ABABAB">待分配</span>
								</div>
								<div class="basic times">
									<span style="width:91px;">{{option.continuedTimes}}</span>
									<div class="days-container" v-if="times.length && times[optionIndex] && times[optionIndex][index]">
										<span class="dayStyle">{{times[optionIndex][index].days ? times[optionIndex][index].days : ''}}</span>
										<span class="unit">{{times[optionIndex][index].days ? '天' : ''}}</span>
										<span class="dayStyle">{{times[optionIndex][index].hours ? times[optionIndex][index].hours : '-'}}</span>
										<span class="unit">小时</span>
									</div>
									<span v-else style="width:98px;">- 天 - 小时</span>
								</div>
								<div class="basic situation">
									<span>{{option.situation}}</span>
									<div style="display: flex;flex-direction:row;" v-if="item.projectInformation.length && item.projectInformation[index]">
										<div class="label-container">
											<p :class="'label-title '+condition.pass" :style=" !item.projectInformation[index].byInt ? {background: '#B9B9B9'}: ''">{{condition.by}}</p>
											<p class="label-content">
												<span class="label-content">{{item.projectInformation[index].byInt ? item.projectInformation[index].byInt : 0}}</span>
												<span>份</span>
											</p>
										</div>
										<div class="label-container">
											<p :class="'label-title '+condition.unpass" :style=" !item.projectInformation[index].failInt ? {background: '#B9B9B9'}: ''">{{condition.fail}}</p>
											<p class="label-content">
												<span class="label-content">{{item.projectInformation[index].failInt ? item.projectInformation[index].failInt : 0}}</span>
												<span>份</span>
											</p>
										</div>
										<div class="label-container">
											<p :class="'label-title '+condition.await" :style=" !item.projectInformation[index].pendingInt ? {background: '#B9B9B9'}: ''">{{condition.pending}}</p>
											<p class="label-content">
												<span class="label-content">{{item.projectInformation[index].pendingInt ? item.projectInformation[index].pendingInt : 0}}</span>
												<span>份</span>
											</p>
										</div>
									</div>
									<div v-else class="undistribution">待分配</div>
								</div>
								<div class="basic projectNumber">
									<span v-if="option.projectNumber">{{option.projectNumber}}</span>
									<span v-if="option.projectNumber">{{item.projectNumber}}</span>
									<div class="pensonnel-container" v-else>
										<span class="label" :class="{gray:(item.createSecondAuditor ==='' && index===1) || (item.createSThirdAuditor ==='' && index ===2)}">{{option.allotPensonnel}}</span>
										<span class="name" v-if="index === 1" :title=item.createSecondAuditor>{{item.createSecondAuditor}}</span>
										<span class="name" v-else :title=item.createSThirdAuditor>{{item.createSThirdAuditor}}</span>
										<span class="time-label" :class="{gray:(item.createSecondAuditorTime ==='' && index===1) || (item.createThirdAuditorTime ==='' && index ===2)}">{{option.allotTimes}}</span>
										<span class="fp_times textOverflow1" :title="item.createSecondAuditorTime" v-if="index === 1">{{item.createSecondAuditorTime}}</span>
										<span class="fp_times textOverflow1" :title="item.createThirdAuditorTime" v-else>{{item.createThirdAuditorTime}}</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="pagination-container" v-if="count > 10">
				<pagination :pagesize="pagesize" :totalDataNum="count" :page="page" v-on:currentPageFn="currentPage"></pagination>
			</div>
		</div>
	</div>
</template>
<script>
	var that;
	import pagination from '@/components/pagination'
  export default {
    components: {pagination},
    data() {
      return {
        pageOptions: {
          singleRadioOptions: {
            txt: '签发状态：',
            option: [
              {name: '全部', label: 'All'},
              {name: '复审人未分配', label: 'FSWF'},
              {name: '签发人未分配', label: 'QFWF'},
              {name: '均已分配', label: 'JYFP'}
            ]
          },
          singleRadioTypes: {
            txt: '签发类型：',
            option: [
              {name: '全部', label: ''},
              {name: '自动分配', label: '1'},
              {name: '人工分配', label: '2'}
            ]
          },

          singleRadioNatureOptions: {
            txt: '性质分类：',
            option: [],
            optionId: [],
            optionIdOld: []
          },

          singleRadioLevelOptions: {
            txt: '等级分类：',
            option: [],
            optionId: [],
            optionIdOld: []
          },

          itemsIptOptions: [
            {name: '项目名称：', holder: '请输入项目名称',key:'projectName',url:'/api/reportDistribution/findReportDistributionList',formData:{tabFlag:'All',distributionType:'',projectNatureIds:'',projectLevelIds:''}, input: ''},
            {name: '项目编号：', holder: '请输入项目编号', input: ''},
           /* {name: '复审分配：', holder: '请输入复审分配人', input: '',width:"166px"},
            {name: '签发人：', holder: '请输入签发人', input: '',width:"166px"},
            {name: '持续时间：', holder: '请输入超过天数', input: ''}*/
          ],

          tableOptions: [
            {
              personnel: '初审人：',
              continuedTimes: '审核持续时间：',
              situation: '初审：',
              projectNumber: '项目编号：'
            },
            {
              personnel: '复审人：',
              continuedTimes: '审核持续时间：',
              situation: '复审：',
              allotPensonnel: '分配人：',
              allotTimes: '分配时间：'
            },
            {
              personnel: '签发人：',
              continuedTimes: '审核持续时间：',
              situation: '签发：',
              allotPensonnel: '分配人：',
              allotTimes: '分配时间：'
            }
          ],
        },

        condition:{
          pass: 'pass',
          by: '通过',
          unpass: 'unpass',
          fail: '未过',
          await: 'await',
          pending: '待审'
        },

        times: [],
        label: [],
        contentOptions: [],
        commonData: window.commonData,
        val: 'All',
        valType: '',
        page: 1,
        pagesize: 10,
        count: 0,
        nature: 0,
        level: 0,
        hackReset: true
      }
		},
    created() {
      that = this;
      this.getSearchItems();
      this.$store.state.searchInfo = ()=>{
        this.searchEvent();
      }
      let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path) {
				this.pageOptions.itemsIptOptions[0].formData.tabFlag = searchCondition.tabFlag;
				this.pageOptions.itemsIptOptions[0].formData.distributionType = searchCondition.distributionType;
				this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = searchCondition.projectNatureIds;				
				this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = searchCondition.projectLevelIds;
				this.val = searchCondition.tabFlag;
				this.pageOptions.singleRadioOptions.value = this.val;
				this.valType = searchCondition.distributionType;
				this.pageOptions.singleRadioTypes.value = this.valType;
				this.pageOptions.singleRadioNatureOptions.optionId = searchCondition.projectNatureIds.split(',');
				this.pageOptions.singleRadioLevelOptions.optionId = searchCondition.projectLevelIds.split(',');
				this.nature = searchCondition.projectNatureIds;
				this.level = searchCondition.projectLevelIds;
				this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
				this.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.projectNumber = this.pageOptions.itemsIptOptions[1].input;
				this.page = searchCondition.page;
			}
			this.callInterface();
    },
    methods: {
      radioEvent(val) {
        // 单选按钮事件
				this.val = val;
				this.pageOptions.itemsIptOptions[0].formData.tabFlag = val;
        this.page = 1;
        this.searchEvent();
      },
      //签发类型
      radioEventType(val) {
				this.valType = val;
				this.pageOptions.itemsIptOptions[0].formData.distributionType = val;
        this.page = 1;
        this.searchEvent();
      },

      radioNatureEvent(val, arr) {
        if(arr) {
          this.nature = arr.join(',');
        } else if(val) {
          this.nature = this.pageOptions.singleRadioNatureOptions.optionId.join(',');
        } else {
          this.nature = '';
				}
				this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = this.nature;
				this.page = 1;
        this.searchEvent();
      },

      radioLevelEvent(val, arr) {
        if(arr) {
          this.level = arr.join(',');
        } else if(val) {
          this.level = this.pageOptions.singleRadioLevelOptions.optionId.join(',');
        } else {
          this.level = '';
				}
				this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = this.level;
				this.page = 1;
        this.searchEvent();
      },

      getSearchItems(){
        let _this = this;
        commonOriginalData.projectNatureId.forEach(function(val, key) {
          _this.pageOptions.singleRadioNatureOptions.option.push({
            name: val.name.slice(0, val.name.length - 2),
            id: val.id
          }, )
          _this.pageOptions.singleRadioNatureOptions.optionId.push(val.id);
          _this.pageOptions.singleRadioNatureOptions.optionIdOld.push(val.id);
        });
				this.nature = _this.pageOptions.singleRadioNatureOptions.optionId.join(',')
				this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = this.nature;
        commonOriginalData.projectLevelId.forEach(function(val, key) {
          _this.pageOptions.singleRadioLevelOptions.option.push({
            name: val.name + '级',
            id: val.id
          }, )
          _this.pageOptions.singleRadioLevelOptions.optionId.push(val.id); 
          _this.pageOptions.singleRadioLevelOptions.optionIdOld.push(val.id);
        });
				this.level = _this.pageOptions.singleRadioLevelOptions.optionId.join(',');
				this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = this.level;
      },

      resetEvent() {
        this.hackReset = false //销毁组件
        this.$nextTick(() => {
          this.hackReset = true //重建组件
        })
        this.nature = this.pageOptions.singleRadioNatureOptions.optionId.join(',');
        this.level = this.pageOptions.singleRadioLevelOptions.optionId.join(',');
        this.pageOptions.itemsIptOptions.forEach(item => {
          item.input = ''
        })
        this.page = 1;
        this.count = 0;
        this.val = 'All';
        this.pageOptions.singleRadioOptions.value = '';
        this.valType = '';
				this.pageOptions.singleRadioTypes.value = '';
				this.pageOptions.singleRadioNatureOptions.optionId = this.pageOptions.singleRadioNatureOptions.optionIdOld.map(item=>{
					return item
				});
				this.projectNatureIds = this.pageOptions.singleRadioNatureOptions.optionId;
				this.pageOptions.singleRadioLevelOptions.optionId = this.pageOptions.singleRadioLevelOptions.optionIdOld.map(item=>{
					return item
				});
				this.projectLevelIds = this.pageOptions.singleRadioNatureOptions.optionId;
        this.callInterface();
      },
      
      searchEvent() {
        this.contentOptions = [];
        this.page = 1;
        this.callInterface();
      },

      callInterface() {                    	
        let data = {
          tabFlag: this.val,
          distributionType: this.valType,
          projectName: this.pageOptions.itemsIptOptions[0].input,
          projectNumber: this.pageOptions.itemsIptOptions[1].input,
          projectNatureIds: this.nature,
          projectLevelIds: this.level,
          page: this.page,
          rows: this.pagesize,
          dataSearchPath:this.$route.path
        }
        this.$setCookie('searchCondition', JSON.stringify(data) , 24 * 60 * 60);
        this.$http
          .post('/api/reportDistribution/findReportDistributionList', data)
          .then(res => {
            this.count = res.count * 1;
            let _data =  res.data;
            this.times = [];
            this.contentOptions =_data;
            _data.forEach((item, index)=>{
              let timeCon = [];
              if(item.projectInformation.length){
                item.projectInformation.forEach((msg, mindex)=>{
                  if(msg.shTime){
                    let days = Math.floor((msg.shTime) / 1000 / 60 / 60 / 24);
                    let hours = (msg.shTime) / 1000 / 60 / 60 - (24 * Math.floor((msg.shTime) / 1000 / 60 / 60 / 24));
                    hours = (Math.floor(hours)<1) ? '<1' : Math.floor(hours);
                    timeCon.push({days, hours})
                  }
                })
                this.times.push(timeCon);
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
      },

      currentPage(val) {
        this.page = val;
        this.callInterface()
      },

      bodyClick(projectId, id) {
        this.$store.state.projectId = projectId;
        this.$setCookie('projectId', projectId ,24*60*60);
        this.$store.state.id = id;
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '签发分配';
        this.$store.state.commonBtn = '进入项目';
        this.$store.state.componentsType = 'projectDetail';
        this.$store.state.refresh = function () {
          that.searchEvent();
        }
        this.$store.state.dataObj = {
          isShow: true,
          projectId: projectId
        };
      }
    }
  }
</script>
<style scoped lang="scss">
	.auditing-con {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		/deep/ .container {
			background: #fff;
			border: 1px solid #ECECEC;
			border-top: none;
		}
		/* 搜索模块 */
		.search-container {
			position: relative;
			.btn-container {
				position: absolute;
				right: 20px;
				padding-top: 15px;
			}
		}
		/* 按钮 */
		.search-btn,
		.reset-btn {
			padding: 0;
			border: none;
			width: 70px;
			height: 25px;
			border-radius: 2px;
			font-size: 13px;
			font-weight: 400;
			cursor: pointer;
		}
		/* 搜索按钮 */
		.search-btn {
			margin-right: 5px;
			background: rgba(58, 128, 236, 1);
			color: rgba(255, 255, 255, 1);
		}
		/* 重置按钮 */
		.reset-btn {
			background: #fff;
			border: 1px solid rgba(58, 128, 236, 1);
			color: rgba(58, 128, 236, 1);
		}
		/*列表外层包裹*/
		.list-wrapper {
			margin-top: 12px;
			border: 1px solid #ECECEC;
			background: #fff;
			flex: 1;
			-ms-flex:1 0 auto;
		}
		.content-nodata {
			box-sizing: border-box;
			width: 100%;
			background: #fff;
			text-align: center;
			height: 100%;
		}
		.content {
			padding: 0 15px;
			margin-top: 15px;
			.wrap {
				padding-bottom: 10px;
				border: 1px solid #E5E5E5;
				margin-bottom: 10px;
				cursor: pointer;
				.head {
					box-sizing: border-box;
					padding: 0 10px;
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #E5E5E5;
					height: 40px;
					line-height: 38px;
					background: #F6FAFF;
					h2 {
						width: 700px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-left: 15px;
						font-size: 16px;
						.head-title , .head-titleRed{
							font-size: 13px;
							padding: 2px;
							border-radius: 2px;
						  margin-right: 10px;
						}
						.head-title{
							border: solid 1px #145FD2;
							color: #145FD2;
						}
						.head-titleRed{
							border: solid 1px #B42809;
							color: #B42809;
						}
					}
					.head-label {
						margin-left: 5px;
						padding: 3px 8px;
						border-radius: 2px;
						font-size: 12px;
					}
					.projectNature {
						color: #98C268;
						border: 1px solid #C8DEAF;
						background: #F1F8E8
					}
					.projectLevel {
						color: #F09237;
						border: 1px solid #FFC68F;
						background: #FFF2E5
					}
					.assessmentTarget {
						color: #7C9FEE;
						border: 1px solid #BBD0FF;
						background: #E9F0FF
					}
					.projectMessage {
						color: #50ADEE;
						border: 1px solid #9BD6FF;
						background: #E6F5FF
					}
				}
				.body {
					padding: 10px 0;
					.body-container {
						display: flex;
						cursor: pointer;
						.basic {
							font-size: 13px;
							line-height: 26px;
						}
						.instanceName {
							display: flex;
							.circular {
								display: block;
								width: 6px;
								height: 6px;
								margin: 10px 10px 10px 15px;
								border-radius: 100%;
							}
							.name {
								width: 58px;
								padding-right: 10px;
								font-size: 15px;
								color: #1D1C1E;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
						.times {
							display: flex;
							box-sizing: border-box;
							padding: 0 15px;
							width: 220px;
							.days-container {
								display: flex;
								width: 98px;
							}
							.unit {
								font-size: 13px;
								color: #1D1C1E;
								margin-left: 2px;
							}
							.dayStyle {
								color: #EA7F2B;
								font-size: 15px;
								margin: 0 2px;
							}
						}
						.situation {
							box-sizing: border-box;
							display: flex;
							align-items: center;
							padding: 0 15px;
							width: 357px;
							.label-container {
								display: flex;
								justify-content: space-between;
								margin-right: 5px;
								/*width: 210px;*/
								height: 20px;
								line-height: 20px;
								border: 1px solid #ccc;
								.label-title {
									width: 30px;
									color: #fff;
									font-size: 10px;
									text-align: center;
									&.pass {
										background: #98C268;
									}
									&.unpass {
										background: #C27768;
									}
									&.await {
										background: #50ADEE;
									}
								}
								.label-content {
									margin: 0 2px;
									width: 45px;
									text-align: center;
									.number {
										font-size: 13px;
										margin-right: 5px;
										color: #EA7F2B;
									}
								}
							}
							.undistribution {
								width: 86px;
								height: 20px;
								line-height: 20px;
								background: #B9B9B9;
								color: #fff;
								font-size: 13px;
								text-align: center;
							}
						}
						.projectNumber {
							display: flex;
							width: 270px;
							box-sizing: border-box;
							padding-left: 10px;
							span:first-child {
								color: #505050
							}
							span:last-child {
								color: #262628;
							}
							.pensonnel-container {
								display: flex;
								.label {
									width: 55px;
								}
								.name {
									width: 35px;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
								}
								.time-label {
									width: 65px;
								}
								.fp_times {
									width: 98px;
									border-right: none;
								}
							}
						}
					}
					li {
						margin-top: 15px;
					}
					li:nth-child(1) {
						.circular {
							background: #EA7F2B;
						}
						.instance {
							white-space: nowrap;
							color: #EA7F2B;
						}
					}
					li:nth-child(2) {
						.circular {
							background: #49B4A3;
						}
						.instance {
							white-space: nowrap;
							color: #49B4A3;
						}
						.instanceName,
						.times,
						.situation {
							position: relative;
							&::after {
								content: '';
								width: 1px;
								height: 100px;
								background-color: #ECECEC;
								position: absolute;
								right: 0;
								top: -35px;
							}
						}
					}
					li:nth-child(3) {
						.circular {
							background: #698AE9;
						}
						.instance {
							/*width: 50px;*/
							white-space: nowrap;
							color: #698AE9;
						}
					}
				}
			}
			.wrap:hover {
				border: 1px solid #B9E1FC;
			}
		}
		/* 列表头部 */
		.list-head {
			padding-right: 20px;
			height: 35px;
			line-height: 35px;
			font-size: 13px;
			font-weight: 400;
			color: rgba(38, 38, 40, 1);
			background: rgba(249, 249, 249, 1);
			border-radius: 2px;
			/*border: 1px solid rgba(236, 236, 236, 1);*/
			border-bottom: 1px solid #ECECEC;
			text-align: right
		}
		.pagination-container {
			padding-bottom: 20px;
			background: #fff;
			display: flex;
			justify-content: center;
		}
	}
</style>
