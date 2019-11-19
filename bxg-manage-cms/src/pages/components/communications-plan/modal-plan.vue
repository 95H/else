<template>
 <Modal
    title="新建沟通记录"
    v-model= "isPlanModalshow"
    class-name="vertical-center-modal"
    width="500"
    :loading="loading"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel"
    >
    <Form ref="formPlan" :model="formPlan" :rules="rulePlan">
      <Row :gutter="40">
        <Col>
          <FormItem label="选择阶段群：" prop="stageGroupName">
            <Select placeholder="请选择阶段群" v-model="formPlan.stageGroupName" @on-change="changeValGroup">
              <Option v-for="(item, index) in groups_list" :value='item.id' :key="index">{{ item.stageGroupName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="选择学员：" prop="studentName">
            <Select placeholder="请选择学员" v-model="formPlan.studentName" :filterable="true" @on-change="changeValStudent">
              <Option v-for="(item, index) in groups_students" :label='item.realName + "   课程：" + item.courseName' :value="item.stuCourseId" :key="index">{{item.realName}}&ensp;&ensp;课程：{{item.courseName}}<span style="display: none;">{{item.itcastUUID}}{{item.loginName}}</span></Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="沟通人：" prop="teacherName">
            <Select placeholder="请选择沟通人" v-model="formPlan.teacherName" @on-change="changeValTeacher">
              <Option v-for="(item, index) in groups_teacher" :value="item.groupAssistantId" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="完成时间：" prop="planTimes">
            <DatePicker type="date" :options="optionsDate" style="width:100%" placeholder="选择计划完成时间" v-model="formPlan.planTimes" @on-change="changeValTime"></DatePicker>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="内容：" prop="planContent">
            <Input type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." v-model="formPlan.planContent"></Input>
            <p style="text-align:right;color:#ccc">500字</p>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['type', 'isPlanModal'],
  data() {
    let self = this
    return {
      loading: true,
      group_id: null,
      student_id: null,
      teacher_id: null,
      optionsDate: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now()-86400000;
        }
      },
      formPlan: {
        stageGroupName: '',
        teacherName: '',
        studentName: '',
        planTimes: '',
        planContent: ''
      },
      rulePlan: {
        stageGroupName: [
          {
            required: true,
            message: '阶段群名称不能为空！'
          }
        ],
        teacherName: [
          {
            required: true,
            message: '沟通人不能为空！'
          }
        ],
        studentName: [
          {
            required: true,
            message: '学员姓名不能为空！'
          }
        ],
        planTimes:[
          {
            required: true,
            message: '完成时间不能为空！'
          }
        ],
        planContent:[
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  created(){
    this.fetchGroups()
  },
  computed: {
    isPlanModalshow: {
      get() {
        return this.isPlanModal
      },
      set(val) {
        this.$emit('update:isPlanModal', val)
      }
    },
    ...mapState({
      groups_list: state => state.communicationPlans.groups_data,
      groups_students: state => state.communicationPlans.groups_students,
      groups_teacher: state => state.communicationPlans.groups_teacher,
      default_teacher: state => state.communicationPlans.default_teacher
    })
  },
  methods:{
    ...mapActions([
      'getGroupsCurrentLogin',
      'getGroupsStudents',
      'getTeacher',
      'postSavePlan'
    ]),
    //选择阶段
    async fetchGroups() {
      await this.getGroupsCurrentLogin({
        type: this.type
      })
    },
    async changeValGroup(val){
      if (!val) return
      // this.formPlan.studentName = '';
      // this.formPlan.teacherName = '';
      this.group_id = val;
      //选择学员
      await this.getGroupsStudents({
        groupId: this.group_id
      })
      //选择沟通人
      await this.getTeacher({
        id: this.group_id
      })
      this.formPlan.teacherName = this.default_teacher
    },
    //选择沟通人
    changeValStudent(val){
      this.student_id = val
    },
    changeValTeacher(val){
      this.teacher_id = val
    },
    changeValTime(date){
      this.formPlan.planTimes = date
    },
    //关闭弹窗
    cancel() {
      this.$refs.formPlan.resetFields()
    },
    //保存沟通计划接口
    async fetchSavePlan(params) {
      let result = await api.postSavePlan(params)
      return result
    },
    //确定
    asyncOK() {
      this.$refs.formPlan.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
        this.fetchSavePlan({
          stageGroupId: this.group_id,
          stuCourseId: this.student_id,
          assistantId: this.teacher_id || this.default_teacher,
          finishTimeStr: this.formPlan.planTimes,
          content: this.formPlan.planContent
        }).then(res => {
          if (res.status === 201) {
            this.$Message.success('创建成功！');
            this.$parent.$parent.fecthPlans();
            this.isPlanModalshow = false;
            setTimeout(() => {
              this.$refs.formPlan.resetFields();
            })
          } else if (res.status === 401){
            this.$Message.warning('登录人不是班主任或导师！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          } else if (res.status === 403){
            this.$Message.warning('登录人不是群的班主任或导师！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          } else if (res.status === 404){
            this.$Message.warning('学员不在这个群！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          } else if (res.status === 406){
            this.$Message.warning('沟通人不是群的班主任或导师！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          }else if (res.status === 408){
            this.$Message.warning('沟通人不存在真实邮箱！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          }else if (res.status === 409){
            this.$Message.warning('登录人当前角色与群关联的角色不匹配！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          }else if (res.status === 410){
            this.$Message.warning('学员课程状态非正常！');
            this.isPlanModalshow = false;
            this.$refs.formPlan.resetFields();
          } else {
            this.$Message.error('创建失败~');
            this.loading = false;
          }
        })
      })
    }
  },
  // beforeDestroy() {
  //   console.log(111,this.$store.state.communicationPlans.default_teacher)
  //   // this.$store.state.communicationPlans.default_teacher = ""
  //   console.log(111,this.$store.state.communicationPlans.default_teacher)
  // }
}
</script>

