<template>
  <el-row type="flex" align="middle" class="singeRadio">
    <el-col :span="2">
      <span class="txt">{{ singleradiooptions.txt }}</span>
    </el-col>
    <el-col :span="22">
      <el-radio-group v-model="value">
        <el-radio v-for="(item,index) in singleradiooptions.option" :key="index" :label=item.label @change="radioClick(item.label)" v-if="!item.zyisShow">{{item.name}}</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data(){
      return {
        value: ''
      }
    },
    props: {
      singleradiooptions: {
        txt: String,
        option: Array
      }
    },
    mounted() {
      //debugger
      let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path && searchCondition.singleradiooption){
      	this.value = searchCondition.singleradiooption;
      }else if(this.$store.state.status && (this.singleradiooptions.txt == '状态分类：' || this.singleradiooptions.txt == '审核级别：')){
         if(this.singleradiooptions.value){
          this.value=this.singleradiooptions.value
        }else{
          this.value = this.$store.state.status;
        }
			}else{
        if(this.singleradiooptions.value){
          this.value=this.singleradiooptions.value
        }else{
          for(var i = 0;i< this.singleradiooptions.option.length;i++) {
            if(this.singleradiooptions.option[i].zyisShow != true) {
              this.value = this.singleradiooptions.option[i].label;
              return;
            }
          }
          this.value = this.singleradiooptions.option[0].label;
        }
      }
		},
    methods: {
      radioClick(val){
        this.$emit('onradioclick',val)
      }
    }



  }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
	.singeRadio {
		height: 42px;
	    .txt {
		    font-size: 13px;
		    color: #686868;
		}/*
		/deep/ .el-radio{
			min-width: 80px;
		}
		/deep/ .el-radio-group{
			/deep/ .el-radio+.el-radio{margin-left: 10px;}
		}*/
	}
</style>
