<template>
  <TaskManage :from="$route.query.from" />
</template>

<script>
import TaskManage from '@/pages/teaching-center/shared/learning-task-manage'

export default {
  components: {
    TaskManage
  }
}
</script>
