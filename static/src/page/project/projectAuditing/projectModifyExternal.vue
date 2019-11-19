	<template>
	<div class="center-body">
		<div class="optionalmsg">
			<!--修改信息 begin-->
			<div class="top">
				<span><i class="iconfont icon-xiangmugaikuang marginRight10"></i>修改信息</span>
			</div>
			<div class="auditing-info">
				<el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="修改原因：" prop="contenttext">
				    <el-input type="textarea" v-model="form.contenttext" placeholder="请输入修改原因"></el-input>
				  </el-form-item>
				  <el-form-item label="修改附件：" prop="fileName">
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
			<!--修改信息 end-->
		</div>
		<!-- 修改涉及标地 begin -->
		<div class="projectAudits">
			<div class="top">
				<span><i class="iconfont icon-xiangmugaikuang marginRight10"></i>修改涉及标地</span>
			</div>
			<div class="conpanyCont">
				<ul v-if="companyListData.length>0">
          <li v-for="(item, index) in companyListData" :label="item" :key="index">
          	<p>{{ item.investorName }}</p>
          </li>
				</ul>
				<div class="noData" v-else>暂无数据</div>
			</div>
		</div>
		<!-- 修改涉及标地 end -->
	</div>
</template>

<script>
	export default {
		name: 'projectModifyExternal',
		data() {
			return {
				isShow: true,
				checkedData: [],
				form: {
          contenttext: '',
          fileMsg: []
        },
        fileList: [],
        investorIdValue: '',
        fileData: {
          projectId: this.$store.state.projectId
        },
        fileObj: {},
        filePath: '',
        companyListData: ''  //修改涉及标地数据
			};
		},

    created(){
    	/*console.log(this.$store.state.dataObj);
    	console.log(this.$store.state.getCheckKeyData.join(","));*/
      this.fileObj = {token: this.$getCookie('token')};
      //1代表左侧树送审按钮、2代表单个按钮
      if(this.$store.state.dataObj == 1){
      	this.investorIdValue = this.$store.state.getCheckKeyData.join(",");
      }else{
      	this.investorIdValue = this.$store.state.investorId;
      }
      this.trialList();
    },

		methods: {
			//点击提交按钮
			childMethod() {
				var _this = this;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交报告修改申请？', '提示信息', {
		        	confirmButtonText: '确定提交',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          _this.onlineTrial();
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
      //修改涉及标地接口
      onlineTrial() {
        var _this = this;
        //let files = JSON.stringify(_this.form.fileMsg);
        for(var i=0; i < _this.form.fileMsg.length; i++){
        	_this.checkedData.push({
	          fileName: _this.form.fileMsg[i].fileName,
	          filePath: _this.form.fileMsg[i].filePath
	        })
        }
        let dataJson = {
          projectId: _this.$store.state.projectId,
          investorIds: _this.investorIdValue,
          remarksContent: _this.form.contenttext,
          filePathJson: JSON.stringify(_this.checkedData)
        }
        //console.log(dataJson);
        _this.$http.post('/api/changeInvestors/sendChangeInvestors',dataJson)
        .then(function (data) {
          _this.$message({
            showClose: true,
            type: 'success',
            message: '外审修改申请成功!'
          });
          setTimeout(() => {
            _this.$store.commit('changeShowCommon');
          }, 2000);

          _this.$store.state.auditTree = !_this.$store.state.auditTree;   //刷新左侧树
          _this.$store.state.auditData = !_this.$store.state.auditData;   //刷新外审数据
//          _this.$parent.getLeftTree();
        }).catch(function (error) {
          _this.$messageError(error);
        });
      },
      //线上送审接口
      trialList() {
        var _this = this;
        _this.$http.post('/api/changeInvestors/findInvestorName',{
        	projectId: _this.$store.state.projectId,
          investorIds: _this.investorIdValue
        })
        .then(function (data) {
          _this.companyListData = data.data;
          //console.log(_this.companyListData);
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
        this.form.fileMsg = list;
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
        this.form.fileMsg = arr;
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
			span {
				display: inline-block;
				margin-left: 10px;
				font-size: 13px;
				font-weight: 600;
				i {
          color: #98C268;
        }
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

.projectAudits {
	background: rgba(255, 255, 255, 1);
	padding-bottom: 10px;
	.top {
		height: 35px;
		background: #fafafa;
		border-radius: 2px 2px 0px 0px;
		border: 1px solid rgba(236, 236, 236, 1);
		line-height: 35px;
		font-size: 13px;
		font-weight: 600;
		span{
			margin-left: 10px;
			i {
        color: #98C268;
      }
		}
	}
	.conpanyCont{
		overflow: hidden;
		padding: 15px 40px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-top: 0;
		ul{
			li {
				line-height: 30px;
				font-size: 13px;
				color: #1D1C1E;
			}
		}
	}
}
</style>
