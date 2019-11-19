<template>
	<div class="powerAllocation">
		<div>
			<div class="powerAllocation-title">分配管理公司</div>
			<div class="powerAllocationBox">
          <ul>
            <li>任务人</li>
            <li>管理公司</li>
          </ul>
          <div>
          	<el-form ref="listForm" v-model="jobList" label-width="80px" v-for="(item, index) in jobList" :key='index'>
	          	<el-form-item>
						    <el-select v-model="item.jober" placeholder="薛成鑫">
						      <el-option label="马洪燕" value="shanghai"></el-option>
						      <el-option label="陕国平" value="beijing"></el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item v-model="item.companyName">
						  	<ol class="jobDataCompany">
						  		<li v-for="(item,index) in item.companyName" :key="index">
						  			{{ item }}
						  		</li>
						  		<li class="edit-btn">
						  			<span @click='editCompany(index)'>+ 编辑负责公司</span>
						  		</li>
						  	</ol>
						  </el-form-item>
						</el-form>
          </div>
          <div class="marginBottom5 addListBtn">
            <el-button @click="addList"> + 新增</el-button>
          </div>
      	</div>
		</div>

	  <!-- 编辑管理公司穿梭框 begin -->
	  <div class="EidtTransferBox" v-if='show'>
	  	<div class="mask"></div>
		  <div class="transferBox">
		  	<div class="transferBox-title">评估作业任务分配</div>
		  	<div class="transferBox-cont">
		  		<el-transfer 
		  		v-model="value1" 
		  		:data="data" 
		  		:titles="['管理公司', '分配结果']"
		  		></el-transfer>
		  	</div>
		  	<div class="transferBox-but">
		  		<el-button class="submit" type="primary" @click="editSubmit">确认提交</el-button>
		  		<el-button class="abolish" type="primary" @click="editAbolish">取消</el-button>
		  	</div>
		  </div>
	  </div>	
	  <!-- 编辑管理公司穿梭框 end -->
	</div>
</template>

