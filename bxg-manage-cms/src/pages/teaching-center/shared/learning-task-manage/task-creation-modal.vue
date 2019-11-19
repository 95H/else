<template>
  <div class="creation-modal-container">
    <Modal
        class="creation-modal"
        v-model="modalShow"
        title="布置任务"
        :loading="okLoading"
        @on-ok="ok"
        >
      <Form label-position="top" :model="formData" :rules="ruleFormData" ref="creationForm">
        <Row>
          <Col span="20" offset="2">
            <FormItem label="选择阶段：" prop="stageId" class="ivu">
              <Select placeholder="选择阶段名称" style="width:150px; margin-right: 10px; text-align: left;" @on-change="selectPhase" v-model="formData.stageId">
                <Option :title="item.stageName" v-for="item in phaseList" :value="item.stageId" :key="item.stageId">{{ item.stageName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20" offset="2">
            <FormItem label="选择任务：" prop="taskId" class="ivu">
              <Select placeholder="选择任务名称" style="width:150px; margin-right: 10px; text-align: left;" @on-change="selectTask" v-model="formData.taskId">
                <Option :title="item.taskName" v-for="item in taskList" :value="item.taskId" :key="item.taskId">{{ item.taskName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20" offset="2">
            <div class="task-desc">
              <span class="desc-label">任务说明：</span>
              <p class="desc-txt">{{ taskDesc }}</p>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/index'
import { mapActions } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: [ 'value' ],

  data() {
    return {
      // 提交等待中
      okLoading: true,
      // 任务选择框等待中
      taskSelectLoading: false,

      phaseList: [],
      taskList: [],
      taskDesc: '',

      //
      formData: {
        stageId: null,
        taskId: null
      },

      //
      ruleFormData: {
        stageId: [
          { required: true, message: '请选择阶段' }
        ],
        taskId: [
          { required: true, message: '请选择任务' }
        ]
      },
    }
  },

  computed: {
    modalShow: {
      get() {
        return this.value
      },

      set(val) {
        this.$emit('change', val)
      }
    }
  },

  created() {
    let _ = this.$_
    let subjectId = this.$route.query.subjectId

    api.getPhasesBySubjectId({ subjectId })
      .then(data => {
        if (data.status == 200) {
          this.phaseList = _.map(_.pick([ 'stageId', 'stageName']))(data.result)
        }
      })
      .catch(err => {})
  },

  methods: {
    ...mapActions({
      createTask: 'learningTaskManage/createTask'
    }),

    ok() {
      this.$refs.creationForm.validate(valid => {
        if (!valid) {
          this.okLoading = false
          this.$nextTick(() => {
            this.okLoading = true
          })
          return
        }
        let self = this
        let status
        let message = ''
        let formData = this.formData
        let query = this.$route.query
        this.createTask({
          taskId: formData.taskId,
          courseId: query.courseId,
          studentId: query.studentId
        })
          .then(data => {
            status = data.status
            message = data.message
          })
          .catch(err => {})
          .finally(() => {
            if (status == 201) {
              self.$Message.success({
                content: '新建成功！',
                onClose: function() {
                  self.modalShow = false
                }
              })

              return
            }

            self.modalShow = false

            if (status == 417) {
              self.$Message.error('该学员已退费或已休学')
            } else {
              self.$Message.error(message)
            }
          })
      })
    },

    selectPhase(phaseId) {
      let _ = this.$_

      this.taskList = []
      this.taskDesc = ''

      api.getTasksByPhaseId({ phaseId })
        .then(data => {
          if (data.status == 200) {
            this.taskList = _.map(_.pick([ 'taskId', 'taskName', 'taskRemark' ]))(data.result)
          }
        })
        .catch(err => {})
    },

    selectTask(taskId) {
      let _ = this._

      let taskItem = _.find(this.taskList, { taskId: taskId })
      this.taskDesc = taskItem.taskRemark
    }
  }
}
</script>

<style lang="less" scoped>
.creation-modal {
  .desc-txt {
    display: inline;
    color: #999;
    word-break: break-all;
  }

  .ivu {
    /deep/ .ivu-select-dropdown {
      width: 150px;
    }

    /deep/ .ivu-select-item {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
