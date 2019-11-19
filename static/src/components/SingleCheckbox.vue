<template>
	<el-row type="flex" align="middle" class="singeCheckbox">
	    <el-col :span="2">
	      <span class="txt">{{ singleradiooptions.txt }}</span>
	    </el-col>
	    <el-col :span="2">
	    	<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
	    </el-col>
	    <el-col :span="20">
			  <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
			    <el-checkbox v-for="(item ,index) in singleradiooptions.option" :label="item.id*1" :key="index">{{item.name}}</el-checkbox>
			  </el-checkbox-group>
			</el-col>
	</el-row>
</template>
<script>
  export default {
//  data(){
//    return {
//      value: 1
//    }
//  },
//  props: {
//    singleradiooptions: {
//      txt: String,
//      option: Array
//    }
//  },
//  methods: {
//    radioClick(val){
//      this.$emit('onradioclick',val)
//    }
//  }
		data() {
      return {
        checkAll: true,
        checked: [],
        checkbox:[],
        isIndeterminate: false
      };
    },
    props: {
      singleradiooptions: {
        txt: String,
        option: Array,
        optionId: Array
      }
    },
    created(){
      let _this = this;
      for(var i = 0;i < this.singleradiooptions.optionId.length;i++){
        this.singleradiooptions.optionId[i] *= 1 
      }
      for(var i = 0;i < this.singleradiooptions.option.length;i++){
        this.checkbox.push(this.singleradiooptions.option[i].id*1);
      }
      this.checked = this.singleradiooptions.optionId;
      this.$store.state.chooseData = this.checked;
      if(this.checked.length){
        this.checkAll = true;
        this.isIndeterminate = this.checked.length < this.singleradiooptions.option.length;
      }else{
        this.checkAll = false;
        this.isIndeterminate = false;
      }

    },
    methods: {
      handleCheckAllChange(val) {
      	this.checked = val ? this.checkbox : [];
		    this.isIndeterminate = false;
      	this.$emit('onradioclick',val)
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.singleradiooptions.option.length;
        this.checkName = this.singleradiooptions.option.name;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.singleradiooptions.option.length;
        this.$emit('onradioclick',checkedCount,value)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
	.singeCheckbox {
		height: 42px;
	    .txt {
		    font-size: 13px;
		    color: #686868;
		}
		/*/deep/ .el-checkbox{
			min-width: 80px;
		}
		/deep/ .el-checkbox-group{
			/deep/ .el-checkbox{margin-left: 10px;}
		}*/
	}
   .search-con .txt {
		    font-size: 13px;
		    color: #262628!important;
		}
</style>
