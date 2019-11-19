<template>
  <div>
    <LearnDetailCourse v-if="courseType == '0' || courseType == '1'" />
    <LearnDetailLive v-else="courseType == '2'" />
  </div>
</template>

<script>
import LearnDetailCourse from './learn-detail-course/learn-detail-course'
import LearnDetailLive from './learn-detail-live/learn-detail-live'

export default {
  components: {
    LearnDetailCourse,
    LearnDetailLive
  },
  
  data() {
    return {
      // 0是就业课 1是微课 
      // 2是直播课
      courseType: '0'
    }
  },

  created() {
    const query = this.$route.query

    if (query.courseType == 2) {
      this.courseType = String(query.courseType)
    }
  }
}
</script>



