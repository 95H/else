<template>
     <Modal
        title="关闭"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false"
        @on-ok="asyncOK"
        :loading="loading"
        width="500px"
        @on-cancel="cancel">
        <div>
             <Form ref="frombox" :model="formValidate" :rules="ruleValidate">
                  <Row>
                    <Col span="24">
                    <FormItem>
                        关闭课程：{{courseName}}
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem>
                    课程服务截止时间：{{originalExpires}}
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="15">
                     <FormItem label="关闭类型:" prop="refundType">
                          <Select  placeholder="关闭类型" style="width:150px;" v-model="formValidate.refundType">
                            <Option v-for="item in tuifType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                      </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="24">
                    <FormItem label="关闭原因:" prop="reason">
                        <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入关闭原因"></Input>
                    </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
    </Modal>
</template>

<script>
import api from '@/api/index'
export default {
  data() {
    return {
      modal: false,
      loading: true,
      courseName: '',
      originalExpires: '',
      tuifType: [
        {
          value: 'TRANSFER_OFFLINE',
          label: '转线下'
        },
        {
          value: 'TRANSFER_SUBJECT',
          label: '转学科'
        },
        {
          value: 'DROP_OUT',
          label: '退学'
        },
        {
          value: 'OTHERS',
          label: '其他'
        }
      ],
      formValidate: {
        stuCourseId: '',
        orderId: '',
        refundType: '',
        reason: '',
        logDesc: ''
      },
      ruleValidate: {
        refundType: [
          {
            required: true,
            message: '关闭类型不为空',
            trigger: 'change'
          }
        ],
        reason: [
          {
            required: true,
            message: '修改原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    asyncOK() {
      setTimeout(() => {
        this.loading = false
        this.$refs.frombox.validate(async valid => {
          if (valid) {
            this.loading = true
            let params = Object.assign({}, this.formValidate)
            params.logDesc = `关闭(${this.courseName})`
            let result = await api.patchRefunds(params)
            if (result.status == 200) {
              this.$Message.success('关闭操作成功')
              this.$refs.frombox.resetFields()
              this.$emit('refreshList')
            } else {
              this.$Message.error(result.message)
            }
            this.modal = false
          }
        })
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    cancel() {
      this.$refs.frombox.resetFields()
    }
  }
}
</script>

<style>
</style>
