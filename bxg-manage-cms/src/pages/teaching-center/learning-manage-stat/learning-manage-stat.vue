<template>
  <div class="learning-manage-stat">
    <Row>
      <Col span="24">
        <Card>
          <Tabs v-model="currentTab" :animated="false">
            <TabPane label="学科最新汇总数据" name="subject_stat" v-if="hasSomeApiAccess('teaching_students_process_data_statistics_subjects_latest')">
              <SubjectStat v-if="currentTab == 'subject_stat'"/>
            </TabPane>
            <TabPane label="阶段最新汇总数据" name="stage_stat" v-if="hasSomeApiAccess('teaching_students_process_data_statistics_phases_latest')">
              <StageStat v-if="currentTab == 'stage_stat'"/>
            </TabPane>
            <TabPane label="阶段群最新汇总数据" name="stage_group_stat" v-if="hasSomeApiAccess('teaching_students_process_data_statistics_groups_latest')">
              <StageGroupStat v-if="currentTab == 'stage_group_stat'"/>
            </TabPane>
            <TabPane label="学科周汇总数据" name="subject_week_stat" v-if="hasSomeApiAccess('teaching_students_process_data_statistics_subjects_weekly')">
              <SubjectWeekStat v-if="currentTab == 'subject_week_stat'"/>
            </TabPane>
            <TabPane label="阶段周汇总数据" name="stage_week_stat" v-if="hasSomeApiAccess('teaching_students_process_data_statistics_stages_weekly')">
              <StageWeekStat v-if="currentTab == 'stage_week_stat'"/>
            </TabPane>
            <TabPane label="阶段群周汇总数据" name="stage_group_week_stat" v-if="hasSomeApiAccess('teaching_students_process_data_statistics_groups_weekly')">
              <StageGroupWeekStat v-if="currentTab == 'stage_group_week_stat'"/>
            </TabPane>
            <TabPane label="学员列表" name="student_list" v-if="hasSomeApiAccess('teaching_students_process_data_students')">
              <StudentList ref="typeList" v-if="currentTab == 'student_list'" from="learning-manage-stat" />
            </TabPane>
            <TabPane label="阶段群" name="stage_group" v-if="hasSomeApiAccess('teaching_students_process_data_groups')">
              <StageGroup v-if="currentTab == 'stage_group'"/>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import SubjectStat from './stats/subject-stat'
import StageStat from './stats/stage-stat'
import StageGroupStat from './stats/stage-group-stat'
import SubjectWeekStat from './stats/subject-week-stat'
import StageWeekStat from './stats/stage-week-stat'
import StageGroupWeekStat from './stats/stage-group-week-stat'
import StudentList from './student-list/student-list'
import StageGroup from './stage-group/stage-group'

export default {
  name: 'LearningManageStat',

  keepAlivePaths: {
    'learning_task_headteacher': 1,
    'stuinfo_detail': 1,
    'student_info': 1
  },

  data() {
    const tabMap = {
      'teaching_students_process_data_statistics_subjects_latest': 'subject_stat',
      'teaching_students_process_data_statistics_phases_latest': 'stage_stat',
      'teaching_students_process_data_statistics_groups_latest': 'stage_group_stat',
      'teaching_students_process_data_statistics_subjects_weekly': 'subject_week_stat',
      'teaching_students_process_data_statistics_stages_weekly': 'stage_week_stat',
      'teaching_students_process_data_statistics_groups_weekly': 'stage_group_week_stat',
      'teaching_students_process_data_students': 'student_list',
      'teaching_students_process_data_groups': 'stage_group'
    }

    const tabAccessArr = this.calcApiAccess(Object.keys(tabMap))
    const tabName = tabMap[tabAccessArr[0]]

    return {
      currentTab: tabName
    }
  },
  
  components: {
    SubjectStat,
    StageStat,
    StageGroupStat,
    SubjectWeekStat,
    StageWeekStat,
    StageGroupWeekStat,
    StudentList,
    StageGroup
  },
  
  beforeRouteUpdate(to, from, next) {
    let query = to.query
    if (query.str == 'student_list') {
      this.currentTab = query.str
      this.$nextTick(() => {
        this.$refs.typeList.fecthMyStudents({
          groupId: query.groupId,
          menuId: query.menuId
        })
      })
    }
    next()
  },

  beforeRouteLeave(to, from, next) {
    let keepAlivePaths = {
      'learning_task_headteacher': 1,
      'stuinfo_detail': 1,
      'student_info': 1,
      'home_index': 1
    }
    
    if (keepAlivePaths[to.name] && this.currentTab === 'student_list') {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }

    next()
  }
}
</script>
