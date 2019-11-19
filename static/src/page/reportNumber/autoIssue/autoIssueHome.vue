<template>
	<div class="autoIssue-box zlpg-content marginTop10">
		<div class="zlpg-content-header">
			<ul class="list-group">
				<li v-for="(tabItem,index) in tabs" :key="index" @click="changeTab(tabItem.id)"><a :class="{'is-active': tabItem.id==active}">{{tabItem.title}}</a></li>
			</ul>
		</div>
    <div class="autoIssue-content  marginTop10 ">
      <div class="autoIssue-content-header ">
        <span class="search-btn width100" @click="addRecheckMan">新增复审人</span>
      </div>
      <div class="userList padding20">
        <el-table
          :data="tableList"
          border
          stripe
          style="width: 100%"
          size="mini"
          :span-method="arraySpanMethod"
          @cell-mouse-enter= 'highLight'
          @cell-mouse-leave= 'cancleHighLight'
          :row-class-name= 'tableRowClassName'
          v-if="hackReset && refreshQ"
        >
          <el-table-column
            prop="recheckPersonName"
            label="复审人"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="gradeName"
            label="等级"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="natureName"
            label="性质"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="deptName"
            align="center"
            label="部门">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span class="operateBtn" @click="editRules(scope.row)">编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="delete" @click="delRecheckMan(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="white-bg">
				<div class="pagination-con  text-center" v-if="totalDataNum > 10">
					<pagination ref="pagination" v-if="hackReset" :pagesize="pagesize" :totalDataNum="totalDataNum" v-on:currentPageFn="currentPageFn"></pagination>
				</div>
			</div>
    </div>
		<!--<div class="autoIssue-content padding10">
			<div class="autoIssue-content-left">
				<h3><i class="iconfont icon-tiaozheng"></i> 调整优先级</h3>
				<ul>
					<li v-for="(priority,index) in priorityList" :key="index" @click.stop="selectUser(priority.id,priority.checkTypeId)">
						<span>{{priority.checkType}}</span>
						<div class="fr">
							<el-button type="text" :disabled="index==0" @click.stop="changeSort(priority.checkSort,'up')"><i class="iconfont icon-top"></i></el-button>
							<el-button type="text" :disabled="index==priorityList.length-1" @click.stop="changeSort(priority.checkSort,'down')"><i class="iconfont icon-bottom"></i></el-button>
						</div>
					</li>
					<li @click="showDialog('resetDefaultRef')"><span>默认</span></li>
				</ul>
			</div>
			<div class="autoIssue-content-right">
				<a href="javascript:;" class="reset-btn addIssueItem" @click="addIssueItem('')">+增加</a>
				<el-table :data="tableList.records" stripe border @row-click="openAddIssue">
					<el-table-column align="center" label="序号" width="50">
						<template slot-scope="scope">
							{{scope.$index+1}}
						</template>
					</el-table-column>
					<el-table-column prop="checkName" align="center" :label="categoryName" width="180"></el-table-column>
					<el-table-column prop="checkRoleName" align="center" label="角色" width="250"></el-table-column>
					<el-table-column prop="checkAuditorName" align="center" label="审核人员"></el-table-column>
				</el-table>
				<div class="pagination-container" v-if="tableList.total > 10">
					<el-pagination class="text-center marginTop10" :page-size="10" background layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="tableList.current" :total="tableList.total">
					</el-pagination>
				</div>
			</div>
		</div>
		<center-dialog ref="resetDefaultRef" dialogTitle="恢复默认排序" dialogWidth='320px' dialogHeight="210px" titlePosition="left">
			<div slot="dialogContent">
				<div class="resetDefaluteBox">
					<p>确认恢复默认排序吗？</p>
					<p class="orange">（默认排序为按级别、按部门、按性质排序）</p>
					<div class="text-center">
						<a href="javascript:;" class="search-btn" @click="resetDefault">确定</a>
						<a href="javascript:;" class="reset-btn" @click="closeDialog('resetDefaultRef')">取消</a>
					</div>
				</div>
			</div>
		</center-dialog>-->
	</div>
