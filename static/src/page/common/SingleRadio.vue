<template>
  <el-row type="flex" align="middle" class="singeRadio">
    <el-col :span="2">
      <span class="txt">{{ singleradiooptions.txt }}</span>
    </el-col>
    <el-col :span="22">
      <el-radio-group v-model="value">
        <el-radio v-for="(item,index) in singleradiooptions.option" :key="index" :label=item.label @click.native="radioClick(item.label)">{{item.name}}</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data(){
      return {
        value: 1
      }
    },
    props: {
      singleradiooptions: {
        txt: String,
        option: Array
      }
    },
    methods: {
      radioClick(val){
        this.$emit('onradioclick',val)
      }
    }



  }
</script>
<style scoped>
  .singeRadio {
    height: 42px;
    border-bottom: 2px dotted rgba(236, 236, 236, 1)
  }

  .txt {
    font-size: 13px;
    color: #686868;
  }
</style>
