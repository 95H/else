<template>
    <div>
      <nav-list :navoptions="tabOptions" @onnavlistclick="navEvent">
      <div slot="navName">
        <span class="titleName">项目变更</span>
      </div>
      </nav-list>
      <table-list :tableoptions="tableOptions" :tabledata="tableData" @ontableclick="tableclick"></table-list>
    </div>
</template>
<script>
  import NavList from '@/page/common/Nav'
  import TableList from '@/page/common/TableList';
export default {
    components:{ NavList,TableList } ,
    data(){
      return {
        tabOptions: [
          {label: '项目人员',href: 'projectchangelistshow', name: 'first'},
          {label: '项目变更',href: 'ttt', name: 'first'}
        ],
        tableOptions: [
          {prop: 'userName', width: 100, label: '项目名称'},
          {prop: 'mechanism', width: '', label: '变更类型'},
          {prop: 'department', width: 160, label: '申请人'},
          {prop: 'endDate', width: 120, label: '审核状态'},
          {prop: 'entryName', width: 276, label: '申请人时间'}
        ],
        tableData: [
          {count:0}
        ]
      }
    },
    methods:{
      navEvent(){},
      tableclick(){

      }
    }
}
</script>
<style lang="scss" scoped>
  /* 项目变更 */
  .titleName{padding-right:10px;margin-right:10px;height:20px;line-height:20px;font-size:13px;font-weight:400;color:rgba(38,38,40,1);border-right:2px solid #C8C8C8;}
</style>
