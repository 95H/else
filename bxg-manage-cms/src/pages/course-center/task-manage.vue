<template>
  <div class="task-manage">
    <Row>
      <Col span="24">
        <Card>
          <Row class="row">
            <Col span="4">
              <Button type="primary" @click="createTaskHandler" v-if="hasSomeApiAccess('courses_stages_tasks_post')">
                <Icon type="md-add" />新建学习任务
              </Button>
            </Col>
            <Col span="20" style="text-align: right;">
              <router-link to="/coursecenter/phase-manage">
                <Button style="width: 120px;">返回</Button>
              </router-link>
            </Col>
          </Row>
          <Row class="row" id="table-stage-list">
            <Col span="24">
              <Table border :height="baseHeight" :loading="pageTaskLoading" :columns="taskColumns" :data="pageTaskList"></Table>
            </Col>
          </Row>
          <Row>
            <Col span="24">
               <Page placement="top" show-total show-elevator show-sizer :page-size-opts="[10, 20, 30, 40, 100, 200]" style="text-align: right;" :current="pageInfo.current" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

    <CreationModal v-model="isShowCreationModal" />
    <UpdationModal v-model="isShowUpdationModal" :taskItem="taskItemData" />
  </div>
</template>

<script>
import util from '@/util/util'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CreationModal from './task-creation-modal'
import UpdationModal from './task-updation-modal'
import ConfirmModal from './confirm-modal'

