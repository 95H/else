<template>
	<div class="sumAll">
		<div class="tableTop clear">
			<div class="selectYear fl">
				<label class="fs13">统计时间：</label>
				<el-select v-model="year" class="marginRight10 width200" @change="changeYear">
					<el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<span class="search-btn fr" @click="handleOutput()">
					<i class="fs12 white iconfont icon-daochu "></i> 导出
			</span>
		</div>
		<div class="assetBased-table" v-for="(item,index) in tabArr" :key="index" v-if="item.sheetGroupId==curTableId && flag">
			<table-more-sum :tableHeader="tableDataJson" :curSheetName="item.sheetGroupId"  :sheetNameBool="item.sheetGroupId==curTableId" :sheetName="curTableId" :year="year"></table-more-sum>
		</div>
		<div class="sumAll-foot" v-if="tabArr.length>0">
			<scroll-tab :tabArr="tabArr" :isSelectM="true" width="100%" ref="scrollTab" :isFullPart="false" @tabClick="changeTabSheet"></scroll-tab>
		</div>
	</div>
</template>

<script>
	import scrollTab from "@/components/scrollTab2";
	import tableMoreSum from "@/components/tableMoreCopy";
	import tableDataJson from "@/page/fullPageModule/thead.js";
	export default {
		components: {
			scrollTab,
			tableMoreSum,
			tableDataJson
		},
		data() {
			return {
				//项目汇总
				yearOptions: [], //统计年份
				year: "",
				tabArr: [], //项目汇总scrollTab（省份）
				tableData: "", //项目汇总表头
				tableDataJson:[],
				fullData:[], //全部数据
				curTableId: '',
				checkList:[],//导出选中项
				flag: true
			};
		},
		created() {
			let _this = this;
			this.tableDataJson = tableDataJson
			if(/usertask/g.test(this.$store.state.status)) {
				this.$store.state.status = "";
			}
			this.$http.post("/api/project/findPjCollectSheet", {})
			.then(res => {
				this.tabArr = res.data; //项目汇总scrollTab
				this.fullData = res.data;
				this.curTableId = res.data[0].sheetGroupId;
			}).catch(error => {
				this.$messageError(error);
			})
		},
		mounted() {
			//项目汇总统计时间
			let thisYear = new Date().getFullYear() * 1;
			this.year = thisYear
			for(let i = thisYear; i >= 2018; i--) {
				this.yearOptions.push({
					value: i,
					label: i
				});
			}
		},
		methods: {
			handleOutput() {
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '数据导出';
				this.$store.state.commonBtn = '确定';
				this.$store.state.componentsType = 'dataExport';
				this.$store.state.dataObj = {
					tabArr: this.tabArr,
					year: this.year
				};
				
			},
      changeTabSheet(val){
      	this.curTableId = val.sheetGroupId;
      },
			/**展示全部 */
      showAll(){
        //需要默认展示第一条数据
        var _this = this;
        this.tabArr =  this.fullData;
        this.$refs.scrollTab.active = 0;
        if(this.tabArr[0].sheetGroupId== this.curTableId) return;
        this.tabClick(_this.tabArr[0]);
        this.curTableId = this.tabArr[0].sheetGroupId;
        this.$store.state.curSheetName =  this.curTableId;
        this.curTableId = this.tabArr[0].sheetGroupId;
         _this.$refs.scrollTab.initMarginLeft();
      },
      changeYear(){
      	this.flag = false;
      	this.$nextTick(() => {
					this.flag = true; //重建组件
				});
      }
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	//项目汇总
	.sumAll {
		border: 1px solid #ececec;
		border-top: none;
		background: #fff;
		margin-top: -12px !important;
		padding: 13px 15px 15px 15px;
		.selectYear {
			margin-bottom: 10px;
			label {
				color: #636363;
			}
		}
		.sumAll-foot {
			/deep/ .scrollTab {
				.scrollTab-wrap {
					.scroll-tab-con .scroll-tab .scroll-tab-item {
						border-right: 1px solid #ECECEC;
					}
				}
			}
		}
	}
</style>