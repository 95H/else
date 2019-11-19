<template>
  <Modal
    class="add-modal"
    v-model="modalShow"
    title="新增用户"
    :loading="loading"
    @on-ok="ok"
    @on-cancel="cancel"
    :mask-closable="false"
    height="600"
  >
    <Tabs type="card" :animated="false" v-model="tabName">
      <TabPane label="新增内部用户" name="addInUser">
        <Form :label-width="15" :model="queryInUser" :rules="ruleFormDataIn" ref="queryInUser">
          <Row>
            <Col span="19" offset="0">
              <FormItem label=" " prop="InUseremail">
                <Input
                  placeholder="请输入传智播客集团内部员工邮箱（例如：xiaozhi@itcast.cn）"
                  :disabled="isShowInUser"
                  v-model="queryInUser.InUseremail"
                />
                <span class="input-remark">50字</span>
                <Button
                  class="addButton"
                  type="primary"
                  :disabled="isShowInUser"
                  @click="addInUser()"
                >添加</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Form
          class="formBox"
          :label-width="108"
          :model="addInForm"
          :rules="InUsersData"
          ref="addInForm"
          v-show="isShowInUser"
        >
          <Row>
            <Col class="modalTips" span="24">
              <Icon
                type="ios-information-circle"
                size="20"
                color="#108EE9"
                style="margin-top:-4px;"
              />
              <span>该账号密码与该老师OA账号密码保持一致，若需修改密码请登录OA系统修改。</span>
            </Col>
          </Row>
          <Icon type="ios-close" class="icon_close" color="#ccc" size="40" @click="closeFormBox()"/>
          <Row>
            <Col span="14" offset="0">
              <FormItem label="姓名：">
                <span class="span-remark">{{addInForm.Username}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="14" offset="0">
              <FormItem label="工号：">
                <span class="span-remark">{{addInForm.EmployeeNumber}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="18" offset="0">
              <FormItem label="请选择角色：" prop="InroleId">
                <Select placeholder="请选择角色" v-model="addInForm.InroleId" filterable>
                  <Option
                    v-for="(item,index) in roleList"
                    :key="index"
                    :value="item.id"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane label="新增兼职用户" name="addOutUser">
        <Form :label-width="130" :model="addOutForm" :rules="ruleFormDataOut" ref="addOutForm">
          <Row>
            <Col span="16" offset="3">
              <FormItem label="姓名：" prop="Username">
                <Input :number="true" placeholder="请输入姓名" v-model="addOutForm.Username"/>
                <span class="input-remark">10字</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="16" offset="3">
              <FormItem label="邮箱(登录账号）：" prop="Useremail">
                <Input placeholder="请输入邮箱" v-model="addOutForm.Useremail"/>
                <span class="input-remark">50字</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="16" offset="3">
              <FormItem label="请选择角色：" prop="roleId">
                <Select placeholder="请选择角色" v-model="addOutForm.roleId" filterable>
                  <Option
                    v-for="(item,index) in roleList"
                    :key="index"
                    :value="item.id"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </TabPane>
    </Tabs>
  </Modal>
</template>
<script>
import api from '@/api/index'
export default {
  props: ['isShowModal', 'roleList'],
  data() {
    return {
      Arr: [1, 2, 3],
      tabName: 'addInUser',
      //
      isShowInUser: false,
      emailList: [],
      // 兼职员工信息
      addOutForm: {
        Username: '',
        Useremail: '',
        roleId: ''
      },
      queryInUser: {
        InUseremail: ''
      },
      // 内部员工信息
      addInForm: {
        inUserData: '',
        Username: '',
        EmployeeNumber: '',
        InroleId: ''
      },
      // 内部员工搜索表单
      ruleFormDataIn: {
        InUseremail: [
          { required: true, message: '请输入邮箱！', trigger: 'blur' },
          { max: 50, message: '不能超过50个字！', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^[A-Za-z0-9]+(@itcast\.cn)$/,
            message: '你输的邮箱格式有误！',
            trigger: 'blur'
          },
          { validator: this.validateAge, trigger: 'blur' }
        ]
      },
      // 内部员工表单
      InUsersData: {
        InroleId: [
          {
            type: 'number',
            required: true,
            message: '请选择所属角色！',
            trigger: 'change'
          }
        ]
      },
      // 外部员工表单
      ruleFormDataOut: {
        Username: [
          { required: true, message: '请输入真实姓名！', trigger: 'blur' },
          { max: 10, message: '不能超过10个字！', trigger: 'blur' }
        ],
        Useremail: [
          { required: true, message: '请输入邮箱！', trigger: 'blur' },
          { max: 50, message: '不能超过50个字！', trigger: 'blur' },
          { type: 'email', message: '你输的邮箱格式有误！', trigger: 'blur' },
          { validator: this.OutvalidateAge, trigger: 'blur' }
        ],
        roleId: [
          {
            type: 'number',
            required: true,
            message: '请选择所属角色！',
            trigger: 'change'
          }
        ]
      },

      loading: true
    }
  },
  computed: {
    modalShow: {
      get() {
        return this.isShowModal
      },

      set(val) {
        this.$emit('update:isShowModal', val)
      }
    }
  },
  created() {
    var self = this
    api
      .getbackgroundUserList({
        page: 1,
        size: 999
      })
      .then(data => {
        for (var i = 0; i < data.items.length; i++) {
          self.emailList.push(data.items[i].email)
        }
      })
  },
  methods: {
    validateAge(rule, value, callback) {
      var self = this
      api
        .getBackgroundUser({
          email: this.queryInUser.InUseremail
        })
        .then(res => {
          var num = -1
          var isOk = self.emailList.indexOf(res.email)
          if (isOk != num) {
            return callback(new Error('该用户邮箱已添加！'))
          } else if (!res.name) {
            return callback(new Error('该用户邮箱不存在!'))
          } else {
            callback()
          }
        })
    },
    OutvalidateAge(rule, value, callback) {
      let reg = /(@itcast\.cn)$/
      let arr = []
      let num = -1
      api
        .getbackgroundUserList({
          page: 1,
          size: 200
        })
        .then(res => {
          for (var i = 0; i < res.items.length; i++) {
            arr.push(res.items[i].email)
          }
          var num2 = arr.indexOf(value)
          if (reg.test(value)) {
            return callback(new Error('不能使用内@itcast.cn结尾的邮箱！'))
          } else if (num2 != num) {
            return callback(new Error('该用户已存在!'))
          } else {
            callback()
          }
        })
    },

    createUser(params) {
      api.addBackgroundUser({
        email: this.inUserData.email,
        name: params.Username,
        employeeNumber: params.EmployeeNumber,
        userType: 0,
        'roles[0].id': params.InroleId
      })
    },
    createOutUser(params) {
      api.addBackgroundUser({
        email: params.Useremail,
        name: params.Username,
        employeeNumber: '1',
        userType: 1,
        'roles[0].id': params.roleId
      })
    },
    addInUser() {
      var self = this
      this.$refs.queryInUser.validate(valid => {
        if (valid) {
          api
            .getBackgroundUser({
              email: this.queryInUser.InUseremail
            })
            .then(res => {
              if (res.name && res.roles == null) {
                this.isShowInUser = true
                this.addInForm.Username = res.name
                this.addInForm.EmployeeNumber = res.employeeNumber
                this.inUserData = res
              }
              return
            })
        } else {
        }
      })
    },
    closeFormBox() {
      this.isShowInUser = false
      this.$refs.addInForm.resetFields()
    },
    ok() {
      let self = this
      if (this.tabName == 'addInUser') {
        if (this.isShowInUser == true) {
          this.$refs.addInForm.validate(valid => {
            if (valid) {
              this.createUser(self.addInForm)
              self.$Message.success({
                content: '添加成功',
                duration: 1,
                onClose: function() {
                  self.$refs.addInForm.resetFields()
                  self.$refs.queryInUser.resetFields()
                  self.$emit('AddcreateSuccess')
                  self.modalShow = false
                  self.isShowInUser = false
                }
              })
            } else {
              this.loading = false
              this.$nextTick(() => {
                this.loading = true
              })
              return
            }
          })
        } else {
          this.$refs.queryInUser.validate(valid => {
            if (valid) {
              api
                .getBackgroundUser({
                  email: this.queryInUser.InUseremail
                })
                .then(res => {
                  if (res.name && res.roles == null) {
                    this.isShowInUser = true
                    this.addInForm.Username = res.name
                    this.addInForm.EmployeeNumber = res.employeeNumber
                    this.inUserData = res
                  }
                  return
                })
            } else {
              this.loading = false
              this.$nextTick(() => {
                this.loading = true
              })
              return
            }
          })
          this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            return
        }
      } else if (this.tabName == 'addOutUser') {
        this.$refs.addOutForm.validate(valid => {
          if (valid) {
            this.createOutUser(self.addOutForm)
            self.$Message.success({
              content: '添加成功',
              duration: 1,
              onClose: function() {
                self.$refs.addOutForm.resetFields()
                self.$emit('createSuccess')
                self.modalShow = false
              }
            })
          } else {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            return
          }
        })
      }
    },

    cancel() {
      this.$refs.addInForm.resetFields()
      this.$refs.queryInUser.resetFields()
      this.$refs.addOutForm.resetFields()
      this.isShowInUser = false
      this.modalShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.formBox {
  position: relative;
  .icon_close {
    position: absolute;
    right: 5px;
    top: 50px;
    z-index: 1;
    cursor: pointer;
  }
}
.modalTips {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  padding-bottom: 8px;
  margin-bottom: 20px;
}
.ivu-tabs {
  overflow: visible;
}
.ivu-form-item-content {
  position: relative;
  .input-remark {
    position: absolute;
    top: 0;
    right: -30px;
    color: #ccc;
  }
  .addButton {
    position: absolute;
    top: 0;
    right: -95px;
    color: #fff;
  }
}
</style>
