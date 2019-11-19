<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-pagination
        small
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="50">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
  export default {

  }
</script>