</template>
<script>
  import centerDialog from '@/components/centerDialog';
  import pagination from '@/components/pagination.vue';
  export default{
    components: {centerDialog,pagination},
    data () {
      return {
        tabs : [
          {
            id : 'BGSH',
            title : "复审分配"
          },
          {
            id : 'BGQF',
            title : "签发分配"
          }
        ],
        active : 'BGSH',
        tableList : [],
        spanArr: [],
        sameRowArr: [],
        curRowArr: [],
        totalDataNum: 0,        //分页条数
      	pagesize: 10,           //分页10条
	      page: 1,
	      hackReset: true,
	      dialogTitle: '',         //详情标题
	      judge: '',
				refreshQ:this.$store.state.refreshQ
      }
    },

    created () {
      this.getData();   //列表数据
    },

    computed: {

    },

    methods: {
    	//切换选项卡
      changeTab(index) {
        this.active = index;
        this.getData();
      },

      //点击编辑
      editRules(row) {
	      this.addRecheckMan(row);
    	},

			//点击分页
      currentPageFn(val) { 
				this.page = val;
				this.getData();
			},

			//点击删除
      delRecheckMan(row) {
        this.$confirm('正在删除复审人, 确定删除吗?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { 
        	this.delRecheckData(row);
        }).catch(() => {

        });
      },

      //删除接口
      delRecheckData(row) {
      	this.$http.post('api/allocationManage/deleteAllotByRecheckPerson', {
      		checkSign: this.active,
	        recheckPersonId: row.recheckPersonId
	      }
	      ).then(res=>{
	      	//console.log(res);
	      	this.$message({
						showClose: true,
						type: 'success',
						message: '删除成功!',
					});
					this.$forceUpdate();
					this.hackReset = false //销毁组件
					this.$nextTick(() => {
					 	this.getData();    //刷新列表数据
					  this.hackReset = true //重建组件
					})
					
	      }).catch(err=>{
	      	this.$messageError(err);
	      })
      },

      //列表数据接口
      getData() {
        this.$http.post('api/allocationManage/findAutoAllotList', {
          checkSign: this.active}
        ).then(res=>{
        	this.totalDataNum = res.data.total * 1;
          this.tableList = res.data.records;
          //console.log(this.tableList);
          this.getSpanArr(res.data.records);
          this.getSameRowArr(res.data.records);
        }).catch(err=>{

        })
      },

      highLight(row, column, cell, event) {
        this.sameRowArr.forEach((arr, index) => {
          if (arr.indexOf(row.index) !== -1) {
            this.curRowArr = arr;
          }
        })
      },

      cancleHighLight(row, column, cell, event) {
        this.curRowArr = []
      },

      tableRowClassName({row, rowIndex}) {
        // debugger
        let termArr = this.curRowArr;
        termArr.forEach((item, index) => {
          if(rowIndex == termArr[index]) {
            return 'row_class'
          }
        })
      },

      handleHead(arr) {
        let dataArr = [];
        let obj = {}
        for(let i= 0; i< arr.length; i++) {
          dataArr.push(arr[i].recheckPersonName);
        }
        dataArr.forEach((item, index) => {
          if (obj.hasOwnProperty(item)) {
            obj[item] += 1;
          } else {
            obj[item] = 1;
          }
        })
        return obj
      },

      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          let _row = this.spanArr[rowIndex];
          let _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },

      getSpanArr(data) {
      	this.spanArr = [];
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].recheckPersonId === data[i - 1].recheckPersonId) {
              this.spanArr[this.pos] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.pos = i;
            }
          }
        }
      },

      getSameRowArr(data) {
        data.forEach((item, index) => {
          item.index = index;
          if (index === 0) {
            this.idx = 0;
            this.sameRowArr.push([index]);
          }else {
            if (item.recheckPersonName === data[index-1].recheckPersonName) {
              this.sameRowArr[ this.idx].push(index);
            }else {
              this.idx += 1;
              this.sameRowArr.push([index]);
            }
          }
        })
      },

      addRecheckMan(row) {
      	//console.log(row);
        /*this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '新增复审人';
        this.$store.state.commonBtn = '提交';
        this.$store.state.componentsType = 'addIssue';*/

        var _this = this;
				if(row.id) {
					_this.dialogTitle = '修改复审规则'
					_this.judge = false;
				} else {
					_this.dialogTitle = '新增复审人';
					_this.judge = true;
					_this.checkSign = 'BGSH';
				}

				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = _this.dialogTitle;
				this.$store.state.componentsType = 'addIssue';
				this.$store.state.commonBtn = '提交';
				this.$store.state.dataObj = {
					row: row,
					judge: _this.judge
				};
				this.$store.state.refresh = function() {
					 	_this.getData();    //刷新列表数据
				}
      }

    },


  }
	/*import centerDialog from '@/components/centerDialog'
  export default {
    components: {centerDialog},
    data() {
      return {
				tabs : [{
					id : 'BGSH',
					title : "复审分配"
				},
				{
					id : 'BGQF',
					title : "签发分配"
				}],
				active : 'BGSH',
				tableList : [],
				priorityList : [],
				categoryName : "",
				currentId : '',    //当前优先级Id
				currentType : '',
			}
    },
    created() {
      this.getData();
		},
		watch : {
			$route(){
				this.active = "BGSH";
				this.getData();
			}
		},
    methods: {
			// 查询某个优先级状态下的人员
			selectUser(id,checkTypeId,params){
				params = params || {};
				params.checkSortId = id;
				this.$http.post('/api/checkAllot/findAutoAllotList',params).then(data => {
					this.tableList = data.data;
					this.categoryName = this.filterCategoryName(id);
					this.currentId = id;
					this.currentType = checkTypeId;
				}).catch(err => {
					this.$messageError(err);
				})
			},
			// 获取数据
			getData(){
				this.$http.post('/api/checkAllot/adjustmentPriorityList',{
					checkSign : this.active
				}).then(res => {
					this.priorityList = res.data;
					this.currentId = res.data[0].id;
					this.currentType = res.data[0].checkTypeId;
					this.selectUser(this.currentId,this.currentType);
				}).catch(err => {
					this.$messageError(err);
				})
			},
			// table表头过滤
			filterCategoryName(val){
				switch(val){
					case 1:
					case 4:
					case '1364':
						return "项目级别"
						break
					case 2:
					case 5:
					case '1365':
						return "所属部门"
						break
					case 3:
					case 6:
					case '1366':
						return "项目性质"
						break
				}
			},
			// 选项卡切换
			changeTab(index){
				this.active = index;
				this.getData();
			},
			// 调整优先级
			changeSort(checkSort,allotButton){
				this.$http.post('/api/checkAllot/adjustmentPriority',{
					checkSign : this.active,
					allotButton : allotButton,
					checkSort : checkSort
				}).then(res => {
					this.$messageSuccess("优先级调整成功");
					this.getData();
				}).catch(err => {
					this.$messageError(err);
				})
			},
			// 新增规则
			addIssueItem(flag){
				this.$store.commit('changeShowCommon');//固定
				this.$store.state.commonTitle = this.filterCategoryName(this.currentType) + '分配'; //弹框名称
				this.$store.state.commonBtn = '保存'; //按钮名称 （没有按钮传空）
				this.$store.state.componentsType = 'addIssue'; //要调用组件的名称
				this.$store.state.dataObj = { //需要传递的参数
					refreshFun : this.getData, //刷新列表的方法
					addIssueType : this.active,
					currentType : this.currentType,
					currentId : this.currentId
				}
				if(flag){
					this.$store.state.extraBtn = '删除'; //第二个按钮名称 （没有不传）
					this.$store.state.dataObj.IssueItem = flag;
				}
			},
			// 编辑规则
			openAddIssue(row){
				this.addIssueItem(row);
			},
			// 恢复默认排序
			resetDefault(){
				this.changeSort('','default');
				this.closeDialog('resetDefaultRef');
			},
			// 打开弹窗
			showDialog(refsName){
				this.$refs[refsName].showDialog();
			},
			// 关闭弹窗
			closeDialog(refsName){
				this.$refs[refsName].closeDialog();
			},
			//切换分页
			handleCurrentChange(val){
				this.selectUser(this.currentId,this.currentType,{
					page : val
				})
			}
		}
  }*/
