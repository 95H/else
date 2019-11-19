<template>
	<div class="center-body">
		<!--新增信息-->
		<div class="optionalmsg">
			<div class="top">
				<img src="../../assets/common/optional.png"/>
				<span>新增信息</span>
			</div>
			<div class="auditing-info">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="报告类型：" prop="name">
					  <el-input v-model="ruleForm.name" placeholder="评估报告"></el-input>
					</el-form-item>
					<el-form-item label="规则常量：" prop="reportRuleConstant">
					  <el-input v-model="ruleForm.reportRuleConstant" placeholder="中联评字报"></el-input>
					</el-form-item>
					<el-form-item label="日期：" prop="dateMiddle">
				    <!-- <el-col :span="8">
				      <el-input v-model="ruleForm.dateLeft" readonly="readonly" placeholder="【 "></el-input>
				    </el-col>
				    <el-col class="line" :span="8">
				    	<el-input v-model="ruleForm.dateMiddle" placeholder="2018"></el-input>
				    </el-col>
				    <el-col :span="8">
				      <el-input v-model="ruleForm.dateRigth" readonly="readonly" placeholder="】 " class="bracketsRight"></el-input>
				    </el-col> -->
				    <el-date-picker
				      v-model="ruleForm.dateMiddle"
				      type="year"
				      format="yyyy"
				      value-format="yyyy"
				      placeholder="请选择年份">
				    </el-date-picker>
				  </el-form-item>
				  <el-form-item label="规则常量：" prop="rulePage">
				    <el-input v-model="ruleForm.rulePage" placeholder="第"></el-input>
				  </el-form-item>
				  <el-form-item label="起始码：" prop="startPageNum">
				    <el-input class='startCode' v-model="ruleForm.startPageNum" placeholder="00001" @keyup.native="number"></el-input>
				  </el-form-item>
				  <el-form-item label="规则常量：" prop="pageRuleConstant">
				    <el-input v-model="ruleForm.pageRuleConstant" placeholder="号"></el-input>
				  </el-form-item>
				  <el-form-item label="报告号预览：" prop="previewNum">
				  	<!-- <p class="numberPreview" v-if='showTypeEdit'>
				  		{{ this.ruleForm.name + this.ruleForm.reportRuleConstant + this.ruleForm.dateLeft + this.ruleForm.dateMiddle + this.ruleForm.dateRigth + this.ruleForm.rulePage + this.ruleForm.startPageNum + this.ruleForm.pageRuleConstant }}
				  	</p> -->
				  	<p class="numberPreview" v-if='showType'>	
				  		{{ this.ruleForm.reportRuleConstant + this.ruleForm.dateLeft + this.ruleForm.dateMiddle + this.ruleForm.dateRigth + this.ruleForm.rulePage + this.ruleForm.startPageNum + this.ruleForm.pageRuleConstant }}
				  	</p>
				  </el-form-item>
				</el-form>

			</div>
		</div>
	</div>
</template>

