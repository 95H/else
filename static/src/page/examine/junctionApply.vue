	<template>
	<div class="center-body">
		<!--项目信息-->
		<div class="optionalmsg">
			<div class="top">
				<img src="../../assets/common/optional.png"/>
				<span>项目信息</span>
			</div>
			<div class="auditing-info">
				<div class="junctions-Apply">
					<el-row>
					  <el-col :span="12">
					  	<div class="grid-content">
                <label class="itemTitle">项目名称：</label>
                <span>{{ this.$store.state.projectInfo.projectName }}</span>
					  			<!--<p>
					  				项目名称：
					  				<span>{{ this.$store.state.projectInfo.projectName }}</span>
					  			</p>-->
					  	</div>
					  </el-col>
					  <el-col :span="12">
					  	<div class="grid-content">
                <label class="itemTitle">项目编号：</label>
                <span>{{ this.$store.state.projectInfo.projectNumber }}</span>
					  			<!--<p>
					  				项目编号：
					  				<span>{{ this.$store.state.projectInfo.projectNumber }}</span>
					  			</p>-->
					  	</div>
					  </el-col>
					</el-row>
				</div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="结项类型：" prop="finishType">
				    <el-radio-group v-model="ruleForm.finishType">
				      <el-radio label="1099">正常完成</el-radio>
				      <el-radio label="1100">异常终止</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="备注信息：" prop="contenttext">
				    <el-input type="textarea" v-model="ruleForm.contenttext" placeholder="请输入备注信息"></el-input>
				  </el-form-item>
				  <el-form-item label="结项附件：" prop="fileName">
				    <el-upload
						  class="upload-demo"
						  action="/api/projectfinishaudit/getTheFilePath"
              :data="fileData"
              :headers="fileObj"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						  :on-exceed="handleExceed"
              :on-success="uploadFile"
						  :file-list="fileList"
						  :show-file-list="true">
						  <el-button size="small" type="primary">+ 附件上传</el-button>
						  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
						</el-upload>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'junctionApply',
		data() {
			return {
				isShow: true,
				projectData: {},
				ruleForm: {
          finishType: '1099',
          contenttext: '',
          fileMsg: []
        },
        fileList: [],
        rules: {
          finishType: [
            { finishType: true, message: '请选择结项类型', trigger: 'change' }
          ]
        },
        fileData: {
          projectId: this.$store.state.projectId
        },
        fileObj: {},
        filePath: ''
			};
		},

    created(){
      this.fileObj = {token: this.$getCookie('token')};
    },

		methods: {
			//点击提交按钮
			childMethod() {
				var _this = this;
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交结项申请？', '提示信息', {
		        	confirmButtonText: '确定提交',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          _this.sealConfir();
		        }).catch(() => {
		          /*this.$message({
		            type: 'info',
		            message: '已取消操作'
		          });*/

		        });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
    	},
    	//提交接口
    	sealConfir() {

      	var _this = this;
        let files = JSON.stringify(this.ruleForm.fileMsg);
        _this.$http.post("/api/projectfinishaudit/insertProjecJuncTions",{
        	//项目id
        	projectId: this.$store.state.projectId,
					//文件信息
          docJson: files,
					//结项类型
					finishType: this.ruleForm.finishType,
					//备注信息
					contenttext: this.ruleForm.contenttext,

          investorId: this.$store.state.projectInfo.investorId

        }).then(function(res){
          _this.$message({
          	showClose: true,
            type: 'success',
            message: '结项申请提交成功!'
          });
          setTimeout(() => {
            _this.$store.commit('changeShowCommon');
          }, 2000);

          _this.$store.state.refresh();
          _this.$store.state.refresh = false;
          _this.$store.state.refreshT = false;
          _this.$nextTick(() => {
						_this.$store.state.refreshT = true;
						_this.$store.state.refresh = true;
					});

	         //结项显示/隐藏
          _this.$store.state.rejunction();
        }).catch(function (error) {
					_this.$messageError(error);
				});
      },
      handleRemove(file, fileList) {
			  let list = [];
        if(fileList.length){
          fileList.forEach((item, index)=>{
            let obj = {};
            obj.fileName = item.name;
            obj.filePath = item.response.data.fileDir
            list.push(obj);
          })
        }
        this.ruleForm.fileMsg = list;
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$messageWarning(`本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      uploadFile(res, file, fileList) {
			  let arr = [];
        this.fileList = fileList;
        fileList.forEach((item, index)=>{
          let obj = {};
          obj.fileName = item.name;
          obj.filePath = item.response.data.fileDir
          arr.push(obj);
        })
        this.ruleForm.fileMsg = arr;
      }
		}
	}
</script>

<style scoped="scoped" lang="scss">
.center-body{
	padding: 20px;
	.el-row{
		padding-bottom: 18px;
	}
	.el-row:last-child {
		padding-bottom: 0;
	}
	.grid-content{
		min-height: 40px;
		line-height: 30px;
    overflow: hidden;
		.itemTitle{
      float: left;
			font-size:13px;
			color: #777777;
		}
    span{
      float: left;
      font-size:13px;
      color: #1D1C1E;
      width: 70%;
    }
	}
	.optionalmsg {
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
		.auditing-info /deep/{
			padding: 10px 40px 20px 40px;
			.junctions-Apply{
				border-bottom: dotted 1px #E1E1E1;
			}
			.demo-ruleForm{
				.el-form-item{
					margin-bottom: 0px;
				}
				.el-form-item:last-child{
					margin-top: 5px;
				}
				.el-form-item__label{
					text-align: left !important;
					width: 78px !important;
				}
				.el-form-item__content{
					margin-left: 78px !important;
				}
				.el-button--primary{
					background: #fff !important;
					color: #3A80EC;
				}
			}
		}
	}
}

</style>
