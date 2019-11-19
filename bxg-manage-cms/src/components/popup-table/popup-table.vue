<template>
  <div class="module">
    <Modal
      class="module-modal"
      v-model="isShowPopupTable"
      :mask="true"
      :closable="false"
      :footer-hide="true"
      :transfer="true"
      width="1000"
      :mask-closable="false"
    >
      <div class="module_header">
        <h6>{{module_title}}</h6>
        <span class="close" @click="moduleClick"><Icon class="closeIcon" type="md-close" /></span>
      </div>
      <div class="module_search">
        <ul>
          <li class="module_li">
            <Select
              v-model="option1"
              @on-change="moduleDataChange"
              clearable
              :placeholder="model_name_one"
              class="module_search_inp"
              style="width:150px"
            >
                <Option :title="item.label" v-for="item in model_list_one" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="module_li">
            <Select
              v-model="option2"
              clearable
              :placeholder="model_name_two"
              class="module_search_inp2"
              @on-change="moduleDataChange2"
              style="width:150px"
            >
                <Option :title="item.label" v-for="item in model_list_two" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="module_li">
            <Button @click="popSearchClick" class="module_btn" type="primary" icon="ios-search">搜索</Button>
          </li>
          <li class="module_li">
            <Button @click="popDelClick" class="module_btn" type="primary">清除</Button>
          </li>
        </ul>
      </div>
      <div class="module_table">
        <Table height="520" border :columns="moduleCoData" :data="moduleDaData"></Table>
      </div>
      <div class="module_page">
        <Page
          :total="total"
          :current="current"
          :page-size="pageSize"
          :page-size-opts="arrPage"
          show-total
          show-sizer
          @on-change="modulePageChange"
          @on-page-size-change="modulePageSizeChange"
        />
      </div>
      <div class="module_close" @click="moduleClick">
        <Button type="primary">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'PopupTable',
  props: [
    'total', //总条数
    'current',
    'pageSize',
    'isShowPopupTable', //控制弹框显示/隐藏
    'moduleCoData', //弹框表格标题栏
    'moduleDaData', //弹框表格数据
    'module_title', //弹框的标题
    'model_op_one', //弹框的下拉列表1
    'model_op_two', //弹框的下拉列表2
    'model_name_one', //弹框的下拉列表1名称
    'model_name_two', //弹框的下拉列表2名称
    'model_list_one', //弹框的下拉列表1内容
    'model_list_two' //弹框的下拉列表2内容
  ],
  data() {
    return {
      arrPage:[10,20,30,40,100,200],
      option1: '',
      option2: ''
      // moduleDaData2: [
      //   {
      //     'Module_name': "1-1 测试模块0305",
      //     'Module_plan': "0.00%（0/2）",
      //     'Module_status': "未开始"
      //   }
      // ]
    }
  },
  methods: {
    moduleClick() {
      this.$emit('moduleCloseClick'); //关闭弹窗的事件
      this.option1 = ''
      this.option2 = ''
    },
    popDelClick() { //清除下拉数据
      this.option1 = ''
      this.option2 = ''
      this.$emit('moduleClearClick')
    },
    popSearchClick() {
      this.$emit('moduleSearchClick') //搜索按钮的事件
    },
    moduleDataChange(value) {
      this.option1 = value
      this.$emit('moduleSelectChange', value) //下拉框1选择的事件
    },
    moduleDataChange2(value) {
      this.option2 = value
      this.$emit('moduleSelectChangeTwo', value) //下拉框2选择的事件
    },
    modulePageChange(page) {
      this.$emit('modulePageChangeClick', page)
    },
    modulePageSizeChange(pageSize) {
      this.$emit('modulePageSizeChangeClick', pageSize)
    }
  },
}
</script>

<style lang="less" scoped>
.module-modal {
  .ivu-modal-no-mask {
    pointer-events: auto;
  }
}
ul{
  li{
    list-style: none;
  }
}
.module_header{
  display: flex;
  justify-content: space-between;
  h6{
    font-size: 14px;
    line-height: 30px;
  }
  .closeIcon{
    font-size: 30px;
    font-weight: 600;
    line-height: 30px;
    cursor: pointer;
  }
}
.module_search{
  display: flex;
  margin-top: 10px;
  ul{
    display: flex;
    .module_li{
      margin-right: 10px;
    }
  }
}
.module_table{
  margin-top: 20px;
}
.module_page{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.module_close{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
//修改 select 样式
.module_search{
  /deep/ .ivu-select-dropdown{
    width:19%;
    .ivu-select-dropdown-list .ivu-select-item{
      width:100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>

