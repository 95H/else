<template>
  <div class="wrapper">
  	<!-- 价值比率 begin -->
    <div class="info-box marginTop15">
    	<div class="tableTitle">
    		<p>价值比率</p>
    	</div>
      <table class="gridtable worthTable" v-if="worthRateList">
      	<tr>
					<td>PE</td>
					<td>
						<div v-if="worthRateList.peRatio" class="Editable">
							<div v-if='dataShow || !this.$store.state.readonly' class="bg-gray">
								{{worthRateList.peRatio && worthRateList.peRatio.title || '--'}}
							</div>
	            <input v-else maxlength="11" type="text" v-model="worthRateList.peRatio.title" class="input bg-gray" @change="handleInputBlur(worthRateList.peRatio,$event)" placeholder="--" />
	          </div>
					</td>
					<td>PB</td>
					<td>
						<div v-if="worthRateList.pbRatio" class="Editable">
							<div v-if='dataShow || !this.$store.state.readonly' class="bg-gray">
								{{worthRateList.pbRatio && worthRateList.pbRatio.title || '--'}}
							</div>
	            <input v-else maxlength="11" type="text" v-model="worthRateList.pbRatio.title" class="input" @change="handleInputBlur(worthRateList.pbRatio,$event)" placeholder="--"/>
	          </div>
					</td>
					<td>PS</td>
					<td>
						<div v-if="worthRateList.psRatio" class="Editable">
							<div v-if='dataShow || !this.$store.state.readonly' class="bg-gray">
								{{worthRateList.psRatio && worthRateList.psRatio.title || '--'}}
							</div>
	            <input v-else maxlength="11" type="text" v-model="worthRateList.psRatio.title" class="input" @change="handleInputBlur(worthRateList.psRatio,$event)" placeholder="--"/>
	          </div>
					</td>
				</tr>
				<tr v-if="tableShow">
					<td>交易买方</td>
					<td>
						<div v-if="worthRateList.transactionBuyer" class="Editable">
							<div v-if='!this.$store.state.readonly' class="bg-gray">
								{{ worthRateList.transactionBuyer && worthRateList.transactionBuyer.title || "--" }}
							</div>
	            <input v-else type="text" v-model="worthRateList.transactionBuyer.title" class="input bg-gray" @change="handleInputBlur(worthRateList.transactionBuyer,$event)" placeholder="--"/>
	          </div>
					</td>
					<td>股票代码</td>
					<td>
						<div v-if="worthRateList.stockCode" class="Editable">
							<div v-if='!this.$store.state.readonly' class="bg-gray">
								{{ worthRateList.stockCode && worthRateList.stockCode.title || "--" }}
							</div>
	            <input v-else onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" type="text" v-model="worthRateList.stockCode.title" class="input" @change="handleInputBlur(worthRateList.stockCode,$event)" placeholder="--"/>
	          </div>
					</td>
					<td>交易基准日</td>
					<td>
						<div v-if="worthRateList.dateOfAssessment" class="EditableData">
							<div v-if='!this.$store.state.readonly' class="bg-gray"> <!--  -->
								{{ worthRateList.dateOfAssessment && worthRateList.dateOfAssessment.title || "--" }}
							</div>
							<el-date-picker v-else v-model="worthRateList.dateOfAssessment.title" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change="handleInputBlur(worthRateList.dateOfAssessment,$event)"></el-date-picker>
	          </div>
					</td>
				</tr>
				<tr v-if="tableShow">
					<td>股比</td>
					<td>
						<div v-if="worthRateList.stockRatio" class="Editable">
							<div v-if='!this.$store.state.readonly' class="bg-gray">
								{{ worthRateList.stockRatio && worthRateList.stockRatio.title || "--" }}
							</div>
	            <input v-else type="text" v-model="worthRateList.stockRatio.title" class="input" @change="handleInputBlur(worthRateList.stockRatio,$event)" placeholder="--"/>
	            <p>%</p>
	          </div>
					</td>
					<td>交易对价（万元）</td>
					<td>
						<div v-if="worthRateList.transactionConsideration" class="Editable">
							<div v-if='!this.$store.state.readonly' class="bg-gray">
								{{ worthRateList.transactionConsideration && worthRateList.transactionConsideration.title || "--" }}
							</div>
	            <input v-else maxlength="11" type="text" v-model="worthRateList.transactionConsideration.title" class="input" @change="handleInputBlur(worthRateList.transactionConsideration,$event)" placeholder="--"/>
	          </div>
					</td>
					<td>过会日期</td>
					<td>
						<div v-if="worthRateList.dateOfMeeting" class="EditableData">
							<div v-if='!this.$store.state.readonly' class="bg-gray">
								{{ worthRateList.dateOfMeeting && worthRateList.dateOfMeeting.title || "--" }}
							</div>
							<el-date-picker v-else v-model="worthRateList.dateOfMeeting.title" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change="handleInputBlur(worthRateList.dateOfMeeting,$event)"></el-date-picker>
	          </div>
					</td>
				</tr>
				<tr v-if="this.$store.state.fileFlag != '0'">
					<td>经营范围</td>
					<td class="remarks" colspan="5">
						<div v-if='!this.$store.state.readonly' class="bg-gray padding010">
							{{ worthRateList.remarks && worthRateList.remarks.title || "--" }}
						</div>
						<div v-else-if="worthRateList.remarks">
							<input type="text" v-model="worthRateList.remarks.title" class="input" @change="handleInputBlur(worthRateList.remarks,$event)" placeholder="--"/>
						</div>
					</td>
				</tr>
			</table>
    </div>
    <!-- 价值比率 end -->
    <!-- 财务指标 begin -->
    <div class="info-box marginTop15">
    	<div class="tableTitle">
    		<p>财务指标</p>
    	</div>
    	<div class="businessTable">
        <table-group ref="financeList" idName="financeList" :data="financeList"></table-group>
      </div>
    </div>
    <!-- 财务指标 end -->
    <!-- 业务指标 begin -->
    <div class="info-box marginTop15">
    	<div class="tableTitle">
    		<p>业务指标</p>
    	</div>
    	<div class="businessTable">
				<table-group ref="serviceList" idName="serviceList" :data="serviceList"></table-group>
      </div>
    </div>
    <!-- 业务指标 end -->
	</div>
