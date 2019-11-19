<template>
  <Card>
    <Row id="table-stage-list">
      <Col span="24">
         <Table :height="baseHeight" border :columns="columns" :data="dataArr.items"></Table>
      </Col>
       <Col class="m-t20" span="24">
           <Page placement="top" style="text-align: right;" :total="dataArr.totalCount" :page-size="pageSize" @on-change="handleCurrentChange" @on-page-size-change="handlePageSize"  :current="dataArr.currentPage" show-total show-elevator show-sizer></Page>
      </Col>
    </Row>
  </Card>
</template>

<script>
import api from "@/api/index";
import util from '@/util/util'
export default {
  name: "liveplayback_index",
  data() {
    const hashuifanstatus_put = this.hasSomeLiveAccess('resources_lives_records_status_put');  //回放-禁用
    return {
      baseHeight: 0,
      liveId: this.$route.query.liveId,
      currentPage: 1,
      pageSize: 20,
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "视频ID",
          key: "recordVideoId"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "截止时间",
          key: "endTime"
        },
        {
          title: "时长(m)",
          key: "recordVideoDuration"
        },
        {
          title: "状态",
          key: "recordStatus",
          render: (h, params) => {
            let texts = "";
            return h(
              "span",
              {
                props: {}
              },
              (texts = params.row.recordStatus ? "开启" : "禁用")
            );
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 120,
          render: (h, params) => {
            let $playbackstopBtn = null; //回放-禁用
            if (hashuifanstatus_put) {
                $playbackstopBtn =   h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      console.log(
                        params.row.recordId,
                        params.row.recordStatus ? 0 : 1
                      );
                      api
                        .putPlaybackstate({
                          recordId: params.row.recordId,
                          targetStatus: params.row.recordStatus ? 0 : 1
                        })
                        .then(res => {
                          if (res == "OK") {
                            this.$Message.success("操作成功");
                            this.getData({
                              liveId: this.liveId,
                              currentPage: this.currentPage,
                              pageSize: this.pageSize
                            });
                          } else {
                            this.$Message.error("操作失败");
                          }
                        })
                        .catch(err => {
                          throw Error(err);
                        });
                    }
                  }
                },
                params.row.recordStatus ? "禁用" : "开启"
              )
            }
            return h("div", [ $playbackstopBtn ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.getData({
      liveId: this.liveId,
      currentPage: this.currentPage,
      pageSize: this.pageSize
    });
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    async getData(params) {
      return await this.$store.dispatch("getPlaybackData", params);
    },
    handleCurrentChange(num) {
      this.currentPage = num;
      this.getData({
        liveId: this.liveId,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    },
    handlePageSize(size) {
      this.pageSize = size;
      this.getData({
        liveId: this.liveId,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    }
  },
  computed: {
    dataArr() {
      return this.$store.state.liveku.playbackObj;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "liveplayback_index") {
        this.currentPage = 1;
        this.liveId = this.$route.query.liveId;
        this.getData({
          liveId: this.liveId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
      }
    }
  }
};
</script>

<style lang="less">
.m-t20 {
  margin-top: 20px;
}
</style>
