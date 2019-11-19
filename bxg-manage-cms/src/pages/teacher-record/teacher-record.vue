<template>
    <div>
        <Card v-if="targetData">
            <h3 class="bord-left">目前任务</h3>
            <Row style="margin-top:20px;">
                <Col span="12">
                <strong>当前阶段：</strong>{{targetData.stageName}}
                </Col>
                <Col span="12">
                <strong>当前学习任务：</strong>{{targetData.stageName}}
                </Col>
            </Row>
            <Row style="margin-top:20px;">
                <Col span="24" style="word-break:break-all;word-wrap:break-word;">
                <strong>任务描述：</strong>{{targetData.taskRemark}}
                </Col>
            </Row>
        </Card>
        <Card v-else>
            <h3 class="bord-left">目前任务</h3>
            <Row style="margin-top:20px;">
                <Col span="12">
                  <strong>暂无任务</strong>
                </Col>
            </Row>
        </Card>
        <Card style="margin-top:10px;">
            <h3 class="bord-left">沟通记录</h3>
            <Row style="margin-top:20px;">
              <p style="margin-left:16px;margin-bottom:10px;"><strong>学员姓名：</strong>{{studentName}}</p>
                <Col span="24">
                    <Tabs value="1" @on-click="tabActive">
                        <TabPane label="有效联系" name="1">
                          <template v-if="tab1">
                            <effective-contact v-if="targetData" :studentTaskId="targetData.id" v-on:effectformData="effectformObj" ref="children"/>
                            <div v-else>
                              <effective-contact :studentTaskId="''" v-on:effectformData="effectformObj" ref="children"/>
                            </div>
                          </template>
                        </TabPane>
                        <TabPane label="未联系上" name="2">
                          <template v-if="tab2">
                            <invalid-contact v-if="targetData" :studentTaskId="targetData?targetData.id:''" v-on:invalidformData="invalidformObj" ref="children"/>
                            <div v-else>
                              <invalid-contact :studentTaskId="''" v-on:invalidformData="invalidformObj" ref="children"/>
                            </div>
                          </template>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Card>
        <relevance-communication style="margin-top:10px;" v-on:planId="associatedPlanId"/>
        <Card style="margin-top:10px;">
          <next-communication :groupId="groupId" :initStuCourse="studentCourseId"/>
          <Row style="margin-top:20px;">
              <Col span="24" style="text-align: center;">
                  <span style="margin-right:30px;"><Button @click="determineClick" size="large" type="primary"  :loading="loading">确定</Button></span>
                  <span><Button size="large" @click="cancel">取消</Button></span>
              </Col>
          </Row>
        </Card>
    </div>
</template>

<script>
import api from '@/api/index'
import effectiveContact from './effective-contact'
import invalidContact from './invalid-contact'
import RelevanceCommunication from '../components/relevance-communication/relevance-communication'
import NextCommunication from '../components/next-communication/next-communication'
import { mapActions, mapState } from 'vuex';
export default {
  name: 'teacher-record',
  components: {
    effectiveContact,
    invalidContact,
    RelevanceCommunication,
    NextCommunication
  },
  data() {
    return {
      loading: false,
      tab1: true,
      tab2: false,
      targetData: null,
      studentTaskId: null,
      studentId: this.$route.query.studentId || this.$route.query.userId || '',
      courseId: this.$route.query.courseId || '',
      groupId: this.$route.query.groupId || '',
      studentCourseId: '',
      studentName: '',
      relevancePlanId: null,
      effectformList: null,
      invalidformList: null
    }
  },
  created() {
    console.log(this.$route.query)
    this.fetchInit();
    this.fetchCurrentTask({
      studentId: this.studentId,
      courseId: this.courseId
    })
  },
  updated(){
    this.effectformObj()
    this.invalidformObj()
  },
  methods: {
    ...mapActions([
      'getRelevance'
    ]),
    fetchInit() {
      api.getInitCommunication({
        groupId: this.groupId,
        studentId: this.studentId,
        courseId: this.courseId
      }).then(res=>{
        if(res.status === 200){
          this.studentName = res.result[0].studentName;
          this.studentCourseId = res.result[0].studentCourseId;
          this.getRelevance({
            groupId: this.groupId,
            studentCourseId: res.result[0].studentCourseId
          })
        }
      })
    },
    async fetchCurrentTask(params) {
      let result = await api.getCurrentTask(params)
      if (result.status === 200) {
        this.targetData = result.result;
        this.studentTaskId = result.result && result.result.id
      } else {
        this.$Message.warning(result.message)
      }
    },
    tabActive(val) {
      if (val === '1') {
        this.tab1 = true
        this.tab2 = false
      } else {
        this.tab1 = false
        this.tab2 = true
      }
    },
    associatedPlanId(val){
      this.relevancePlanId = val
    },
    effectformObj(val){
      this.effectformList = {...val}
    },
    invalidformObj(val){
      this.invalidformList = {...val}
    },
    //整体提交
    determineClick() {
      this.loading = true;
      let fetchObj ={
        ...this.effectformList,
        ...this.invalidformList,
        studentTaskId: this.studentTaskId,
        studentId: this.studentId,
        courseId: this.courseId,
        groupId: this.groupId,
        planId: this.relevancePlanId
      }
      setTimeout(() => {
        this.$refs.children.$refs.formbox.validate(valid=>{
          if (valid) {
            this.loading = true
            api.postCommunicationRecord(fetchObj).then(res=>{
              switch(true){
                case res.status == 201:
                  this.$Message.success('创建成功！');
                  this.loading = false;
                  this.$refs.children.$children[0].resetFields()
                  this.$router.back();
                  this.$store.commit("removeTag", 'teacher_record');
                  this.$store.commit("closePage", 'teacher_record');
                  break;
                case res.status == 400:
                  alert(2134)
                  this.$Message.error('沟通要点和学习效果风险评估不能为空！')
                  this.loading = false
                  this.$router.back()
                  break;
                case res.status == 423:
                  this.$Message.error('学员已经有该课程下进行中的任务，无法再次创建！')
                  this.loading = false
                  break;
                case res.status == 401:
                  this.$Message.error('当前登录人不是学员所在群的导师或副导师，不能完成或新建任务！')
                  this.loading = false
                  break;
                case res.status == 403:
                  this.$Message.error('当前登录人不是学员所在群的班主任或导师！')
                  this.loading = false
                  break;
                case res.status == 404:
                  this.$Message.error('任务不存在或被删除或未启用！')
                  this.loading = false
                  break;
                case res.status == 405:
                  this.$Message.error('当前登录人不是导师或班主任！')
                  this.loading = false
                  break;
                case res.status == 406:
                  this.$Message.error('学员任务不是进行中状态，不能完成！')
                  this.loading = false
                  break;
                case res.status == 409:
                  this.$Message.error('登录人角色与所要创建的沟通记录类型不匹配！')
                  this.loading = false
                  break;
                case res.status == 410:
                  this.$Message.error('学员任务不存在或已删除或已完成！')
                  this.loading = false
                  break;
                case res.status == 417:
                  this.$Message.error('该学员状态已退费或已休学！')
                  this.loading = false
                  break;
              }
            })
          }
        })
        this.$nextTick(() => {
          this.loading = false
        })
      }, 500)
    },
    cancel() {
      this.$refs.children.$children[0].resetFields();
      this.$router.back();
      this.$store.commit("removeTag", 'teacher_record');
      this.$store.commit("closePage", 'teacher_record');
    }
  }
}
</script>

<style lang="less" scoped>
.bord-left {
  border-left: 5px solid #2d8cf0;
  line-height: 1;
  padding-left: 10px;
}
</style>