<script>
export default {
		name: 'sealInfo',
		data() {
			return {
				preview: '',
				showType: true,
				showTypeEdit: false,
				ruleForm: {
          name: '',                 
          reportRuleConstant: '',
          rulePage: '',
          startPageNum: '',
          pageRuleConstant: '',
          dateLeft: '【 ',
          dateMiddle: '',
          dateRigth: '】 ',
          previewNum: ''
        },
        rules: {
          name: [
            { required: true, trigger: 'change' }
          ],
          reportRuleConstant: [
            { required: true, trigger: 'change' }
          ],
          dateMiddle: [
            { required: true, trigger: 'change' }
          ],
          rulePage: [
            { required: true, trigger: 'change' }
          ],
          startPageNum: [
            { required: true, trigger: 'change' }
          ],
          pageRuleConstant: [
            { required: true, trigger: 'change' }
          ]

        }

			};
		},
		created(){
			//console.log(this.$store.state.dataObj);
			//删除按钮不显示报告类型
			/*if(this.$store.state.extraBtn == '删除'){
				this.showTypeEdit = true;
				this.showType = false;
			}
			//提交按钮不显示报告类型
			if(this.$store.state.commonBtn == '提交'){
				this.showTypeEdit = true;
				this.showType = false;
			}else {
				this.showTypeEdit = false;
				this.showType = true;
			}*/
			//console.log(this.$store.state.commonBtn);
    },
    mounted() {
    	this.preview = this.ruleForm.reportType + this.ruleForm.reportRuleConstant + this.ruleForm.dateLeft + this.ruleForm.dateMiddle + this.ruleForm.dateRigth + this.ruleForm.rulePage + this.ruleForm.startPageNum + this.ruleForm.pageRuleConstant;    	
    	this.ruleForm = this.$store.state.dataObj;
    	//console.log(this.ruleForm.dateMiddle);
    },
		methods: {
			number(){　　
		　　　this.ruleForm.startPageNum = this.ruleForm.startPageNum.replace(/[^\.\d]/g,'');
		    this.ruleForm.startPageNum = this.ruleForm.startPageNum.replace('.','');
		　　},
			//新增，保存按钮
			childMethod() {
				var _this = this;
        this.$refs["ruleForm"].validate((valid) => {
        	if(!valid){
        		this.$messageError('必填项不能为空！');
        		return
        	}
          if (valid) {
            this.$confirm('确认保存此项目？', '提示信息', {
		        	confirmButtonText: '确定保存',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          _this.sealConfir();
		        }).catch(() => {
		          /*this.$message({
		            type: 'info',
		            message: '已取消操作'
		          }); */ 
		        
		        });

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //删除按钮
      extraChildMethod() {
      	var _this = this;
        _this.$confirm('确认删除此项目？', '提示信息', {
        	confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.delete();
        }).catch(() => {
          /*this.$message({
            type: 'info',
            message: '已取消操作'
          });*/    

        });
      },
      sealConfir() {

      	var _this = this;

        _this.$http.post("/api/reportNumSetting/saveOrUpdateNumberSetting",{
        	//报告类型
        	name: this.ruleForm.name,
					//规则常量
					reportRuleConstant: this.ruleForm.reportRuleConstant,
					//日期括号
					dateLeft: '【',
					//日期
					dateMiddle: this.ruleForm.dateMiddle,
					//日期括号
					dateRigth: '】',
					//规则常量
					rulePage: this.ruleForm.rulePage,
					//起始码
          startPageNum: this.ruleForm.startPageNum,
          //规则常量
          pageRuleConstant: this.ruleForm.pageRuleConstant,
          //id
          id: this.$store.state.dataObj.id

        }).then(function(res){
          _this.$message({
          	showClose: true,
            type: 'success',
            message: '项目保存成功!'
          });
          //刷新表格
          _this.$store.state.refresh();
          setTimeout(() => {
          	_this.$store.commit('changeShowCommon');
          }, 2000);
          //location.reload();   //刷新页面
	          
        })
      },
      delete() {
      	var _this = this;
        _this.$http.post("/api/reportNumSetting/delNumberSetting",{
          //id
          id: this.$store.state.dataObj.id

        }).then(function(res){
            _this.$message({
            	showClose: true,
	            type: 'success',
	            message: '项目删除成功!'
	          });
	          //刷新表格
	          _this.$store.state.refresh(); 
	          setTimeout(() => {
              _this.$store.commit('changeShowCommon');
            }, 2000);
        })
      }

		}
	}
</script>

<style scoped="scoped" lang="scss">
.center-body {
	padding: 20px;
	.optionalmsg {
		width: 760px;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-top: 0;
		margin-bottom: 10px;
		.top {
			height: 35px;
			background: #fafafa;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-left: 0;
			border-right: 0;
			line-height: 35px;
			img {
				display: inline-block;
				width: 12px;
				height: 12px;
				margin-left: 20px;
			}
			span {
				display: inline-block;
				margin-left: 10px;
				font-size: 13px;
				font-weight: 600;
			}
		}
		.auditing-info{
			padding: 10px 40px 20px 40px;
			.numberPreview{
				border: solid 1px #e2e3e4;
				padding-left: 5px;
				height: 25px !important;
			  line-height: 25px !important;
			  margin-top: 7px;
			  border-radius: 4px;	
			  background: #f9f9f9;
			}
			.numberPreview:before{
				color:lightgrey;
				content:attr(placeholder);
			}
		}
	}
}
/deep/ .el-form-item{
	margin-bottom: 0;
}
/deep/ .el-form-item__error{
	display: none !important;	
}
/deep/ .bracketsRight .el-input__inner{
	text-align: right;
}
/deep/ .el-date-editor.el-input{
	width: 100%;
}

/* 谷歌 */
/deep/ .startCode input::-webkit-outer-spin-button,
.startCode input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    appearance: none !important; 
    margin: 0 !important; 
}
/* 火狐 */
/deep/ .startCode input[type="number"]{
  -moz-appearance:textfield !important;
}


</style>