export default {
  components: {
    CreationModal,
    UpdationModal
  },

  data() {
    let self = this

    const hasqijinyong = this.hasSomeApiAccess('courses_stages_tasks_status_patch')
    const hasxiugai = this.hasSomeApiAccess('courses_stages_tasks_patch')
    const hasshangxiayi = this.hasSomeApiAccess('courses_stages_tasks_sort_patch')
    const hasshanchu = this.hasSomeApiAccess('courses_stages_tasks_delete')

    return {
      baseHeight: 0,
      isShowCreationModal: false,
      isShowUpdationModal: false,
      taskItemData: {},

      statusList: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],

      // 表格的配置数据
      taskColumns: [
        {
          title: "序号",
          key: "",
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
          width: 360,
          render(h, params) {
            return <span class="taskname-column" domPropsTitle={params.row.taskName}>{ params.row.taskName }</span>
          }
        },
        {
          title: "任务说明",
          key: "taskDesc",
          align: "left",
          width: 400,
          render(h, params) {
            return <span class="remark-column" domPropsTitle={params.row.taskRemark}>{ params.row.taskRemark }</span>
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "right",
          width: 180
        },
        {
          title: "创建人",
          key: "createPerson",
          align: "left",
          width: 210
        },
        {
          title: "状态",
          key: "status",
          align: "left",
          width: 100,
          render(h, params) {
            let Badge = 'Badge'
            let status = params.row.status
            let badgeText = ''
            let badgeStatus = ''
            if (status == 1) {
              badgeText = '启用'
              badgeStatus = 'success'
            } else {
              badgeText = '禁用'
              badgeStatus = 'error'
            }

            return <Badge status={badgeStatus} text={badgeText} />
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          fixed: 'right',
          width: 354,
          render(h, params) {
            let _ = self._
            let Button = 'Button'
            let row = params.row
            
            // 任务是否为已禁用
            let isDisable = row.status == 0
            // 启用禁用按钮
            let $statusButton = null

            if (hasqijinyong) {
              if (isDisable) {
                $statusButton = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.changeTaskStatus, row.id, 1) }}}>启用</Button>
              } else {
                $statusButton = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.changeTaskStatus, row.id, 0) }}}>禁用</Button>
              }
            }

            // 上移下移按钮
            let pageInfo = self.pageInfo
            let currentIndex = pageInfo.pageSize * (pageInfo.current - 1) + params.index
            let isFirstRow = pageInfo.current === 1 && params.index === 0
            let isLastRow = currentIndex === pageInfo.total - 1

            return (
              <div>
                {$statusButton}
                {hasxiugai && <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.updateHandler, row.id) }}}>修改</Button>}
                {hasshangxiayi && <Button type="primary" size="small" class="btn-margin" disabled={isFirstRow ? true : false} {...{ on: { click: _.partial(self.moveUpOrDown, row.id, 'up') }}}>上移</Button>}
                {hasshangxiayi && <Button type="primary" size="small" class="btn-margin" disabled={isLastRow ? true : false} {...{ on: { click: _.partial(self.moveUpOrDown, row.id, 'down') }}}>下移</Button>}
                {hasshanchu && <Button type="primary" size="small" class="btn-margin" disabled={isDisable ? false : true} onClick={_.partial(self.deleteHandler, row.id)}>删除</Button>}
              </div>
            )
          }
        }
      ]
    }
  },

  beforeCreate() {
    this.phaseId = this.$route.query.phaseId
  },

  created() {
    this.setPageTaskPhaseId(this.phaseId)
    this.fetchTasks()
  },

  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },

  beforeDestroy() {
    this.resetTask()
  },
  
  computed: {
    ...mapGetters({
      pageTaskLoading: 'courseCenter/pageTaskLoading',
      pageTaskList: 'courseCenter/pageTaskList',
      pageInfo: 'courseCenter/pageTaskPageInfo',
      taskItem: 'courseCenter/taskItem'
    })
  },
  
  mixins: [ ConfirmModal ],

  methods: {
    ...mapMutations({
      setPageTaskPhaseId: 'courseCenter/setPageTaskPhaseId',
      setTaskPageInfo: 'courseCenter/setTaskPageInfo',
      resetTask: 'courseCenter/resetTask'
    }),

    ...mapActions({
      fetchPageTasks: 'courseCenter/fetchPageTasks',
      deleteTaskItem: 'courseCenter/deleteTaskItem',
      patchPhaseStatus: 'courseCenter/patchPhaseStatus',
      moveTaskItem: 'courseCenter/moveTaskItem',
    }),

    // 获取当前页任务数据
    fetchTasks() {
      this.fetchPageTasks()
    },
    
    // 点击上移或下移
    moveUpOrDown(taskId, moveType) {
      let status
      let message = ''
      let pageInfo = this.pageInfo

      this.moveTaskItem({
        taskId,
        moveType,
        pageInfo
      })
        .then(data => {
          status = data.status
          message = data.message
        })
        .catch(err => {})
        .finally(() => {
          if (status == 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(message)
          }
        })
    },

    // 点击新建学习任务
    createTaskHandler() {
      this.isShowCreationModal = true
    },

    // 点击启用or禁用
    changeTaskStatus(taskId, toStatus) {
      let statusStr
      if (toStatus == 0) {
        statusStr = '禁用'
      } else if (toStatus == 1) {
        statusStr = '启用'
      }

      this.confirmModal({
        content: `你确定要${statusStr}该学习任务!`,
        successMsg: `${statusStr}成功`,
        promise() {
          return this.patchPhaseStatus({ taskId, toStatus })
        }
      })
    },

    // 点击修改
    updateHandler(taskId) {
      this.isShowUpdationModal = true
      this.taskItemData = this.taskItem(taskId)
    },

    // 点击删除
    deleteHandler(taskId) {
      this.confirmModal({
        content: '你确定要删除该学习任务!',
        successMsg: '删除成功',
        promise() {
          return this.deleteTaskItem({ 
            taskId
          })
        }
      })
    },

    changeCurrentPage(pageNumber) {
      this.setTaskPageInfo({
        current: pageNumber
      })
      this.fetchTasks()
    },

    changePageSize(pageSize) {
      this.setTaskPageInfo({
        pageSize
      })
      if (this.pageInfo.current == 1) {
        this.fetchTasks()
      }
    }
  }
}
</script>

<style lang="less">
.task-manage {
  .ivu-btn.btn-margin {
    margin-right: 5px;
  }
  
  .ivu-table {
    .taskname-column,
    .remark-column {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style lang="less" scoped>
.task-manage {
  .row {
    margin-bottom: 20px;
  }
}
</style>