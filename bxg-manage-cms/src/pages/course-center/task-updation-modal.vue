<template>
  <Modal class="updation-modal"
      v-model="modalShow"
      title="修改学习任务"
      :loading="loading"
      @on-ok="ok"
      :mask-closable="false"
      >
    <Form label-position="top" :model="formData" :rules="ruleFormData" ref="updationForm">
      <Row>
        <Col span="20" offset="2">
          <FormItem label="任务名称：" prop="taskName">
            <Input placeholder="请输入任务名称" v-model="formData.taskName" />
            <span class="input-remark">50字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20" offset="2">
          <FormItem label="任务说明：" prop="taskRemark">
            <Input type="textarea" :rows="8" placeholder="请输入任务说明" v-model="formData.taskRemark" />
            <span class="input-remark">500字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20" offset="2">
          <TaskUpload @success="onUploadSuccess" @remove="onRemove" :beforeUploadCheck="beforeUploadCheck" :defaultList="formData.defaultList" />
        </Col>
      </Row>
      <Col span="2" offset="2" style="position: relative;" v-if="showLoadingSpin">
        <Spin fix style="top: 2px;">
          <Icon type="ios-loading" size=16 class="spin-icon-load"></Icon>
        </Spin>
      </Col>
    </Form>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import api from '@/api/index'
import TaskUpload from './simple-uploader/simple-uploader'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  components: {
    TaskUpload
  },

  props: [ 'value', 'taskItem' ],

  data() {
    return {
      // 表格数据是否加载中
      loading: true,
      formData: {},

      showLoadingSpin: false,
    }
  },

  beforeCreate() {
    this.ruleFormData = {
      taskName: [
        { required: true, message: '任务名称不能为空', trigger: 'blur' },
        { max: 50, message: '任务名称不能超过50字', trigger: 'blur' }
      ],
      taskRemark: [
        { required: true, message: '任务说明不能为空', trigger: 'blur' },
        { max: 500, message: '任务说明不能超过500字', trigger: 'blur' }
      ]
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

  watch: {
    value(newVal) {
      if (newVal) {
        let taskItem = this.taskItem
        this.formData = this.transFormData(taskItem)

        if (!taskItem.attachPath) {
          return
        }

        this.showLoadingSpin = true
        api.getAttachmentDetail({
          fileUrl: taskItem.attachPath
        })
          .then(data => {
            if (data.status == 200) {
              let result = JSON.parse(data.result)
              this.formData.defaultList = [
                { 
                  name: result.result.orgFileName,
                  path: result.result.orgFileName
                }
              ]
            }
          })
          .finally(() => {
            this.showLoadingSpin = false
          })
      }
    }
  },

  methods: {
    ...mapActions({
      updateTaskItem: 'courseCenter/updateTaskItem'
    }),

    transFormData(o) {
      let _ = this._
      //  'defaultList': [ { name: '', path: '' } ] 
      return _.assign({ defaultList: [] }, o)
    },

    ok() {
      let _ = this._
      let formData = this.formData
      let taskItem = this.taskItem

      let originItem = {
        taskId: taskItem.id,
        name: taskItem.taskName,
        remark : taskItem.taskRemark,
        attachPath: taskItem.attachPath
      }

      let item = {
        taskId: formData.id,
        name: formData.taskName,
        remark : formData.taskRemark,
        attachPath: formData.attachPath
      }

      this.$refs.updationForm.validate(valid => {
        if (valid) {
          let status
          this.modalShow = false
          this.updateTaskItem({ item, originItem })
            .then(data => {
              status = data.status
            })
            .catch(err => {})
            .finally(() => {
              if (status == 200) {
                this.$Message.success('修改成功！')
              } else { 
                this.$Message.error('修改失败，请重试！')
              }
            })
        } else {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }
      })
    },

    beforeUploadCheck(file) {
      if (this.formData.attachPath) {
        return {
          type: 'warning',
          message: '只能上传一个附件'
        }
      }
    },

    onUploadSuccess(result) {
      this.formData.attachPath = result.url
    },

    onRemove() {
      this.formData.attachPath = ''
    }
  }
}
</script>

<style lang="less" scoped>
.updation-modal {
  .input-remark {
    position: absolute;
    right: 0;
    bottom: -30px;
    color: #ccc;
  }

  .spin-icon-load {
    transform-origin: 50% 50%;
    animation: ani-spin 1s linear infinite;
  }

  @keyframes ani-spin {
    from { transform: rotate(0deg) }
    50%  { transform: rotate(180deg) }
    to   { transform: rotate(360deg) }
  }
}
</style>