</template>

<script>
  import tableGroup from '@/page/fullPageModule/market/table-group';
  export default{
    components: {tableGroup},
    data () {
      return {
        tableList : [],
        dataShow: false,     //被评估单位的PE,PB,PS不能输入
        mettingShow: false,   
	      tableShow: false,    //上市公司比较法只显示PE,PB,PS
	      financeList: {},   //财务指标数据
	      serviceList: {},   //业务指标数据
	      worthRateListData: [],   //业务指标
        financeListHead: [], 
	      // 财务指标宽度
	      financeListWidth : {},
	      // 业务指标宽度
	      serviceListWidth : {
	      	terminalMarketGrowthRates: "190px",
	      	quantityProportion: "110px"
	      },
	      worthRateList: {}
      }
    },
    created () {
    	var _this = this;
    	//判断显示隐藏价值比率数据
			_this.decideData();
      _this.getData();   //列表数据
    },
    watch:{
    	//监听价值比率数据
	    "$route.query.way" () {
	    	this.decideData();
			}, 
			//监听是评估总览还是公司数据
			"$store.state.fileFlag" () {
		    this.decideData();
			},
			"$store.state.companyId" () {
				this.getData();   //列表数据
			},
			"$store.state.investorId" () {
				this.getData();   //列表数据
			},
	  },
    methods: {
    	decideData () {
    		if(this.$route.query.way == 'trade') {
    			this.dataShow = true;	
					if(this.$store.state.fileFlag == "0"){
						this.tableShow = false;
					}else {
						this.tableShow = true;	
					}				
				} else {
					this.tableShow = false;
					if(this.$store.state.fileFlag == "0"){
						this.dataShow = true;
					}else{
						this.dataShow = false;
					}
				}
    	},
			//input框失去焦点事件
			handleInputBlur (scope,event){
		    //判断一个value是日期格式还是普通数字。如果是日期格式则判断格式是否正确，不属于正确的日期格式则设置为当前日期
      	let val = typeof scope.title === "object" ? (scope.title instanceof Date && !isNaN(scope.title.getTime()) ? scope.title : new Date()) : scope.title.replace(/,/g,'');

		    //交易对价和股比校验
				if(scope.keyValue=='stockRatio' || scope.keyValue=='transactionConsideration'){
					if(val=='' || isNaN(val)){
						this.$messageError('内容不能为空或数字不合法!');
          	event.currentTarget.style.border="1px solid #f00";
					}else{
						if(scope.keyValue == 'stockRatio' && (/\./.test(val) || val>100 || val<=0)){
							this.$messageError("请输入1-100的整数");
							event.currentTarget.style.border="1px solid #f00";
							return;
						}
						this.savelVal(scope,event,val);
						event.currentTarget.style.border="none";
					}
				}else if(/pbRatio|peRatio|psRatio/.test(scope.keyValue)){
					if(val=='' || isNaN(val)){
						this.$messageError('内容不能为空或数字不合法!');
						event.currentTarget.style.border="1px solid #f00";
						return;
					}
					this.savelVal(scope,event,val);
				}else{
					this.savelVal(scope,event,val);
				}
			},
			//修改之后保存数据
			savelVal(scope,event,val) {
				this.$http.post('/api/marketTransit/UpdateFinance',{
	        id : scope.id,
	        columnKey : scope.keyValue,
	        value : scope.title,
	        projectId : this.$store.state.projectId,
	        investorId : this.$store.state.investorId,
	        caseType: this.$route.query.way == 'trade' ? "2" : "1",
	        companyId : !/listed|trade/.test(this.$store.state.companyId) ? this.$store.state.companyId : ""
	      }).then(res=>{
	      	this.$messageSuccess(res.msg);
	        this.getData();
	      }).catch(err => {
	        this.$messageError(err);
	      })
			},
      //公司详情数据接口
      getData() {
      	var _this = this;
        _this.$http.post('api/marketTransit/getcompanyDetails', {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          caseType:  _this.$route.query.way == 'trade' ? "2" : "1",
          companyId: !/listed|trade/.test(_this.$store.state.companyId) ? _this.$store.state.companyId : ''
        }).then(res=>{
					for(let item in res.data.worthRateList){
						if(res.data.worthRateList[item].title && !isNaN(res.data.worthRateList[item].title.replace(/,/g,''))){
							res.data.worthRateList[item].title = String(res.data.worthRateList[item].title).replace(/(?:\.0*|(\.\d+?)0+)$/,'$1');
						}
					}
					_this.worthRateList = res.data.worthRateList;
          //console.log(_this.worthRateList);
          _this.financeList = res.data.financIndic;        //财务指标
					if(_this.$refs.serviceList) _this.$refs.serviceList.delZero(res.data.financIndic);
		      if(_this.$refs.financeList) _this.$refs.financeList.setTdWidth(res.data.financIndic.tableHead,_this.financeListWidth);
		      _this.serviceList = res.data.business;     //业务指标
					//console.log(_this.serviceList);
					if(_this.$refs.serviceList) _this.$refs.serviceList.delZero(res.data.business);
					if(_this.$refs.serviceList) _this.$refs.serviceList.setTdWidth(res.data.business.tableHead,_this.serviceListWidth);
					_this.$store.state.tableExist = res.data.tableExist;   //报表是否有数据。用来判断上侧报表tab是否显示
        }).catch(err=>{
        	_this.$messageError(err);
        })
      },

      //input框获取焦点事件   弃用！！！
    	tableDbEdit(scope,event) {
	    	if(event.target.style.display !== "block" && scope.keyValue !== 'dateOfAssessment' && scope.keyValue !== 'dateOfMeeting'){
	        event.target.childNodes[1].style.display = "block";
	        event.target.childNodes[1].focus();
	      }
	      //交易基准日
	      if(scope.keyValue == 'dateOfAssessment'){
					this.dataShow = true;
	      }
	      //过会日期
	      if(scope.keyValue == 'dateOfMeeting'){
	      	this.mettingShow = true;
	      }
     	},
		},
		mounted(){
			this.$store.state.getCompanyData = ()=>{
				this.getData();
			}
		}
  }
