<template>
    <div>
         <Row id="table-stage-list">
            <Col span="24">
                <Table :height="baseHeight" style="width:100%;" border :columns="columns" :data="logs.list"></Table>
            </Col>
           <Col style="margin-top:20px; margin-bottom:4px; text-align: right;" span="24">
                  <Page placement="top" :total="logs.total" :page-size="query.pageSize" @on-change="handleCurrentChange" :current="logs.pageNum" show-total show-elevator show-sizer @on-page-size-change="handlePageSize"></Page>
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
  name: 'operationlog',
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
          title: '操作人',
          key: 'operator',
          width:300
        },
        {
          title: '操作时间',
          key: 'createTime',
          align: 'right',
          width:200
        },
        {
          title: '修改内容',
          key: 'desc'
        },
        {
          title: '原因/备注',
          key: 'action',
          width: 100,
          render: (h, params) => {
            let viewButton = null
            
            if (haschakan) {
              viewButton = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.operationType === 6 ? true : false
                  },
                  style: {
                    display: params.row.operationType != 1 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      //根据条件查看不同类型（0修改服务期，1休学，2退费，3阶段锁）操作日志
                      //操作类型: 0(休学);1(结束休学);2(退费);3(延长服务期);4(锁定);5(解锁);6(后台开通课程)
                      this.$refs.logdetails.modal = true
                      this.$refs.logdetails.id = params.row.id
                      if (
                        params.row.operationType === 0 ||
                        params.row.operationType === 1
                      ) {
                        this.$refs.logdetails.type = 1
                      } else if (params.row.operationType === 3) {
                        this.$refs.logdetails.type = 0
                      } else if (
                        params.row.operationType === 4 ||
                        params.row.operationType === 5
                      ) {
                        this.$refs.logdetails.operationType =
                          params.row.operationType
                        this.$refs.logdetails.type = 3
                      } else if (params.row.operationType === 2) {
                        this.$refs.logdetails.type = 2
                      }
                      this.$refs.logdetails.getDetails()
                    }
                  }
                },
                '查看详情'
              )
            }

            return h('div', [
              viewButton
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.fetchOperationLog(this.query)
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions(['fetchOperationLog']),

    handleCurrentChange(num) {
      this.query.pageNumber = num
      this.fetchOperationLog(this.query)
    },
    handlePageSize(num) {
      this.query.pageNumber = 1
      this.query.pageSize = num
      this.fetchOperationLog(this.query)
    }
  },
  computed: {
    ...mapState({
      logs: state => state.learningCenter.logs
    })
  }
}
</script>

<style lang="less">
</style>
