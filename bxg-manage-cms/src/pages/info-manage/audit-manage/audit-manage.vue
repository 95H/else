<template>
  <Row>
    <Col span="24">
      <Card>
        <Tabs
          value="name1"
          @on-click="tabClick">
          <TabPane label="待审核" name="name1">
            <auditingManage v-show="tabName === 'name1'" />
          </TabPane>
          <TabPane label="已审核" name="name2">
            <auditedManage v-show="tabName === 'name2'" />
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>
</template>

<script>
import auditingManage from './auditing-manage'
import auditedManage from "./audited-manage";
export default {
  name: 'audit-manage',
  data() {
    return {
      tabName: 'name1'
    }
  },
  components: {
    auditingManage,
    auditedManage
  },
  methods: {
    tabClick(name) {
      this.tabName = name
    }
  }
}
</script>