</script>
<style scoped lang="scss">
.info-box{
	.tableTitle{
  	display: flex;
  	margin-bottom: 5px;
  	p{
  		font-size:13px;
  		color:rgba(38,38,40,1);
  		margin-left: 15px;
  		font-weight:500;
  		position: relative;
  	}
  	p:after{
  		content: '';
  		width: 6px;
  		height: 6px;
  		background:rgba(240,146,55,1);
  		border-radius: 50%;
  		position: absolute;
	    left: -15px;
	    top: 50%;
	    margin-top: -3px;
  	}
  }
}

/deep/ .el-table__row:last-child .cell span{
  background: #fff !important;
	color: #6a6a6a !important;
	font-weight: normal !important;
}
/deep/ .el-table--border td:first-child .cell span{
  background: #F8F8F8 !important;
}
/deep/ .el-input__suffix{ display:none;}
table.gridtable {
	width: 100%;
	font-family: verdana,arial,sans-serif;
	font-size: 13px;
	color: #333333;
	border:solid 1px #E5E5E5;
	border-collapse: collapse;
}
table.gridtable td {
	border:solid 1px #E5E5E5;
	height: 28px;
	vertical-align: middle;
	line-height: 28px;
	background-color: #ffffff;
	box-sizing: border-box;
	text-align: center;
  font-size:12px;
  color:rgba(106,106,106,1);
  position: relative;
}
table.worthTable tr td:nth-child(odd){
	background-color: rgba(248,248,248,1);
	width: 180px;
	text-align: left;
	padding-left: 8px;
}
table.worthTable tr td:nth-child(even){
	width: 180px;
}
table.worthTable tr:nth-child(4) td{
	text-align: left;
}

