<template>
  <Row>
    <Col span="24">
      <Card>
        <Tabs v-model="tabName" @on-click="tabClick">
          <TabPane
            label="最新统计数据"
            name="name1"
            v-if="hasSomeApiAccess('teaching_students_process_teachers_statistics_latest')"
          >
            <latest-statistics :type="type" v-if="tabName === 'name1'" from="learning-manage-headteacher" />
          </TabPane>
          <TabPane
            label="周统计数据"
            name="name2"
            v-if="hasSomeApiAccess('teaching_students_process_teachers_statistics_groups_weekly')"
          >
            <week-statistics :type="type" v-if="tabName === 'name2'"/>
          </TabPane>
          <TabPane
            label="我的学员"
            name="name3"
            v-if="hasSomeApiAccess('teaching_students_process_teachers_students')"
          >
            <my-students
              :type="type"
              v-if="tabName === 'name3'"
              from="learning-manage-headteacher"
            />
          </TabPane>
          <TabPane
            label="阶段群"
            name="name4"
            v-if="hasSomeApiAccess('teaching_students_process_teachers_groups')"
          >
            <stage-of :type="type" v-if="tabName === 'name4'" from="learning-manage-headteacher"/>
          </TabPane>
          <TabPane
            label="沟通计划"
            name="name5"
            v-if="hasSomeApiAccess('teaching_students_process_teachers_plans')"
          >
            <communications-plan :type="type" v-if="tabName === 'name5'" from="learning-manage-headteacher" />
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>
</template>

<script>
import LatestStatistics from '../../components/latest-statistics/latest-statistics'
import weekStatistics from '../../components/week-statistics/week-statistics'
import MyStudents from '@/components/my-students/my-students'
import StageOf from '@/components/stage-of/stage-of'
import CommunicationsPlan from '../../components/communications-plan/communications-plan'
export default {
  name: 'learningManageHeadTeacher',
  data() {
    const tabMap = {
      'teaching_students_process_teachers_statistics_latest': 'name1',
      'teaching_students_process_teachers_statistics_groups_weekly': 'name2',
      'teaching_students_process_teachers_students': 'name3',
      'teaching_students_process_teachers_groups': 'name4',
      'teaching_students_process_teachers_plans': 'name5'
    }

    const tabAccessArr = this.calcApiAccess(Object.keys(tabMap))

    const tabName = tabMap[tabAccessArr[0]]

    return {
      type: 2,
      tabName: tabName,
      includePage: 'MyStudents'
    }
  },
  components: {
    LatestStatistics,
    weekStatistics,
    MyStudents,
    StageOf,
    CommunicationsPlan
  },
  beforeRouteLeave(to, from, next) {
    let keepAlivePaths = {
      // 我的学员
      teacher_record: 1,
      learning_task_headteacher: 1,
      stuinfo_detail: 1,
      student_info: 1,
      // 阶段群
      teacher_students_list: 1,
      // 临时解决关闭所有标签后回到首页，keepAlive设为false的情况
      home_index: 1
    }
    if (keepAlivePaths[to.name]) {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  methods: {
    tabClick(name) {
      this.tabName = name
    }
  }
}
</script>
