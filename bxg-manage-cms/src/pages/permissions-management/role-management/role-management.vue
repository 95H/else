<template>
  <Card class="role-manage">
    <Row>
      <Col span="24">
        <Button type="primary" @click="newRole" v-if="hasSomeAuthAccess('auth_roles_post')">
          <Icon type="md-add"/>新增角色
        </Button>
      </Col>
      <Col id="table-stage-list" span="24" class="margin-top-20">
        <Table border :columns="tabListTitle" :data="pageData.data" :height="baseHeight"></Table>
      </Col>
      <Col class="margin-top-20" span="24">
        <Page
          placement="top"
          style="text-align: right;padding-bottom: 1px"
          :total="pageData.total"
          :page-size="pageSize"
          :page-size-opts="arrPage"
          @on-change="handleCurrentChange"
          @on-page-size-change="handlePageSize"
          :current="pageNumber"
          :transfer="true"
          show-elevator
          show-sizer
        ></Page>
      </Col>
    </Row>
    <Modal
      v-model="ModalData.Modal"
      :title="ModalData.modelTitle"
      @on-ok="confirm('keepData')"
      :loading="ModalData.loading"
      width="50%"
      @on-visible-change="ModalChange"
      :mask-closable="false"
    >
      <Form ref="keepData" :model="keepData" :rules="ruleInline">
        <FormItem label="角色名称：" prop="name">
          <Input v-model="keepData.name" placeholder="请输入角色名称" @on-change="nameInputChange"></Input>
        </FormItem>
        <FormItem label="选择资源：" prop="resourceIds">
          <div class="treeDiv">
            <Tree :data="data2" show-checkbox ref="Tree" @on-check-change="treeChange"></Tree>
          </div>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import api from '@/api/index'
