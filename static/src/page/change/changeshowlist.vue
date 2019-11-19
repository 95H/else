<template>
  <div class="list-container">
    <div class="list-head">
      <span>共计 {{ tableData[0].count }} 个签发信息</span>
    </div>
    <div class="list-content">
      <table-list :tableoptions="tableOptions" :tabledata="tableData" @ontableclick="tableclick"></table-list>
      <div class="pagination-container">

      </div>
    </div>
  </div>
</template>
<script>
    import TableList from '../common/TableList'
    export default {
      components:{ TableList },
      beforeCreate(){
//         this.$http.post('/api/project/pta/selectProjectHumanResource',{
//           tabFlag: 'all',
//           type: 0,
//           page: 1,
//           rows: 10,
//           beginDateActual: '2016-08-30',
//           endDateActual: '2018-08-30'
//            }).then(res => {
//              const dataObj = res.data; // 外侧
//              const dataArr = res.data.data;
//console.log('---------------------------------------');
//
//           const obj = {};
//           this.tableData[0].count = dataObj.count;
//           obj.userName = dataArr[0].userName;
//           obj.mechanism = dataArr[0].mechanism;
//           obj.department = dataArr[0].department;
//           obj.endDate = dataArr[0].endDate.split(' ')[0];
//
//
//
//           this.tableData.push(obj);
//
//           //console.log(this.tableData);
//
// console.log('---------------------------------------');
//        //this.tableData = []; // 返回全部人员的数据
//          }).catch(err=>{
//           console.log(err);
//         })


      },
      data(){
        return {
          tableOptions: [
                {prop: 'userName', width: 100, label: '人员姓名'},
                {prop: 'mechanism', width: '', label: '所属机构'},
                {prop: 'department', width: 160, label: '所属部门'},
                {prop: 'endDate', width: 120, label: '最早释放日期'},
                {prop: 'entryName', width: 276, label: '项目名称'},
                {prop: 'state', width: 139, label: '项目状态'}
          ],
          tableData: [
            {count:0}
          ]
        }
      },
      methods:{
        tableclick(){
          console.log(1);
        }
      }
    }
</script>
<style scoped lang="scss">
  .list-container {
    margin-top: 10px;
  }

  .list-head {
    padding-right: 20px;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(38, 38, 40, 1);
    background: rgba(249, 249, 249, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-bottom: none;
    text-align: right
  }

  .list-content {
    padding: 20px;
    background: #fff;
    border: 1px solid rgba(236, 236, 236, 1);
  }
</style>
