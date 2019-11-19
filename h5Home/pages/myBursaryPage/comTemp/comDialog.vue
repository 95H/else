<template>
	<div class="dialogWarp">
		<el-dialog
			:show-close=false
			top="35%"
			:close-on-click-modal=false
			:visible="dialogVisible">
			<p class="boxTitle">{{title}}</p>
			<p class="boxContent" v-if="content!=''">{{content}}</p>
			<p class="boxContent2" v-if="contentGery!=''">{{contentGery}}</p>
			<span slot="footer" class="dialog-footer">
		    <el-button class="cancel" @click="closeLayer">取 消</el-button>
		    <el-button type="primary" @click="bindEvent">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	 export default {
	 	name:'comDialog',
	 	props:['title','content','dialogVisible','contentGery'],
	    data() {
	      return {
	        
	      };
	    },
	    methods: {
	    	closeLayer (){
				this.$emit('closeDialog',false);
			},
	    	bindEvent (){
	    		this.$emit('saveWithdraw')
	    	}
	    	
	    }
	  }
</script>

<style lang="less">
	@import "../../../static/css/variable.less";
	.dialogWarp{
		width: 100%;
		height: 100%;
		.el-dialog{
			.border-radius(unit(12/@u,@uu));
		    width:80%;
		    height:unit(296/@u,@uu);
		    overflow:hidden;
		    .el-dialog__header{
			    display:none;
			}
			.el-dialog__body{
			    font-size:unit(36/@u,@uu);
			    color:#000;
			    padding: unit(60/@u,@uu) unit(20/@u,@uu) unit(57/@u,@uu) unit(20/@u,@uu);
			    overflow:hidden;
			    text-align:center;
			    .boxTitle{
			    	font-size: unit(36/@u,@uu);
			    	margin-bottom: unit(14/@u,@uu);
			    }
			    .boxContent{
			    	color: @primaryColor;
			    	font-size: unit(26/@u,@uu);
			    }
			    .boxContent2{
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
					    &:nth-child(2){
						     border-bottom-left-radius: 0;
						     -webkit-border-bottom-left-radius: 0;
						     border-top-left-radius:0;
						     -webkit-border-top-left-radius:0;
						     border-bottom-right-radius: unit(8/@u,@uu);
						     -webkit-border-bottom-right-radius: unit(8/@u,@uu);
						}
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