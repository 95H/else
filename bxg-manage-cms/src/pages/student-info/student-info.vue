<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="card-title">学籍卡信息</p>
                <div>
                     <Row :gutter="16">
                        <Col span="4"><strong>用户名：</strong>{{studentInfo.name}}</Col>
                        <Col span="4"><strong>真实姓名：</strong>{{studentInfo.realName}}</Col>
                        <Col span="4"><strong>UID：</strong>{{studentInfo.itcastUuid}}</Col>
                        <Col span="4"><strong>注册时间：</strong>{{studentInfo.createTime}}</Col>
                        <Col span="4"><strong>性别：</strong>{{studentInfo.sex==0?'女':'男'}}</Col>
                        <Col span="4"><strong>年龄：</strong>{{studentInfo.age}}</Col>
                    </Row>
                    <Row :gutter="16" style="margin-top: 20px;">
                        <Col span="4"><strong>手机号：</strong>{{studentInfo.mobile}}</Col>
                        <Col span="4"><strong>QQ号：</strong>{{studentInfo.qq}}</Col>
                        <Col span="4"><strong>邮箱：</strong>{{studentInfo.email}}</Col>
                        <Col span="4"><strong>毕业院校：</strong>{{studentInfo.schoolName}}</Col>
                        <Col span="4"><strong>专业：</strong>{{studentInfo.major}}</Col>
                        <Col span="4"><strong>学历：</strong>{{studentInfo.education}}</Col>
                    </Row>
                </div>
            </Card>
        </Row>
        <Row style="margin-top: 10px;">
            <Card>
                 <Tabs @on-click="tabClick" v-model="tabName">
                    <TabPane label="课程详情" name="name1" v-if="haskechengxiangqing">
                      <classroom :from="from" v-if="tabName == 'name1'"></classroom>
                    </TabPane>
                    <TabPane label="操作日志" name="name2" v-if="hascaozuorizhi">
                      <operationlog :from="from" v-if="tabName == 'name2'"></operationlog>
                    </TabPane>
                    <TabPane label="问答提问" name="name3" v-if="haswendatiwen">
                      <question :from="from" v-if="tabName == 'name3'"></question>
                    </TabPane>
                    <TabPane label="登录日志" name="name4">
                      <loginlog :from="from" v-if="tabName == 'name4'"></loginlog>
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
    </div>
</template>
<script>
import classroom from './classroom'
import operationlog from './operationlog'
import question from './question'
import loginlog from './loginlog'
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    classroom,
    operationlog,
    question,
    loginlog
  },
  data() {
    const from = this.$route.query.from

    let haskechengxiangqing
    let hascaozuorizhi
    let haswendatiwen

    if (from == 'learning-manage-mentor_my-students') {
      haskechengxiangqing = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_courses_details')
      hascaozuorizhi = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_questions')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haskechengxiangqing = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_courses_details')
      hascaozuorizhi = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_questions')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haskechengxiangqing = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_courses')
      hascaozuorizhi = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_questions')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haskechengxiangqing = true
      hascaozuorizhi = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_questions')
    } else if (from == 'learning-manage-stat_student-list') {
      haskechengxiangqing = this.hasSomeApiAccess('teaching_students_process_data_cards_courses')
      hascaozuorizhi = this.hasSomeApiAccess('teaching_students_process_data_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('teaching_students_process_data_cards_asks')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haskechengxiangqing = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_courses_details')
      hascaozuorizhi = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_questions')
    } else if (from == 'student-management' 
      || from == 'sales-manage_order-manage' 
      || from == 'sales-manage_dredge-class'
      || from == 'sales-manage_back-tracking-order'
      || from == 'finance-manage_back-tracking-pay'
      || from == 'finance-manage_back-tracking-check'
    ) {
      haskechengxiangqing = this.hasSomeApiAccess('users_students_cards_courses')
      hascaozuorizhi = this.hasSomeApiAccess('users_students_cards_logs')
      haswendatiwen = this.hasSomeApiAccess('users_students_cards_asks')
    }

    const tabMap = {
      '0': 'name1',
      '1': 'name2',
      '2': 'name3',
      '4': 'name4'
    }
    const tabAccessArr = [haskechengxiangqing, hascaozuorizhi, haswendatiwen]
    const index = tabAccessArr.indexOf(true)
    const tabName = tabMap[index]

    return {
      tabName: tabName,
      from,
      haskechengxiangqing,
      hascaozuorizhi,
      haswendatiwen,
      tab1: true,
      tab2: false,
      tab3: false,
      uuid: this.$route.query.uuid || ''
    }
  },
  mounted() {
    this.fetchStudentInfo({
      uuid: this.uuid
    })
  },
  methods: {
    ...mapActions(['fetchStudentInfo']),
    tabClick(name) {
      this.tabName = name
    }
  },
  computed: {
    ...mapState({
      studentInfo: state => state.learningCenter.studentInfo
    })
    /*  ...mapGetters({
      doneTodosCount: "doneTodos"
    }) */
  }
}
</script>

<style lang="less">
</style>
