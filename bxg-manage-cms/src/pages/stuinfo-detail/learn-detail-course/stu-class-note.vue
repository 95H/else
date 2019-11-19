<template>
  <div class="note">
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
      <Modal
          v-model="modal1"
          :footer-hide="true"
          :mask="false"
          :closable="false"
          :width="600"
      >
        <div class="node_header">
          <h6 class="node_module_t">查看笔记</h6>
          <span @click="closeNode" class="node_close"><Icon type="md-close" /></span>
        </div>
        <div class="node_container">
          <h5>笔记内容：</h5>
          <p style="word-break:break-all;word-wrap:break-word;">{{node_container}}</p>
        </div>
        <div class="node_pos">
          <h5>笔记位置：</h5>
          <p>{{node_pos}}</p>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import util from '@/util/util'
export default {
  name: 'stucClassNote',
  props: {
    from: String
  },
  data() {
    const from = this.from
    let haschakan

    if (from == 'learning-manage-mentor_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_notes_details')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_notes_details')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_notes_details')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_notes_details')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_students_details_notes_details')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_notes_details')
    } else if (from == 'class-stu-manage_employment_see-students') {
      haschakan = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_notes_details')
    } else if (from == 'class-stu-manage_small-class_see-students') {
      haschakan = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_notes_details')
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
          title: '记录日期',
          key: 'Record_date',
          width:120,
          align:"right"
        },
        {
          title: '笔记位置',
          key: 'Note_pos',
          align:"left"
        },
        {
          title: '笔记内容',
          key: 'Note_contain',
          width:800,
          render: (h, params) => {
            return h('span',{
              style:{
                width:'800px',
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace: 'nowrap'
              }
            }, params.row.Note_contain)
          }
        },
        {
          title: '操作',
          key: 'Note_handle',
          align:"center",
          width:200,
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
                    this.nodeWatchClick(params.row);
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
      node_container: '',
      node_pos: '',
      pageSize: 10,
      pageNumber: 1
    }
  },
  methods: {
    ...mapActions([
      "fetchStudyNote"
    ]),
    async _initState() {
      let uInfo = this.$route.query
      await this.fetchStudyNote({
        courseId: uInfo.courseId,
        studentId: uInfo.userId
      })
      let nodeResult = this.$store.state.stuCondition.studyNote
      this.loading = nodeResult ? false : true
      this.total = nodeResult.total
      try {
        this._dState(nodeResult.list)
      } catch (error) {
        console.log(error)
      }
    },
    _dState(nodeResult) {
      let arr = []
      nodeResult.forEach(e => {
        let newDate = {}
        Object.assign(newDate, {
          Num: e.id,
          Record_date: e.createTime,
          Note_pos: e.position,
          Note_contain: e.content
        })
        arr.push(newDate)
      })
      this.data1 = arr
    },
    nodeWatchClick(params) {
      this.modal1 = true
      this.node_container = params.Note_contain
      this.node_pos = params.Note_pos
    },
    closeNode() {
      this.modal1 = false
    },
    //页码改变
    async modulePageChange(page) {
      this.pageNumber = page
      this.current=page
      let uInfo = this.$route.query
      await this.fetchStudyNote({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize
      })
      let nodeResult = this.$store.state.stuCondition.studyNote
      try {
        this._dState(nodeResult.list)
      } catch (error) {
        console.log(error)
      }
    },
    //显示条数改变
    async modulePageSizeChange(pageSize) {
      this.pageSize = pageSize
      let uInfo = this.$route.query
      await this.fetchStudyNote({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize
      })
      let nodeResult = this.$store.state.stuCondition.studyNote
      try {
        this._dState(nodeResult.list)
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
      studyNote: state => state.stuCondition.studyNote,
    })
  },
}
</script>

<style lang="less" scoped>
.note{
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
  .node_module_t{
    font-size: 14px;
    line-height: 26px;
  }
  .node_close{
    cursor: pointer;
    font-size: 26px;
    line-height: 20px;
  }
}
.node_container{
  margin-top: 30px;
  h5{
    font-size: 14px;
  }
  p{
    max-height:500px;
    overflow-y:scroll;
  }
}
.node_pos{
  margin-top: 60px;
  h5{
    font-size: 14px;
  }
}
</style>


