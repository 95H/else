<template>
	<div class="projectProjectAudit-zlpg-content zlpg-content clear">
		<div class="projectMessage">项目信息</div>
		<div class="projectAudit">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="审核结果：">
				    <el-radio-group v-model="form.audit">
				      <el-radio :label="form.agree">通过</el-radio>
				      <el-radio :label="form.disagree">不通过</el-radio>
				    </el-radio-group>
				</el-form-item>
				<el-form-item label="审核意见：">
    				<el-input type="textarea" v-model="form.idea"></el-input>
  				</el-form-item>
  				<el-form-item>
				    <el-button type="primary" @click="onSubmit">确认提交</el-button>
				    <el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>

<script>
	export default {
	    data() {
	      	return {
	        	form: {
		          	audit:'',
		          	idea:'',
		          	disagree:'',
		          	agree:''
	        	}
	      	}
	    },
	    mounted(){
	    	var _this = this;
	    	this.$http.post('/api/projectRequest/getActivityInfo ',{
	    		projectId:this.$store.state.projectId
	    	})
			.then(function(data) {
				console.log(data);
				_this.form.audit = data.data.agree;
				_this.form.disagree = data.data.disagree;
				_this.form.agree = data.data.agree;
			})
			.catch(function(error) {
				_this.$messageError(error);
			});
	    },
	    methods: {
	      	onSubmit() {
	      		console.log(this.form);
	        	var _this = this;
	      		this.$confirm('确认提交本次审核意见?', '提示', {
		          confirmButtonText: '确认提交',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.$http.post('/api/projectRequest/auditRequest',{
						projectId:this.$store.state.projectId,
						projectNumber:"",
						majorRisk:_this.form.idea,
						setupAuditStatus:_this.form.audit
					})
					.then(function(data) {
						_this.$message({
				            type: 'success',
				            message: '提交成功!'
				        });
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
			          
		        }).catch(() => {
		          _this.$message({
		            type: 'info',
		            message: '已取消提交'
		          });          
		        });
	      	}
	    }
  	}
</script>

<style scoped lang="scss">
	.projectProjectAudit-zlpg-content {
		padding: 20px;
		.projectMessage {
			width: 100%;
			height: 300px;
		}
		.projectAudit {
			border-top: 1px solid #ccc;	
		}
	}
</style>