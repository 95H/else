<template>
	<!-- 搜索所需条件 begin -->
	<div class="examine">
    <div class="carousel-title">
			<div class="title-head">
				<p>运营中心 <span>{{activeIndex}} / {{pageCount}}</span></p>
			</div>
			<el-carousel indicator-position="outside" :autoplay="false" @change="changePersonList">
		    <el-carousel-item v-for="item in carouselPerson" :key="item.id" >
		      <div class="outside-cont" v-for="scItem in item.list" :key="scItem.id">
		      	<div class="outsideCont-cont">
		      		<div class="outsideCont-img">
		      			<img src="../../assets/common/headImg-small.png">
		      		</div>
		      		<div class="outsideCont-p">
		      			<p>{{scItem.userName}}</p>
		      			<span>{{scItem.roleName}}</span>
		      			<div><span>{{scItem.taskCount}} </span>个待审核</div>
		      		</div>
		      	</div>
		      	<button v-if="scItem.status == 2" class="search-btn outside-cont1" @click="authorizeSure(scItem)">授权</button>
		      	<button v-if="scItem.status == 1" class="search-btn outside-cont2" @click="authorizeCancal(scItem)">取消授权</button>
		      </div>
		    </el-carousel-item>
		  </el-carousel>
		</div>
		<div class="list-search">
			<div class="singleRadio-container" v-if="hackReset">
				<!-- 审核级别 -->
        <single-radio :singleradiooptions="pageOptions.auditStatus" @onradioclick="radioStateEvent"></single-radio>
        <!-- 我的审核 -->
				<single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="pageOptions.itemsIptOptions">
				<div slot="ipt-date">
					<div class="timeData">
						<span class="txt fs13" style="width:auto;">申请时间：</span>
						<el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="marginRight20">
						</el-date-picker>
					</div>
					<div class="btn-container">
						<button class="search-btn" @click="searchEvent">搜索</button>
						<button class="reset-btn" @click="resetEvent">重置</button>
					</div>
				</div>
				</ipt>
			</div>
		</div>
		<!-- 列表 begin -->
		<div class="table-card marginTop10">
			<zltable  v-if="hackReset" ref='zltable' :dataTableHead="dataTableHead" :dataurl='dataurl' :dataSearch="form" v-on:trclick="trclick"></zltable>
		</div>
	<!-- 列表 end -->

		<!-- 授权 begin -->
    <center-dialog ref="centerDialog" dialogWidth="435px" dialogHeight="280px" titlePosition="cnter" dialogTitle="授权">
      <div slot="dialogContent" class="dialogContent">
        <div class="isAllowPerson">
          <span>被授权人：{{externalPerson.userName}}</span>
        </div>
        <div class="isAllowPerson">
          <span>授予权限：</span><span style="color:#262628">立项复审</span>
        </div>
        <div class="isAllowPerson">
          <span>权限期限：</span>
           <el-date-picker
            popper-class="popper-time"
            v-model="isAllowTime"
            :picker-options="pickerOptions1"
            type="datetimerange"
            range-separator="至"
            format="yyyy-MM-dd HH"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="text-center isAllowBot">
          <el-button class="search-btn" @click="externalAuditSure">确定</el-button>
          <el-button class="reset-btn" @click="closeExtrDialog()">取消</el-button>
        </div>
      </div>

    </center-dialog>
     <!-- 授权 end -->

   <!-- 取消授权 -->

    <center-dialog ref="endDialog" dialogWidth="435px" dialogHeight="280px" titlePosition="cnter" dialogTitle="取消授权">
      <div slot="dialogContent" class="dialogContent">
        <div class="currentHav">
          <span>当前权限：</span>
        </div>
        <div class="isAllowPerson2">
          <span>被授权人：{{cancelPerson.userName}}</span>
        </div>
        <div class="isAllowPerson2">
          <span>授予权限：</span><span style="color:#262628">立项复审</span>
        </div>
        <div class="isAllowPerson2">
          <span>权限期限：</span><span style="color:#262628">{{canStart}} 至 {{canEnd}}</span>
        </div>
        <div class="isAllowPink">
          <span>是否取消此次授权？</span>
        </div>
        <div class="text-center isAllowBot2">
          <el-button class="search-btn" @click="cancelAuditSure">确定</el-button>
          <el-button class="reset-btn" @click="closeDialog()">取消</el-button>
        </div>
      </div>
    </center-dialog>
	</div>
