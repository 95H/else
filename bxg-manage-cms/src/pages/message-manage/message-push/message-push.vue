<template>
  <Row>
    <Col span="24">
      <Card>
        <Row :gutter="18" class="baseOption" type="flex">
          <Col>
            <Button
              type="primary"
              v-if="hasSomeApiAccess('messages_push_post')"
              @click="addMessage"
            >
              <Icon type="md-add"/>新建消息
            </Button>
          </Col>
          <Poptip
            trigger="hover"
            title="注解"
            :content="Tipsc.Tipscontent"
            placement="bottom-start"
            width="285"
            :word-wrap="true"
          >
            <Icon type="md-alert" size="32" class="icontips"/>
          </Poptip>
          <Col span="5">
            <Input placeholder="标题名称" v-model="queryData.title" clearable/>
          </Col>
          <Col span="3">
            <Select placeholder="状态" v-model="queryData.status" clearable>
              <Option :value="0">待发布</Option>
              <Option :value="1">已发布</Option>
              <Option :value="2">已关闭</Option>
              <Option :value="3">失败</Option>
              <Option :value="4">发布中</Option>
            </Select>
          </Col>
          <Col span="4">
            <Button type="primary" icon="md-search" @click="searchHandler">搜索</Button>
            <Button @click="handleClear">清除</Button>
          </Col>
        </Row>
        <Row class="margin-top-20" id="table-stage">
          <Col span="24">
            <Table
              border
              :height="baseHeight"
              :loading="groupInfo.loading"
              :columns="groupInfo.columns"
              :data="groupInfo.list"
            ></Table>
          </Col>
          <Col class="margin-top-20" span="24">
            <Page
              placement="top"
              :page-size-opts="arrPage"
              :current="pageInfo.pageNumber"
              show-total
              show-elevator
              show-sizer
              :total="pageInfo.total"
              @on-change="changeCurrentPage"
              @on-page-size-change="changeSelect"
              style="text-align: right;"
            ></Page>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</template>