<script>
	export default {
		name: 'powerAllocation',
		data() {
			//管理公司
			const generateData = _ => {
        const data = [];
        const companyData = [
		      {name:'陕西南瑞有限公司',id:'121'},
		      {name:'国电南瑞有限公司',id:'122'},
		      {name:'南京南瑞有限公司',id:'123'},
		      {name:'四川南瑞有限公司',id:'124'},
		      {name:'广州南瑞有限公司',id:'125'}
        ];
        companyData.forEach((city, index) => {
          data.push({
            label: city.name,
            key: index,
            id:city.id
          });
        });
        return data;
      };
			return {
				data: generateData(),   //管理公司
        value1: [],							//管理公司中右侧的值
				activeName: 'first',
				show: false,
				editCompanyData: [],
				index: '',
				jobList: [{
	          jober: '',//人id
	          companyIds:'',
	          companyId:[],  //公司id
	          companyName:[],//公司名称
	          subjects:'',
	          subjectsId:'', //科目id
	          subjectsName:'',//科目名称
	          operate: ''      //操作
	        }]
			};
		},
		created(){
			//console.log(editCompanyData);
    },
    methods:{
      addList() {    //追加一行新数据
        this.jobList.push(this.addListData());
	    },
	    addListData() {
	    	return {
					jobList: [{
	          jober: '',//人idsss
	          companyIds:'',
	          companyId:[],  //公司id
	          companyName:[],//公司名称
	          subjects:'',
	          subjectsId:'',//科目id
	          subjectsName:''//科目名称
	        }]
				}
	    },
	    deleteList(item) {  //删除所在行数据
	    	var index = this.jobList.indexOf(item);
        if (index !== -1) {
          this.jobList.splice(index, 1)
        }
	    },
			editCompany(index){  //点击负责公司中的编辑
				this.show = true;
				this.index = index;
				this.value1 = [];
			},
			editAbolish(){  //点击负责公司中的取消
				this.show = false;
			},
			editSubmit(){  //点击负责公司中的确认提交
				var _this = this;
				_this.editCompanyId = [];   //获取接口中公司的label值;
				_this.editCompanyData = [];     //获取接口中公司的id;
				for(var i in _this.value1){
					_this.editCompanyData.push(_this.data[_this.value1[i]].label);  
					_this.editCompanyId.push(_this.data[_this.value1[i]].id);
					
				}
				this.jobList[this.index].companyName = _this.editCompanyData;
				this.jobList[this.index].companyId = _this.editCompanyId;
				this.jobList[this.index].companyIds = this.jobList[this.index].companyId.join(",");
				
				//判断右侧内容是否为空
				if(_this.value1.length == 0){
					this.$messageError('右侧内容不能为空！');
					this.show = true;
				}else{
					this.show = false;
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
.powerAllocation{
	.powerAllocation-title{
		background: #FAFAFA;
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 22px;
		font-size: 14px;
		color:#145FD2;
		border-bottom: solid 1px #efefef;
		position: relative;
		box-sizing: border-box;
	}
	.powerAllocation-title:after{
		content:'';
		border-bottom: solid 1px #145FD2;
		position: absolute;
    bottom: 0px;
    left: 17px;
    width: 95px;
	}
	.powerAllocationBox {
		padding: 15px 20px 12px 20px;
	  ul {
	    height: 32px;
	    background: #f6faff;
	    border: 1px solid #e5e5e5;
	    width: 100%;
	    line-height: 32px;
	    display: flex;
	    box-sizing: border-box;
	    li {
	      text-align: center;
	      border-left: 1px solid rgba(229,229,229,1);
	      font-size:13px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:rgba(38,38,40,1);
	    }
	    li:first-child {
	      width: 140px;
	      border-left:none;
	    }
	    li:nth-child(2){
	      flex: 1;
	      -ms-flex:1 0 auto;
	    }
	    li:nth-child(3){
	      flex: 1;
	      -ms-flex:1 0 auto;
	    }
	    li:last-child {
	      width: 140px;
	    }
	  }
	  .el-form /deep/{
	  	width: 100%;
	  	display: flex;
	  	.el-form-item {
		    margin-bottom: 0;
		    padding: 10px 20px;
		    border: solid 1px #E5E5E5;
		    border-top: none;
		    display: -webkit-box;
		  	-webkit-box-pack: center;
		  	-webkit-box-align: center;
		  	-webkit-box-orient: vertical;
		    .jobDataCompany {
		    	li{
		    		float: left;
		    		margin-right: 30px;
		    		font-size: 13px;
		    		color: #6A6A6A;
		    		line-height: 22px;
		    	}
		    	/*li:nth-child(3n){
		    		margin-right: 0;
		    	}*/
		    	.edit-btn{
			    	span{
			    		color: #145FD2;
			    		font-size:12px;
			    		font-weight: 400;
			    	}
			    }
		    }
		    .edit-btn{
		    	span{
		    		color: #145FD2;
		    		font-size:12px;
		    		font-weight: 400;
		    	}
		    }
		    .keepBtn{
		    	color: #145FD2;
		    	text-align: center;
		    	cursor:pointer;
		    }
		    .cancel{
		    	color: #F09237;
		    	text-align: center;
		    	cursor:pointer;
		    }
		    :first-child {
		      margin-left: 0!important;
		    }
		    >div {
		      text-align: center;
		      .el-input {
		        height: 29px;
		        line-height: 29px;
		        .el-input__inner{
		        	border-radius: 2px;
		        	max-width: 73px;
		        	color: #909090;
		        	font-size: 13px;
		        }
		      }        
		    }
		    .el-form-item__content{
		  		display: -webkit-box;
		  	  -webkit-box-pack: center;
		  	  -webkit-box-align: center;
		  	}
		  }

		  .el-form-item:first-child{
	  		width: 141px;
	  		box-sizing: border-box;
	  		border-right: none;
		  }
		  .el-form-item:nth-child(2){
		  	flex: 1;
		  	-ms-flex:1 0 auto;
		  	border-right: none;
		  }
		  .el-form-item:nth-child(3){
		  	flex: 1;
		  	-ms-flex:1 0 auto;
		  }
		  .el-form-item:last-child{
		  	width: 141px;
		  	box-sizing: border-box;
		  	border-left: none;	  	
		  }
	  }
	  
	  .addListBtn {
	    margin-top: 8px;
	    button {
	        height:25px;
	        border-radius:2px;
	        border:1px solid rgba(58,128,236,1);
	        font-size:13px;
	        font-family:PingFangSC-Regular;
	        font-weight:400;
	        color:rgba(58,128,236,1);
	        padding: 5px 20px;
	    }
	  }
	}

	.transferBox{
		width: 100%;
		background: #fff;
		border: solid 1px #efefef;
		padding-bottom: 15px;
		position: absolute;
		top: 5px;
		left: 0;
		z-index: 1119;
		.transferBox-title{
			height: 35px;
	    background: #fafafa;
	    border-radius: 2px 2px 0px 0px;
	    border: 1px solid #ececec;
	    border-left: 0;
	    border-right: 0;
	    line-height: 35px;
	    text-align: center;
	    font-size: 14px;
	    margin-bottom: 15px;
		}
		.transferBox-cont{
			display: -webkit-box;
		  -webkit-box-pack: center;
		  -webkit-box-align: center;
		}	
		/deep/ .transferBox-but{
			margin: 15px auto 10px;
			text-align: center;
			.submit{
				padding: 8px;
    		font-size: 13px;
			}
			.abolish{
				padding: 8px 18px;
    		font-size: 13px;
    		background: #fff !important;
    		border: solid 1px #efefef;
    		color: #3A80EC;
			}
		}
	}
}
</style>