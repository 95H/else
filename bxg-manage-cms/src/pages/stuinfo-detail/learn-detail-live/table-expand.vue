<template>
  <div class="expand-container">
    <Row class="expand-row" v-for="item in expandList" :key="item.liveId">
      <Col span="8" :style="(item.liveCourseStatus == 1 || item.liveCourseStatus == 2) ? { color: '#ccc' } : null">
        <span class="expand-value">{{ item.liveName + '（' + item.duration + '分钟）'}}</span>
      </Col>
      <template v-if="item.liveCourseStatus == 3">
        <Col span="8">
          <span class="expand-value">{{ item.liveOnlineTimeStr }}</span>
        </Col>
        <Col span="8">
          <span class="expand-value">{{ item.playbackViewTimeStr }}</span>
        </Col>
      </template>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    expandList: Array
  }
}
</script>

<style lang="less" scoped>
.expand-container {
  .expand-row {
    margin-bottom: 0;
  }
}
</style>
