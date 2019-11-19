<template>
  <Card>
    <Row :gutter="10" type='flex'>
      <Col span="4">
        <DatePicker type="daterange" :value="searchParams.subTime" placeholder="提交起止日期" style="width:100%;" @on-change="changeTime"></DatePicker>
      </Col>
      <Col span="4" >
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button >清除</Button></span>
      </Col>
    </Row>
    <Row style="margin-top:20px;" id="statisticsAll">
      <Col span="24">
        <Table border :height="baseHeight" :loading="statisticsLoading" :columns="statisticsTitle" :data="statisticsList"></Table>
      </Col>
      <Col span="24" style="margin-top: 20px;">
        <Page placement="top"
            style="text-align:right; padding-bottom:1px"
            :total="pageTotal"
            :current="pageParams.pageNumber"
            :page-size="pageParams.pageSize"
            :page-size-opts="arrPage"
            @on-change="changeCurrent"
            @on-page-size-change="changePageSize"
            :transfer="true"
            show-total show-elevator show-sizer>
        </Page>
      </Col>
    </Row>
  </Card>
</template>

<script>
import util from '@/util/util'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      baseHeight: 0,
      statisticsLoading: true,

      searchParams:{
        subTime: '',
        submitStartTime: '',
        submitEndTime: ''
      },
      pageParams:{
        pageNumber: 1,
        pageSize: 10
      },
      arrPage:[10,20,30,40,100,200],

      statisticsTitle: [
        {
          title: '提交人',
          key: 'submitter',
          minWidth: 120
        },
        {
          title: '文章数量（总）',
          key: 'articleTotal',
          align: 'right',
          minWidth: 140
        },
        {
          title: '已上架',
          key: 'putAmount',
          align: 'right',
          minWidth: 120
        },
        {
          title: '已下架',
          key: 'outAmount',
          align: 'right',
          minWidth: 120
        },
        {
          title: '已退回',
          key: 'backAmount',
          align: 'right',
          minWidth: 120
        },
        {
          title: '待审核',
          key: 'waitCheckAmount',
          align: 'right',
          minWidth: 120
        }
      ]
    }
  },

  computed: {
    ...mapState({
      pageTotal: state => state.infoManage.pageTotalStat,
      statisticsList: state => state.infoManage.statisticsList
    })
  },

  created() {
    this.fecthStatistics()
  },

  mounted(){
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("statisticsAll");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },

  methods: {
    ...mapActions([
      'getStatistics'
    ]),

    //获取咨讯列表
    async fecthStatistics() {
      this.pageParams.pageNumber = 1
      this.pageParams.pageSize = 10
      await this.getStatistics({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
      })
      this.statisticsLoading = false;
    },

    changeTime(date) {
      this.searchParams.subTime = [...date];
      this.searchParams.submitStartTime = date[0];
      this.searchParams.submitEndTime = date[1]
    },

    serchInfo() {
      this.pageParams.pageNumber = 1;
      this.getStatistics({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        submitStartTime: this.searchParams.submitStartTime,
        submitEndTime: this.searchParams.submitEndTime
      })
    },

    clearInfo() {
      this.searchParams = {
        subTime: '',
        submitStartTime: '',
        submitEndTime: ''
      };
      this.pageParams.pageNumber = 1;
      this.getStatistics({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
      })
    },

    changeCurrent(num) {
      this.pageParams.pageNumber = num;
      this.getStatistics({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        submitStartTime: this.searchParams.submitStartTime,
        submitEndTime: this.searchParams.submitEndTime
      })
    },

    changePageSize(size) {
      this.pageParams.pageSize = size;
      this.getStatistics({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        submitStartTime: this.searchParams.submitStartTime,
        submitEndTime: this.searchParams.submitEndTime
      })
    }
  }
}
</script>