</script>
<style scoped lang="scss">
	/deep/ .white-bg{
		margin-bottom: 20px;
	}
	.autoIssue-box{
		.list-group{ background-color:#FAFAFA;}
    .autoIssue-content{background-color:#fff; border: 1px solid #ECECEC;
      .autoIssue-content-header{
        height: 35px;  line-height: 35px;  background: rgba(249, 249, 249, 1);  border-radius: 2px;  border-bottom: 1px solid rgba(236, 236, 236, 1);  font-size: 13px;  color: #262628;  text-align: right;  padding-right: 20px;
      }
      .operateBtn{color: #409EFF; cursor: pointer;}
      .delete{color: #F09237; cursor: pointer;}
      .row_class{background-color: red}
    }
    /deep/ .el-table--border{
    	border-bottom: none;
    }
		/*.autoIssue-content{
			background-color:#fff;
			border:1px solid #E5E5E5;
			display:flex;
			.autoIssue-content-left{
				width:180px;
				box-sizing:border-box;
				border:1px solid #E5E5E5;
				>h3{
					height:32px;
					line-height:32px;
					border-bottom:1px solid #E5E5E5;
					background-color:#F6FAFF;
					padding-left:10px;font-size:13px; font-weight:bold;
					>i{ font-size:18px; color:#5FA9EC; float:left; margin-right:3px;}
				}
				ul li{ line-height:48px; border-bottom:1px solid #E5E5E5; color:#6A6A6A; font-weight:bold; font-size:13px; padding:0 25px; cursor:pointer;
					&:hover{ background-color:#F9F9F9; color:#145FD2;}
					.el-button{
						&+.el-button{ margin-left:0;}
						i{ color:#C0C0C0; font-size:18px;
							&:hover{ color:#5FA9EC;}
						}
						&[disabled] i:hover{ color:#C0C0C0;}
					}
				}
			}
			.autoIssue-content-right{
				box-sizing:border-box;
				flex:1;
				margin-left:10px;
				position:relative;
				/deep/ .el-table__empty-block {
					height: 300px;
					background: url(../../../assets/common/nodata.png) no-repeat center;
					.el-table__empty-text {
						margin-top: 100px;
						font-size: 13px;
					}
				}
				.addIssueItem{
					position: absolute;
					right:10px;
					top:4px;
					z-index:9;
				}
			}
		}
		.resetDefaluteBox{
			padding-top:25px;
			>p{
				text-align:center;
				font-size:13px;
				line-height:25px;
			}
			>div.text-center{
				padding-top:30px;
			}
		}*/
	}
</style>
