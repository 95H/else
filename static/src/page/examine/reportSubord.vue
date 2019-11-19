<template>
	<div class="examine">
		<div class="container">
       <div class="carousel-title">
        <div class="title-head">
          <p>技术中心 <span>{{activeIndex}} / {{pageCount}}</span></p>
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
                  <span :title="scItem.groupName">{{scItem.groupName}}</span>
                  <div><span>{{scItem.fsCount == ''? 0 : scItem.fsCount}} </span>个待复审</div>
                  <div><span>{{scItem.qfCount == ''? 0 : scItem.qfCount}} </span>个待签发</div>
                </div>
              </div>
              <button v-if="scItem.authorizationsBGQF == '0' && scItem.authorizationsBGSH == '0'" class="search-btn outside-cont1" @click="authorizeSure(scItem)">授权</button>
              <button v-else class="search-btn outside-cont2" @click="authorizeCancal(scItem)">取消授权</button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
			<div class="singleRadio-container" v-if="hackReset">
        <single-radio :singleradiooptions="auditStatus" @onradioclick="radioStateEvent"></single-radio>
				<single-radio :singleradiooptions="examineResultOptions" @onradioclick="examineResultEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="selectOpinion">
          <div slot="ipt-date">
            <div class="timeData">
              <span class="txt fs13" style="width:auto;">申请时间：</span>
              <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="marginRight20">
              </el-date-picker>
            </div>
            <div class="btn-container">
              <button class="search-btn" @click="onSubmit">搜索</button>
              <button class="reset-btn" @click="resetTable">重置</button>
            </div>
          </div>
        </ipt>
				<!-- <el-button type="primary" class="search-btn" @click="onSubmit">搜索</el-button>
				<el-button class="reset-btn" @click="resetTable">重置</el-button> -->
			</div>
		</div>
		<div class="table-card">
			<div class="table-con">
				<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="tableSelect" v-on:trclick="trclick"></zltable>
			</div>
		</div>
    <!-- 授权 begin -->
    <center-dialog ref="centerDialog" dialogWidth="435px" dialogHeight="280px" titlePosition="cnter" dialogTitle="授权">
      <div slot="dialogContent" class="dialogContent">
        <div class="isAllowPerson">
          <span>被授权人：{{externalPerson.userName}}</span>
        </div>
        <div class="isAllowPerson">
          <span>授予权限：</span><el-checkbox v-model="workFs">内部作业复审</el-checkbox><el-checkbox v-model="workQf">内部作业签发</el-checkbox>
          <!-- <span style="color:#262628">立项复审</span> -->
        </div>
        <div class="isAllowPerson">
          <span>权限期限：</span>
          <!--   popper-class="popper-time"  format="yyyy-MM-dd HH" -->
           <el-date-picker
            v-model="isAllowTime"
            popper-class="popper-time"
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
          <span>授予权限：</span>
          <el-checkbox
          v-model="qxworkFs"
          :disabled="qxworkFs == true && qxworkQf == false"
          v-if="cancelPerson.authorizationsBGSH == '1'? true : false"
          >内部作业复审</el-checkbox>
          <el-checkbox
          v-model="qxworkQf"
          :disabled="qxworkQf == true && qxworkFs == false"
          v-if="cancelPerson.authorizationsBGQF == '1'? true : false">内部作业签发</el-checkbox>
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
	import zltable from '../../components/zltable.vue';
  import Public from '../../public.js'
  import centerDialog from "@/components/centerDialog";
	export default {
		name: 'examineDetails',
		data() {
			return {
        // 下属列表
        workFs: false,
        workQf: false,
        qxworkFs: false,
        qxworkQf: false,
        externalPerson: {},
        cancelPerson: {},
        isAllowTime: [],
        isAllowStart: '',
        isAllowEnd: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 3600 * 1000 * 24);
          }
        },
        carouselPerson: [],
        activeIndex: 0,
        pageCount:1,
        dateArr: [],
        auditStatus: {
          txt: '审核级别：',
          option: [

            {
              name: '复审',
              label: 'usertask3'
            },
            {
              name: '签发',
              label: 'usertask4'
            }
          ]
        },
				examineResultOptions: {
					txt: '审核结果',
					option: [{
							name: '待审核',
							label: '0'
						},
						{
							name: '已审核',
							label: '1'
						},
						{
							name: '全部',
							label: '2'
						},
					]
				},
				selectOpinion: [{
						name: '项目名称：',
						holder: '请输入项目名称',
            key: 'projectName',
            url: "/api/investors/subordinateAuditing",
            formData:{
								auditingType:'usertask3',
								tabFlag:'0'
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
            key: 'groupName',
						input: ''
					},
					{
						name: '申请人：',
            holder: '请输入申请人',
						key: 'createUser',
						input: ''
					},
          {
						name: '审核人：',
            holder: '请输入审核人',
						key: 'createUser',
						input: ''
					}
				],
				tableSelect: {
          projectName: '',
          projectNumber: '',
          applicant: "",
					tabFlag: "0",
				  groupName: '',
          auditingType: '',
          auditingName: '',
          startTime: '',
          endTime: '',
          type: 'reportSubord',
          index: 1
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName",
						// width: "200px"
					},
					{
						title: "项目编号",
						name: "projectNumber",
						// width: "150px"
					},
					{
						title: "承作机构",
						name: "groupName",
						// width: "150",
					},
					{
						title: "申请人",
						name: "userName",
						width: "100"
          },
          {
						title: "审核人",
						name: "auditName",
						width: "100"
					},
					{
						title: "状态",
						name: "auditingStatus",
						width: "120"
					},
					{
						title: "申请日期",
						name: "applyTime"
					}
				], //表头数据。title：表头的title。name：接口数据字段。
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
        dataurl: "/api/investors/subordinateAuditing", //表格数据api。
        hackReset: true,
        canStart: '',
        canEnd: ''
			};
		},
		created() {
      let _this = this
      this.$http.post("/api/sysrole/getUserRole")
	 			.then(function(data) {
           if (data.data.isJSZXZR == 1 || data.data.isSXPGS == 1) {
             _this.$emit('isJszxzr',1)
            
           }
         })
	 		this.tableSelect.auditingType = 'usertask3'
	 		this.defaultSelectOpinion = JSON.parse(JSON.stringify(this.$data.selectOpinion));
			this.defaultTableSelect = JSON.parse(JSON.stringify(this.$data.tableSelect));
	 		this.goBack();
      this.renderPersonList()
			for(let i=0;i<this.$store.state.projectMenu.child.length;i++){
				if(this.$store.state.projectMenu.child[i].functionName == '审核'){
					localStorage.setItem("index", i);
				}
			}
		},
		methods: {
			//返回回显
			goBack(){
				let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
				if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path && searchCondition.index == 1){
					this.selectOpinion[0].formData.tabFlag = searchCondition.tabFlag;
					this.tableSelect.tabFlag = searchCondition.tabFlag;
					this.examineResultOptions.value= searchCondition.tabFlag;
					this.selectOpinion[0].formData.auditingType = searchCondition.auditingType;
					this.tableSelect.auditingType = searchCondition.auditingType;
					this.auditStatus.value= searchCondition.auditingType;
					this.selectOpinion[0].input = searchCondition.projectName;
					this.selectOpinion[1].input = searchCondition.projectNumber;
					this.selectOpinion[2].input = searchCondition.groupName;
					this.selectOpinion[3].input = searchCondition.applicant;
					this.selectOpinion[4].input = searchCondition.auditingName;
					if(searchCondition.startTime){
						this.dateArr=[searchCondition.startTime,searchCondition.endTime];
					}else{
						this.dateArr=[];
					}
					this.tableSelect.projectName = searchCondition.projectName;   //項目名称
					this.tableSelect.projectNumber = searchCondition.projectNumber;  //項目编号
					this.tableSelect.groupName = searchCondition.groupName;  //承作机构
					this.tableSelect.auditingName = searchCondition.auditingName;  //审核人
					this.tableSelect.applicant = searchCondition.applicant;  //申请人
					this.tableSelect.startTime = searchCondition.startTime;  //申请人
					this.tableSelect.endTime = searchCondition.endTime;  //申请人
					this.tableSelect.page = searchCondition.page;
					
				}
			},
      // 取消授权
      // 确定
      cancelAuditSure() {
        var _this = this
        let str = ''
        if (_this.qxworkFs) {
          str += '2'
        }
        if (_this.qxworkQf) {
          str += '3'
        }
        if (str.length > 1) {
          str = '2,3'
        }
        if (str.length > 0) {
          _this.$http.post("/api/authorization/endAuthorization", {
            userId: _this.cancelPerson.id,
            positionType: str
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
          _this.$refs.endDialog.closeDialog();
        } else {
          _this.$message({
            message: '请选择取消授权的类型',
            type: 'warning'
          });
        }
      },
			// 授权取消--关闭弹窗
      closeDialog() {
        this.$refs.endDialog.closeDialog();
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
        if (item.authorizationsBGQF == '1') {
          this.qxworkQf = true
        } else {
          this.qxworkQf = false
        }
        if (item.authorizationsBGSH == '1') {
          this.qxworkFs = true
        } else{
          this.qxworkFs = false
        }
        this.cancelPerson = item
      },
      closeExtrDialog() {
        this.isAllowTime = ''
        this.$refs.centerDialog.closeDialog();
      },
      // 确定授权
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
        let str = ''
        if (_this.workFs) {
          str += '2'
        }
        if (_this.workQf) {
          str += '3'
        }
        if (str.length > 1) {
          str = '2,3'
        }
        if (this.isAllowTime.length > 0 && (this.workFs || this.workQf)) {
          _this.$http.post("/api/authorization/startAuthorization", {
            userId: _this.externalPerson.id,
            positionType :str,
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
          _this.workFs = _this.workQf = false
          _this.isAllowTime = ''
          _this.$refs.centerDialog.closeDialog();
        } else {
           _this.$message({
              message: '时间或授权类型不能为空',
              type: 'warning'
            });
        }
      },
      //授权--打开弹窗
			authorizeSure(item) {
        this.$refs.centerDialog.showDialog();
        this.workFs = this.workQf = false
        this.isAllowTime = ''
        this.externalPerson = item
			},
        // 切换人员列表
      changePersonList (a, b) {
        this.activeIndex = a + 1
      },
      radioStateEvent(val) {
        this.tableSelect.auditingType = val;
        this.selectOpinion[0].auditingType = val
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			examineResultEvent(val) {
        this.tableSelect.tabFlag = val;
        this.selectOpinion[0].tabFlag = val
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			onSubmit() {
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			getSearchVal() {
				this.tableSelect.projectName = this.selectOpinion[0].input;
				this.tableSelect.projectNumber = this.selectOpinion[1].input;
        this.tableSelect.groupName = this.selectOpinion[2].input;
        this.tableSelect.applicant = this.selectOpinion[3].input;
        this.tableSelect.auditingName = this.selectOpinion[4].input;
        this.tableSelect.startTime = this.dateArr && this.dateArr[0] ? this.dateArr[0] : '';
				this.tableSelect.endTime = this.dateArr && this.dateArr[1] ? this.dateArr[1] : '';
			},
			trclick(row) {
				this.$setCookie('projectId', row.id, 24 * 60 * 60);
				this.$store.state.projectId = row.id;
				this.$store.state.isfixedFlag = true;
				this.$router.push({
					path: "/zlpg/project/projectCont/projectAuditing/projectReportAudit/projectInfo"
				});
			},
			resetTable() {
				this.hackReset = false;
				this.$nextTick(() => {
					this.hackReset = true //重建组件
				})
				this.selectOpinion.forEach(item => {
					item.input = ''
				})
				this.dateArr = [];
				this.auditStatus.value = "";
				this.examineResultOptions.value= "";
				// $data用在此处，页面输入框不会置空，且vue文档中不推荐使用$data
				//this.$data.selectOpinion = Object.assign(this.$data.selectOpinion,this.defaultSelectOpinion);
				this.$data.tableSelect = Object.assign(this.$data.tableSelect, this.defaultTableSelect);
				this.$refs.zltable.refreshPage();
      },
      renderPersonList () {
        var _this = this
        _this.carouselPerson = []
        _this.$http.post("/api/sysrole/getReportAuditUser", )
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
      // 下属列表

		},
		components: {
			zltable, centerDialog
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

	.reportList {
		background-color: #fff;
		border-top: 1px solid #ebeef5;
	}

	.el-form-item {
		margin-bottom: 0px;
	}

	.search-row {
		border: 1px solid rgba(236, 236, 236, 1);
		background: #fff;
		padding: 0 30px;
		border-bottom-right-radius: 2px;
		border-bottom-left-radius: 2px;
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

.btn-container {
  position: absolute;
  right: 27px;
  top: 55px;
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
	height: 150px;
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
/deep/ .ipt-wrap {
  position: relative;
}
/deep/ .ipt-wrap .ipt-container{
margin-right: 10px !important;
}
// /deep/ .ipt-wrap .ipt-container:nth-child(4n) {
//   margin-right: 0 !important;
// }
/deep/ .timeData{
	padding-top: 15px;
	span{
		color: #686868;
	}
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
    height: 150px;
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
        >span {
          width: 98px;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
   		margin: 14px auto;
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
		height: 150px !important;
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
</style>
