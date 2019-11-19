<template>
  <Modal
    title="操作日志"
    v-model= "isLogModalshow"
    class-name="vertical-center-modal"
    width="800"
    :mask-closable="false"
    :footer-hide="true"
  >
    <Row :gutter="10" type='flex' style="margin-bottom:20px;">
      <Col span="5">
        <Select clearable placeholder="状态" v-model="searchParams.subStatus">
          <Option v-for="item in articleState" :value="item.status" :key="item.id">{{ item.val }}</Option>
        </Select>
      </Col>
      <Col span="6" >
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button >清除</Button></span>
      </Col>
    </Row>
    <Table border height="540" :columns="logTitle" :data="logList"/>
    <Page placement="top"
          style="margin-top:20px;text-align:right; padding-bottom:1px"
          :total="pageTotal"
          :current="pageParams.pageNumber"
          :page-size="pageParams.pageSize"
          :page-size-opts="arrPage"
          @on-change="changeCurrent"
          @on-page-size-change="changePageSize"
          :transfer="true"
          show-total show-elevator show-sizer>
    </Page>
  </Modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    props: ['isLogModal', 'ids'],

    data() {
      return {
        arrPage: [10, 20, 30, 40, 100, 200],
        pageParams: {
          pageNumber: 1,
          pageSize: 10
        },
        searchParams: {
          subStatus: ''
        },
        articleState: [
          {
            id: 0,
            status: '',
            val: '全部'
          },
          {
            id: 1,
            status: 'SAVE',
            val: '操作保存并预览'
          },
          {
            id: 2,
            status: 'SUBMIT',
            val: '操作提交'
          },
          {
            id: 3,
            status: 'BACK',
            val: '操作撤回'
          },
          {
            id: 4,
            status: 'APPROVE',
            val: '审核通过'
          },
          {
            id: 5,
            status: 'DISAPPROVE',
            val: '审核不通过'
          },
          {
            id: 6,
            status: 'OUT',
            val: '操作下架'
          }
        ],
        logTitle: [
          {
            title: '操作记录',
            key: 'type',
            Width: 140,
            render: (h, params) => {
              let status = '';
              if (params.row.type === 0) {
                status = '操作保存并预览';
              } else if (params.row.type === 1) {
                status = '操作提交';
              } else if (params.row.type === 2) {
                status = '操作撤回';
              } else if (params.row.type === 3) {
                status = '审核通过';
              } else if (params.row.type === 4) {
                status = '审核不通过';
              } else if (params.row.type === 5) {
                status = '操作下架';
              }
              return h(
                'span',
                status
              )
            }
          },
          {
            title: '操作人',
            key: 'modifier',
            width: 120
          },
          {
            title: '操作时间',
            key: 'modifyTime',
            width: 160,
            align: 'right'
          },
          {
            title: '备注',
            key: 'remark',
            minWidth: 160,
            ellipsis: true,
            render(h, params) {

              let title = params.row.remark;
              title  = title ? title.split('') : title;
              title = title && title.map((val,id)=>{
                if((id+1)%22 == 0){
                  val = val + '\n'
                }
                return val
              })
              title = title ? title.join('') : title

              return <span title={title} style="display:inline-block;width:322px">{params.row.remark || '-'}</span>
            }
          }
        ]
      }
    },

    computed: {
      isLogModalshow: {
        get() {
          return this.isLogModal
        },
        set(val) {
          this.$emit('update:isLogModal', val)
        }
      },

      ...mapState({
        pageTotal: state => state.infoManage.pageTotalLog,
        logList: state => state.infoManage.logList
      })
    },

    created() {
      // this.fetchLog()
    },

    methods: {
      ...mapActions([
        'getLog'
      ]),

      serchInfo() {
        this.pageParams.pageNumber = 1;
        this.getLog({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          id: this.ids,
          operation: this.searchParams.subStatus
        })
      },

      clearInfo() {
        this.pageParams.pageNumber = 1;
        this.searchParams.subStatus = '';
        this.getLog({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          id: this.ids
        })
      },

      changeCurrent(num) {
        this.pageParams.pageNumber = num
        this.getLog({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          id: this.ids,
          operation: this.searchParams.subStatus
        })
      },

      changePageSize(size) {
        this.pageParams.pageNumber = 1;
        this.pageParams.pageSize = size
        this.getLog({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          id: this.ids,
          operation: this.searchParams.subStatus
        })
      }
    }
  }
</script>

