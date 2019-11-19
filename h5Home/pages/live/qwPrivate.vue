<template>
  <div class="qwList">
    <template v-for="items in lists" v-if="onlyFlag==0 && ((items.value.userId===loginUserId) || (items.value.isPublish===1) || (items.isPublish===1) || (items.isPrivate===0))">
      <div class="qw">
        <div class="question">
          <p class="qsTit"><span class="qsName">{{items.value.userName}}</span><span class="qsTime">{{items.value.triggerTime}}</span></p>
          <p class="qsText">{{items.value.content}}</p>
        </div>
        <div v-if="items.answer.length>0" class="answer-box">
          <div v-for="item in items.answer" class="answer" v-if="(item.isPrivate===1&&items.value.userId===loginUserId) || item.isPrivate===0">
            <p class="awTit"><span class="awName">{{item.userName}}</span><span class="awTime">{{item.triggerTime}}</span></p>
            <p class="awText">{{item.content}}</p>
          </div>
        </div>
      </div>
    </template>
    <template v-for="items in lists" v-if="onlyFlag==1 && items.value.userId==loginUserId">
      <div class="qw">
        <div class="question">
          <p class="qsTit"><span class="qsName">{{items.value.userName}}</span><span class="qsTime">{{items.value.triggerTime}}</span></p>
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

export default {
  props: ['lists','onlyFlag','loginUserId'],
}
</script>
