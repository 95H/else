<template>
  <div class="stuinfo_detail">
    <Card>
       <p slot="title" class="card-title">{{stuinfo_box_title}}</p>
        <Row :gutter="16">
              <Col span="4">
              <strong>UID:</strong>{{stuUID}}
              </Col>
              <Col span="4">
              <strong>手机号/邮箱:</strong>{{stuAccount}}
              </Col>
              <Col span="4">
              <strong>报名日期:</strong>{{stuApplyTime}}
              </Col>
              <Col span="4">
              <strong>剩余服务天数:</strong>{{stuResidueDay}}
              </Col>
        </Row>
        <Row :gutter="16" style="margin-top:20px;">
              <Col span="4">
              <strong>服务截止日期:</strong>{{serverAbort}}
              </Col>
              <Col span="4">
              <strong>整体进度:</strong>{{entiretyPlan}}
              </Col>
              <Col span="10">
              <strong>当前学习位置（模块：已完成/总节）:</strong>{{presentStudy}}
              </Col>
        </Row>
    </Card>
   <Card style="margin-top:20px;">
      <Tabs
        class="stuinfo_table" 
        v-model="tabName"
        @on-click="tabClick"
      >
        <TabPane label="学员动态" name="name1" v-if="hasdongtai">
          <stuCondition/>
        </TabPane>
        <TabPane label="课程模块" name="name2" v-if="haskecheng">
          <stuClassModule v-if="tabName === 'name2'" :from="from" />
        </TabPane>
        <TabPane label="阶段与阶段作业" name="name3" v-if="hasjieduanzuoye">
          <stuClassPhase v-if="tabName === 'name3'" />
        </TabPane>
        <TabPane label="学习轨迹" name="name4" v-if="hasxuexiguiji">
          <stuClassTrack v-if="tabName === 'name4'"/>
        </TabPane>
        <TabPane label="拓展资料" name="name5" v-if="hastuozhan">
          <stuClassExpand v-if="tabName === 'name5'" :from="from" />
        </TabPane>
        <TabPane label="学习反馈" name="name6" v-if="hasfankui">
          <stuClassFeedback v-if="tabName === 'name6'" :from="from" />
        </TabPane>
        <TabPane label="笔记管理" name="name7" v-if="hasbiji">
          <stucClassNote v-if="tabName === 'name7'" :from="from" />
        </TabPane>
        <TabPane label="问答提问" name="name8" v-if="haswenda">
          <stuClassQuestions v-if="tabName === 'name8'" :from="from" />
        </TabPane>
    </Tabs>
   </Card>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import stuCondition from './stu-condition'
import stuClassModule from './stu-class-module'
import stuClassPhase from './stu-class-phase'
import stuClassTrack from './stu-class-track'
import stuClassFeedback from './stu-class-feedback'
import stucClassNote from './stu-class-note'
import stuClassQuestions from './stu-class-questions'
import stuClassExpand from './stu-class-expand'
export default {
  name:'stuinfoDetail',
  components: {
    stuCondition,
    stuClassModule,
    stuClassPhase,
    stuClassTrack,
    stuClassFeedback,
    stucClassNote,
    stuClassQuestions,
    stuClassExpand
  },
  data() {
    const from = this.$route.query.from

    let hasdongtai
    let haskecheng
    let hasjieduanzuoye
    let hasxuexiguiji
    let hastuozhan
    let hasfankui
    let hasbiji
    let haswenda
    
    if (from == 'learning-manage-mentor_my-students') {
      hasdongtai = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_questions')
    } else if (from == 'learning-manage-headteacher_my-students') {
      hasdongtai = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_questions')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      hasdongtai = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_feedbacks') 
      hasbiji = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_questions')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      hasdongtai = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_questions')
    } else if (from == 'learning-manage-stat_student-list') {
      hasdongtai = this.hasSomeApiAccess('teaching_students_process_data_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_students_process_data_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_students_process_data_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_students_process_data_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_students_process_data_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_students_process_data_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_students_process_data_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_students_process_data_students_details_questions')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      hasdongtai = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_questions')
    } else if (from == 'class-stu-manage_employment_see-students') {
      hasdongtai = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_questions')
    } else if (from == 'class-stu-manage_small-class_see-students') {
      hasdongtai = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_dynamic')
      haskecheng = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_modules')
      hasjieduanzuoye = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_phasehomework')
      hasxuexiguiji = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_path')
      hastuozhan = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_extensions')
      hasfankui = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_feedbacks')
      hasbiji = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_notes')
      haswenda = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_questions')
    } else if (from == 'learning-manage-stat_student-info') {
      hasdongtai = true
      haskecheng = true
      hasjieduanzuoye = true
      hasxuexiguiji = true
      hastuozhan = true
      hasfankui = true
      hasbiji = true
      haswenda = true
    }

    const tabMap = {
      '0': 'name1',
      '1': 'name2',
      '2': 'name3',
      '3': 'name4',
      '4': 'name5',
      '5': 'name6',
      '6': 'name7',
      '7': 'name8'
    }
    const tabAccessArr = [hasdongtai, haskecheng, hasjieduanzuoye, hasxuexiguiji, hastuozhan, hasfankui, hasbiji, haswenda]
    let index = tabAccessArr.indexOf(true)
    const tabName = tabMap[index]

    return {
      from: from,
      hasdongtai: hasdongtai,
      haskecheng: haskecheng,
      hasjieduanzuoye: hasjieduanzuoye,
      hasxuexiguiji: hasxuexiguiji,
      hastuozhan: hastuozhan,
      hasfankui: hasfankui,
      hasbiji: hasbiji,
      haswenda: haswenda,
      tabName: tabName, //控制tab显示
      stuinfo_box_title: '',
      stuUID: 0,
      stuAccount: 0,
      stuApplyTime: '',
      stuResidueDay: 0,
      serverAbort: '',
      entiretyPlan: '',
      presentStudy: ''
    }
  },
  methods: {
    ...mapActions([
      "fetchStudyDetails"
    ]),
    async _initState() {
      let uInfo = this.$route.query
      await this.fetchStudyDetails({
        stuCourseId: uInfo.stuCourseId
      })
      try {
        let studyResult = this.$store.state.stuCondition.studyDetails
        this.stuUID = studyResult.uid
        this.stuAccount = studyResult.loginName
        this.stuApplyTime = studyResult.registTime
        this.stuResidueDay = studyResult.serviceDays
        this.serverAbort = studyResult.serviceExpires
        this.entiretyPlan = studyResult.learnProcess
        this.presentStudy = studyResult.learnPosition
        this.stuinfo_box_title = studyResult.userName + '-' + studyResult.courseName
      } catch (error) {
        console.log(error)
      }
    },
    tabClick(name) {
      this.tabName = name
    }
  },
  created () {
    this._initState()
  },
  computed: {
    ...mapState({
      studyDetails: state => state.stuCondition.studyDetails
    })
  },
}
</script>

<style lang="less" scoped>
.stuinfo_detail{
  min-width: 1200px;
  .stuinfo_box{
    color: #999999;
    .stuinfo_box_first{
      display: flex;
      h5{
        margin-left: 10px;
      }
    }
    .stuinfo_box_second{
      display: flex;
      width: 1200px;
      h6,h5,h4,h3,h2{
        font-size: 12px;
        margin-top: 10px;
        margin-right: 15px;
      }
    }
  }
  .stuinfo_table{
    margin-top: 20px;
  }
}
</style>


