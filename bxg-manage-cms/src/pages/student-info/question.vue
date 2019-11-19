<template>
    <div>
         <Row id="table-stage-list">
            <Col span="24">
                <Table :height="baseHeight" :loading="question_loading" style="width:100%" border :columns="columns" :data="questions.items"></Table>
            </Col>
           <Col style="margin-top:20px; margin-bottom:4px; text-align: right;" span="24">
                  <Page placement="top" :total="questions.totalCount" :page-size="query.pageSize" @on-change="handleCurrentChange" :current="questions.currentPage" show-total show-elevator show-sizer @on-page-size-change="handlePageSize"></Page>
            </Col>
       </Row>
      <popup-question
       :modal1="modal1"
        :qResult="qResult"
        :q_pos="q_pos"
        @closeNodeModule="closeNode"
      >

      </popup-question>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import popupQuestion from '@/components/popup-question/popup-question'
import api from '@/api/index'
import util from '@/util/util'
export default {
  name: 'question',
  props: {
    from: String
  },
  components: {
    popupQuestion
  },
  data() {
    const from = this.from
    let haschakan
    if (from == 'learning-manage-mentor_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_questions_details')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_questions_details')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_questions_detail')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_questions_details')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_cards_asks_details')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_questions_details')
    } else if (from == 'student-management'
      || from == 'sales-manage_order-manage'
      || from == 'sales-manage_dredge-class'
      || from == 'sales-manage_back-tracking-order'
      || from == 'finance-manage_back-tracking-pay'
      || from == 'finance-manage_back-tracking-check'
    ) {
      haschakan = this.hasSomeApiAccess('users_students_cards_asks_details')
    }

    return {
      baseHeight: 0,
      modal1: false,
      qResult: null,
      q_pos: '',
      question_loading: true,
      query: {
        uuid: this.$route.query.uuid || '',
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
          title: '提问时间',
          key: 'createDate',
          align: 'right',
          width: 120
        },
        {
          title: '所属课程',
          key: 'courseName',
          width: 300,
          render: (h, params) => {
            return h(
              'span',
              params.row.courseName?params.row.courseName:"--"
            )
          }
        },
        {
          title: '提问位置',
          key: '',
          width: 400,
          render: (h, params) => {
            return h(
              'span',
              {
                props: {}
              },
              params.row.moduleName &&
              params.row.sectionName &&
              params.row.pointName
                ? `${params.row.moduleName}>${params.row.sectionName}>${
                    params.row.pointName
                  }`
                : '--'
            )
          }
        },
        {
          title: '提问标题',
          key: 'title',
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          render: (h, params) => {
            let viewButton = null

            if (haschakan) {
              viewButton = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.nodeWatchClick(
                        /*params.row.quesId,
                        `${params.row.moduleName}>${params.row.sectionName}>${
                          params.row.pointName
                        }`*/
                        params.row.quesId,
                        params.row.moduleName &&
                        params.row.sectionName &&
                        params.row.pointName
                          ? `${params.row.moduleName}>${params.row.sectionName}>${
                            params.row.pointName
                            }`
                          : '--'
                      )
                    }
                  }
                },
                '查看'
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
    this.fetchQuestions(this.query)
      .finally(() => {
        this.question_loading = false
      })
      //获取table-height
      this.$nextTick(()=> {
        let dom = document.getElementById("table-stage-list");
        this.baseHeight = util.baseHeight(dom, 82);
      })
  },
  methods: {
    ...mapActions(['fetchQuestions', 'fetchAskDetails']),

    handleCurrentChange(num) {
      this.query.pageNumber = num
      this.fetchQuestions(this.query)
    },
    handlePageSize(num) {
      this.query.pageNumber = 1
      this.query.pageSize = num
      this.fetchQuestions(this.query)
    },
    async nodeWatchClick(quesId, Q_pos) {
      this.modal1 = true
      await this.fetchAskDetails({
        id: quesId
      })
      let qResult = this.$store.state.stuCondition.askDetails
      this.qResult = qResult
      this.q_pos = Q_pos
    },
    closeNode() {
      this.modal1 = false
    },
    closeNode() {
      this.modal1 = false
    }
  },
  computed: {
    ...mapState({
      questions: state => state.learningCenter.questions
    })
  }
}
</script>

<style>
</style>