table.gridtable th {
	border:solid 1px #E5E5E5;
	padding: 8px;
	background: rgba(248,248,248,1);
	line-height: 18px;
}

table.financeTable tr td:first-child , table.businessTable tr td:first-child{
	background-color: rgba(248,248,248,1);
}
/deep/ .el-table .el-table__header-wrapper .has-gutter th{
	text-align: center;
	background-color: rgba(248,248,248,1);
}

/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td{
	background: #fff;
}

/deep/ .gridtable tr td{
  .Editable {
  	width: 100%;
  	height: 28.5px;
  	.bg-gray{
  		height: 100%;
  	}
  	input {
  		position: absolute;
			top: 0;
			left: 0;
			height: 26.5px;
	    width: 100%;
	    height: 100%;
	  	border: none;
	    box-sizing: border-box;
			text-align: center;
	    background: #fff;
	    outline: none;
    	font-size: 12px;
    	&:focus { 
    		border:1px solid rgb(136,198,255);
    	}
  	}
  	p{
  		position: absolute;
  		right: 5px;
  		top: 50%;
  		margin-top: -13.5px;
  	}
  }
  .EditableData {
  	width: 100%;
  	height: 100%;
  	.el-date-editor.el-input {
  		position: absolute;
  		top: -1px;
  		left: 0;
  		width: 100%;
  	}
  }
}
/deep/ .remarks{
	div p{
		padding-left:10px;
	}
	input {
		position: absolute;
		top: 0;
		left: 0;
		height: 28px;
    width: 100%;
  	border: none;
    box-sizing: border-box;
		text-align: left;
    background: #fff;
    outline: none;
  	font-size: 12px;
  	padding-left: 10px;
  	&:focus { 
  		border:1px solid rgb(136,198,255);
  	}
	}
}

/deep/ .el-input--suffix .el-input__inner{
	border: none;
}

/deep/ .el-date-editor.el-input{
	width: auto;
}

</style>
