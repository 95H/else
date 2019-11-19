<template>
  <stage-of :type="type" from="learning-manage-stat"></stage-of>
</template>

<script>
import StageOf from '@/components/stage-of/stage-of'
export default {
  data() {
    return {
      type: 0
    }
  },
  components: {
    StageOf
  }
}
</script>

<style scoped>
</style>
