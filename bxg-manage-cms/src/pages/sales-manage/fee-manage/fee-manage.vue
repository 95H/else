<template>
  <Row>
    <Col span="24">
      <Card>
        <Tabs v-model="tabName">
          <TabPane label="预报名费模板" name="name1" v-if="hasSomeApiAccess('sales_deposits_templates')">
            <fee-template-list>
            </fee-template-list>
          </TabPane>
          <TabPane label="预报名费通知列表" name="name2" v-if="hasSomeApiAccess('sales_deposits_messages')">
            <fee-inform-list>
            </fee-inform-list>
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>


</template>

<script>
import { mapActions } from "vuex";
import feeTemplateList from "./fee-template-list";
import feeInformList from "./fee-inform-list";
  export default{
    name: "fee-manage",
    components: {
      feeTemplateList,
      feeInformList
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      next(vm => {
        vm.getDepositManageList({
          pageNumber: 1,
          pageSize: 10
        });
        vm.getDepositInformationList({
          pageNumber: 1,
          pageSize: 10
        });
      })
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      next()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      next()
    },
    data() {
      const tabMap = {
        'sales_deposits_templates': 'name1',
        'sales_deposits_messages': 'name2'
      }
      const tabAccessArr = this.calcApiAccess(Object.keys(tabMap))
      const tabName = tabMap[tabAccessArr[0]]

      return {
        tabName: tabName,
        loading: true
      }
    },
    methods: {
      ...mapActions([
        "getDepositManageList",
        "getDepositInformationList"
      ])
    }
  };
</script>

<style lang="less">

</style>

