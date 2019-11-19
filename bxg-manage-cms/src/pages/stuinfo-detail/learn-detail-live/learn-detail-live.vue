<template>
  <div class="learn-details">
    <Card>
      <p slot="title" class="card-title">{{user_info.userName + '-' + user_info.courseName }}</p>
      <div class="user_info_box">
        <div class="user_info">
          <ul>
            <li><strong>课程名称：</strong>{{user_info.courseName}}</li>
            <li><strong>上课时间：</strong>{{user_info.liveCourseStartDate ? user_info.liveCourseStartDate + '-' : '-- 到'}}{{user_info.liveCourseEndDate || "--"}}</li>
            <li :title="user_info.liveLecturerName"><strong>授课老师：</strong>{{user_info.liveLecturerName}}</li>
            <li><strong>UID：</strong>{{user_info.uid}}</li>
            <li><strong>昵称：</strong>{{user_info.nickName}}</li>
            <li><strong>手机号：</strong>{{user_info.mobile}}</li>
            <li><strong>剩余服务天数：</strong>{{user_info.serviceDays}}</li>
            <li><strong>服务截止日期：</strong>{{user_info.serviceExpires}}</li>
            <li><strong>学习进度：</strong>--</li>
          </ul>
        </div>
        <!-- <span class="return_superior" @click="goBack">返回上级</span> -->
      </div>
      <Tabs class="tabs" v-model="name">
        <TabPane label="课程模块" name="name1" v-if="hasSomeApiAccess('teaching_courses_students_lives_courses_students_details_modules')">
          <class-module v-if="name=='name1'"/>
        </TabPane>
        <TabPane label="阶段作业" name="name2" v-if="hasSomeApiAccess('teaching_courses_students_lives_courses_students_details_phasehomework')">
          <stage-homework v-if="name=='name2'"/>
        </TabPane>
        <TabPane label="拓展资料" name="name3" v-if="hasSomeApiAccess('teaching_courses_students_lives_courses_students_details_extensions')">
          <expand-data v-if="name=='name3'"/>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
// {{user_info.learnProcess}}
  import { mapActions, mapState, mapMutations } from "vuex";
  import ClassModule from './class-module.vue'
  import StageHomework from './stage-homework.vue'
  import ExpandData from './expand-data.vue'
  export default {
    components: {
      ClassModule,
      StageHomework,
      ExpandData
    },
    data() {

      const tabMap = {
        'teaching_courses_students_lives_courses_students_details_modules': 'name1',
        'teaching_courses_students_lives_courses_students_details_phasehomework': 'name2',
        'teaching_courses_students_lives_courses_students_details_extensions': 'name3'
      }
      const tabAccessArr = this.calcApiAccess(Object.keys(tabMap))
      const tabName = tabMap[tabAccessArr[0]]

      return {
        name: tabName,
        user_info: {
          className: 'PMP认证管理课',
          classTime: '2018-12-10 至 2018-12-18',
          teacherName: '蒋蓓蓓',
          uid: '149110',
          nickName: 'bxg_89983',
          phone: '18888888888',
          serverDays: '360',
          asOfDays: '2019-12-28',
          studyPlan: '18%'
        }
      }
    },
    methods: {
      goBack(){
        this.$router.back()
      },
      ...mapActions([
        "fetchStudyDetails"
      ]),
      async _initState() {
        let uInfo = this.$route.query
        await this.fetchStudyDetails({
          stuCourseId: uInfo.stuCourseId
        })
        try {
          this.user_info = this.$store.state.stuCondition.studyDetails  
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

<style scoped lang="less">
.learn-details{
  .user_info_box{
    display: flex;
    .user_info{
      padding: 26px 55px;
      background: #f2f2f2;
      flex:1;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          flex: 30%;
          list-style: none;
          line-height: 42px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
    .return_superior{
      display: block;
      color: #378ee9;
      width: 76px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .tabs{
    margin-top: 20px;
  }
}
</style>
