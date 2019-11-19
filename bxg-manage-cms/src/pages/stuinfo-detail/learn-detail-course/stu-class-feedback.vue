<template>
  <div class="feedback">
    <div 
      style="width:100%;" 
      id="table-stage-list"
    >
      <Table :height="baseHeight" class="module_table" border :loading="loading" :columns="columns1" :data="data1"></Table>
      <div class="module_page_box">
         <Page placement="top" 
          class="module_page" 
          show-elevator 
          show-sizer 
          :total="total"
          :current="current"
          @on-page-size-change="modulePageSizeChange"
          @on-change="modulePageChange" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import util from '@/util/util'
export default {
  name: 'stuClassFeedback',
  props: {
    from: String
  },
  data() {
    const from = this.from
    let haschakan

    if (from == 'learning-manage-mentor_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_feedbacks_details')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_feedbacks_details')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_feedbacks_details')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_feedbacks_details')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_students_details_feedbacks_details')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_feedbacks_details')
    } else if (from == 'class-stu-manage_employment_see-students') {
      haschakan = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_feedbacks_details')
    } else if (from == 'class-stu-manage_small-class_see-students') {
      haschakan = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_feedbacks_details')
    }
    
    return {
      baseHeight: 0,
      loading: true,
      current:1,
      total: 100,
      columns1: [
        {
          title: '序号',
          key: 'Num',
          width:80,
          align:"center",
          render: (h, params) => {
            return h('span', params.index+1 + this.pageSize*(this.pageNumber-1))
          }
        },
        {
          title: '反馈日期范围',
          key: 'FbDate'
        },
        {
          title: '发送人',
          key: 'FbSender'
        },
        {
          title: '发送时间',
          key: 'FbTime',
          align:"right",
        },
        {
          title: '操作',
          key: 'FbHandle',
          align:"center",
          render: (h, params) => {
            let viewBtn = null
            
            if (haschakan) {
              viewBtn = h('div', {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.videoPlanClick(params.row.FbUrl);
                  }
                }
              }, '查看')
            }

            return h('div', [
              viewBtn
            ])
          }
        }
      ],
      data1: [],
      pageSize: 10,
      pageNumber: 1
    }
  },
  methods: {
    ...mapActions([
      "fetchStudyFeedback"
    ]),
    async _initState() {
      let uInfo = this.$route.query
      await this.fetchStudyFeedback({
        courseId: uInfo.courseId,
        studentId: uInfo.userId
      })
      let feedbackResult = this.$store.state.stuCondition.studyFeedback
      this.loading = feedbackResult ? false : true
      this.total = feedbackResult.total
      try {
        this._dState(feedbackResult.list)
      } catch (error) {
        console.log(error)
      }
    },
    _dState(feedbackResult) {
      let arr = []
      feedbackResult.forEach((e, i) => {
        let newDate = {}
        Object.assign(newDate, {
          Num: i,
          FbDate: e.feedbackDateRange,
          FbSender: e.senderName,
          FbTime: e.sendTime,
          FbUrl: e.feedbackToFrontUrl
        })
        arr.push(newDate)
      })
      this.data1 = arr
    },
    videoPlanClick(url) {
      window.location.href = url
    },
    //页码改变
    async modulePageChange(page) {
      this.pageNumber = page
      this.current=page
      let uInfo = this.$route.query
      await this.fetchStudyFeedback({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize
      })
      let feedbackResult = this.$store.state.stuCondition.studyFeedback
      try {
        this._dState(feedbackResult.list)
      } catch (error) {
        console.log(error)
      }
    },
    //显示条数改变
    async modulePageSizeChange(pageSize) {
      this.pageSize = pageSize
      let uInfo = this.$route.query
      await this.fetchStudyFeedback({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        pageNumber: 1,
        pageSize: pageSize
      })
      let feedbackResult = this.$store.state.stuCondition.studyFeedback
      try {
        this._dState(feedbackResult.list)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this._initState()
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  computed: {
    ...mapState({
      studyFeedback: state => state.stuCondition.studyFeedback,
    })
  },
}
</script>

<style lang="less" scoped>
.feedback{
  .module_table{
    margin-top: 20px;
  }
  .module_page_box{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>


