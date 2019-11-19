<template>
  <div class="learning-task-manage">
    <Row >
      <Col span="24">
        <Card>
          <Row class="row">
            <Col span="24">
              <Button type="primary" style="margin-right: 8px;" v-if="hasbuzhi" @click="createTaskHandler">
                <Icon type="md-add" />布置任务
              </Button>
              <Select placeholder="请选择阶段名称" style="width:150px; margin-right: 8px; text-align: left;" v-model="searchInfo.stageId" clearable>
                <Option v-for="item in learningPhaseList" :value="item.stageId" :key="item.stageId">{{ item.stageName }}</Option>
              </Select>
              <Select placeholder="请选择任务状态" style="width:150px; margin-right: 8px; text-align: left;" v-model="searchInfo.taskStatus" clearable>
                <Option v-for="item in taskStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" icon="md-search" style="margin-right: 8px;" @click="searchHandler">搜索</Button>
              <Button @click="clearSearchHandler">清除</Button>
            </Col>
          </Row>
          <div id="table-stage-list">
            <Row class="row">
              <Col span="24">
                <Table border :height="baseHeight" :loading="loading" :columns="taskColumns" :data="taskList"></Table>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Page placement="top" show-total show-elevator show-sizer style="text-align: right;" :current="pageInfo.current" :page-size="pageInfo.pageSize" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>

    <TaskCreationModal v-model="isShowCreationModal" v-if="isShowCreationModal" />
    <TaskTerminationModal v-model="isShowTerminationModal" v-if="isShowTerminationModal" :taskId="taskId" />
    <TaskReasonModal v-model="isShowReasonModal" v-if="isShowReasonModal" :taskItem="taskItem" />            
  </div>
</template>

<script>
// 测试地址: http://manage-cms-d.boxuegu.com/#/learning-task-headteacher?courseId=850&studentId=0164f46631224460ab89b9aa01e52da6&subjectId=199
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TaskCreationModal from './task-creation-modal'
import TaskTerminationModal from './task-termination-modal'
import TaskReasonModal from './task-reason-modal'
import util from '@/util/util'

