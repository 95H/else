<template>
	<div class="ratingValue-content">
		<div class="ratingValue-Box">
			<!-- 右侧选项 begin -->
      <div class="ratingValue-rightList">
        <div class="rightList-title">价值比率选择</div>
        <div>
        	<el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
	          <el-checkbox v-for="(item, index) in equipments" :label="item" :key="index">
	            {{ item.userNames }}
	          </el-checkbox>
	        </el-checkbox-group>
        </div>
      </div>
      <!-- 右侧选项 end -->
      <!-- 左侧数据 begin -->
      <div class="ratingValue-leftList">
        <ul v-if="checked.length > 0" v-for="(item, index) in ratingValueData" :label="item" :key="index"><!--  -->
          <li>
          	<p>价值比率：{{ item.name }}</p>
          	<p>{{ item.value }}</p>
          	<p>计算公式：{{ item.formula }}</p>
          	<i class="iconfont icon-fujianwendang" @click='remarksCont(item,index)'>
          	</i>
          	<!-- 备注 begin -->
			      <div class="remarksDialog" v-if='remarkShow'>
			      	{{ item.remarks }} 
			      </div>
			      <!-- 备注 end -->
          </li>
				</ul>
				<div class="noData" v-else>暂无数据</div>
      </div>
      <!-- 左侧数据 end -->
    </div>
	</div>
</template>

<script>
	export default {
		name: "ratingValue",
		data() {
			return {
				isAbled:false,     //不可编辑
				createData: [],      //传给后台选中的PB等值
				remarkShow: false,
				equipments: [
					{
						"userNames":"PE",
						"checked":false
					},
					{
						"userNames":"PB",
						"checked":false
					},
					{
						"userNames":"PS",
						"checked":false
					},
				],    
				checked: [],       //默认选中
				ratingValueData: 
				[{
						name: 'PE',
						value: '预测年度利润（万元）',
						formula: '除以然后乘以',
						remarks: '备注信息啊啊'
				},
				{
						name: 'PB',
						value: '净资产（万元）',
						formula: '除以然后乘以',
						remarks: '备注信息啊啊'
				},
				{
						name: 'PS',
						value: '营业收入（万元）',
						formula: '除以然后乘以',
						remarks: '备注信息啊啊'
				}
				]
			};
		},
		created() {
      
		},
		mounted() {
			var _this = this;

			//_this.externalAuditList();
		},
		methods: {
			handleCheckedCitiesChange(value) {
				this.createData = [];
        value.forEach(item => {
	        this.createData.push({
            companyId: item.userNames
          })
	      });
	      //console.log(this.createData);
        this.rightDataList();
      },
      //右侧数据
      externalAuditList(){
				var _this = this;
        _this.$http.post('/api/changeInvestors/findCoTrialPerson',{
          investorId: _this.$store.state.investorId
        }).then(function (data) {
          _this.equipments = data.data;
        }).catch(function (error) {
          _this.$messageError(error);
        });
			},
			//左侧数据
			rightDataList() {
				
			},
			//备注数据
			remarksCont(item,index) {
				console.log(index);
				console.log(this.ratingValueData[index]);
				this.remarkShow = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
.ratingValue-content {
	.ratingValue-Box {
    display: flex;
    width: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 0px 2px 2px;
    padding: 10px;
    .ratingValue-rightList {
      width: 180px;
      background: white;
      border-radius: 2px;
      border: 1px solid #ececec;
      padding: 5px 10px;
      box-sizing: border-box;
      .rightList-title{
      	border-bottom: 1px solid rgba(229, 229, 229, 1);
      	font-size: 13px;
      	height: 20px;
      	line-height: 20px;
      	margin-bottom: 10px;
      }
    }
    .ratingValue-leftList {
      flex: 1;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 2px 0px rgba(189, 189, 189, 0.5);
      border: 1px solid rgba(229, 229, 229, 1);
      margin-left: 10px;
      padding: 5px 10px;
      >ul {
      	li {
      		border: solid 1px rgba(229, 229, 229, 1);
      		padding: 5px 8px;
      		margin-bottom: 10px;
      		font-size: 13px;
      		display: flex;
      		position: relative;
      		.remarksDialog {
			    	position: absolute;
			    	top: 20px;
	    			right: -1px;
			    	background: #fff;
			    	border: solid 1px rgba(229, 229, 229, 1);
			    	padding: 10px;
			    	display: inline-block;
			    }
      		p {
      			flex: 1;
      		}
      	}
      }
    }
  }
  /deep/ .el-checkbox-group{
    label{
      display: block !important;
      margin-bottom: 10px;
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0 !important;
    }
  }
  /deep/ .iconfont{
  	font-size: 13px;
  	margin-top: -1px;
  }
}
</style>
