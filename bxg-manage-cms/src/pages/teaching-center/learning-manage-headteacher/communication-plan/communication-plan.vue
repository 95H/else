<template>
    <div>
        <Row>
            <Col span="24">
                    <span @click="createPlan" style="margin: 0 10px;">
                        <Button type="primary"><Icon type="md-add" />新建计划</Button>
                </span>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  mounted() {
    console.log(111121)
  },
  methods: {
      createPlan(){
          console.log(111)
      }
  }
}
</script>

<style>
</style>
