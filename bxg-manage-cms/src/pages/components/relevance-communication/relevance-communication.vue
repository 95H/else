<template>
  <Card class="relevance-communication">
    <h3>关联沟通计划</h3>
    <Select class="relevance-selsct" style="margin-top:20px;margin-bottom:20px;" placeholder="选择要关联的沟通计划" @on-change="changeValId">
      <Option :title="item.studentName+'内容：'+item.content" v-for="(item, index) in relevanceList" :value="item.id" :key="index">{{item.studentName}}&emsp;&emsp;&emsp;内容：{{item.content}}</Option>
    </Select>
  </Card>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  computed:{
    ...mapState({
      relevanceList : state => state.recordOfCommunication.relevance_data
    })
  },
  methods:{
    changeValId(val){
      this.$emit('planId', val);
    }
  }
}
</script>
<style lang="less" scoped>
//修改 select 样式
.relevance-selsct{
  /deep/ .ivu-select-dropdown{
    width:92%;
    .ivu-select-dropdown-list{
      width: 100%;
    .ivu-select-item{
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    }
  }
}
</style>
