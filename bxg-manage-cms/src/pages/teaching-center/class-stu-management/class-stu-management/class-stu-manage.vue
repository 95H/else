<template>
  <div>
    <Card>
      <Tabs v-model="tab" :animated="false" @on-click="tabFn">
        <TabPane label="就业课" name="employment" v-if="hasSomeApiAccess('teaching_courses_students_employment_courses')">
          <employment v-if="tab==='employment'" />
        </TabPane>
        <TabPane label="微课" name="micro" v-if="hasSomeApiAccess('teaching_courses_students_micro_courses')">
          <small-class v-if="tab==='micro'" />
        </TabPane>
        <TabPane label="直播课" name="live" v-if="hasSomeApiAccess('teaching_courses_students_lives_courses')">
          <class-m-live v-if="tab==='live'" />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import Employment from './employment.vue'
import SmallClass from './small-class.vue'
import classMLive from './class-m-live.vue'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    Employment,
    SmallClass,
    classMLive
  },
  data() {
    const tabMap = {
      'teaching_courses_students_employment_courses': 'employment',
      'teaching_courses_students_micro_courses': 'micro',
      'teaching_courses_students_lives_courses': 'live'
    }

    const tabAccessArr = this.calcApiAccess(Object.keys(tabMap))
    const tabName = tabMap[tabAccessArr[0]]

    return {
      tab: tabName
    }
  },
  // watch: {
  //   tabNub(name) {
  //     this.tab = name
  //   }
  // },
  // computed: {
    // ...mapState({
    //   //课程状态
    //   tabNub: state => state.classStuManagement.tabNub
    // })
  // },
  methods: {
    tabFn(n) {
      // this.$store.state.classStuManagement.tabNub = n
      this.tab = n
    }
  }
}
</script>