<script>
import api from '@/api/index'
import util from '@/util/util'
import { mapState } from 'vuex'
export default {
  name: 'message-push',
  data() {
    const hasxiugai = this.hasSomeApiAccess('messages_push_patch')
    const hasrizhi = this.hasSomeApiAccess('messages_push_details')
    const hasshanchu = this.hasSomeApiAccess('messages_push_close')
    return {
      flagNum: this.$route.params.num,

      arrPage: [10, 20, 30, 40, 100, 200],
      baseHeight: 0,
      queryData: {
        title: '', //标题名称
        status: '' //发布状态
      },
      Tipsc: {
        Tipscontent:
          '计划推送：推送的用户数量（去重，在一个学科内购买两个课程，按照一个人计算。）' +
          '\n' +
          '到达数：有效发送到学员设备上的消息数' +
          '\n' +
          '到达率：到达率=到达数 / 计划推送数' +
          '\n' +
          '打开数：用户通过通知栏点击打开消息的次数' +
          '\n' +
          '打开率：打开率=打开人数 / 到达数'
      },
      // 推送范围
      groupInfo: {
        loading: false,
        // 学习阶段列表
        list: [],
        // 表格的配置数据
        columns: [
          {
            title: '序号',
            type: '',
            align: 'center',
            width: 60,
            render: (h, params) => {
              return h(
                'span',
                params.index +
                  (this.pageInfo.pageNumber - 1) * this.pageInfo.pageSize +
                  1
              )
            }
          },
          {
            title: '主标题',
            key: 'title',
            align: 'left',
            width: 234,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.title
                  }
                },
                params.row.title ? params.row.title : '--'
              )
            }
          },
          {
            title: '类型',
            key: 'pushTimeType',
            align: 'left',
            width: 82,
            ellipsis: true,
            render: (h, params) => {
              let pushTimeType = params.row.pushTimeType
              if (pushTimeType == 0) {
                pushTimeType = '立即推送'
              } else if (pushTimeType == 1) {
                pushTimeType = '定时推送'
              }
              return h('div', [h('span', pushTimeType)])
            }
          },
          {
            title: '推送范围',
            key: 'groupname',
            align: 'left',
            minWidth: 180,
            ellipsis: true,

            render: (h, params) => {
              let grouptype = params.row.group;
              let xuekenames = params.row.menuNames;
              let kechengnames = params.row.courseNames;
              let groupname = '';

              if (grouptype == 'ALL') {
                groupname = '全部成员'
              } else if (grouptype == 'SUBJECT') {
                var strxueke = ''
                for (var index in xuekenames) {
                  strxueke += xuekenames[index] + '、 '
                }
                groupname = strxueke.substring(0, strxueke.length - 2)
              } else if (grouptype == 'COURSE') {
                var strclass = ''
                for (var index in kechengnames) {
                  strclass += kechengnames[index] + '、 '
                }
                groupname = strclass.substring(0, strclass.length - 2)
              } else if (grouptype == 'USER') {
                groupname = '自定义用户'
              }
              return h(
                'div',
                {
                  style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },
                [h('span',{
                  domProps: {
                    title: groupname ? groupname : '--'
                  }
                }, groupname)]
              )
            }
          },
          {
            title: '计划推送数',
            key: 'planCount',
            align: 'right',
            width: 100,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.planCount
                  }
                },
                params.row.planCount ? params.row.planCount : '--'
              )
            }
          },
          {
            title: '到达数',
            key: 'arriveCount',
            align: 'right',
            width: 80,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.arriveCount
                  }
                },
                params.row.arriveCount ? params.row.arriveCount : '--'
              )
            }
          },
          {
            title: '到达率',
            key: 'arriveRate',
            align: 'right',
            width: 80,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.arriveRate
                  }
                },
                params.row.arriveRate ? params.row.arriveRate : '--'
              )
            }
          },
          {
            title: '打开数',
            key: 'openCount',
            align: 'right',
            width: 80,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.openCount
                  }
                },
                params.row.openCount ? params.row.openCount : '--'
              )
            }
          },
          {
            title: '打开率',
            key: 'openRate',
            align: 'right',
            width: 80,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.openRate
                  }
                },
                params.row.openRate ? params.row.openRate : '--'
              )
            }
          },
          {
            title: '发布/定时(时间)',
            key: 'pushTime',
            align: 'right',
            width: 132
          },
          {
            title: '发布人',
            key: 'creator',
            align: 'left',
            width: 80,
            ellipsis: true
          },
          {
            title: '状态',
            key: 'status',
            align: 'left',
            width: 80,
            render(h, params) {
              let status = params.row.status
              if (status == 0) {
                status = '待发布'
              } else if (status == 1) {
                status = '已发布'
              } else if (status == 2) {
                status = '已关闭'
              } else if (status == 3) {
                status = '失败'
              } else if (status == 4) {
                status = '发布中'
              }
              return h('div', [h('span', status)])
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 200,
            render: (h, params) => {
              let xiugaiBtn = null
              let showHstatus = params.row.status
              let pushTimeStatus = params.row.pushTimeType
              let disablefalse = params.row.id
              var falagestatus = params.row.timeOut
              if (hasxiugai) {
                xiugaiBtn = h(
                  'Button',
                  {
                    class: 'checkbtns',
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: falagestatus == true ? true : false
                    },
                    style: {
                      marginRight: '5px',
                      display:
                        pushTimeStatus == 1 && showHstatus == 0
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: () => {
                        this.messagepushedit(params.row)
                      }
                    }
                  },
                  '编辑'
                )
              }

              let rizhiBtn = null
              if (hasrizhi) {
                rizhiBtn = h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      display: !showHstatus == 0 ? 'inline-block' : 'none'
                    },
                    on: {
                      click: () => {
                        this.messagepushInfo(params.row)
                      }
                    }
                  },
                  '查看'
                )
              }

              let shanchuBtn = null
              if (hasshanchu) {
                shanchuBtn = h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      display:
                        pushTimeStatus == 1 && showHstatus == 0
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: () => {
                        this.del(params.row)
                      }
                    }
                  },
                  '关闭'
                )
              }

              return h('div', [xiugaiBtn, rizhiBtn, shanchuBtn])
            }
          }
        ]
      },
      // 分页信息
      pageInfo: {
        // 当前页码
        pageNumber: 1,
        // 数据总条数
        total: 0,
        // 每页条数
        pageSize: 10
      },
      pushDataList: []
    }
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        if (newValue.params.num != oldValue.params.num) {
          this.handleClear()
          newValue.params.num = undefined
        }
      },
      deep: true
    }
  },
  created() {
    //获取消息推送
    this.searchHandler()
  },
  methods: {
    //清空列表
    handleClear() {
      this.queryData = {
        title: '', //标题名称
        status: '' //发布状态
      }
      this.pageInfo.pageNumber = 1
      this.pageInfo.pageSize = this.pageInfo.pageSize
      this.searchHandler()
    },
    // 设置阶段群内容
    setGroupInfo(result) {
      this.groupInfo.list = result.list
      // 设置分页总数据
      this.pageInfo.total = result.total
    },
    //合并对象
    fetchPhasesParams(searchInfo, pageInfo = {}) {
      let params = {}
      _.reduce(
        searchInfo,
        function(result, value, key) {
          if (value !== '') {
            result[key] = value
          }
          return result
        },
        params
      )
      _.assign(params, pageInfo)
      return params
    },
    //公共查询
    fetchPhases(pageInfo) {
      let params = this.fetchPhasesParams(this.queryData, pageInfo)
      this.groupInfo.loading = true
      return api
        .getMessageList(params)
        .then(data => {
          if (data.status === 200) {
            this.delNub = data.result.list.length
            this.setGroupInfo(data.result)
          }
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
        .finally(() => {
          this.groupInfo.loading = false
        })
    },
    //关闭消息的推送
    del(info) {
      let id = { id: info.id };
      api.patchMessageClose(id)
        .then(res => {
          if (res.status === 200) {
            this.$Modal.confirm({
              closable: true,
              title: '<p>你确定要关闭改该消息？</p>',
              loading: true,
              onOk: () => {
                this.fetchPhases(this.pageInfo)
                this.$Message.success('关闭成功！')
                this.$Modal.remove()
              },
              onCancel: () => {}
            })
          } else if (res.status === 400) {
            this.$Modal.warning({
              title: '该消息已发布，无法关闭',
              okText: '返回',
              onOk: () => {
                return
              }
            })
          }
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    //跳转查看详情
    messagepushInfo(data) {
      this.$router.push({
        name: 'messagepush_info',
        query: {
          active: 'updatemessagepush',
          id: data.id,
          from: 'message-push'
        }
      })
    },
    //跳转编辑详情
    messagepushedit(data) {
      this.$router.push({
        name: 'messagepush_edit',
        query: {
          active: 'updatemessagepush',
          id: data.id,
          from: 'message-push'
        }
      })
    },
    // 跳转新建消息
    addMessage(data) {
      this.$router.push({
        name: 'message-new',
        query: {
          active: 'updatemessagepush',
          newMassage: 'newMassage',
          from: 'message-push'
        }
      })
    },
    //点击搜索
    searchHandler() {
      let page = {
        pageNumber: (this.pageInfo.pageNumber = 1),
        pageSize: this.pageInfo.pageSize
      }
      this.fetchPhases(page)
    },
    //分页改变当前页
    changeCurrentPage(page) {
      this.pageInfo.pageNumber = page
      this.fetchPhases({
        pageNumber: page,
        pageSize: this.pageInfo.pageSize
      })
    },
    //每页多少条数据
    changeSelect(nub) {
      this.pageInfo.pageSize = nub
      this.fetchPhases({
        pageNumber: this.pageInfo.pageNumber,
        pageSize: nub
      })
    }
  },
  mounted() {
    //获取table-height
    this.$nextTick(() => {
      let dom = document.getElementById('table-stage')
      this.baseHeight = util.baseHeight(dom, 82)
    })
  }
}
</script>
<style lang="less" scoped>
.icontips {
  cursor: pointer;
}
</style>