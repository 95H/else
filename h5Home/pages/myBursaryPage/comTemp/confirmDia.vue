<template>
	<div class="confirmWarp">
		<el-dialog
		  :show-close=false
		  top="35%"
		  :close-on-click-modal=false
		  :visible="dialogVisible"
		  center>
		 <p class="boxTitle">{{title}}</p>
		  <p class="boxContent">{{content}}</p>
		  <span slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="closeLayer">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
	 	name:'confirmDia',
	 	props:['title','content','dialogVisible'],
	    data() {
	      return {

	      };
	    },
	    methods: {
	    	closeLayer (){
				this.$emit('closeDialog',false);
			}
	    }
	  }
</script>

<style lang="less">
	@import "../../../static/css/variable.less";
	.confirmWarp{
		width: 100%;
		height: 100%;
		.el-dialog{
			height: 10.25rem !important;
			.border-radius(unit(12/@u,@uu));
		    width:84%;
		    overflow:hidden;
		    .el-dialog__header{
			    display:none;
			}
			.el-dialog__body{
			    font-size:unit(36/@u,@uu);
			    color:#000;
			    padding: unit(60/@u,@uu) unit(80/@u,@uu) unit(60/@u,@uu) unit(80/@u,@uu);
			    overflow:hidden;
			    text-align:center;
			    .boxTitle{
			    	font-size: unit(36/@u,@uu);
			    	margin-bottom: unit(14/@u,@uu);
			    }
			    .boxContent{
			    	color: @color9;
			    	font-size: unit(26/@u,@uu);
			    }
			}
			.el-dialog__footer{
				border-top:1px solid #eee;
			    padding:0;
			    .dialog-footer{
			    	display:flex;
    				flex-flow:row nowrap;
    				.el-button{
    					flex:1;
					    margin:0;
					    border:none;
					    height:unit(100/@u,@uu);
					    font-size:unit(36/@u,@uu);
					    border-bottom-right-radius: 0;
					    -webkit-border-bottom-right-radius: 0;
					    border-top-right-radius:0;
					    -webkit-border-top-right-radius:0;
					    color:@primaryColor;
					    background: none;
    				}
    				.cancel{
    					background: #fff;
    					color: @color9;
    				}
			    }
			}
		}
	}
</style>