export default {
  components: {
    TaskCreationModal,
    TaskTerminationModal,
    TaskReasonModal
  },

  data() {
    let self = this

    let hasbuzhi
    let haszhongzhi
    
    const from = this.$route.query.from
    
    if (from == 'learning-manage-mentor_my-students') {
      hasbuzhi = this.hasSomeApiAccess('teaching_students_process_mentors_students_tasks_post')
      haszhongzhi = this.hasSomeApiAccess('teaching_students_process_mentors_students_tasks_patch')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      hasbuzhi = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_tasks_post')
      haszhongzhi = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_tasks_patch')
    } else if (from == 'learning-manage-headteacher_my-students') {
      hasbuzhi = this.hasSomeApiAccess('teaching_students_process_teachers_students_tasks_post')
      haszhongzhi = this.hasSomeApiAccess('teaching_students_process_teachers_students_tasks_patch')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      hasbuzhi = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_tasks_post')
      haszhongzhi = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_tasks_patch')
    } else if (from == 'learning-manage-stat_student-list') {
      hasbuzhi = this.hasSomeApiAccess('teaching_students_process_data_students_tasks_post')
      haszhongzhi = this.hasSomeApiAccess('teaching_students_process_data_students_tasks_patch')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      hasbuzhi = this.hasSomeApiAccess('teaching_students_process_data_groups_students_tasks_post')
      haszhongzhi = this.hasSomeApiAccess('teaching_students_process_data_groups_students_tasks_patch')
    }

    return {
      hasbuzhi: hasbuzhi,
      baseHeight: 0,
      isShowCreationModal: false,
      isShowTerminationModal: false,
      isShowReasonModal: false,

      taskId: null,
      taskItem: null,

      taskColumns: [
        {
          title: "序号",
          key: "id",
          align: "center",
          width: 60,
          render(h, params) {
            let pageInfo = self.pageInfo
            let current = pageInfo.current
            let pageSize = pageInfo.pageSize
            let index = params.index

            return <span>{(current - 1)* pageSize + index + 1}</span>
          }
        },
        {
          title: "任务名称",
          key: "taskName",
          align: "left",
          width: 260,
          render(h, params) {
            let taskName = params.row.taskName
            return <span class="taskname-column" domPropsTitle={taskName}>{ taskName }</span>
          }
        },
        {
          title: "任务说明",
          key: "taskRemark",
          align: "left",
          width: 350,
          render(h, params) {
            let taskRemark = params.row.taskRemark
            return <span class="remark-column" domPropsTitle={taskRemark}>{ taskRemark }</span>
          }
        },
        {
          title: "阶段名称",
          key: "stageName",
          align: "left",
          width: 260,
          render(h, params) {
            let stageName = params.row.stageName
            return <span class="stagename-column" domPropsTitle={stageName}>{ stageName }</span>
          }
        },
        {
          title: "任务状态",
          key: "taskStatus",
          align: "left",
          width: 100,
          render(h, params) {
            let Badge = 'Badge'
            let status = params.row.taskStatus
            let badgeText = ''
            let badgeStatus = ''
            if (status == -1) {
              badgeText = '已终止'
              badgeStatus = 'error'
            } else if (status == 0) {
              badgeText = '进行中'
              badgeStatus = 'processing'
            } else if (status == 1) {
               badgeText = '已完成'
              badgeStatus = 'success'
            }

            return <Badge status={badgeStatus} text={badgeText} />
          }
        },
        {
          title: "布置任务时间",
          key: "taskStartDate",
          align: "right",
          width: 180
        },
        {
          title: "完成任务时间",
          key: "taskEndDate",
          align: "right",
          width: 180,
          render(h, params) {
            let row = params.row
            let taskEndDate = row.taskEndDate || '--'

            return <span>{taskEndDate}</span>
          }
        },
        {
          title: "完成任务所用天数",
          key: "taskDays",
          align: "right",
          width: 100,
           render(h, params) {
            let row = params.row
            let taskDays = row.taskDays || '--'

            return <span>{taskDays}</span>
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          fixed: 'right',
          width: 174,
          render(h, params) {
            let Button = 'Button'
            let row = params.row

            let $action = null

            if (haszhongzhi) {
              if (row.taskStatus == 0) {
                $action = <Button type="primary" size="small" {...{ on: { click: _.partial(self.terminateTaskHandler, row.id) }}}>终止任务</Button>
              } else if (row.taskStatus == -1) {
                $action = <Button type="primary" size="small" {...{ on: { click: _.partial(self.viewReasonHandler, row) }}}>查看原因</Button>
              } else if (row.taskStatus == 1) {
                $action = <span>--</span>
              }
            }

            return (
              <div>{$action}</div>
            )
          }
        }
      ],

      // 搜索信息
      searchInfo: {
        // 阶段id
        stageId: null,
        // 任务状态
        taskStatus: null
      }
    }
  },

  computed: {
    ...mapGetters({
      loading: 'learningTaskManage/loading',
      error: 'learningTaskManage/error',
      pageInfo: 'learningTaskManage/pageInfo',
      taskList: 'learningTaskManage/taskList',
      learningPhaseList: 'learningTaskManage/learningPhaseList'
    })
  },

  beforeCreate() {
    let _ = this._

    this.taskStatusList = [
      { value: -1, label: '已终止' },
      { value: 0, label: '进行中' },
      { value: 1, label: '已完成 ' }
    ]

    this.urlQuery = _.pick(this.$route.query, [ 'courseId', 'studentId', 'subjectId' ])
    this.fetchParams = _.omit(this.urlQuery, ['subjectId'])
  },

  created() {
    this.fetchPageTasks(this.fetchParams)
    this.fetchPhaseOptions(this.fetchParams)
  },

  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },

  beforeDestroy() {
    this.resetState()
  },

  watch: {
    error(val) {
      if (val) {
        this.$Message.error(val || '获取数据失败，请刷新重试')
      }
    }
  },

  methods: {
    ...mapMutations({
      resetState: 'learningTaskManage/resetState',
      setPageInfo: 'learningTaskManage/setPageInfo'
    }),

    ...mapActions({
      // 获取当前页学习任务
      fetchPageTasks: 'learningTaskManage/fetchPageTasks',
      // 获取阶段选项列表
      fetchPhaseOptions: 'learningTaskManage/fetchLearningPhases'
    }),

    // 点击布置任务
    createTaskHandler() {
      this.isShowCreationModal = true
    },

    // 点击终止任务
    terminateTaskHandler(taskId) {
      this.taskId = taskId
      this.isShowTerminationModal = true
    },

    viewReasonHandler(taskItem) {
      this.taskItem = taskItem
      this.isShowReasonModal = true
    },

    // 点击搜索
    searchHandler() {
      this.search()
    },

    // 搜索
    search() {
      this.fetchPageTasks({
        pageNumber: 1,
        ...this.searchInfo,
        ...this.fetchParams
      })
    },

    // 点击清除
    clearSearchHandler() {
      this.searchInfo = {
        stageId: null,
        taskStatus: null
      }

      this.search()
    },

    // 当前页改变
    changeCurrentPage(pageNumber) {
      this.fetchPageTasks({
        pageNumber,
        ...this.searchInfo,
        ...this.fetchParams
      })
    },

    // 页大小改变
    changePageSize(pageSize) {
      this.setPageInfo({
        pageSize
      })
      if (this.pageInfo.current == 1) {
        this.fetchPageTasks({
          pageSize,
          ...this.searchInfo,
          ...this.fetchParams
        })
      }
    }
  }
}
</script>

<style lang="less">
.learning-task-manage {
  .ivu-table {
    .taskname-column,
    .remark-column,
    .stagename-column {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style lang="less" scoped>
.learning-task-manage {
  .row {
    margin-bottom: 20px;
  }
}
</style>