import util from '@/util/util'
export default {
  name: 'role-management',
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入角色名称'))
      } else {
        callback()
      }
    }
    const validateResourceIds = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请选择权限'))
      } else {
        callback()
      }
    }

    const hasxiugai = this.hasSomeAuthAccess('auth_roles_put')
    const hasqijinyong = this.hasSomeAuthAccess('auth_roles_patch')

    return {
      baseHeight: 0,
      ModalData: {
        Modal: false,
        loading: true,
        modelTitle: '新增角色'
      },
      keepData: {
        id: '',
        name: '',
        resourceIds: []
      },
      isKeepDataChange: true,
      ruleInline: {
        name: [{ validator: validateName, trigger: 'blur', required: true }],
        resourceIds: [
          { required: true, validator: validateResourceIds, trigger: 'blur' }
        ]
      },
      pageNumber: 1,
      pageSize: 10,
      arrPage: [10, 20, 30, 40, 100, 200],
      tabListTitle: [
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index + (this.pageNumber - 1) * this.pageSize + 1
            )
          }
        },
        {
          title: '角色名称',
          key: 'name',
          align: 'left',
          //width: 280
        },
        {
          title: '引用数量',
          key: 'cites',
          align: 'right',
          width: 120
        },
        {
          title: '创建者',
          key: 'creator',
          align: 'left',
          width: 200
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'right',
          width: 250
        },
        {
          title: '操作',
          key: 'courseId',
          align: 'right',
          width: 150,
          render: (h, params) => {
            let reviseBtn = null
            let enableBtn = null

            if (hasxiugai) {
              reviseBtn = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.keepData.id = params.row.id
                      this.keepData.name = params.row.name
                      this.resourceData({
                        roleId: this.keepData.id
                      }).then(() => {
                        this.sendTreeId()
                        this.ModalData.Modal = true
                        this.ModalData.modelTitle = '修改角色'
                      })
                    }
                  }
                },
                '修改'
              )
            }

            if (hasqijinyong) {
              enableBtn = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  attrs: {
                    disabled: params.row.status === 1 && params.row.cites > 0
                  },
                  on: {
                    click: () => {
                      this.dataStatus({
                        id: params.row.id,
                        status: params.row.status === 0 ? 'ENABLE' : 'DISABLE'
                      }).then(res => {
                        this.fetchListData({
                          page: this.pageNumber,
                          size: this.pageSize
                        }).then(() => {
                          this.$Message.success(
                            params.row.status === 1 ? '禁用成功' : '启用成功'
                          )
                        })
                      })
                    }
                  }
                },
                params.row.status === 1 ? '禁用' : '启用'
              )
            }

            return h('div', [reviseBtn, enableBtn])
          }
        }
      ],
      data2: []
    }
  },
  created() {
    this.fetchListData({
      page: this.pageNumber,
      size: this.pageSize
    })
  },
  mounted() {
    //获取table-height
    this.$nextTick(() => {
      let dom = document.getElementById('table-stage-list')
      this.baseHeight = util.baseHeight(dom, 82)
    })
  },
  methods: {
    ...mapActions(['getRolManagementList', 'getRolResourceList']),
    fetchListData(params) {
      //获取模板列表数据
      return this.getRolManagementList(params)
    },
    async dataStatus(params) {
      //启用/禁用
      let result = await api.patchRolMangement(params)
      return result
    },
    async resourceData(params) {
      //资源数据初始化
      await this.getRolResourceList(params).then(res => {
        this.data2 = this.convertTree(this.resourceList, {
          value: 'id',
          label: 'prettyName',
          children: 'childs',
          checked: 'possess'
        })
      })
    },
    newRole() {
      //新增
      this.resourceData().then(() => {
        this.keepData.id = ''
        this.keepData.name = ''
        this.ModalData.modelTitle = '新增角色'
        this.ModalData.Modal = true
      })
    },
    handleCurrentChange(num) {
      this.pageNumber = num
      this.fetchListData({
        page: this.pageNumber,
        size: this.pageSize
      })
    },
    handlePageSize(size) {
      this.pageSize = size
      this.fetchListData({
        page: this.pageNumber,
        size: this.pageSize
      })
    },
    nameInputChange(val) {
      // 判断是否是修改的name
      if (this.keepData.id === '') {
        this.isKeepDataChange = true
      } else {
        this.isKeepDataChange = false
      }
    },
    ModalChange(val) {
      if (!val) {
        this.$refs['keepData'].resetFields()
      }
    },
    confirm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //确定
          this.sendTreeId()
          if (!this.keepData.id) {
            delete this.keepData.id
            this.addResource(this.keepData).then(result => {
              if (result === 'OK') {
                this.$Message.success('成功新增')
                this.fetchListData({
                  page: this.pageNumber,
                  size: this.pageSize
                })
                this.ModalData.Modal = false
              } else {
                this.$Message.error(result)
                setTimeout(() => {
                  this.ModalData.loading = false
                  this.$nextTick(() => {
                    this.ModalData.loading = true
                  })
                }, 500)
              }
            })
          } else {
            if (this.isKeepDataChange) {
              this.keepData.name = ''
            }
            this.amendResource(this.keepData).then(result => {
              if (result === 'OK') {
                this.$Message.success('成功修改')
                setTimeout(() => {
                  this.fetchListData({
                    page: this.pageNumber,
                    size: this.pageSize
                  })
                },1000)
                this.ModalData.Modal = false
              } else {
                this.$Message.error(result)
                setTimeout(() => {
                  this.ModalData.loading = false
                  this.$nextTick(() => {
                    this.ModalData.loading = true
                  })
                }, 500)
              }
            })
          }
        } else {
          this.$Message.error('请完成必填项!')
          setTimeout(() => {
            this.ModalData.loading = false
            this.$nextTick(() => {
              this.ModalData.loading = true
            })
          }, 500)
        }
      })
    },
    async addResource(params) {
      //新增接口
      let result = await api.keepRolMangement(params)
      return result
    },
    async amendResource(params) {
      //修改接口
      let result = await api.putRolMangement(params)
      return result
    },
    treeChange(val) {
      this.keepData.resourceIds = val
    },
    sendTreeId() {
      //处理树数据
      const dataId = []
      this.$refs.Tree.getCheckedAndIndeterminateNodes().forEach(item => {
        dataId.push(item.id)
      })
      this.keepData.resourceIds = dataId.join()
    },
    convertTree(tree, map) {
      const result = []

      // 遍历 tree
      tree.forEach(item => {
        // 读取 map 的键值映射
        const id = item[map.value]
        const title = item[map.label]
        let children = item[map.children]
        const checked = item[map.checked] === 0 ? false : true //返回0或者1
        const expand = false
        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map)
        }

        result.push({
          id,
          title,
          children,
          expand,
          checked
        })
      })
      return result
    }
  },
  computed: {
    ...mapState({
      pageData: state => state.roleManagement.pageData,
      resourceList: state => state.roleManagement.resourceList
    })
  }
}
</script>

<style lang="less" scoped>
.treeDiv {
  width: 100%;
  height: 300px;
  overflow: auto;
  border: 1px solid #eee;
  padding: 0 10px;
}
</style>
