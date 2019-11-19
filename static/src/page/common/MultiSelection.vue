<template>
  <el-row type="flex" align="middle" class="multiselection">
    <el-col :span="2">
      <span class="txt">{{ multioptions.txt }}</span>
    </el-col>
    <el-col :span="22">
      <!--<el-radio-group v-model="value">
        <el-radio v-for="(item,index) in singleradiooptions.option" :key="index" :label=item.label @click.native="radioClick(item.label)">{{item.name}}</el-radio>
      </el-radio-group>-->
      <!--<el-checkbox-group v-model="value" @change="multichange">-->
      <!--<el-checkbox v-for="(item,index) in multioptions.option"-->
      <!--:key="index"-->
      <!--:label=item.label></el-checkbox>-->
      <!--</el-checkbox-group>-->

      <el-checkbox v-for="(item,index) in multioptions.option"
                   :key="index"
                   v-model="multioptions.option[index].input"
                   @change="multichange(item)">
        {{item.label}}
      </el-checkbox>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        value: []
      }
    },
    props: {
      multioptions: {
        txt: String,
        option: Array
      }
    },
    methods: {
      multichange(val) {
        this.$emit('onmultichange',val);
      }
    }


  }
</script>
<style scoped lang="scss">
  .multiselection {
    height: 42px;
  }
  // .multi-container{

  // }

  /*border-bottom: 2px dotted rgba(236, 236, 236, 1)*/
  .txt {
    font-size: 13px;
    color: #686868;
  }
</style>
