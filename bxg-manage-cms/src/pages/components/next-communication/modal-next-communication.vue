<template>
  <Modal
    title="新建沟通记录"
    v-model= "nextCommunicationShow"
    class-name="vertical-center-modal"
    width="560"
    :loading="loading"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel">
     <Form ref="formData" :model="formData" :rules="ruleData">
      <Row :gutter="40">
        <Col class="m-t10">
           <FormItem label="选择老师：" prop="teacherName">
            <Select placeholder="选择老师" v-model="formData.teacherName" @on-change="changeValTeacher">
              <Option v-for="(item, index) in teacherList" :value="item.groupAssistantId" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </col>
        <Col class="m-t10">
          <FormItem label="完成时间：" prop="planTimes">
            <DatePicker style="width:100%" type="date" :options="optionsDate" placeholder="选择计划完成时间" v-model="formData.planTimes" @on-change="changeValTime"></DatePicker>
          </FormItem>
        </Col>
        <Col class="m-t10">
          <FormItem label="内容：" prop="planText">
            <Input type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." v-model="formData.planText"  @on-change="changeValText"/>
            <p style="text-align:right;color:#ccc">500字</p>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  props: ['isNextcommunication', 'teacherList', 'groupId', 'initStuCourse', 'defaultTeacher'],
  data() {
    return {
      loading: true,
      formObj:{},
      //日期
      optionsDate: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now()-86400000;
        }
      },
      formData: {
        teacherName:'',
        teacherId:'',
        planTimes: '',
        planText: ''
      },
      ruleData: {
        teacherName: [{
            required: true,
            message: '请选择老师'
        }],
        planTimes: [{
            required: true,
            message: '请选择计划完成时间'
        }],
        planText: [{
          max: 500,
          message: '最多输入500字',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    nextCommunicationShow: {
      get() {
        return this.isNextcommunication
      },
      set(val) {
        this.$emit('update:isNextcommunication', val)
      }
    },
    // ...mapState({
    //   default_teacher: state => state.recordOfCommunication.default_teacher
    // })
  },
  methods: {
    changeValTeacher(val){
      this.formData.teacherId = val || this.defaultTeacher;
      this.teacherList.map((item,index)=>{
        if(item.groupAssistantId == this.formData.teacherId){
          this.formObj.teacherName = item.name;
        }
      })
    },

    changeValTime(date){
      this.formData.planTimes = date;
      this.formObj.planTimes = this.formData.planTimes
    },
    changeValText(val){
      this.formObj.planText = this.formData.planText
    },
    //确认
    asyncOK() {
      this.$refs.formData.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }

        api.postSavePlan({
          stageGroupId: this.groupId,
          stuCourseId: this.initStuCourse,
          assistantId: this.formData.teacherId || this.defaultTeacher,
          finishTimeStr: this.formData.planTimes,
          content: this.formData.planText
        }).then(res => {
          if (res.status === 201) {
            this.$emit('next-data', this.formObj);
            this.nextCommunicationShow = false;
            this.$Message.success('新建成功！');
            setTimeout(() => {
              this.$refs.formData.resetFields();
            })
          } else if (res.status === 401){
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
            this.$Message.warning('登录人不是班主任或导师！')
          } else if (res.status === 403){
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
            this.$Message.warning('登录人不是群的班主任或导师！')
          } else if (res.status === 404){
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
            this.$Message.warning('学员不在这个群！')
          } else if (res.status === 406){
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
            this.$Message.warning('沟通人不是群的班主任或导师！')
          }else if (res.status === 408){
            this.$Message.warning('沟通人不存在真实邮箱！');
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
          }else if (res.status === 409){
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
            this.$Message.warning('登录人当前角色与群关联的角色不匹配！')
          }else if (res.status === 410){
            this.nextCommunicationShow = false;
            this.$refs.formData.resetFields();
            this.$Message.warning('学员课程状态非正常！')
          } else {
            this.$Message.error('新建失败~');
            this.loading = false;
          }
        })
      })
    },
    cancel() {
      this.$refs.formData.resetFields();
    }
  },
  watch:{
    defaultTeacher(val){
      this.formData.teacherName = val;
      this.teacherList.map((item,index)=>{
        if(item.groupAssistantId == val){
          this.formObj.teacherName = item.name;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>