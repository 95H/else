<template>
    <Modal
        title="休学"
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
                    <Col span="10">
                    <FormItem>
                        休学课程：{{courseName}}
                    </FormItem>
                    </Col>
                    <Col span="14">
                    <FormItem>
                    课程服务截止时间：{{formValidate.originalExpires}}
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="预计休学时间:" prop="suspensionDays">
                          <Input v-model="formValidate.suspensionDays" placeholder="输入天数" style="width:90px;"></Input>
                      </FormItem>
                    </Col>
                    <Col span="14">
                    <FormItem>
                    预计课程服务截止时间：{{predictTime}}
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="15">
                     <FormItem label="休学类型:" prop="suspensionType">
                          <Select v-model="formValidate.suspensionType"  placeholder="休学类型" style="width:150px;" >
                            <Option v-for="item in restType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                      </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="24">
                    <FormItem label="休学原因:" prop="reason">
                        <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入休学原因"></Input>
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
    const isNumber = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error('必须输入数字'))
      } else if (value > 180) {
        callback(new Error('天数不能大于180'))
      } else {
        callback()
      }
    }
    return {
      modal: false,
      loading: true,
      courseName: '',
      restType: [
        {
          value: 'SICK_LEAVE',
          label: '病假'
        },
        {
          value: 'AFFAIR_LEAVE',
          label: '事假'
        },
        {
          value: 'MATERNITY_LEAVE',
          label: '产假'
        },
        {
          value: 'OTHERS',
          label: '其他'
        }
      ],
      formValidate: {
        stuCourseId: '',
        predictExpires: '',
        originalExpires: '',
        suspensionDays: '',
        suspensionType: '',
        reason: ''
      },
      ruleValidate: {
        suspensionDays: [
          {
            required: true,
            message: '请输入天数',
            trigger: 'blur'
          },
          {
            validator: isNumber,
            trigger: 'change'
          }
        ],
        suspensionType: [
          {
            required: true,
            message: '休学类型不为空',
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
            params.predictExpires = this.predictTime
            params.logDesc = `设置休学(${this.courseName}预计休学天数${params.suspensionDays}天)`
            let result = await api.suspensions(params)
            if (result.status === 200) {
              this.$Message.success('休学设置成功')
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
    },
    changeDay(ev) {}
  },
  computed: {
    predictTime() {
      let day = this.formValidate.suspensionDays
      if (!isNaN(day)) {
        let nowDate = new Date(this.formValidate.originalExpires)
        let date = new Date(nowDate.getTime() + day * 24 * 60 * 60 * 1000)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
</style>
