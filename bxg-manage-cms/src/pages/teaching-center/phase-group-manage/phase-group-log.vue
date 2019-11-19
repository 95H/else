<template>
  <Modal
    v-model="modal"
    title="日志"
    width="800"
    @on-cancel="cancel"
    :mask-closable="false">
    <Tabs type="line" size="small" @on-click="tabFn">
      <TabPane label="导师更换记录">
        <Row>
          <Table border :columns="columns1" :data="teacherData" :loading="loading" size="small"></Table>
        </Row>
        <Row class="margin-top-20 base-margin-top" style="text-align:right">
           <Page placement="top" :current="teacherPage.pageNumber" :total="teacherPage.total" show-total @on-change="teacherPageChange"/>
        </Row>
      </TabPane>
      <TabPane label="班主任更换记录">
        <Row>
          <Table border :columns="columns2" :data="teacherData" size="small"></Table>
        </Row>
        <Row class="margin-top-20 base-margin-top" style="text-align:right">
           <Page placement="top" :current="teacherPage.pageNumber" :total="teacherPage.total" show-total @on-change="teacherPageChange"/>
        </Row>
      </TabPane>
    </Tabs>
    <div slot="footer">
      <Button type="primary" @click="cancel">关闭</Button>
    </div>
  </Modal>
</template>
<script>
  import api from "@/api/index";
  export default {
    name: "phase-group-log",
    data(){
      return {
        infoList:[],
        modal:false,
        loading:true,
        dataId:"",
        type:0,
        nub:1,
        //页码
        teacherPage:{
          pageNumber:1,
          pageSize:10,
          total:0
        },
        columns1: [
          {
            title: '序号',
            type: '',
            align:'center',
            width:60,
            render: (h, params) => {
              return h(
                'span',
                params.index + (this.teacherPage.pageNumber - 1) * this.teacherPage.pageSize + 1
              )
            }
          },
          {
            title: '导师名称',
            key: 'name',
            align:"left"
          },
          {
            title: '等级',
            key: 'roleLevel',
            align:'left'
          },
          {
            title: '带班开始时间',
            key: 'startTime',
            align:"right",
          },
          {
            title: '带班结束时间',
            key: 'endTime',
            align:'right',
            render: (h, params) => {
              return h(
                'span',
                params.row.endTime?params.row.endTime:'--'
              )
            }
          },
          {
            title: '带班天数',
            key: 'totalDay',
            align:'right'
          },
          {
            title: '结束带班人数',
            key: 'endAmount',
            align:'right'
          }
        ],
        columns2: [
          {
            title: '序号',
            type: '',
            align:'center',
            width:60,
            render: (h, params) => {
              return h(
                'span',
                params.index + (this.teacherPage.pageNumber - 1) * this.teacherPage.pageSize + 1
              )
            }
          },
          {
            title: '班主任名称',
            key: 'name',
            align:"left"
          },
          {
            title: '等级',
            key: 'roleLevel',
            align:'left'
          },
          {
            title: '带班开始时间',
            key: 'startTime',
            align:"right"
          },
          {
            title: '带班结束时间',
            key: 'endTime',
            align:'right',
            render: (h, params) => {
              return h(
                'span',
                params.row.endTime?params.row.endTime:'--'
              )
            }
          },
          {
            title: '带班天数',
            key: 'totalDay',
            align:'right'
          },
          {
            title: '结束带班人数',
            key: 'endAmount',
            align:'right'
          }
        ],
        teacherData: []
      }
    },
    methods:{
      //父传的值拿数据
      dataInfo(id){
        this.dataId=id;
        this.teacherPage.pageNumber=1;
        this.teacherPage.pageSize=10;
        this.teacherLog(this.type);
        this.nub=2;
      },
      //获取导师或者班主任log
      teacherLog(type){
        this.loading=true;
        let data=Object.assign({type:type,groupId:this.dataId},this.teacherPage);
        api.getGroupsTeacherLog(data).then(res => {
          if (res.status === 200) {
            this.teacherData=res.result.list;
            this.teacherPage.total=res.result.total;
          } else {
            this.$Message.error(res.message);
          }
          this.loading=false;
        })
      },
      //分页改变拿数据
      teacherPageChange(page){
         this.teacherPage.pageNumber=page;
         this.teacherLog(this.type);
      },
      //切换拿数据
      tabFn(id){
        this.teacherPage.pageNumber=1;
        this.teacherPage.pageSize=10;
        this.type=id;
        this.teacherLog(this.type);
      },
      //关闭
      cancel(){
        this.modal=false
      }
    }
  }

</script>

<style scoped lang="less">
   .base-margin-top{
     margin-top:20px;
   }
</style>
