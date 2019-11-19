<template>
  <Modal
    title="新建目标任务"
    v-model= "newthetaskShow"
    class-name="vertical-center-modal"
    width="560"
    :loading="loading"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <Row class="new-task-select">
        <Col class="m-t10" span="17">
          <FormItem label="选择阶段：" prop="stageList">
            <Select style="width:400px" placeholder="阶段目标名称" @on-change="changeVal" v-model="formValidate.stageList">
              <Option :title="item.stageName" v-for="item in stageList" :value="item.stageId+''" :key="item.id">{{ item.stageName||'' }}</Option>
            </Select>
          </FormItem>
        </col>
        <Col class="m-t20" span="17">
          <FormItem label="选择任务：" prop="taskList">
            <Select style="width:400px" placeholder="任务目标名称" @on-change="changevalue" v-model="formValidate.taskList">
              <Option :title="item.taskName" v-for="item in taskList" :value="`${item.taskId}-${item.taskRemark}`" :key="item.id">{{item.taskName||''}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col class="m-t20" span="22" offset="1" style="word-break:break-all;word-wrap:break-word;">任务要求：{{formValidate.taskRemark||''}}</Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  props: ['isNewthetask', 'newStageList', 'query'],
  data() {
    return {
      loading: true,
      stageId: '',
      taskId: '',
      formValidate: {
        stageList: '',
        taskList: '',
        taskRemark: ''
      },
      ruleValidate: {
        stageList: [
          {
            required: true,
            message: '请选择阶段目标名称'
          }
        ],
        taskList: [
          {
            required: true,
            message: '请选择任务目标名称'
          }
        ]
      }
    }
  },
  computed: {
    newthetaskShow: {
      get() {
        return this.isNewthetask
      },
      set(val) {
        this.$emit('update:isNewthetask', val)
      }
    },
    ...mapState({
      taskList: state => {
        return state.recordOfCommunication.newTaskData
      }
    }),
    stageList() {
      return this.newStageList
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['getChooseTask', 'postSaveTask', 'getOfCommunication']),
    func(id) {
      //选择任务
      this.getChooseTask({
        stageId: id
      })
    },
    changeVal(value) {
      let val = value*1;
      this.formValidate.taskList = "";
      this.formValidate.taskRemark = "";
      this.func(val)
    },
    changevalue(value) {
      this.taskId = value && value.split('-')[0];
      this.formValidate.taskRemark = value && value.split('-')[1];
    },
    //确认
    asyncOK() {
      let self = this
      this.$refs.formValidate.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
        let status
        this.postSaveTask({
          'task-id': this.taskId,
          'course-id': this.query.courseId,
          'student-id': this.query.userId
        })
          .then(data => {
            status = data.status
            return status
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            if (status == 201) {
              self.getOfCommunication({
                studentId: this.query.userId,
                courseId: this.query.courseId
              })
              self.$Message.success({
                content: '新建成功！',
                duration: 1,
                onClose: function(){
                  self.newthetaskShow = false;
                }
              })
              setTimeout(()=>{
                this.$refs.formValidate.resetFields()
              })
            } else if (status == 423) {
              self.newthetaskShow = false
              self.$Message.error('任务进行中，无法再次创建！')
            } else if (status == 409) {
              self.newthetaskShow = false
              self.$Message.error('当前登录人不是学员所在群的班主任或导师！')
            } else {
              self.newthetaskShow = false
              self.$Message.error('新建失败，请重试！')
            }
          })
      })
    },
    cancel() {
      this.newthetaskShow = false;
      this.$refs.formValidate.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.v-transfer-dom /deep/.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
.ivu-btn span {
  color: #fff;
}
.m-t10 {
  margin-top: 10px;
}
.m-t20 {
  margin-top: 20px;
  span {
    color: #ccc;
  }
}
.new-task-select{
  /deep/ .ivu-select-dropdown{
    width:92%;
    .ivu-select-dropdown-list .ivu-select-item{
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>