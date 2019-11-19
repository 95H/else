<template>
  <div class="container">
    <div class="nav-container">
      <nav-list :navoptions="pageOptions.tabOptions"></nav-list>
    </div>
    <div class="singleRadio-container" v-if="hackReset">
      <single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
    </div>

    <div class="search-container">
      <ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
      <button class="search-btn" @click="searchEvent">搜索</button>
      <button class="reset-btn" @click="resetEvent">重置</button>
    </div>

    <personnel-show-list :count="count"
                         :childdata="parentDate"
                         :tableoptions="pageOptions.tableOptions">
      <div slot="head-info">
        <div class="list-head">
          <span>共计 {{ count }} 个签发信息</span>
        </div>
      </div>
    </personnel-show-list>
  </div>
</template>

<script>
  import PersonnelShowList from '../personnel/PersonnelShowList'
  export default {
    components: {PersonnelShowList},
    data() {
      return {
        pageOptions: {
          tabOptions: [
            {label: '全部里程碑', href: 'milepost', name: 'first'}
          ],
          singleRadioOptions: {
            txt: '里程碑状态：',
            option: [
              {name: '待审核', label: 1},
              {name: '已通过', label: 2},
              {name: '未通过', label: 3}
            ]
          },
          itemsIptOptions: [
            {name: '项目名称：', holder: '请输入项目名称', input: ''},
            {name: '人员姓名：', holder: '请输入人员姓名', input: ''}
          ],
          tableOptions: [
            {prop: 'userName', width: 100, label: '项目名称'},
            {prop: 'mechanism', width: '', label: '里程碑'},
            {prop: 'department', width: 160, label: '预计达成时间'},
            {prop: 'endDate', width: 120, label: '实际达成时间'},
            {prop: 'projectName', width: 276, label: '项目负责人'},
            {prop: 'procStage', width: 100, label: '状态'},
            {prop: 'procStage', width: 100, label: '创建时间'}
          ]
        },
        parentDate: [],
        count: 0,
        hackReset: true
      }
    },
    methods:{
      radioEvent(val) {
        this.val = val;
      },
      searchEvent() { // 搜索按钮事件
//            console.log('输入框1的值：--------------------------'+this.itemsIpt[0].input);
//            console.log('输入框2的值：--------------------------'+this.itemsIpt[1].input);
//            console.log('单选按钮的值：--------------------------'+this.val);
        // 获得数据 匹配


        //console.log('输入框2的值：--------------------------'+this.options.itemsIptOptions[1].input);
        //this.$emit('onsearchdate',this.options.itemsIptOptions[1].input);


        console.log(that.options.itemsIptOptions[1].input);

        //


      },
      resetEvent() { // 重置按钮事件
        this.val = 1;
        this.hackReset = false;//销毁组件
        this.$nextTick(() => {
          this.hackReset = true;//重建组件
        });
        //console.log(this.val);
        this.options.itemsIptOptions.forEach(item => {
          item.input = '';
        })

        this.searchList();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>

  .container {
    height: 135px;
    background: #fff;
  }

  .nav-container {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(236, 236, 236, 1);
  }

  .singleRadio-container {
    padding: 0 20px;
  }

  .search-container {
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  .search-btn,
  .reset-btn {
    padding: 0;
    border: none;
    width: 70px;
    height: 25px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer
  }

  /* 搜索按钮 */
  .search-btn {
    margin-right: 5px;
    background: rgba(58, 128, 236, 1);
    color: rgba(255, 255, 255, 1);
  }

  /* 重置按钮 */
  .reset-btn {
    background: #fff;
    border: 1px solid rgba(58, 128, 236, 1);
    color: rgba(58, 128, 236, 1);
  }

  /* 列表头部 */
  .list-head {
    padding-right: 20px;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(38, 38, 40, 1);
    background: rgba(249, 249, 249, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-bottom: none;
    text-align: right
  }
</style>