</template>

<script>
  import zltable from '@/components/zltable.vue';
  import centerDialog from "@/components/centerDialog";
	export default {
		name: 'myAudit',
		data() {
			return {
        canStart: '',
        canEnd: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 3600 * 1000 * 24);
          }
        },
        externalPerson: {},
        cancelPerson: {},
        dateArr: [],
        // 授权允许的实际
        isAllowTime: '',
        isAllowStart: '',
        isAllowEnd: '',
        // 下属列表
        carouselPerson: [],
				auditStatusData: '',
				form: {
					sheetStatus: '1',
					auditStatus: '',
					projectName: '',
					projectNumber: '',
					organizer: '',
					projectApply: '',
					auditApply: '',
					startTime: '',
					endTime: ''
				},
				pageOptions: {
					auditStatus: {
						txt: '审核级别：',
						option: [{
								name: '复审',
								label: 'usertask3'
							},
							{
								name: '初审',
								label: 'usertask2'
							}
						]
					},
					singleRadioOptions: {
						txt: '审核分类：',
						option: [{
								name: '待审核',
								label: '1'
							},
							{
								name: '已审核',
								label: '2'
							},
							{
								name: '全部',
								label: '3'
							}
						]
					},
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key:'projectName',
							url:'/api/projectRequest/findSetupAuditList',
							formData:{
								sheetStatus: '1',
								auditStatus: ''
							},
							input: ''
						},
						{
							name: '项目编号：',
							holder: '请输入项目编号',
							input: ''
						},
						{
							name: '承作机构：',
							holder: '请输入承作机构',
							key:'groupName',
							input: ''
						},
						{
							name: '审核人：',
							holder: '请输入审核人',
							key:'',
							input: ''
						},
						{
							name: '申请人：',
							holder: '请输入申请人',
							key:'createUser',
							input: ''
						}
					],
				},
				hackReset: false,
				dataTableHead: [{
						title: "项目名称",
						name: "projectName"
					},
					{
						title: "项目编号",
						name: "projectNumber"
					},
					{
						title: "承做机构",
						name: "groupName"
					},
					/*{
						title: "项目负责人",
						name: "xmFzrNames"
					},*/
					{
						title: "申请人",
						name: "projectApply"
					},
					{
						title: "审核人",
						name: "auditApply"
					},
					{
						title: "状态",
						name: "processStateId",
						_param: "processStateId"
					},
					{
						title: "申请时间",
						name: "createTime"
					}

				], //表头数据。title：表头的title。name：接口数据字段。
				count: 0,
        val:'1',
        activeIndex: 0,
        pageCount:1,
				dataurl: "/api/projectRequest/findSetupAuditList" //表格数据api。
			};
		},

		created() {
			var _this = this;
			_this.$http.post("/api/projectRequest/judgeIsYyzx")
	 			.then(function(data) {
          if (data.data.isYyzxzrByTime==0&&data.data.isYyzxzr == 1) {
            _this.$emit('isYyzxzr',1)
          }
					if(data.data.isYyzxzr == 1){
            // _this.$store.state.isShowAudit = 1
						_this.$store.state.status = _this.pageOptions.auditStatus.option[0].label;
            _this.form.auditStatus = _this.$store.state.status;
					}else{
            _this.$store.state.status = _this.pageOptions.auditStatus.option[1].label;
            _this.form.auditStatus = _this.$store.state.status;
					}
					_this.pageOptions.itemsIptOptions[0].formData.auditStatus = _this.form.auditStatus;
          _this.hackReset = true;
	 			})
	 			.catch(function(error) {
	 				_this.$messageError(error);
	 		});
      this.$store.state.searchInfo = ()=>{
        this.searchEvent();
      }
      this.renderPersonList()
		},
		methods: {
			//返回回显
			goBack(){
				let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
				if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
					this.pageOptions.itemsIptOptions[0].formData.sheetStatus = searchCondition.sheetStatus;
					this.form.sheetStatus = searchCondition.sheetStatus;
					this.pageOptions.singleRadioOptions.value= searchCondition.sheetStatus;
					this.pageOptions.itemsIptOptions[0].formData.auditStatus = searchCondition.auditStatus;
					this.form.auditStatus = searchCondition.auditStatus;
					this.pageOptions.auditStatus.value= searchCondition.auditStatus;
					this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
					this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
					this.pageOptions.itemsIptOptions[2].input = searchCondition.organizer;
					this.pageOptions.itemsIptOptions[3].input = searchCondition.auditApply;
					this.pageOptions.itemsIptOptions[4].input = searchCondition.projectApply;
					this.dateArr=[searchCondition.startTime,searchCondition.endTime];
					this.form.projectName = searchCondition.projectName;   //項目名称
					this.form.projectNumber = searchCondition.projectNumber;  //項目编号
					this.form.organizer = searchCondition.organizer;  //承作机构
					this.form.auditApply = searchCondition.auditApply;  //审核人
					this.form.projectApply = searchCondition.projectApply;  //申请人
					this.form.startTime = searchCondition.startTime;  //申请人
					this.form.endTime = searchCondition.endTime;  //申请人
					this.form.page = searchCondition.page;
				}
			},
       // 切换人员列表
      changePersonList (a, b) {
        this.activeIndex = a + 1
      },
      renderPersonList () {
        var _this = this
        _this.carouselPerson = []
        _this.$http.post("/api/sysrole/getUserListByRole", )
          .then(function(res) {
            const {code, count, data} = res
            if (code == 200) {
              // for (let i = 0;i<10;i++) {
              //   data.push(data[0])
              //   data.push(data[1])
              // }
              let newArr = []
              let inm = (data.length / 5 * 10 - Math.floor(data.length / 5) * 10) / 2
              if (inm == 0) {
                for (let i = 0;i < data.length;i++) {
                  newArr.push(data.slice(i,i+=5))
                }
              } else {
                let als = Math.floor(data.length / 5) * 5
                for (let i = 0;i < als;) {
                  newArr.push(data.slice(i,i+=5))
                }
                newArr.push(data.slice(als, als+inm))
              }
              _this.pageCount = newArr.length
              for (let j = 0;j < newArr.length; j++) {
                _this.carouselPerson.push({
                  id: j+1,
                  list:newArr[j]
                })
              }
            }
          })
          .catch(function(error) {
            _this.$messageError(error);
        });
      },
			searchEvent() {
				var _this = this;
				let _options = _this.pageOptions.itemsIptOptions;
        this.form.projectName= _options[0].input;
        this.form.projectNumber= _options[1].input;
        this.form.organizer= _options[2].input;
        this.form.auditApply= _options[3].input;
        this.form.projectApply= _options[4].input;
        this.form.startTime = this.dateArr && this.dateArr[0] ? this.dateArr[0] : '';
				this.form.endTime = this.dateArr && this.dateArr[1] ? this.dateArr[1] : '';
				this.$refs.zltable.refreshPage();
			},
			trclick(row) {
				let _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '立项审核';
				this.$store.state.commonBtn = '进入项目';
				if(row.processStateId == '1067' && row.isYyzxzy == '1'){
					this.$store.state.extraBtn = '撤销';
				}
				this.$store.state.componentsType = 'examineInfo';
				this.$store.state.projectId = row.projectId;
				this.$store.state.taskId = row.taskId;
				this.$store.state.dataObj = row;
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				};
				this.$store.state.isScroll = false;
			},
      radioEvent(val) { //单选按钮调用接口
				this.form.sheetStatus = val;
				this.pageOptions.itemsIptOptions[0].formData.sheetStatus = val;
				this.$refs.zltable.refreshPage();
			},
			radioStateEvent(val) {
				this.form.auditStatus = val;
				this.pageOptions.itemsIptOptions[0].formData.auditStatus = val;
				this.$refs.zltable.refreshPage();
			},
			resetEvent() { //重置按钮方法
				var _this = this;
				this.val = '1';
				this.pageOptions.singleRadioOptions.value="";
				this.form.sheetStatus="1";
				this.pageOptions.auditStatus.value="";
				this.form.auditStatus=_this.$store.state.status;
				this.form.page=1;
        this.hackReset = false;//销毁组件
        this.$nextTick(() => {
          this.hackReset = true;//重建组件
        });
        this.pageOptions.itemsIptOptions.forEach(item => {
          item.input = '';
        });
        this.dateArr = [];
        this.searchEvent();
      },
      //授权--打开弹窗
			authorizeSure(item) {
        this.$refs.centerDialog.showDialog();
        this.isAllowStart = ''
        this.isAllowEnd = ''
        this.externalPerson = item
			},
			externalAuditSure() {
        let _this = this
        let arr = ['isAllowStart', 'isAllowEnd']
        for(let i = 0; i < this.isAllowTime.length; i++) {
          let date = this.isAllowTime[i]
          this[arr[i]] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          + ' ' + (date.getHours()>9?date.getHours():('0'+ date.getHours()))
          // 精确到分
          + ':' + (date.getMinutes()>9?date.getMinutes():('0'+date.getMinutes()))
          // + ':00'
          // 精确到秒
          + ':' + (date.getSeconds()>9?date.getSeconds():('0'+date.getSeconds()))
        }
        if (this.isAllowTime.length > 0) {
          _this.$http.post("/api/userrole/startAuthorization", {
            userId: _this.externalPerson.userId,
            positionType:'LXFS',
            startTime: _this.isAllowStart,
            endTime: _this.isAllowEnd
          })
            .then(function(res) {
              if (res.code == 200) {
                _this.renderPersonList()
                _this.$refs.zltable.refreshPage();
                _this.$message({
                  message: res.msg,
                  type: 'success'
                });
              }
            })
            .catch(function(error) {
              _this.$messageError(error);
          });
          this.isAllowTime = ''
          this.$refs.centerDialog.closeDialog();
        } else {
           _this.$message({
              message: '时间不能为空',
              type: 'warning'
            });
        }
      },
      closeExtrDialog() {
        this.isAllowTime = ''
        this.$refs.centerDialog.closeDialog();
      },
			//取消授权--打开弹窗
			authorizeCancal(item) {
        let ind = item.startTime.lastIndexOf(':')
         if (item.startTime) {
          this.canStart = item.startTime.slice(0, ind)
        }
        if (item.endTime) {
          this.canEnd = item.endTime.slice(0, ind)
        }
        this.$refs.endDialog.showDialog()
        this.cancelPerson = item
      },
      // 确定
      cancelAuditSure() {
        var _this = this
        _this.$http.post("/api/userrole/endAuthorization", {
          userId: _this.cancelPerson.userId,
          positionType:'LXFS'
        })
          .then(function(res) {
            if (res.code == 200) {
              _this.renderPersonList()
              _this.$refs.zltable.refreshPage();
              _this.$message({
                message: res.msg,
                type: 'success'
              });
            }
          })
          .catch(function(error) {
            _this.$messageError(error);
        });
        this.$refs.endDialog.closeDialog();
      },
			// 授权取消--关闭弹窗
      closeDialog() {
        this.$refs.endDialog.closeDialog();
      },
		},
    components: {
			zltable,centerDialog
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.isAllowPerson /deep/ .el-range-editor.el-input__inner {
  width: 276px!important;
}
.isAllowPerson /deep/ .el-range-editor .el-range-input {
  font-size: 12px!important;
}
.isAllowPerson /deep/ .el-date-editor .el-range-separator  {
  font-size: 12px;
  line-height: 25px;
}
.examine {
	height: 100%;
	flex-direction: column;
	display: -webkit-flex;
	display: flex;
}

.list-search /deep/ {
	background: #fff;
	border-bottom-right-radius: 2px;
	border-bottom-left-radius: 2px;
	.search-container {
		position: relative;
		.btn-container {
			position: absolute;
			right: 20px;
			top: 55px;
		}
	}
}

.table-card {
	background: #fff;
	margin-top: 10px;
	flex: 1;
	-ms-flex:1 0 auto;
	.table-con,
	.table-comp {
		height: 100%;
		box-sizing: border-box;
	}
}

.seal-title {
	background: #fff;
	padding-left: 30px;
	height: 34px;
	line-height: 33px;
	font-size: 13px;
	border: solid 1px #ececec;
	border-bottom: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 28px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {

}

/deep/ .el-carousel__item--card{
	width: 160px;
}
/deep/ .el-carousel__arrow{
	height: 135px;
  width: 25px;
  border-radius: 0;
  background:rgba(0,0,0,0.4);
  i{
  	font-size: 20px;
  	color: #fff;
  }
}
/deep/ .el-carousel__arrow--left{
	left: 0;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
}
/deep/ .el-carousel__arrow--right{
	right: 0;
	border-top-right-radius: 3px;
	border-bottom-right-radius: 3px;
}
.el-carousel__item:nth-child(2n+1) {

}
.carousel-title{
	padding: 0 20px;
	background: #fff;
	border-bottom: dotted 2px #ECECEC;
	.title-head{
		padding: 14px 0 10px 0;
		p{
			font-size:13px;
			font-weight:600;
			color:rgba(38,38,40,1);
			padding-left: 15px;
			position: relative;
			span{
				float: right;
				font-size:13px;
				font-weight:600;
				color:rgba(38,38,40,1);
			}
		}
		p:after{
			content: '';
			width: 6px;
			height: 5px;
			background:#F09237;
			border-radius: 50%;
			position: absolute;
    	left: 0;
    	top: 3.5px;
		}
	}
	.outside-cont:hover {
     background-color: #D5E5FF;
     cursor: pointer;
  }
	.outside-cont{
		width: 170px;
    height: 135px;
    display: inline-block;
		box-sizing: border-box;
		padding: 11px;
		background: #F9F9F9;
		margin: 0 12px;
		.outsideCont-cont{
			display: flex;
			.outsideCont-img{
				margin-right: 9px;
				img{
					width: 52px;
					height: 52px;
				}
			}
			.outsideCont-p{
				font-size:13px;
				p{
					color: #262628;
					font-weight:700;
					margin-bottom: 7px;
				}
				span{
					color: #636363;
					font-weight:400;
				}
				div{
					color: #636363;
					font-weight:400;
					margin-top: 9px;
					span{
						color: #F09237;
            font-size: 800
					}
				}
			}
		}
		.search-btn{
			height: 20px;
    	line-height: 17px;
    	display: block;
   		margin: 25px auto;
		}
		.search-btn:last-child{
			margin-right: auto !important;
		}
		.outside-cont2{
			background: #F09237;
			border-color: #F09237;
		}
	}
	/deep/ .el-carousel__container{
		height: 135px !important;
		margin-bottom: 14px;
	}
}
.currentHav {
  padding-left: 19px;
  margin-bottom: 18px;
  span{
    font-size:13px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(38,38,40,1)
  }
}
.isAllowPerson {
  padding-left: 19px;
  margin-bottom: 18px;
  span {
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(99,99,99,1)
  }
}
.isAllowPerson2 {
  padding-left: 19px;
  margin-bottom: 8px;
  span {
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(99,99,99,1)
  }
}
.isAllowBot{
  margin-top: 56px;
}
.isAllowBot2 {
  margin-top: 23px;
}
.isAllowPink {
  padding-left: 19px;
  margin-top: 17px;
  span{
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(246,93,93,1);
  }
}
/deep/ .ipt-wrap .ipt-container{
	margin-right: 19px !important;
}
/deep/ .ipt-wrap .ipt-container:nth-child(4n) {
  margin-right: 0 !important;
}
/deep/ .timeData{
	padding-top: 15px;
	span{
		color: #686868;
	}
}

</style>
