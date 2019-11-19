<template>
  <div class="questions">
    <div 
      style="width:100%;" 
      id="table-stage-list"
    >
      <Table :height="baseHeight" class="module_table" border :loading="question_loading" :columns="columns1" :data="data1"></Table>
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
      <PopupQuestion
        :modal1="modal1"
        :qResult="qResult"
        :q_pos="q_pos"
        @closeNodeModule="closeNode"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import util from '@/util/util'
import PopupQuestion from '@/components/popup-question/popup-question'
export default {
  name: 'stuClassQuestions',
  props: {
    from: String
  },
  components: {
    PopupQuestion
  },
  data() {
    const from = this.from
    let haschakan

    if (from == 'learning-manage-mentor_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_questions_details')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_questions_detail')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_questions_details')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_questions_details')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_students_details_questions_details')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_questions_details')
    } else if (from == 'class-stu-manage_employment_see-students') {
      haschakan = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_questions_details')
    } else if (from == 'class-stu-manage_small-class_see-students') {
      haschakan = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_questions_details')
    }

    return {
      baseHeight: 0,
      question_loading: true,
      current:1,
      qResult: null,
      q_pos: '',
      total: 10,
      columns1: [
        {
          title: '序号',
          key: 'Num',
          width:80,
          align:'center',
          render: (h, params) => {
            return h('span', params.index+1 + this.pageSize*(this.pageNumber-1))
          }
        },
        {
          title: '提问时间',
          key: 'Q_time',
          width:130,
          align:'right'

        },
        {
          title: '提问位置',
          key: 'Q_pos',
          align:'left',
          width:300,
        },
        {
          title: '提问标题',
          key: 'Q_title',
          align:'left',
        },
        {
          title: '操作',
          key: 'Note_handle',
          width: 200,
          align:'center',
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
                    this.nodeWatchClick(params.row)
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
      modal1: false,
      pageSize: 10,
      pageNumber: 1,
      uuid: '',
      courseId: ''
    }
  },
  methods: {
    ...mapActions([
      "fetchStudentsAsk",
      'fetchAskDetails',
      'fetchStudyDetails'
    ]),
    async _initState() {
      let uInfo = this.$route.query
      await this.fetchStudyDetails({
        stuCourseId: uInfo.stuCourseId
      })
      let studyDeResult = this.$store.state.stuCondition.studyDetails
      this.uuid = studyDeResult.uid
      this.courseId = uInfo.courseId
      await this.fetchStudentsAsk({
        uuid: this.uuid,
        pageNumber: 1,
        pageSize: 10,
        courseId: this.courseId
      })
      let stuAskResult = this.$store.state.stuCondition.studentsAsk
      this.question_loading = stuAskResult ? false : true
      this.total = stuAskResult.totalCount
      try {
        this._dState(stuAskResult.items)
      } catch (error) {
        console.log(error)
      }
    },
    _dState(stuAskResult) {
      let arr = []
      stuAskResult.forEach((e, i) => {
        let data;
        let newData = {}
        e.moduleName && e.sectionName && e.pointName?data=`${e.moduleName}>${e.sectionName}>${e.pointName}`:'-'
        Object.assign(newData, {
          q_id: e.quesId,
          Q_time: e.createDate,
          Q_pos: data,
          Q_title: e.title
        })
        arr.push(newData)
      })
      this.data1 = arr
    },
    async nodeWatchClick(row) {
      this.modal1 = true
      await this.fetchAskDetails({
        id: row.q_id
      })
      let qResult = this.$store.state.stuCondition.askDetails
      this.qResult = qResult
      this.q_pos = row.Q_pos
    },
    closeNode() {
      this.modal1 = false
    },
    //页码改变
    async modulePageChange(page) {
      this.pageNumber = page
      this.current=page
      await this.fetchStudentsAsk({
        uuid:this.uuid,
        pageNumber: page,
        pageSize: this.pageSize,
        courseId: this.courseId
      })
      let stuAskResult = this.$store.state.stuCondition.studentsAsk
      try {
        this._dState(stuAskResult.items)
      } catch (error) {
        console.log(error)
      }
    },
    //显示条数改变
    async modulePageSizeChange(pageSize) {
      this.pageSize = pageSize
      await this.fetchStudentsAsk({
        uuid:this.uuid,
        pageNumber: 1,
        pageSize: this.pageSize,
        courseId: this.courseId
      })
      let stuAskResult = this.$store.state.stuCondition.studentsAsk
      try {
        this._dState(stuAskResult.items)
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
      studentsAsk: state => state.stuCondition.studentsAsk,
      askDetails: state => state.stuCondition.askDetails,
      studyDetails: state => state.stuCondition.studyDetails,
    })
  },
}
</script>

<style lang="less" scoped>
.questions{
  .module_table{
    margin-top: 20px;
  }
  .module_page_box{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
.node_header{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
  .node_module_t{
    font-size: 14px;
    line-height: 26px;
    span{
      font-size: 12px;
      color: #666;
    }
  }
  .node_close{
    cursor: pointer;
    font-size: 26px;
    line-height: 20px;
  }
}
.q_title{
  h5{
    font-size: 16px;
    margin-top: 10px;
  }
  .q_remark{
    font-size: 14px;
    margin-top: 20px;
  }
  h4{
    color: #000;
    font-size: 12px;
    margin-top: 10px;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 6px;
  }
  .answer_box{
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 6px;
    .a_box{
      margin-top: 6px;
      display: flex;
      font-weight: 600;
      color: #000;
      font-size: 12px;
    }
    .answer{
      font-size: 14px;
      color: 666;
      margin-top: 6px;
      margin-left: 6px;
    }
  }
  .add_to_box{
    margin-top: 10px;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 6px;
    .add_to_q{
      border-left: 1px solid #999;
      .add_to_title{
        display: flex;
        span:nth-child(1){
          display: block;
          width: 48px;
          text-align: center;
          border-radius: 3px;
          height: 20px;
          line-height: 20px;
          background: #eee;
        }
        span:nth-child(2){
          margin-left: 6px;
          line-height: 20px;
        }
      }
      .add_to_answer{
        font-size: 14px;
        margin-left: 6px;
        margin-top: 10px;
      }
    }
    .add_to_a{
      margin-top: 10px;
    }
  }
  .q_pos_box{
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ebebeb;
    p{
      line-height: 40px;
    }
  }
  .close_btn_box{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>


