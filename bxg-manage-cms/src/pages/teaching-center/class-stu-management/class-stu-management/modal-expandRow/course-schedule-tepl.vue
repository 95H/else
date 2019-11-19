<template>
  <div>
    <div v-if="expandRow.length">
      <Row class="expand-row" v-for="(item, index) in expandRow" :key="index">
        <Col span="14">
          <span class="expand-value">{{ item.liveName }}</span>
        </Col>
        <Col span="10">
          <span class="expand-value">{{ item.statusTxt }}</span>
        </Col>
      </Row>
    </div>
    <div v-else>
      <Row class="expand-row">
        <Col span="6" offset="8">
          暂无直播计划
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'course-schedule-tepl',
  props: {
    row: Array
  },
  data() {
    const expandRow = this.row.map(item => {
      if (item.liveCourseStatus == 1) {
        item.statusTxt = '直播未开始'
      } else if (item.liveCourseStatus == 2) {
        item.statusTxt = '直播进行中'
      } else if (item.liveCourseStatus == 3) {
        item.statusTxt = '直播已结束'
      }
      return item
    })

    return {
      expandRow
    }
  }
}
</script>

<style scoped>
</style>
