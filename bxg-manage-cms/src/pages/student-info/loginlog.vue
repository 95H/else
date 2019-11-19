<template>
    <div>
         <Row id="table-stage-list">
            <Col span="24">
              <Table :height="baseHeight" style="width:100%;" border :columns="columns" :data="dataList.list"></Table>
            </Col>
           <Col style="margin-top:20px; margin-bottom:4px; text-align: right;" span="24">
              <Page placement="top" :total="dataList.total" :page-size="query.pageSize" @on-change="handleCurrentChange" :current="dataList.pageNum" show-total show-elevator show-sizer @on-page-size-change="handlePageSize"></Page>
            </Col>
       </Row>
       <log-deta ref="logdetails"></log-deta>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import logDeta from './modal/logdeta-modal'
import api from '@/api/index'
import util from '@/util/util'
export default {
  name: 'loginlog',
  props: {
    from: String
  },
  components: {
    logDeta
  },
  data() {
    const from = this.from
    let haschakan

    if (from == 'learning-manage-mentor_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_logs_details')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_logs_details')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_logs_detail')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_logs_details')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_cards_logs_details')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_logs_details')
    } else if (from == 'student-management' 
      || from == 'sales-manage_order-manage' 
      || from == 'sales-manage_dredge-class'
      || from == 'sales-manage_back-tracking-order'
      || from == 'finance-manage_back-tracking-pay'
      || from == 'finance-manage_back-tracking-check'  
    ) {
      haschakan = this.hasSomeApiAccess('users_students_cards_logs_infos')
    }

    return {
      dataList:[],
      baseHeight: 0,
      query: {
        userId: this.$route.query.userId || '',
        pageNumber: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index +
                (this.query.pageNumber - 1) * this.query.pageSize +
                1
            )
          }
        },
        {
          title: "登录IP",
          key: "loginIp",
          align: "right",
          width: 300,
          render: (h, params) => {
            return h(
              'span',
              params.row.loginIp?params.row.loginIp:'--'
            )
          }
        },
        {
          title: "停留时长",
          key: "stayTime",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              params.row.stayTime+"s"
            )
          }
        },
        {
          title: "登录时间",
          key: "createTime",
          align: "right",
          width: 300,
          render: (h, params) => {
            return h(
              'span',
              params.row.createTime?params.row.createTime:'--'
            )
          }
        }
      ],
      
    }
  },
  mounted() {
    api.getLoginLog(this.query).then(res=>{
      this.dataList = res.result
    })
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    handleCurrentChange(num) {
      this.query.pageNumber = num
      api.getLoginLog(this.query).then(res=>{
        this.dataList = res.result
      })
    },
    handlePageSize(num) {
      this.query.pageNumber = 1
      this.query.pageSize = num
      api.getLoginLog(this.query).then(res=>{
        this.dataList = res.result
      })
    }
  },
  computed: {

  }
}
</script>

<style lang="less">
</style>
