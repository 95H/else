<template>
     <Card>
        <h3 class="bord-left">目前任务</h3>
        <Row style="margin-top:20px;display:none;">
            <Col span="24">
                    <span @click="createPlan"><Button type="primary"><Icon type="md-add" />新建计划</Button>
                </span>
            </Col>
        </Row>
     </Card>
</template>

<script>
export default {}
</script>

<style lang="less">
.bord-left {
  border-left: 5px solid #2d8cf0;
  line-height: 1;
  padding-left: 10px;
}
</style>
