<template>
  <div class="qwList">
    <template v-for="items in lists">
      <div class="qw" >
        <div class="question">
          <p class="qsTit"><span class="qsName">{{items.value.userName | transIp}}</span><span class="qsTime">{{items.value.triggerTime}}</span></p>
          <p class="qsText">{{items.value.content}}</p>
        </div>
        <div v-if="items.answer.length>0" class="answer-box">
          <div v-for="item in items.answer" class="answer">
            <p class="awTit"><span class="awName">{{item.userName}}</span><span class="awTime">{{item.triggerTime}}</span></p>
            <p class="awText">{{item.content}}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
const ipReg = /^(?:\d{1,3}\.){3}\d{1,3}\s*(,)?/
function isCCIp(str = '') {
  return ipReg.test(str)
}
export default {
  props: ['lists','transIp'],
  filters: {
    transIp(value) {
      if (isCCIp(value)) {
        return '游客'
      }
      return value
    }
  }
}
</script>


