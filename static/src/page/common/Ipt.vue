<template>
  <div class="ipt-wrap">
    <div class="ipt-container" v-for="(item,index) in itemsiptoptions" :key="index">
      <span class="txt">{{item.name}}</span>
      <search-inp v-if="item.key" :style="{width:item.width}" :searchObj="item" @selectVal="selectValFun"></search-inp>
      <el-input v-else style="width:150px;"
                :placeholder="item.holder"
                v-model="itemsiptoptions[index].input"
                clearable>
      </el-input>
    </div>
    <slot name="ipt-date"></slot>
  </div>
</template>
<script>
  import searchInp from "@/components/searchInp.vue";
  export default {
    components: {
			searchInp
		},
    props: {
      itemsiptoptions: Array,
      holder: Array
    },
    methods:{
      selectValFun(item,name){
        for (let i = 0; i < this.itemsiptoptions.length; i++) {
          if(this.itemsiptoptions[i].name===name){
            this.itemsiptoptions[i].input=item
            return
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .ipt-wrap {
    display: flex;
    flex-direction: row;
    height: 56px;
    align-items: center;
    .ipt-container {
      display: flex;
      flex-direction: row;
      margin-right: 20px;
      .txt {
        white-space: nowrap;
        color: #686868;
        font-size: 13px;
        line-height: 25px;
      }
    }
  }
</style>
